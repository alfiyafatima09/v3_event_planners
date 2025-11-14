"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/app/lib/firebase';
import { getFeedback } from '@/lib/firestore';
import { Feedback } from '@/app/types/firestore';
import { StarIcon } from '@heroicons/react/24/solid';

// Admin user ID - only this user can access admin pages
const ADMIN_USER_ID = process.env.NEXT_PUBLIC_ADMIN_USER_ID;

export default function AdminFeedbackPage() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const [user, setUser] = useState<any>(null);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
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
      loadFeedback();
    });

    return () => unsubscribe();
  }, [router]);

  const loadFeedback = async () => {
    try {
      setLoading(true);
      const feedbackData = await getFeedback();
      setFeedback(feedbackData);
    } catch (error) {
      console.error('Error loading feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: string) => {
    const numRating = parseInt(rating);
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <StarIcon
            key={star}
            className={`h-5 w-5 ${
              star <= numRating ? 'text-yellow-400 fill-current' : 'text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading feedback...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.push('/admin')}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
            Admin - Feedback Management
          </h1>
        </div>

        {/* Feedback List */}
        <div className="space-y-4">
          {feedback.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No feedback submitted yet.</p>
            </div>
          ) : (
            feedback.map((item) => (
              <div
                key={item.id}
                className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-pink-500/50 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div>
                        <p className="text-lg font-bold text-white">{item.name}</p>
                        <p className="text-sm text-gray-400">{item.email}</p>
                      </div>
                      <div className="ml-auto md:ml-0">
                        {renderStars(item.rating)}
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">
                        {item.eventType}
                      </span>
                      <span className="ml-3 text-sm text-gray-400">
                        {item.createdAt.toLocaleDateString()} at {item.createdAt.toLocaleTimeString()}
                      </span>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm font-semibold text-gray-300 mb-2">Feedback:</p>
                      <p className="text-gray-300 leading-relaxed">{item.feedback}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

