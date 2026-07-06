"use client";

import { useEffect } from "react";

export default function SWRegister() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((reg) => {
            console.log("[EcoSort AI] Service Worker registered successfully:", reg.scope);
          })
          .catch((err) => {
            console.error("[EcoSort AI] Service Worker registration failed:", err);
          });
      });
    }

    // Monitor connectivity status for visual toast logging
    const handleOffline = () => {
      console.log("%c[EcoSort AI] Network connection lost. Waste collection continues even during poor network connectivity.", "color: #F59E0B; font-weight: bold;");
    };

    const handleOnline = () => {
      console.log("%c[EcoSort AI] Connection restored. Synchronizing offline queue...", "color: #22C55E; font-weight: bold;");
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return null;
}
