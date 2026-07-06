"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  ShieldAlert,
  Users,
  LineChart,
  Award,
  Zap,
  Bot,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  AlertTriangle,
  Globe
} from "lucide-react";

// Mock data for charts
const dailyWasteData = [
  { name: "Mon", Dry: 120, Wet: 240, Hazardous: 30 },
  { name: "Tue", Dry: 150, Wet: 210, Hazardous: 25 },
  { name: "Wed", Dry: 180, Wet: 280, Hazardous: 45 },
  { name: "Thu", Dry: 220, Wet: 250, Hazardous: 35 },
  { name: "Fri", Dry: 210, Wet: 300, Hazardous: 40 },
  { name: "Sat", Dry: 140, Wet: 180, Hazardous: 15 },
  { name: "Sun", Dry: 110, Wet: 150, Hazardous: 10 }
];

const categoryData = [
  { name: "Organic/Wet", value: 1610, color: "#22C55E" },
  { name: "Recyclable/Dry", value: 1130, color: "#2563EB" },
  { name: "Hazardous/E-waste", value: 190, color: "#F59E0B" },
  { name: "Sanitary", value: 80, color: "#EF4444" }
];

export default function AdminDashboard() {
  const stats = [
    { title: "Compliance Rate", value: "88.4%", change: "+4.2%", isPositive: true, icon: <Activity className="h-5 w-5 text-green-500" /> },
    { title: "Total Active Users", value: "1,248", change: "+148", isPositive: true, icon: <Users className="h-5 w-5 text-blue-500" /> },
    { title: "Carbon Saved Today", value: "98.2 kg", change: "+12.1%", isPositive: true, icon: <Globe className="h-5 w-5 text-emerald-500" /> },
    { title: "AI Model Accuracy", value: "96.8%", change: "-0.2%", isPositive: false, icon: <Bot className="h-5 w-5 text-purple-500" /> }
  ];

  const forecastingReports = [
    {
      id: "f1",
      target: "Bose Hostel (Block B)",
      prediction: "Bose Hostel will likely exceed the dry waste contamination threshold (+15%) next Wednesday.",
      cause: "High concentration of disposable coffee cups and plastic wrapping mixed in organic bins during mid-term exam week.",
      action: "Deploy automated notification alert + push notifications to Block B students.",
      severity: "High"
    },
    {
      id: "f2",
      target: "Mechanical Eng. Block",
      prediction: "Spike in hazardous e-waste expected on Friday.",
      cause: "Scheduled lab clearing and prototype upgrades. Historic patterns indicate mixing in standard recyclable bins.",
      action: "Dispatch e-waste collection bin to ME Foyer by Thursday afternoon.",
      severity: "Medium"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Admin Panel Header */}
      <div>
        <h2 className="text-2xl font-heading font-extrabold text-gray-900 dark:text-white">
          Campus Control Room, <span className="text-primary font-bold">Admin Dashboard</span>
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Monitor campus compliance indices, analytics, and logistics.</p>
      </div>

      {/* Grid of basic stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="p-5 glass-card border border-gray-105 dark:border-gray-800 rounded-[20px]">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-gray-400 font-semibold">{stat.title}</span>
              <div className="p-1.5 bg-gray-50 dark:bg-gray-950 rounded-lg">
                {stat.icon}
              </div>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-extrabold text-gray-900 dark:text-white">{stat.value}</span>
              <span className={`text-[10px] font-bold flex items-center ${
                stat.isPositive ? "text-green-500" : "text-brand-danger"
              }`}>
                {stat.isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                <span>{stat.change}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Grid for Charts & Heatmap V2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Recharts Waste Weight & Share (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Daily Waste weights (Area Chart) */}
          <div className="p-6 glass-card border border-gray-100 dark:border-gray-800 rounded-[20px] space-y-4">
            <h3 className="font-heading font-bold text-gray-900 dark:text-white text-base">Waste Mass Telemetry (Weekly, kg)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyWasteData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorDry" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorWet" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(107,114,128,0.06)" />
                  <XAxis dataKey="name" stroke="rgba(107,114,128,0.4)" fontSize={10} tickLine={false} />
                  <YAxis stroke="rgba(107,114,128,0.4)" fontSize={10} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#0a0a0a", border: "none", borderRadius: "10px", color: "#fff", fontSize: "11px" }} />
                  <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
                  <Area type="monotone" dataKey="Dry" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#colorDry)" />
                  <Area type="monotone" dataKey="Wet" stroke="#22C55E" strokeWidth={2} fillOpacity={1} fill="url(#colorWet)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Grid for Pie Chart and Heatmap analytics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Share of Waste (Pie Chart) */}
            <div className="p-6 glass-card border border-gray-100 dark:border-gray-800 rounded-[20px] space-y-4">
              <h3 className="font-heading font-bold text-gray-900 dark:text-white text-base">Waste Distribution Share</h3>
              <div className="h-44 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value} kg`} />
                  </PieChart>
                </ResponsiveContainer>
                {/* Custom Legends list */}
                <div className="space-y-1 text-[10px] shrink-0 font-semibold pl-4">
                  {categoryData.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-1.5">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-gray-500">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Campus Heatmap telemetry summaries */}
            <div className="p-6 glass-card border border-gray-100 dark:border-gray-800 rounded-[20px] space-y-4">
              <h3 className="font-heading font-bold text-gray-900 dark:text-white text-base">Heatmap Telemetry</h3>
              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between items-center p-3 bg-red-500/10 border border-red-500/20 text-brand-danger rounded-xl">
                  <div className="space-y-0.5">
                    <div className="font-bold">Most Contaminated Area</div>
                    <div className="text-[10px] text-gray-500">Bose Hostel Block A &bull; Index: 58.1</div>
                  </div>
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                </div>

                <div className="flex justify-between items-center p-3 bg-green-500/10 border border-green-500/20 text-primary rounded-xl">
                  <div className="space-y-0.5">
                    <div className="font-bold">Most Improved Hostel</div>
                    <div className="text-[10px] text-gray-500">Tagore Hostel &bull; +14% weekly index growth</div>
                  </div>
                  <TrendingUp className="h-4 w-4 shrink-0" />
                </div>

                <div className="flex justify-between items-center p-3 bg-blue-500/10 border border-blue-500/20 text-brand-blue rounded-xl">
                  <div className="space-y-0.5">
                    <div className="font-bold">Weekly Campus Trend</div>
                    <div className="text-[10px] text-gray-500">Compliance score rising across 8/10 sectors</div>
                  </div>
                  <LineChart className="h-4 w-4 shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Proactive ML Forecasting (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="p-6 glass-card border border-gray-100 dark:border-gray-800 rounded-[20px] space-y-4 flex-1">
            <div className="flex items-center space-x-2 pb-2 border-b border-gray-100 dark:border-gray-850">
              <Bot className="h-5 w-5 text-primary" />
              <h3 className="font-heading font-bold text-gray-900 dark:text-white text-base">ML Contamination Forecast</h3>
            </div>
            <p className="text-xs text-gray-400">
              Predictive models identifying potential segregation breaches and bin threshold risks up to 7 days out.
            </p>

            <div className="space-y-4 pt-2">
              {forecastingReports.map((report) => (
                <div
                  key={report.id}
                  className="p-4 border border-gray-100 dark:border-gray-850 bg-gray-50/50 dark:bg-gray-950/40 rounded-xl space-y-2 text-xs"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gray-850 dark:text-gray-200">{report.target}</span>
                    <span className={`px-2 py-0.5 rounded-[5px] text-[9px] font-bold uppercase ${
                      report.severity === "High" ? "bg-red-500/10 text-brand-danger" : "bg-yellow-500/10 text-brand-amber"
                    }`}>
                      {report.severity} Risk
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                    🔮 {report.prediction}
                  </p>
                  <div className="text-[10px] text-gray-500 bg-white dark:bg-gray-950 p-2 border border-gray-100 dark:border-gray-850 rounded">
                    <strong>Cause:</strong> {report.cause}
                  </div>
                  <div className="pt-1.5 flex justify-end">
                    <button
                      onClick={() => alert(`Preemptive notification sent to all occupants of ${report.target}`)}
                      className="px-3 py-1 bg-primary hover:bg-primary-dark text-white rounded text-[10px] font-bold shadow hover:shadow-green-500/10 cursor-pointer"
                    >
                      Trigger Preemptive Alert
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
