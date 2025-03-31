"use client";

export function LineChart() {
  // This is a placeholder component for a line chart
  // In a real app, you would use a charting library like Chart.js, Recharts, or D3
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#F9F9FA] rounded-md">
      <svg width="100%" height="100%" viewBox="0 0 100 50">
        <polyline
          fill="none"
          stroke="#0071E3"
          strokeWidth="2"
          points="0,40 10,35 20,30 30,20 40,25 50,15 60,20 70,10 80,5 90,15 100,10"
        />
        <g fill="#0071E3">
          <circle cx="0" cy="40" r="1.5" />
          <circle cx="10" cy="35" r="1.5" />
          <circle cx="20" cy="30" r="1.5" />
          <circle cx="30" cy="20" r="1.5" />
          <circle cx="40" cy="25" r="1.5" />
          <circle cx="50" cy="15" r="1.5" />
          <circle cx="60" cy="20" r="1.5" />
          <circle cx="70" cy="10" r="1.5" />
          <circle cx="80" cy="5" r="1.5" />
          <circle cx="90" cy="15" r="1.5" />
          <circle cx="100" cy="10" r="1.5" />
        </g>
      </svg>
    </div>
  );
}

export function BarChart() {
  // This is a placeholder component for a bar chart
  return (
    <div className="w-full h-full flex items-end justify-between gap-1 bg-[#F9F9FA] rounded-md p-2">
      {[35, 45, 30, 50, 60, 40, 70].map((height, i) => (
        <div
          key={i}
          className="bg-[#0071E3] rounded-t-sm opacity-80 hover:opacity-100 transition-opacity"
          style={{ height: `${height}%`, width: "12%" }}
        ></div>
      ))}
    </div>
  );
}

export function PieChart() {
  // This is a placeholder component for a pie chart
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="#F2F2F7" />
        <path d="M50,50 L50,10 A40,40 0 0,1 83.6,73.6 Z" fill="#0071E3" />
        <path d="M50,50 L83.6,73.6 A40,40 0 0,1 16.4,73.6 Z" fill="#34C759" />
        <path d="M50,50 L16.4,73.6 A40,40 0 0,1 50,10 Z" fill="#FF9500" />
      </svg>
    </div>
  );
}

export function DonutChart() {
  // This is a placeholder component for a donut chart
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#F2F2F7"
          strokeWidth="10"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#0071E3"
          strokeWidth="10"
          strokeDasharray="188.5 251.3"
          transform="rotate(-90 50 50)"
        />
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#1C1C1E"
          fontSize="16"
          fontWeight="bold"
        >
          75%
        </text>
      </svg>
    </div>
  );
}
