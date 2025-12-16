import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/auth/Login.jsx";
import SignUp from "./pages/auth/SignUp.jsx";
import Home from "./pages/auth/Dashboard/home.jsx";
import Income from "./pages/auth/Dashboard/Income.jsx";
import Expense from "./pages/auth/Dashboard/Expense.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import UserProvider from "./context/userContext";
import ThemeProvider from "./context/ThemeContext";
import Dashboardlayout from "./components/Layouts/Dashboardlayout.jsx";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <ThemeProvider>
      <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/Login" exact element={<Login />} />
            <Route path="/SignUp" exact element={<SignUp />} />
            <Route path="/Home" exact element={<Home />} />
            <Route path="/Income" exact element={<Income />} />
            <Route path="/Expense" exact element={<Expense />} />
            <Route path="/Dashboard" exact element={<Home />} />
          </Routes>
        </Router>
      </div>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          },
        }}
      />
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
