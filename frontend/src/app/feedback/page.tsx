"use client";
import React, { useState } from 'react';
import { auth } from '@/app/lib/firebase';
import { submitFeedback } from '@/lib/firestore';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    eventType: '',
    rating: '',
    feedback: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Pre-fill email if user is logged in
  React.useEffect(() => {
    const user = auth.currentUser;
    if (user && !formData.email) {
      setFormData(prev => ({
        ...prev,
        email: user.email || '',
        name: user.displayName || prev.name
      }));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const user = auth.currentUser;
      await submitFeedback({
        userId: user?.uid,
        name: formData.name,
        email: formData.email,
        eventType: formData.eventType,
        rating: formData.rating,
        feedback: formData.feedback,
      });
      
      setSuccess(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        eventType: '',
        rating: '',
        feedback: ''
      });
      
      setTimeout(() => {
        setSuccess(false);
        router.push('/');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit feedback. Please try again.');
    } finally {
      setLoading(false);
    }
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

          {success && (
            <div className="mb-4 p-4 bg-green-500/10 border border-green-500 rounded-md">
              <p className="text-green-400 text-sm text-center">
                ✅ Thank you for your feedback! Redirecting...
              </p>
            </div>
          )}

          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500 rounded-md">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}
          
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
            disabled={loading}
            className="w-full bg-white text-black py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;