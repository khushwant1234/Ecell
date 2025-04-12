"use client";
import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/footer";
import { helveticaCompressed, bigShouldersDisplay } from "@/app/fonts";

export default function Page() {
  const [activeSection, setActiveSection] = useState(0);

  // Business plan sections with the new titles
  const bplanSections = useMemo(
    () => [
      {
        title: "Entry Plan",
        content: "",
        image: "/Images/bplan/entry.jpg",
      },
      {
        title: "Product",
        content: "",
        image: "/Images/bplan/product.jpg",
      },
      {
        title: "Market Analysis",
        content: "",
        image: "/Images/bplan/market.jpg",
      },
      {
        title: "Marketing Strategies",
        content: "",
        image: "/Images/bplan/strategy.jpg",
      },
      {
        title: "Financials",
        content: "",
        image: "/Images/bplan/finance.jpg",
      },
      {
        title: "Miscellaneous",
        content: "",
        image: "/Images/bplan/misc.jpg",
      },
    ],
    []
  );

  // Change section automatically every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prevIndex) => (prevIndex + 1) % bplanSections.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [bplanSections.length]);

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
            className={`${helveticaCompressed.className} text-4xl md:text-5xl lg:text-6xl tracing-wide text-[#B63B2C] uppercase tracking-wide`}
          >
            Business Plan Guide
          </h2>
          <p
            className={`${bigShouldersDisplay.className} text-lg text-gray-700 mt-4 max-w-2xl mx-auto`}
          >
            Follow this comprehensive outline to create a professional business
            plan that will impress investors and guide your entrepreneurial
            journey.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mb-8"
        >
          <a
            href="/documents/business-plan-template.pdf"
            download
            className="flex items-center gap-2 bg-[#B63B2C] hover:bg-[#A32A1B] text-white py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span
              className={`${helveticaCompressed.className} uppercase tracking-wide text-lg tracking-wide`}
            >
              Download B-Plan Template
            </span>
          </a>
        </motion.div>

        {/* Section Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {bplanSections.map((section, index) => (
            <button
              key={index}
              onClick={() => setActiveSection(index)}
              className={`${
                bigShouldersDisplay.className
              } px-3 py-1 rounded-lg text-sm md:text-base transition-all duration-300 ${
                activeSection === index
                  ? "bg-[#B63B2C] text-white font-bold scale-110"
                  : "bg-white text-[#B63B2C] border font-bold  border-[#B63B2C] hover:bg-[#B63B2C]/10"
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Active Section Display */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="md:flex">
            {/* Image Section with Fallback */}
            <div className="md:w-1/2 h-64 md:h-auto">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${bplanSections[activeSection].image})`,
                  backgroundColor: "#eed4ce",
                }}
              >
                {/* Fallback/overlay content */}
                <div className="flex items-center justify-center h-full w-full bg-[#eed4ce]/70">
                  <span
                    className={`${helveticaCompressed.className} text-[#B63B2C] text-2xl tracing-wide px-4 py-2 bg-white/80 rounded`}
                  >
                    {bplanSections[activeSection].title}
                  </span>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="md:w-1/2 p-6 md:p-8">
              <h3
                className={`${helveticaCompressed.className} text-2xl md:text-3xl tracing-wide text-[#B63B2C] mb-4`}
              >
                {bplanSections[activeSection].title}
              </h3>

              {/* Placeholder content notice */}
              <p
                className={`${bigShouldersDisplay.className} text-gray-700 leading-relaxed italic`}
              >
                Content will be available soon.
              </p>

              {/* Section Progress Indicator */}
              <div className="mt-8 flex gap-1 justify-center">
                {bplanSections.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === activeSection
                        ? "w-8 bg-[#B63B2C]"
                        : "w-2 bg-gray-300"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tips Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 bg-[#eed4ce] rounded-xl p-6 shadow-md"
        >
          <h3
            className={`${helveticaCompressed.className} text-xl text-[#B63B2C] mb-3`}
          >
            Pro Tips
          </h3>
          <ul
            className={`${bigShouldersDisplay.className} text-gray-800 space-y-2 list-disc pl-5`}
          >
            <li>
              Keep your business plan concise—aim for 15-25 pages plus
              appendices
            </li>
            <li>Use clear, simple language and avoid industry jargon</li>
            <li>
              Include visuals like charts and graphs to illustrate key data
            </li>
            <li>
              Review and update your plan regularly as your business evolves
            </li>
            <li>Have trusted advisors review your plan before finalizing it</li>
          </ul>
        </motion.div>
      </div>

      <Footer textColor="#B63B2C" />
    </div>
  );
}
