"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { helveticaCompressed, bigShouldersDisplay } from "@/app/fonts"; // Adjust the import path as necessary

interface CardProps {
  title: string;
  description: string;
  tags?: string[];
  backgroundColor: string;
  textColor: string;
  animationDirection: "left" | "middle" | "right";
  delay: number;
  shouldAnimate: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  tags,
  backgroundColor,
  textColor,
  animationDirection,
  delay,
  shouldAnimate,
}) => {
  // Different animation variants based on direction
  const variants = {
    left: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
    middle: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    },
    right: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 },
    },
  };

  return (
    <motion.div
      style={{ backgroundColor }}
      className="bg-gray-800 rounded-3xl w-5/6 shadow-lg p-6 flex flex-col h-full relative z-10 cursor-pointer perspective"
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
      variants={variants[animationDirection]}
      whileHover={{
        scale: 1.05,
        rotate: [0, 0.5, -0.5, 0],
        y: -5,
        zIndex: 20,
        boxShadow:
          "0 20px 25px -5px rgba(0,0,0,0.2), 0 10px 10px -5px rgba(0,0,0,0.1)",
        filter: "brightness(1.07)",
        transition: {
          duration: 0.3,
          scale: {
            type: "spring",
            stiffness: 400,
            damping: 10,
          },
        },
      }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1.0],
      }}
    >
      <h3
        style={{ color: textColor }}
        className={`${bigShouldersDisplay.className} text-md font-extrabold uppercase dark:text-white`}
      >
        {title}
      </h3>

      <p
        style={{ color: textColor }}
        className={`${helveticaCompressed.className} whitespace-pre-line tracking-wide text-2xl uppercase dark:text-gray-300`}
      >
        {description}
      </p>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              style={{ backgroundColor: textColor }}
              className={`${bigShouldersDisplay.className} uppercase font-bold text-white text-sm px-0.5 rounded-sm shadow`}
            >
              {tag}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default function OpportunityCards() {
  // Create ref for the scrollable container
  const containerRef = useRef(null);

  // Track scroll progress within the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Middle cards appear after initial scroll with clear animation
  const middleCardOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]); // Delay start until 10% scroll
  const middleCardY = useTransform(scrollYProgress, [0.1, 0.2], [50, 0]); // Increased initial offset

  // Side cards require much more scrolling to appear (50-70% through scroll sequence)
  const sideCardOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]); // Side cards appear much later
  const leftCardX = useTransform(scrollYProgress, [0.5, 0.7], [-120, 0]); // Same timing as opacity
  const rightCardX = useTransform(scrollYProgress, [0.5, 0.7], [120, 0]); // Same timing as opacity

  const cardData = [
    // First row
    {
      title: "FREE FOOD AND TRAVEL",
      description:
        "FREE FOOD THROUGHOUT THE \nCOMPETITION.\n AND FREE TRAVEL FROM NOIDA.",
      tags: ["FREE FOOD", "FREE TRAVEL"],
      backgroundColor: "#e5d7ea",
      textColor: "#6f30d2",
      animationDirection: "left" as const,
    },
    {
      title: "Prize Pool",
      description: "Winner: 2.5L+\n1st Runner Up: 1.5L+\n2nd Runner Up: 1L+",
      tags: ["Hard Cash Prize Pool of 1Lakhs"],
      backgroundColor: "#f5e4d7",
      textColor: "#d68353",
      animationDirection: "middle" as const,
    },
    {
      title: "Networking Opportunity",
      description:
        "Network with 200+ \nStudent enterpreneurs, \nInvestors & Mentors.",
      tags: ["Lorem ipsum dolor sit amet"],
      backgroundColor: "#e8e6d1",
      textColor: "#768f3e",
      animationDirection: "right" as const,
    },

    // Second row
    {
      title: "Gaming Arena",
      description:
        "lorem ipsum dolor sit amet, \nconsectetur adipiscing \nelit.",
      tags: ["Lorem ipsum dolor sit amet"],
      backgroundColor: "#eed4ce",
      textColor: "#b63b2c",
      animationDirection: "left" as const,
    },
    {
      title: "Startup Fair",
      description:
        "Startup Fair with 50+ \nStartups \nshowcasing their products.",
      tags: ["Lorem ipsum dolor sit amet"],
      backgroundColor: "#d9dbd5",
      textColor: "#26443c",
      animationDirection: "middle" as const,
    },
    {
      title: "Standup Comic",
      description: "Vivek Samtani \nperforming live \nat the event.",
      tags: ["Lorem ipsum dolor sit amet"],
      backgroundColor: "#f0d8e2",
      textColor: "#c24798",
      animationDirection: "right" as const,
    },
  ];

  // Split the card data into two rows
  const firstRowCards = cardData.slice(0, 3);
  const secondRowCards = cardData.slice(3, 6);

  return (
    <div
      ref={containerRef}
      className="relative h-[200vh] bg-gray-50 dark:bg-gray-900"
    >
      {/* Sticky container that locks in place during scroll */}
      <div className="sticky top-0 h-screen w-full py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-7xl mx-auto w-full">
          {/* Heading with animation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center mb-16"
          >
            <h2
              className={`${helveticaCompressed.className} text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-[#e5d7ea] tracking-wide `}
            >
              Our Offerings
            </h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mt-4 rounded-full"></div>
          </motion.div>

          {/* First row of cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-2 md:gap-y-8 md:gap-x-2">
            {/* Left card */}
            <motion.div
              style={{
                opacity: sideCardOpacity,
                x: leftCardX,
              }}
              className="flex justify-center"
            >
              <Card
                title={firstRowCards[0].title}
                description={firstRowCards[0].description}
                tags={firstRowCards[0].tags}
                backgroundColor={firstRowCards[0].backgroundColor}
                textColor={firstRowCards[0].textColor}
                animationDirection="left"
                delay={0}
                shouldAnimate={true}
              />
            </motion.div>

            {/* Middle card */}
            <motion.div
              style={{
                opacity: middleCardOpacity,
                y: middleCardY,
              }}
              className="flex justify-center"
            >
              <Card
                title={firstRowCards[1].title}
                description={firstRowCards[1].description}
                tags={firstRowCards[1].tags}
                backgroundColor={firstRowCards[1].backgroundColor}
                textColor={firstRowCards[1].textColor}
                animationDirection="middle"
                delay={0}
                shouldAnimate={true}
              />
            </motion.div>

            {/* Right card */}
            <motion.div
              style={{
                opacity: sideCardOpacity,
                x: rightCardX,
              }}
              className="flex justify-center"
            >
              <Card
                title={firstRowCards[2].title}
                description={firstRowCards[2].description}
                tags={firstRowCards[2].tags}
                backgroundColor={firstRowCards[2].backgroundColor}
                textColor={firstRowCards[2].textColor}
                animationDirection="right"
                delay={0}
                shouldAnimate={true}
              />
            </motion.div>
          </div>

          {/* Second row of cards */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-2 md:gap-y-8 md:gap-x-2">
            {/* Left card */}
            <motion.div
              style={{
                opacity: sideCardOpacity,
                x: leftCardX,
              }}
              className="flex justify-center"
            >
              <Card
                title={secondRowCards[0].title}
                description={secondRowCards[0].description}
                tags={secondRowCards[0].tags}
                backgroundColor={secondRowCards[0].backgroundColor}
                textColor={secondRowCards[0].textColor}
                animationDirection="left"
                delay={0}
                shouldAnimate={true}
              />
            </motion.div>

            {/* Middle card */}
            <motion.div
              style={{
                opacity: middleCardOpacity,
                y: middleCardY,
              }}
              className="flex justify-center"
            >
              <Card
                title={secondRowCards[1].title}
                description={secondRowCards[1].description}
                tags={secondRowCards[1].tags}
                backgroundColor={secondRowCards[1].backgroundColor}
                textColor={secondRowCards[1].textColor}
                animationDirection="middle"
                delay={0}
                shouldAnimate={true}
              />
            </motion.div>

            {/* Right card */}
            <motion.div
              style={{
                opacity: sideCardOpacity,
                x: rightCardX,
              }}
              className="flex justify-center"
            >
              <Card
                title={secondRowCards[2].title}
                description={secondRowCards[2].description}
                tags={secondRowCards[2].tags}
                backgroundColor={secondRowCards[2].backgroundColor}
                textColor={secondRowCards[2].textColor}
                animationDirection="right"
                delay={0}
                shouldAnimate={true}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
