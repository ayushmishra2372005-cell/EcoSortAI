"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Leaf,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Users,
  GraduationCap
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "collector" | "admin">("student");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    // Simulate login redirect
    setTimeout(() => {
      setLoading(false);
      router.push(`/dashboard?role=${role}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-light dark:bg-bg-dark px-6 py-12 transition-colors duration-200">
      <div className="absolute inset-0 bg-gradient-to-tr from-green-500/10 to-blue-500/5 blur-3xl pointer-events-none opacity-40"></div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 glass-card border border-white/50 dark:border-gray-800/30 rounded-[20px] relative z-10"
      >
        <div className="flex flex-col items-center mb-8 text-center">
          <Link href="/" className="flex items-center space-x-2 mb-4">
            <div className="p-2.5 bg-primary rounded-xl flex items-center justify-center shadow-md shadow-green-500/10">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight text-gray-900 dark:text-white">
              EcoSort <span className="text-primary">AI</span>
            </span>
          </Link>
          <h2 className="text-xl font-heading font-extrabold text-gray-900 dark:text-white">
            Welcome to the Campus Grid
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Access your student EcoScore, collector routes, or control room analytics.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Role selector */}
          <div className="space-y-2">
            <label className="font-semibold text-gray-550 dark:text-gray-400">Select Campus Role</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`p-3 border rounded-xl flex flex-col items-center justify-center space-y-1 cursor-pointer transition-all ${
                  role === "student"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-gray-250 dark:border-gray-800 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900/50"
                }`}
              >
                <GraduationCap className="h-4 w-4" />
                <span className="font-bold text-[10px]">Student</span>
              </button>
              <button
                type="button"
                onClick={() => setRole("collector")}
                className={`p-3 border rounded-xl flex flex-col items-center justify-center space-y-1 cursor-pointer transition-all ${
                  role === "collector"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-gray-250 dark:border-gray-800 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900/50"
                }`}
              >
                <Users className="h-4 w-4" />
                <span className="font-bold text-[10px]">Collector</span>
              </button>
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`p-3 border rounded-xl flex flex-col items-center justify-center space-y-1 cursor-pointer transition-all ${
                  role === "admin"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-gray-250 dark:border-gray-800 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900/50"
                }`}
              >
                <ShieldCheck className="h-4 w-4" />
                <span className="font-bold text-[10px]">Admin</span>
              </button>
            </div>
          </div>

          {/* Email input */}
          <div className="space-y-1">
            <label className="font-semibold text-gray-550 dark:text-gray-400">Email Address</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3.5 h-4 w-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ayush@university.edu"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-950 rounded-xl focus:outline-none border border-gray-200/50 dark:border-gray-850 focus:border-primary text-gray-850 dark:text-white"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="space-y-1">
            <label className="font-semibold text-gray-550 dark:text-gray-400">Password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 h-4 w-4 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-950 rounded-xl focus:outline-none border border-gray-200/50 dark:border-gray-850 focus:border-primary text-gray-850 dark:text-white"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold shadow-md hover:shadow-green-500/10 cursor-pointer flex items-center justify-center space-x-2 text-[13px] disabled:opacity-50"
            >
              {loading ? (
                <span>Entering Portal...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-850"></div>
          </div>
          <span className="relative bg-white dark:bg-gray-900 px-3 text-[10px] text-gray-400 uppercase font-bold tracking-wider">
            Or Sign In With
          </span>
        </div>

        {/* Simulated Google Button */}
        <button
          onClick={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              router.push(`/dashboard?role=${role}`);
            }, 1000);
          }}
          className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-850 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 border border-gray-200/30 dark:border-gray-850 cursor-pointer"
        >
          {/* Simple simulated google logo icon */}
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5.04c1.62 0 3.08.56 4.22 1.64l3.15-3.15C17.45 1.68 14.92 1 12 1 7.35 1 3.39 3.65 1.48 7.5l3.86 3C6.26 7.64 8.87 5.04 12 5.04z"
            />
            <path
              fill="#4285F4"
              d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.44c-.28 1.48-1.11 2.73-2.36 3.57l3.66 2.84c2.14-1.98 3.75-4.88 3.75-8.56z"
            />
            <path
              fill="#FBBC05"
              d="M5.34 14.5c-.24-.73-.38-1.5-.38-2.3c0-.8.14-1.57.38-2.3L1.48 6.9C.53 8.78 0 10.87 0 13c0 2.13.53 4.22 1.48 6.1l3.86-3.6z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.66-2.84c-1.01.68-2.31 1.08-4.3 1.08-3.13 0-5.74-2.6-6.66-5.46L1.48 16.5C3.39 20.35 7.35 23 12 23z"
            />
          </svg>
          <span>Google Account</span>
        </button>

        <p className="text-[10px] text-center text-gray-500 mt-6">
          Authorized personnel only. Credentials managed by single sign-on security.
        </p>
      </motion.div>
    </div>
  );
}
