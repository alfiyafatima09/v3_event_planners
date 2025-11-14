"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/app/lib/firebase';
import { ClipboardDocumentListIcon, PlusCircleIcon } from '@heroicons/react/24/solid';

// Admin user ID - only this user can access admin pages
const ADMIN_USER_ID = process.env.NEXT_PUBLIC_ADMIN_USER_ID;

export default function AdminDashboard() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        router.push('/login');
        return;
      }

      // Check if current user is the admin
      if (firebaseUser.uid !== ADMIN_USER_ID) {
        alert('Access denied. Only admin can access this page.');
        router.push('/');
        return;
      }

      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/admin/orders"
            className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-pink-500/50 transition-colors group"
          >
            <ClipboardDocumentListIcon className="h-12 w-12 text-pink-500 mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold mb-2">Manage Orders</h2>
            <p className="text-gray-400">View and manage customer orders</p>
          </Link>

          <Link
            href="/admin/events"
            className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-pink-500/50 transition-colors group"
          >
            <PlusCircleIcon className="h-12 w-12 text-purple-500 mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold mb-2">Manage Events</h2>
            <p className="text-gray-400">Add, edit, and delete event packages</p>
          </Link>

          <Link
            href="/admin/feedback"
            className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-pink-500/50 transition-colors group"
          >
            <svg className="h-12 w-12 text-yellow-500 mb-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <h2 className="text-2xl font-bold mb-2">View Feedback</h2>
            <p className="text-gray-400">Read customer feedback and ratings</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

