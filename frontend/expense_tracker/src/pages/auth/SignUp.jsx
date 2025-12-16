import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

import AuthLayout from '../../components/Layouts/AuthLayout';
import Input from '../../components/Inputs/Inputs';
import { validateEmail } from '../../utils/helper';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosinstance';
//import { updateUser } from '../../context/userContext';


const SignUp = () => {
  const { updateUser } = useContext(UserContext);
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Handle Sign Up Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImageUrl = '';

    if (!fullName) {
      setError('Please enter your name');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError('Please enter the password');
      return;
    }

    setError('');

    // ✅ SignUp API Call
    try {
      const requestData = {
        fullName,
        email,
        password,
      };
      console.log("📤 Sending registration request:", requestData);
      
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, requestData);

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        updateUser(user);
        navigate('/Login');
      }
    } catch (error) {
      console.error("❌ Registration error:", error.response?.data || error.message);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div>
      <AuthLayout>
        <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Create an Account</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-[5px] mb-6">
            Join us today by entering your details below.
          </p>

          <form onSubmit={handleSignUp}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                value={fullName}
                onChange={({ target }) => setFullName(target.value)}
                label="Full Name"
                placeholder="John"
                type="text"
              />
              <Input
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                label="Email Address"
                placeholder="johndoe@example.com"
                type="text"
              />
              <div className="col-span-2">
                <Input
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                  label="Password"
                  placeholder="Minimum of 8 characters"
                  type="password"
                />
              </div>
              <div className="mt-2">
                {error && <p className="text-red-500 text-sm mb-4 pb-2.5">{error}</p>}
                <button type="submit" className="btn-primary">
                  SIGNUP
                </button>
                <div className="">
                  <p className="text-[13px] text-gray-700 dark:text-gray-300 mt-3">
                    Already have an account?{' '}
                    <Link className="font-medium text-purple-600 dark:text-purple-400 underline" to="/Login">
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </AuthLayout>
    </div>
  );
};

export default SignUp;
