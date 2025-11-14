"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/app/lib/firebase';
import { createOrUpdateUser } from '@/lib/firestore';

export default function SetAdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        router.push('/login');
        return;
      }
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, [router]);

  const handleSetAdmin = async () => {
    if (!user) return;

    setLoading(true);
    setStatus('Setting admin status...');

    try {
      await createOrUpdateUser(user.uid, {
        email: user.email || '',
        displayName: user.displayName || undefined,
        isAdmin: true,
      });
      setStatus('✅ Success! You are now an admin. You can access /admin pages now.');
      setTimeout(() => {
        router.push('/admin');
      }, 2000);
    } catch (error: any) {
      setStatus(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-900 rounded-lg p-8 border border-gray-800">
        <h1 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
          Set Admin Status
        </h1>

        <div className="mb-6">
          <p className="text-gray-400 text-sm mb-2">Your User ID:</p>
          <p className="text-xs text-gray-500 font-mono break-all bg-gray-800 p-2 rounded">
            {user.uid}
          </p>
        </div>

        <div className="mb-6">
          <p className="text-gray-400 text-sm mb-2">Your Email:</p>
          <p className="text-white">{user.email}</p>
        </div>

        {status && (
          <div className={`mb-4 p-4 rounded-md ${
            status.includes('✅') 
              ? 'bg-green-500/10 border border-green-500' 
              : 'bg-red-500/10 border border-red-500'
          }`}>
            <p className={`text-sm ${status.includes('✅') ? 'text-green-400' : 'text-red-400'}`}>
              {status}
            </p>
          </div>
        )}

        <button
          onClick={handleSetAdmin}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Setting Admin...' : 'Make Me Admin'}
        </button>

        <button
          onClick={() => router.push('/')}
          className="w-full mt-4 bg-gray-800 text-gray-300 font-semibold py-3 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Back to Home
        </button>

        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/50 rounded">
          <p className="text-xs text-blue-400">
            <strong>Note:</strong> This will create/update your user document in Firestore with isAdmin: true.
            After clicking, you'll be redirected to the admin dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}

