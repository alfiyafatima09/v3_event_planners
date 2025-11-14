"use client";
import React from "react";
import StarBackground from "@/components/starBackground";
import Image from "next/image";
import EventsGrid from "@/components/EventBox";
import StatCard from "@/components/StatCard";

export default function Home() {
  return (
    <div>
      <StarBackground />
      <div className="mx-auto max-w-7xl sm:pt-0 sm:px-0 lg:px-8 lg:py-8">
        <div className="relative isolate overflow-hidden px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-20 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0 ">
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
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start"></div>
          </div>
          <div className="flex-1 w-full max-w-sm lg:max-w-md xl:max-w-lg mx-auto">
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

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 py-12">
          <StatCard value="500+" label="Events Conducted" />
          <StatCard value="10+" label="Years Experience" />
          <StatCard value="1000+" label="Happy Clients" />
        </div>

        <EventsGrid />
      </div>
    </div>
  );
}