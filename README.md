# Mentor-Mentee Tracking System (MERN Stack)

A complete full-stack web application designed to manage, match, and evaluate mentor-mentee relationships within an organization or educational platform.

## Features
- **OTP Authentication**: Secure login and registration using 6-digit One-Time Passwords (Nodemailer / SMS integration).
- **Role-Based Access**: Specialized views for Mentors, Mentees, and System Administrators.
- **Smart Algorithmic Matching**: Pair mentors and mentees based on skill alignment, availability, and targets.
- **Session & Goal Tracker**: Schedule mentorship sessions, log shared meeting agendas, track action items, and measure target milestones.
- **Bi-Directional Feedback & Health Analytics**: Continuous program rating and engagement health scores.
- **Dark Theme UI**: Clean obsidian aesthetics built with Tailwind CSS and Lucide React Icons.

## Project Structure
```
mentor-mentee-tracker/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Match.js
│   │   ├── Session.js
│   │   └── Goal.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── matchRoutes.js
│   │   ├── sessionRoutes.js
│   │   └── goalRoutes.js
│   ├── utils/
│   │   ├── sendEmail.js
│   │   └── generateOtp.js
│   ├── .env.example
│   └── server.js
└── client/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Sidebar.js
    │   │   ├── Navbar.js
    │   │   ├── AuthModal.js
    │   │   ├── MatchCard.js
    │   │   ├── GoalCard.js
    │   │   └── SessionCard.js
    │   ├── pages/
    │   │   ├── Dashboard.js
    │   │   ├── Matching.js
    │   │   ├── Sessions.js
    │   │   ├── Goals.js
    │   │   └── Analytics.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── tailwind.config.js
    └── package.json
```

## Quick Start Setup

### 1. Install Dependencies
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../client && npm install
```

### 2. Configure Environment Variables
Copy `backend/.env.example` to `backend/.env` and update your values:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mentor_mentee_db
JWT_SECRET=your_jwt_secret_key
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_pass
```

### 3. Run Development Server
From the root directory:
```bash
npm run dev
```
- Backend runs on `http://localhost:5000`
- Frontend runs on `http://localhost:3000`
