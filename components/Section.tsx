import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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

interface Props {
  sectionData: SectionData;
  onSubmit: (data: any) => void;
  allFormData: any;
  selectedTeams: string[];
}

export default function Section({ sectionData, onSubmit, allFormData, selectedTeams }: Props) {
  // Dynamically build a Zod schema from our JSON validation rules
  const schemaShape = sectionData.questions.reduce((acc: any, q) => {
    let validator: any = z.string();
    
    if (q.type === 'number') {
      validator = z.number();
    } else if (q.type === 'email') {
      validator = z.string().email("Invalid email address");
    }
    
    if (q.validation?.required) {
      if (q.type === 'number') {
        validator = validator.min(0, q.validation.required);
      } else {
        validator = validator.min(1, q.validation.required);
      }
    } else {
      validator = validator.optional();
    }
    
    acc[q.id] = validator;
    return acc;
  }, {});
  
  const schema = z.object(schemaShape);

  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm({
    resolver: zodResolver(schema),
    defaultValues: allFormData
  });

  const handleRemindMe = async () => {
    const currentFormData = getValues();
    const email = currentFormData.email || allFormData.email;
    
    if (!email) {
      alert("Please fill in your email address to save progress.");
      return;
    }

    try {
      const progressData = {
        selectedTeams,
        formData: { ...allFormData, ...currentFormData },
        sectionId: sectionData.id,
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
        alert("Could not save your progress.");
      } else {
        alert(`Progress saved for ${email}. We'll remind you to complete it!`);
      }
    } catch (error) {
      console.error("Failed to save progress", error);
      alert("Could not save your progress.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">{sectionData.title}</h2>
      
      {sectionData.questions.map((question) => (
        <div key={question.id} className="mb-6">
          <Question
            question={question}
            register={register}
            error={errors[question.id]}
            setValue={setValue}
            getValues={getValues}
          />
        </div>
      ))}
      
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