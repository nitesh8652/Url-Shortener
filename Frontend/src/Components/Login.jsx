import React, { useState } from 'react';
import { loginUser } from '../Api/UserApi';
import { LogIn } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from '@tanstack/react-router';
import { login } from '../Store/Slice/AuthSlice.js';


const MinimalLogin = ({ state }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(auth);

  const validateEmail = (email) => {
   return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  }


  const handleSubmit = async (e) => {
     e.preventDefault()
    setError('');
    setIsLoading(true);

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }
    try {

      const data = await loginUser(email, password);
      setIsLoading(false);
      console.log("login successful", data);

      dispatch({
        type: 'auth/login',
        payload: data.user || { email }
      });

      navigate({ to: "/dashboard" })

    } catch (err) {
      setIsLoading(false);
      setError(null);
      setError(err.message || 'Login failed. Please try again.');
      console.error("Login Error:", err);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-3 p-6">
      <div className="flex justify-center mb-2">
        <LogIn size={28} className="text-blue-500" />
      </div>
      <h1 className="text-xl font-semibold text-center">Login</h1>

      {error && (
        <div className="p-2 bg-red-100 text-red-600 text-sm rounded w-full text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full space-y-4 flex flex-col items-center">

        <div className="container  flex flex-col items-center gap-6 w-[80%]">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-10 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-10 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            onClick={handleSubmit}
            className="w-full p-20 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>
        </div>

        <div className="mt-4 text-center text-sm text-gray-600 ">
          Don't have an account?
          <span onClick={() => state(false)} className="text-blue-500  hover:text-blue-700 cursor-pointer">Register</span>
        </div>

      </form>


    </div>
  );
};

export default MinimalLogin;
