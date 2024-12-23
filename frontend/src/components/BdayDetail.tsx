import React from 'react';
import Image from 'next/image';

interface BdayDetailProps {
  detail: {
    image: string;
    info: string[];
    cost: string;
  };
  isReversed: boolean;
}

const BdayDetail: React.FC<BdayDetailProps> = ({ detail, isReversed }) => {
  return (
    <div className="bg-gray-800/30 rounded-xl p-6 hover:bg-gray-800/50 transition-all duration-300">
      <div
        className={`flex flex-col md:flex-row items-center gap-8 ${
          isReversed ? 'md:flex-row-reverse' : ''
        }`}
      >

        <div className="w-full md:w-1/2 relative">
          <div className="relative aspect-video overflow-hidden rounded-lg shadow-xl">
            <Image
              src={detail.image}
              alt="Event"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col space-y-6 text-center md:text-left">
          <div className="space-y-4">
            {detail.info.map((point, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="hidden md:inline text-purple-400 mt-1">•</span>
                <p className="text-gray-200 text-lg leading-relaxed">
                  {point}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-700 pt-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Package Price</p>
              <p className="text-3xl font-bold text-green-400">
                {detail.cost}
              </p>
            </div>
          </div>

          <button className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 
            text-white rounded-lg font-semibold
            hover:from-purple-700 hover:to-blue-700 
            transform transition-all duration-300 hover:shadow-lg
            hover:shadow-purple-500/20">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BdayDetail;