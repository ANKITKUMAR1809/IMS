import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  UserIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";

const Contact = () => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setContactForm({
      ...contactForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Message sent successfully! We'll get back to you soon.", {
        position: "top-right",
        autoClose: 5000,
      });
      setContactForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.", {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <PhoneIcon className="h-6 w-6 text-blue-500" />,
      title: "Phone",
      details: "+1 (555) 123-4567",
      subtitle: "Mon-Fri from 9am to 6pm",
    },
    {
      icon: <EnvelopeIcon className="h-6 w-6 text-blue-500" />,
      title: "Email",
      details: "support@ims.com",
      subtitle: "We reply within 24 hours",
    },
    {
      icon: <MapPinIcon className="h-6 w-6 text-blue-500" />,
      title: "Office",
      details: "123 Business Ave",
      subtitle: "San Francisco, CA 94107",
    },
    {
      icon: <ClockIcon className="h-6 w-6 text-blue-500" />,
      title: "Hours",
      details: "Monday - Friday",
      subtitle: "9:00 AM - 6:00 PM PST",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 ">
      <ToastContainer />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg mb-6">
            <ChatBubbleLeftRightIcon className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about IMS? We're here to help. Reach out to our team
            and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 h-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
                <BuildingOfficeIcon className="h-6 w-6 text-blue-500" />
                Contact Information
              </h2>

              <div className="space-y-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-3 bg-blue-50 rounded-xl">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {info.title}
                      </h3>
                      <p className="text-gray-600 mt-1">{info.details}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {info.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQ Section */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="font-bold text-gray-800 mb-4">
                  Frequently Asked
                </h3>
                <div className="space-y-4">
                  {[
                    "How do I get started with IMS?",
                    "Is there a free trial available?",
                    "What payment methods do you accept?",
                  ].map((question, index) => (
                    <div key={index} className="group">
                      <a
                        href="#"
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-200"
                      >
                        <span>{question}</span>
                        <PaperAirplaneIcon className="h-3 w-3 rotate-45" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 h-full">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Send us a Message
                </h2>
                <p className="text-gray-600">
                  Fill out the form below and our team will get back to you
                  shortly
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Your Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={contactForm.name}
                        onChange={handleInput}
                        className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 focus:outline-none text-gray-800 placeholder-gray-400"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={contactForm.email}
                        onChange={handleInput}
                        className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 focus:outline-none text-gray-800 placeholder-gray-400"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Subject Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={contactForm.subject}
                    onChange={handleInput}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 focus:outline-none text-gray-800 placeholder-gray-400"
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={6}
                    value={contactForm.message}
                    onChange={handleInput}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 focus:outline-none text-gray-800 placeholder-gray-400 resize-none"
                    placeholder="Please describe your question or concern in detail..."
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Send Message
                      <PaperAirplaneIcon className="h-5 w-5" />
                    </span>
                  )}
                </button>
              </form>

              {/* Support Note */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">
                      For urgent matters, please call our support line directly.
                    </p>
                  </div>
                  <a
                    href="tel:+15551234567"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors duration-200"
                  >
                    <PhoneIcon className="h-4 w-4" />
                    Call Support
                  </a>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
