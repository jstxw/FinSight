import React, { useState, useContext } from "react"; // ✅ add useContext

import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../../components/Layouts/AuthLayout";
import Input from "../../components/Inputs/Inputs";
import { validateEmail } from "../../utils/helper";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosinstance";
import { UserContext } from "../../context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      if (response.data.token && response.data.user) {
        localStorage.setItem("token", response.data.token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  // ✅ This is the real return of the component, not inside handlelogin
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 mid:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Welcome Back!</h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1.5 mb-6">
          Please enter your details to log in!
        </p>
        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="johndoe@example.com"
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Minimum of 8 characters"
            type="password"
          />
          {error && <p className="text-red-500 text-sm mb-4 pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary">
            LOGIN
          </button>
          <p className="text-[13px] text-gray-700 dark:text-gray-300 mt-3">
            Don't have an account?{" "}
            <Link className="font-medium text-purple-600 dark:text-purple-400 underline" to="/signup">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
