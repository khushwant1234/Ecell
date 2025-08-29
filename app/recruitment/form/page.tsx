'use client';

import React, { useState, FormEvent, ChangeEvent } from 'react';
// Corrected: Importing Supabase client from a CDN to resolve the module error.
import { createClient } from '@supabase/supabase-js';


const NEXT_PUBLIC_SUPABASE_URL = process.env.YOUR_SUPABASE_URL
const NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.YOUR_SUPABASE_ANON_KEY
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Note: It's safe to use the anon key in client-side code.
// Row Level Security (RLS) in your database will protect your data.
const supabase = createClient(supabaseUrl, supabaseAnonKey);


// --- Helper Components for Icons ---
const TechIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const MarketingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5">
    <path d="M3 3v18h18"></path>
    <path d="M7 12v5h12V8l-5 5-4-4-3 3z"></path>
  </svg>
);

const DesignIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5">
    <path d="M12 15l-3 3-3-3"></path>
    <path d="M12 15l3 3 3-3"></path>
    <path d="M12 3v12"></path>
    <path d="M21 15c0-4.97-4.03-9-9-9s-9 4.03-9 9"></path>
  </svg>
);

// --- Type Definitions ---
type View = 'splash' | 'teams' | 'form' | 'success';
type SubmissionStatus = 'idle' | 'submitting' | 'error';

interface FormData {
    name: string;
    email: string;
    github: string;
    linkedin: string;
    portfolio: string;
}

// --- Main Page Component ---
export default function App() {
  const [view, setView] = useState<View>('splash');
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', github: '', linkedin: '', portfolio: '' });
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  // --- Handlers ---
  const handleSelectTeamAndContinue = () => setView('teams');

  const handleTeamSelection = (team: string) => {
    setSelectedTeam(team);
    setView('form');
  };

  const handleGoBack = () => {
    setView('teams');
    setSelectedTeam(null);
    setFormData({ name: '', email: '', github: '', linkedin: '', portfolio: '' }); // Reset form
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmissionStatus('submitting');
    setErrorMessage('');

    const submissionData = {
      full_name: formData.name,
      email: formData.email,
      team: selectedTeam,
      github_username: selectedTeam === 'Tech' ? formData.github : null,
      linkedin_profile: selectedTeam === 'Marketing' ? formData.linkedin : null,
      portfolio_url: selectedTeam === 'Design' ? formData.portfolio : null,
    };

    const { error } = await supabase.from('team_members').insert(submissionData);

    if (error) {
      console.error('Supabase error:', error.message);
      setErrorMessage(`Submission failed: ${error.message}`);
      setSubmissionStatus('error');
    } else {
      setSubmissionStatus('idle');
      setView('success');
    }
  };

  const handleStartOver = () => {
      setFormData({ name: '', email: '', github: '', linkedin: '', portfolio: '' });
      setSelectedTeam(null);
      setView('splash');
  }

  // --- Render Functions ---
  const renderSplashScreen = () => (
    <div className="text-center">
      <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">Welcome to Our Platform</h1>
      <p className="text-lg md:text-xl text-gray-300 mb-8">Join a team to get started.</p>
      <button onClick={handleSelectTeamAndContinue} className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-200 transition-transform transform hover:scale-105 duration-300 ease-in-out">
        Select Team and Continue
      </button>
    </div>
  );

  const renderTeamSelection = () => (
    <div className="text-center w-full max-w-2xl">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Choose Your Team</h2>
      <p className="text-md text-gray-300 mb-8">Select the department you belong to.</p>
      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        <button onClick={() => handleTeamSelection('Tech')} className="flex items-center justify-center w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:-translate-y-1 duration-300"><TechIcon />Tech</button>
        <button onClick={() => handleTeamSelection('Marketing')} className="flex items-center justify-center w-full md:w-auto bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:-translate-y-1 duration-300"><MarketingIcon />Marketing</button>
        <button onClick={() => handleTeamSelection('Design')} className="flex items-center justify-center w-full md:w-auto bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-transform transform hover:-translate-y-1 duration-300"><DesignIcon />Design</button>
      </div>
    </div>
  );

  const renderForm = () => (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 relative">
      <button onClick={handleGoBack} className="absolute top-4 left-4 text-gray-500 hover:text-gray-800 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg></button>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">{selectedTeam} Team</h2>
      <p className="text-center text-gray-500 mb-6">Please fill out the form below.</p>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="John Doe" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="you@example.com" />
        </div>
        {selectedTeam === 'Tech' && (<div><label htmlFor="github" className="block text-sm font-medium text-gray-700">GitHub Username</label><input type="text" id="github" name="github" value={formData.github} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="johndoe" /></div>)}
        {selectedTeam === 'Marketing' && (<div><label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">LinkedIn Profile</label><input type="text" id="linkedin" name="linkedin" value={formData.linkedin} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="linkedin.com/in/johndoe" /></div>)}
        {selectedTeam === 'Design' && (<div><label htmlFor="portfolio" className="block text-sm font-medium text-gray-700">Portfolio URL</label><input type="text" id="portfolio" name="portfolio" value={formData.portfolio} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="yourportfolio.com" /></div>)}
        {submissionStatus === 'error' && <p className="text-sm text-red-600">{errorMessage}</p>}
        <button type="submit" disabled={submissionStatus === 'submitting'} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed">
          {submissionStatus === 'submitting' ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
  
  const renderSuccessMessage = () => (
      <div className="text-center bg-white p-10 rounded-2xl shadow-2xl">
         <svg className="mx-auto h-12 w-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
         <h2 className="mt-4 text-2xl font-bold text-gray-800">Submission Received!</h2>
         <p className="mt-2 text-gray-600">Thank you for joining the {selectedTeam} team.</p>
         <button onClick={handleStartOver} className="mt-6 bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300">
             Submit Another
         </button>
      </div>
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-800 via-slate-900 to-black relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      <div className="relative z-10 flex items-center justify-center w-full min-h-[300px]">
         {view === 'splash' && renderSplashScreen()}
         {view === 'teams' && renderTeamSelection()}
         {view === 'form' && renderForm()}
         {view === 'success' && renderSuccessMessage()}
      </div>
    </main>
  );
}

