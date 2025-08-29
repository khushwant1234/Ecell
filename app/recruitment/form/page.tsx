"use client"
import { useState } from 'react';
import axios from 'axios';

// Component to render each form/section
import Section from '../../../components/Section';

// --- Dynamically import all form JSONs from the formsData folder ---
// This is more scalable than importing each one manually.
function importAll(r: __WebpackModuleApi.RequireContext) {
  const forms: { [key: string]: any } = {};
  r.keys().forEach((item) => { 
    const key = item.replace('./', '').replace('.json', '');
    forms[key] = r(item); 
  });
  return forms;
}
const allForms = importAll(require.context('../../formsData', false, /\.json$/));
// ------------------------------------------------------------------

// Type definition for our growing collection of answers
type AllSubmissions = {
  [key: string]: any;
};


export default function RecruitmentPage() {
  // The queue of form IDs the user must complete. Starts empty.
  const [formQueue, setFormQueue] = useState<string[]>([]);
  
  // Index to track our position in the queue.
  const [currentFormIndex, setCurrentFormIndex] = useState(0);
  
  // A single object to accumulate answers from all forms.
  const [allSubmissions, setAllSubmissions] = useState<AllSubmissions>({});
  
  // State to show the final thank you message.
  const [isComplete, setIsComplete] = useState(false);

  // This function is called every time a Section is submitted.
  const handleFormSubmit = (formData: { [key: string]: any }) => {
    // If the queue is empty, it means we just submitted the *initial* form.
    if (formQueue.length === 0) {
      // 1. Get the selected teams, which will be an array of strings.
      const selectedTeams = formData.teamSelection;
      
      // 2. Set this array as our new form queue.
      setFormQueue(selectedTeams);
      
      // 3. Store the initial data (name, email) in our submissions object.
      const initialData = { 'initial-details': formData };
      setAllSubmissions(initialData);

    } else {
      // If the queue is NOT empty, we're submitting one of the team-specific forms.
      const currentFormId = formQueue[currentFormIndex];
      
      // 1. Add the new form data to our collection of all submissions.
      const updatedSubmissions = { ...allSubmissions, [currentFormId]: formData };
      setAllSubmissions(updatedSubmissions);

      // 2. Check if this was the LAST form in the queue.
      if (currentFormIndex >= formQueue.length - 1) {
        // If yes, trigger the final API submission.
        triggerFinalSubmit(updatedSubmissions);
      } else {
        // If no, just move to the next form in the queue.
        setCurrentFormIndex(prevIndex => prevIndex + 1);
      }
    }
  };

  const triggerFinalSubmit = async (finalData: AllSubmissions) => {
    try {
      console.log('Submitting final data:', finalData);
      // In a real scenario, you might want to flatten the data or send it as is.
      await axios.post('/api/submit', { answers: finalData });
      setIsComplete(true);
    } catch (error) {
      console.error("Final submission failed", error);
      alert("There was an error submitting your complete application.");
    }
  };

  // UI Rendering Logic
  if (isComplete) {
    return (
      <div className="container">
        <h1>Thank You!</h1>
        <p>Your application has been received. We appreciate your interest and will be in touch shortly.</p>
      </div>
    );
  }

  // Determine which form to show now.
  const formIdToShow = formQueue.length === 0 
    ? 'initial-selection' 
    : formQueue[currentFormIndex];

  const currentForm = allForms[formIdToShow];

  if (!currentForm) {
    return <div className="container">Error: Form '{formIdToShow}' not found.</div>
  }
  
  return (
    <div className="container">
      <header>
        <h1>Recruitment Application</h1>
        {/* Show a progress indicator only after the initial form is done */}
        {formQueue.length > 0 && (
          <div className="progress-indicator">
            <p>Step {currentFormIndex + 1} of {formQueue.length} for team-specific questions</p>
          </div>
        )}
      </header>
      
      {/* 
        The 'key' prop is VERY important here. When the formIdToShow changes,
        React sees a new key and will completely re-mount the Section component.
        This automatically resets its internal state (including react-hook-form),
        which is exactly what we need when moving from one form to the next.
      */}
      <Section
        key={formIdToShow}
        sectionData={currentForm}
        onSubmit={handleFormSubmit}
        allFormData={allSubmissions}
      />
    </div>
  );
}