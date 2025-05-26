
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface WaterfallPlotProps {
  data: Array<{ name: string; value: number }>; // Single value for tumor response
}

export const WaterfallPlot: React.FC<WaterfallPlotProps> = ({ data }) => {
  // For a single bar representing tumor response percentage
  const tumorResponse = data[0]?.value || 0;

  return (
    <div style={{ width: '100%', height: 150 }}>
      <ResponsiveContainer>
        <BarChart
          layout="vertical"
          data={[{ name: "Response", value: tumorResponse }]}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" domain={[-100, 100]} ticks={[-100, -50, 0, 50, 100]} unit="%" />
          <YAxis type="category" dataKey="name" hide />
          <Tooltip 
            formatter={(value: number) => [`${value}%`, "Tumor Size Change"]}
          />
          <Bar dataKey="value" barSize={60}>
             <Cell fill={tumorResponse < 0 ? '#22c55e' : '#ef4444'} /> {/* Green for reduction, Red for growth */}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
