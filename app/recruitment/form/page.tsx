'use client';

import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// --- Supabase Client Setup ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- Helper Components for Icons ---
const TechIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg> );
const MarketingIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5"><path d="M3 3v18h18"></path><path d="M7 12v5h12V8l-5 5-4-4-3 3z"></path></svg> );
const DesignIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5"><path d="M12 15l-3 3-3-3"></path><path d="M12 15l3 3 3-3"></path><path d="M12 3v12"></path><path d="M21 15c0-4.97-4.03-9-9-9s-9 4.03-9 9"></path></svg> );
const ArrowRightIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg> );

// --- Type Definitions ---
type View = 'splash' | 'teams' | 'general' | 'domain-specific' | 'success';
type SubmissionStatus = 'idle' | 'submitting' | 'error';

interface Question {
  id: string;
  label: string;
  type: 'text' | 'email' | 'long-text' | 'number' | 'link' | 'radio' | 'checkbox';
  validation?: {
    required?: string;
  };
  options?: { value: string; label: string; }[];
  enhanceable?: boolean;
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

// --- General Questions (shown first) ---
const generalQuestions: Question[] = [
  {
    id: "name",
    label: "What's your full name?",
    type: "text",
    placeholder: "John Doe",
    validation: { required: "Name is required" }
  },
  {
    id: "email",
    label: "What's your email address?",
    type: "email",
    placeholder: "you@example.com",
    validation: { required: "Email is required" }
  },
  {
    id: "phone",
    label: "What's your phone number?",
    type: "text",
    placeholder: "+91 98765 43210",
    validation: { required: "Phone number is required" }
  },
  {
    id: "motivation",
    label: "Why do you want to join our organization?",
    type: "long-text",
    enhanceable: true,
    validation: { required: "Please tell us your motivation" }
  }
];

// --- Team-Specific Questions ---
const teamConfigs: TeamConfig[] = [
  {
    id: "tech-team",
    title: "Technology Team",
    questions: [
      {
        id: "githubLink",
        label: "GitHub Profile URL",
        type: "link",
        validation: { required: "A GitHub link is required" }
      },
      {
        id: "experienceYears",
        label: "Years of Programming Experience",
        type: "number",
        validation: { required: "Please enter your years of experience" }
      },
      {
        id: "preferredStack",
        label: "What is your preferred tech stack?",
        type: "radio",
        options: [
          { value: "react", label: "React (Next.js)" },
          { value: "vue", label: "Vue (Nuxt.js)" },
          { value: "svelte", label: "Svelte (SvelteKit)" },
          { value: "other", label: "Other" }
        ],
        validation: { required: "Please select a tech stack" }
      },
      {
        id: "projectDescription",
        label: "Describe a challenging project you've worked on.",
        type: "long-text",
        enhanceable: true,
        validation: { required: "Please describe a project" }
      },
      {
        id: "codingChallenge",
        label: "How do you approach debugging complex issues?",
        type: "long-text",
        enhanceable: true,
        validation: { required: "Please describe your debugging approach" }
      }
    ]
  },
  {
    id: "marketing-team",
    title: "Marketing Team",
    questions: [
      {
        id: "linkedinProfile",
        label: "LinkedIn Profile URL",
        type: "link",
        validation: { required: "LinkedIn profile is required" }
      },
      {
        id: "marketingExperience",
        label: "Years of Marketing Experience",
        type: "number",
        validation: { required: "Please enter your marketing experience" }
      },
      {
        id: "marketingChannel",
        label: "Which marketing channel do you prefer?",
        type: "radio",
        options: [
          { value: "digital", label: "Digital Marketing" },
          { value: "content", label: "Content Marketing" },
          { value: "social", label: "Social Media Marketing" },
          { value: "email", label: "Email Marketing" }
        ],
        validation: { required: "Please select a marketing channel" }
      },
      {
        id: "campaignDescription",
        label: "Describe a successful marketing campaign you've run.",
        type: "long-text",
        enhanceable: true,
        validation: { required: "Please describe a campaign" }
      },
      {
        id: "targetAudience",
        label: "How do you identify and understand your target audience?",
        type: "long-text",
        enhanceable: true,
        validation: { required: "Please describe your approach" }
      }
    ]
  },
  {
    id: "design-team",
    title: "Design Team",
    questions: [
      {
        id: "portfolioLink",
        label: "Portfolio URL",
        type: "link",
        validation: { required: "Portfolio link is required" }
      },
      {
        id: "designExperience",
        label: "Years of Design Experience",
        type: "number",
        validation: { required: "Please enter your design experience" }
      },
      {
        id: "designTool",
        label: "What's your primary design tool?",
        type: "radio",
        options: [
          { value: "figma", label: "Figma" },
          { value: "sketch", label: "Sketch" },
          { value: "adobe", label: "Adobe Creative Suite" },
          { value: "other", label: "Other" }
        ],
        validation: { required: "Please select a design tool" }
      },
      {
        id: "designPhilosophy",
        label: "What is your design philosophy?",
        type: "long-text",
        enhanceable: true,
        validation: { required: "Please describe your design philosophy" }
      },
      {
        id: "userExperience",
        label: "How do you approach user experience research?",
        type: "long-text",
        enhanceable: true,
        validation: { required: "Please describe your UX approach" }
      }
    ]
  }
];

// --- Main Page Component ---
export default function App() {
  const [view, setView] = useState<View>('splash');
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(-1); // -1 for general questions
  const [formResponses, setFormResponses] = useState<FormResponses>({});
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState<string | null>(null);

  // Get current questions based on the current phase
  const getCurrentQuestions = () => {
    if (currentTeamIndex === -1) {
      return generalQuestions; // General questions first
    } else {
      const teamId = selectedTeams[currentTeamIndex];
      const teamConfig = teamConfigs.find(t => t.id === teamId);
      return teamConfig?.questions || [];
    }
  };

  const currentQuestions = getCurrentQuestions();
  const currentQuestion = currentQuestions[currentQuestionIndex];

  // Get current section title
  const getCurrentSectionTitle = () => {
    if (currentTeamIndex === -1) {
      return "General Information";
    } else {
      const teamId = selectedTeams[currentTeamIndex];
      const teamConfig = teamConfigs.find(t => t.id === teamId);
      return teamConfig?.title || "Team Application";
    }
  };

  // --- Enhancement Function ---
  const handleEnhance = async (questionId: string) => {
    const currentValue = formResponses[questionId];
    if (!currentValue || typeof currentValue !== 'string') return;

    setIsEnhancing(questionId);
    try {
      const response = await fetch('/api/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: currentValue }),
      });

      if (response.ok) {
        const { enhancedText } = await response.json();
        setFormResponses(prev => ({
          ...prev,
          [questionId]: enhancedText
        }));
      }
    } catch (error) {
      console.error('Enhancement failed:', error);
    } finally {
      setIsEnhancing(null);
    }
  };

