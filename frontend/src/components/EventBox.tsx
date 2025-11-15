"use client";
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface EventCardProps {
  imageUrl: string;
  title: string;
  index: number;
  link: string; 
}

const EventCard: React.FC<EventCardProps> = ({ imageUrl, title, index, link }) => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('translate-y-10', 'opacity-0');
          entry.target.classList.add('translate-y-0', 'opacity-100');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const target = document.querySelector(`#event-card-${index}`);
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [index]);

  return (
    <div 
      id={`event-card-${index}`}
      className="w-full group relative overflow-hidden rounded-2xl translate-y-10 opacity-0 transition-all duration-700 ease-out"
    >
      <Link href={link} legacyBehavior>
        <a className="block">
          <div className="aspect-square w-full overflow-hidden rounded-2xl relative">
            <Image 
              src={imageUrl} 
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white transition-all duration-300 group-hover:text-pink-300">
                    {title}
                  </h3>
                  <div className="h-1 bg-pink-500 mt-2 w-12 transition-all duration-300 group-hover:w-24" />
                </div>
                
                <ArrowRight 
                  className="w-6 h-6 text-white transform translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" 
                />
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

const EventsGrid = () => {
  const events = [
    { id: 1, title: "Birthday Parties", imageUrl: "/img1.jpg", category: "birthday" },
    { id: 2, title: "Engagements", imageUrl: "/engagement.png", category: "engagement" },
    { id: 3, title: "Housewarming", imageUrl: "/house-1.jpg", category: "housewarming" },
    { id: 4, title: "Puja Events", imageUrl: "/puja.png", category: "puja" },
    { id: 5, title: "Baby Showers", imageUrl: "/baby-shower.jpg", category: "babyShower" },
    { id: 6, title: "Naming Ceremony", imageUrl: "/naming-ceremony3.jpg", category: "namingCeremony" },
  ];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('translate-y-10', 'opacity-0');
          entry.target.classList.add('translate-y-0', 'opacity-100');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const target = document.querySelector('#header-section');
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  return (
    <section className="bg-black py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div 
          id="header-section" 
          className="text-center mb-12 md:mb-16 translate-y-10 opacity-0 transition-all duration-700 ease-out"
        >
          <span className="inline-block text-pink-500 text-sm md:text-lg font-semibold tracking-wider uppercase mb-2 md:mb-4">
            Experience the Magic
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
            Celebrate Life&apos;s <span className="text-pink-500">Special Moments</span>
          </h2>
          <p className="text-sm md:text-lg text-gray-400 max-w-2xl mx-auto">
            From intimate gatherings to grand celebrations, we transform your dreams into unforgettable experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <EventCard 
              key={event.id} 
              imageUrl={event.imageUrl}
              title={event.title}
              link={`/order?category=${event.category}`}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsGrid;