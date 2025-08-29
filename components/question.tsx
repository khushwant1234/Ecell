import { useState, ChangeEvent } from 'react';

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

interface Props {
  question: QuestionType;
  value: string | number;
  onChange: (value: string | number) => void;
  onRadioChange?: (questionId: string, value: string) => void;
  error?: string;
}

export default function Question({ question, value, onChange, onRadioChange, error }: Props) {
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleEnhance = async () => {
    if (!value || typeof value !== 'string') {
      alert("Please write something first before enhancing.");
      return;
    }

    setIsEnhancing(true);
    try {
      const response = await fetch('/api/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: value }),
      });

      if (response.ok) {
        const { enhancedText } = await response.json();
        onChange(enhancedText);
      } else {
        throw new Error('Enhancement failed');
      }
    } catch (err) {
      console.error("Enhance failed", err);
      alert("Sorry, we couldn't enhance the text at this moment.");
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = question.type === 'number' ? Number(e.target.value) : e.target.value;
    onChange(newValue);
  };

  const renderInput = () => {
    if (question.type === 'radio' && question.options) {
      return (
        <div className="space-y-3">
          {question.options.map((option) => (
            <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name={question.id}
                value={option.value}
                checked={value === option.value}
                onChange={() => onRadioChange?.(question.id, option.value)}
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
            value={value as string}
            onChange={handleInputChange}
            placeholder={question.placeholder}
            required={!!question.validation?.required}
            rows={4}
            className="text-xl w-full max-w-2xl mx-auto bg-transparent border-2 border-gray-300 focus:border-gray-800 outline-none p-4 rounded-lg transition-colors duration-300 resize-none"
          />
          {question.enhanceable && (
            <button
              type="button"
              onClick={handleEnhance}
              disabled={!value || isEnhancing}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
            >
              {isEnhancing ? 'Enhancing...' : '✨ Enhance with AI'}
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
        value={value}
        onChange={handleInputChange}
        placeholder={question.placeholder}
        required={!!question.validation?.required}
        className="text-xl md:text-2xl w-full max-w-lg mx-auto bg-transparent border-b-2 border-gray-300 focus:border-gray-800 outline-none text-center p-2 transition-colors duration-300"
      />
    );
  };

  return (
    <div className="question-wrapper">
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      {renderInput()}
    </div>
  );
}