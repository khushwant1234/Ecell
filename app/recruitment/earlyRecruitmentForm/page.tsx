"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";

// --- Type Definitions ---
type View = "splash" | "form" | "success";
type SubmissionStatus = "idle" | "submitting" | "error";

interface FormData {
  name: string;
  email: string;
  phone: string;
  branch: string;
}

interface ValidationErrors {
  [key: string]: string;
}

// --- Branch Options ---
const branchOptions = [
  { value: "computer-science", label: "Computer Science Engineering" },
  { value: "information-technology", label: "Information Technology" },
  { value: "electronics", label: "Electronics & Communication Engineering" },
  { value: "electrical", label: "Electrical Engineering" },
  { value: "mechanical", label: "Mechanical Engineering" },
  { value: "civil", label: "Civil Engineering" },
  { value: "chemical", label: "Chemical Engineering" },
  { value: "biotechnology", label: "Biotechnology" },
  { value: "mba", label: "MBA" },
  { value: "mca", label: "MCA" },
  { value: "other", label: "Other" },
];

// --- Main Component ---
export default function EarlyRecruitmentForm() {
  const [view, setView] = useState<View>("splash");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    branch: "",
  });
  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );

  // --- Handlers ---
  const handleStartApplication = () => setView("form");

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleExitForm = () => {
    setView("splash");
    setFormData({
      name: "",
      email: "",
      phone: "",
      branch: "",
    });
    setValidationErrors({});
    setSubmissionStatus("idle");
    setErrorMessage("");
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    }

    if (!formData.branch) {
      errors.branch = "Branch selection is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm() || submissionStatus === "submitting") return;

    setSubmissionStatus("submitting");
    setErrorMessage("");

    try {
      const submissionData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        branch: formData.branch,
        submitted_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("early_recruitment")
        .insert(submissionData);

      if (error) {
        console.error("Submission error:", error);
        setErrorMessage(`Submission failed: ${error.message}`);
        setSubmissionStatus("error");
      } else {
        setView("success");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
      setSubmissionStatus("error");
    }
  };

  const handleStartOver = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      branch: "",
    });
    setView("splash");
    setSubmissionStatus("idle");
    setErrorMessage("");
    setValidationErrors({});
  };

  // --- Form Page Rendering ---
  const renderFormPage = () => {
    return (
      <div className="w-full h-screen flex flex-col bg-gray-50">
        <header className="w-full p-4 sm:p-6 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Early Recruitment Registration
              </h2>
              <p className="text-gray-500 text-sm">
                Get notified about exciting opportunities first!
              </p>
            </div>
            <button
              onClick={handleExitForm}
              className="text-gray-500 hover:text-gray-800 transition"
            >
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
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </header>

        <main className="flex-grow p-4 sm:p-8 overflow-y-auto">
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-lg font-medium text-gray-700 mb-1"
              >
                Full Name
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="mt-1 block w-full text-lg bg-white border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {validationErrors.name && (
                <p className="text-sm text-red-600 mt-1">
                  {validationErrors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700 mb-1"
              >
                Email Address
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
                className="mt-1 block w-full text-lg bg-white border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {validationErrors.email && (
                <p className="text-sm text-red-600 mt-1">
                  {validationErrors.email}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label
                htmlFor="phone"
                className="block text-lg font-medium text-gray-700 mb-1"
              >
                Phone Number
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+91 98765 43210"
                className="mt-1 block w-full text-lg bg-white border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {validationErrors.phone && (
                <p className="text-sm text-red-600 mt-1">
                  {validationErrors.phone}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-lg font-medium text-gray-700 mb-1"
              >
                Course and Branch
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                id="Branch"
                name="branch"
                type="string"
                value={formData.branch}
                onChange={handleInputChange}
                placeholder="B.Tech CSE"
                className="mt-1 block w-full text-lg bg-white border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              {validationErrors.phone && (
                <p className="text-sm text-red-600 mt-1">
                  {validationErrors.phone}
                </p>
              )}
            </div>

            {/* Branch Field
            <div>
              <label htmlFor="branch" className="block text-lg font-medium text-gray-700 mb-1">
                Branch/Department
                <span className="text-red-500 ml-1">*</span>
              </label>
              <select
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleInputChange}
                className="mt-1 block w-full text-lg bg-white border border-gray-300 rounded-md shadow-sm p-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select your branch</option>
                {branchOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {validationErrors.branch && (
                <p className="text-sm text-red-600 mt-1">{validationErrors.branch}</p>
              )}
            </div>
          </div>
        */}
          </div>
        </main>
        <footer className="w-full p-4 bg-white border-t border-gray-200">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <div></div>
            <div className="flex items-center gap-4">
              {submissionStatus === "error" && (
                <p className="text-sm text-red-600">{errorMessage}</p>
              )}
              <button
                onClick={handleSubmit}
                disabled={submissionStatus === "submitting"}
                className="py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
              >
                {submissionStatus === "submitting"
                  ? "Submitting..."
                  : "Submit Registration"}
              </button>
            </div>
          </div>
        </footer>
      </div>
    );
  };

  // --- Success Message ---
  const renderSuccessMessage = () => {
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
          Registration Successful!
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Thank you for your interest in early recruitment. We&apos;ve received
          your registration and will contact you at{" "}
          <strong>{formData.email}</strong> with updates about exciting
          opportunities before they go public.
        </p>
        <button
          onClick={handleStartOver}
          className="mt-8 bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-indigo-700 transition-all transform hover:scale-105 duration-300"
        >
          Register Another Person
        </button>
      </div>
    );
  };

  return (
    <ProtectedRoute>
      <div>
        <Navbar textColor="#1f2937" />
        {view === "form" ? (
          renderFormPage()
        ) : (
          <div className="transition-colors duration-500 bg-gradient-to-br from-gray-800 via-slate-900 to-black">
            <main className="flex min-h-screen flex-col items-center justify-center p-4">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
              <div className="relative z-10 flex items-center justify-center w-full">
                {view === "splash" && (
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 002 2M8 6v2a2 2 0 01-2 2M8 6V4m0 2H4m0 0v2a2 2 0 002 2h4m4-6V4"
                        />
                      </svg>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
                      Early Recruitment
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mb-8">
                      Get notified about exciting opportunities before they go
                      public!
                    </p>
                    <button
                      onClick={handleStartApplication}
                      className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-200 transition-transform transform hover:scale-105 duration-300 ease-in-out"
                    >
                      Join Early Recruitment
                    </button>
                  </div>
                )}
                {view === "success" && renderSuccessMessage()}
              </div>
            </main>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
