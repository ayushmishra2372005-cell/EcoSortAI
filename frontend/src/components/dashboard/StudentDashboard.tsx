"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Bot,
  Flame,
  Award,
  History,
  QrCode,
  Image as ImageIcon,
  Camera,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Gift,
  CheckCircle,
  HelpCircle,
  Send,
  Coffee,
  Book,
  Utensils,
  Share2,
  RefreshCw,
  Info
} from "lucide-react";
import confetti from "canvas-confetti";

interface Presets {
  id: string;
  name: string;
  image: string;
  object: string;
  material: string;
  contamination: "None" | "Liquid" | "Organic Waste" | "E-Waste Mixed";
  bin: "Blue Bin (Dry)" | "Green Bin (Wet)" | "Yellow Bin (Hazardous)";
  points: number;
  carbonSaved: number;
  tip: string;
  explain: string;
}

export default function StudentDashboard() {
  // State variables
  const [ecoPoints, setEcoPoints] = useState(480);
  const [ecoScore, setEcoScore] = useState(84);
  const [carbonSaved, setCarbonSaved] = useState(12.4);
  const [streak, setStreak] = useState(6);
  const [activeTab, setActiveTab] = useState<"scan" | "assistant" | "index" | "rewards" | "history">("scan");
  
  // Scanner state
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<Presets | null>(null);
  const [contaminationWarning, setContaminationWarning] = useState<string | null>(null);
  const [scanHistory, setScanHistory] = useState<Array<{
    id: string;
    item: string;
    bin: string;
    points: string;
    carbon: number;
    time: string;
    status: "Verified" | "Pending" | "Contaminated";
  }>>([
    { id: "1", item: "Aluminum Soda Can", bin: "Blue Bin", points: "+10", carbon: 0.16, time: "Today, 10:14 AM", status: "Verified" },
    { id: "2", item: "Cardboard Packaging", bin: "Blue Bin", points: "+10", carbon: 0.22, time: "Yesterday, 2:30 PM", status: "Verified" },
    { id: "3", item: "Banana Peel", bin: "Green Bin", points: "+10", carbon: 0.05, time: "July 2, 8:15 AM", status: "Verified" },
    { id: "4", item: "Plastic Cup (Contaminated)", bin: "Green Bin", points: "-15", carbon: 0, time: "June 30, 1:12 PM", status: "Contaminated" }
  ]);

  // Chatbot state
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    { sender: "bot", text: "Hi! I am EcoSort AI Assistant. Ask me anything about waste disposal on campus! (e.g., 'Can I recycle a pizza box?')" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Rewards state
  const [vouchers, setVouchers] = useState([
    { id: "v1", title: "Free Coffee Voucher", cost: 150, icon: <Coffee className="h-5 w-5 text-amber-500" />, vendor: "Campus Cafe", code: "COFFEE-FREE" },
    { id: "v2", title: "Library Print Pass ($5)", cost: 200, icon: <Book className="h-5 w-5 text-blue-500" />, vendor: "University Library", code: "PRINT-5" },
    { id: "v3", title: "Cafeteria Discount (25%)", cost: 300, icon: <Utensils className="h-5 w-5 text-green-500" />, vendor: "Main Dining Hall", code: "DINING-25" }
  ]);
  const [redeemedCode, setRedeemedCode] = useState<string | null>(null);

  // Preset images for demo
  const scanPresets: Presets[] = [
    {
      id: "bottle",
      name: "Plastic Water Bottle",
      image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80&w=300",
      object: "Cylindrical Bottle",
      material: "PET Plastic (Type 1)",
      contamination: "None",
      bin: "Blue Bin (Dry)",
      points: 10,
      carbonSaved: 0.08,
      tip: "Remember to screw the cap back on or recycle it separately. Crush the bottle to save space in the bin.",
      explain: "Detected typical cylindrical contours, transparent wall reflectivity, and blue cap structure. No liquid residue present."
    },
    {
      id: "coffee-cup",
      name: "Coffee Paper Cup with Liquid",
      image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=300",
      object: "Disposable Coffee Cup",
      material: "Poly-coated Paperboard",
      contamination: "Liquid",
      bin: "Blue Bin (Dry)",
      points: -15,
      carbonSaved: 0,
      tip: "Empty liquid contents into sink first! The plastic lining prevents typical recycling if soaked with food or drink.",
      explain: "Detected paper cup shape. Heat signatures and density scanner indicate substantial liquid residue remaining (Contamination detected)."
    },
    {
      id: "apple",
      name: "Apple Core",
      image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?auto=format&fit=crop&q=80&w=300",
      object: "Apple fruit remains",
      material: "Organic Cellulose",
      contamination: "None",
      bin: "Green Bin (Wet)",
      points: 10,
      carbonSaved: 0.05,
      tip: "Wet organic waste is dispatched to the campus composting plant, which transforms waste into fertilizer for landscaping.",
      explain: "Detected organic matter matching apple core shape, fibrous pulp material, and stem structure. Composting recommended."
    },
    {
      id: "soda",
      name: "Aluminum Beverage Can",
      image: "https://images.unsplash.com/photo-1527960656366-ee2a999e32e6?auto=format&fit=crop&q=80&w=300",
      object: "Carbonated Soda Can",
      material: "Lacquered Aluminum",
      contamination: "None",
      bin: "Blue Bin (Dry)",
      points: 10,
      carbonSaved: 0.16,
      tip: "Aluminum recycling saves 95% of the energy needed to make new metal from raw bauxite ore.",
      explain: "Detected metal reflectance signature and pull-tab ring top. No organic food contamination present."
    }
  ];

  // Auto scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleScanDemo = (preset: Presets) => {
    setSelectedImage(preset.image);
    setScanning(true);
    setScanResult(null);
    setContaminationWarning(null);

    setTimeout(() => {
      setScanning(false);
      setScanResult(preset);

      if (preset.contamination !== "None") {
        setContaminationWarning(`Warning: ${preset.contamination} contamination detected inside waste!`);
        setEcoScore((prev) => Math.max(0, prev - 8));
        setEcoPoints((prev) => Math.max(0, prev + preset.points));
        
        // Log penalty scan
        setScanHistory((prev) => [
          {
            id: String(Date.now()),
            item: `${preset.name} (${preset.contamination} Contaminated)`,
            bin: preset.bin,
            points: String(preset.points),
            carbon: 0,
            time: "Just now",
            status: "Contaminated"
          },
          ...prev
        ]);
      } else {
        setEcoPoints((prev) => prev + preset.points);
        setEcoScore((prev) => Math.min(100, prev + 2));
        setCarbonSaved((prev) => parseFloat((prev + preset.carbonSaved).toFixed(2)));
        
        // Trigger celebratory confetti for positive scan
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.8 },
          colors: ["#22C55E", "#2563EB", "#F59E0B"]
        });

        // Check if streak milestone is hit
        if (streak === 6) {
          setStreak(7);
          setEcoPoints((prev) => prev + 50); // Streak bonus
          setTimeout(() => {
            confetti({
              particleCount: 150,
              spread: 80,
              colors: ["#FFD700", "#22C55E"]
            });
          }, 300);
        }

        // Log successful scan
        setScanHistory((prev) => [
          {
            id: String(Date.now()),
            item: preset.name,
            bin: preset.bin,
            points: `+${preset.points}`,
            carbon: preset.carbonSaved,
            time: "Just now",
            status: "Verified"
          },
          ...prev
        ]);
      }
    }, 2000);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setChatInput("");

    // Simulate AI response
    setTimeout(() => {
      let botResponse = "";
      const cleaned = userText.toLowerCase();

      if (cleaned.includes("pizza") && (cleaned.includes("box") || cleaned.includes("carton"))) {
        botResponse = "Pizza boxes are highly contaminated with grease/oil. They CANNOT be recycled in the dry bin. Please dispose of oily pizza boxes in the Green Bin (Wet Waste) for industrial composting, or tear off clean lids for the Blue Bin (Dry).";
      } else if (cleaned.includes("cup") || cleaned.includes("coffee")) {
        botResponse = "Single-use coffee cups often have a plastic polyethylene lining. If it is completely clean and empty of liquid, dispose in the Blue Bin (Dry). However, if there are coffee residues, empty them into a drain first. Otherwise, it triggers wet-residue contamination (-15 EcoPoints penalty!).";
      } else if (cleaned.includes("battery") || cleaned.includes("phone") || cleaned.includes("charge")) {
        botResponse = "Electronic items and batteries contain hazardous heavy metals. NEVER throw them in the dry or wet bins. Place them in the Yellow Bin (Hazardous/E-waste) located at the Student Center and Science Buildings.";
      } else if (cleaned.includes("plastic") || cleaned.includes("bottle")) {
        botResponse = "Clean plastic items (bottles, containers, wraps) should go directly into the Blue Bin (Dry). Ensure they are crushed to save volume and caps are replaced.";
      } else if (cleaned.includes("points") || cleaned.includes("score")) {
        botResponse = "You earn 10 EcoPoints for every correct scan. You get a +50 bonus for a 7-day streak. Verifications by collectors add +20 points. Contaminated scans lead to a deduction of 15 points and lower your overall EcoScore.";
      } else {
        botResponse = "I recommend placing standard paper and plastic in the Blue Bin (Dry), organic food scraps in the Green Bin (Wet), and medical/e-waste in the Yellow Bin (Hazardous). If you're not sure, upload a photo in the Scanner tab for direct multi-tag analysis!";
      }

      setChatMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    }, 1000);
  };

  const handleRedeem = (voucher: typeof vouchers[0]) => {
    if (ecoPoints >= voucher.cost) {
      setEcoPoints((prev) => prev - voucher.cost);
      setRedeemedCode(voucher.code);
      confetti({
        particleCount: 50,
        spread: 40,
        colors: ["#22C55E", "#2563EB"]
      });
    } else {
      alert("Insufficient EcoPoints!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Student Portal Headers */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-heading font-extrabold text-gray-900 dark:text-white">
            Good Morning, <span className="text-primary font-bold">Student Portal</span>
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Scan waste, build EcoScore, track carbon savings.</p>
        </div>
        <div className="flex space-x-2">
          {/* Quick status bar */}
          <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-brand-amber/10 border border-brand-amber/20 text-brand-amber rounded-full text-xs font-semibold">
            <Flame className="h-4 w-4" />
            <span>{streak} Day Streak</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-green-500/10 border border-green-500/20 text-primary rounded-full text-xs font-semibold">
            <Award className="h-4 w-4" />
            <span>Tier: Gold Sentinel</span>
          </div>
        </div>
      </div>

      {/* Grid for Score cards & main interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Score & Stats (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* EcoScore Gauge */}
          <div className="p-6 glass-card border border-gray-100 dark:border-gray-800 rounded-[20px] text-center flex flex-col items-center">
            <h3 className="font-heading font-bold text-gray-900 dark:text-white text-base mb-4">Segregation EcoScore</h3>
            <div className="relative h-40 w-40 flex items-center justify-center">
              {/* Semi-circular radial gauge representation */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="rgba(107,114,128,0.1)"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#22C55E"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * ecoScore) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{ecoScore}</span>
                <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Index Score</span>
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-1.5 text-xs text-green-500 font-semibold bg-green-500/10 px-2.5 py-1 rounded-full">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Top 8% on Campus</span>
            </div>
            <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
              Score calculated from segregation correctness, frequency, and collector compliance verifications.
            </p>
          </div>

          {/* Environmental Impact Telemetry */}
          <div className="p-6 glass-card border border-gray-100 dark:border-gray-800 rounded-[20px] space-y-4">
            <h3 className="font-heading font-bold text-gray-900 dark:text-white text-base">Carbon Impact Telemetry</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-950 rounded-xl">
                <div className="text-xs text-gray-400 mb-1">Carbon Offsets</div>
                <div className="text-xl font-extrabold text-primary">{carbonSaved} kg</div>
                <div className="text-[10px] text-gray-500">CO₂ Saved Overall</div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-950 rounded-xl">
                <div className="text-xs text-gray-400 mb-1">EcoPoints Balance</div>
                <div className="text-xl font-extrabold text-brand-blue">{ecoPoints} pts</div>
                <div className="text-[10px] text-gray-500">Redeemable Rewards</div>
              </div>
            </div>
            <div className="p-3.5 bg-blue-500/5 text-brand-blue border border-blue-500/10 rounded-xl text-xs flex items-center space-x-2">
              <Info className="h-4 w-4 shrink-0" />
              <span>Every 0.08 kg of CO₂ saved is equivalent to 1 hour of laptop power offset!</span>
            </div>
          </div>
        </div>

        {/* Right Side: Tab interface (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Menu selection tab bar */}
          <div className="flex border-b border-gray-200 dark:border-gray-800 space-x-6 text-sm font-medium overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab("scan")}
              className={`pb-3 flex items-center space-x-2 border-b-2 whitespace-nowrap transition-all ${
                activeTab === "scan"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-400 hover:text-gray-500"
              }`}
            >
              <Camera className="h-4 w-4" />
              <span>Waste Scanner</span>
            </button>
            <button
              onClick={() => setActiveTab("assistant")}
              className={`pb-3 flex items-center space-x-2 border-b-2 whitespace-nowrap transition-all ${
                activeTab === "assistant"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-400 hover:text-gray-500"
              }`}
            >
              <Bot className="h-4 w-4" />
              <span>EcoSort AI Assistant</span>
            </button>
            <button
              onClick={() => setActiveTab("index")}
              className={`pb-3 flex items-center space-x-2 border-b-2 whitespace-nowrap transition-all ${
                activeTab === "index"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-400 hover:text-gray-500"
              }`}
            >
              <Award className="h-4 w-4" />
              <span>Green Campus Index</span>
            </button>
            <button
              onClick={() => setActiveTab("rewards")}
              className={`pb-3 flex items-center space-x-2 border-b-2 whitespace-nowrap transition-all ${
                activeTab === "rewards"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-400 hover:text-gray-500"
              }`}
            >
              <Gift className="h-4 w-4" />
              <span>Rewards Store</span>
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`pb-3 flex items-center space-x-2 border-b-2 whitespace-nowrap transition-all ${
                activeTab === "history"
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-400 hover:text-gray-500"
              }`}
            >
              <History className="h-4 w-4" />
              <span>Scan Logs</span>
            </button>
          </div>

          {/* Active Tab View */}
          <div className="flex-1 min-h-[380px]">
            <AnimatePresence mode="wait">
              {/* Scan Tab */}
              {activeTab === "scan" && (
                <motion.div
                  key="scan-view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[20px] space-y-6">
                    <div>
                      <h4 className="font-heading font-bold text-gray-900 dark:text-white text-base">
                        Waste Intelligence Scanner
                      </h4>
                      <p className="text-xs text-gray-400">
                        Select a preset simulated waste card to analyze objects, material structures, and potential contamination.
                      </p>
                    </div>

                    {/* Presets List */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {scanPresets.map((preset) => (
                        <button
                          key={preset.id}
                          onClick={() => handleScanDemo(preset)}
                          disabled={scanning}
                          className="flex flex-col items-center p-3 border border-gray-100 dark:border-gray-850 hover:border-primary dark:hover:border-primary rounded-xl text-center space-y-2 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-all cursor-pointer disabled:opacity-50"
                        >
                          <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100 relative">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={preset.image} alt={preset.name} className="object-cover w-full h-full" />
                          </div>
                          <span className="text-[11px] font-semibold text-gray-800 dark:text-gray-200 line-clamp-1">
                            {preset.name}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Scanning Display state */}
                    <div className="border border-dashed border-gray-200 dark:border-gray-800 rounded-xl p-8 flex flex-col items-center justify-center min-h-[220px]">
                      {scanning ? (
                        <div className="text-center space-y-4">
                          <RefreshCw className="h-10 w-10 text-primary animate-spin mx-auto" />
                          <div>
                            <div className="text-sm font-semibold text-gray-900 dark:text-white">Analyzing Object...</div>
                            <div className="text-xs text-gray-400 mt-1">
                              Computing structural contours and material density signatures
                            </div>
                          </div>
                        </div>
                      ) : scanResult ? (
                        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6">
                          {/* Image preview */}
                          <div className="md:col-span-4 flex flex-col items-center justify-center">
                            <div className="w-full max-w-[150px] aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200 dark:border-gray-800 relative">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={selectedImage || ""} alt="Scanned item" className="object-cover w-full h-full" />
                              <div className="absolute inset-0 border-2 border-primary rounded-xl"></div>
                            </div>
                            <span className="mt-2 text-xs font-semibold text-primary">Scan Completed</span>
                          </div>

                          {/* Details */}
                          <div className="md:col-span-8 space-y-3 text-left">
                            <div className="flex justify-between items-center pb-2 border-b border-gray-150 dark:border-gray-800">
                              <div>
                                <h5 className="font-bold text-gray-900 dark:text-white text-base">{scanResult.name}</h5>
                                <span className="text-[10px] text-gray-400 font-mono tracking-tight">{scanResult.explain}</span>
                              </div>
                              <span className="px-2.5 py-0.5 bg-green-500/10 text-primary text-xs font-extrabold rounded-full">
                                Confidence 98%
                              </span>
                            </div>

                            {/* Tags display */}
                            <div className="grid grid-cols-3 gap-2 text-xs">
                              <div className="p-2 bg-gray-50 dark:bg-gray-950 rounded-lg">
                                <div className="text-[10px] text-gray-400 mb-0.5">Object Detect</div>
                                <div className="font-semibold text-gray-800 dark:text-gray-200">{scanResult.object}</div>
                              </div>
                              <div className="p-2 bg-gray-50 dark:bg-gray-950 rounded-lg">
                                <div className="text-[10px] text-gray-400 mb-0.5">Material Struct</div>
                                <div className="font-semibold text-gray-800 dark:text-gray-200">{scanResult.material}</div>
                              </div>
                              <div className="p-2 bg-gray-50 dark:bg-gray-950 rounded-lg">
                                <div className="text-[10px] text-gray-400 mb-0.5">Contaminated?</div>
                                <div className={`font-semibold ${scanResult.contamination === "None" ? "text-green-500" : "text-brand-danger"}`}>
                                  {scanResult.contamination}
                                </div>
                              </div>
                            </div>

                            {/* Contamination Alert banner */}
                            {contaminationWarning && (
                              <div className="p-3 bg-brand-danger/10 border border-brand-danger/20 text-brand-danger rounded-xl text-xs flex items-center space-x-2 animate-bounce">
                                <AlertTriangle className="h-4 w-4 shrink-0" />
                                <span>{contaminationWarning} <strong>EcoScore reduced by -8!</strong></span>
                              </div>
                            )}

                            {/* Educational Tip & Points display */}
                            <div className="p-3.5 bg-primary/5 text-primary-dark dark:text-green-400 border border-primary/10 rounded-xl text-xs space-y-1.5">
                              <div className="flex justify-between items-center font-bold">
                                <span>Disposal: Place in <span className="underline">{scanResult.bin}</span></span>
                                <span className={scanResult.points > 0 ? "text-green-500" : "text-red-500"}>
                                  {scanResult.points > 0 ? `+${scanResult.points} EcoPoints` : `${scanResult.points} EcoPoints`}
                                </span>
                              </div>
                              <p className="text-[11px] leading-relaxed text-gray-500 dark:text-gray-400">
                                💡 <strong>Tip:</strong> {scanResult.tip}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center space-y-2 text-gray-400">
                          <HelpCircle className="h-10 w-10 mx-auto opacity-50" />
                          <div className="text-sm font-semibold">Ready to Scan</div>
                          <p className="text-xs max-w-xs mx-auto">
                            Click on any preset card above to upload an image and let the Waste Intelligence Engine run classification.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* EcoSort AI Assistant Tab */}
              {activeTab === "assistant" && (
                <motion.div
                  key="assistant-view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[20px] flex flex-col h-[400px]">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-800">
                      <div className="flex items-center space-x-2">
                        <div className="p-1.5 bg-primary rounded-lg text-white">
                          <Bot className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-900 dark:text-white">EcoSort AI Assistant</h4>
                          <span className="text-[10px] text-green-500 font-semibold">Online & ready to guide</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-400">Powered by Gemini</span>
                    </div>

                    {/* Messages Body */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs no-scrollbar">
                      {chatMessages.map((msg, idx) => (
                        <div
                          key={idx}
                          className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[75%] p-3.5 rounded-[20px] ${
                              msg.sender === "user"
                                ? "bg-primary text-white rounded-tr-none"
                                : "bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-200/40 dark:border-gray-850"
                            }`}
                          >
                            <p className="leading-relaxed">{msg.text}</p>
                          </div>
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>

                    {/* Chat Input */}
                    <div className="flex items-center space-x-2 pt-3 border-t border-gray-100 dark:border-gray-800">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                        placeholder="Can I recycle a pizza box?..."
                        className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-950 text-xs rounded-xl focus:outline-none border border-gray-200/50 dark:border-gray-850 focus:border-primary text-gray-800 dark:text-white"
                      />
                      <button
                        onClick={handleSendMessage}
                        className="p-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl shadow-md hover:shadow-green-500/10 cursor-pointer"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Green Campus Index Leaderboard */}
              {activeTab === "index" && (
                <motion.div
                  key="index-view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[20px] space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800">
                      <div>
                        <h4 className="font-heading font-bold text-gray-900 dark:text-white text-base">
                          Green Campus Index
                        </h4>
                        <p className="text-xs text-gray-400">Hostels and Departments competition ESG ranking.</p>
                      </div>
                      <span className="text-xs font-semibold text-primary">Live Update</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Hostels ranking */}
                      <div className="space-y-3">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Top Hostels</div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-950 rounded-xl text-xs border-l-4 border-green-500">
                            <span className="font-semibold text-gray-900 dark:text-white">1. Tagore Hostel</span>
                            <span className="font-bold text-primary">Index: 94.2</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-950 rounded-xl text-xs border-l-4 border-yellow-500">
                            <span className="font-semibold text-gray-900 dark:text-white">2. Raman Hostel</span>
                            <span className="font-bold text-brand-amber">Index: 82.5</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-950 rounded-xl text-xs border-l-4 border-red-500">
                            <span className="font-semibold text-gray-900 dark:text-white">3. Bose Hostel</span>
                            <span className="font-bold text-brand-danger">Index: 58.1</span>
                          </div>
                        </div>
                      </div>

                      {/* Departments ranking */}
                      <div className="space-y-3">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Top Departments</div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-950 rounded-xl text-xs border-l-4 border-green-500">
                            <span className="font-semibold text-gray-900 dark:text-white">1. Computer Science</span>
                            <span className="font-bold text-primary">Index: 91.8</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-950 rounded-xl text-xs border-l-4 border-green-500">
                            <span className="font-semibold text-gray-900 dark:text-white">2. Biotechnology</span>
                            <span className="font-bold text-primary">Index: 89.4</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-950 rounded-xl text-xs border-l-4 border-yellow-500">
                            <span className="font-semibold text-gray-900 dark:text-white">3. Mechanical Eng</span>
                            <span className="font-bold text-brand-amber">Index: 74.0</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Rewards Store Tab */}
              {activeTab === "rewards" && (
                <motion.div
                  key="rewards-view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[20px] space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800">
                      <div>
                        <h4 className="font-heading font-bold text-gray-900 dark:text-white text-base">
                          Redeem EcoPoints
                        </h4>
                        <p className="text-xs text-gray-400">Trade EcoPoints for discount vouchers across campus outlets.</p>
                      </div>
                      <span className="text-xs font-semibold text-brand-blue">{ecoPoints} Points Available</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {vouchers.map((voucher) => (
                        <div
                          key={voucher.id}
                          className="p-5 border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/40 rounded-xl flex flex-col justify-between"
                        >
                          <div className="space-y-3">
                            <div className="p-2.5 bg-white dark:bg-gray-900 rounded-lg w-fit shadow-sm">
                              {voucher.icon}
                            </div>
                            <div>
                              <h5 className="font-bold text-sm text-gray-900 dark:text-white">{voucher.title}</h5>
                              <p className="text-[10px] text-gray-400 mt-0.5">{voucher.vendor}</p>
                            </div>
                          </div>
                          <div className="mt-5 space-y-2">
                            <div className="text-xs font-bold text-primary">{voucher.cost} EcoPoints</div>
                            <button
                              onClick={() => handleRedeem(voucher)}
                              disabled={ecoPoints < voucher.cost}
                              className="w-full py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-xs font-semibold shadow hover:shadow-green-500/10 cursor-pointer disabled:opacity-50 disabled:bg-gray-300 dark:disabled:bg-gray-800"
                            >
                              Redeem Voucher
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {redeemedCode && (
                      <div className="p-4 bg-green-500/10 text-primary border border-green-500/20 rounded-xl text-xs space-y-2">
                        <div className="font-bold flex items-center space-x-1">
                          <CheckCircle className="h-4 w-4" />
                          <span>Voucher Redeemed Successfully!</span>
                        </div>
                        <p className="text-[11px] text-gray-600 dark:text-gray-450">
                          Show this code at checkout to claim your reward: <strong className="font-mono text-sm tracking-wider underline">{redeemedCode}</strong>
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* History Scan logs */}
              {activeTab === "history" && (
                <motion.div
                  key="history-view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[20px] space-y-4">
                    <h4 className="font-heading font-bold text-gray-900 dark:text-white text-base">Recent Activity</h4>
                    <div className="divide-y divide-gray-100 dark:divide-gray-850">
                      {scanHistory.map((log) => (
                        <div key={log.id} className="py-3 flex justify-between items-center text-xs">
                          <div className="space-y-1">
                            <div className="font-semibold text-gray-900 dark:text-white">{log.item}</div>
                            <div className="text-[10px] text-gray-400">
                              Disposed in {log.bin} &bull; {log.time}
                            </div>
                          </div>
                          <div className="text-right space-y-1">
                            <div className={`font-bold ${log.points.startsWith("+") ? "text-green-500" : "text-brand-danger"}`}>
                              {log.points} Points
                            </div>
                            {log.carbon > 0 && (
                              <div className="text-[9px] font-semibold text-brand-blue">
                                -{log.carbon} kg CO₂ saved
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
