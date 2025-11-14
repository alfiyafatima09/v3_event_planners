import React from 'react';
import Image from 'next/image';

interface PackageCardProps {
  package: {
    id: number;
    image: string;
    info: string[];
    cost: string;
    category: string;
  };
}

const PackageCard: React.FC<PackageCardProps> = ({ package: pkg }) => {
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
        <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 
          text-white rounded-lg font-semibold text-sm
          hover:from-purple-700 hover:to-blue-700 
          transform transition-all duration-300 hover:shadow-lg
          hover:shadow-purple-500/20">
          Order Now
        </button>
      </div>
    </div>
  );
};

export default PackageCard;
