import React, { useState } from 'react';
import { 
  Code, 
  Zap, 
  Shield, 
  Database, 
  Server, 
  ArrowRight, 
  MoreHorizontal 
} from 'lucide-react';

import nodejsLogo from '../logos/nodejs.svg';
import reactLogo from '../logos/react.svg';
import mongodbLogo from '../logos/mongodb.svg';
import awsLogo from '../logos/aws.svg';

const EmailServiceHomepage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const techStack = [
    { name: 'Node.js', logo: nodejsLogo },
    { name: 'React', logo: reactLogo },
    { name: 'MongoDB', logo: mongodbLogo },
    { name: 'AWS', logo: awsLogo }
  ];

  const apiFeatures = [
    "High-performance email routing",
    "Real-time tracking & analytics",
    "Advanced spam filtering",
    "Multi-region support",
    "Webhook integrations"
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: 29,
      apiCalls: 500,
      features: [
        "500 API Calls/Month",
        "Basic Email Tracking",
        "Community Support",
        "Rate Limit: 10/sec"
      ]
    },
    {
      name: "Professional",
      price: 99,
      apiCalls: 5000,
      features: [
        "5000 API Calls/Month", 
        "Advanced Analytics",
        "Priority Support",
        "Rate Limit: 50/sec"
      ]
    },
    {
      name: "Enterprise",
      price: 299,
      apiCalls: "Unlimited",
      features: [
        "Unlimited API Calls",
        "Full Analytics Suite",
        "24/7 Dedicated Support",
        "Custom Rate Limiting"
      ]
    }
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-gray-800/90 backdrop-blur-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">EmailAPI</h1>
          </div>
          <div className="space-x-4">
            <a href="#features" className="hover:text-blue-500">Features</a>
            <a href="#pricing" className="hover:text-blue-500">Pricing</a>
            <a href="/docs" className="hover:text-blue-500">Docs</a>
            <a 
              href="/auth" 
              className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-extrabold mb-6">
          Powerful Email Infrastructure <br />
          <span className="text-blue-500">Built for Developers</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          Scalable email routing, real-time tracking, and seamless integrations 
          for modern applications.
        </p>
        <div className="flex justify-center space-x-4">
          <a 
            href="/auth" 
            className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center"
          >
            Start Free Trial <ArrowRight className="ml-2" />
          </a>
          <a 
            href="#features" 
            className="border border-gray-600 px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Learn More
          </a>
        </div>
      </header>

      {/* Tech Stack */}
      <section className="bg-gray-800 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Powered By Leading Technologies</h2>
          <div className="flex justify-center space-x-12">
            {techStack.map((tech, index) => (
              <img 
                key={index} 
                src={tech.logo} 
                alt={tech.name} 
                className="h-12 grayscale hover:grayscale-0 transition"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">API Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Shield />, title: "Secure Routing", desc: "End-to-end encryption" },
            { icon: <Database />, title: "High Performance", desc: "Low latency processing" },
            { icon: <Server />, title: "Scalable Infrastructure", desc: "Handle millions of emails" }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="bg-gray-800 p-6 rounded-lg text-center hover:scale-105 transition"
            >
              <div className="text-blue-500 mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Transparent Pricing</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition"
            >
              <h3 className="text-2xl font-semibold mb-4">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-400">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Zap className="mr-2 text-blue-500" size={20} />
                    {feature}
                  </li>
                ))}
              </ul>
              <a 
                href="/auth" 
                className="w-full text-center bg-blue-600 py-3 rounded-lg hover:bg-blue-700 transition block"
              >
                Choose {plan.name}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">EmailAPI</h4>
              <p className="text-gray-400">
                Developed by Satya Suranjeet Jena. Revolutionizing email infrastructure.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Quick Links</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Legal</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Contact</h5>
              <p className="text-gray-400">Email: support@emailapi.com</p>
              <p className="text-gray-400">Phone: +1 (555) 123-4567</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EmailServiceHomepage;