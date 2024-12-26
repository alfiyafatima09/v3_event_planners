import React from "react";
import Image from "next/image";
import { pastEvents } from "@/data/pastEvents";

const PastEvents = () => {
  return (
    <div className="relative min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-16 animate-pulse bg-gradient-to-r from-pink-400 via-white to-blue-400 bg-clip-text text-transparent">
          Our Past Events
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-pink-400 via-blue-400 to-white hidden lg:block" />

          {pastEvents.map((event, index) => (
            <div
              key={event.id}
              className={`flex flex-col lg:flex-row items-center mb-16 ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
            >
              {/* Content */}
              <div
                className={`w-full lg:w-1/2 ${
                  index % 2 === 0 ? "lg:pr-12 lg:text-right" : "lg:pl-12"
                }`}
              >
                <div className="p-6 rounded-2xl bg-black/50 backdrop-blur-sm border border-white/10 shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-200 via-white to-blue-200 bg-clip-text text-transparent">
                    {event.name}
                  </h3>
                  <p className="mt-2 text-white/80">{event.date}</p>
                  <div className="mt-4 aspect-video relative rounded-lg overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
              </div>

              {/* Timeline dot */}
              <div className="w-4 h-4 rounded-full bg-white shadow-lg shadow-white/50 relative z-10 hidden lg:block" />

              {/* Empty space for opposite side */}
              <div className="hidden lg:block w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PastEvents;
