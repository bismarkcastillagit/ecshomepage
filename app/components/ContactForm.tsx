'use client';

import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: '',
    website: '' // Honeypot field - should remain empty
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

    // Honeypot check - if website field is filled, it's a bot
    if (formData.website) {
      console.log('Spam detected via honeypot');
      // Silently reject without showing error
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Submit to API route (handles both Supabase and email)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          company: formData.company.trim() || undefined,
          email: formData.email.trim(),
          message: formData.message.trim(),
          website: formData.website, // Include honeypot field
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      // Success!
      setIsSubmitted(true);
      setFormData({ name: '', company: '', email: '', message: '', website: '' });

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

  const inputBaseStyles = "w-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-purple)] focus:ring-2 focus:ring-purple-500/20 transition-all duration-300";
  const errorStyles = "border-red-500 focus:border-red-500 focus:ring-red-500/20";

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-8 shadow-lg">
        {isSubmitted && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-700 text-center mb-6 animate-fade-in">
            ✅ Thanks for reaching out! We&apos;ll get back to you soon.
          </div>
        )}

        {submitError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-center mb-6 animate-fade-in">
            {submitError}
          </div>
        )}

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-[var(--text-primary)] font-medium mb-2">
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
              <label htmlFor="company" className="block text-[var(--text-primary)] font-medium mb-2">
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
          </div>

          <div>
            <label htmlFor="email" className="block text-[var(--text-primary)] font-medium mb-2">
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
            <label htmlFor="message" className="block text-[var(--text-primary)] font-medium mb-2">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className={`${inputBaseStyles} resize-none ${errors.message ? errorStyles : ''}`}
              placeholder="Tell us about your project or how we can help..."
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>

          {/* Honeypot field - hidden from humans, visible to bots */}
          <div className="absolute left-[-9999px]" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn-primary w-full md:w-auto ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : 'Send Message'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
