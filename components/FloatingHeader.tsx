"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { helveticaCompressed } from "@/app/fonts";

interface FloatingHeaderProps {
  title1: string;
  title2?: string;
}

const FloatingHeader: React.FC<FloatingHeaderProps> = ({ title1, title2 }) => {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  // Update window width on resize
  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth);

    // Handle resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Floating circle images
  const circleImages = [
    {
      src: "/Images/Ecell-1.png",
      size: windowWidth < 640 ? 65 : windowWidth < 1024 ? 65 : 80,
    },
    {
      src: "/Images/Ecell-2.png",
      size: windowWidth < 640 ? 55 : windowWidth < 1024 ? 55 : 65,
    },
    {
      src: "/Images/Ecell3.png",
      size: windowWidth < 640 ? 60 : windowWidth < 1024 ? 60 : 70,
    },
    {
      src: "/Images/Ecell4.png",
      size: windowWidth < 640 ? 58 : windowWidth < 1024 ? 58 : 69,
    },
    {
      src: "/Images/Ecell5.png",
      size: windowWidth < 640 ? 63 : windowWidth < 1024 ? 63 : 73,
    },
  ];

  // Dynamic positions that adjust based on screen size
  const getPositions = () => {
    if (windowWidth < 640) {
      // Mobile positions
      return [
        { top: "10%", left: "5%" },
        { top: "70%", left: "8%" },
        { top: "25%", left: "75%" },
        { top: "60%", left: "70%" },
        { top: "8%", left: "60%" },
      ];
    } else if (windowWidth < 1024) {
      // Tablet positions
      return [
        { top: "12%", left: "5%" },
        { top: "70%", left: "10%" },
        { top: "28%", left: "30%" },
        { top: "65%", left: "35%" },
        { top: "10%", left: "25%" },
      ];
    } else {
      // Desktop positions
      return [
        { top: "20%", left: "4%" },
        { top: "80%", left: "10%" },
        { top: "32%", left: "28%" },
        { top: "60%", left: "29%" },
        { top: "17%", left: "20%" },
      ];
    }
  };

  const positions = getPositions();

  return (
    <div className="relative py-12 sm:py-16 md:py-24 px-4 overflow-hidden">
      {/* About Us heading - responsive positioning and sizing */}
      <motion.h1
        className={`text-center text-3xl sm:text-4xl md:text-5xl font-bold text-[#b63b2c] mb-8 sm:mb-12 
          absolute top-4 sm:top-6 md:top-8 left-0 right-0 mx-auto ${helveticaCompressed.className}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        About Us
      </motion.h1>

      {/* Floating circles - only show all on larger screens */}
      {circleImages.map((img, index) => {
        // On smallest screens, show fewer circles
        if (windowWidth < 480 && index > 2) return null;

        const duration = 10 + index * 2;

        // Smaller movement on mobile for better aesthetics
        const xMovement =
          windowWidth < 640 ? [10, -10, 5, -5, 0] : [20, -20, 10, -10, 0];
        const yMovement =
          windowWidth < 640 ? [5, -8, 3, -3, 0] : [10, -15, 5, -5, 0];

        return (
          <motion.div
            key={index}
            className="absolute z-10 rounded-full overflow-hidden shadow-lg border-2 border-white"
            style={{
              width: img.size,
              height: img.size,
              top: positions[index].top,
              left: positions[index].left,
            }}
            initial={{ opacity: 1, scale: 1 }}
            animate={{
              x: xMovement,
              y: yMovement,
              rotate: [0, 5, -5, 3, 0],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <Image
              src={img.src}
              alt="Floating image"
              fill
              sizes={`${img.size}px`}
              style={{ objectFit: "cover" }}
            />
          </motion.div>
        );
      })}

      {/* Heading content - responsive positioning and text sizing */}
      <div className="relative z-20 mt-16 sm:mt-20 md:mt-24 max-w-4xl mx-auto sm:ml-4 md:ml-12 lg:ml-24">
        <motion.h1
          className={`whitespace-pre-line text-5xl sm:text-6xl md:text-7xl lg:text-9xl uppercase font-bold 
            text-[#b63b2c] mb-3 sm:mb-6 text-center sm:text-left ${helveticaCompressed.className}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {title1}
        </motion.h1>

        {title2 && (
          <motion.h1
            className={`whitespace-pre-line text-5xl sm:text-6xl md:text-7xl lg:text-9xl uppercase font-bold 
              text-[#b63b2c] mb-3 sm:mb-6 text-center sm:text-left ${helveticaCompressed.className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {title2}
          </motion.h1>
        )}
      </div>
    </div>
  );
};

export default FloatingHeader;
