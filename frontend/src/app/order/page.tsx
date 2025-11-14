"use client";
import React, { useMemo, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import PackageCard from '@/components/PackageCard';
import CategoryFilter from '@/components/CategoryFilter';
import { allEventPackages, categoryMetadata } from '@/data/eventData';
import styles from '@/components/EventDetails.module.css';

const OrderPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryFromUrl = searchParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryFromUrl || null
  );

  // Update selected category when URL param changes
  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  // Filter packages by selected category
  const filteredPackages = useMemo(() => {
    if (selectedCategory === null) {
      return allEventPackages;
    }
    return allEventPackages.filter(pkg => pkg.category === selectedCategory);
  }, [selectedCategory]);

  // Handle category change - update URL without navigation
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    if (category) {
      router.replace(`/order?category=${category}`, { scroll: false });
    } else {
      router.replace('/order', { scroll: false });
    }
  };

  // Get current category metadata or default
  const currentMetadata = selectedCategory 
    ? categoryMetadata[selectedCategory] 
    : {
        title: 'All Event Packages',
        description: 'Browse through our complete collection of event packages. Filter by category to find exactly what you need for your special occasion.',
      };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <div className="px-4 py-8 md:py-12 mb-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center p-5
            bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 
            bg-clip-text text-transparent ${styles.gradientTitle}`}>
            {currentMetadata.title}
          </h1>
          <p className="text-gray-300 text-center max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            {currentMetadata.description}
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* Packages Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {filteredPackages.length > 0 ? (
          <>
            <div className="mb-6 text-center">
              <p className="text-gray-400 text-sm md:text-base">
                Showing {filteredPackages.length} package{filteredPackages.length !== 1 ? 's' : ''}
                {selectedCategory && ` in ${categoryMetadata[selectedCategory]?.title}`}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredPackages.map((pkg) => (
                <PackageCard key={pkg.id} package={pkg} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No packages found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
