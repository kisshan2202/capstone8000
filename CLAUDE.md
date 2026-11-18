# CLAUDE.md

Guidance for Claude Code in this repository.

## Overview
Static site (plain HTML + ES modules, no build step) hosted on GitHub Pages:
https://kisshan2202.github.io/capstone8000/ . Data lives in Firebase Realtime Database
(SDK 10.12.2 loaded from gstatic CDN).

## Layout
- `index.html` team profiles, project ideas (live from Firebase), theme picker
- `profile.html` form to add a profile (saved to Firebase); `?edit=<id>` edits one, `?edit=legacy` moves a `details` profile into the database
- `firebase-config.js` shared Firebase config and database paths
- `details` legacy profiles file; a database profile with the same name replaces its entry
- `docs/firebase-rules.md` recommended database rules; `src/` and `tests/` are placeholders

## Data model
- `capstone8000_profiles/{id}`: lastName, firstName, preferredName, country, goal, skills[{name, rating 1-5 step 0.5}], experience[{company, years}], hobbies[], totalYears, ts, updatedAt, replaces (name of the `details` entry this profile replaced)
- `capstone8000_profiles_private/{id}`: email, dob, ts (never read by the site)
- `capstone8000_ideas/{id}`: author, title, desc, ts

## Commands
No build. Preview with `python3 -m http.server 8000` and open http://localhost:8000 (ES modules need http, not file://).
