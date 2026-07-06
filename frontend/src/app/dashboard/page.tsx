"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Leaf,
  Sun,
  Moon,
  User,
  Users,
  GraduationCap,
  ShieldCheck,
  ChevronRight,
  LogOut,
  Bell,
  Sparkles
} from "lucide-react";
import StudentDashboard from "@/components/dashboard/StudentDashboard";
import CollectorDashboard from "@/components/dashboard/CollectorDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";

export default function UnifiedDashboardRouter() {
  const [activeRole, setActiveRole] = useState<"student" | "collector" | "admin">("student");
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([
    "Weekly leaderboard finalises in 2 days. Get scanning!",
    "Campus Cafe just added new discount coffee vouchers."
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Set initial role from query parameter if present
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const roleParam = params.get("role");
      if (roleParam === "collector" || roleParam === "admin") {
        setActiveRole(roleParam);
      }
    }
  }, []);

  const handleToggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-light dark:bg-bg-dark transition-colors duration-200">
      {/* Header bar */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-gray-200/50 dark:border-gray-800/30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="p-2 bg-primary rounded-xl flex items-center justify-center">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl tracking-tight text-gray-900 dark:text-white">
                EcoSort <span className="text-primary">AI</span>
              </span>
            </Link>

            {/* Quick role toggler tabs for judges */}
            <div className="hidden md:flex items-center p-1 bg-gray-100 dark:bg-gray-950 border border-gray-200/40 dark:border-gray-850 rounded-[15px]">
              <button
                onClick={() => setActiveRole("student")}
                className={`px-4 py-1.5 rounded-[12px] text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                  activeRole === "student"
                    ? "bg-white dark:bg-gray-900 text-primary shadow"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <GraduationCap className="h-4 w-4" />
                <span>Student</span>
              </button>
              <button
                onClick={() => setActiveRole("collector")}
                className={`px-4 py-1.5 rounded-[12px] text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                  activeRole === "collector"
                    ? "bg-white dark:bg-gray-900 text-primary shadow"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Users className="h-4 w-4" />
                <span>Collector</span>
              </button>
              <button
                onClick={() => setActiveRole("admin")}
                className={`px-4 py-1.5 rounded-[12px] text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
                  activeRole === "admin"
                    ? "bg-white dark:bg-gray-900 text-primary shadow"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <ShieldCheck className="h-4 w-4" />
                <span>Admin Panel</span>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Dark Mode toggle */}
            <button
              onClick={handleToggleTheme}
              className="p-2 bg-gray-100 dark:bg-gray-950 text-gray-500 dark:text-gray-400 hover:text-primary rounded-xl cursor-pointer shadow-sm border border-gray-200/30 dark:border-gray-850"
            >
              {darkMode ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Notification bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 bg-gray-100 dark:bg-gray-950 text-gray-500 dark:text-gray-400 hover:text-primary rounded-xl cursor-pointer shadow-sm border border-gray-200/30 dark:border-gray-850"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full animate-bounce"></span>
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 p-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl shadow-lg text-xs space-y-2 z-50">
                  <div className="font-bold pb-1.5 border-b border-gray-100 dark:border-gray-850 text-gray-900 dark:text-white">
                    Campus Notifications
                  </div>
                  {notifications.map((n, idx) => (
                    <div key={idx} className="py-1 text-gray-600 dark:text-gray-400 leading-normal">
                      &bull; {n}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* User profile dropdown button (mocked) */}
            <div className="flex items-center space-x-2 border-l border-gray-200 dark:border-gray-800 pl-4">
              <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs select-none">
                AS
              </div>
              <span className="hidden md:inline text-xs font-semibold text-gray-850 dark:text-gray-200">
                Ayush Sharma
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile role selection prompt banner */}
      <div className="md:hidden p-3 bg-gray-150 dark:bg-gray-950 flex justify-around text-xs border-b border-gray-200/50 dark:border-gray-800/30">
        <button
          onClick={() => setActiveRole("student")}
          className={`px-3 py-1 rounded font-semibold ${activeRole === "student" ? "bg-primary text-white" : "text-gray-400"}`}
        >
          Student
        </button>
        <button
          onClick={() => setActiveRole("collector")}
          className={`px-3 py-1 rounded font-semibold ${activeRole === "collector" ? "bg-primary text-white" : "text-gray-400"}`}
        >
          Collector
        </button>
        <button
          onClick={() => setActiveRole("admin")}
          className={`px-3 py-1 rounded font-semibold ${activeRole === "admin" ? "bg-primary text-white" : "text-gray-400"}`}
        >
          Admin
        </button>
      </div>

      {/* Main dashboard body */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        <motion.div
          key={activeRole}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          {activeRole === "student" && <StudentDashboard />}
          {activeRole === "collector" && <CollectorDashboard />}
          {activeRole === "admin" && <AdminDashboard />}
        </motion.div>
      </main>
    </div>
  );
}
