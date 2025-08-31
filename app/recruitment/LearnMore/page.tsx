"use client";
// pages/learn-more.tsx

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { helveticaCompressed, bigShouldersDisplay } from "@/app/fonts";

// --- Team Data ---
const teamsData = [
  {
    name: "Tech Team",
    teamId: "tech-team",
    description:
      "The Tech Team is the engine of our organization, responsible for building and maintaining our digital infrastructure. From developing websites to integrating hardware systems, this team makes ideas come alive with code and circuits.",
    imageUrl: "/images/tech-team.jpg",
    icon: "💻",
    gradient: "from-blue-600 to-purple-600",
    skills: ["Web Development", "System Integration", "Hardware Programming"],
  },
  {
    name: "Marketing Team",
    teamId: "marketing-team",
    description:
      "The Marketing Team drives visibility and growth by crafting campaigns, managing social media, and building strong brand narratives. They ensure our voice reaches the right audience at the right time.",
    imageUrl: "/images/marketing-team.jpg",
    icon: "📈",
    gradient: "from-pink-500 to-rose-500",
    skills: ["Campaign Strategy", "Social Media", "Brand Development"],
  },
  {
    name: "PR & Sponsorship Team",
    teamId: "pr-spons-team",
    description:
      "The PR and Sponsorship Team builds bridges with organizations and the community. From partnerships to collaborations, they manage our reputation and bring valuable sponsorships to power our initiatives.",
    imageUrl: "/images/pr-spons-team.jpg",
    icon: "🤝",
    gradient: "from-emerald-500 to-teal-600",
    skills: [
      "Partnership Building",
      "Community Relations",
      "Sponsorship Management",
    ],
  },
  {
    name: "Event Management Team",
    teamId: "event-team",
    description:
      "The Event Management Team orchestrates our flagship programs and workshops. From planning logistics to executing flawless events, they make sure every detail is taken care of for a memorable experience.",
    imageUrl: "/images/event-team.jpg",
    icon: "🎉",
    gradient: "from-orange-500 to-red-500",
    skills: ["Event Planning", "Logistics Coordination", "Workshop Management"],
  },
  {
    name: "Design Team",
    teamId: "design-team",
    description:
      "The Design Team shapes our identity through stunning visuals, intuitive user experiences, and creative branding. They are the storytellers who translate ideas into compelling visuals.",
    imageUrl: "/images/design-team.jpg",
    icon: "🎨",
    gradient: "from-violet-500 to-purple-600",
    skills: ["Visual Design", "UX/UI", "Brand Identity"],
  },
  {
    name: "Videography Team",
    teamId: "video-team",
    description:
      "The Videography Team captures stories in motion, producing impactful videos that highlight our events, initiatives, and journeys. They are the visual storytellers of our club.",
    imageUrl: "/images/videography-team.jpg",
    icon: "🎥",
    gradient: "from-cyan-500 to-blue-600",
    skills: ["Video Production", "Story Telling", "Content Creation"],
  },
  {
    name: "Content & Creation Team",
    teamId: "content-team",
    description:
      "The Content and Creation Team brings ideas to life through words, blogs, and storytelling. From writing engaging content to producing creative campaigns, they fuel the voice of our community.",
    imageUrl: "/images/content-team.jpg",
    icon: "✍️",
    gradient: "from-indigo-500 to-purple-600",
    skills: ["Content Writing", "Creative Campaigns", "Storytelling"],
  },
];

