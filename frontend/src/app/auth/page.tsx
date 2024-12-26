"use client";
import React, { useState } from 'react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
          {isLogin ? (isAdmin ? 'Admin Login' : 'Login') : 'Sign Up'}
        </h2>
        
        <form className="space-y-6">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full bg-gray-900/50 border border-gray-700 rounded-md p-2.5 text-gray-200 focus:border-pink-500 text-sm"
            />
          )}
          
          <input
            type="email"
            placeholder="Email Address"
            className="w-full bg-gray-900/50 border border-gray-700 rounded-md p-2.5 text-gray-200 focus:border-pink-500 text-sm"
          />
          
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-gray-900/50 border border-gray-700 rounded-md p-2.5 text-gray-200 focus:border-pink-500 text-sm"
          />

          {isLogin && (
            <div className="flex items-center justify-between text-xs md:text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="bg-gray-900 border-gray-700 text-pink-500 h-4 w-4"
                  checked={isAdmin}
                  onChange={() => setIsAdmin(!isAdmin)}
                />
                <span className="text-gray-400">Login as Admin</span>
              </label>
              <button type="button" className="text-pink-400 hover:text-pink-300">
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-gray-900 font-semibold p-2.5 rounded-md hover:opacity-90 transition-opacity text-sm"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>

          <p className="text-center text-gray-400 text-xs md:text-sm">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setIsAdmin(false);
              }}
              className="text-pink-400 hover:text-pink-300"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;