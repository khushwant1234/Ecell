# Documentation

This document provides an overview of the key components and API endpoints in the Ecell project.

## `components/Section.tsx`

This component renders a section of a form.

- **Functionality**: It dynamically builds a validation schema using Zod based on the `sectionData` prop. It uses `react-hook-form` for form state management.
- **Props**:
    - `sectionData`: An object containing the title and an array of questions for the section.
    - `onSubmit`: A function to handle the form submission.
    - `allFormData`: An object containing all the form data collected so far.
- **Features**:
    - **Dynamic Validation**: Builds a Zod schema from JSON validation rules.
    - **Save Progress**: Includes a "Remind Me" button that sends the user's email and current form data to the `/api/remind` endpoint.

## `components/question.tsx`

This component renders a single question in a form.

- **Functionality**: It displays a form input based on the `question` prop. It can be a text input, email, long-text, etc. It also includes a feature to enhance the user's input using an AI service.
- **Props**:
    - `question`: An object containing the question's ID, label, type, and other properties.
    - `register`: The `register` function from `react-hook-form`.
    - `error`: An optional `FieldError` object from `react-hook-form`.
    - `setValue`: The `setValue` function from `react-hook-form`.
    - `getValues`: The `getValues` function from `react-hook-form`.
- **Features**:
    - **AI Enhancement**: If the `enhanceable` property of the question is true, it displays an "Enhance with AI" button. When clicked, it sends the current input value to the `/api/enhance` endpoint and updates the input with the enhanced text.

## `app/recruitment/form/page.tsx`

This is the main page for the recruitment form.

- **Functionality**: It manages the multi-step recruitment form, guiding the user through team selection and a series of questions. It uses Supabase to store the application data.
- **State Management**:
    - `view`: Controls the current view ('splash', 'teams', 'form', 'success').
    - `selectedTeams`: An array of the teams the user is applying for.
    - `formData`: The user's input for the form fields.
    - `submissionStatus`: Tracks the status of the form submission ('idle', 'submitting', 'error').
- **Features**:
    - **Multi-step Form**: Allows users to apply for multiple teams in a single session.
    - **Dynamic Questions**: Displays different questions based on the selected team.
    - **Supabase Integration**: Submits the final application data to a Supabase table named `applications`.

## `app/api/enhance.ts`

This is an API route that enhances a given text using the Google Generative AI (Gemini).

- **Functionality**: It receives a POST request with a `text` field in the body. It then uses the Gemini Pro model to rephrase and improve the text to be more professional and impactful.
- **Request Body**:
    - `text`: The string of text to be enhanced.
- **Response**:
    - On success, it returns a JSON object with the `enhancedText`.
    - On error, it returns an appropriate error message and status code.
- **System Prompt**: It uses a specific system prompt to guide the AI to act as an expert career coach and professional writer, ensuring the enhanced text maintains the original meaning but with improved language and structure.
