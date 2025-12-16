# Frontend API Integration Guide

## 🎯 Overview

Your frontend is now properly wired to call your Express backend API with full credentials support for cookie-based authentication.

## 📁 Project Structure

```
frontend/expense_tracker/
├── .env                          # Environment variables (API URL)
├── .env.example                  # Example env file for reference
└── src/
    ├── api/                      # ✨ NEW: API service layer
    │   ├── index.js              # Central export for all services
    │   ├── authService.js        # Auth API calls (login, register, etc.)
    │   ├── dashboardService.js   # Dashboard API calls
    │   ├── incomeService.js      # Income API calls
    │   └── expenseService.js     # Expense API calls
    ├── examples/                 # ✨ NEW: Example components
    │   ├── LoginExample.jsx      # How to use login
    │   ├── DashboardExample.jsx  # How to fetch dashboard data
    │   └── TransactionsExample.jsx # How to manage transactions
    └── utils/
        ├── axiosinstance.js      # ✅ UPDATED: Added withCredentials
        └── apiPaths.js           # ✅ UPDATED: Uses env variable
```

---

## 🔧 Setup Instructions

### 1. Environment Variables

**File:** `frontend/expense_tracker/.env`

```bash
# Production (Render deployment)
VITE_API_URL=https://finsight-2-q5qp.onrender.com

# For local development, use:
# VITE_API_URL=http://localhost:8000
```

**Important:**

- Vite requires env variables to start with `VITE_`
- Access in code via `import.meta.env.VITE_API_URL`
- Restart dev server after changing .env file

---

## 🚀 API Service Usage

### Import Services

```javascript
// Import individual services
import { authService } from "@/api/authService";
import { dashboardService } from "@/api/dashboardService";

// Or import all at once
import {
  authService,
  dashboardService,
  incomeService,
  expenseService,
} from "@/api";
```

---

### Auth Service Examples

#### Login

```javascript
import { authService } from "@/api";

const handleLogin = async () => {
  try {
    const data = await authService.login(email, password);

    // Store token
    localStorage.setItem("token", data.token);

    // Navigate to dashboard
    navigate("/dashboard");
  } catch (error) {
    console.error("Login failed:", error.message);
  }
};
```

#### Register

```javascript
const handleRegister = async () => {
  try {
    const data = await authService.register({
      name: "John Doe",
      email: "john@example.com",
      password: "securePassword123",
    });

    localStorage.setItem("token", data.token);
    navigate("/dashboard");
  } catch (error) {
    console.error("Registration failed:", error.message);
  }
};
```

#### Get User Info

```javascript
const fetchUserInfo = async () => {
  try {
    const user = await authService.getUserInfo();
    setUser(user);
  } catch (error) {
    console.error("Failed to fetch user:", error.message);
  }
};
```

#### Logout

```javascript
const handleLogout = () => {
  authService.logout(); // Clears localStorage
  navigate("/login");
};
```

---

### Dashboard Service Example

#### Fetch Dashboard Data (with useEffect)

```javascript
import { useState, useEffect } from "react";
import { dashboardService } from "@/api";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardData = await dashboardService.getDashboardData();
        setData(dashboardData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Run once on mount

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Balance: ${data.totalBalance}</h1>
      <p>Income: ${data.totalIncome}</p>
      <p>Expenses: ${data.totalExpenses}</p>
    </div>
  );
};
```

---

### Income Service Examples

#### Get All Income

```javascript
import { incomeService } from "@/api";

const fetchIncome = async () => {
  try {
    const data = await incomeService.getAllIncome();
    setIncome(data.income);
  } catch (error) {
    console.error("Failed to fetch income:", error.message);
  }
};
```

#### Add Income

```javascript
const addIncome = async () => {
  try {
    const newIncome = await incomeService.addIncome({
      title: "Freelance Project",
      amount: 2500,
      category: "Freelance",
      description: "Web development project",
      date: new Date(),
    });

    console.log("Added:", newIncome);
    // Refresh the list
    fetchIncome();
  } catch (error) {
    console.error("Failed to add income:", error.message);
  }
};
```

#### Delete Income

```javascript
const deleteIncome = async (incomeId) => {
  try {
    await incomeService.deleteIncome(incomeId);
    // Update state to remove deleted item
    setIncome(income.filter((item) => item._id !== incomeId));
  } catch (error) {
    console.error("Failed to delete:", error.message);
  }
};
```

#### Download Income Excel

```javascript
const downloadExcel = async () => {
  try {
    const blob = await incomeService.downloadIncomeExcel();

    // Create download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `income_${Date.now()}.xlsx`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download failed:", error.message);
  }
};
```

---

### Expense Service Examples

Same pattern as Income Service:

- `expenseService.addExpense(data)`
- `expenseService.getAllExpenses()`
- `expenseService.deleteExpense(id)`
- `expenseService.downloadExpenseExcel()`

