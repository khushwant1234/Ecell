"use client";
import Link from "next/link";
import Image from "next/image";
import { FC, useState, useEffect } from "react";
import { helveticaCompressed } from "@/app/fonts";

interface NavbarProps {
  textColor: string;
}

const Navbar: FC<NavbarProps> = ({ textColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile screen size and handle resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Initial check
    checkScreenSize();

    // Add event listener for resize
    window.addEventListener("resize", checkScreenSize);

    // Clean up
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Close mobile menu when clicking on a link
  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav
      className={`${helveticaCompressed.className} relative flex justify-between items-center py-4 px-4 sm:px-6 lg:px-12 tracking-wide text-xl z-30`}
    >
      {/* Left side - Contact & Welcome */}
      <div
        className="hidden md:flex items-center space-x-4"
        style={{ color: textColor }}
      >
        <a
          href="mailto:ecell@snu.edu.in"
          className="underline hover:opacity-80 transition-opacity"
        >
          ECELL@SNU.EDU.IN
        </a>
        <span className="hidden lg:inline">+</span>
        <span className="hidden lg:inline underline">
          <a
            href="https://unstop.com/competitions/xcelerate-30-ideathon-shiv-nadar-university-snu-greater-noida-1426973"
            className="underline hover:opacity-80 transition-opacity"
          >
            WELCOME TO XCELERATE 2025
          </a>
        </span>
      </div>

      {/* Mobile hamburger */}
      <button
        className="lg:hidden z-30"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
        style={{ color: textColor }}
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        )}
      </button>

      {/* Center logo - stays centered on all screen sizes */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Link href={"/"} className="flex items-center">
          <Image
            src="/Images/logo.svg"
            alt="E-Cell Logo"
            width={isMobile ? 50 : 60}
            height={isMobile ? 50 : 60}
            className="mx-auto"
          />
        </Link>
      </div>

      {/* Desktop navigation links */}
      <div
        className="hidden lg:flex space-x-8 xl:space-x-10"
        style={{ color: textColor }}
      >
        <Link href="/faq" className="hover:opacity-80 transition-opacity">
          FAQ
        </Link>
        <Link
          href="/recruitment/LearnMore"
          className="hover:opacity-80 transition-opacity"
        >
          TEAMS
        </Link>
        <Link
          href="/recruitment/form"
          className="hover:opacity-80 transition-opacity"
        >
          APPLY
        </Link>
        <Link href="/itinerary" className="hover:opacity-80 transition-opacity">
          ITINERARY
        </Link>
        <Link href="/about" className="hover:opacity-80 transition-opacity">
          ABOUT E-CELL
        </Link>
        <Link href="/games" className="hover:opacity-80 transition-opacity">
          GAMES
        </Link>
      </div>

      {/* Empty div for spacing on mobile */}
      <div className="lg:hidden"></div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 bg-black/95 z-20 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-full flex flex-col items-center justify-center p-4">
          <div className="flex flex-col items-center space-y-8 text-2xl">
            <Link
              href="/"
              className="text-white hover:text-gray-300 transition-colors"
              onClick={closeMobileMenu}
            >
              HOME
            </Link>
            <Link
              href="/faq"
              className="text-white hover:text-gray-300 transition-colors"
              onClick={closeMobileMenu}
            >
              FAQ
            </Link>
            <Link
              href="/recruitment/LearnMore"
              className="text-white hover:text-gray-300 transition-colors"
              onClick={closeMobileMenu}
            >
              TEAMS
            </Link>
            <Link
              href="/recruitment/form"
              className="text-white hover:text-gray-300 transition-colors"
              onClick={closeMobileMenu}
            >
              APPLY
            </Link>
            <Link
              href="/itinerary"
              className="text-white hover:text-gray-300 transition-colors"
              onClick={closeMobileMenu}
            >
              ITINERARY
            </Link>
            <Link
              href="/about"
              className="text-white hover:text-gray-300 transition-colors"
              onClick={closeMobileMenu}
            >
              ABOUT E-CELL
            </Link>
            <Link
              href="/games"
              className="text-white hover:text-gray-300 transition-colors"
              onClick={closeMobileMenu}
            >
              GAMES
            </Link>

            {/* Mobile-only email */}
            <a
              href="mailto:ecell@snu.edu.in"
              className="text-white hover:text-gray-300 transition-colors underline"
              onClick={closeMobileMenu}
            >
              ECELL@SNU.EDU.IN
            </a>

            {/* Xcelerate text */}
            <div className="pt-4 text-xl text-white text-center">
              <a
                href="https://unstop.com/competitions/xcelerate-30-ideathon-shiv-nadar-university-snu-greater-noida-1426973"
                className="text-white hover:text-gray-300 transition-colors underline"
                onClick={closeMobileMenu}
              >
                WELCOME TO XCELERATE 2025
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