  // --- Handlers ---
  const handleSelectTeamAndContinue = () => setView('teams');

  const handleTeamSelection = (teamName: string) => {
    const teamId = teamName.toLowerCase() + '-team';
    setSelectedTeams(prev => 
      prev.includes(teamId) 
        ? prev.filter(t => t !== teamId) 
        : [...prev, teamId]
    );
  };

  const handleProceedToForms = () => {
    if (selectedTeams.length > 0) {
      setView('general');
      setCurrentTeamIndex(-1); // Start with general questions
      setCurrentQuestionIndex(0);
    }
  };

  const handleGoBack = () => {
    if (view === 'general') {
      setView('teams');
    } else if (view === 'domain-specific') {
      if (currentTeamIndex === 0) {
        setView('general');
        setCurrentTeamIndex(-1);
      } else {
        setCurrentTeamIndex(prev => prev - 1);
      }
      setCurrentQuestionIndex(0);
    } else {
      setView('teams');
      setSelectedTeams([]);
      setCurrentTeamIndex(-1);
      setCurrentQuestionIndex(0);
      setFormResponses({});
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const finalValue = currentQuestion?.type === 'number' ? Number(value) : value;
    setFormResponses(prev => ({
      ...prev,
      [name]: finalValue
    }));
  };

  const handleRadioChange = (questionId: string, value: string) => {
    setFormResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNextQuestion = React.useCallback(() => {
    const currentQ = currentQuestions[currentQuestionIndex];
    if (currentQ?.validation?.required && !formResponses[currentQ.id]) {
      return;
    }

    setIsFading(true);
    setTimeout(() => {
      if (currentQuestionIndex < currentQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // Move to next section
        if (currentTeamIndex === -1) {
          // Moving from general to first team
          setView('domain-specific');
          setCurrentTeamIndex(0);
          setCurrentQuestionIndex(0);
        } else if (currentTeamIndex < selectedTeams.length - 1) {
          // Moving to next team
          setCurrentTeamIndex(prev => prev + 1);
          setCurrentQuestionIndex(0);
        }
        // If it's the last team, handleFormSubmit will be called instead
      }
      setIsFading(false);
    }, 300);
  }, [currentQuestions, currentQuestionIndex, formResponses, currentTeamIndex, selectedTeams]);

  // --- Progress Saving Function ---
  const handleRemindMe = async () => {
    const email = formResponses.email;
    if (!email) {
      alert("Please fill in your email address to save progress.");
      return;
    }

    try {
      const progressData = {
        selectedTeams,
        currentTeamIndex,
        currentQuestionIndex,
        formResponses,
        view,
        timestamp: new Date().toISOString()
      };

      const { error } = await supabase
        .from('progress')
        .upsert({
          email,
          form_data: progressData
        });

      if (error) {
        console.error('Progress save error:', error);
        alert("Could not save your progress. Please try again.");
      } else {
        alert(`Progress saved for ${email}. We'll remind you to complete it!`);
      }
    } catch (error) {
      console.error("Failed to save progress", error);
      alert("Could not save your progress. Please try again.");
    }
  };

  // --- Form Submission ---
  const handleFormSubmit = React.useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (submissionStatus === 'submitting') return;

      // Validate current question
      const currentQ = currentQuestions[currentQuestionIndex];
      if (currentQ?.validation?.required && !formResponses[currentQ.id]) {
        return;
      }

      setSubmissionStatus('submitting');
      setErrorMessage('');

      try {
        // Get team names for display
        const teamNames = selectedTeams.map(teamId => {
          const teamConfig = teamConfigs.find(t => t.id === teamId);
          return teamConfig?.title || teamId;
        });

        const submissionData = {
          name: formResponses.name,
          email: formResponses.email,
          teams: teamNames, // Array of team names
          form_data: formResponses, // All responses as JSON
          submitted_at: new Date().toISOString()
        };

        const { error } = await supabase
          .from('applications')
          .insert(submissionData);

        if (error) {
          setErrorMessage(`Submission failed: ${error.message}`);
          setSubmissionStatus('error');
        } else {
          setView('success');
        }
      } catch (error) {
        setErrorMessage('An unexpected error occurred during submission.');
        setSubmissionStatus('error');
      }
    },
    [submissionStatus, formResponses, selectedTeams, currentQuestions, currentQuestionIndex]
  );

