"use client";
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/footer";
import { helveticaCompressed, bigShouldersDisplay } from "@/app/fonts";

const formatContent = (content: string) => {
  if (!content || content.trim() === "") {
    return (
      <p className="text-gray-700 italic">Content will be available soon.</p>
    );
  }

  // Split the content by lines
  const lines = content.split("\n");
  const formattedContent: React.ReactNode[] = [];
  let currentList: string[] = [];
  let key = 0;

  // Process each line
  lines.forEach((line, index) => {
    const trimmedLine = line.trim();

    // Check if it's a bullet point
    if (trimmedLine.startsWith("•")) {
      // Add to current bullet list
      currentList.push(trimmedLine.substring(1).trim());
    } else {
      // If we have bullet points collected, add the list
      if (currentList.length > 0) {
        formattedContent.push(
          <ul
            key={`list-${key++}`}
            className="list-disc pl-6 mb-4 text-gray-700"
          >
            {currentList.map((item, i) => (
              <li key={`item-${i}`} className="mb-2">
                {item}
              </li>
            ))}
          </ul>
        );
        currentList = [];
      }

      // Add the regular line as a paragraph if it's not empty
      if (trimmedLine && !trimmedLine.startsWith("-")) {
        formattedContent.push(
          <p key={`para-${key++}`} className="text-gray-700 mb-4 font-medium">
            {trimmedLine}
          </p>
        );
      }
    }
  });

  // Handle any remaining bullet points
  if (currentList.length > 0) {
    formattedContent.push(
      <ul key={`list-${key++}`} className="list-disc pl-6 mb-4 text-gray-700">
        {currentList.map((item, i) => (
          <li key={`item-${i}`} className="mb-2">
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return <>{formattedContent}</>;
};

export default function Page() {
  const [activeSection, setActiveSection] = useState(0);

  // Business plan sections with the new titles
  const bplanSections = useMemo(
    () => [
      {
        title: "Market Analysis",
        content: `Market Analysis
Industry overview 
•	What is the current size of the market you are entering, and what is its growth potential?
•	What are the key benefits of entering this industry, and what challenges does it currently face?
•	What government policies support the growth and development of this industry?
Competitors
•	What new businesses have recently entered the market, and how are they impacting the competitive landscape?
•	What are the current trends in customer retention and goodwill in the market?
Market Trends
•	Have the number of people in your target market been increasing or decreasing over the last several years?
•	How do changes in the current market affect your idea?
•	What all factors affect the market you are entering?
Risk and Recovery Dynamics
•	What level of risk is typically tolerated in your industry, and how are failures generally perceived?
•	How much flexibility does the industry offer for businesses to learn from and bounce back after setbacks?
•	How does the nature of customer loyalty or perception affect a brand’s ability to recover from mistakes?
For example, a poorly received tequila brand in India may struggle to regain customer trust, potentially leading to business failure. In contrast, a clothing brand with one bad season can still recover in the next, retaining its customer base. Assessing an industry’s flexibility helps determine how much risk can be taken while ensuring long-term sustainability.
Target market 
•	Who is your ideal customer in terms of age, gender, income level, and lifestyle? Include other relevant demographic information as well.
•	What is the estimated size and spending potential of this target market in your geographic area?
Market Research 
•	Does the plan thoroughly describe the target market, customer needs, and competitive landscape? Is it comprehensive?
•	How accurate and up to date is the market research provided?
•	Are there clear insights derived from the market research that are actionable for the business?
-	-	-
`,
        image: "/Images/bplan/MarketAnalysis.jpg",
        // contentImage: "/Images/bplan/market-content.jpg",
      },
      {
        title: "Product",
        content: `Product
Product Description
•	Give a brief overview of your product.
•	What problem does your product solve?   
•	What makes your product unique compared to existing alternatives in the market? (USP)  
Key Features and Functionality
•	How does your product work? 
•	What advantages does the product offer over competing products in terms of quality, performance, or functionality?   
•	What are the main benefits that users can expect from using your product?  
Product Development
•	What was the inspiration behind developing your product?  
•	Describe the development process of your product.
•	How do you ensure the quality and reliability of your product?  
•	What kind of machinery and resources would you require in this stage? 
KPI (Key Performance Indicators)
•	What metrics or KPIs are you using to measure the success and performance of your product?
•	How do you plan to achieve this performance/success? 
Product Stability and Market Protection
•	What unique features, expertise, or intellectual property make your product or service hard to replicate?
•	Are there barriers to entry such as regulations, licensing, or specialized knowledge that protect your position?
•	How adaptable is your product to changing market conditions and evolving consumer needs?
•	What safeguards exist to maintain long-term competitiveness and reduce vulnerability to new entrants?
DFV Analysis
•	Desirability: Was the product desired before it existed?
•	Feasibility: Is it feasible to grow and sustain in the long run?
•	Viability: How viable is the implementation of the product? 
Scalability and technical infrastructure: 
•	What technical infrastructure supports your product?  
•	How do you plan to handle increased demand as your user base grows? 
•	Can your product evolve to keep up with changing market trends and consumer demands?
Customer management: 
•	Customer fixedness: Does the product have what it takes to penetrate the dynamic market with changing market trends?
•	Customer retention: Is the product capable of quickly building a loyal customer base? How?
•	Value Loop creation: How does your business create a value loop by continuously delivering, capturing, and enhancing value through customer interaction and feedback?
Psychological Influences and Stakeholders’ Mindsets
•	How effectively does the product create a psychological impact on users, shaping their trust and engagement?
•	In what ways does the product align with stakeholders’ values, goals, and expectations?
•	Does the concept positively impact both user behavior and stakeholder confidence?
-	-	-
`,
        image: "/Images/bplan/MarketAnalysis.jpg",
        // contentImage: "/Images/bplan/product-content.jpg",
      },
      {
        title: "Entry Plan",
        content: `Entry Plan
Market Positioning & Go-To-Market Strategy 
•	Describe how the product is positioned in the market (e.g., luxury, economical, etc.).
•	Define the core deliverables of the product or service.
•	Explain the pricing strategy and how it compares to competitors. 
Execution Timeline 
•	Provide a phased rollout plan, including MVP, beta release, and full launch stages.
•	List key milestones along with measurable targets for each phase. 
Resource Allocation 
•	Outline the budget requirements necessary for a successful launch.
•	Identify critical team roles and key partnerships essential to execution.
•	Plan a launch event or a similar promotional initiative to generate traction.
•	Provide a strategic resource allocation plan based on specific geographic locations. 
Risk Mitigation
•	Identify potential barriers to market entry that could impact the launch.
•	Describe contingency plans in place to address unforeseen challenges.
Pre-Launch Feedback
•	Explain how pre-launch market feedback will be gathered and analyzed.
•	Highlight how key insights from the feedback will influence product or strategy adjustments.
-	-	-
`,
        image: "/Images/bplan/MarketAnalysis.jpg",
        // contentImage: "/Images/bplan/entry-content.jpg",
      },
      {
        title: "Importance-Difficulty Matrix ",
        content: `An IDM is a tabular representation used to identify the nuances and intricacies of your idea, product, or service. It is an important matrix that helps you understand your standing in the market as on day zero. Teams will be judged based on their awareness of their product positioning and the strategies they plan to use to build upon that position in the future. Use the image below as a reference.`,
        image: "/Images/bplan/MarketAnalysis.jpg",
        contentImage: "/Images/bplan/IDM.png",
      },
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
            href="/Images/bplan/B-Plan-Doc.pdf"
            download
            className="flex items-center gap-2 bg-[#B63B2C] hover:bg-[#A32A1B] text-white py-3 px-6 rounded-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
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
              className={`${helveticaCompressed.className} uppercase text-lg tracking-wide`}
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
              } px-3 py-1 rounded-sm text-sm md:text-base transition-all duration-300 ${
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
          className="bg-white rounded-sm shadow-lg overflow-hidden"
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
            <div className="md:w-1/2 p-6 md:p-8 overflow-y-auto max-h-[500px]">
              <h3
                className={`${helveticaCompressed.className} text-2xl md:text-3xl tracing-wide text-[#B63B2C] mb-4 sticky top-0 bg-white py-2 z-10`}
              >
                {bplanSections[activeSection].title}
              </h3>

              {/* Render formatted content */}
              {formatContent(bplanSections[activeSection].content)}

              {/* Render additional content image if available */}
              {bplanSections[activeSection].contentImage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-6 mb-4"
                >
                  <img
                    src={bplanSections[activeSection].contentImage}
                    alt={`${bplanSections[activeSection].title} Illustration`}
                    className="w-full rounded-sm shadow-md border border-gray-200"
                  />
                  <p className="text-sm text-gray-500 mt-2 text-center italic">
                    {bplanSections[activeSection].title} - Visual Reference
                  </p>
                </motion.div>
              )}

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
          className="mt-12 bg-[#eed4ce] rounded-sm p-6 shadow-md"
        >
          <h3
            className={`${helveticaCompressed.className} text-xl text-[#B63B2C] mb-3`}
          >
            Tips
          </h3>
          <ul
            className={`${bigShouldersDisplay.className} text-gray-800 space-y-2 list-disc pl-5`}
          >
            <li>
              Evaluation 1: You have 7 minutes for your pitch. Then 3 minutes
              will be given to the judges for quesitoning. That's it.
            </li>
            <li>Use clear, simple language and avoid industry jargon</li>
            {/* <li>
              Include visuals like charts and graphs to illustrate key data
            </li>
            <li>
              Review and update your plan regularly as your business evolves
            </li>
            <li>Have trusted advisors review your plan before finalizing it</li> */}
          </ul>
        </motion.div>
      </div>

      <Footer textColor="#B63B2C" />
    </div>
  );
}
