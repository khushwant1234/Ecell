'use client';

import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// --- Supabase Client Setup ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- Helper Components for Icons (Unchanged) ---
const TechIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg> );
const MarketingIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5"><path d="M3 3v18h18"></path><path d="M7 12v5h12V8l-5 5-4-4-3 3z"></path></svg> );
const DesignIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5"><path d="M12 15l-3 3-3-3"></path><path d="M12 15l3 3 3-3"></path><path d="M12 3v12"></path><path d="M21 15c0-4.97-4.03-9-9-9s-9 4.03-9 9"></path></svg> );
const ArrowRightIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg> );

// --- Type Definitions ---
type View = 'splash' | 'teams' | 'form' | 'success';
type SubmissionStatus = 'idle' | 'submitting' | 'error';
interface FormData { name: string; email: string; github: string; linkedin: string; portfolio: string; }
interface Question { key: keyof FormData; label: string; type: string; placeholder: string; required: boolean; team?: string; }

// --- Main Page Component ---
export default function App() {
  const [view, setView] = useState<View>('splash');
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', github: '', linkedin: '', portfolio: '' });
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const currentTeam = selectedTeams[currentTeamIndex];

  // --- Form Questions Definition (Unchanged) ---
  const allQuestions: Question[] = [
    { key: 'name', label: "First off, what's your full name?", type: 'text', placeholder: 'John Doe', required: true },
    { key: 'email', label: 'Great! And your email address?', type: 'email', placeholder: 'you@example.com', required: true },
    { key: 'github', label: 'What is your GitHub username?', type: 'text', placeholder: 'github-username', required: true, team: 'Tech' },
    { key: 'linkedin', label: 'Can you share your LinkedIn profile URL?', type: 'text', placeholder: 'linkedin.com/in/johndoe', required: true, team: 'Marketing' },
    { key: 'portfolio', label: 'Please provide a link to your portfolio.', type: 'text', placeholder: 'your-portfolio.com', required: true, team: 'Design' },
  ];
  
  const questionsForTeam = allQuestions.filter(q => !q.team || q.team === currentTeam);

  // --- Handlers (Most are unchanged) ---
  const handleSelectTeamAndContinue = () => setView('teams');
  const handleTeamSelection = (team: string) => { setSelectedTeams(prev => prev.includes(team) ? prev.filter(t => t !== team) : [...prev, team]); };
  const handleProceedToForms = () => { if (selectedTeams.length > 0) { setView('form'); } };
  const handleGoBack = () => { setView('teams'); setSelectedTeams([]); setCurrentTeamIndex(0); setCurrentQuestionIndex(0); setFormData({ name: '', email: '', github: '', linkedin: '', portfolio: '' }); };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); };
  const handleNextQuestion = React.useCallback(() => { const currentQuestion = questionsForTeam[currentQuestionIndex]; if (currentQuestion.required && !formData[currentQuestion.key]) { return; } setIsFading(true); setTimeout(() => { if (currentQuestionIndex < questionsForTeam.length - 1) { setCurrentQuestionIndex(prev => prev + 1); } setIsFading(false); }, 300); }, [questionsForTeam, currentQuestionIndex, formData]);

  const handleFormSubmit = React.useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (submissionStatus === 'submitting') return;

      setSubmissionStatus('submitting');
      setErrorMessage('');

      const formPayload: { team: string; [key: string]: string } = { team: currentTeam };

      switch (currentTeam) {
        case 'Tech': formPayload.github = formData.github; break;
        case 'Marketing': formPayload.linkedin = formData.linkedin; break;
        case 'Design': formPayload.portfolio = formData.portfolio; break;
      }
      
      const submissionData = {
        name: formData.name,
        email: formData.email,
        // FIX: Changed 'formdata' to 'formData' to match your database column name
        formData: formPayload,
      };

      const { error } = await supabase.from('applications').insert(submissionData);

      if (error) {
        setErrorMessage(`Submission failed for ${currentTeam} team: ${error.message}`);
        setSubmissionStatus('error');
      } else {
        const isLastTeam = currentTeamIndex === selectedTeams.length - 1;
        if (isLastTeam) {
          setView('success');
        } else {
          setCurrentTeamIndex(prev => prev + 1);
          setCurrentQuestionIndex(0);
          setFormData(prev => ({...prev, github: '', linkedin: '', portfolio: ''}));
          setSubmissionStatus('idle');
        }
      }
    },
    [submissionStatus, formData, currentTeam, currentTeamIndex, selectedTeams]
  );
  
  const handleStartOver = () => { setFormData({ name: '', email: '', github: '', linkedin: '', portfolio: '' }); setSelectedTeams([]); setCurrentTeamIndex(0); setCurrentQuestionIndex(0); setView('splash'); };
  useEffect(() => { const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Enter' && view === 'form') { e.preventDefault(); if (currentQuestionIndex === questionsForTeam.length - 1) { handleFormSubmit(e as unknown as FormEvent<HTMLFormElement>); } else { handleNextQuestion(); } } }; window.addEventListener('keydown', handleKeyDown); return () => window.removeEventListener('keydown', handleKeyDown); }, [currentQuestionIndex, view, questionsForTeam, formData, handleFormSubmit, handleNextQuestion]);

  // --- Render Functions (Unchanged) ---
  const renderTeamSelection = () => ( <div className="text-center w-full max-w-2xl flex flex-col items-center"> <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Choose Your Team(s)</h2> <p className="text-md text-gray-300 mb-8">Select all departments you&apos;d like to apply for.</p> <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8"> <button onClick={() => handleTeamSelection('Tech')} className={`flex items-center justify-center w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 ${selectedTeams.includes('Tech') ? 'ring-2 ring-offset-2 ring-offset-slate-900 ring-white' : ''}`}><TechIcon />Tech</button> <button onClick={() => handleTeamSelection('Marketing')} className={`flex items-center justify-center w-full md:w-auto bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 ${selectedTeams.includes('Marketing') ? 'ring-2 ring-offset-2 ring-offset-slate-900 ring-white' : ''}`}><MarketingIcon />Marketing</button> <button onClick={() => handleTeamSelection('Design')} className={`flex items-center justify-center w-full md:w-auto bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 ${selectedTeams.includes('Design') ? 'ring-2 ring-offset-2 ring-offset-slate-900 ring-white' : ''}`}><DesignIcon />Design</button> </div> {selectedTeams.length > 0 && ( <button onClick={handleProceedToForms} className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-200 transition-transform transform hover:scale-105 duration-300 ease-in-out"> Next ({selectedTeams.length} selected) </button> )} </div> );
  const renderForm = () => { if (!currentTeam) return null; const currentQuestion = questionsForTeam[currentQuestionIndex]; const progress = ((currentQuestionIndex + 1) / questionsForTeam.length) * 100; return ( <div className="w-full h-screen flex flex-col"> <header className={`w-full p-6 bg-gradient-to-r transition-colors duration-500 ${ currentTeam === 'Tech' ? 'from-blue-600 to-blue-800' : currentTeam === 'Marketing' ? 'from-green-500 to-green-700' : 'from-purple-600 to-purple-800' }`}> <div className="max-w-4xl mx-auto flex justify-between items-center"> <div> <h2 className="text-2xl font-bold text-white">{currentTeam} Team Application</h2> {selectedTeams.length > 1 && ( <p className="text-white/80 text-sm">Step {currentTeamIndex + 1} of {selectedTeams.length}</p> )} </div> <button onClick={handleGoBack} className="text-white/80 hover:text-white transition"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> </button> </div> <div className="w-full bg-white/20 rounded-full h-1.5 mt-4 max-w-4xl mx-auto"> <div className="bg-white h-1.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}></div> </div> </header> <main className="flex-grow flex flex-col items-center justify-center p-4 text-center"> <div className={`transition-all duration-300 ease-in-out w-full max-w-2xl ${isFading ? 'opacity-0 transform -translate-y-4' : 'opacity-100'}`}> {currentQuestion && ( <div key={currentQuestion.key}> <label htmlFor={currentQuestion.key} className="block text-2xl md:text-3xl font-semibold text-gray-800 mb-6">{currentQuestion.label}</label> <input id={currentQuestion.key} name={currentQuestion.key} type={currentQuestion.type} value={formData[currentQuestion.key]} onChange={handleInputChange} placeholder={currentQuestion.placeholder} required={currentQuestion.required} className="text-xl md:text-2xl w-full max-w-lg mx-auto bg-transparent border-b-2 border-gray-300 focus:border-gray-800 outline-none text-center p-2 transition-colors duration-300" autoFocus /> </div> )} </div> </main> <footer className="w-full p-6 flex flex-col items-center justify-center"> {submissionStatus === 'error' && <p className="text-sm text-red-600 mb-4">{errorMessage}</p>} {currentQuestionIndex < questionsForTeam.length - 1 ? ( <button onClick={handleNextQuestion} className="bg-gray-800 text-white rounded-lg p-3 hover:bg-gray-900 transition-transform transform hover:scale-105 shadow-lg disabled:opacity-50" disabled={currentQuestion.required && !formData[currentQuestion.key]}> <ArrowRightIcon /> </button> ) : ( <button onClick={handleFormSubmit} className="bg-green-600 text-white font-bold py-3 px-8 rounded-full hover:bg-green-700 transition-transform transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed" disabled={submissionStatus === 'submitting' || (currentQuestion.required && !formData[currentQuestion.key])}> {submissionStatus === 'submitting' ? 'Submitting...' : 'Complete Application'} </button> )} </footer> </div> ); };
  const renderSuccessMessage = () => ( <div className="w-full flex flex-col items-center"> <div className="w-full max-w-2xl bg-white p-8 sm:p-12 rounded-2xl shadow-xl text-center"> <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> <h2 className="mt-6 text-3xl font-bold text-gray-900">Submissions Received!</h2> <p className="mt-4 text-lg text-gray-600"> Thank you for your interest. We&apos;ve received your application(s) for the <strong>{selectedTeams.join(', ')}</strong> team(s) and will be in touch shortly. </p> <button onClick={handleStartOver} className="mt-8 bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-indigo-700 transition-all transform hover:scale-105 duration-300"> Submit Another Application </button> </div> </div> );
  
  return (
    <div className={`transition-colors duration-500 ${ view === 'form' || view === 'success' ? 'bg-gray-100' : 'bg-gradient-to-br from-gray-800 via-slate-900 to-black' }`}>
      {view === 'form' ? renderForm() : (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
          {(view === 'splash' || view === 'teams') && <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>}
          <div className="relative z-10 flex items-center justify-center w-full">
             {view === 'splash' && ( <div className="text-center"> <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">Welcome to Our Platform</h1> <p className="text-lg md:text-xl text-gray-300 mb-8">Join a team to get started.</p> <button onClick={handleSelectTeamAndContinue} className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-200 transition-transform transform hover:scale-105 duration-300 ease-in-out"> Select Team and Continue </button> </div> )}
             {view === 'teams' && renderTeamSelection()}
             {view === 'success' && renderSuccessMessage()}
          </div>
        </main>
      )}
    </div>
  );
}