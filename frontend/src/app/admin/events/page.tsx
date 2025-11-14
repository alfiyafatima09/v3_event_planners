"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/app/lib/firebase';
import { getEventPackages, addEventPackage, updateEventPackage, deleteEventPackage, getCategoryMetadata } from '@/lib/firestore';
import { EventPackage } from '@/app/types/firestore';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

// Admin user ID - only this user can access admin pages
const ADMIN_USER_ID = process.env.NEXT_PUBLIC_ADMIN_USER_ID;

export default function AdminEventsPage() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [packages, setPackages] = useState<EventPackage[]>([]);
  const [categories, setCategories] = useState<Record<string, { title: string; description: string }>>({});
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState<EventPackage | null>(null);
  const [formData, setFormData] = useState({
    category: '',
    image: '',
    cost: '',
    info: [''],
  });

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
      loadData();
    });

    return () => unsubscribe();
  }, [router]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [packagesData, categoriesData] = await Promise.all([
        getEventPackages(),
        getCategoryMetadata()
      ]);
      setPackages(packagesData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const packageData = {
        category: formData.category,
        image: formData.image,
        cost: formData.cost,
        info: formData.info.filter(item => item.trim() !== ''),
      };

      if (editingPackage) {
        await updateEventPackage(editingPackage.id, packageData);
      } else {
        await addEventPackage(packageData);
      }

      setShowForm(false);
      setEditingPackage(null);
      setFormData({ category: '', image: '', cost: '', info: [''] });
      await loadData();
    } catch (error) {
      console.error('Error saving package:', error);
      alert('Failed to save package');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this package?')) return;

    try {
      await deleteEventPackage(id);
      await loadData();
    } catch (error) {
      console.error('Error deleting package:', error);
      alert('Failed to delete package');
    }
  };

  const handleEdit = (pkg: EventPackage) => {
    setEditingPackage(pkg);
    setFormData({
      category: pkg.category,
      image: pkg.image,
      cost: pkg.cost,
      info: pkg.info.length > 0 ? pkg.info : [''],
    });
    setShowForm(true);
  };

  const addInfoField = () => {
    setFormData({ ...formData, info: [...formData.info, ''] });
  };

  const updateInfoField = (index: number, value: string) => {
    const newInfo = [...formData.info];
    newInfo[index] = value;
    setFormData({ ...formData, info: newInfo });
  };

  const removeInfoField = (index: number) => {
    const newInfo = formData.info.filter((_, i) => i !== index);
    setFormData({ ...formData, info: newInfo.length > 0 ? newInfo : [''] });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/admin')}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
              Admin - Events Management
            </h1>
          </div>
          <button
            onClick={() => {
              setEditingPackage(null);
              setFormData({ category: '', image: '', cost: '', info: [''] });
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            <PlusIcon className="h-5 w-5" />
            Add Event Package
          </button>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-pink-500/50 transition-colors"
            >
              <div className="mb-4">
                <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">
                  {categories[pkg.category]?.title || pkg.category}
                </span>
              </div>
              <p className="text-2xl font-bold text-green-400 mb-4">₹{pkg.cost}</p>
              <ul className="text-sm text-gray-400 mb-4 space-y-1">
                {pkg.info.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(pkg)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <PencilIcon className="h-4 w-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(pkg.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full border border-gray-800 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">
                {editingPackage ? 'Edit Event Package' : 'Add Event Package'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
                    required
                  >
                    <option value="">Select Category</option>
                    {Object.keys(categories).map((cat) => (
                      <option key={cat} value={cat}>{categories[cat].title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Image URL</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
                    placeholder="/img1.jpg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Cost</label>
                  <input
                    type="text"
                    value={formData.cost}
                    onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
                    placeholder="5000"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Package Info</label>
                  {formData.info.map((item, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateInfoField(index, e.target.value)}
                        className="flex-1 bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
                        placeholder="Feature description"
                        required
                      />
                      {formData.info.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeInfoField(index)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addInfoField}
                    className="mt-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                  >
                    Add Feature
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    {editingPackage ? 'Update Package' : 'Add Package'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingPackage(null);
                      setFormData({ category: '', image: '', cost: '', info: [''] });
                    }}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

