"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useAuth } from './AuthContext';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const { signIn, signUp, resetPassword, signInWithGoogle, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      await signIn({ email, password });
    } else {
      await signUp({ email, password });
    }
  };

  const handleForgotPassword = async () => {
    if (email) {
      await resetPassword(email);
      alert('Password reset email sent. Please check your inbox.');
    } else {
      alert('Please enter your email address.');
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        {error && <div className="mb-4 text-sm text-red-500">{error}</div>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Full Name input for Sign Up */}
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-md p-2.5 text-gray-200 focus:border-pink-500 text-sm"
            />
          )}

          {/* Email input */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-900/50 border border-gray-700 rounded-md p-2.5 text-gray-200 focus:border-pink-500 text-sm"
          />

          {/* Password input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-900/50 border border-gray-700 rounded-md p-2.5 text-gray-200 focus:border-pink-500 text-sm"
          />

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-gray-900 font-semibold p-2.5 rounded-md hover:opacity-90 transition-opacity text-sm"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6">
          {/* Google Sign In */}
          <button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center bg-gray-900/50 border border-gray-700 rounded-md py-2 text-sm text-gray-200 hover:bg-gray-800 transition-colors"
          >
            <Image
  src="/logo.png" // Local image in the 'public' folder
  alt="Google Logo"
  width={20}
  height={20}
  className="mr-2"
/>

            Sign in with Google
          </button>
        </div>

        <p className="text-center text-gray-400 text-xs md:text-sm mt-4">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-pink-400 hover:text-pink-300"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>

        {/* Forgot Password link */}
        {isLogin && (
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-pink-400 hover:text-pink-300"
            >
              Forgot Password?
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
