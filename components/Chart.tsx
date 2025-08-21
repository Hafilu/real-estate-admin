"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Define the shape of your data
type ChartData = {
  name: string;
  revenue: number;
};

export default function Chart({ data }: { data: ChartData[] }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm md:h-[calc(100vh-210px)] h-80">
      <h1 className="mb-2 text-lg font-semibold">Revenue</h1>
      <div className="w-full h-full p-4 focus:outline-none focus:ring-0" tabIndex={-1}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#6366f1"
              fillOpacity={1}
              fill="url(#colorRev)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
