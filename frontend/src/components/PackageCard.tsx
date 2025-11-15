"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { auth } from '@/app/lib/firebase';
import { createOrder } from '@/lib/firestore';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface PackageCardProps {
  package: {
    id: number | string;
    image: string;
    info: string[];
    cost: string;
    category: string;
  };
}

const PackageCard: React.FC<PackageCardProps> = ({ package: pkg }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleOrderClick = () => {
    const user = auth.currentUser;
    if (!user) {
      router.push('/login');
      return;
    }
    setShowConfirmModal(true);
  };

  const handleConfirmOrder = async () => {
    const user = auth.currentUser;
    if (!user) {
      router.push('/login');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await createOrder({
        userId: user.uid,
        userEmail: user.email || '',
        userName: user.displayName || '',
        packageId: String(pkg.id),
        packageCategory: pkg.category,
        packageName: `Package ${pkg.id}`,
        packageCost: pkg.cost,
        packageInfo: pkg.info,
        status: 'pending',
      });
      
      setShowConfirmModal(false);
      alert('Order placed successfully! We will contact you soon.');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to place order';
      setError(errorMessage);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group relative bg-gray-800/30 rounded-xl overflow-hidden hover:bg-gray-800/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-2">
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={pkg.image}
          alt={`Package ${pkg.id}`}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Features List */}
        <div className="space-y-2">
          {pkg.info.map((point, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-purple-400 mt-1">•</span>
              <p className="text-gray-200 text-sm leading-relaxed">
                {point}
              </p>
            </div>
          ))}
        </div>

        {/* Price Section */}
        <div className="border-t border-gray-700 pt-4">
          <p className="text-xs text-gray-400 mb-1">Package Price</p>
          <p className="text-2xl font-bold text-green-400">
            ₹{pkg.cost}
          </p>
        </div>

        {/* Order Button */}
        <button
          onClick={handleOrderClick}
          disabled={loading}
          className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 
            text-white rounded-lg font-semibold text-sm
            hover:from-purple-700 hover:to-blue-700 
            transform transition-all duration-300 hover:shadow-lg
            hover:shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Placing Order...' : 'Order Now'}
        </button>
        
        {error && (
          <p className="text-xs text-red-400 text-center">{error}</p>
        )}
      </div>

      {/* Booking Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full border border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Confirm Booking</h2>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-gray-300 text-center text-lg mb-2">
                Are you sure you want to book?
              </p>
              <p className="text-gray-400 text-center text-sm">
                We will contact you based on availability.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleConfirmOrder}
                disabled={loading}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Placing Order...' : 'Yes'}
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                disabled={loading}
                className="flex-1 px-4 py-3 bg-gray-800 text-gray-300 rounded-lg font-semibold hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageCard;
