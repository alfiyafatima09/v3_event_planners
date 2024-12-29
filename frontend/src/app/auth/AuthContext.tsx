"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
  User,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth, googleProvider } from "@/app/lib/firebase";
import { AuthContextType, AuthFormData } from "@/app/types/auth";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleError = (error: FirebaseError) => {
    const errorMessage = {
      "auth/user-not-found": "No account found with this email.",
      "auth/wrong-password": "Invalid password.",
      "auth/email-already-in-use": "An account with this email already exists.",
      "auth/weak-password": "Password should be at least 6 characters.",
      "auth/invalid-email": "Invalid email address.",
      "auth/popup-closed-by-user": "Sign-in popup was closed before completion.",
      "auth/account-exists-with-different-credential":
        "An account already exists with a different sign-in method.",
    }[error.code] || "An error occurred. Please try again.";

    setError(errorMessage);
    setTimeout(() => setError(null), 5000);
  };

  const signIn = async (data: AuthFormData) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setError(null);
      router.push("/");
    } catch (error) {
      if (error instanceof FirebaseError) handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (data: AuthFormData) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      if (data.fullName) {
        await updateProfile(userCredential.user, { displayName: data.fullName });
      }
      setUser(userCredential.user);
      setError(null);
      router.push("/");
    } catch (error) {
      if (error instanceof FirebaseError) handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      setError(null);
      router.push("/");
    } catch (error) {
      if (error instanceof FirebaseError) handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setError(null);
      router.push("/auth");
    } catch (error) {
      if (error instanceof FirebaseError) handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setError(null);
    } catch (error) {
      if (error instanceof FirebaseError) handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
