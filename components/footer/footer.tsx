"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { helveticaCompressed, bigShouldersDisplay } from "@/app/fonts";

interface FooterProps {
  textColor?: string;
}

const Footer: React.FC<FooterProps> = ({ textColor }) => {
  return (
    <footer className="pt-10 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:justify-between gap-10">
          {/* Left Column */}
          <div className="space-y-6 w-full md:w-1/2">
            {/* XCELERATE in large font - only this uses the dynamic color */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2
                style={{ color: textColor }}
                className={`${helveticaCompressed.className} text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-normal`}
              >
                XCELERATE
              </h2>
            </motion.div>

            {/* Contact Numbers - now black */}
            <div className="space-y-2">
              <div
                className={`${bigShouldersDisplay.className} font-medium text-black`}
              >
                <span className="font-bold pr-2">P:</span>
                +91 87902 50014
              </div>
              <div
                className={`${bigShouldersDisplay.className} font-medium text-black`}
              >
                <span className="font-bold pr-2">P:</span>
                +91 95802 49433
              </div>
            </div>

            {/* Social Links - black */}
            <div className="flex space-x-5">
              <Link
                href="https://www.instagram.com/ecellsnioe/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:scale-110 transition-all"
                aria-label="Instagram"
              >
                <p
                  className={`${bigShouldersDisplay.className} text-black font-bold underline hover:text-gray-700 uppercase tracking-wide text-lg sm:text-xl transition-all duration-200`}
                >
                  INSTAGRAM
                </p>
              </Link>

              <Link
                href="mailto:ecell@snu.edu.edu"
                className="text-black hover:scale-110 transition-all"
                aria-label="Email"
              >
                <p
                  className={`${bigShouldersDisplay.className} text-black font-bold underline hover:text-gray-700 uppercase tracking-wide text-lg sm:text-xl transition-all duration-200`}
                >
                  EMAIL
                </p>
              </Link>

              <Link
                href="https://www.linkedin.com/school/entrepreneurshipcellshivnadaruniversity/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:scale-110 transition-all"
                aria-label="LinkedIn"
              >
                <p
                  className={`${bigShouldersDisplay.className} text-black font-bold underline hover:text-gray-700 uppercase tracking-wide text-lg sm:text-xl transition-all duration-200`}
                >
                  LINKEDIN
                </p>
              </Link>

              <Link
                href="https://www.youtube.com/@entrepreneurshipcellshivna1145"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:scale-110 transition-all"
                aria-label="Youtube"
              >
                <p
                  className={`${bigShouldersDisplay.className} text-black font-bold underline hover:text-gray-700 uppercase tracking-wide text-lg sm:text-xl transition-all duration-200`}
                >
                  YOUTUBE
                </p>
              </Link>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-between items-start md:items-end w-full md:w-1/2 space-y-8">
            {/* Date - black */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-right"
            >
              <h3
                className={`${bigShouldersDisplay.className} text-xl sm:text-2xl md:text-3xl text-black uppercase font-extrabold`}
              >
                12th and 14th April
              </h3>
            </motion.div>

            {/* Interested section - simple text link */}
            <div className="text-right">
              <p
                className={`${bigShouldersDisplay.className} text-lg text-black mb-2 font-extrabold`}
              >
                INTERESTED?
              </p>
              <Link
                href="https://unstop.com/competitions/xcelerate-30-ideathon-shiv-nadar-university-snu-greater-noida-1426973"
                target="_blank"
                rel="noopener noreferrer"
                className={`${bigShouldersDisplay.className} text-black font-bold underline hover:text-gray-700 uppercase tracking-wide text-lg sm:text-xl transition-all duration-200`}
                aria-label="Register Here"
              >
                Register Here Now
              </Link>
            </div>

            {/* Copyright - black */}
            <div className="w-full text-right">
              <p
                className={`${bigShouldersDisplay.className} text-sm text-black`}
              >
                © 2025 ECELL
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
