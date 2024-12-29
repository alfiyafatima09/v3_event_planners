"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  AuthError
} from 'firebase/auth';
import { auth, googleProvider } from '@/app/lib/firebase';

const ErrorAlert = ({ message }: { message: string }) => (
  <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-md text-sm mb-4">
    {message}
  </div>
);

const SuccessAlert = ({ message }: { message: string }) => (
  <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-2 rounded-md text-sm mb-4">
    {message}
  </div>
);

interface LoginProps {
  onToggleAuth: () => void;
}

const Login = ({ onToggleAuth }: LoginProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (err) {
      const error = err as AuthError;
      setError(error.message || 'Failed to log in');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setIsLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/');
    } catch (err) {
      const error = err as AuthError;
      setError(error.message || 'Failed to sign in with Google');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage('Password reset email sent!');
    } catch (err) {
      const error = err as AuthError;
      setError(error.message || 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-lg p-6 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
        Login
      </h2>

      {successMessage && <SuccessAlert message={successMessage} />}
      {error && <ErrorAlert message={error} />}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-gray-900/50 border border-gray-700 rounded-md p-2.5 text-gray-200 focus:border-pink-500 text-sm"
          required
          disabled={isLoading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-gray-900/50 border border-gray-700 rounded-md p-2.5 text-gray-200 focus:border-pink-500 text-sm"
          required
          disabled={isLoading}
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 text-gray-900 font-semibold p-2.5 rounded-md hover:opacity-90 transition-opacity text-sm disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 text-gray-900 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging in...
            </span>
          ) : (
            'Login'
          )}
        </button>
      </form>

      <div className="mt-6">
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center bg-gray-900/50 border border-gray-700 rounded-md py-2 text-sm text-gray-200 hover:bg-gray-800 transition-colors disabled:opacity-50"
          disabled={isLoading}
        >
          <Image src="/logo.png" alt="Google Logo" width={20} height={20} className="mr-2" />
          {isLoading ? 'Connecting...' : 'Sign in with Google'}
        </button>
      </div>

      <p className="text-center text-gray-400 text-xs md:text-sm mt-4">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={onToggleAuth}
          className="text-pink-400 hover:text-pink-300"
          disabled={isLoading}
        >
          Sign Up
        </button>
      </p>

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
    </div>
  );
};

export default Login;