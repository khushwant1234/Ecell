import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Question from './question';
import axios from 'axios';

export default function Section({ sectionData, onSubmit, allFormData }) {
  // Dynamically build a Zod schema from our JSON validation rules
  const schemaShape = sectionData.questions.reduce((acc, q) => {
    let validator = z.string();
    if (q.validation?.required) validator = validator.min(1, q.validation.required);
    if (q.type === 'email') validator = validator.email("Invalid email address");
    acc[q.id] = validator;
    return acc;
  }, {});
  const schema = z.object(schemaShape);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(schema),
  });

  const handleRemindMe = async () => {
    const email = allFormData.email || getValues('email'); // Get email from current or previous section
    if (!email) {
      alert("Please fill in your email address to save progress.");
      return;
    }
    try {
      await axios.post('/api/remind', { email, formData: allFormData });
      alert(`Progress saved for ${email}. We'll remind you to complete it!`);
    } catch (error) {
      console.error("Failed to save progress", error);
      alert("Could not save your progress.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>{sectionData.title}</h2>
      {sectionData.questions.map((question) => (
        <Question
          key={question.id}
          question={question}
          register={register}
          error={errors[question.id]}
          setValue={setValue}
        />
      ))}
      <div className="actions">
        <button type="button" onClick={handleRemindMe} className="remind-button">Remind Me</button>
        <button type="submit" className="submit-button">Next</button>
      </div>
    </form>
  );
}