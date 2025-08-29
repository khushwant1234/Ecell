import { useForm, FieldError } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import Question from './question';
import { createClient } from '@supabase/supabase-js';

// --- Supabase Client Setup ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface QuestionType {
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

interface SectionData {
  id: string;
  title: string;
  questions: QuestionType[];
}

// Define the form data type based on the dynamic nature of the form
type FormData = Record<string, any>;

interface Props {
  sectionData: SectionData;
  onSubmit: (data: FormData) => void;
  allFormData: FormData;
  selectedTeams: string[];
}

// Define the progress data structure for Supabase
interface ProgressData {
  selectedTeams: string[];
  formData: FormData;
  sectionId: string;
  timestamp: string;
}

// Props interface for the Question component (inferred from usage)
interface QuestionProps {
  question: QuestionType;
  value: string | number;
  onChange: (value: string | number) => void;
  onRadioChange?: (questionId: string, value: string) => void;
  error?: string;
}

export default function Section({ sectionData, onSubmit, allFormData, selectedTeams }: Props) {
  // State to track form values for controlled components
  const [formValues, setFormValues] = useState<FormData>({ ...allFormData });

  // Dynamically build a Zod schema from our JSON validation rules
  const schemaShape = sectionData.questions.reduce((acc: Record<string, z.ZodTypeAny>, q) => {
    let validator: z.ZodTypeAny = z.string();
    
    if (q.type === 'number') {
      validator = z.coerce.number(); // Use coerce to handle string inputs that should be numbers
    } else if (q.type === 'email') {
      validator = z.string().email("Invalid email address");
    }
    
    if (q.validation?.required) {
      if (q.type === 'number') {
        validator = (validator as z.ZodNumber).min(0, q.validation.required);
      } else {
        validator = (validator as z.ZodString).min(1, q.validation.required);
      }
    } else {
      validator = validator.optional();
    }
    
    acc[q.id] = validator;
    return acc;
  }, {});
  
  const schema = z.object(schemaShape);
  type SchemaType = z.infer<typeof schema>;

  const { 
    handleSubmit, 
    formState: { errors },
    trigger,
    getValues
  } = useForm<SchemaType>({
    resolver: zodResolver(schema),
    values: formValues as SchemaType // Use values instead of defaultValues for controlled updates
  });

  // Handle value changes for individual questions
  const handleQuestionChange = (questionId: string, value: string | number): void => {
    setFormValues(prev => ({
      ...prev,
      [questionId]: value
    }));
    // Trigger validation for this field
    trigger(questionId as keyof SchemaType);
  };

  // Handle radio button changes specifically
  const handleRadioChange = (questionId: string, value: string): void => {
    handleQuestionChange(questionId, value);
  };

  const handleRemindMe = async (): Promise<void> => {
    const email = formValues.email || allFormData.email;
    
    if (!email) {
      alert("Please fill in your email address to save progress.");
      return;
    }

    try {
      const progressData: ProgressData = {
        selectedTeams,
        formData: { ...allFormData, ...formValues },
        sectionId: sectionData.id,
        timestamp: new Date().toISOString()
      };

      const { error } = await supabase
        .from('progress')
        .upsert({
          email: email as string,
          form_data: progressData
        });

      if (error) {
        console.error('Progress save error:', error);
        alert("Could not save your progress.");
      } else {
        alert(`Progress saved for ${email}. We'll remind you to complete it!`);
      }
    } catch (error) {
      console.error("Failed to save progress", error);
      alert("Could not save your progress.");
    }
  };

  const onFormSubmit = (data: SchemaType): void => {
    onSubmit(data as FormData);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">{sectionData.title}</h2>
      
      {sectionData.questions.map((question) => {
        const error = errors[question.id] as FieldError | undefined;
        const currentValue = formValues[question.id] || '';
        
        return (
          <div key={question.id} className="mb-6">
            <label htmlFor={question.id} className="block text-lg font-medium mb-3">
              {question.label}
              {question.validation?.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <Question
              question={question}
              value={currentValue}
              onChange={(value) => handleQuestionChange(question.id, value)}
              onRadioChange={handleRadioChange}
              error={error?.message}
            />
          </div>
        );
      })}
      
      <div className="flex gap-4 justify-center mt-8">
        <button 
          type="button" 
          onClick={handleRemindMe} 
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg transition-colors duration-300"
        >
          💾 Remind Me
        </button>
        <button 
          type="submit" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg transition-colors duration-300"
        >
          Next
        </button>
      </div>
    </form>
  );
}