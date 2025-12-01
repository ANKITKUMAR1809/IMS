import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../pages/Login";
import { 
  BuildingStorefrontIcon,
  ChartBarIcon,
  ClipboardDocumentCheckIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  ArrowRightCircleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const Home = () => {
  const copyText = useRef(null);
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <BuildingStorefrontIcon className="h-6 w-6 text-blue-500" />,
      title: "Product Management",
      description: "Add, edit, or remove products effortlessly"
    },
    {
      icon: <ChartBarIcon className="h-6 w-6 text-green-500" />,
      title: "Stock Monitoring",
      description: "Track inventory levels in real-time"
    },
    {
      icon: <ClipboardDocumentCheckIcon className="h-6 w-6 text-purple-500" />,
      title: "Smart Reports",
      description: "Generate insights for better decisions"
    },
    {
      icon: <UserGroupIcon className="h-6 w-6 text-orange-500" />,
      title: "Supplier Management",
      description: "Manage all vendor relationships in one place"
    }
  ];

  const benefits = [
    "Save time with automated inventory tasks",
    "Reduce errors with real-time tracking",
    "Improve productivity with centralized data",
    "Scale from small shops to large warehouses"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-xl mb-6">
              <BuildingStorefrontIcon className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Inventory Management System
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Streamline your business operations with smart, efficient stock control and real-time tracking
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Content */}
            <div className="space-y-10">
              {/* Introduction */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <ArrowTrendingUpIcon className="h-6 w-6 text-blue-500" />
                  Why Choose IMS?
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Our <span className="font-semibold text-blue-600">Inventory Management System</span> is a comprehensive solution designed to help businesses manage products, stock levels, and suppliers with precision and ease.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Centralize your operations, track inventory in real-time, and generate actionable reports—all from one intuitive dashboard that grows with your business.
                </p>

                {/* Benefits List */}
                <div className="space-y-3 mt-8">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features Grid */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">
                  Core Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {features.map((feature, index) => (
                    <div 
                      key={index} 
                      className="group p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <div className="p-3 bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-sm group-hover:shadow transition-shadow duration-200">
                          {feature.icon}
                        </div>
                        <h3 className="font-bold text-gray-800">{feature.title}</h3>
                      </div>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl p-6 text-center">
                  <div className="text-2xl font-bold">99.9%</div>
                  <div className="text-sm opacity-90">Uptime</div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl p-6 text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm opacity-90">Support</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-xl p-6 text-center">
                  <div className="text-2xl font-bold">1000+</div>
                  <div className="text-sm opacity-90">Businesses</div>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-xl p-6 text-center">
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-sm opacity-90">Features</div>
                </div>
              </div>
            </div>

            {/* Right Column - Login & Demo */}
            <div className="space-y-8">
              {/* Login Card */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Welcome Back
                  </h2>
                  <p className="text-gray-600">
                    Sign in to access your inventory dashboard
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <Login />
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <p className="text-gray-600 text-center">
                    Don't have an account?{" "}
                    <button 
                      onClick={() => navigate('/register')}
                      className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1 group"
                    >
                      Register here
                      <ArrowRightCircleIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                  </p>
                </div>
              </div>

              {/* Demo Credentials Card */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-xl p-8 border border-amber-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl">
                    <ShieldCheckIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">
                      Try Demo Account
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Experience IMS with pre-configured data
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg border border-amber-100">
                    <div className="text-sm text-gray-500 mb-1">Email</div>
                    <div className="flex items-center justify-between">
                      <code className="text-gray-800 font-mono bg-gray-50 px-3 py-1 rounded">
                        primewatch@gmail.com
                      </code>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText('primewatch@gmail.com');
                          // Add toast notification here if needed
                        }}
                        className="text-amber-600 hover:text-amber-700 text-sm font-medium"
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-lg border border-amber-100">
                    <div className="text-sm text-gray-500 mb-1">Password</div>
                    <div className="flex items-center justify-between">
                      <code className="text-gray-800 font-mono bg-gray-50 px-3 py-1 rounded">
                        primewatch
                      </code>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText('primewatch');
                          // Add toast notification here if needed
                        }}
                        className="text-amber-600 hover:text-amber-700 text-sm font-medium"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
                  <p className="text-white text-sm font-medium text-center">
                    ⚡ Use these credentials to explore all features instantly
                  </p>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h4 className="font-bold text-gray-800 mb-4">Quick Links</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl text-blue-700 font-medium text-sm transition-colors duration-200">
                    View Documentation
                  </button>
                  <button className="p-4 bg-indigo-50 hover:bg-indigo-100 rounded-xl text-indigo-700 font-medium text-sm transition-colors duration-200">
                    Watch Tutorial
                  </button>
                  <button 
                    onClick={() => navigate('/contact')}
                    className="p-4 bg-green-50 hover:bg-green-100 rounded-xl text-green-700 font-medium text-sm transition-colors duration-200"
                  >
                    Contact Support
                  </button>
                  <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-xl text-purple-700 font-medium text-sm transition-colors duration-200">
                    Pricing Plans
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to transform your inventory management?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of businesses already optimizing their operations with IMS
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/register')}
                className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Start Free Trial
              </button>
              <button 
                onClick={() => navigate('/contact')}
                className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-200"
              >
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;