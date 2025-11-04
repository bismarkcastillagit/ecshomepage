'use client';

import React, { useState } from 'react';
import Button from './Button';
import { supabase, type ContactSubmission } from '@/lib/supabase';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Prepare submission data
      const submission: ContactSubmission = {
        name: formData.name.trim(),
        company: formData.company.trim() || null as any,
        email: formData.email.trim(),
        message: formData.message.trim(),
      };

      // Insert into Supabase
      const { error } = await supabase
        .from('contact_submissions')
        .insert([submission]);

      if (error) {
        throw error;
      }

      // Success!
      setIsSubmitted(true);
      setFormData({ name: '', company: '', email: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error: any) {
      console.error('Error submitting form:', error);
      setSubmitError(
        error.message || 'Failed to submit form. Please try again or contact us directly at sales@ecsvault.com'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBaseStyles = "w-full bg-[var(--background-dark)] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--accent-purple)] focus:ring-2 focus:ring-purple-500/20 transition-all duration-300";
  const errorStyles = "border-red-500 focus:border-red-500 focus:ring-red-500/20";

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      {isSubmitted && (
        <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-4 text-green-300 text-center animate-fade-in">
          Thanks for reaching out! We&apos;ll get back to you soon.
        </div>
      )}

      {submitError && (
        <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 text-red-300 text-center animate-fade-in">
          {submitError}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-white font-medium mb-2">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`${inputBaseStyles} ${errors.name ? errorStyles : ''}`}
          placeholder="John Doe"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="company" className="block text-white font-medium mb-2">
          Company
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className={inputBaseStyles}
          placeholder="Your Company (Optional)"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-white font-medium mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`${inputBaseStyles} ${errors.email ? errorStyles : ''}`}
          placeholder="john@example.com"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-white font-medium mb-2">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className={`${inputBaseStyles} resize-none ${errors.message ? errorStyles : ''}`}
          placeholder="Tell us about your project or how we can help..."
        />
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
      </div>

      <div className="text-center">
        <Button
          type="submit"
          variant="primary"
          className={isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </Button>
      </div>
    </form>
  );
}
