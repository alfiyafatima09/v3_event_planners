import React from "react";
import BdayDetail from "../../components/BdayDetail";
import { bdayDetails } from "../../data/eventData";
import styles from "../birthday/BdayDetails.module.css";

const BdayDetailsPage = () => {
  return (
    <div className="min-h-screen  bg-black text-white">
      <div className="px-4 py-0 md:py-0 mb-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <h1
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-center p-5
  bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-500 
  bg-clip-text text-transparent ${styles.gradientTitle}`}
          >
            Housewarming Party Packages
          </h1>
          <p className="text-gray-300 text-center max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Choose from our thoughtfully curated housewarming packages, each
            designed to celebrate new beginnings and create warm, lasting
            memories.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="space-y-16 md:space-y-24">
          {bdayDetails.map((detail, index) => (
            <div key={detail.id} className={styles.cardHover}>
              <BdayDetail detail={detail} isReversed={index % 2 !== 0} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BdayDetailsPage;
