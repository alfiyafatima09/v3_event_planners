import React from 'react';

interface StatCardProps {
  value: string;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label }) => {
  return (
    <div className="group relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative p-8 bg-black ring-1 ring-gray-900/5 leading-none flex flex-col items-center">
        <h3 className="text-6xl font-bold text-white pb-2">
          {value}
        </h3>
        <p className="text-lg font-medium text-white mt-4">
          {label}
        </p>
        <div className="h-1 w-12 bg-gradient-to-r from-pink-500 to-blue-500 mt-4 group-hover:w-24 transition-all duration-300"></div>
      </div>
    </div>
  );
};

export default StatCard;

