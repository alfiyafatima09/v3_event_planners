"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/app/lib/firebase';
import { getOrders, updateOrderStatus } from '@/lib/firestore';
import { Order } from '@/app/types/firestore';

// Admin user ID - only this user can access admin pages
const ADMIN_USER_ID = process.env.NEXT_PUBLIC_ADMIN_USER_ID;

export default function AdminOrdersPage() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected' | 'completed'>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [updating, setUpdating] = useState(false);

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
      loadOrders();
    });

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const status = filter === 'all' ? undefined : filter;
      const ordersData = await getOrders(undefined, status);
      setOrders(ordersData);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadOrders();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, user]);

  const handleStatusUpdate = async (orderId: string, status: Order['status']) => {
    try {
      setUpdating(true);
      const notes = adminNotes.trim() !== '' ? adminNotes.trim() : undefined;
      await updateOrderStatus(orderId, status, notes);
      setSelectedOrder(null);
      setAdminNotes('');
      await loadOrders();
      alert('Order status updated successfully!');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error updating order:', error);
      alert(`Failed to update order status: ${error.message || 'Unknown error'}`);
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      case 'accepted': return 'bg-green-500/20 text-green-400 border-green-500';
      case 'rejected': return 'bg-red-500/20 text-red-400 border-red-500';
      case 'completed': return 'bg-blue-500/20 text-blue-400 border-blue-500';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading orders...</p>
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
            Admin - Orders Management
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
              <p className="text-gray-400 text-lg">No orders found</p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-pink-500/50 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                        {order.status.toUpperCase()}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {order.createdAt.toDate()?.toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{order.packageName}</h3>
                    <p className="text-gray-400 mb-1">
                      <span className="font-semibold">Customer:</span> {order.userName || order.userEmail}
                    </p>
                    <p className="text-gray-400 mb-1">
                      <span className="font-semibold">Category:</span> {order.packageCategory}
                    </p>
                    <p className="text-gray-400 mb-2">
                      <span className="font-semibold">Price:</span> ₹{order.packageCost}
                    </p>
                    <div className="mt-2">
                      <p className="text-sm font-semibold text-gray-300 mb-1">Package Includes:</p>
                      <ul className="list-disc list-inside text-sm text-gray-400">
                        {order.packageInfo.map((info, idx) => (
                          <li key={idx}>{info}</li>
                        ))}
                      </ul>
                    </div>
                    {order.adminNotes && (
                      <div className="mt-2 p-2 bg-blue-500/10 border border-blue-500/50 rounded">
                        <p className="text-sm text-blue-400">
                          <span className="font-semibold">Admin Notes:</span> {order.adminNotes}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    {order.status === 'pending' && (
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Update Status
                      </button>
                    )}
                    {order.status !== 'pending' && (
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setAdminNotes(order.adminNotes || '');
                        }}
                        className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        View Details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Status Update Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full border border-gray-800">
            <h2 className="text-2xl font-bold mb-4">Update Order Status</h2>
            <p className="text-gray-400 mb-4">Order ID: {selectedOrder.id}</p>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Admin Notes (Optional)</label>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
                rows={3}
                placeholder="Add any notes about this order..."
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleStatusUpdate(selectedOrder.id, 'accepted')}
                disabled={updating}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                Accept
              </button>
              <button
                onClick={() => handleStatusUpdate(selectedOrder.id, 'rejected')}
                disabled={updating}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                Reject
              </button>
              <button
                onClick={() => handleStatusUpdate(selectedOrder.id, 'completed')}
                disabled={updating}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                Complete
              </button>
              <button
                onClick={() => {
                  setSelectedOrder(null);
                  setAdminNotes('');
                }}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

