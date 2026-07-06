import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import SWRegister from "@/components/SWRegister";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "EcoSort AI - Smart Waste Segregation & Accountability Platform",
  description: "AI-powered waste classification, segregation accountability, ESG gamification, and route logistics for carbon-neutral smart campus environments.",
  keywords: ["Smart Waste Segregation", "AI Waste Classifier", "Campus Sustainability", "EcoScore", "Carbon Impact", "SaaS Waste Management"],
  authors: [{ name: "EcoSort AI Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-full font-body bg-bg-light text-text-primary-light dark:bg-bg-dark dark:text-text-primary-dark transition-colors duration-200">
        <SWRegister />
        {children}
      </body>
    </html>
  );
}
