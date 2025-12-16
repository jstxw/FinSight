# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FinSight is a fullstack expense/income tracking application with data visualization. Built for the Shipwrecked 2025 hackathon.

## Development Commands

### Backend (Express/MongoDB)
```bash
cd backend
npm install
npm run dev      # Start with nodemon (hot reload)
npm start        # Production start
```
Runs on port 8000 by default.

### Frontend (React/Vite)
```bash
cd frontend/expense_tracker
npm install
npm run dev      # Start Vite dev server (port 5173)
npm run build    # Production build
npm run lint     # ESLint
npm run preview  # Preview production build
```

## Architecture

### Backend (`/backend`)
- **Entry:** `server.js` - Express app with security middleware (helmet, rate limiting, CORS)
- **Routes:** `/api/v1/auth`, `/api/v1/income`, `/api/v1/expense`, `/api/v1/dashboard`
- **Structure:**
  - `controllers/` - Business logic (authcontrollers.js, incomeController.js, expenseController.js, dashboardController.js)
  - `models/` - Mongoose schemas (User.js, Income.js, Expense.js)
  - `middleware/` - Auth (JWT with HS256) and file upload (Multer)
  - `routes/` - Express route definitions
  - `config/db.js` - MongoDB connection

### Frontend (`/frontend/expense_tracker`)
- **Entry:** `src/main.jsx` → `App.jsx`
- **Styling:** TailwindCSS v4 with dark mode support via `dark:` prefix classes
- **State:** React Context (UserContext for auth, ThemeContext for theme)
- **Structure:**
  - `pages/` - Route pages (Login, SignUp, LandingPage, Dashboard views)
  - `components/Layouts/` - DashboardLayout, AuthLayout, Navbar, SideMenu
  - `components/Charts/` - Recharts wrappers (CustomBarChart, CustomLineChart, CustomPieChart)
  - `DashComponents/` - Dashboard-specific components (AddIncomeForm, AddExpenseForm, FinanceOverview)
  - `context/` - React contexts (userContext.jsx, ThemeContext.jsx)
  - `utils/apiPaths.js` - API endpoint definitions
  - `utils/axiosinstance.js` - Axios with Bearer token interceptor

### Key Patterns
- JWT auth with token stored in localStorage, sent via Authorization header
- Theme follows system preference (`prefers-color-scheme`), no manual toggle
- All protected routes use `authMiddleware.protect`
- Income/Expense deletion verifies user ownership before deleting

## Environment Variables

Backend `.env` requires:
```
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret
PORT=8000
CLIENT_URL=http://localhost:5173
```

## API Endpoints

| Route | Description |
|-------|-------------|
| POST `/api/v1/auth/register` | Register user (validates email format, password strength) |
| POST `/api/v1/auth/login` | Login, returns JWT |
| GET `/api/v1/auth/getUser` | Get current user info |
| POST `/api/v1/income/add` | Add income |
| GET `/api/v1/income/get` | Get all income for user |
| DELETE `/api/v1/income/:id` | Delete income (ownership verified) |
| GET `/api/v1/income/downloadexcel` | Download income as Excel |
| POST `/api/v1/expense/add` | Add expense |
| GET `/api/v1/expense/get` | Get all expenses for user |
| DELETE `/api/v1/expense/:id` | Delete expense (ownership verified) |
| GET `/api/v1/expense/downloadexcel` | Download expenses as Excel |
| GET `/api/v1/dashboard` | Get dashboard summary data |