export default function LearnMorePage() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    setIsVisible(true);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>Learn More About Our Teams | Innovation Hub</title>
        <meta
          name="description"
          content="Discover the diverse teams driving innovation and excellence in our organization."
        />
      </Head>

      <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-800 overflow-hidden">
        {/* --- Hero Section --- */}
        <section className="relative min-h-screen flex items-center justify-center">
          {/* Navbar overlay */}
          <div className="absolute top-0 left-0 right-0 z-50">
            <Navbar textColor="#8082E9" />
          </div>
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/Images/bg.jpg"
              alt="Innovation backdrop"
              fill
              priority
              className="object-cover scale-110 transition-transform duration-1000"
              // style={{ transform: `translateY(${scrollY * 0.5}px)` }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-transparent" />

            {/* Floating Elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          {/* Hero Content */}
          <div
            className={`relative z-10 max-w-6xl mx-auto px-6 text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="mb-8">
              <span className="inline-block px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium tracking-wider uppercase">
                Meet Our Teams
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none mb-8">
              <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                Innovation
              </span>
              <br />
              <span className="text-white/90">is Teamwork</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light">
              Where diverse talents unite to create extraordinary solutions and
              drive meaningful change
            </p>

            {/* CTA Button */}
            <div className="mt-12">
              <button
                onClick={() =>
                  document.getElementById("teams")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/25 hover:scale-105"
              >
                <span className="relative z-10">Explore Teams</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </section>

        {/* --- Teams Section --- */}
        <section id="teams" className="relative py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6">
            {/* Section Header */}
            <div className="text-center mb-20">
              <h2
                className={`${bigShouldersDisplay.className} text-4xl md:text-5xl font-bold text-slate-900 mb-6 uppercase tracking-wide`}
              >
                Your{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Dream Teams
                </span>
              </h2>
              <p
                className={`${helveticaCompressed.className} text-xl text-slate-600 max-w-3xl mx-auto tracking-wide`}
              >
                Each team brings unique expertise and passion to create
                something extraordinary together
              </p>
            </div>

            {/* Teams Grid */}
            <div className="space-y-32">
              {teamsData.map((team, index) => (
                <div
                  key={team.name}
                  className={`group flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${
                    index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image Container */}
                  <div className="w-full lg:w-1/2 relative">
                    <div className="relative overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                      <Image
                        src={team.imageUrl}
                        alt={`${team.name} workspace`}
                        width={600}
                        height={400}
                        className="object-cover w-full h-[400px] group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* Gradient Overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${team.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                      />

                      {/* Icon Badge */}
                      <div className="absolute top-6 left-6 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                        {team.icon}
                      </div>
                    </div>

                    {/* Floating Card */}
                    <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-2xl border border-slate-100 max-w-xs">
                      <h4 className="font-semibold text-slate-900 mb-2">
                        Key Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {team.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className={`px-3 py-1 bg-gradient-to-r ${team.gradient} text-white rounded-full text-xs font-medium`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="w-full lg:w-1/2 space-y-8">
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${team.gradient} rounded-xl flex items-center justify-center text-white text-xl shadow-lg`}
                        >
                          {team.icon}
                        </div>
                        <h3
                          className={`${bigShouldersDisplay.className} text-3xl md:text-4xl font-bold text-slate-900 uppercase tracking-wide`}
                        >
                          {team.name}
                        </h3>
                      </div>

                      {/* Animated Line */}
                      <div
                        className={`h-1 bg-gradient-to-r ${team.gradient} rounded-full w-24 group-hover:w-32 transition-all duration-500`}
                      />
                    </div>

                    <p
                      className={`${helveticaCompressed.className} text-lg md:text-xl text-slate-600 leading-relaxed tracking-wide`}
                    >
                      {team.description}
                    </p>

                    {/* Action Button */}
                    <div>
                      <Link
                        href={`/recruitment/form?view=teams&teams=${team.teamId}`}
                        className={`${bigShouldersDisplay.className} group/btn inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r ${team.gradient} text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 uppercase tracking-wide`}
                      >
                        Join This Team
                        <svg
                          className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA Section --- */}
        <section className="relative py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 overflow-hidden">
          {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width={60} height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="7" cy="7" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" /> */}

          <div className="relative max-w-4xl mx-auto text-center px-6">
            <h2
              className={`${bigShouldersDisplay.className} text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-wide`}
            >
              Ready to Make an Impact?
            </h2>
            <p
              className={`${helveticaCompressed.className} text-xl text-blue-100 mb-12 max-w-2xl mx-auto tracking-wide`}
            >
              Join a team that values innovation, collaboration, and the drive
              to create meaningful change
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/recruitment/form"
                className={`${bigShouldersDisplay.className} px-8 py-4 bg-white text-slate-900 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl inline-flex items-center justify-center uppercase tracking-wide`}
              >
                Apply Now
              </Link>
              <Link
                href="/about"
                className={`${bigShouldersDisplay.className} px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-slate-900 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center uppercase tracking-wide`}
              >
                About Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
