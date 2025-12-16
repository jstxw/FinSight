# 💰 FinSight - Personal Finance Tracker

<div align="center">

![FinSight Logo](https://img.shields.io/badge/FinSight-Finance%20Tracker-8B5CF6?style=for-the-badge&logo=wallet&logoColor=white)

**Master Your Money with Precision Insight**

A modern, full-stack personal finance management application that helps you track expenses, analyze income, and visualize your financial journey with beautiful, intuitive dashboards.

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=flat-square)](https://finsight-2-q5qp.onrender.com)
[![Backend API](https://img.shields.io/badge/API-Running-blue?style=flat-square)](https://finsight-2-q5qp.onrender.com/api/v1)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Overview

FinSight is a comprehensive full-stack personal finance management application that empowers users to take control of their financial health. Built with modern web technologies, it offers real-time expense tracking, income management, and powerful data visualization tools to help you make informed financial decisions.

---

## ✨ Features

### 🎯 Core Features

- **User Authentication** - Secure JWT-based authentication with protected routes
- **Expense Tracking** - Add, view, edit, and delete expense entries with categorization
- **Income Management** - Track multiple income sources with detailed categorization
- **Dashboard Analytics** - Visual representation of financial data with interactive charts
- **Category Organization** - Organize transactions by custom categories
- **Date Filtering** - Filter transactions by date ranges
- **Excel Export** - Download income/expense data as Excel spreadsheets
- **Profile Management** - Upload profile pictures and manage user settings

### 📊 Dashboard Features

- Total balance overview with income/expense breakdown
- Interactive charts (Line, Bar, Pie) using Recharts
- Recent transactions display
- Last 30 days expense analysis
- Financial trends visualization
- Responsive design for all devices

### 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints (15 min window, 100 requests max)
- CORS protection with configurable origins
- Helmet.js security headers
- Request size limiting (10kb max)
- Protected routes with middleware
- Auth token auto-expiration

### 🎨 UI/UX Features

- Modern, clean aurora-themed design
- Dark/Light theme support via ThemeContext
- Smooth animations and transitions
- Responsive mobile-first design
- Custom modals and delete confirmations
- Intuitive sidebar navigation
- Loading states and error handling

---

## 🛠 Tech Stack

### Frontend

| Technology       | Purpose                     | Version  |
| ---------------- | --------------------------- | -------- |
| **React**        | UI Framework                | 19.x     |
| **Vite**         | Build Tool & Dev Server     | 6.x      |
| **Tailwind CSS** | Utility-First CSS Framework | 4.x      |
| **Recharts**     | Data Visualization          | 3.x      |
| **Axios**        | HTTP Client                 | 1.9.x    |
| **React Router** | Client-Side Routing         | 6.x      |
| **React Icons**  | Icon Library                | 5.x      |
| **Context API**  | State Management            | Built-in |

### Backend

| Technology             | Purpose               | Version     |
| ---------------------- | --------------------- | ----------- |
| **Node.js**            | JavaScript Runtime    | 18+         |
| **Express.js**         | Web Framework         | 4.x         |
| **MongoDB**            | NoSQL Database        | Atlas Cloud |
| **Mongoose**           | MongoDB ODM           | 8.x         |
| **JWT**                | Authentication        | Latest      |
| **Bcrypt**             | Password Hashing      | Latest      |
| **Multer**             | File Upload           | Latest      |
| **Express Rate Limit** | API Rate Limiting     | Latest      |
| **Helmet.js**          | Security Headers      | Latest      |
| **CORS**               | Cross-Origin Handling | Latest      |

### DevOps

- **Render** - Cloud hosting for frontend & backend
- **MongoDB Atlas** - Cloud database hosting
- **Git & GitHub** - Version control

---

## 📁 Project Structure

```
FinSight-/
├── backend/                      # Express.js Backend
│   ├── config/
│   │   └── db.js                # MongoDB connection
│   ├── controllers/
│   │   ├── authcontrollers.js   # Auth logic (login, register, image upload)
│   │   ├── dashboardController.js # Dashboard aggregation
│   │   ├── expenseController.js # Expense CRUD + Excel export
│   │   └── incomeController.js  # Income CRUD + Excel export
│   ├── middleware/
│   │   ├── authMiddleware.js    # JWT verification
│   │   └── uploadMiddleware.js  # Multer file handling
│   ├── models/
│   │   ├── User.js              # User schema (name, email, password, image)
│   │   ├── Income.js            # Income schema
│   │   └── Expense.js           # Expense schema
│   ├── routes/
│   │   ├── authRoutes.js        # /api/v1/auth/*
│   │   ├── dashboardRoutes.js   # /api/v1/dashboard
│   │   ├── expenseRoutes.js     # /api/v1/expense/*
│   │   └── incomeRoutes.js      # /api/v1/income/*
│   ├── uploads/                 # User uploaded files
│   ├── .env                     # Environment variables
│   ├── server.js                # Express server entry
│   └── package.json
│
├── frontend/expense_tracker/     # React Frontend
│   ├── src/
│   │   ├── api/                 # 🆕 API Service Layer
│   │   │   ├── index.js
│   │   │   ├── authService.js
│   │   │   ├── dashboardService.js
│   │   │   ├── incomeService.js
│   │   │   └── expenseService.js
│   │   ├── components/
│   │   │   ├── Cards/           # Reusable card components
│   │   │   ├── Charts/          # Recharts components (Bar, Line, Pie)
│   │   │   ├── Inputs/          # Form inputs
│   │   │   ├── Layouts/         # Layout wrappers (Auth, Dashboard)
│   │   │   ├── DeleteAlert.jsx
│   │   │   └── Modal.jsx
│   │   ├── context/
│   │   │   ├── ThemeContext.jsx # Theme state
│   │   │   └── userContext.jsx  # User state
│   │   ├── DashComponents/      # Dashboard-specific
│   │   │   ├── AddExpenseForm.jsx
│   │   │   ├── AddIncomeForm.jsx
│   │   │   ├── FinanceOverview.jsx
│   │   │   ├── ExpenseComponents/
│   │   │   └── IncomeComponents/
│   │   ├── hooks/
│   │   │   └── useUserAuth.jsx  # Custom auth hook
│   │   ├── pages/
│   │   │   ├── auth/            # Login, SignUp
│   │   │   ├── Dashboard/       # Home, Income, Expense, Settings
│   │   │   └── LandingPage.jsx
│   │   ├── utils/
│   │   │   ├── axiosinstance.js # Axios config + interceptors
│   │   │   ├── apiPaths.js      # API endpoints
│   │   │   ├── helper.js
│   │   │   └── data.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── examples/                # 🆕 Example components
│   ├── .env                     # Frontend env vars
│   ├── .env.example
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── RENDER_DEPLOYMENT.md         # 📖 Deployment guide
├── API_INTEGRATION_GUIDE.md     # 📖 API usage guide
├── render.yaml                  # Render auto-deploy config
├── .gitignore
├── README.md                    # This file
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ - [Download](https://nodejs.org/)
- **npm** v8+ (comes with Node.js)
- **MongoDB Atlas Account** - [Sign up](https://www.mongodb.com/cloud/atlas/register)
- **Git** - [Download](https://git-scm.com/)

Verify installations:

```bash
node --version  # v18.0.0 or higher
npm --version   # v8.0.0 or higher
```

### Installation

#### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/FinSight.git
cd FinSight-
```

#### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in `backend/`:

```env
# MongoDB
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/finsight

# JWT
JWT_SECRET=your_super_secret_jwt_key_min_64_characters_long

# Server
PORT=8000

# CORS
CLIENT_URL=http://localhost:5173,http://localhost:5175

# Environment
NODE_ENV=development
```

**Generate JWT Secret:**

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

#### 3. Frontend Setup

```bash
cd ../frontend/expense_tracker
npm install
```

Create `.env` file in `frontend/expense_tracker/`:

```env
# Backend API URL
VITE_API_URL=http://localhost:8000
```

### Running Locally

#### Start Backend (Terminal 1)

```bash
cd backend
npm start

# Output:
# ✓ Server running on port 8000
# ✓ MongoDB Connected
```

#### Start Frontend (Terminal 2)

```bash
cd frontend/expense_tracker
npm run dev

# Output:
# ✓ VITE ready in 500ms
# ➜ Local: http://localhost:5173/
```

**Open app:** http://localhost:5173

---

## 📚 API Documentation

### Base URL

```
Development: http://localhost:8000
Production: https://finsight-2-q5qp.onrender.com
```

### Authentication

#### Register

```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass123"
}
```

#### Login

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepass123"
}

Response: { token, user }
```

#### Get User

```http
GET /api/v1/auth/getUser
Authorization: Bearer {token}
```

### Income Endpoints

```http
POST   /api/v1/income/add          # Add income
GET    /api/v1/income/get          # Get all income
DELETE /api/v1/income/:id          # Delete income
GET    /api/v1/income/downloadexcel # Export Excel
```

### Expense Endpoints

```http
POST   /api/v1/expense/add         # Add expense
GET    /api/v1/expense/get         # Get all expenses
DELETE /api/v1/expense/:id         # Delete expense
GET    /api/v1/expense/downloadexcel # Export Excel
```

### Dashboard

```http
GET /api/v1/dashboard
Authorization: Bearer {token}

Response: {
  totalIncome, totalExpenses, totalBalance,
  recentTransactions, expensesByCategory, ...
}
```

**Full API docs:** [API_INTEGRATION_GUIDE.md](API_INTEGRATION_GUIDE.md)

---

## 🌐 Deployment

### Render Deployment

#### Backend (Web Service)

```yaml
Root Directory: backend
Build Command: npm install
Start Command: npm start
Environment Variables:
  - MONGO_URI
  - JWT_SECRET
  - CLIENT_URL (your frontend URL)
  - PORT=8000
```

#### Frontend (Static Site)

```yaml
Root Directory: frontend/expense_tracker
Build Command: npm install && npm run build
Publish Directory: dist
Environment Variables:
  - VITE_API_URL (your backend URL)
```

**Detailed guide:** [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md)

---

## 🤝 Contributing

Contributions welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 📞 Contact

**Project Link:** [https://github.com/YOUR_USERNAME/FinSight](https://github.com/YOUR_USERNAME/FinSight)

**Live Demo:** [https://finsight-2-q5qp.onrender.com](https://finsight-2-q5qp.onrender.com)

---

## 🙏 Acknowledgments

- React, Express.js, MongoDB
- Tailwind CSS, Recharts
- Render hosting
- All open-source contributors

---

## 🗺 Roadmap

- [ ] Budget planning features
- [ ] Recurring transactions
- [ ] Multi-currency support
- [ ] Mobile app (React Native)
- [ ] AI-powered insights
- [ ] Bill reminders
- [ ] Investment tracking
- [ ] Receipt scanning (OCR)

---

<div align="center">

**Made with ❤️ by the FinSight Team**

⭐ Star this repo if you find it helpful!

[Report Bug](https://github.com/YOUR_USERNAME/FinSight/issues) · [Request Feature](https://github.com/YOUR_USERNAME/FinSight/issues) · [Documentation](./API_INTEGRATION_GUIDE.md)

</div>
- Backend requires a `.env` file with at least:
  ```env
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  CLIENT_URL=http://localhost:5173
  ```

---

## Getting Started

1. Clone the repository
2. Set up environment variables for the backend
3. Install dependencies in both `backend` and `frontend/expense_tracker`
4. Start backend and frontend servers
5. Access the app at [http://localhost:5173](http://localhost:5173)

---

## License

This project is licensed under the ISC License.

<div align="center">
  <a href="https://shipwrecked.hackclub.com/?t=ghrm" target="_blank">
    <img src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/739361f1d440b17fc9e2f74e49fc185d86cbec14_badge.png" 
         alt="This project is part of Shipwrecked, the world's first hackathon on an island!" 
         style="width: 35%;">
  </a>
</div>
