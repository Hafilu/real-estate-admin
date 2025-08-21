"use client";
import Card from "@/components/Card";
import { summary, chartData } from "@/lib/data";
import dynamic from "next/dynamic";

// Lazy load your Chart
const Chart = dynamic(() => import("../components/Chart"), {
  ssr: false,
  loading: () => <p>Loading chart...</p>,
});

export default function Page() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card bgImage="/properties.svg" className="bg-[#E0F2FE]">
          <div className="text-sm text-gray-700">Total Properties</div>
          <div className="text-2xl font-bold">{summary.properties}</div>
        </Card>
        <Card bgImage="/agent.svg" className="bg-[#ead7ff]">
          <div className="text-sm text-gray-700">Total Agents</div>
          <div className="text-2xl font-bold">{summary.agents}</div>
        </Card>
        <Card bgImage="/money.svg" className="bg-[#e1f5e4]">
          <div className="text-sm text-gray-700">Revenue</div>
          <div className="text-2xl font-bold">
            ₹{summary.revenue.toLocaleString()}
          </div>
        </Card>
      </div>

      <Chart data={chartData} />
    </div>
  );
}