---

## 🔒 Credentials & CORS

### Backend Configuration (already set up)

Your backend in `server.js` has:

```javascript
cors({
  origin: process.env.CLIENT_URL.split(","),
  credentials: true,
  // ... other options
});
```

### Frontend Configuration (already updated)

Your `axiosinstance.js` now has:

```javascript
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // ✅ Enables cookies/credentials
  // ... other options
});
```

This allows:

- ✅ Cookies to be sent with requests
- ✅ Authorization headers to work
- ✅ Proper CORS preflight handling

---

## 🎯 Best Practices

### 1. Error Handling

```javascript
try {
  const data = await dashboardService.getDashboardData();
  setData(data);
} catch (error) {
  // Error is already formatted by the service
  setError(error.message);

  // Optional: Check for specific error codes
  if (error.status === 401) {
    navigate("/login");
  }
}
```

### 2. Loading States

```javascript
const [loading, setLoading] = useState(false);

const fetchData = async () => {
  setLoading(true);
  try {
    const data = await dashboardService.getDashboardData();
    setData(data);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false); // Always runs
  }
};
```

### 3. Parallel Requests

```javascript
// Fetch multiple endpoints simultaneously
const fetchAllData = async () => {
  try {
    const [incomeData, expenseData, dashboardData] = await Promise.all([
      incomeService.getAllIncome(),
      expenseService.getAllExpenses(),
      dashboardService.getDashboardData(),
    ]);

    // All requests completed
    setIncome(incomeData.income);
    setExpenses(expenseData.expenses);
    setDashboard(dashboardData);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};
```

### 4. Cleanup in useEffect

```javascript
useEffect(() => {
  let cancelled = false;

  const fetchData = async () => {
    try {
      const data = await dashboardService.getDashboardData();
      if (!cancelled) {
        setData(data);
      }
    } catch (error) {
      if (!cancelled) {
        setError(error.message);
      }
    }
  };

  fetchData();

  return () => {
    cancelled = true; // Cleanup: prevent state updates after unmount
  };
}, []);
```

---

## 🌐 Backend API Routes Reference

Your backend routes:

```
POST   /api/v1/auth/login
POST   /api/v1/auth/register
GET    /api/v1/auth/getUser
POST   /api/v1/auth/upload-image

GET    /api/v1/dashboard

POST   /api/v1/income/add
GET    /api/v1/income/get
DELETE /api/v1/income/:id
GET    /api/v1/income/downloadexcel

POST   /api/v1/expense/add
GET    /api/v1/expense/get
DELETE /api/v1/expense/:id
GET    /api/v1/expense/downloadexcel
```

All routes are handled in the service files with proper error handling.

---

## 🚀 Deployment Notes

### Render Setup

**Backend (Web Service):**

- Environment variable: `CLIENT_URL=https://your-frontend.onrender.com,http://localhost:5173`
- Add all frontend URLs (production + local dev)

**Frontend (Static Site):**

- Environment variable: `VITE_API_URL=https://your-backend.onrender.com`
- Build command: `npm run build`
- Publish directory: `dist`

### Important:

1. Backend must allow frontend origin in CORS
2. Frontend must have correct API URL in `.env`
3. Both must support `credentials: true` for cookies

---

## 📝 Migration from Old Code

Replace old patterns:

```javascript
// ❌ Old way
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";

const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
  email,
  password,
});

// ✅ New way
import { authService } from "@/api";

const data = await authService.login(email, password);
```

Benefits:

- ✅ Cleaner imports
- ✅ Better error handling
- ✅ Type-safe (can add TypeScript later)
- ✅ Consistent error format
- ✅ Single source of truth

---

## 🎓 Example Components

Check the `src/examples/` folder for complete working examples:

- **LoginExample.jsx** - Full login flow
- **DashboardExample.jsx** - Fetching data with useEffect
- **TransactionsExample.jsx** - CRUD operations

Copy and adapt these examples for your real components!

---

## 🐛 Troubleshooting

### CORS Error

```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:** Ensure backend `.env` has your frontend URL in `CLIENT_URL`

### 401 Unauthorized

**Solution:** Check if token is stored in localStorage and axios interceptor is working

### Network Error

**Solution:** Verify `VITE_API_URL` is correct and backend is running

### Credentials Not Sent

**Solution:** Ensure `withCredentials: true` in axiosInstance

---

## ✅ Summary

1. ✅ Backend code untouched
2. ✅ Environment variables set up (`.env`)
3. ✅ API base URL uses `import.meta.env.VITE_API_URL`
4. ✅ Credentials enabled (`withCredentials: true`)
5. ✅ Service layer created (`src/api/`)
6. ✅ Example components provided (`src/examples/`)
7. ✅ Error handling standardized
8. ✅ Ready for Render deployment

Your frontend is now properly wired! 🎉
