"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { helveticaCompressed, bigShouldersDisplay } from "@/app/fonts";

interface CardProps {
  title: string;
  description: string;
  tags?: string[];
  backgroundColor: string;
  textColor: string;
  index: number;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  tags,
  backgroundColor,
  textColor,
  index,
}) => {
  return (
    <motion.div
      style={{ backgroundColor }}
      className="rounded-3xl w-full shadow-lg p-4 sm:p-5 flex flex-col h-full relative z-10 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
    >
      <h3
        style={{ color: textColor }}
        className={`${bigShouldersDisplay.className} text-sm sm:text-md font-extrabold uppercase`}
      >
        {title}
      </h3>

      <p
        style={{ color: textColor }}
        className={`${helveticaCompressed.className} whitespace-pre-line tracking-wide text-lg sm:text-xl md:text-2xl uppercase mt-1`}
      >
        {description}
      </p>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2 mt-auto">
          {tags.map((tag, index) => (
            <div
              key={index}
              style={{ backgroundColor: textColor }}
              className={`${bigShouldersDisplay.className} uppercase font-bold text-white text-xs px-0.5 rounded-sm shadow`}
            >
              {tag}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default function MobileCards() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const cardData = [
    // First row
    {
      title: "FREE FOOD AND TRAVEL",
      description:
        "FREE FOOD THROUGHOUT THE \nCOMPETITION.\n AND FREE TRAVEL FROM NOIDA.",
      tags: ["FREE FOOD", "FREE TRAVEL"],
      backgroundColor: "#e5d7ea",
      textColor: "#6f30d2",
    },
    {
      title: "Prize Pool",
      description: "Winner: 2.5L+\n1st Runner Up: 1.5L+\n2nd Runner Up: 1L+",
      tags: ["Hard Cash Prize Pool of 1Lakhs"],
      backgroundColor: "#f5e4d7",
      textColor: "#d68353",
    },
    {
      title: "Networking Opportunity",
      description:
        "Network with 200+ \nStudent enterpreneurs, \nInvestors & Mentors.",
      tags: ["Lorem ipsum dolor sit amet"],
      backgroundColor: "#e8e6d1",
      textColor: "#768f3e",
    },

    // Second row
    {
      title: "Gaming Arena",
      description:
        "lorem ipsum dolor sit amet, \nconsectetur adipiscing \nelit.",
      tags: ["Lorem ipsum dolor sit amet"],
      backgroundColor: "#eed4ce",
      textColor: "#b63b2c",
    },
    {
      title: "Startup Fair",
      description:
        "Startup Fair with 50+ \nStartups \nshowcasing their products.",
      tags: ["Lorem ipsum dolor sit amet"],
      backgroundColor: "#d9dbd5",
      textColor: "#26443c",
    },
    {
      title: "Standup Comic",
      description: "Vivek Samtani \nperforming live \nat the event.",
      tags: ["Lorem ipsum dolor sit amet"],
      backgroundColor: "#f0d8e2",
      textColor: "#c24798",
    },
  ];

  if (!isClient) return null; // Prevent hydration errors

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2
            className={`${helveticaCompressed.className} text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-[#e5d7ea] tracking-wide`}
          >
            Our Offerings
          </h2>
          <div className="h-1 sm:h-1.5 w-16 sm:w-20 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mt-3 rounded-full"></div>
        </motion.div>

        {/* Cards grid - responsive 1 column on mobile, 2 columns on tablet */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {cardData.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
              tags={card.tags}
              backgroundColor={card.backgroundColor}
              textColor={card.textColor}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
