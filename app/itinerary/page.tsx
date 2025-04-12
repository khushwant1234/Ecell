"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import { helveticaCompressed } from "@/app/fonts";

export default function BPlanPage() {
  // Wrap bplanSections in useMemo to fix the useEffect dependency warning
  const bplanSections = useMemo(
    () => [
      {
        title: "Executive Summary",
        content:
          "A brief overview of your business plan, highlighting key points...",
      },
      // ...other sections
    ],
    []
  );

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
        </motion.div>
      </div>
    </div>
  );
}
