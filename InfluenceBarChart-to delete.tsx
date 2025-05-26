
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface InfluenceBarChartProps {
  data: Array<{ category: string; importance: number }>;
}

const COLORS = ['#3b82f6', '#22c55e', '#f97316', '#8b5cf6']; // Blue, Green, Orange, Purple

export const InfluenceBarChart: React.FC<InfluenceBarChartProps> = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 250 }}>
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" domain={[0, 100]} unit="%" />
          <YAxis type="category" dataKey="category" width={80} />
          <Tooltip formatter={(value: number) => [`${value}%`, "Importance"]}/>
          {/* <Legend /> // Optional */}
          <Bar dataKey="importance" barSize={20}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
