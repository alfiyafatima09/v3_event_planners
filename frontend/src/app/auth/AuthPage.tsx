"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useAuth } from './AuthContext';
import { useRouter } from 'next/navigation';

// Define types for the alert components
type AlertProps = {
  message: string;
};

const AuthPage = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { signIn, signUp, resetPassword, signInWithGoogle, error, user } = useAuth();

  // Redirect if user is already authenticated
  useEffect(() => {
    if (user) {
      router.push('/'); // Replace with your authenticated route
    }
  }, [user, router]);

  // Success message timeout
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isLogin) {
        await signIn({ email, password });
        setSuccessMessage('Logged in successfully!');
        router.push('/'); // Replace with your authenticated route
      } else {
        await signUp({ email, password });
        setSuccessMessage('Account created successfully!');
        // You might want to add the fullName to the user profile here
      }
    } catch {
      // Error is handled by AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      setSuccessMessage('Logged in with Google successfully!');
      router.push('/'); // Replace with your authenticated route
    } catch {
      // Error is handled by AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setSuccessMessage('Please enter your email address.');
      return;
    }
    setIsLoading(true);
    try {
      await resetPassword(email);
      setSuccessMessage('Password reset email sent. Please check your inbox.');
    } catch {
      // Error is handled by AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  // Success message component
  const SuccessAlert: React.FC<AlertProps> = ({ message }) => (
    <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-md">
      <p className="text-green-500 text-sm text-center">{message}</p>
    </div>
  );

  // Error message component
  const ErrorAlert: React.FC<AlertProps> = ({ message }) => (
    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-md">
      <p className="text-red-500 text-sm text-center">{message}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-lg p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        {successMessage && <SuccessAlert message={successMessage} />}
        {error && <ErrorAlert message={error} />}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-md p-2.5 text-gray-200 focus:border-pink-500 text-sm"
              disabled={isLoading}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-900/50 border border-gray-700 rounded-md p-2.5 text-gray-200 focus:border-pink-500 text-sm"
            disabled={isLoading}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-900/50 border border-gray-700 rounded-md p-2.5 text-gray-200 focus:border-pink-500 text-sm"
            disabled={isLoading}
            required
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-gray-900 font-semibold p-2.5 rounded-md hover:opacity-90 transition-opacity text-sm disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isLogin ? 'Logging in...' : 'Signing up...'}
              </span>
            ) : (
              <>{isLogin ? 'Login' : 'Sign Up'}</>
            )}
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center bg-gray-900/50 border border-gray-700 rounded-md py-2 text-sm text-gray-200 hover:bg-gray-800 transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            <Image
              src="/logo.png"
              alt="Google Logo"
              width={20}
              height={20}
              className="mr-2"
            />
            {isLoading ? 'Connecting...' : 'Sign in with Google'}
          </button>
        </div>

        <p className="text-center text-gray-400 text-xs md:text-sm mt-4">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-pink-400 hover:text-pink-300"
            disabled={isLoading}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>

        {isLogin && (
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-pink-400 hover:text-pink-300"
              disabled={isLoading}
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