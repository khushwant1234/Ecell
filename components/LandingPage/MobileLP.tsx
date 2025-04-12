"use client";
import React from "react";
import styles from "./LP.module.css";
import { qualy, helveticaCompressed } from "@/app/fonts";

export default function MobileLP() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={`${styles.titleContainer} px-4 sm:px-8 md:px-16`}>
          {/* E-CELL PRESENTS */}
          <h2 className={`${styles.presents} text-center mb-6 sm:mb-8`}>
            <span className={helveticaCompressed.className}>
              E-CELL PRESENTS
            </span>
          </h2>

          <div
            className={`${styles.titleWrapper} max-w-full mx-4 sm:mx-6 md:mx-10`}
          >
            {/* Static title without 3D effect */}
            <div className={styles.title3dContainer}>
              <div
                className={`${styles.mainTitle} ${qualy.className} mx-auto px-2 sm:px-4`}
              >
                <h1 className={`${qualy.className} mobile-title`}>
                  <span className={qualy.className}>X</span>
                  <span className={qualy.className}>CELLERATE</span>
                </h1>
              </div>
              <div className={`${styles.secondTitle} mx-auto px-2 sm:px-4`}>
                <h1 className={`${qualy.className} mobile-title`}>
                  <span className={qualy.className}>IDEATHON</span>
                </h1>
              </div>
            </div>
          </div>

          {/* Prizes */}
          <p className={`${styles.prizes} mt-6 sm:mt-8 md:mt-10`}>
            <span className={helveticaCompressed.className}>
              5L+ WORTH PRIZES
            </span>
          </p>
        </div>
      </main>

      {/* Add custom CSS for mobile specific styling */}
      <style jsx global>{`
        .mobile-title {
          background: linear-gradient(135deg, #8e9aff 0%, #6c63ff 100%);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.5),
            -1px -1px 0 rgba(108, 99, 255, 0.3);
          transform: scaleX(1.2);
          transform-origin: center;
          display: inline-block;
          padding: 0 0.1em;
          margin: 0 auto;
        }

        @media (max-width: 480px) {
          .mobile-title {
            transform: scaleX(1.1);
            font-size: 3.5rem !important;
            letter-spacing: -1px;
            line-height: 0.9;
            padding: 0 0.15em;
          }
        }

        @media (min-width: 481px) and (max-width: 768px) {
          .mobile-title {
            font-size: 5rem !important;
            letter-spacing: -2px;
            line-height: 0.9;
            padding: 0 0.2em;
          }
        }

        @media (min-width: 769px) and (max-width: 1023px) {
          .mobile-title {
            font-size: 6.5rem !important;
            letter-spacing: -3px;
            padding: 0 0.25em;
          }
        }
      `}</style>
    </div>
  );
}
