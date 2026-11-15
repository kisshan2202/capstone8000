// Shared Firebase web config for every page of the site.
// These values are public by design; access is controlled by the database rules (see docs/firebase-rules.md).
export const firebaseConfig = {
  apiKey: "AIzaSyAJSUcbcb0g55rzYdgClliC1lPBpIkRdvc",
  authDomain: "ironpeak-crm-1860093.firebaseapp.com",
  databaseURL: "https://ironpeak-crm-1860093-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ironpeak-crm-1860093",
  appId: "1:336525024774:web:e6193da47404d8bf672d87"
};

// Database paths used by this site (nothing else in the project is touched).
export const PATHS = {
  ideas: "capstone8000_ideas",
  profiles: "capstone8000_profiles",                 // public: names, country, skills, goal, experience
  profilesPrivate: "capstone8000_profiles_private"   // private: email, date of birth
};
