"use client";

import { useState } from "react";
import BarChartCompanies from "./components/BarChartCompanies";
import DataTableView from "./components/DataTableView";

export default function Home() {
  const [tab, setTab] = useState<"chart" | "table">("table");

  return (
    <div className="min-h-screen p-5">
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            tab === "table" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("table")}
        >
          Table View
        </button>
        <button
          className={`px-4 py-2 rounded ${
            tab === "chart" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setTab("chart")}
        >
          Chart View
        </button>
      </div>
          
      <main className="w-full">
        {tab === "chart" ? <BarChartCompanies /> : <DataTableView />}
      </main>
    </div>
  );
}
