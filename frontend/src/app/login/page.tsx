"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/app/lib/firebase';
import Login from '@/components/Login';
import Signup from '@/components/Signup';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const toggleAuth = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      {isLogin ? (
        <Login onToggleAuth={toggleAuth} />
      ) : (
        <Signup onToggleAuth={toggleAuth} />
      )}
    </div>
  );
}