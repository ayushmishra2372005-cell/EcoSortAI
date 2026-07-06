"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Clock,
  Navigation,
  QrCode,
  CheckCircle,
  AlertTriangle,
  Upload,
  WifiOff,
  Wifi,
  Database,
  ArrowRight,
  TrendingDown,
  Calendar,
  Lock,
  Compass
} from "lucide-react";
import confetti from "canvas-confetti";

interface CollectionTask {
  id: string;
  student: string;
  hostel: string;
  binStatus: "Full" | "Medium" | "Empty";
  expectedWaste: string;
  verificationStatus: "Pending" | "Verified" | "Contaminated";
}

export default function CollectorDashboard() {
  const [online, setOnline] = useState(true);
  const [activeTaskIndex, setActiveTaskIndex] = useState<number | null>(null);
  const [scanning, setScanning] = useState(false);
  const [verifyingSecurity, setVerifyingSecurity] = useState(false);
  const [securityPass, setSecurityPass] = useState(false);
  const [reportContaminationMode, setReportContaminationMode] = useState(false);
  const [selectedContaminants, setSelectedContaminants] = useState<string[]>([]);
  const [offlineSyncQueue, setOfflineSyncQueue] = useState<Array<{ id: string; action: string; time: string }>>([]);

  const [tasks, setTasks] = useState<CollectionTask[]>([
    { id: "1", student: "Ayush Sharma", hostel: "Tagore Hostel - Room 302", binStatus: "Full", expectedWaste: "Dry (Plastics)", verificationStatus: "Pending" },
    { id: "2", student: "Rohan Verma", hostel: "Tagore Hostel - Room 104", binStatus: "Full", expectedWaste: "Wet (Food scrap)", verificationStatus: "Pending" },
    { id: "3", student: "Karan Johar", hostel: "Raman Hostel - Room 205", binStatus: "Medium", expectedWaste: "Dry (Paper)", verificationStatus: "Pending" },
    { id: "4", student: "Siddharth Sen", hostel: "Bose Hostel - Room 410", binStatus: "Full", expectedWaste: "Hazardous (E-waste)", verificationStatus: "Pending" }
  ]);

  const handleToggleOnline = () => {
    setOnline(!online);
    if (online) {
      console.log("%c[EcoSort AI] Network connection lost. Waste collection continues even during poor network connectivity.", "color: #F59E0B; font-weight: bold;");
    } else {
      console.log("%c[EcoSort AI] Connection restored. Synchronizing offline queue...", "color: #22C55E; font-weight: bold;");
      if (offlineSyncQueue.length > 0) {
        // Sync queue animation
        setTimeout(() => {
          setOfflineSyncQueue([]);
          alert("Offline sync successful! Synchronized items.");
        }, 1500);
      }
    }
  };

  const handleStartScan = (index: number) => {
    setActiveTaskIndex(index);
    setScanning(true);
    setSecurityPass(false);
    setReportContaminationMode(false);
    setSelectedContaminants([]);
  };

  const handleVerifyCollector = () => {
    setScanning(false);
    setVerifyingSecurity(true);

    // Simulate verifying QR + GPS coordinates + Timestamp
    setTimeout(() => {
      setVerifyingSecurity(false);
      setSecurityPass(true);
    }, 2000);
  };

  const handleCompleteCollection = (status: "Verified" | "Contaminated") => {
    if (activeTaskIndex === null) return;

    const task = tasks[activeTaskIndex];
    const updatedTasks = [...tasks];
    updatedTasks[activeTaskIndex].verificationStatus = status;
    setTasks(updatedTasks);
    setActiveTaskIndex(null);

    // If offline, store in sync queue
    if (!online) {
      setOfflineSyncQueue((prev) => [
        ...prev,
        {
          id: String(Date.now()),
          action: `Verify ${task.student} - ${status}`,
          time: new Date().toLocaleTimeString()
        }
      ]);
      console.log("%c[EcoSort AI] Offline Mode: Stored verification log in IndexedDB.", "color: #F59E0B;");
    } else {
      // Confetti for completed collection validation
      confetti({
        particleCount: 50,
        spread: 40,
        colors: ["#22C55E", "#2563EB"]
      });
    }
  };

  const handleCheckboxChange = (val: string) => {
    if (selectedContaminants.includes(val)) {
      setSelectedContaminants(selectedContaminants.filter((c) => c !== val));
    } else {
      setSelectedContaminants([...selectedContaminants, val]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Route and Network Connectivity Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-heading font-extrabold text-gray-900 dark:text-white">
            Today's optimized logistics, <span className="text-primary font-bold">Waste Collector Portal</span>
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage route dispatches and verify student compliance.</p>
        </div>

        {/* Network status toggler */}
        <button
          onClick={handleToggleOnline}
          className={`flex items-center space-x-2 px-4 py-2 border rounded-full text-xs font-semibold shadow transition-all cursor-pointer ${
            online
              ? "bg-green-500/10 border-green-500/20 text-primary"
              : "bg-brand-amber/10 border-brand-amber/20 text-brand-amber animate-pulse"
          }`}
        >
          {online ? (
            <>
              <Wifi className="h-4 w-4" />
              <span>Network State: Online</span>
            </>
          ) : (
            <>
              <WifiOff className="h-4 w-4" />
              <span>Network State: Offline Mode</span>
            </>
          )}
        </button>
      </div>

      {/* Offline message indicator */}
      {!online && (
        <div className="p-3.5 bg-brand-amber/10 border border-brand-amber/20 text-brand-amber rounded-[20px] text-xs flex items-center space-x-2">
          <Database className="h-5 w-5 animate-pulse shrink-0" />
          <span>
            <strong>Offline Mode Active:</strong> Waste collection continues even during poor network connectivity.
            All scans will sync automatically once network state returns online.
          </span>
        </div>
      )}

      {/* Grid for Maps, Tasks and Scanner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Route Optimization & List (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* AI Route Planner Card */}
          <div className="p-6 glass-card border border-gray-100 dark:border-gray-800 rounded-[20px] space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-heading font-bold text-gray-900 dark:text-white text-base">AI Optimized Route</h3>
              <div className="flex items-center space-x-1 text-xs text-primary font-bold">
                <Navigation className="h-4 w-4 animate-bounce" />
                <span>Shortest Path Active</span>
              </div>
            </div>

            {/* Simulated map route */}
            <div className="relative aspect-video rounded-xl bg-gray-100 dark:bg-gray-950 overflow-hidden border border-gray-200 dark:border-gray-800 flex items-center justify-center">
              {/* Graphic design simulation of map */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#808080_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              {/* Paths and Nodes representation */}
              <div className="relative w-full h-full p-4 flex flex-col justify-between">
                <div className="flex justify-between text-[10px] font-mono text-gray-400">
                  <span>GPS Precision: 2.1m</span>
                  <span>Active Node: Tagore Hostel</span>
                </div>
                
                {/* Visualizing route vector */}
                <div className="absolute top-[30%] left-[20%] w-[60%] h-[40%] flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <path
                      d="M 10 50 Q 30 20, 50 50 T 90 50"
                      fill="transparent"
                      stroke="#22C55E"
                      strokeWidth="3"
                      strokeDasharray="4 2"
                    />
                    <circle cx="10" cy="50" r="4" fill="#2563EB" />
                    <circle cx="50" cy="50" r="4" fill="#F59E0B" />
                    <circle cx="90" cy="50" r="4" fill="#22C55E" />
                  </svg>
                  {/* Nodes titles */}
                  <span className="absolute left-[5%] top-[55%] text-[9px] font-bold text-gray-600 dark:text-gray-400">Admin Dispatch</span>
                  <span className="absolute left-[45%] top-[55%] text-[9px] font-bold text-gray-650 dark:text-gray-300">Tagore Hostel</span>
                  <span className="absolute left-[80%] top-[55%] text-[9px] font-bold text-gray-600 dark:text-gray-400">Raman Hostel</span>
                </div>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-gray-50 dark:bg-gray-950 rounded-xl text-center">
                <div className="text-gray-400 mb-0.5">Est Distance</div>
                <div className="font-extrabold text-gray-900 dark:text-white">1.8 km</div>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-950 rounded-xl text-center">
                <div className="text-gray-400 mb-0.5">Fuel Saved</div>
                <div className="font-extrabold text-primary">1.2 Liters</div>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-950 rounded-xl text-center">
                <div className="text-gray-400 mb-0.5">Time Saved</div>
                <div className="font-extrabold text-brand-blue">18 mins</div>
              </div>
            </div>
          </div>

          {/* Todays Queue of students */}
          <div className="p-6 glass-card border border-gray-100 dark:border-gray-800 rounded-[20px] space-y-4">
            <h3 className="font-heading font-bold text-gray-900 dark:text-white text-base">Collections Queue</h3>
            <div className="divide-y divide-gray-100 dark:divide-gray-850">
              {tasks.map((task, idx) => (
                <div key={task.id} className="py-3 flex justify-between items-center text-xs">
                  <div className="space-y-1">
                    <div className="font-bold text-gray-900 dark:text-white">{task.student}</div>
                    <div className="text-[10px] text-gray-400 flex items-center space-x-1">
                      <MapPin className="h-3 w-3 shrink-0" />
                      <span>{task.hostel}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      task.binStatus === "Full" ? "bg-red-500/10 text-brand-danger" : "bg-yellow-500/10 text-brand-amber"
                    }`}>
                      Bin {task.binStatus}
                    </span>
                    {task.verificationStatus === "Pending" ? (
                      <button
                        onClick={() => handleStartScan(idx)}
                        className="px-3.5 py-1.5 bg-primary hover:bg-primary-dark text-white rounded-lg font-bold shadow hover:shadow-green-500/10 transition-all cursor-pointer"
                      >
                        Verify Bins
                      </button>
                    ) : (
                      <span className={`font-bold flex items-center space-x-1 ${
                        task.verificationStatus === "Verified" ? "text-primary" : "text-brand-danger"
                      }`}>
                        <CheckCircle className="h-4 w-4" />
                        <span>{task.verificationStatus}</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Scan Simulator, Security Verification & Offline Sync Queue (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Active Verification Scan panel */}
          <div className="p-6 glass-card border border-gray-100 dark:border-gray-800 rounded-[20px] min-h-[350px] flex flex-col justify-between">
            <div>
              <h3 className="font-heading font-bold text-gray-900 dark:text-white text-base">Verification Hub</h3>
              <p className="text-xs text-gray-400 mt-1">Multi-factor security scans for campus waste accountability validation.</p>
            </div>

            <div className="my-6 flex-1 flex flex-col justify-center items-center">
              {activeTaskIndex !== null ? (
                <div className="w-full space-y-4 text-center">
                  <div className="p-3 bg-gray-55 dark:bg-gray-950 border border-gray-100 dark:border-gray-850 rounded-xl text-xs space-y-1 text-left">
                    <div><strong>Student:</strong> {tasks[activeTaskIndex].student}</div>
                    <div><strong>Expected Waste:</strong> {tasks[activeTaskIndex].expectedWaste}</div>
                    <div><strong>Location:</strong> {tasks[activeTaskIndex].hostel}</div>
                  </div>

                  <AnimatePresence mode="wait">
                    {/* Step 1: Scanner verification request */}
                    {scanning && (
                      <motion.div
                        key="scan-trigger"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="space-y-4"
                      >
                        <div className="w-24 h-24 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto text-primary animate-pulse-slow">
                          <QrCode className="h-12 w-12" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white">Awaiting QR, GPS & Timestamp Proof</h4>
                          <p className="text-[10px] text-gray-400 mt-0.5">Bypasses fake collections with triple proof check.</p>
                        </div>
                        <button
                          onClick={handleVerifyCollector}
                          className="px-5 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold shadow cursor-pointer"
                        >
                          Simulate QR Scan (With GPS check)
                        </button>
                      </motion.div>
                    )}

                    {/* Step 2: Verification loading */}
                    {verifyingSecurity && (
                      <motion.div
                        key="verifying-loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4 py-6"
                      >
                        <Clock className="h-10 w-10 text-brand-blue animate-spin mx-auto" />
                        <div className="space-y-1">
                          <div className="text-xs font-bold text-gray-900 dark:text-white">Verifying Multi-Factor Proofs...</div>
                          <div className="text-[10px] text-gray-400">Matching GPS bounds & Timestamp signatures</div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Action options */}
                    {securityPass && (
                      <motion.div
                        key="pass-options"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-4 text-xs"
                      >
                        {/* Status checks */}
                        <div className="p-3.5 bg-green-500/10 border border-green-500/20 text-primary rounded-xl text-left space-y-1">
                          <div className="font-bold flex items-center space-x-1">
                            <CheckCircle className="h-4 w-4" />
                            <span>Security Handshake Valid!</span>
                          </div>
                          <div className="text-[10px] text-gray-500">
                            GPS Match: <strong>Tagore Hostel (-11.23, 76.54)</strong> &bull; Timestamp Match: <strong>Just Now</strong>
                          </div>
                        </div>

                        {!reportContaminationMode ? (
                          <div className="grid grid-cols-2 gap-3 pt-2">
                            <button
                              onClick={() => setReportContaminationMode(true)}
                              className="px-4 py-2.5 bg-brand-danger/10 text-brand-danger border border-brand-danger/20 hover:bg-brand-danger/20 rounded-xl font-bold cursor-pointer transition-all"
                            >
                              Report Contamination
                            </button>
                            <button
                              onClick={() => handleCompleteCollection("Verified")}
                              className="px-4 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold shadow cursor-pointer transition-all"
                            >
                              Approve Bin
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-3 text-left border border-gray-150 dark:border-gray-850 p-4 rounded-xl">
                            <div className="font-bold text-gray-850 dark:text-gray-200">Select Bin Contaminants:</div>
                            <div className="space-y-1.5">
                              <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={selectedContaminants.includes("organic")}
                                  onChange={() => handleCheckboxChange("organic")}
                                  className="accent-primary"
                                />
                                <span>Food/Liquid residue inside plastic</span>
                              </label>
                              <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={selectedContaminants.includes("plastic-wet")}
                                  onChange={() => handleCheckboxChange("plastic-wet")}
                                  className="accent-primary"
                                />
                                <span>Plastic bag inside organic bin</span>
                              </label>
                              <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={selectedContaminants.includes("e-waste")}
                                  onChange={() => handleCheckboxChange("e-waste")}
                                  className="accent-primary"
                                />
                                <span>Heavy metals / Batteries mixed</span>
                              </label>
                            </div>
                            <div className="pt-2 flex justify-between items-center">
                              <button
                                onClick={() => setReportContaminationMode(false)}
                                className="text-gray-400 hover:underline"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleCompleteCollection("Contaminated")}
                                className="px-4 py-2 bg-brand-danger text-white rounded-lg font-bold shadow hover:bg-red-650 cursor-pointer"
                              >
                                Confirm Contaminated
                              </button>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="text-center text-gray-400 space-y-2">
                  <Compass className="h-10 w-10 mx-auto opacity-55 animate-pulse-slow" />
                  <div className="text-sm font-semibold">Select Collection Point</div>
                  <p className="text-xs max-w-xs mx-auto">
                    Choose a pending collection from the queue, optimize your route path, and begin checking compliance.
                  </p>
                </div>
              )}
            </div>

            <div className="text-[10px] text-gray-400 border-t border-gray-100 dark:border-gray-850 pt-2 flex items-center justify-between">
              <span>Security Method: <strong>GPS Geo-Fence v2.0</strong></span>
              <span>AES-256 encrypted</span>
            </div>
          </div>

          {/* Sync Queue Logs (Visible if items cached offline) */}
          <div className="p-6 glass-card border border-gray-100 dark:border-gray-800 rounded-[20px] space-y-4">
            <h3 className="font-heading font-bold text-gray-900 dark:text-white text-base">IndexedDB Sync Queue</h3>
            {offlineSyncQueue.length > 0 ? (
              <div className="space-y-2.5">
                {offlineSyncQueue.map((item) => (
                  <div key={item.id} className="p-3 bg-gray-50 dark:bg-gray-950 rounded-xl text-xs flex justify-between items-center border-l-2 border-brand-amber">
                    <div>
                      <div className="font-semibold text-gray-850 dark:text-gray-200">{item.action}</div>
                      <div className="text-[9px] text-gray-450">{item.time}</div>
                    </div>
                    <span className="text-[10px] text-brand-amber font-mono font-semibold">Queued (Offline)</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-xs text-gray-400">
                Sync Queue Empty. All logs securely registered to central campus database.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
