# Reread - Manga Discovery & Reading Web App

Reread is a responsive **serverless web application** that allows users to discover, browse, and read manga directly in the browser.  
Built using **React, TypeScript, Vite, Firebase**, and the **MangaDex API**, it delivers a smooth and modern reading experience with real-time data fetching and a mobile-friendly UI.

---

## Features

### User Authentication (Firebase Auth)
- Secure email/password authentication  
- Persistent login sessions  
- Foundation for user-specific features (bookmarks, history)

### Manga Discovery & Search
- Browse trending and popular manga  
- Real-time search powered by MangaDex API  
- Clean, card-based UI for exploring titles

### Manga Reader
- Read manga chapters in the browser  
- Swipe-friendly page navigation  
- Responsive layout for desktop and mobile  
- Handles dynamic image data returned by MangaDex

### Modern, Responsive UI
- Built with Material-UI components  
- Adaptive design for seamless viewing on all devices

### Serverless Architecture
- Frontend-only deployment (no custom backend required)  
- Firebase Auth for identity  
- Firestore database planned for future personalised features

---

## Upcoming Enhancements
Planned features to expand user experience:

- Bookmarks & Favourites (Firestore integration)  
- Reading progress tracking  
- Personalised library page  
- Recommendation engine (content-based filtering)  
- Improved handling of inconsistent MangaDex JSON formats  
- Offline caching for smoother mobile reading  

---

## Tech Stack

**Frontend:** React, TypeScript, Vite  
**UI Framework:** Material-UI (MUI)  
**Backend Services:** Firebase Authentication, Firestore (future)  
**API:** MangaDex REST API  
**Deployment:** Docker + Docker Compose  

---

## Running the Project

### 1. Clone the repository
```bash
git clone https://github.com/your-username/reread.git
cd reread
```
### 2. Update FireBase Configuration
Open src/config/firebase.ts
```ts
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

### 3. Build and run using Docker Compose
```bash
docker compose build
docker compose up
```
Then open the app in your browser: http://localhost:5173/

### 4. Run locally without Docker (optional)
```bash
npm install
npm run dev
```
Then open the app in your browser: http://localhost:5173/

## Notes & Limitations
- Some manga may fail to load due to inconsistent JSON structures returned by MangaDex.
- Personalised features (bookmarks, reading history) are planned but not yet implemented.
