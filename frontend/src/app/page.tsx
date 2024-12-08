"use client";
import React from 'react';
import StarBackground from '@/components/starBackground';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <StarBackground />
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-8">

        <div className="relative isolate overflow-hidden px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -z-10 size-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
          >
            <circle r={512} cx={512} cy={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#000000" />
                <stop offset={1} stopColor="#000000" />
              </radialGradient>
            </defs>
          </svg>
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-balance text-4xl font-bold tracking-tight animate-pulse bg-gradient-to-r from-pink-400 via-white to-blue-400 bg-clip-text text-transparent sm:text-5xl">
              Welcome to V3_Events
            </h2>
            <p className="mt-6 text-pretty text-xl/8 font-medium bg-gradient-to-r from-blue-200 via-pink-200 to-white text-transparent bg-clip-text animate-[gradient_3s_ease-in-out_infinite]">
              Make your events more engaging with V3_Events
            </p>
            <p className="mt-6 text-pretty text-xl/8 font-medium bg-gradient-to-r from-pink-200 via-white to-blue-200 text-transparent bg-clip-text animate-[gradient_3s_ease-in-out_infinite]">
              We provide the best services for your events
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
            </div>
          </div>
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
    </div>
  )
}