"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import Navbar from "@/components/Navbar";
import { createClient } from "@supabase/supabase-js";
import { Camera, CircleDollarSign, PenSquare } from "lucide-react";

// --- Supabase Client Setup ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- Helper Components for Icons ---
const TechIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-2 h-5 w-5"
  >
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);
const MarketingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-2 h-5 w-5"
  >
    <path d="M3 3v18h18"></path>
    <path d="M7 12v5h12V8l-5 5-4-4-3 3z"></path>
  </svg>
);
const DesignIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mr-2 h-5 w-5"
  >
    <path d="M12 15l-3 3-3-3"></path>
    <path d="M12 15l3 3 3-3"></path>
    <path d="M12 3v12"></path>
    <path d="M21 15c0-4.97-4.03-9-9-9s-9 4.03-9 9"></path>
  </svg>
);

// --- Type Definitions ---
type View = "splash" | "teams" | "form" | "success";
type SubmissionStatus = "idle" | "submitting" | "error";

interface Question {
  id: string;
  label: string;
  type: "text" | "email" | "long-text" | "number" | "link" | "radio";
  validation?: { required?: string };
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface TeamConfig {
  id: string;
  title: string;
  questions: Question[];
}
interface FormResponses {
  [questionId: string]: string | number;
}
interface ValidationErrors {
  [questionId: string]: string;
}

// --- Question Configurations ---
const generalQuestions: Question[] = [
  {
    id: "name",
    label: "Full name",
    type: "text",
    placeholder: "John Doe",
    validation: { required: "Name is required" },
  },
  {
    id: "email",
    label: "Email address",
    type: "email",
    placeholder: "you@example.com",
    validation: { required: "Email is required" },
  },
  {
    id: "phone",
    label: "Phone number",
    type: "text",
    placeholder: "+91 98765 43210",
    validation: { required: "Phone number is required" },
  },
  {
    id: "branch",
    label: "Branch",
    type: "text",
    placeholder: "Computer Science",
    validation: { required: "Branch is required" },
  },
  {
    id: "rollNumber",
    label: "Roll Number",
    type: "text",
    placeholder: "2X1011XXXX",
    validation: { required: "Roll Number is required" },
  },
  {
    id: "year",
    label: "Year",
    type: "radio",
    options: [
      { value: "2026", label: "2026" },
      { value: "2027", label: "2027" },
      { value: "2028", label: "2028" },
      { value: "2029", label: "2029" },
    ],
    validation: { required: "Year is required" },
  },
];
const teamConfigs: TeamConfig[] = [
  {
    id: "tech-team",
    title: "Tech Team",
    questions: [
      {
        id: "projectDescription",
        label: "What is your current experience in tech?",
        type: "text",
        validation: { required: "Don't be shy, tell us your tech tales!" },
      },
      {
        id: "techInterest",
        label: "What are you more interested in working with?",
        type: "radio",
        options: [
          { value: "hardware", label: "Hardware" },
          { value: "software", label: "Software" },
        ],
        validation: {
          required: "Pick wisely, the fate of your keyboard depends on it!",
        },
      },
      {
        id: "relevantExperience",
        label:
          "Relevant experience with the same : (From Starting Out to Being Very Proficient)",
        type: "radio",
        options: [
          { value: "1", label: "1" },
          { value: "2", label: "2" },
          { value: "3", label: "3" },
          { value: "4", label: "4" },
          { value: "5", label: "5" },
        ],
        validation: {
          required: "Rate yourself! (No pressure, we all started at 1)",
        },
      },
      {
        id: "favTool",
        label: "Favorite AI tool & why?:",
        type: "text",
        validation: { required: "Share your AI crush! (No judgment)" },
      },
      {
        id: "weirdestBug",
        label:
          "What's the weirdest bug you've ever encountered, and how did you squash it?",
        type: "long-text",
        validation: {
          required:
            "Share your bug-hunting story! (Bonus points for creative solutions)",
        },
      },
      {
        id: "favoriteAI",
        label:
          "What new innovations/changes in the tech world are you excited about?",
        type: "text",
      },
      {
        id: "githubLink",
        label: "GitHub Profile URL",
        type: "link",
        validation: {
          required: "Show us your code magic! (GitHub link please)",
        },
      },
      {
        id: "portfolio",
        label: "Anything that you worked on that you'd like us to see?",
        type: "text",
        validation: {
          required: "Brag a little! Drop your coolest project link.",
        },
      },
    ],
  },
  {
    id: "marketing-team",
    title: "Marketing Team",
    questions: [
      {
        id: "whyMarketing",
        label: "Why do you want to join the Marketing Team?",
        type: "text",
      },
      {
        id: "marketingSkills",
        label:
          "How will you market a flagship E-Cell event (such as the E-Summit) on campus and outside of campus?",
        type: "long-text",
        validation: { required: "Convince us! Pretend we're your audience." },
      },
      {
        id: "experience",
        label: "Any prior experience in marketing? If yes, please elaborate.",
        type: "long-text",
        validation: {
          required: "Spill the beans! Tell us your marketing adventures.",
        },
      },
      {
        id: "superpower",
        label:
          "If you could have any superpower for a day, what would it be and why?",
        type: "long-text",
        validation: {
          required: "Unleash your inner superhero! (No capes required)",
        },
      },
      {
        id: "creativity",
        label: "Do you follow us on insta?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
          {
            value: "I'll just do it - Only Correct Option",
            label: "I'll just do it - Only Correct Option",
          },
        ],
        validation: {
          required: "We know you want to! (Pick one)",
        },
      },
      {
        id: "bonusQuestion",
        label: "BONUS QUESTION - Who let the dogs out ?",
        type: "text",
      },
    ],
  },
  {
    id: "design-team",
    title: "Design Team",
    questions: [
      {
        id: "designMotivation",
        label:
          "Why do you wanna be a part of the E-Cell? And why the Design Team?",
        type: "text",
        validation: { required: "Let your creative juices flow!" },
      },
      {
        id: "designPhilosophy",
        label:
          "What design software(s) are you proficient in and which do you prefer for specific tasks?",
        type: "text",
        validation: { required: "Name drop your favorite design tools!" },
      },
      {
        id: "designProject",
        label:
          "Tell us a bit about a project that you have worked on and if you learned anything from that experience.",
        type: "text",
        validation: { required: "Share your design wisdom!" },
      },
      {
        id: "designReel",
        label:
          "Drop the link to the best reel you can find (it will be taken very seriously)",
        type: "link",
      },
      {
        id: "designPortfolio",
        label:
          "Please attach a link to your design portfolio (make sure we can access the files).",
        type: "text",
        validation: {
          required: "Show off your masterpieces! Portfolio link please.",
        },
      },
    ],
  },
  {
    id: "content-team",
    title: "Content & Creation Team",
    questions: [
      {
        id: "contentMotivation",
        label:
          "Why do you wanna be a part of E-Cell, and why in the content team?",
        type: "text",
        validation: { required: "Drop a link and tell us why you're awesome!" },
      },
      {
        id: "initiative",
        label:
          "If there was something that you wanted to start or take initiative on as a member of the team, what would it be?",
        type: "long-text",
        validation: { required: "Pitch your wildest idea!" },
      },
      {
        id: "strengthsWeaknesses",
        label: "What do you see as your biggest strengths and weaknesses?",
        type: "long-text",
        validation: {
          required: "Be honest! (We all have a weakness for pizza)",
        },
      },
      {
        id: "contentCreation",
        label: "Attach some of your previous work : ",
        type: "text",
        validation: {
          required: "Show us your creative side! Attach your best work.",
        },
      },
    ],
  },
  {
    id: "pr-spons-team",
    title: "PR & Sponsorship Team",
    questions: [
      {
        id: "interest",
        label:
          "What interests you about the Entrepreneurship Cell? and Why are you interested in joining the PR team?",
        type: "text",
        validation: { required: "Tell us what makes PR exciting for you!" },
      },
      {
        id: "qualities",
        label:
          "What qualities do you possess that would make you a good PR executive?",
        type: "long-text",
        validation: { required: "Brag a little! We love confidence." },
      },
      {
        id: "entrepreneurshipMotivation",
        label:
          "Tell us something about yourself that pushed you towards entrepreneurship.",
        type: "long-text",
        validation: { required: "Share your entrepreneurial spark!" },
      },
      {
        id: "approachBrand",
        label:
          "If given a task to approach a brand for sponsorship, how would you plan your first step?",
        type: "long-text",
        validation: {
          required: "Walk us through your first move — be bold and practical!",
        },
      },
      {
        id: "handleBudgetHesitancy",
        label:
          "Imagine a sponsor shows interest but is hesitant about the budget. How would you handle the situation?",
        type: "long-text",
        validation: {
          required:
            "Convince us — how would you save the deal (creativity wins bonus points)?",
        },
      },
    ],
  },
  {
    id: "video-team",
    title: "Videography Team",
    questions: [
      {
        id: "videoMotivation",
        label: "Why do you want to be a part of the E-Cell? ",
        type: "text",
        validation: {
          required: "Share your Oscar-worthy motivation! (Link please)",
        },
      },
      {
        id: "videoInterest",
        label: "Why Videography?",
        type: "long-text",
        validation: {
          required: "Lights, camera, action! Tell us why you love videography.",
        },
      },
      {
        id: "videoEditingApproach",
        label: "What is your approach towards editing a video?",
        type: "long-text",
        validation: {
          required:
            "Reveal your editing secrets! (We promise not to steal them)",
        },
      },
      {
        id: "videoReel",
        label:
          "This is our Instagram: E Cell, which reel, according to you is the best & why?",
        type: "link",
        validation: {
          required: "Pick a reel and tell us why it's a blockbuster!",
        },
      },
      {
        id: "videoEditingSoftware",
        label: "What Software do you use for editing?",
        type: "long-text",
        validation: {
          required: "Name your editing weapon of choice!",
        },
      },
      {
        id: "videoEquipment",
        label: "What equipment do you generally use for shooting & why?",
        type: "long-text",
        validation: {
          required: "Tell us about your gear! (Bonus points for cool gadgets)",
        },
      },
      {
        id: "Questions",
        label: "Any Questions for us? ",
        type: "long-text",
      },
      {
        id: "videoWorkSamples",
        label: "Anything that you worked on that you'd like us to see?",
        type: "text",
      },
    ],
  },
  {
    id: "event-team",
    title: "Event Management Team",
    questions: [
      {
        id: "jugaaduSolve",
        label:
          "What’s the most jugaadu (creative hack) thing you’ve ever done to solve a problem?",
        type: "long-text",
        validation: {
          required: "Tell us your most creative hack — we love jugaad!",
        },
      },
      {
        id: "decorBudgetPlan",
        label:
          "You have a budget of ₹700 and need to decorate a hall for 100 people. What’s your plan? (Yes EM mei decor bhi hota hai)",
        type: "long-text",
        validation: { required: "Pitch your budget-friendly decor plan!" },
      },
      {
        id: "em_timeManagement",
        label: "Rate yourself: Time management (1–5)",
        type: "radio",
        options: [
          { value: "1", label: "1" },
          { value: "2", label: "2" },
          { value: "3", label: "3" },
          { value: "4", label: "4" },
          { value: "5", label: "5" },
        ],
        validation: { required: "Rate your time management (1-5)" },
      },
      {
        id: "em_creativity",
        label: "Rate yourself: Creativity (1–5)",
        type: "radio",
        options: [
          { value: "1", label: "1" },
          { value: "2", label: "2" },
          { value: "3", label: "3" },
          { value: "4", label: "4" },
          { value: "5", label: "5" },
        ],
        validation: { required: "Rate your creativity (1-5)" },
      },
      {
        id: "em_handlingPressure",
        label: "Rate yourself: Handling pressure (1–5)",
        type: "radio",
        options: [
          { value: "1", label: "1" },
          { value: "2", label: "2" },
          { value: "3", label: "3" },
          { value: "4", label: "4" },
          { value: "5", label: "5" },
        ],
        validation: { required: "Rate your ability to handle pressure (1-5)" },
      },
      {
        id: "em_teamwork",
        label: "Rate yourself: Teamwork (1–5)",
        type: "radio",
        options: [
          { value: "1", label: "1" },
          { value: "2", label: "2" },
          { value: "3", label: "3" },
          { value: "4", label: "4" },
          { value: "5", label: "5" },
        ],
        validation: { required: "Rate your teamwork (1-5)" },
      },
      {
        id: "em_lastMinute",
        label: "Rate yourself: Being the “last-minute saviour” (1–5)",
        type: "radio",
        options: [
          { value: "1", label: "1" },
          { value: "2", label: "2" },
          { value: "3", label: "3" },
          { value: "4", label: "4" },
          { value: "5", label: "5" },
        ],
        validation: { required: "Rate your last-minute saviour skills (1-5)" },
      },
      {
        id: "em_lateNightComfort",
        label:
          "Our events often mean late nights, heavy lifting, solving problems on the spot and wrapping up the event being the last ones to leave. How comfortable are you with this? (Be honest)",
        type: "radio",
        options: [
          { value: "very", label: "Very comfortable" },
          { value: "somewhat", label: "Somewhat comfortable" },
          { value: "not", label: "Not comfortable" },
        ],
        validation: { required: "Be honest — how comfortable are you?" },
      },
      {
        id: "em_submissionConflict",
        label:
          "You have a major submission the next day, but your team needs you at an event. How would you handle it?",
        type: "long-text",
        validation: {
          required:
            "Describe your plan to balance both responsibilities — practicality scores high!",
        },
      },
      {
        id: "em_outOfComfort",
        label:
          "Give an example of a time you took responsibility for something outside your comfort zone. (previous EM work if any)",
        type: "long-text",
        validation: { required: "Share that brave moment!" },
      },
      {
        id: "em_lightsOut",
        label:
          "The lights go off during the crisis segment of Xcelarate, do you:",
        type: "radio",
        options: [
          { value: "panic", label: "Panic and hide" },
          { value: "backstage", label: "Run to the backstage" },
          { value: "joke", label: "Crack a joke to the audience" },
          { value: "other", label: "Something else (be smart)" },
        ],
        validation: { required: "Pick one — quick thinking counts!" },
      },
    ],
  },
];

