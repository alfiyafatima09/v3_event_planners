"use client";
import React, { useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import PackageCard from "@/components/PackageCard";
import CategoryFilter from "@/components/CategoryFilter";
import { getEventPackages, getCategoryMetadata } from "@/lib/firestore";
import styles from "@/components/EventDetails.module.css";

const OrderPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryFromUrl = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryFromUrl || null
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [packages, setPackages] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [categories, setCategories] = useState<Record<string, any>>({});

  const [loading, setLoading] = useState(true);

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pkg = await getEventPackages(); // fetch ALL packages first
        const meta = await getCategoryMetadata(); // fetch metadata
        setPackages(pkg);
        setCategories(meta);
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update selected category when URL changes
  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    } else {
      setSelectedCategory(null);
    }
  }, [categoryFromUrl]);

  // Filter packages by selected category
  const filteredPackages = useMemo(() => {
    if (!selectedCategory) return packages;
    return packages.filter((pkg) => pkg.category === selectedCategory);
  }, [selectedCategory, packages]);

  // Update URL on category change
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    if (category) {
      router.replace(`/order?category=${category}`, { scroll: false });
    } else {
      router.replace(`/order`, { scroll: false });
    }
  };

  const currentMetadata =
    selectedCategory && categories[selectedCategory]
      ? categories[selectedCategory]
      : {
          title: "All Event Packages",
          description:
            "Browse through our complete collection of event packages. Filter by category to find exactly what you need for your special occasion.",
        };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="px-4 py-8 md:py-12 mb-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <h1
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center p-5
            bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 
            bg-clip-text text-transparent ${styles.gradientTitle}`}
          >
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
        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">Loading packages...</p>
          </div>
        ) : filteredPackages.length > 0 ? (
          <>
            <div className="mb-6 text-center">
              <p className="text-gray-400 text-sm md:text-base">
                Showing {filteredPackages.length} package
                {filteredPackages.length !== 1 ? "s" : ""}
                {selectedCategory &&
                  ` in ${categories[selectedCategory]?.title}`}
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
            <p className="text-gray-400 text-lg">
              No packages found for this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
