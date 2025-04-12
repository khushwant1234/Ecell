"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { helveticaCompressed } from "@/app/fonts";

const CountdownClock = () => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  // Function to get the next Saturday at 11 AM
  const getNextSaturday = (): Date => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const daysUntilSaturday =
      dayOfWeek === 6 && now.getHours() < 11 ? 0 : (6 + 7 - dayOfWeek) % 7;
    const nextSaturday = new Date(now);
    nextSaturday.setDate(now.getDate() + daysUntilSaturday);
    nextSaturday.setHours(11, 0, 0, 0);
    return nextSaturday;
  };

  // Memoize the target date
  const targetDate = useMemo(() => getNextSaturday(), []);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPast: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  // Format values to always have 2 digits
  const formattedDays = timeRemaining.days.toString().padStart(2, "0");
  const formattedHours = timeRemaining.hours.toString().padStart(2, "0");
  const formattedMinutes = timeRemaining.minutes.toString().padStart(2, "0");
  const formattedSeconds = timeRemaining.seconds.toString().padStart(2, "0");

  return (
    <section className="py-8 md:py-12">
      {/* Heading */}
      <motion.h2
        style={{ color: "#8082E9" }}
        className={`${helveticaCompressed.className} text-4xl sm:text-5xl text-center font-extrabold mb-4 sm:mb-8 uppercase tracking-wide mx-4 sm:mx-20 break-words`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Time is Ticking!
      </motion.h2>

      {/* Clock container - changed from overflow-hidden to allow text to be visible */}
      <div className="overflow-visible mx-4 sm:mx-10 md:mx-20 my-40">
        <motion.div
          className="flex justify-center items-center w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div
            className={`${helveticaCompressed.className} text-center w-full`}
          >
            {/* Allowed flex-wrap to handle overflow */}
            <div className="flex flex-wrap justify-center items-baseline w-full gap-3 xs:gap-4 sm:gap-6 md:gap-8 lg:gap-10">
              {/* Days - Added break-all to prevent overflow issues */}
              <div className="flex flex-col items-center min-w-[60px] xs:min-w-[80px] sm:min-w-[100px] md:min-w-[120px]">
                <motion.div
                  style={{ color: "#8082E9" }}
                  className="text-6xl xs:text-7xl sm:text-8xl md:text-[8rem] lg:text-[10rem] xl:text-[12rem] 2xl:text-[13rem] font-extrabold break-all overflow-visible"
                  key={`days-${formattedDays}`}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {formattedDays}
                </motion.div>
                <span className="text-sm sm:text-lg md:text-2xl lg:text-3xl text-[#8082E9] mt-1 md:mt-2 break-words">
                  DAYS
                </span>
              </div>

              {/* Colon - Added visibility fixes */}
              <div
                style={{ color: "#8082E9" }}
                className="text-5xl xs:text-6xl sm:text-7xl md:text-[5rem] lg:text-[6rem] xl:text-[7rem] font-extrabold self-center break-words"
              >
                :
              </div>

              {/* Hours - Added break-all to prevent overflow issues */}
              <div className="flex flex-col items-center min-w-[60px] xs:min-w-[80px] sm:min-w-[100px] md:min-w-[120px]">
                <motion.div
                  style={{ color: "#8082E9" }}
                  className="text-6xl xs:text-7xl sm:text-8xl md:text-[8rem] lg:text-[10rem] xl:text-[12rem] 2xl:text-[13rem] font-extrabold break-all overflow-visible"
                  key={`hours-${formattedHours}`}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {formattedHours}
                </motion.div>
                <span className="text-sm sm:text-lg md:text-2xl lg:text-3xl text-[#8082E9] mt-1 md:mt-2 break-words">
                  HOURS
                </span>
              </div>

              {/* Colon - Added visibility fixes */}
              <div
                style={{ color: "#8082E9" }}
                className="text-5xl xs:text-6xl sm:text-7xl md:text-[5rem] lg:text-[6rem] xl:text-[7rem] font-extrabold self-center break-words"
              >
                :
              </div>

              {/* Minutes - Added break-all to prevent overflow issues */}
              <div className="flex flex-col items-center min-w-[60px] xs:min-w-[80px] sm:min-w-[100px] md:min-w-[120px]">
                <motion.div
                  style={{ color: "#8082E9" }}
                  className="text-6xl xs:text-7xl sm:text-8xl md:text-[8rem] lg:text-[10rem] xl:text-[12rem] 2xl:text-[13rem] font-extrabold break-all overflow-visible"
                  key={`minute-${formattedMinutes}`}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {formattedMinutes}
                </motion.div>
                <span className="text-sm sm:text-lg md:text-2xl lg:text-3xl text-[#8082E9] mt-1 md:mt-2 break-words">
                  MINS
                </span>
              </div>

              {/* Colon - Added visibility fixes */}
              <div
                style={{ color: "#8082E9" }}
                className="text-5xl xs:text-6xl sm:text-7xl md:text-[5rem] lg:text-[6rem] xl:text-[7rem] font-extrabold self-center break-words"
              >
                :
              </div>

              {/* Seconds - Added break-all to prevent overflow issues */}
              <div className="flex flex-col items-center min-w-[60px] xs:min-w-[80px] sm:min-w-[100px] md:min-w-[120px]">
                <motion.div
                  style={{ color: "#8082E9" }}
                  className="text-6xl xs:text-7xl sm:text-8xl md:text-[8rem] lg:text-[10rem] xl:text-[12rem] 2xl:text-[13rem] font-extrabold break-all overflow-visible"
                  key={`second-${formattedSeconds}`}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {formattedSeconds}
                </motion.div>
                <span className="text-sm sm:text-lg md:text-2xl lg:text-3xl text-[#8082E9] mt-1 md:mt-2 break-words">
                  SECS
                </span>
              </div>
            </div>

            {/* Event Status Message - Added break-words */}
            {timeRemaining.isPast && (
              <motion.div
                className="mt-8 sm:mt-10 text-2xl sm:text-3xl md:text-5xl lg:text-6xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                <span className="text-green-600 font-semibold break-words">
                  Event is LIVE now! 🎉
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CountdownClock;
