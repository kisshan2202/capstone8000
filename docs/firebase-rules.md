# Firebase Realtime Database rules for Capstone8000

The site only uses these paths (see `firebase-config.js`):

| Path | Contents | Who may read |
|------|----------|--------------|
| `capstone8000_ideas` | project ideas | everyone |
| `capstone8000_profiles/{id}` | names, country, skills + ratings, goal, experience | everyone (shown on the team page) |
| `capstone8000_profiles_private/{id}` | **email, date of birth** | nobody from the web (view in the Firebase console) |

Email and date of birth are stored in a separate path so the public page never has to read them.
The web API key in the page source is public by design, so **the rules are the only protection**.

Add these entries under `"rules"` in the Firebase console (Realtime Database > Rules), next to any
existing rules for the rest of the project (the project is shared with other apps, so do not replace them):

```json
"capstone8000_profiles": {
  ".read": true,
  "$id": {
    ".write": "newData.exists()",
    ".validate": "newData.hasChildren(['lastName','firstName','country','goal','skills','ts'])",
    "lastName":      { ".validate": "newData.isString() && newData.val().length > 0 && newData.val().length <= 60" },
    "firstName":     { ".validate": "newData.isString() && newData.val().length > 0 && newData.val().length <= 60" },
    "preferredName": { ".validate": "newData.isString() && newData.val().length <= 60" },
    "country":       { ".validate": "newData.isString() && newData.val().length <= 60" },
    "goal":          { ".validate": "newData.isString() && newData.val().length > 0 && newData.val().length <= 80" },
    "totalYears":    { ".validate": "newData.isNumber() && newData.val() >= 0 && newData.val() <= 600" },
    "ts":            { ".validate": "newData.isNumber()" },
    "skills": { "$i": {
      "name":   { ".validate": "newData.isString() && newData.val().length > 0 && newData.val().length <= 40" },
      "rating": { ".validate": "newData.isNumber() && newData.val() >= 1 && newData.val() <= 5" } } },
    "$other": { ".validate": true }
  }
},
"capstone8000_profiles_private": {
  ".read": false,
  "$id": {
    ".write": "newData.exists()",
    "email": { ".validate": "newData.isString() && newData.val().length <= 120" },
    "dob":   { ".validate": "newData.isString() && newData.val().matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)" },
    "ts":    { ".validate": "newData.isNumber()" }
  }
}
```

`".write": "newData.exists()"` lets visitors create a profile and edit an existing one, but not delete it.
Profile editing needs these rules: if you pasted the earlier version (`!data.exists()`), edits are refused until you switch to this one.
There is no login yet, so anyone with the link can create or edit profiles, the same as the Ideas section. Treat this as a light safeguard; real ownership checks need sign-in.
