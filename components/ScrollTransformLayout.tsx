"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { helveticaCompressed, bigShouldersDisplay } from "@/app/fonts";

interface CardContent {
  title: string;
  description: string;
  imageUrl?: string;
}

interface ScrollTransformLayoutProps {
  mainCard: CardContent;
  sideItems: CardContent[];
}

const ScrollTransformLayout: React.FC<ScrollTransformLayoutProps> = ({
  mainCard,
  sideItems,
}) => {
  // Create a ref for the container
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transform scroll progress into animation values
  // Move from center (0%) to left (-40%)
  const cardX = useTransform(scrollYProgress, [0, 0.2], ["62%", "-10%"]);

  // Control the opacity of the side items container
  const sideContainerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  // Control the opacity of each side item
  const firstItemOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.2, 0.9],
    [0, 1, 1]
  );
  const secondItemOpacity = useTransform(
    scrollYProgress,
    [0.3, 0.4, 0.9],
    [0, 1, 1]
  );
  const thirdItemOpacity = useTransform(
    scrollYProgress,
    [0.5, 0.6, 0.9],
    [0, 1, 1]
  );

  // Control the Y position of each side item
  const firstItemY = useTransform(scrollYProgress, [0.1, 0.2], ["50px", "0px"]);
  const secondItemY = useTransform(
    scrollYProgress,
    [0.3, 0.4],
    ["50px", "0px"]
  );
  const thirdItemY = useTransform(scrollYProgress, [0.5, 0.6], ["50px", "0px"]);

  return (
    <div ref={containerRef} className="relative h-[300vh] ">
      {/* Sticky container that stays in view while scrolling */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
        {/* Heading at the top */}
        <motion.h1
          className={`${helveticaCompressed.className} text-2xl md:text-3xl lg:text-4xl font-bold text-center uppercase text-[#26443c] mb-12 tracking-wide`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          About Xcelerate
        </motion.h1>

        <div className="relative w-full max-w-6xl mx-auto px-4">
          {/* Centered container for both card and side items */}
          <div className="flex flex-col md:flex-row items-center justify-center">
            {/* Main card - initially centered */}
            <motion.div
              style={{ x: cardX }}
              className="bg-[#e8e1da] rounded-3xl shadow-2xl w-full max-w-md mx-auto md:mx-0 "
            >
              {/* Image container with padding */}
              <div className="p-4 pt-4 pb-2">
                <div className="relative h-64 w-full rounded-3xl overflow-hidden ">
                  <Image
                    src={mainCard.imageUrl || "/Images/course-1.jpg"}
                    alt={mainCard.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
              <div className="p-4 pt-0">
                <p
                  className={`text-[#393123] ${bigShouldersDisplay.className} font-bold`}
                >
                  {mainCard.description}
                </p>
              </div>
            </motion.div>

            {/* Side items container - initially transparent */}
            <motion.div
              className="w-full md:w-1/2 space-y-8 mt-8 md:mt-0 md:pl-8 flex flex-col items-center"
              style={{ opacity: sideContainerOpacity }}
            >
              {/* First side item - increased width */}
              <motion.div
                style={{
                  opacity: firstItemOpacity,
                  y: firstItemY,
                }}
                className="bg-[#e5d7ea] rounded-3xl shadow-2xl p-3 w-full max-w-sm mx-auto"
              >
                <div className="flex justify-center">
                  <div
                    className={`${bigShouldersDisplay.className} bg-[#6f30d2] text-[#ffffff] inline-block uppercase font-bold text-xl px-1 rounded-sm shadow`}
                  >
                    {sideItems[0]?.title}
                  </div>
                </div>
                <p
                  className={`text-gray-600" ${bigShouldersDisplay.className} font-bold text-center text-xl`}
                >
                  {sideItems[0]?.description}
                </p>
              </motion.div>

              {/* Second side item - increased width */}
              <motion.div
                style={{
                  opacity: secondItemOpacity,
                  y: secondItemY,
                }}
                className="bg-[#f0d8e2] rounded-3xl shadow-2xl p-3 w-full max-w-sm mx-auto"
              >
                <div className="flex justify-center">
                  <div
                    className={`${bigShouldersDisplay.className} bg-[#c24798] text-[#ffffff] inline-block uppercase font-bold text-xl px-1 rounded-sm shadow`}
                  >
                    {sideItems[1]?.title}
                  </div>
                </div>
                <p
                  className={`text-gray-600" ${bigShouldersDisplay.className} font-bold text-center text-xl`}
                >
                  {sideItems[1]?.description}
                </p>
              </motion.div>

              {/* Third side item - increased width */}
              <motion.div
                style={{
                  opacity: thirdItemOpacity,
                  y: thirdItemY,
                }}
                className="bg-[#eed4ce] rounded-3xl shadow-2xl p-3 w-full max-w-sm mx-auto"
              >
                <div className="flex justify-center">
                  <div
                    className={`${bigShouldersDisplay.className} bg-[#b63b2c] text-[#ffffff] inline-block uppercase font-bold text-xl px-1 rounded-sm shadow`}
                  >
                    {sideItems[2]?.title}
                  </div>
                </div>
                <p
                  className={`text-gray-600" ${bigShouldersDisplay.className} font-bold text-center text-xl`}
                >
                  {sideItems[2]?.description}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollTransformLayout;
