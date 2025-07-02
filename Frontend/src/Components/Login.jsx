import React, { useState } from 'react';
import { loginUser, logoutUser } from '../Api/UserApi';
import { LogIn, LogOut } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from '@tanstack/react-router';
import { login, logout } from '../Store/Slice/AuthSlice.js';

const MinimalLogin = ({ state }) => {
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [error, setError]         = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate  = useNavigate();
  const dispatch  = useDispatch();
  const auth       = useSelector(s => s.auth);

  const validateEmail = (e) =>
    /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(e);

  const handleLogin = async e => {
    e.preventDefault();
    setError('');
    if (!validateEmail(email)) {
      return setError('Please enter a valid email address.');
    }
    setIsLoading(true);
    try {
      const { user } = await loginUser(email, password);
      dispatch(login(user));
      navigate({ to: '/dashboard' });
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logoutUser(); // optional API call
    } catch {
      // swallow
    } finally {
      dispatch(logout());
      setIsLoading(false);
      navigate({ to: '/loginpage' });
    }
  };

  // if logged in, show logout
  if (auth.user) {
    return (
      <div className="w-full flex flex-col items-center gap-3 p-6">
        <LogOut size={28} className="text-red-500" />
        <h1 className="text-xl font-semibold">Welcome, {auth.user.email}</h1>
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="mt-4 w-[80%] py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
        >
          {isLoading ? 'Logging out…' : 'Log out'}
        </button>
      </div>
    );
  }

  // otherwise show login form
  return (
    <div className="w-full flex flex-col items-center gap-3 p-6">
      <LogIn size={28} className="text-blue-500" />
      <h1 className="text-xl font-semibold">Login</h1>

      {error && (
        <div className="p-2 bg-red-100 text-red-600 rounded w-full text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin} className="w-[80%] flex flex-col gap-4">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          pattern="[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
          className="w-full h-10 px-3 border rounded focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          required
        />

        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full h-10 px-3 border rounded focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? 'Logging in…' : 'Log in'}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        Don’t have an account?{' '}
        <span
          onClick={() => state(false)}
          className="text-blue-500 hover:text-blue-700 cursor-pointer"
        >
          Register
        </span>
      </p>
    </div>
  );
};

export default MinimalLogin;
