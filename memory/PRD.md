# LastLap Racer Hub — PRD

## Original Problem Statement
Build the LastLap website from the Figma design (`https://www.figma.com/design/O12qeVc36xkJcPvDTXnNNK/Last-Lap`).
User choices:
- Live data + user auth + dashboard backend
- Backend for everything visible on the frontend
- Visual reference: provided screenshot of the "Racer Hub" page

## App Overview
Gamified racing-culture quest platform. Riders complete daily missions, earn Lap Points (LP), invite a crew, and climb a global leaderboard. Dark cyberpunk visual identity (brush-stroke headings + pixel/CRT body fonts, near-black backgrounds, purple accents).

## User Personas
- **Rookie Rider** — new user, browses tasks, signs up via referral link, earns first LP.
- **Veteran Rider** — climbs leaderboard, refers crew for bonus LP.
- **Admin / Pit Boss** — manages catalog (future).

## Core Requirements (Static)
1. Email/password auth (JWT Bearer in localStorage).
2. Daily race tasks list with reset countdown timer (UTC midnight).
3. Task lifecycle: available → started → completed (awards LP).
4. Global leaderboard sorted by LP, with current user's rank.
5. Race stats: tasks completed (progress bar), LP earned, current rank + top %, referrals, streak, joined-on.
6. Referral system: unique code per user, shareable link, X/Twitter share, +50 LP on verified invite.
7. Dashboard mirrors Figma layout 1:1.

## What's Implemented (2026-02)
- Backend (FastAPI + MongoDB + JWT + bcrypt) — endpoints under `/api`:
  - `/auth/register`, `/auth/login`, `/auth/me`, `/auth/logout`
  - `/tasks` (list with per-user status), `/tasks/{id}/start`, `/tasks/{id}/complete`, `/tasks/reset-timer`
  - `/leaderboard?limit=N` (returns top + you + your_rank + total)
  - `/users/me/stats`, `/referrals/me`
- Seed: 8 tasks, demo user @riderghost (2450 LP, 4-day streak, code LAST-8842), admin, 25 fake racers populating leaderboard.
- Frontend (React + Tailwind + shadcn + Sonner toasts):
  - Routes: `/` (Dashboard, protected), `/login`, `/register?ref=CODE`, `/leaderboard`, `/tasks` (Rider Garage), `/about`.
  - Pages match Figma: hero RACER HUB w/ pixel-art cyberpunk biker SVG, 4 top stat cards, Daily Race Tasks (with red pulsing countdown), Global Leaderboard (blue ring + YOUR RANK row), Your Race Stats (progress bar), Build Your Crew (copy code/link, X share).
- Fonts: Rubik Wet Paint (brush), VT323 (CRT mono), Silkscreen (pixel labels) via Google Fonts.

## Test Results
- Backend: **15/15 pytest tests pass**.
- Frontend: All flows verified (login → dashboard → tasks → leaderboard → register → logout).
- Test credentials in `/app/memory/test_credentials.md`.

## Backlog
**P1**
- Daily streak job (cron / on-login increment if 24h since last activity).
- Verified task gating (currently auto-completes after 1.5s; real X-follow/Discord-join verification webhooks).
- Wallet connect integration for "Connect Your Wallet" task.

**P2**
- Email verification + password reset flow.
- Roadmap / Token Details / About content pages.
- Profile editing & avatar upload.
- Multi-tier rider ranks (Rookie → Pro → Veteran → Champion) based on LP thresholds.

**P3**
- Sound effects (engine rev on START TASK).
- Cosmetic helmet/bike customization.
- Seasons & resets.

## Next Action Items
- Wire real X / Discord OAuth task verification.
- Add daily streak maintenance cron.
- Production CORS hardening (explicit origin instead of `*`).
