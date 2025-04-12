"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import { helveticaCompressed, bigShouldersDisplay } from "@/app/fonts";
import Link from "next/link";

interface BPlanSection {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  color: string;
}

export default function BPlanPage() {
  const [selectedSection, setSelectedSection] = useState<BPlanSection | null>(
    null
  );
  const [isMobile, setIsMobile] = useState(false);

  // B-Plan document sections with images instead of text
  const bplanSections: BPlanSection[] = [
    {
      id: 1,
      title: "Entry Plan",
      description: "Initial considerations before entering a market",
      imageSrc: "/Images/bplan/.png",
      color: "#6F30D2",
    },
    {
      id: 2,
      title: "Product",
      description: "Detailed information about your product or service",
      imageSrc: "/Images/bplan/.png",
      color: "#0891b2",
    },
    {
      id: 3,
      title: "Market Analysis",
      description: "Assessment of target market size, trends, and competition",
      imageSrc: "/Images/bplan/.png",
      color: "#65a30d",
    },
    {
      id: 4,
      title: "Marketing Strategy",
      description: "Plan for reaching customers and building brand awareness",
      imageSrc: "/Images/bplan/.png",
      color: "#B63B2C",
    },
    {
      id: 5,
      title: "Financials",
      description:
        "Revenue forecasts, expense budgets, and break-even analysis",
      imageSrc: "/Images/bplan/.png",
      color: "#0284c7",
    },
    {
      id: 6,
      title: "Miscellaneous",
      description: "Additional information and supporting documentation",
      imageSrc: "/Images/bplan/.png",
      color: "#d68353",
    },
  ];

  // Check if on mobile
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

  // Set the first section as selected initially
  useEffect(() => {
    if (bplanSections.length > 0 && !selectedSection) {
      setSelectedSection(bplanSections[0]);
    }
  }, [bplanSections, selectedSection]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#FCF5F0]">
      <Navbar textColor="#B63B2C" />

      <div className="max-w-7xl mx-auto px-4 pt-16 pb-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center mb-12"
        >
          <h2
            className={`${helveticaCompressed.className} text-4xl md:text-5xl lg:text-6xl font-bold text-[#B63B2C] uppercase tracking-wide`}
          >
            Business Plan Guide
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-[#b63b2c] to-[#e07a5f] mx-auto mt-4 rounded-full"></div>
          <p
            className={`${bigShouldersDisplay.className} text-lg sm:text-xl max-w-2xl mx-auto text-gray-600 mt-6`}
          >
            Essential sections for creating a comprehensive business plan. Use
            this guide as a framework for your entrepreneurial journey.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Document Sections List */}
          <motion.div
            className="w-full lg:w-1/3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="bg-white rounded-2xl shadow-lg p-4 overflow-hidden">
              <h3
                className={`${helveticaCompressed.className} text-lg text-gray-800 mb-4 uppercase`}
              >
                B-Plan Sections
              </h3>
              <div className="space-y-3">
                {bplanSections.map((section) => (
                  <motion.div
                    key={section.id}
                    className={`rounded-xl p-4 cursor-pointer transition-all ${
                      selectedSection?.id === section.id
                        ? "scale-105 shadow-md"
                        : ""
                    }`}
                    style={{
                      backgroundColor:
                        selectedSection?.id === section.id
                          ? `${section.color}30`
                          : "transparent",
                      borderLeft: `4px solid ${
                        selectedSection?.id === section.id
                          ? section.color
                          : "transparent"
                      }`,
                    }}
                    onClick={() => setSelectedSection(section)}
                    whileHover={{
                      scale: 1.03,
                      backgroundColor: `${section.color}20`,
                      transition: { duration: 0.2 },
                    }}
                    variants={itemVariants}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 flex items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${section.color}30` }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                          style={{ color: section.color }}
                        >
                          <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
                          <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
                        </svg>
                      </div>
                      <div>
                        <h4
                          className={`${bigShouldersDisplay.className} font-bold text-gray-800`}
                        >
                          {section.title}
                        </h4>
                        <p className="text-xs text-gray-500 line-clamp-1">
                          {section.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center justify-center gap-2 bg-[#B63B2C] hover:bg-[#a13426] text-white px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Download B-Plan Template
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Selected Section Image Viewer */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full">
              <AnimatePresence mode="wait">
                {selectedSection && (
                  <motion.div
                    key={selectedSection.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full flex flex-col"
                  >
                    <div
                      className="h-12 flex items-center px-4"
                      style={{ backgroundColor: `${selectedSection.color}20` }}
                    >
                      <h3
                        className={`${helveticaCompressed.className} text-lg uppercase tracking-wide`}
                        style={{ color: selectedSection.color }}
                      >
                        {selectedSection.title}
                      </h3>
                    </div>

                    <div className="p-6 flex-grow flex flex-col">
                      {/* Image container */}
                      <div className="relative flex-grow flex items-center justify-center">
                        <div className="relative w-full aspect-[4/3]">
                          <Image
                            src={selectedSection.imageSrc}
                            alt={selectedSection.title}
                            fill
                            className="object-contain rounded-lg"
                            sizes="(max-width: 768px) 100vw, 800px"
                            priority
                          />
                        </div>
                      </div>

                      {/* Caption and next button */}
                      <div className="mt-4 flex justify-between items-center">
                        <h4
                          className={`${bigShouldersDisplay.className} font-bold text-xl text-gray-800`}
                          style={{ color: selectedSection.color }}
                        >
                          {selectedSection.title}
                        </h4>

                        <button
                          onClick={() => {
                            const nextId =
                              (selectedSection.id % bplanSections.length) + 1;
                            const nextSection = bplanSections.find(
                              (s) => s.id === nextId
                            );
                            if (nextSection) setSelectedSection(nextSection);
                          }}
                          className="flex items-center gap-1 text-sm font-medium"
                          style={{ color: selectedSection.color }}
                        >
                          Next:{" "}
                          {
                            bplanSections[
                              selectedSection.id % bplanSections.length
                            ].title
                          }
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 ml-1"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
