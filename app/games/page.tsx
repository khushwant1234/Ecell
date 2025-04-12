"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { helveticaCompressed, bigShouldersDisplay } from "@/app/fonts";
import Footer from "@/components/footer/footer";

interface GameCard {
  title: string;
  path: string;
  emoji: string;
  description: string;
  color: string;
  creator: string;
}

const Page = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const games: GameCard[] = [
    {
      title: "Card Master 21",
      path: "/games/rohit/CardMaster21",
      emoji: "♠️",
      description:
        "Test your luck in this exciting\nBlackJack game with\nbetting system",
      color: "#65a30d",
      creator: "Rohit",
    },
    {
      title: "Memory Game",
      path: "/games/rohit/MemoryGame",
      emoji: "🧠",
      description: "Challenge your memory\nby matching pairs\nof cards",
      color: "#0891b2",
      creator: "Rohit",
    },
    {
      title: "Hi-Lo Vault",
      path: "/games/arjun",
      emoji: "🏦",
      description: "Play higher or lower\nwith company\nvaluations",
      color: "#6F30D2",
      creator: "Arjun",
    },
    {
      title: "Space Shooter",
      path: "https://ecell-defender.vercel.app/",
      emoji: "🚀",
      description: "Fly through space\ndestroying enemies\nin this action game",
      color: "#dc2626",
      creator: "Shreyas",
    },
    {
      title: "Stock Market Sim",
      path: "/games/akshat",
      emoji: "📈",
      description: "Test your trading skills\nin this stock market\nsimulation",
      color: "#0284c7",
      creator: "Akshat",
    },
  ];

  // Animation variants with dropping effect
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  // Card variants with dropping animation
  const cardVariants = {
    hidden: {
      y: "-100vh",
      opacity: 1,
      scale: 0.9,
      rotate: Math.random() * 8 - 4,
    },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
        mass: 1.2,
        velocity: 2,
        delay: i * 0.08,
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    }),
    hover: {
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
    },
  };

  const emojiVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.3,
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#FCF5F0] overflow-hidden">
      <Navbar textColor="#B63B2C" />

      <div className="max-w-7xl mx-auto px-4 pt-16 pb-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center mb-20"
        >
          <h2
            className={`${helveticaCompressed.className} text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 uppercase tracking-wide`}
          >
            E-Cell Games
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-[#b63b2c] to-[#e07a5f] mx-auto mt-4 rounded-full"></div>
          <p
            className={`${bigShouldersDisplay.className} text-lg sm:text-xl max-w-2xl mx-auto text-gray-600 mt-6`}
          >
            Challenge yourself with these fun games created by our team members.
            Each game offers a unique experience and tests different skills.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {games.map((game, index) => (
            <div key={game.path} className="flex justify-center">
              <Link href={game.path} className="w-5/6">
                <motion.div
                  variants={cardVariants}
                  custom={index}
                  whileHover="hover"
                  style={{ backgroundColor: game.color + "20" }}
                  className="dark:bg-gray-800 rounded-3xl w-full shadow-lg p-6 flex flex-col h-full relative z-10 cursor-pointer perspective"
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                    ease: [0.25, 0.1, 0.25, 1.0],
                  }}
                >
                  <h3
                    style={{ color: game.color }}
                    className={`${bigShouldersDisplay.className} text-md font-extrabold uppercase dark:text-white`}
                  >
                    {game.title}
                  </h3>

                  <div className="flex justify-center my-3">
                    <motion.div
                      className="text-6xl"
                      variants={emojiVariants}
                      animate={hoveredCard === game.title ? "hover" : "initial"}
                      onHoverStart={() => setHoveredCard(game.title)}
                      onHoverEnd={() => setHoveredCard(null)}
                    >
                      {game.emoji}
                    </motion.div>
                  </div>

                  <p
                    style={{ color: game.color }}
                    className={`${helveticaCompressed.className} whitespace-pre-line tracking-wide text-2xl uppercase dark:text-gray-300`}
                  >
                    {game.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2 mt-auto">
                    <div
                      style={{ backgroundColor: game.color }}
                      className={`${bigShouldersDisplay.className} uppercase font-bold text-white text-sm px-2 py-0.5 rounded-sm shadow`}
                    >
                      by {game.creator}
                    </div>

                    <div
                      style={{ backgroundColor: game.color }}
                      className={`${bigShouldersDisplay.className} uppercase font-bold text-white text-sm px-2 py-0.5 rounded-sm shadow ml-auto`}
                    >
                      Play Now
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4 inline ml-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </div>
          ))}
        </motion.div>
      </div>
      <Footer textColor="#8082E9" />
    </div>
  );
};

export default Page;
