"use client";
import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  eventType: string;
  rating: string;
  feedback: string;
}

const EVENT_TYPES = [
  { value: 'birthday', label: 'Birthday Parties' },
  { value: 'engagement', label: 'Engagements' },
  { value: 'housewarming', label: 'Housewarming' },
  { value: 'puja', label: 'Puja Events' },
  { value: 'babyshower', label: 'Baby Showers' },
  { value: 'naming', label: 'Naming Ceremony' }
];

const RATINGS = [
  { value: '5', label: 'Excellent (5/5)' },
  { value: '4', label: 'Very Good (4/5)' },
  { value: '3', label: 'Good (3/5)' },
  { value: '2', label: 'Fair (2/5)' },
  { value: '1', label: 'Poor (1/5)' }
];

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => (
  <div className="mb-4">
    <label htmlFor={props.id} className="block text-gray-300 mb-2 text-sm">
      {label}
    </label>
    <input
      {...props}
      className="w-full bg-transparent border-b border-gray-700 text-white focus:outline-none focus:border-gray-300 pb-2 transition-colors"
    />
  </div>
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

const Select: React.FC<SelectProps> = ({ label, options, ...props }) => (
  <div className="mb-4">
    <label htmlFor={props.id} className="block text-gray-300 mb-2 text-sm">
      {label}
    </label>
    <select
      {...props}
      className="w-full bg-black text-white border-b border-gray-700 focus:outline-none focus:border-gray-300 pb-2 transition-colors"
    >
      <option value="" className="bg-black">Select an option</option>
      {options.map((option) => (
        <option key={option.value} value={option.value} className="bg-black">
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, ...props }) => (
  <div className="mb-6">
    <label htmlFor={props.id} className="block text-gray-300 mb-2 text-sm">
      {label}
    </label>
    <textarea
      {...props}
      className="w-full bg-transparent border-b border-gray-700 text-white focus:outline-none focus:border-gray-300 pb-2 h-24 resize-none transition-colors"
    />
  </div>
);

function App() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    eventType: '',
    rating: '',
    feedback: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <p className="text-gray-400 text-sm text-center mb-2">Your feedback matters a lot</p>
        <form 
          onSubmit={handleSubmit} 
          className="bg-black border border-gray-900 rounded-lg p-8 shadow-2xl"
        >
          <h2 className="text-white text-2xl font-bold mb-6 text-center">
            Event Feedback Form
          </h2>
          
          <Input
            label="Full Name"
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />

          <Input
            label="Email Address"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <Select
            label="Event Type"
            id="eventType"
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            options={EVENT_TYPES}
            required
          />

          <Select
            label="Overall Experience Rating"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            options={RATINGS}
            required
          />

          <TextArea
            label="Additional Feedback"
            id="feedback"
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            placeholder="Share your thoughts about the event..."
          />

          <button
            type="submit"
            className="w-full bg-white text-black py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;