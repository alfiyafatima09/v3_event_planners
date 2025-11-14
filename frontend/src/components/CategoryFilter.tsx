"use client";
import React from 'react';
import { categoryMetadata } from '@/data/eventData';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  const categories = Object.keys(categoryMetadata);

  const categoryLabels: Record<string, string> = {
    birthday: 'Birthday Parties',
    engagement: 'Engagements',
    housewarming: 'Housewarming',
    puja: 'Puja Events',
    babyShower: 'Baby Showers',
    namingCeremony: 'Naming Ceremony',
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
      <button
        onClick={() => onCategoryChange(null)}
        className={`px-4 py-2 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 ${
          selectedCategory === null
            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
      >
        All Events
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 ${
            selectedCategory === category
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          {categoryLabels[category]}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
