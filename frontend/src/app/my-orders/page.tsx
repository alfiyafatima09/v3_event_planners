"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/app/lib/firebase';
import { getOrders } from '@/lib/firestore';
import { Order } from '@/app/types/firestore';
import Link from 'next/link';

export default function MyOrdersPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected' | 'completed'>('all');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        router.push('/login');
        return;
      }
      setUser(firebaseUser);
      loadOrders(firebaseUser.uid);
    });

    return () => unsubscribe();
  }, [router]);

  const loadOrders = async (userId: string) => {
    try {
      setLoading(true);
      const status = filter === 'all' ? undefined : filter;
      const ordersData = await getOrders(userId, status);
      setOrders(ordersData);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadOrders(user.uid);
    }
  }, [filter, user]);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      case 'accepted': return 'bg-green-500/20 text-green-400 border-green-500';
      case 'rejected': return 'bg-red-500/20 text-red-400 border-red-500';
      case 'completed': return 'bg-blue-500/20 text-blue-400 border-blue-500';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'accepted': return '✅';
      case 'rejected': return '❌';
      case 'completed': return '🎉';
      default: return '📦';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
          >
            ← Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
            My Orders
          </h1>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(['all', 'pending', 'accepted', 'rejected', 'completed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                filter === status
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)} ({orders.filter(o => status === 'all' || o.status === status).length})
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg mb-4">No orders found</p>
              <Link
                href="/order"
                className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Browse Packages
              </Link>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-pink-500/50 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{getStatusIcon(order.status)}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                        {order.status.toUpperCase()}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {order.createdAt.toLocaleDateString()} at {order.createdAt.toLocaleTimeString()}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2">{order.packageName}</h3>
                    <p className="text-gray-400 mb-1">
                      <span className="font-semibold">Category:</span> {order.packageCategory}
                    </p>
                    <p className="text-gray-400 mb-3">
                      <span className="font-semibold">Price:</span> ₹{order.packageCost}
                    </p>
                    
                    <div className="mt-3">
                      <p className="text-sm font-semibold text-gray-300 mb-2">Package Includes:</p>
                      <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                        {order.packageInfo.map((info, idx) => (
                          <li key={idx}>{info}</li>
                        ))}
                      </ul>
                    </div>
                    
                    {order.adminNotes && (
                      <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/50 rounded">
                        <p className="text-sm font-semibold text-blue-400 mb-1">Admin Notes:</p>
                        <p className="text-sm text-blue-300">{order.adminNotes}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 md:items-end">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-400">₹{order.packageCost}</p>
                      <p className="text-xs text-gray-400">Total Amount</p>
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

