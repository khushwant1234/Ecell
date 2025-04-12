"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./FAQ.module.css";
import { bigShouldersDisplay } from "@/app/fonts";

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData = [
    {
      question: "What is E-Cell?",
      answer: "-",
    },
    {
      question: "How do I register for an event?",
      answer: "-",
    },
    {
      question: "Are there any prerequisites for participating?",
      answer: "-",
    },
    {
      question: "Is there a registration fee?",
      answer: "-",
    },
    {
      question: "What kind of support does E-Cell provide?",
      answer: "-",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      className={`${styles.faqContainer} ${bigShouldersDisplay.className} tracking-wide`}
    >
      <h2
        className={`${styles.faqTitle} ${bigShouldersDisplay.className} tracking-wide`}
      >
        FAQs
      </h2>
      <div className={styles.faqList}>
        {faqData.map((faq, index) => (
          <div key={index} className={styles.faqItem}>
            <div
              onClick={() => toggleFAQ(index)}
              className={`${styles.faqQuestion} cursor-pointer flex justify-between items-center`}
            >
              <span>{faq.question}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transform transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="#8082f4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={openIndex === index ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                />
              </svg>
            </div>
            <div className={styles.questionLine}></div>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p
                    className={`${styles.loremText} ${bigShouldersDisplay.className} pt-2 pb-2`}
                  >
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
