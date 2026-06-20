import React, { useState } from 'react';
import { HiOutlineSparkles, HiOutlineCheckCircle, HiOutlineExclamationCircle } from 'react-icons/hi';
import { CgSpinner } from 'react-icons/cg';

export default function ConsultationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    projectType: '',
    budget: '',
    designStyle: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Full name is required';
    
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email address is invalid';
    }

    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s-]{7,15}$/.test(formData.phone.replace(/\s+/g, ''))) {
      tempErrors.phone = 'Invalid phone number format';
    }

    if (!formData.location.trim()) tempErrors.location = 'Project location is required';
    if (!formData.projectType) tempErrors.projectType = 'Please select a project type';
    if (!formData.budget) tempErrors.budget = 'Please select a budget range';
    if (!formData.designStyle) tempErrors.designStyle = 'Please select a preferred design style';
    if (!formData.message.trim()) tempErrors.message = 'Please provide a short description of your project';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          location: '',
          projectType: '',
          budget: '',
          designStyle: '',
          message: ''
        });
      } else {
        setSubmitError(data.message || 'An error occurred during submission. Please try again.');
      }
    } catch (err) {
      setSubmitError('Failed to connect to the server. Please check your network connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-white border border-secondary/30 p-8 text-center space-y-6 shadow-xl max-w-lg mx-auto">
        <div className="flex justify-center">
          <HiOutlineCheckCircle className="text-secondary animate-bounce" size={70} />
        </div>
        <h3 className="text-3xl font-light tracking-wide text-primary font-luxury">
          Consultation Requested
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          Thank you for choosing Aura &amp; Co. Your bespoke design profile has been received. Our luxury design consultants will contact you within 24 hours to schedule your private briefing.
        </p>
        <button
          onClick={() => setSubmitSuccess(false)}
          className="border border-secondary text-secondary hover:bg-secondary hover:text-primary px-8 py-3 text-xs font-semibold uppercase tracking-widest transition-luxe"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200/80 p-8 md:p-12 shadow-lg max-w-3xl mx-auto">
      <div className="text-center mb-10 space-y-2">
        <span className="text-[10px] tracking-[0.2em] font-semibold text-secondary uppercase block">
          Private Briefing Form
        </span>
        <h3 className="text-3xl font-light text-primary font-luxury">
          Request A Consultation
        </h3>
        <div className="w-12 h-[1px] bg-secondary mx-auto mt-4" />
      </div>

      {submitError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
          <HiOutlineExclamationCircle size={18} className="flex-shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-[10px] tracking-widest uppercase font-semibold text-gray-500 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`border ${errors.name ? 'border-red-400' : 'border-gray-300 focus:border-secondary'} outline-none px-4 py-3 text-sm transition-colors`}
              placeholder="e.g. Elizabeth Sterling"
            />
            {errors.name && <span className="text-red-500 text-[10px] mt-1">{errors.name}</span>}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-[10px] tracking-widest uppercase font-semibold text-gray-500 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`border ${errors.email ? 'border-red-400' : 'border-gray-300 focus:border-secondary'} outline-none px-4 py-3 text-sm transition-colors`}
              placeholder="e.g. elizabeth@example.com"
            />
            {errors.email && <span className="text-red-500 text-[10px] mt-1">{errors.email}</span>}
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-[10px] tracking-widest uppercase font-semibold text-gray-500 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`border ${errors.phone ? 'border-red-400' : 'border-gray-300 focus:border-secondary'} outline-none px-4 py-3 text-sm transition-colors`}
              placeholder="e.g. +1 (310) 555-0199"
            />
            {errors.phone && <span className="text-red-500 text-[10px] mt-1">{errors.phone}</span>}
          </div>

          {/* Location */}
          <div className="flex flex-col">
            <label htmlFor="location" className="text-[10px] tracking-widest uppercase font-semibold text-gray-500 mb-2">
              Project Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`border ${errors.location ? 'border-red-400' : 'border-gray-300 focus:border-secondary'} outline-none px-4 py-3 text-sm transition-colors`}
              placeholder="e.g. Beverly Hills, CA"
            />
            {errors.location && <span className="text-red-500 text-[10px] mt-1">{errors.location}</span>}
          </div>

          {/* Project Type */}
          <div className="flex flex-col">
            <label htmlFor="projectType" className="text-[10px] tracking-widest uppercase font-semibold text-gray-500 mb-2">
              Project Type *
            </label>
            <select
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              className={`border ${errors.projectType ? 'border-red-400' : 'border-gray-300 focus:border-secondary'} outline-none px-4 py-3 text-sm transition-colors bg-white`}
            >
              <option value="">Select Project Type</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Office">Office Space</option>
              <option value="Luxury Villa">Luxury Villa</option>
              <option value="Apartment">Apartment</option>
              <option value="Restaurant">Restaurant / Bistro</option>
              <option value="Other">Other Bespoke Space</option>
            </select>
            {errors.projectType && <span className="text-red-500 text-[10px] mt-1">{errors.projectType}</span>}
          </div>

          {/* Budget Range */}
          <div className="flex flex-col">
            <label htmlFor="budget" className="text-[10px] tracking-widest uppercase font-semibold text-gray-500 mb-2">
              Estimated Budget *
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className={`border ${errors.budget ? 'border-red-400' : 'border-gray-300 focus:border-secondary'} outline-none px-4 py-3 text-sm transition-colors bg-white`}
            >
              <option value="">Select Budget Range</option>
              <option value="$25,000 - $50,000">$25,000 - $50,000</option>
              <option value="$50,000 - $100,000">$50,000 - $100,000</option>
              <option value="$100,000 - $250,000">$100,000 - $250,000</option>
              <option value="$250,000 - $500,000">$250,000 - $500,000</option>
              <option value="$500,000+">$500,000+ (Ultra Premium)</option>
            </select>
            {errors.budget && <span className="text-red-500 text-[10px] mt-1">{errors.budget}</span>}
          </div>
        </div>

        {/* Preferred Design Style */}
        <div className="flex flex-col">
          <label htmlFor="designStyle" className="text-[10px] tracking-widest uppercase font-semibold text-gray-500 mb-2">
            Preferred Design Style *
          </label>
          <select
            id="designStyle"
            name="designStyle"
            value={formData.designStyle}
            onChange={handleChange}
            className={`border ${errors.designStyle ? 'border-red-400' : 'border-gray-300 focus:border-secondary'} outline-none px-4 py-3 text-sm transition-colors bg-white`}
          >
            <option value="">Select Design Style</option>
            <option value="Modern">Modern</option>
            <option value="Traditional">Traditional</option>
            <option value="Minimalist">Minimalist</option>
            <option value="Contemporary">Contemporary</option>
            <option value="Industrial">Industrial</option>
            <option value="Scandinavian">Scandinavian</option>
            <option value="Luxury">Luxury Gold Class</option>
            <option value="Custom">Custom / Bespoke Layout</option>
          </select>
          {errors.designStyle && <span className="text-red-500 text-[10px] mt-1">{errors.designStyle}</span>}
        </div>

        {/* Message */}
        <div className="flex flex-col">
          <label htmlFor="message" className="text-[10px] tracking-widest uppercase font-semibold text-gray-500 mb-2">
            Tell Us About Your Vision *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className={`border ${errors.message ? 'border-red-400' : 'border-gray-300 focus:border-secondary'} outline-none px-4 py-3 text-sm transition-colors resize-none`}
            placeholder="Describe your design aspirations, timelines, and any architectural constraints..."
          />
          {errors.message && <span className="text-red-500 text-[10px] mt-1">{errors.message}</span>}
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full gold-gradient-bg text-primary font-bold tracking-widest text-xs uppercase py-4 shadow-md transition-luxe hover:opacity-95 flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <CgSpinner className="animate-spin text-primary" size={18} />
                <span>Sending Application...</span>
              </>
            ) : (
              <>
                <HiOutlineSparkles className="text-primary" size={16} />
                <span>Submit Secure Booking Request</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
