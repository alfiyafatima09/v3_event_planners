"use client";
import React from 'react';
import StarBackground from '@/components/starBackground';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <StarBackground />
      <div className="relative container mx-auto px-4 min-h-screen flex items-center justify-center">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 w-full">
          {/* Text Content */}
          <div className="flex-1 text-center max-w-2xl w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 animate-shine tracking-tight leading-tight text-white">
              Welcome to V3 Events!
            </h1>
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text transform transition-all duration-500 hover:scale-105">
                Where Ideas Spark
              </h2>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-gradient-to-r from-yellow-300 via-amber-300 to-yellow-300 bg-clip-text transform transition-all duration-500 hover:scale-105">
                Designs Shine
              </h2>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 bg-clip-text transform transition-all duration-500 hover:scale-105">
                And Memories Last Forever
              </h2>
            </div>
          </div>

          {/* Image Container */}
          <div className="flex-1 w-full max-w-sm lg:max-w-md xl:max-w-lg">
            <div className="relative aspect-square animate-[float_8s_ease-in-out_infinite] shadow-2xl shadow-amber-500/20 rounded-2xl overflow-hidden">
              <Image
                src="/img1.jpg"
                alt="V3 Events Logo"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain p-4 bg-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
