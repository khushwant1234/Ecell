"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Link from "next/link";

const COMPANIES = [
  {
    name: "Apple",
    logo: "🍎",
    valuation_s: "$3.28T",
    valuation: 3.28,
  },
  {
    name: "Google",
    logo: "🌐",
    valuation_s: "$2.01T",
    valuation: 2.01,
  },
  {
    name: "Microsoft",
    logo: "💻",
    valuation_s: "$2.92T",
    valuation: 2.92,
  },
  {
    name: "Amazon",
    logo: "🛒",
    valuation_s: "$2.13T",
    valuation: 2.13,
  },
  {
    name: "Tesla",
    logo: "⚡",
    valuation_s: "$865.28B",
    valuation: 0.86528,
  },
  {
    name: "Meta",
    logo: "📱",
    valuation_s: "$1.19T",
    valuation: 1.19,
  },
  {
    name: "NVIDIA",
    logo: "🎮",
    valuation_s: "$2.15T",
    valuation: 2.15,
  },
  {
    name: "Samsung",
    logo: "📺",
    valuation_s: "$414.19B",
    valuation: 0.41419,
  },
  {
    name: "Berkshire Hathaway",
    logo: "🏦",
    valuation_s: "$865.44B",
    valuation: 0.86544,
  },
  {
    name: "Visa",
    logo: "💳",
    valuation_s: "$573.47B",
    valuation: 0.57347,
  },
  {
    name: "JP Morgan",
    logo: "🏛️",
    valuation_s: "$492.14B",
    valuation: 0.49214,
  },
  {
    name: "Johnson & Johnson",
    logo: "💊",
    valuation_s: "$453.66B",
    valuation: 0.45366,
  },
  {
    name: "Walmart",
    logo: "🏪",
    valuation_s: "$437.84B",
    valuation: 0.43784,
  },
  {
    name: "United Health",
    logo: "🏥",
    valuation_s: "$485.75B",
    valuation: 0.48575,
  },
  {
    name: "Toyota",
    logo: "🚗",
    valuation_s: "$271.48B",
    valuation: 0.27148,
  },
  {
    name: "Coca-Cola",
    logo: "🥤",
    valuation_s: "$268.43B",
    valuation: 0.26843,
  },
  {
    name: "Dominos",
    logo: "🍕",
    valuation_s: "$20.83B",
    valuation: 0.02083,
  },
  {
    name: "Disney",
    logo: "🏰",
    valuation_s: "$170.56B",
    valuation: 0.17056,
  },
  {
    name: "Intel",
    logo: "🖥️",
    valuation_s: "$185.47B",
    valuation: 0.18547,
  },
  {
    name: "Netflix",
    logo: "🎬",
    valuation_s: "$223.68B",
    valuation: 0.22368,
  },
  {
    name: "Starbucks",
    logo: "☕",
    valuation_s: "$124.75B",
    valuation: 0.12475,
  },
  {
    name: "Nike",
    logo: "👟",
    valuation_s: "$196.35B",
    valuation: 0.19635,
  },
  {
    name: "PayPal",
    logo: "💲",
    valuation_s: "$96.45B",
    valuation: 0.09645,
  },
  {
    name: "Astra Zeneca",
    logo: "🧬",
    valuation_s: "$234.56B",
    valuation: 0.23456,
  },
  {
    name: "Shell",
    logo: "⛽",
    valuation_s: "$198.23B",
    valuation: 0.19823,
  },
  {
    name: "Alibaba",
    logo: "🛍️",
    valuation_s: "$210.45B",
    valuation: 0.21045,
  },
  {
    name: "Salesforce",
    logo: "💼",
    valuation_s: "$189.76B",
    valuation: 0.18976,
  },
  {
    name: "Netflix",
    logo: "🎥",
    valuation_s: "$223.68B",
    valuation: 0.22368,
  },
  {
    name: "Adobe",
    logo: "🎨",
    valuation_s: "$245.67B",
    valuation: 0.24567,
  },
  {
    name: "Unilever",
    logo: "🧼",
    valuation_s: "$137.89B",
    valuation: 0.13789,
  },
  {
    name: "Pfizer",
    logo: "💉",
    valuation_s: "$188.34B",
    valuation: 0.18834,
  },
  {
    name: "Goldman Sachs",
    logo: "💹",
    valuation_s: "$134.56B",
    valuation: 0.13456,
  },
  {
    name: "Sony",
    logo: "🎮",
    valuation_s: "$105.78B",
    valuation: 0.10578,
  },
  {
    name: "Oracle",
    logo: "💾",
    valuation_s: "$292.45B",
    valuation: 0.29245,
  },
];

