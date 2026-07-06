"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Leaf,
  ArrowRight,
  Zap,
  Award,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Bot,
  MapPin,
  TrendingUp,
  Globe,
  Compass,
  ArrowUpRight,
  ShieldAlert,
  Server
} from "lucide-react";

// Types for FAQ
interface FAQItem {
  question: string;
  answer: string;
}

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "How does the AI Waste Scanner work?",
      answer: "The AI scanner uses image recognition models (YOLO and ResNet) to analyze waste items in real time. It detects the specific object (e.g. plastic bottle, paper cup), classifies the material (e.g. PET, cardboard), warns about potential contamination (e.g. liquid inside plastic), and specifies the correct disposal bin."
    },
    {
      question: "What is the Segregation Accountability Score?",
      answer: "Unlike basic scanners, EcoSort AI analyzes the entire bin. If you place recyclables in a wet bin or leave food inside recyclables, the system detects this contamination, warns the user, and dynamically adjusts their EcoScore. This drives accountability at the source."
    },
    {
      question: "How does the offline mode work?",
      answer: "EcoSort AI uses Service Workers and IndexedDB. If a student or collector scans waste in an area with poor connectivity, the scan is cached locally and synchronized with the servers once network connectivity is restored. Waste collection continues uninterrupted."
    },
    {
      question: "What is the Green Campus Index?",
      answer: "The Green Campus Index is a live leaderboard where departments (e.g. CSE, ECE, Mechanical) and hostels compete. It encourages a friendly, competitive environment on campus, turning sustainability into a gamified team challenge with badge achievements."
    },
    {
      question: "How does the AI Optimized Route Planner help collectors?",
      answer: "Our system runs optimization algorithms to sequence collections based on real-time bin levels and reporting. It computes the shortest path, estimated fuel savings, and time saved, helping the campus logistics team operate highly efficiently."
    }
  ];

  const lifecycleSteps = [
    {
      icon: <Sparkles className="h-6 w-6 text-green-500" />,
      title: "1. Student Scans",
      desc: "Waste scanned via camera; AI detects category & contamination.",
      badge: "AI Engine"
    },
    {
      icon: <CheckCircle2 className="h-6 w-6 text-blue-500" />,
      title: "2. Correct Bin",
      desc: "Sorted immediately. EcoScore & Carbon metrics updated.",
      badge: "Real-time"
    },
    {
      icon: <MapPin className="h-6 w-6 text-indigo-500" />,
      title: "3. Collector Verifies",
      desc: "Secure validation using QR verification, GPS coordinates, and timestamp.",
      badge: "Proof of Work"
    },
    {
      icon: <Compass className="h-6 w-6 text-amber-500" />,
      title: "4. Logistics Route",
      desc: "Optimized collection route reduces fuel and transportation times.",
      badge: "AI Dispatch"
    },
    {
      icon: <Globe className="h-6 w-6 text-emerald-500" />,
      title: "5. Recycler",
      desc: "Pre-sorted waste processed. Direct carbon emissions offset recorded.",
      badge: "0.08kg CO₂/bottle"
    }
  ];

  const stats = [
    { value: "45.2 Tons", label: "Waste Segregated" },
    { value: "3.8 Tons", label: "CO₂ Saved" },
    { value: "88%", label: "Campus Compliance" },
    { value: "1,200+", label: "Daily Active Students" }
  ];

  const features = [
    {
      icon: <Bot className="h-7 w-7 text-green-500" />,
      title: "Waste Intelligence Engine",
      desc: "Simultaneous detection of object, material, and contamination (e.g. food residue in dry bins) with detailed explainability guides."
    },
    {
      icon: <ShieldAlert className="h-7 w-7 text-amber-500" />,
      title: "Segregation Accountability",
      desc: "Dynamic EcoScore system that adjusts points, applies penalties for contamination, and tracks user consistency score (0-100)."
    },
    {
      icon: <Award className="h-7 w-7 text-blue-500" />,
      title: "Green Campus Index",
      desc: "Department and hostel leaderboards that foster competition and collaboration. Earn badges like 'Streak Champion' and redeem custom campus vouchers."
    },
    {
      icon: <Server className="h-7 w-7 text-purple-500" />,
      title: "Offline Sync Support",
      desc: "Service worker implementation allows data queuing and synchronization. Waste collection continues even during poor network connectivity."
    },
    {
      icon: <TrendingUp className="h-7 w-7 text-indigo-500" />,
      title: "Proactive ML Forecasting",
      desc: "Predicts contamination spikes and overflowing bins up to a week in advance, allowing administrative teams to intervene proactively."
    },
    {
      icon: <Zap className="h-7 w-7 text-emerald-500" />,
      title: "Carbon Offset Analytics",
      desc: "Track actual environmental impact in kilograms of CO₂ saved. Make carbon footprint metrics clear and shareable for college boards."
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-bg-light dark:bg-bg-dark transition-colors duration-200">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full glass-panel border-b border-gray-200/50 dark:border-gray-800/30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="p-2 bg-primary rounded-xl flex items-center justify-center">
              <Leaf className="h-5 w-5 text-white animate-pulse-slow" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight text-gray-900 dark:text-white">
              EcoSort <span className="text-primary">AI</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600 dark:text-gray-400">
            <a href="#lifecycle" className="hover:text-primary transition-colors">Lifecycle</a>
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#stats" className="hover:text-primary transition-colors">Impact</a>
            <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
          </nav>
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-[20px] text-sm font-semibold shadow-md shadow-green-500/10 hover:shadow-green-500/20 transform hover:-translate-y-[1px] transition-all flex items-center space-x-1"
            >
              <span>Launch Demo</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-center lg:text-left">
            <div className="inline-flex self-center lg:self-start items-center space-x-2 px-3 py-1 bg-green-500/10 text-primary rounded-full text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Samsung Solve for Tomorrow Hackathon Project</span>
            </div>
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-gray-900 dark:text-white leading-[1.1]">
              Smart Waste Segregation for{" "}
              <span className="bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent">
                Sustainable Campuses
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0">
              AI-powered waste classification, segregation accountability scoring, and campus logistics tracking for a zero-waste, carbon-neutral tomorrow.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-[20px] shadow-lg shadow-green-500/20 hover:shadow-green-500/30 transform hover:-translate-y-0.5 transition-all text-center flex items-center justify-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/dashboard?role=admin"
                className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-[20px] hover:bg-gray-50 dark:hover:bg-gray-800 transform hover:-translate-y-0.5 transition-all text-center flex items-center justify-center space-x-1"
              >
                <span>View Admin Panel</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-green-500/20 to-blue-500/10 rounded-full blur-3xl opacity-50 dark:opacity-30"></div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative p-6 glass-card border border-white/50 dark:border-gray-800/30 rounded-[20px] overflow-hidden"
            >
              {/* Dynamic Scan Interface Simulation */}
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                    <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-xs font-mono text-gray-400">Waste Intelligence Engine v2.1</span>
                </div>

                <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-950 flex items-center justify-center group border border-dashed border-gray-300 dark:border-gray-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80&w=600"
                    alt="Scanned bottle"
                    className="object-cover w-full h-full opacity-80"
                  />
                  <div className="absolute inset-0 border-2 border-primary animate-pulse-slow rounded-xl"></div>
                  <div className="absolute top-4 left-4 bg-primary text-white text-[10px] px-2 py-0.5 rounded font-semibold tracking-wider uppercase shadow">
                    Detecting
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Plastic Bottle</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Detected: Cylindrical Bottle, Cap, Brand Label</p>
                    </div>
                    <span className="px-2 py-0.5 bg-green-500/10 text-primary text-xs font-semibold rounded">
                      Confidence 98%
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <div className="text-gray-400 mb-0.5">Material</div>
                      <div className="font-semibold text-gray-800 dark:text-gray-200">PET Recyclable</div>
                    </div>
                    <div className="p-2.5 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <div className="text-gray-400 mb-0.5">Contamination</div>
                      <div className="font-semibold text-green-500">None Detected</div>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-500/5 text-brand-blue border border-blue-500/10 rounded-xl text-xs flex justify-between items-center">
                    <span>Disposal Guide: <strong>Blue Bin (Dry)</strong></span>
                    <span className="font-bold text-primary">+10 EcoPoints</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Complete Waste Lifecycle Tracker */}
      <section id="lifecycle" className="py-20 bg-gray-50/50 dark:bg-gray-950/20 border-y border-gray-100 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900 dark:text-white">
              The Complete Waste Lifecycle
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Tracing segregated waste from a student's hand back into the circular economy, tracking carbon savings every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative">
            {lifecycleSteps.map((step, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="relative p-6 glass-card rounded-[20px] flex flex-col justify-between min-h-[220px]"
              >
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl w-fit">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-gray-900 dark:text-white">{step.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400">{step.desc}</p>
                  </div>
                </div>
                <div className="mt-4 text-[10px] uppercase font-mono tracking-wider font-semibold text-primary">
                  {step.badge}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-gray-900 dark:text-white">
              Engineered for Real Behavior Change
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Simple classifiers don't change behavior. EcoSort AI implements multi-factor accountability, competition, and operational intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="p-8 glass-card border border-gray-100 dark:border-gray-800 rounded-[20px] flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-950 rounded-xl w-fit">
                    {feat.icon}
                  </div>
                  <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white">{feat.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section id="stats" className="py-20 bg-primary/5 dark:bg-primary/2 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="p-8 md:p-12 glass-panel rounded-[20px] border border-primary/10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {stats.map((stat, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading font-extrabold text-3xl text-gray-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Learn more about the technology stack and features of EcoSort AI.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-gray-200/50 dark:border-gray-800/30 rounded-[20px] overflow-hidden bg-white dark:bg-gray-900/50"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                >
                  <span className="font-heading font-bold text-gray-900 dark:text-white text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-400 transform transition-transform duration-200 ${
                      activeFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-5 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100 dark:border-gray-900 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-primary rounded-lg flex items-center justify-center">
              <Leaf className="h-4 w-4 text-white" />
            </div>
            <span className="font-heading font-bold text-gray-900 dark:text-white">EcoSort AI</span>
          </div>
          <div className="flex space-x-8">
            <a href="#lifecycle" className="hover:text-primary transition-colors">Lifecycle</a>
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
          </div>
          <div>
            &copy; 2026 EcoSort AI. Built for the Climate Change Hackathon.
          </div>
        </div>
      </footer>
    </div>
  );
}
