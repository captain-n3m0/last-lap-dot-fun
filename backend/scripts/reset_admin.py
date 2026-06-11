#!/usr/bin/env python3
"""Reset or create the LastLap admin account.

Run from the backend environment so MONGO_URL and DB_NAME are available.
Examples:
  python3 scripts/reset_admin.py
  python3 scripts/reset_admin.py --email admin@lastlap.com --password 'NewStrongPass123!'
"""

import argparse
import os
import random
import string
import uuid
from datetime import datetime, timezone
from pathlib import Path

import bcrypt
from dotenv import load_dotenv
from pymongo import MongoClient


ROOT_DIR = Path(__file__).resolve().parents[1]
load_dotenv(ROOT_DIR / ".env")


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def gen_referral_code() -> str:
    return "LAST-" + "".join(random.choices(string.digits, k=4))


def unique_referral_code(users) -> str:
    while True:
        code = gen_referral_code()
        if users.find_one({"referral_code": code}) is None:
            return code


def main() -> int:
    parser = argparse.ArgumentParser(description="Reset or create the LastLap admin account.")
    parser.add_argument("--email", default=os.environ.get("ADMIN_EMAIL", "admin@lastlap.com"))
    parser.add_argument("--password", default=os.environ.get("ADMIN_PASSWORD", "LastLap2025!"))
    args = parser.parse_args()

    mongo_url = os.environ.get("MONGO_URL")
    db_name = os.environ.get("DB_NAME")
    if not mongo_url or not db_name:
        raise SystemExit("MONGO_URL and DB_NAME must be set in backend/.env or the shell environment.")

    client = MongoClient(mongo_url)
    db = client[db_name]
    users = db.users
    email = args.email.lower()
    now = datetime.now(timezone.utc).isoformat()

    existing = users.find_one({"email": email})
    update = {
        "email": email,
        "password_hash": hash_password(args.password),
        "display_name": "Admin",
        "role": "PIT BOSS",
        "title": "TRACK MARSHAL",
        "is_admin": True,
        "email_verified": True,
        "avatar_color": "#8B5CF6",
        "avatar_preset": "helmet",
    }

    if existing:
        users.update_one({"_id": existing["_id"]}, {"$set": update})
        username = existing.get("username", "admin")
        action = "updated"
    else:
        username = "admin"
        suffix = 1
        while users.find_one({"username": username}) is not None:
            suffix += 1
            username = f"admin{suffix}"
        users.insert_one({
            "id": str(uuid.uuid4()),
            "email": email,
            "username": username,
            **update,
            "lap_points": 0,
            "tasks_completed": 0,
            "daily_streak": 0,
            "referral_code": unique_referral_code(users),
            "referred_by": None,
            "joined_on": now,
        })
        action = "created"

    print(f"Admin {action}: {email} / username @{username}")
    print("Use the password provided to this script.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
