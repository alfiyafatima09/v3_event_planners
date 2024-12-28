"use client";   
import React, { createContext, useContext, useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut as firebaseSignOut, sendPasswordResetEmail, onAuthStateChanged, User } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth, googleProvider } from '@/app/lib/firebase';
import { AuthContextType, AuthFormData } from '@/app/types/auth';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleError = (error: FirebaseError) => {
    const errorMessage = (() => {
      switch (error.code) {
        case 'auth/user-not-found':
          return 'No account found with this email.';
        case 'auth/wrong-password':
          return 'Invalid password.';
        case 'auth/email-already-in-use':
          return 'An account with this email already exists.';
        case 'auth/weak-password':
          return 'Password should be at least 6 characters.';
        case 'auth/invalid-email':
          return 'Invalid email address.';
        case 'auth/popup-closed-by-user':
          return 'Sign-in popup was closed before completion.';
        default:
          return error.message;
      }
    })();
    setError(errorMessage);
  };

  const signIn = async (data: AuthFormData) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setError(null);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        handleError(error);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  const signUp = async (data: AuthFormData) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      setError(null);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        handleError(error);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setError(null);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        handleError(error);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setError(null);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        handleError(error);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      setError(null);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        handleError(error);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, signIn, signUp, signInWithGoogle, signOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
