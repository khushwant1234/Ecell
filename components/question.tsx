import { UseFormRegister, FieldError, UseFormSetValue } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';

// Define the structure of a Question
type QuestionOption = {
  value: string;
  label: string;
};

type QuestionType = {
  id: string;
  label: string;
  type: 'text' | 'email' | 'long-text' | 'number' | 'link' | 'radio' | 'checkbox';
  description?: string;
  options?: QuestionOption[];
  enhanceable?: boolean;
};

type Props = {
  question: QuestionType;
  register: UseFormRegister<any>;
  error?: FieldError;
  setValue: UseFormSetValue<any>;
};

export default function Question({ question, register, error, setValue }: Props) {
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleEnhance = async () => {
    // This logic remains the same
  };

  const renderInput = () => {
    switch (question.type) {
      case 'long-text':
        return <textarea id={question.id} {...register(question.id)} rows={5} />;
      case 'number':
        return <input type="number" id={question.id} {...register(question.id)} />;
      case 'link':
        return <input type="url" id={question.id} {...register(question.id)} placeholder="https://..." />;
      case 'radio':
        return (
          <div className="options-group">
            {question.options?.map((opt) => (
              <div key={opt.value} className="option-item">
                <input type="radio" id={`${question.id}-${opt.value}`} value={opt.value} {...register(question.id)} />
                <label htmlFor={`${question.id}-${opt.value}`}>{opt.label}</label>
              </div>
            ))}
          </div>
        );
      case 'checkbox':
        return (
          <div className="options-group">
            {question.options?.map((opt) => (
              <div key={opt.value} className="option-item">
                <input type="checkbox" id={`${question.id}-${opt.value}`} value={opt.value} {...register(question.id)} />
                <label htmlFor={`${question.id}-${opt.value}`}>{opt.label}</label>
              </div>
            ))}
          </div>
        );
      default: // text, email
        return <input type={question.type} id={question.id} {...register(question.id)} />;
    }
  };

  return (
    <div className="question-wrapper">
      <label htmlFor={question.id}>{question.label}</label>
      {question.description && <p className="description">{question.description}</p>}
      {renderInput()}
      {question.enhanceable && (
         <button type="button" onClick={handleEnhance} disabled={isEnhancing} className="enhance-button">
          {isEnhancing ? 'Enhancing...' : '✨ Enhance with AI'}
        </button>
      )}
      {error && <p className="error-message">{error.message}</p>}
    </div>
  );
}