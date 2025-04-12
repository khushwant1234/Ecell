"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { bigShouldersDisplay, helveticaCompressed } from "@/app/fonts";

interface FeaturedPersonCardProps {
  imageSrc: string;
  tags: string[];
}

const FeaturedPersonCard: React.FC<FeaturedPersonCardProps> = ({
  imageSrc = "/Images/featured-person.jpg",
  tags = ["Leadership", "Innovation", "Community", "Technology"],
}) => {
  // Desktop hover state
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);

  // Mobile/tablet state
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Check for mobile/tablet screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Map tags to images - in a real implementation, you would pass these as props
  const tagImages: Record<string, string> = {
    "Rohan Reddy": "/Images/Rohan.png",
    "Ujjwal Mishra": "/Images/Ujjwal.png",
    "Nishtha Jain": "/Images/Nishtha.png",
    "S Avanthika": "/Images/Avanthika.png",
    "Daksh Chopra": "/Images/Daksh.png",
  };

  // Map tags to background colors
  const tagColors: Record<string, string> = {
    "Rohan Reddy": "#ef4444",
    "Ujjwal Mishra": "#10b981",
    "Nishtha Jain": "#0ea5e9",
    "S Avanthika": "#8b5cf6",
    "Daksh Chopra": "#6366f1",
  };

  // Navigation functions for button system
  const goToNext = () => {
    setHasInteracted(true);
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % tags.length);
  };

  const goToPrev = () => {
    setHasInteracted(true);
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + tags.length) % tags.length);
  };

  // Get current image to display based on interaction type
  let currentImage;
  let backgroundColor;

  if (isMobile) {
    if (hasInteracted) {
      // Button navigation mode after interaction (mobile/tablet)
      const currentTag = tags[currentIndex];
      currentImage = tagImages[currentTag] || imageSrc;
      backgroundColor = tagColors[currentTag] || "transparent";
    } else {
      // Show default image until user interacts
      currentImage = imageSrc;
      backgroundColor = "transparent";
    }
  } else {
    // Hover mode (desktop)
    currentImage = hoveredTag ? tagImages[hoveredTag] || imageSrc : imageSrc;
    backgroundColor = hoveredTag
      ? tagColors[hoveredTag] || "transparent"
      : "transparent";
  }

  return (
    <div className="max-w-xl mx-auto p-6 mb-8">
      {/* Header */}
      <h2
        className={`${helveticaCompressed.className} text-3xl md:text-4xl text-center font-bold text-[#B63B2C] mb-4 uppercase tracking-wide`}
      >
        Core
      </h2>

      <div className="bg-[#eed4ce] rounded-xl shadow-xl overflow-hidden">
        {/* Image container with fixed height for consistent layout */}
        <div className="relative h-80 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              initial={{ opacity: 0, scale: 0.95, x: direction * 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 1.05, x: -direction * 20 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 p-4"
            >
              <div
                className={`w-full h-full bg-no-repeat bg-center rounded-lg ${
                  hoveredTag || (isMobile && hasInteracted)
                    ? "bg-contain"
                    : "bg-cover"
                }`}
                style={{
                  backgroundImage: `url(${currentImage})`,
                  backgroundColor: backgroundColor,
                  boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.1)",
                }}
              ></div>
            </motion.div>
          </AnimatePresence>

          {/* Mobile/Tablet Navigation Arrows */}
          {isMobile && (
            <div className="absolute inset-0 flex items-center justify-between px-2 z-10">
              <button
                onClick={goToPrev}
                className="bg-white/70 hover:bg-white rounded-full p-2 shadow-md"
                aria-label="Previous"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-[#B63B2C]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={goToNext}
                className="bg-white/70 hover:bg-white rounded-full p-2 shadow-md"
                aria-label="Next"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-[#B63B2C]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Featured person info */}
        <div className="px-6 pb-4 pt-0 bg-transparent">
          {/* Tags styled exactly like the buttons */}
          <div className="flex flex-wrap justify-center gap-2 items-center">
            {tags.map((tag, index) => (
              <div
                key={index}
                onMouseEnter={() => !isMobile && setHoveredTag(tag)}
                onMouseLeave={() => !isMobile && setHoveredTag(null)}
                onClick={() => {
                  if (isMobile) {
                    setHasInteracted(true);
                    setCurrentIndex(index);
                  }
                }}
                className={`${
                  bigShouldersDisplay.className
                } tracking-wide relative px-1 rounded-sm text-sm font-bold uppercase transition-all duration-200 flex items-center justify-center shadow cursor-pointer ${
                  (isMobile && hasInteracted && currentIndex === index) ||
                  (!isMobile && hoveredTag === tag)
                    ? "bg-white text-[#B63B2C] scale-105"
                    : "bg-[#B63B2C] text-white border border-[#B63B2C] hover:bg-[#B63B2C]/90"
                }`}
              >
                {tag}
              </div>
            ))}
          </div>

          {/* Mobile/Tablet Instructions or Name Display */}
          {isMobile && (
            <div className="text-center mt-2">
              {hasInteracted ? null : (
                <p className="text-[#B63B2C]/80 text-sm italic">
                  Tap a name or use arrows to see team members
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedPersonCard;
