import React from "react";
import EventDetailsPage from "@/components/EventDetailsPage";
import { babyShowerDetails, namingCeremonyDetails } from "@/data/eventData";

const OtherPage = () => {
  // Combine baby shower and naming ceremony details for the "other" page
  const allOtherDetails = [...babyShowerDetails, ...namingCeremonyDetails];

  return (
    <EventDetailsPage
      title="Explore More Packages"
      description="Discover our wide range of event packages, carefully designed to make every occasion memorable and extraordinary."
      eventDetails={allOtherDetails}
    />
  );
};

export default OtherPage;
