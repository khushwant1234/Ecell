"use client";
import React, { useEffect, useState } from "react";
import ScrollTransformLayout from "@/components/ScrollTransformLayout";
import MobileTransformLayout from "@/components/MobileTransformLayout";
import OpportunityCards from "@/app/cards";
import MobileCards from "@/components/MobileCards";
import LP from "@/components/LandingPage/LP";
import MobileLP from "@/components/LandingPage/MobileLP";
import Navbar from "@/components/Navbar";
import CountdownClock from "@/components/CountdownClock";
import FAQs from "@/components/FAQ";
import Footer from "@/components/footer/footer";

const Page = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Set on initial load
    handleResize();

    // Listen for window resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Example usage in your page component
  const mainCard = {
    title: "Xcelerate",
    description:
      "Xcelerate is our flagship Ideathon event. It is a chance for aspiring student entrepreneurs to showcase their innovative ideas and potentially win exciting prizes worth 5L+. The event is open to all and there is no registration fee to participate.",
    imageUrl: "/Images/Xcelerate.jpg",
  };

  const sideItems = [
    {
      title: "Round-1",
      description:
        "An Online Round which involves shortlisting participants based on the quality if their submissions.",
    },
    {
      title: "Round-2",
      description:
        "The Top 50 submissions will then be invited for Round 2 (Offline), which will take place on campus.",
    },
    {
      title: "Final Round",
      description:
        "Participants will have the opportunity to pitch their ideas to a panel of judges and recieve feedback and guidance on their plans.",
    },
  ];

  return (
    <div className="bg-[#f8f4ff]">
      <Navbar textColor="#8082E9" />
      {isMobile ? <MobileLP /> : <LP />}
      <CountdownClock />
      {isMobile ? <MobileCards /> : <OpportunityCards />}
      <main className="flex-grow">
        {isMobile ? (
          <MobileTransformLayout mainCard={mainCard} sideItems={sideItems} />
        ) : (
          <ScrollTransformLayout mainCard={mainCard} sideItems={sideItems} />
        )}
      </main>
      <FAQs />
      <Footer textColor="#8082E9" />
    </div>
  );
};

export default Page;
