"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { helveticaCompressed, bigShouldersDisplay } from "@/app/fonts";

interface ImageItem {
  id: number;
  src: string;
  alt: string;
  color: string;
  buttonText: string;
}

const ImageSlider: React.FC = () => {
  // State for hover functionality (desktop)
  const [hoveredLead, setHoveredLead] = useState<ImageItem | null>(null);

  // State for button navigation (mobile/tablet)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

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

  // Updated to include all team leads
  const images: ImageItem[] = [
    {
      id: 1,
      src: "/Images/Siya.png",
      alt: "Siya",
      color: "#4f46e5", // indigo
      buttonText: "Siya Gupta",
    },
    {
      id: 2,
      src: "/Images/Divyam.png",
      alt: "Divyam",
      color: "#0ea5e9", // sky
      buttonText: "Divyam Sharma",
    },
    {
      id: 3,
      src: "/Images/Shreya.png",
      alt: "Shreya",
      color: "#10b981", // emerald
      buttonText: "Shreya Srinivasan",
    },
    {
      id: 4,
      src: "/Images/Preksha.png",
      alt: "Preksha",
      color: "#f59e0b", // amber
      buttonText: "Preksha Khandelwal",
    },
    {
      id: 5,
      src: "/Images/Yash.png",
      alt: "Yash",
      color: "#ef4444", // red
      buttonText: "Yashwardhan Singh",
    },
    {
      id: 6,
      src: "/Images/Pratishtha.png",
      alt: "Pratishtha",
      color: "#8b5cf6", // violet
      buttonText: "Pratishtha Valecha",
    },
    {
      id: 7,
      src: "/Images/Shivansh.png",
      alt: "Shivansh",
      color: "#ec4899", // pink
      buttonText: "Shivnash Kalra",
    },
    {
      id: 8,
      src: "/Images/Moulik.png",
      alt: "Moulik",
      color: "#14b8a6", // teal
      buttonText: "Moulik Mishra",
    },
    {
      id: 9,
      src: "/Images/Abhay.png",
      alt: "Abhay",
      color: "#f97316", // orange
      buttonText: "Abhay Singh",
    },
    {
      id: 10,
      src: "/Images/Neeloy.png",
      alt: "Neeloy",
      color: "#6366f1", // indigo variant
      buttonText: "Neeloy Adhikary",
    },
    {
      id: 11,
      src: "/Images/Timmy.png",
      alt: "Timmy",
      color: "#0284c7", // sky variant
      buttonText: "Arsh Bhasin",
    },
    {
      id: 12,
      src: "/Images/Nilansh.png",
      alt: "Nilansh",
      color: "#059669", // emerald variant
      buttonText: "Nilansh Mathur",
    },
  ];

  // Navigation functions for button system
  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Default image to show when nothing is hovered
  const defaultImage = "/Images/Xcelerate.jpg";

  // Get current image to display based on interaction type
  let currentImage;
  let backgroundColor;

  if (isMobile) {
    // Button navigation mode (mobile/tablet)
    currentImage = images[currentIndex].src;
    backgroundColor = images[currentIndex].color;
  } else {
    // Hover mode (desktop)
    currentImage = hoveredLead ? hoveredLead.src : defaultImage;
    backgroundColor = hoveredLead ? hoveredLead.color : "transparent";
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      {/* Heading for Team Leads */}
      <h2
        className={`${helveticaCompressed.className} text-3xl md:text-4xl text-center text-[#B63B2C] mb-4 uppercase tracking-wide`}
      >
        Team Leads
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
                  hoveredLead || (isMobile && currentIndex !== undefined)
                    ? "bg-contain"
                    : "bg-cover"
                }`}
                style={{
                  backgroundImage: `url(${currentImage})`,
                  backgroundColor: backgroundColor,
                  boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.2)",
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

        {/* Team lead buttons */}
        <div className="p-4 pt-0 bg-[#eed4ce]">
          <div className="flex flex-wrap justify-center gap-2 items-center">
            {images.map((image, index) => (
              <div
                key={image.id}
                onMouseEnter={() => !isMobile && setHoveredLead(image)}
                onMouseLeave={() => !isMobile && setHoveredLead(null)}
                onClick={() => isMobile && setCurrentIndex(index)}
                className={`${
                  bigShouldersDisplay.className
                } tracking-wide relative px-1 rounded-sm text-sm font-bold uppercase transition-all duration-200 flex items-center justify-center hover:shadow-lg cursor-pointer ${
                  (isMobile && currentIndex === index) ||
                  (!isMobile && hoveredLead?.id === image.id)
                    ? "bg-white text-[#B63B2C] scale-105 shadow-md"
                    : "bg-[#B63B2C] text-white border border-[#B63B2C] hover:bg-[#B63B2C]/10 hover:text-[#B63B2C] shadow"
                }`}
              >
                {/* Button text */}
                {image.buttonText}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
