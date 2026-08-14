# Study Planner — AI-Powered Personalized Study Roadmap

A full-stack web application that evaluates a student's assessment performance and generates a personalized, priority-ordered study roadmap — without relying on any external AI APIs. All recommendation logic runs locally using a deterministic scoring algorithm.

## Features

- Student registration and login (JWT-based auth)
- Grade and subject selection
- Interactive assessments with automatic evaluation
- Topic-wise mastery scoring from assessment results
- Strength / weakness classification per topic
- Priority-based personalized study roadmap generation
- Recommended practice activity type per topic (revision, mixed practice, advanced challenge)
- Progress tracking with dynamic roadmap updates as topics are completed
- Dashboard: scores, strengths, weaknesses, progress %, and next recommended topics
- Fully responsive, professional UI

---

## Tech Stack

**Frontend:** React (Vite), JavaScript, Tailwind CSS
**Backend:** Node.js, Express.js
**Database:** MongoDB with Mongoose
**Auth:** JWT
**Deployment:** Vercel (frontend), Render (backend)

---

## Project Structure

```
Study_Planner/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   │   └── recommendationEngine.js
│   ├── seed.js
│   ├── index.js
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    └── package.json
```

---

## Recommendation Engine Logic

The recommendation engine (`backend/services/recommendationEngine.js`) is fully rule-based and requires no external AI/ML service. It runs entirely on the backend using the student's raw assessment results.

**Pipeline:** `Assessment Results → Mastery Score → Classification → Priority Score → Sorted Roadmap`

### 1. Mastery Score
For each topic, mastery is calculated as the percentage of correct answers:

```
masteryScore = round((correctCount / totalCount) * 100)
```

### 2. Classification
Each topic is classified based on its mastery score:

| Mastery Score | Classification |
|---|---|
| ≥ 75 | Strong |
| 40–74 | Moderate |
| < 40 | Weak |

### 3. Priority Score
Topics are ranked using a priority score that combines how far the student is from mastery with the topic's inherent difficulty:

```
priority = round((100 - masteryScore) * difficulty)
```

This ensures weaker topics — and harder weak topics in particular — surface higher in the roadmap.

### 4. Activity Recommendation
Based on classification, each topic is assigned a recommended activity type:

| Classification | Activity Type |
|---|---|
| Weak | Concept Revision |
| Moderate | Mixed Practice |
| Strong | Advanced Challenge |

### 5. Roadmap Generation
All topics are scored, classified, and sorted in descending order of priority, producing a personalized roadmap unique to each student's performance profile. As a student completes topics (status updates to `completed`), the roadmap is recalculated so recommendations stay current with progress.

---

## Database Schema (MongoDB)

Core collections:
- **Students** — registration/auth details
- **Subjects** — grade-wise subjects and their topics
- **Assessments** — questions per subject/topic
- **Results** — student responses and correctness per assessment
- **Roadmap/Progress** — per-student, per-topic mastery, classification, priority, activity type, and completion status

---

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (local instance or MongoDB Atlas)
- npm

### 1. Clone the repository
```bash
git clone https://github.com/Shrinivas-py/Study_Planner.git
cd Study_Planner
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/` based on `.env.example`:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Run database seed (if applicable):
```bash
node seed.js
```

Start the backend server:
```bash
npm start
```
Backend runs on `http://localhost:5000`

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
Frontend runs on `http://localhost:5173`

---

## Environment Variables (.env.example)

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

