# EntreSkill Hub 🚀

**EntreSkill Hub** (formerly SkillSpark) is a comprehensive, full-stack web platform designed to bridge the gap between existing skills and sustainable micro-businesses. It provides a rigorous, minimalist framework for transforming technical and creative expertise into a scalable enterprise through personalized recommendations, actionable roadmaps, and dedicated mentorship.

---

## 🌟 Key Features

- **Dynamic Onboarding & Recommendation Engine**: Users input their skills, budget, and goals. The platform's algorithm curates and ranks the most viable micro-business models tailored to their profile.
- **Interactive Step-by-Step Roadmaps**: Once a business idea is selected, users follow a structured execution timeline. Each module includes actionable checklists, video masterclasses, and downloadable resources.
- **Progress Tracking Dashboard**: A personalized user hub to track active pursuits, hours invested, and bookmarked business ideas with engaging circular visual progress indicators.
- **Dedicated Mentor Portal**: Mentors can manage their active mentees, schedule sessions, answer pending Q&A, and upload new learning resources for administrator review.
- **Admin Analytics Dashboard**: Administrators have access to high-level platform KPIs, user acquisition metrics, and resource approval workflows (protected by role-based access).

---

## 🛠️ Tech Stack

The application is built using a modern, scalable JavaScript stack:

### Frontend (Client)
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4 for utility-first styling and robust custom design tokens (glassmorphism, hairlines).
- **Typography & Icons**: Google Fonts (Playfair Display, Inter) and Google Material Symbols Outlined.

### Backend (Server)
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/) for building RESTful APIs.
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) ODM.
- **Authentication**: JWT (JSON Web Tokens) and bcryptjs for secure password hashing.

---

## 🚀 Getting Started Locally

Follow these instructions to run the application on your local machine.

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB installed locally or a MongoDB Atlas URI

### 1. Clone the Repository
```bash
git clone https://github.com/IshaKhangarot10/Entre-Skill-Hub-.git
cd Entre-Skill-Hub-
```

### 2. Setup the Backend Server
Open a terminal and navigate to the `server` directory:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory based on the provided `.env.example`:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/entreskillhub
JWT_SECRET=your_super_secret_jwt_key_here
```

**Seed the Database (Optional but recommended):**
To populate the database with 10 business ideas, roadmaps, and demo accounts:
```bash
node seed.js
```

**Start the Backend:**
```bash
npm run dev
```
The server will run on `http://localhost:5000`.

### 3. Setup the Frontend Client
Open a *new* terminal window and navigate to the `client` directory:
```bash
cd client
npm install
```

Create a `.env.local` file in the `client` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Start the Frontend:**
```bash
npm run dev
```
The client will run on `http://localhost:3000`.

---

## 🔑 Demo Accounts

If you seeded the database using `node seed.js`, you can log in with the following credentials to explore different role-based views:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Standard User** | `user@skillspark.io` | `user123` |
| **Mentor** | `mentor@skillspark.io` | `mentor123` |
| **Administrator** | `admin@skillspark.io` | `admin123` |

---

*Designed and engineered as a complete Skill-to-Startup Enablement Platform.*
