"""LastLap backend API tests covering auth, tasks, leaderboard, stats, referrals, reset-timer."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "http://localhost:8001").rstrip("/")
API = f"{BASE_URL}/api"

TEST_PASSWORD = "Test1234!"


def login_with_password(session, email, password):
    r = session.post(f"{API}/auth/login", json={"email": email, "password": password}, timeout=30)
    assert r.status_code == 200, r.text
    data = r.json()
    assert not data.get("otp_required"), "OTP should not be required on login"
    return data


@pytest.fixture(scope="session")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="session")
def registered_user(session):
    suffix = uuid.uuid4().hex[:8]
    email = f"test_{suffix}@lastlap.com"
    username = f"test_{suffix}"
    r = session.post(
        f"{API}/auth/register",
        json={"email": email, "password": TEST_PASSWORD, "username": username},
        timeout=30,
    )
    assert r.status_code == 200, r.text
    data = r.json()
    return {
        "email": email,
        "username": username,
        "password": TEST_PASSWORD,
        "referral_code": data["user"]["referral_code"],
    }


@pytest.fixture(scope="session")
def user_token(session, registered_user):
    data = login_with_password(session, registered_user["email"], registered_user["password"])
    return data["access_token"]


@pytest.fixture(scope="session")
def auth_headers(user_token):
    return {"Authorization": f"Bearer {user_token}", "Content-Type": "application/json"}


# --- Health ---
def test_health(session):
    r = session.get(f"{API}/", timeout=15)
    assert r.status_code == 200
    assert r.json().get("ok") is True


# --- Auth ---
class TestAuth:
    def test_login_success(self, session, registered_user):
        data = login_with_password(session, registered_user["email"], registered_user["password"])
        assert "access_token" in data and isinstance(data["access_token"], str) and len(data["access_token"]) > 20
        assert data["user"]["email"] == registered_user["email"]
        assert data["user"]["username"] == registered_user["username"]
        assert data["user"]["referral_code"] == registered_user["referral_code"]
        assert "password_hash" not in data["user"]
        assert "_id" not in data["user"]

    def test_login_invalid(self, session, registered_user):
        r = session.post(
            f"{API}/auth/login",
            json={"email": registered_user["email"], "password": "wrong"},
            timeout=15,
        )
        assert r.status_code == 401

    def test_me_with_bearer(self, session, auth_headers, registered_user):
        r = session.get(f"{API}/auth/me", headers=auth_headers, timeout=15)
        assert r.status_code == 200
        d = r.json()
        assert d["email"] == registered_user["email"]
        assert "password_hash" not in d

    def test_me_no_token(self, session):
        r = requests.get(f"{API}/auth/me", timeout=15)
        assert r.status_code == 401

    def test_register_new_user(self, session):
        suffix = uuid.uuid4().hex[:8]
        email = f"test_{suffix}@lastlap.com"
        username = f"test_{suffix}"
        r = session.post(f"{API}/auth/register", json={
            "email": email, "password": TEST_PASSWORD, "username": username
        }, timeout=30)
        assert r.status_code == 200, r.text
        data = r.json()
        if data.get("otp_required"):
            code = data.get("debug_code")
            if not code:
                rr = session.post(f"{API}/auth/otp/request", json={"email": email}, timeout=15)
                assert rr.status_code == 200, rr.text
                code = rr.json().get("debug_code")
            assert code, "OTP debug code missing (set OTP_DEBUG=true on backend)"
            vr = session.post(f"{API}/auth/otp/verify", json={"email": email, "code": code}, timeout=30)
            assert vr.status_code == 200, vr.text
            data = vr.json()
        assert data["user"]["email"] == email
        assert data["user"]["referral_code"].startswith("LAST-")
        assert "access_token" in data

    def test_register_duplicate_email(self, session, registered_user):
        r = session.post(f"{API}/auth/register", json={
            "email": registered_user["email"],
            "password": TEST_PASSWORD,
            "username": f"u{uuid.uuid4().hex[:6]}",
        }, timeout=15)
        assert r.status_code == 400

    def test_register_with_referral_awards_referrer(self, session, auth_headers, registered_user):
        stats_before = session.get(f"{API}/users/me/stats", headers=auth_headers, timeout=15).json()
        lp_before = stats_before["lap_points"]
        suffix = uuid.uuid4().hex[:8]
        r = session.post(f"{API}/auth/register", json={
            "email": f"ref_{suffix}@lastlap.com",
            "password": TEST_PASSWORD,
            "username": f"ref_{suffix}",
            "referral_code": registered_user["referral_code"],
        }, timeout=20)
        assert r.status_code == 200
        stats_after = session.get(f"{API}/users/me/stats", headers=auth_headers, timeout=15).json()
        assert stats_after["lap_points"] == lp_before + 50, "Referrer should gain 50 LP"


# --- Tasks ---
class TestTasks:
    def test_list_tasks(self, session, auth_headers):
        r = session.get(f"{API}/tasks", headers=auth_headers, timeout=15)
        assert r.status_code == 200
        tasks = r.json()
        assert isinstance(tasks, list)
        if not tasks:
            pytest.skip("No tasks configured")
        t0 = tasks[0]
        for k in ("id", "title", "description", "platform", "reward_lp", "status"):
            assert k in t0
        assert t0["status"] in ("available", "started", "completed")

    def test_reset_timer(self, session, auth_headers):
        r = session.get(f"{API}/tasks/reset-timer", headers=auth_headers, timeout=15)
        assert r.status_code == 200
        secs = r.json()["seconds"]
        assert isinstance(secs, int) and 0 < secs <= 86400

    def test_start_and_complete_increments_lp(self, session):
        # Create a fresh user so we have at least one untouched task
        suffix = uuid.uuid4().hex[:8]
        email = f"task_{suffix}@lastlap.com"
        password = "Test1234!"
        reg = session.post(f"{API}/auth/register", json={
            "email": email,
            "password": password,
            "username": f"task_{suffix}",
        }, timeout=20)
        assert reg.status_code == 200
        token = login_with_password(session, email, password)["access_token"]
        hdr = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}

        tasks = session.get(f"{API}/tasks", headers=hdr, timeout=15).json()
        if not tasks:
            pytest.skip("No tasks configured")
        available = [t for t in tasks if t["status"] == "available"]
        if not available:
            pytest.skip("No available tasks")
        task = available[0]
        tid = task["id"]
        reward = task["reward_lp"]

        # initial stats
        s0 = session.get(f"{API}/users/me/stats", headers=hdr, timeout=15).json()
        lp0, tc0 = s0["lap_points"], s0["tasks_completed"]

        # start
        rs = session.post(f"{API}/tasks/{tid}/start", headers=hdr, timeout=15)
        assert rs.status_code == 200
        assert rs.json()["status"] == "started"

        # complete
        rc = session.post(f"{API}/tasks/{tid}/complete", headers=hdr, timeout=15)
        assert rc.status_code == 200
        body = rc.json()
        assert body["reward_lp"] == reward
        assert body["user"]["lap_points"] == lp0 + reward
        assert body["user"]["tasks_completed"] == tc0 + 1

        # double-complete blocked
        rc2 = session.post(f"{API}/tasks/{tid}/complete", headers=hdr, timeout=15)
        assert rc2.status_code == 400

        # GET to verify persistence
        tasks_after = session.get(f"{API}/tasks", headers=hdr, timeout=15).json()
        t_after = next(t for t in tasks_after if t["id"] == tid)
        assert t_after["status"] == "completed"

    def test_start_invalid_task(self, session, auth_headers):
        r = session.post(f"{API}/tasks/does-not-exist/start", headers=auth_headers, timeout=15)
        assert r.status_code == 404


# --- Leaderboard ---
class TestLeaderboard:
    def test_leaderboard(self, session, auth_headers, registered_user):
        r = session.get(f"{API}/leaderboard?limit=10", headers=auth_headers, timeout=15)
        assert r.status_code == 200
        d = r.json()
        assert "top" in d and "you" in d and "your_rank" in d
        assert len(d["top"]) <= 10
        # sorted desc by lap_points
        lps = [e["lap_points"] for e in d["top"]]
        assert lps == sorted(lps, reverse=True)
        # admin + at least one real user
        assert d["total_racers"] >= 2
        assert d["you"]["username"] == registered_user["username"]
        assert d["your_rank"] == d["you"]["rank"]


# --- Stats ---
class TestStats:
    def test_stats_shape(self, session, auth_headers):
        r = session.get(f"{API}/users/me/stats", headers=auth_headers, timeout=15)
        assert r.status_code == 200
        d = r.json()
        for k in ("tasks_completed", "lap_points", "current_rank", "top_percentile", "daily_streak", "joined_on", "referrals_count"):
            assert k in d
        assert isinstance(d["current_rank"], int) and d["current_rank"] >= 1
        assert 1 <= d["top_percentile"] <= 100


# --- Referrals ---
class TestReferrals:
    def test_referrals_me(self, session, auth_headers, registered_user):
        r = session.get(f"{API}/referrals/me", headers=auth_headers, timeout=15)
        assert r.status_code == 200
        d = r.json()
        assert d["referral_code"] == registered_user["referral_code"]
        assert f"register?ref={registered_user['referral_code']}" in d["referral_link"]
        for k in ("crew_invites", "pending_invites", "total_earned"):
            assert k in d and isinstance(d[k], int)