// --- Main Page Component ---
export default function App() {
  const [view, setView] = useState<View>("splash");
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(-1);
  const [formResponses, setFormResponses] = useState<FormResponses>({});
  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );

  const currentQuestions =
    currentTeamIndex === -1
      ? generalQuestions
      : teamConfigs.find((t) => t.id === selectedTeams[currentTeamIndex])
          ?.questions || [];
  const currentSectionTitle =
    currentTeamIndex === -1
      ? "General Information"
      : teamConfigs.find((t) => t.id === selectedTeams[currentTeamIndex])
          ?.title || "";

  // --- Handlers ---
  const handleSelectTeamAndContinue = () => setView("teams");
  const handleTeamSelection = (teamName: string) => {
    const teamId = teamName.toLowerCase() + "-team";
    setSelectedTeams((prev) =>
      prev.includes(teamId)
        ? prev.filter((t) => t !== teamId)
        : [...prev, teamId]
    );
  };
  const handleProceedToForms = () => {
    if (selectedTeams.length > 0) {
      setView("form");
      setCurrentTeamIndex(-1);
    }
  };
  const handleExitForm = () => {
    setView("teams");
    setSelectedTeams([]);
    setCurrentTeamIndex(-1);
    setFormResponses({});
    setValidationErrors({});
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const question = currentQuestions.find((q) => q.id === name);
    setFormResponses((prev) => ({
      ...prev,
      [name]: question?.type === "number" ? Number(value) : value,
    }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleRadioChange = (questionId: string, value: string) => {
    setFormResponses((prev) => ({ ...prev, [questionId]: value }));
    if (validationErrors[questionId]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
  };

  const validatePage = (): boolean => {
    const errors: ValidationErrors = {};
    currentQuestions.forEach((q) => {
      if (q.validation?.required && !formResponses[q.id]) {
        errors[q.id] = q.validation.required;
      }
    });
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextPage = () => {
    if (validatePage() && currentTeamIndex < selectedTeams.length - 1) {
      setCurrentTeamIndex((prev) => prev + 1);
    }
  };
  const handlePreviousPage = () => {
    setValidationErrors({});
    if (currentTeamIndex > -1) {
      setCurrentTeamIndex((prev) => prev - 1);
    }
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validatePage() || submissionStatus === "submitting") return;
    setSubmissionStatus("submitting");
    setErrorMessage("");
    try {
      const teamNames = selectedTeams.map(
        (id) => teamConfigs.find((t) => t.id === id)?.title || id
      );
      const submissionData = {
        name: formResponses.name,
        email: formResponses.email,
        teams: teamNames,
        form_data: formResponses,
        submitted_at: new Date().toISOString(),
      };
      const { error } = await supabase
        .from("applications")
        .insert(submissionData);
      if (error) {
        setErrorMessage(`Submission failed: ${error.message}`);
        setSubmissionStatus("error");
      } else {
        setView("success");
      }
    } catch (error) {
      console.error(error); // Log unexpected errors
      setErrorMessage("An unexpected error occurred.");
      setSubmissionStatus("error");
    }
  };

  const handleStartOver = () => {
    setFormResponses({});
    setSelectedTeams([]);
    setCurrentTeamIndex(-1);
    setView("splash");
    setSubmissionStatus("idle");
    setErrorMessage("");
  };

  // --- Question Rendering ---
  const renderQuestionInput = (question: Question) => {
    const currentValue = formResponses[question.id] || "";
    if (question.type === "radio" && question.options) {
      return (
        <div className="space-y-3 pt-2 text-left">
          {question.options.map((o) => (
            <label
              key={o.value}
              className="flex items-center space-x-3 cursor-pointer p-2 rounded-md hover:bg-gray-100"
            >
              <input
                type="radio"
                name={question.id}
                value={o.value}
                checked={currentValue === o.value}
                onChange={() => handleRadioChange(question.id, o.value)}
                className="w-5 h-5 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-lg text-gray-800">{o.label}</span>
            </label>
          ))}
        </div>
      );
    }
    if (question.type === "long-text") {
      return (
        <div className="space-y-4 w-full">
          <textarea
            id={question.id}
            name={question.id}
            value={currentValue as string}
            onChange={handleInputChange}
            placeholder={question.placeholder}
            rows={5}
            className="mt-1 block w-full text-lg bg-white border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      );
    }
    return (
      <input
        id={question.id}
        name={question.id}
        type={question.type}
        value={currentValue}
        onChange={handleInputChange}
        placeholder={question.placeholder}
        className="mt-1 block w-full text-lg bg-white border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    );
  };

  // --- Page Rendering ---
  const renderTeamSelection = () => (
    <div className="text-center w-full max-w-4xl flex flex-col items-center">
      {" "}
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
        Choose Your Team(s)
      </h2>{" "}
      <p className="text-md text-gray-300 mb-8">
        Select all departments you&apos;d like to apply for.
      </p>{" "}
      <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
        {" "}
        <button
          onClick={() => handleTeamSelection("Tech")}
          className={`flex items-center justify-center w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 ${
            selectedTeams.includes("tech-team")
              ? "ring-2 ring-offset-2 ring-offset-slate-900 ring-white"
              : ""
          }`}
        >
          <TechIcon />
          Tech
        </button>{" "}
        <button
          onClick={() => handleTeamSelection("Content")}
          className={`flex items-center justify-center w-full sm:w-auto bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 text-nowrap ${
            selectedTeams.includes("content-team")
              ? "ring-2 ring-offset-2 ring-offset-slate-900 ring-white"
              : ""
          }`}
        >
          <PenSquare className="mr-2 h-5 w-5" />
          Content & Creation
        </button>{" "}
        <button
          onClick={() => handleTeamSelection("PR-Spons")}
          className={`flex items-center justify-center w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 text-nowrap${
            selectedTeams.includes("pr-spons-team")
              ? "ring-2 ring-offset-2 ring-offset-slate-900 ring-white"
              : ""
          }`}
        >
          <CircleDollarSign className="mr-2 h-5 w-5" /> PR & Spons
        </button>{" "}
        <button
          onClick={() => handleTeamSelection("Video")}
          className={`flex items-center justify-center w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 ${
            selectedTeams.includes("video-team")
              ? "ring-2 ring-offset-2 ring-offset-slate-900 ring-white"
              : ""
          }`}
        >
          <Camera className="mr-2 h-5 w-5" /> Videography
        </button>{" "}
        <button
          onClick={() => handleTeamSelection("Marketing")}
          className={`flex items-center justify-center w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 ${
            selectedTeams.includes("marketing-team")
              ? "ring-2 ring-offset-2 ring-offset-slate-900 ring-white"
              : ""
          }`}
        >
          <MarketingIcon />
          Marketing
        </button>{" "}
        <button
          onClick={() => handleTeamSelection("Design")}
          className={`flex items-center justify-center w-full sm:w-auto bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 ${
            selectedTeams.includes("design-team")
              ? "ring-2 ring-offset-2 ring-offset-slate-900 ring-white"
              : ""
          }`}
        >
          <DesignIcon />
          Design
        </button>{" "}
      </div>{" "}
      {selectedTeams.length > 0 && (
        <button
          onClick={handleProceedToForms}
          className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-200 transition-transform transform hover:scale-105 duration-300 ease-in-out"
        >
          {" "}
          Start Application ({selectedTeams.length} team
          {selectedTeams.length > 1 ? "s" : ""} selected){" "}
        </button>
      )}{" "}
    </div>
  );

  const renderFormPage = () => {
    const isLastPage = currentTeamIndex === selectedTeams.length - 1;
    const totalSteps = selectedTeams.length + 1;
    const currentStep = currentTeamIndex + 1;
    return (
      <div className="w-full h-screen flex flex-col bg-gray-50">
        <header className="w-full p-4 sm:p-6 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                {currentSectionTitle}
              </h2>
              <p className="text-gray-500 text-sm">
                Step {currentStep + 1} of {totalSteps}
              </p>
            </div>
            <button
              onClick={handleExitForm}
              className="text-gray-500 hover:text-gray-800 transition"
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>{" "}
            </button>
          </div>
        </header>
        <main className="flex-grow p-4 sm:p-8 overflow-y-auto">
          <div className="max-w-2xl mx-auto space-y-8">
            {" "}
            {currentQuestions.map((question) => (
              <div key={question.id}>
                {" "}
                <label
                  htmlFor={question.id}
                  className="block text-lg font-medium text-gray-700 mb-1"
                >
                  {" "}
                  {question.label}{" "}
                  {question.validation?.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}{" "}
                </label>{" "}
                {renderQuestionInput(question)}{" "}
                {validationErrors[question.id] && (
                  <p className="text-sm text-red-600 mt-1">
                    {validationErrors[question.id]}
                  </p>
                )}{" "}
              </div>
            ))}{" "}
          </div>
        </main>
        <footer className="w-full p-4 bg-white border-t border-gray-200">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <div>
              {" "}
              {currentTeamIndex > -1 && (
                <button
                  onClick={handlePreviousPage}
                  className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Previous
                </button>
              )}{" "}
            </div>
            <div className="flex items-center gap-4">
              {submissionStatus === "error" && (
                <p className="text-sm text-red-600">{errorMessage}</p>
              )}
              {isLastPage ? (
                <button
                  onClick={handleFormSubmit}
                  disabled={submissionStatus === "submitting"}
                  className="py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
                >
                  {" "}
                  {submissionStatus === "submitting"
                    ? "Submitting..."
                    : "Submit Application"}{" "}
                </button>
              ) : (
                <button
                  onClick={handleNextPage}
                  className="py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </footer>
      </div>
    );
  };

  const renderSuccessMessage = () => {
    const teamNames = selectedTeams
      .map((teamId) => {
        const teamConfig = teamConfigs.find((t) => t.id === teamId);
        return teamConfig?.title || teamId;
      })
      .join(", ");
    return (
      <div className="w-full max-w-2xl bg-white p-8 sm:p-12 rounded-2xl shadow-xl text-center">
        <svg
          className="mx-auto h-16 w-16 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 className="mt-6 text-3xl font-bold text-gray-900">
          Application Submitted!
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          {" "}
          Thank you for your interest. We&apos;ve received your application for
          the <strong>{teamNames}</strong> team(s) and will be in touch shortly.{" "}
        </p>
        <button
          onClick={handleStartOver}
          className="mt-8 bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-indigo-700 transition-all transform hover:scale-105 duration-300"
        >
          {" "}
          Submit Another Application{" "}
        </button>
      </div>
    );
  };

  return (
    <div>
      <Navbar textColor="#1f2937" />
      {view === "form" ? (
        renderFormPage()
      ) : (
        <div
          className={`transition-colors duration-500 bg-gradient-to-br from-gray-800 via-slate-900 to-black`}
        >
          <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            <div className="relative z-10 flex items-center justify-center w-full">
              {view === "splash" && (
                <div className="text-center">
                  {" "}
                  <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
                    Welcome to Entrepreneurship Cell
                  </h1>{" "}
                  <p className="text-lg md:text-xl text-gray-300 mb-8">
                    Join a team to get started.
                  </p>{" "}
                  <button
                    onClick={handleSelectTeamAndContinue}
                    className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-200 transition-transform transform hover:scale-105 duration-300 ease-in-out"
                  >
                    {" "}
                    Select Team and Continue{" "}
                  </button>{" "}
                </div>
              )}
              {view === "teams" && renderTeamSelection()}
              {view === "success" && renderSuccessMessage()}
            </div>
          </main>
        </div>
      )}
    </div>
  );
}
