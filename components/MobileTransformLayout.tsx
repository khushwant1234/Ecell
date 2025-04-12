"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { helveticaCompressed, bigShouldersDisplay } from "@/app/fonts";

interface CardContent {
  title: string;
  description: string;
  imageUrl?: string;
}

interface MobileTransformLayoutProps {
  mainCard: CardContent;
  sideItems: CardContent[];
}

const MobileTransformLayout: React.FC<MobileTransformLayoutProps> = ({
  mainCard,
  sideItems,
}) => {
  // Simple animation variants for initial reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="py-10 px-4 bg-[#f8f4ff]">
      {/* Heading at the top */}
      <motion.h1
        className={`${helveticaCompressed.className} text-2xl sm:text-3xl font-bold text-center uppercase text-[#26443c] mb-8 tracking-wide`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About Xcelerate
      </motion.h1>

      <motion.div
        className="max-w-xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main card */}
        <motion.div
          variants={itemVariants}
          className="bg-[#e8e1da] rounded-3xl shadow-xl w-full mb-8"
        >
          {/* Image container with padding */}
          <div className="p-4 pt-4 pb-2">
            <div className="relative h-52 sm:h-64 w-full rounded-2xl overflow-hidden">
              <Image
                src={mainCard.imageUrl || "/Images/course-1.jpg"}
                alt={mainCard.title}
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </div>
          <div className="p-4 pt-2">
            <h3
              className={`${helveticaCompressed.className} text-xl sm:text-2xl font-bold text-[#26443c] mb-2 uppercase`}
            >
              {mainCard.title}
            </h3>
            <p
              className={`text-[#393123] ${bigShouldersDisplay.className} font-bold text-sm sm:text-base`}
            >
              {mainCard.description}
            </p>
          </div>
        </motion.div>

        {/* Side items container - stacked vertically */}
        <div className="space-y-4 sm:space-y-5">
          {/* First side item */}
          <motion.div
            variants={itemVariants}
            className="bg-[#e5d7ea] rounded-3xl shadow-xl p-3 sm:p-4 w-full"
          >
            <div className="flex justify-center mb-2">
              <div
                className={`${bigShouldersDisplay.className} bg-[#6f30d2] text-[#ffffff] inline-block uppercase font-bold text-lg sm:text-xl px-1.5 rounded-sm shadow`}
              >
                {sideItems[0]?.title}
              </div>
            </div>
            <p
              className={`${bigShouldersDisplay.className} font-bold text-center text-gray-600 text-sm sm:text-base`}
            >
              {sideItems[0]?.description}
            </p>
          </motion.div>

          {/* Second side item */}
          <motion.div
            variants={itemVariants}
            className="bg-[#f0d8e2] rounded-3xl shadow-xl p-3 sm:p-4 w-full"
          >
            <div className="flex justify-center mb-2">
              <div
                className={`${bigShouldersDisplay.className} bg-[#c24798] text-[#ffffff] inline-block uppercase font-bold text-lg sm:text-xl px-1.5 rounded-sm shadow`}
              >
                {sideItems[1]?.title}
              </div>
            </div>
            <p
              className={`${bigShouldersDisplay.className} font-bold text-center text-gray-600 text-sm sm:text-base`}
            >
              {sideItems[1]?.description}
            </p>
          </motion.div>

          {/* Third side item */}
          <motion.div
            variants={itemVariants}
            className="bg-[#eed4ce] rounded-3xl shadow-xl p-3 sm:p-4 w-full"
          >
            <div className="flex justify-center mb-2">
              <div
                className={`${bigShouldersDisplay.className} bg-[#b63b2c] text-[#ffffff] inline-block uppercase font-bold text-lg sm:text-xl px-1.5 rounded-sm shadow`}
              >
                {sideItems[2]?.title}
              </div>
            </div>
            <p
              className={`${bigShouldersDisplay.className} font-bold text-center text-gray-600 text-sm sm:text-base`}
            >
              {sideItems[2]?.description}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default MobileTransformLayout;