  const handleStartOver = () => {
    setFormResponses({});
    setSelectedTeams([]);
    setCurrentTeamIndex(-1);
    setCurrentQuestionIndex(0);
    setView('splash');
    setSubmissionStatus('idle');
    setErrorMessage('');
  };

  // --- Keyboard Navigation ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && (view === 'general' || view === 'domain-specific')) {
        e.preventDefault();
        const isLastQuestionInSection = currentQuestionIndex === currentQuestions.length - 1;
        const isLastSection = currentTeamIndex === selectedTeams.length - 1;
        
        if (isLastQuestionInSection && isLastSection && view === 'domain-specific') {
          handleFormSubmit(e as unknown as FormEvent<HTMLFormElement>);
        } else {
          handleNextQuestion();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestionIndex, view, currentQuestions, formResponses, handleFormSubmit, handleNextQuestion, currentTeamIndex, selectedTeams]);

  // --- Question Rendering ---
  const renderQuestion = (question: Question) => {
    const currentValue = formResponses[question.id] || '';

    if (question.type === 'radio' && question.options) {
      return (
        <div className="space-y-3">
          {question.options.map((option) => (
            <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name={question.id}
                value={option.value}
                checked={currentValue === option.value}
                onChange={() => handleRadioChange(question.id, option.value)}
                className="w-5 h-5 text-blue-600"
              />
              <span className="text-lg">{option.label}</span>
            </label>
          ))}
        </div>
      );
    }

    if (question.type === 'long-text') {
      return (
        <div className="space-y-4">
          <textarea
            id={question.id}
            name={question.id}
            value={currentValue as string}
            onChange={handleInputChange}
            placeholder={question.placeholder}
            required={!!question.validation?.required}
            rows={4}
            className="text-xl w-full max-w-2xl mx-auto bg-transparent border-2 border-gray-300 focus:border-gray-800 outline-none p-4 rounded-lg transition-colors duration-300 resize-none"
            autoFocus
          />
          {question.enhanceable && (
            <button
              type="button"
              onClick={() => handleEnhance(question.id)}
              disabled={!currentValue || isEnhancing === question.id}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
            >
              {isEnhancing === question.id ? 'Enhancing...' : '✨ Enhance with AI'}
            </button>
          )}
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
        required={!!question.validation?.required}
        className="text-xl md:text-2xl w-full max-w-lg mx-auto bg-transparent border-b-2 border-gray-300 focus:border-gray-800 outline-none text-center p-2 transition-colors duration-300"
        autoFocus
      />
    );
  };

  // --- Render Functions ---
  const renderTeamSelection = () => (
    <div className="text-center w-full max-w-2xl flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Choose Your Team(s)</h2>
      <p className="text-md text-gray-300 mb-8">Select all departments you&apos;d like to apply for.</p>
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
        <button
          onClick={() => handleTeamSelection('Tech')}
          className={`flex items-center justify-center w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 ${
            selectedTeams.includes('tech-team') ? 'ring-2 ring-offset-2 ring-offset-slate-900 ring-white' : ''
          }`}
        >
          <TechIcon />Tech
        </button>
        <button
          onClick={() => handleTeamSelection('Marketing')}
          className={`flex items-center justify-center w-full md:w-auto bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 ${
            selectedTeams.includes('marketing-team') ? 'ring-2 ring-offset-2 ring-offset-slate-900 ring-white' : ''
          }`}
        >
          <MarketingIcon />Marketing
        </button>
        <button
          onClick={() => handleTeamSelection('Design')}
          className={`flex items-center justify-center w-full md:w-auto bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 ${
            selectedTeams.includes('design-team') ? 'ring-2 ring-offset-2 ring-offset-slate-900 ring-white' : ''
          }`}
        >
          <DesignIcon />Design
        </button>
      </div>
      {selectedTeams.length > 0 && (
        <button
          onClick={handleProceedToForms}
          className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-200 transition-transform transform hover:scale-105 duration-300 ease-in-out"
        >
          Start Application ({selectedTeams.length} team{selectedTeams.length > 1 ? 's' : ''} selected)
        </button>
      )}
    </div>
  );

  const renderFormPage = () => {
    if (!currentQuestion) return null;

    // Calculate overall progress
    const totalQuestions = generalQuestions.length + selectedTeams.reduce((acc, teamId) => {
      const teamConfig = teamConfigs.find(t => t.id === teamId);
      return acc + (teamConfig?.questions.length || 0);
    }, 0);

    const answeredQuestions = generalQuestions.length + selectedTeams.slice(0, Math.max(0, currentTeamIndex)).reduce((acc, teamId) => {
      const teamConfig = teamConfigs.find(t => t.id === teamId);
      return acc + (teamConfig?.questions.length || 0);
    }, 0) + currentQuestionIndex;

    const progress = (answeredQuestions / totalQuestions) * 100;

    // Determine if this is the last question
    const isLastQuestionInSection = currentQuestionIndex === currentQuestions.length - 1;
    const isLastSection = currentTeamIndex === selectedTeams.length - 1;
    const isLastQuestion = isLastQuestionInSection && isLastSection && view === 'domain-specific';

    return (
      <div className="w-full h-screen flex flex-col">
        <header className={`w-full p-6 bg-gradient-to-r transition-colors duration-500 ${
          currentTeamIndex === -1 ? 'from-indigo-600 to-purple-800' :
          selectedTeams[currentTeamIndex] === 'tech-team' ? 'from-blue-600 to-blue-800' :
          selectedTeams[currentTeamIndex] === 'marketing-team' ? 'from-green-500 to-green-700' :
          'from-purple-600 to-purple-800'
        }`}>
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">{getCurrentSectionTitle()}</h2>
              <p className="text-white/80 text-sm">
                {currentTeamIndex === -1 ? 'Step 1: General Information' : 
                `Step ${currentTeamIndex + 2}: ${teamConfigs.find(t => t.id === selectedTeams[currentTeamIndex])?.title}`}
              </p>
            </div>
            <button onClick={handleGoBack} className="text-white/80 hover:text-white transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
              </svg>
            </button>
          </div>
          <div className="w-full bg-white/20 rounded-full h-1.5 mt-4 max-w-4xl mx-auto">
            <div className="bg-white h-1.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}></div>
          </div>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center p-4 text-center">
          <div className={`transition-all duration-300 ease-in-out w-full max-w-2xl ${isFading ? 'opacity-0 transform -translate-y-4' : 'opacity-100'}`}>
            {currentQuestion && (
              <div key={currentQuestion.id}>
                <label htmlFor={currentQuestion.id} className="block text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
                  {currentQuestion.label}
                </label>
                {renderQuestion(currentQuestion)}
              </div>
            )}
          </div>
        </main>

        <footer className="w-full p-6 flex flex-col items-center justify-center">
          {submissionStatus === 'error' && (
            <p className="text-sm text-red-600 mb-4">{errorMessage}</p>
          )}
          
          <div className="flex gap-4 items-center">
            {/* Remind Me Button - only show if email is filled */}
            {formResponses.email && (
              <button
                type="button"
                onClick={handleRemindMe}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-300"
              >
                💾 Save Progress
                 </button>
            )}

            {/* Navigation Button */}
            {isLastQuestion ? (
              <button
                onClick={handleFormSubmit}
                className="bg-green-600 text-white font-bold py-3 px-8 rounded-full hover:bg-green-700 transition-transform transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={submissionStatus === 'submitting' || (currentQuestion.validation?.required && !formResponses[currentQuestion.id])}
              >
                {submissionStatus === 'submitting' ? 'Submitting...' : 'Complete Application'}
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="bg-gray-800 text-white rounded-lg p-3 hover:bg-gray-900 transition-transform transform hover:scale-105 shadow-lg disabled:opacity-50"
                disabled={currentQuestion.validation?.required && !formResponses[currentQuestion.id]}
              >
                <ArrowRightIcon />
              </button>
            )}
          </div>
        </footer>
      </div>
    );
  };

  const renderSuccessMessage = () => {
    const teamNames = selectedTeams.map(teamId => {
      const teamConfig = teamConfigs.find(t => t.id === teamId);
      return teamConfig?.title.replace(' Application', '') || teamId;
    }).join(', ');

    return (
      <div className="w-full flex flex-col items-center">
        <div className="w-full max-w-2xl bg-white p-8 sm:p-12 rounded-2xl shadow-xl text-center">
          <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Application Submitted!</h2>
          <p className="mt-4 text-lg text-gray-600">
            Thank you for your interest. We&apos;ve received your application for the <strong>{teamNames}</strong> team(s) and will be in touch shortly.
          </p>
          <button
            onClick={handleStartOver}
            className="mt-8 bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-indigo-700 transition-all transform hover:scale-105 duration-300"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`transition-colors duration-500 ${
      (view === 'general' || view === 'domain-specific' || view === 'success') ? 'bg-gray-100' : 'bg-gradient-to-br from-gray-800 via-slate-900 to-black'
    }`}>
      {(view === 'general' || view === 'domain-specific') ? renderFormPage() : (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
          {(view === 'splash' || view === 'teams') && (
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          )}
          <div className="relative z-10 flex items-center justify-center w-full">
            {view === 'splash' && (
              <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">Welcome to Our Platform</h1>
                <p className="text-lg md:text-xl text-gray-300 mb-8">Join a team to get started.</p>
                <button
                  onClick={handleSelectTeamAndContinue}
                  className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-200 transition-transform transform hover:scale-105 duration-300 ease-in-out"
                >
                  Select Team and Continue
                </button>
              </div>
            )}
            {view === 'teams' && renderTeamSelection()}
            {view === 'success' && renderSuccessMessage()}
          </div>
        </main>
      )}
    </div>
  );
}
          