type Company = (typeof COMPANIES)[number];

export default function CardGame() {
  const [points, setPoints] = useState(0.0);
  const [companyHistory, setCompanyHistory] = useState<Company[]>([]);
  const [currentCompany, setCurrentCompany] = useState<Company | null>(null);
  const [winAnimations, setWinAnimations] = useState<{ id: string }[]>([]);
  const [lossAnimations, setLossAnimations] = useState<{ id: string }[]>([]);
  const animationCounter = useRef(0);
  const [isOpen, setIsOpen] = useState(false);

  function close() {
    setIsOpen(false);
  }

  const resetGame = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
      setIsOpen(false);
    }
  };
  const showWin = () => {
    const id = `win-${animationCounter.current++}`; // Unique incremental key
    const newAnimation = { id };

    setWinAnimations((prev) => [...prev, newAnimation]);

    // Automatically remove the animation after it completes
    setTimeout(() => {
      setWinAnimations((prev) => prev.filter((anim) => anim.id !== id));
    }, 700);
  };
  const showLoss = () => {
    const id = `loss-${animationCounter.current++}`; // Unique incremental key
    const newAnimation = { id };

    setLossAnimations((prev) => [...prev, newAnimation]);

    // Automatically remove the animation after it completes
    setTimeout(() => {
      setLossAnimations((prev) => prev.filter((anim) => anim.id !== id));
    }, 700);
  };

  const generateRandomCompany = useCallback(
    (excludedCompanies: string[]): Company | null => {
      const availableCompanies = COMPANIES.filter(
        (company) => !excludedCompanies.includes(company.name)
      );
      if (availableCompanies.length === 0) return null; // No more unique companies
      return availableCompanies[
        Math.floor(Math.random() * availableCompanies.length)
      ];
    },
    []
  );

  useEffect(() => {
    const initialCompany = generateRandomCompany([]);

    if (initialCompany) {
      const companyHistory = generateRandomCompany([initialCompany.name]);
      setCurrentCompany(initialCompany);
      setCompanyHistory([companyHistory!]);
    }
  }, [generateRandomCompany]);

  const handleGuess = (guessHigher: boolean) => {
    setCompanyHistory((prevHistory) => {
      const newCompany = generateRandomCompany(
        [
          currentCompany!.name,
          ...prevHistory.map((company) => company.name),
        ].filter(Boolean)
      );

      if (!newCompany) {
        setIsOpen(true);
        return prevHistory;
      }

      // Compare with the most recent company in history
      const lastCompany = prevHistory[0];

      if (
        (guessHigher && currentCompany!.valuation > lastCompany.valuation) ||
        (!guessHigher && currentCompany!.valuation < lastCompany.valuation)
      ) {
        setPoints((prev) => prev + 100);
        showWin();
      } else {
        setPoints((prev) => {
          const newPoints = prev - 100 < 0 ? 0 : prev - 100;

          return newPoints;
        });
        showLoss();
      }

      setCurrentCompany(newCompany);
      return [currentCompany!, ...prevHistory];
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#E5D7EA] text-white">
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-50% max-w-md rounded-xl bg-white/90 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-bold text-black">
                Your score is : {points}
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-black/50 font-medium">
                Well done! Register for accelerate!
              </p>
              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={resetGame}
                >
                  Play Again
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      <nav className="w-full bg-[#6F30D2] py-4 px-6 flex gap-4 justify-between items-center">
        {/* Back to Games button */}
        <Link href="/games">
          <button className="relative px-3 py-1 font-medium group text-sm">
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-white/20 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
            <span className="absolute inset-0 w-full h-full bg-[#6F30D2] border-2 border-white/40 group-hover:bg-[#5c28b0]"></span>
            <span className="relative text-white group-hover:text-white flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Games
            </span>
          </button>
        </Link>

        <div className="text-white text-2xl font-bold">HI-LO VAULT</div>

        {/* Empty div to balance the layout */}
        <div className="w-[116px]"></div>
      </nav>

      {/* Left sidebar with betting controls */}
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr]">
        <div className="border-r border-gray-700 p-4 flex flex-col gap-4">
          {/* Bet amount section */}
          <div className="space-y-2">
            <div className="flex justify-between items-center ">
              <span className="text-[#6F30D2] font-bold">Total Points:</span>
              <span className="text-black font-bold">{points}</span>
            </div>
          </div>

          {/* Buttons */}

          <div className="flex flex-col items-center space-y-4 w-full">
            <button
              className="relative px-4 py-2 font-medium group w-full flex items-center justify-between "
              onClick={() => handleGuess(true)}
            >
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#6F30D2] group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
              <span className="absolute inset-0 w-full h-full bg-white border-2 border-[#6F30D2] group-hover:bg-[#6F30D2]"></span>
              <span className="relative text-[#6F30D2] group-hover:text-white font-black flex w-full items-center">
                HIGHER
                <ArrowUp className="h-4 w-4 text-green-400 ml-auto" />
              </span>
            </button>

            <button
              className="relative px-4 py-2 font-medium group w-full flex items-center justify-between"
              onClick={() => handleGuess(false)}
            >
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#6F30D2] group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
              <span className="absolute inset-0 w-full h-full bg-white border-2 border-[#6F30D2] group-hover:bg-[#6F30D2]"></span>
              <span className="relative text-[#6F30D2] group-hover:text-white font-black flex w-full items-center">
                LOWER
                <ArrowDown className="h-4 w-4 text-red-400 ml-auto" />
              </span>
            </button>

            <div className="flex flex-col items-center space-y-4 w-full relative">
              {/* Existing buttons */}
              <AnimatePresence>
                {winAnimations.map(({ id }) => (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: -15 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.7 }}
                    className={`
              absolute
              top-0
              left-1/2
              transform 
              -translate-x-1/2 
              text-green-500
              text-3xl 
              font-bold 
              z-50
              pointer-events-none
            `}
                  >
                    +100
                  </motion.div>
                ))}
                {lossAnimations.map(({ id }) => (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 25 }}
                    exit={{ opacity: 0, y: 40 }}
                    transition={{ duration: 0.7 }}
                    className={`
              absolute
              top-0
              left-1/2
              transform 
              -translate-x-1/2 
              text-red-500
              text-3xl 
              font-bold 
              z-50
              pointer-events-none
            `}
                  >
                    -100
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Main game area */}
        <div className="p-4">
          <div className="flex justify-center items-center gap-8 my-8">
            <div className="flex flex-col items-center">
              <div className="text-xl font-bold text-[#6F30D2] mb-2">
                IS VALUE OF
              </div>
              <div className="relative">
                <div className="w-28 h-44 bg-white rounded-lg flex flex-col justify-between p-3 items-center border-2 border-[#6F30D2] shadow-lg">
                  <div className="text-xl font-bold text-[#6F30D2] mx-2">
                    {currentCompany ? currentCompany.name : "Company"}
                  </div>
                  <div className="text-3xl font-bold text-[#6F30D2] ">
                    {currentCompany ? currentCompany.logo : "Logo"}
                  </div>
                  <div className="text-l font-bold text-[#6F30D2]">
                    Value: ???
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-xl font-bold text-[#6F30D2] mb-2">
                MORE/LESS THAN
              </div>
              <div className="relative">
                <div className="w-28 h-44 bg-white rounded-lg flex flex-col justify-between p-3 items-center border-2 border-[#6F30D2] shadow-lg">
                  <div className="text-xl font-bold text-[#6F30D2] mx-2">
                    {companyHistory[0] ? companyHistory[0].name : "Company"}
                  </div>
                  <div className="text-3xl font-bold text-[#6F30D2] ">
                    {companyHistory[0] ? companyHistory[0].logo : "Logo"}
                  </div>
                  <div className="text-xs nowrap font-bold text-[#6F30D2]">
                    Value:{" "}
                    {companyHistory[0] ? companyHistory[0].valuation_s : "$Val"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*Divider*/}
          <div className="w-full h-[2px] bg-[#6F30D2] my-4"></div>

          <div className="mt-6">
            <h3 className="text-[#6F30D2] font-bold mb-2">Company History</h3>
            <div className="flex flex-nowrap gap-2 overflow-x-auto max-w-full lg:flex-wrap">
              {companyHistory.map((company, index) => (
                <div
                  key={index}
                  className="w-16 h-24 bg-white rounded-lg flex flex-col justify-between p-1 border border-[#6F30D2] shadow-sm"
                >
                  <div className="text-xs font-bold text-[#6F30D2] self-center text-center mx-2">
                    {company.name}
                  </div>
                  <div className="self-center text-xl">{company.logo}</div>
                  <div className="text-xs font-bold text-[#6F30D2] self-center text-center">
                    {company.valuation_s}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
