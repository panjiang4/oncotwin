
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TimeToProgressionChartProps {
  // Example data structure:
  // data = [
  //   { month: 0, scenario1: 100, scenario2: 100 },
  //   { month: 3, scenario1: 90, scenario2: 85 }, ...
  // ]
  data: Array<Record<string, number>>; // Each object has 'month' and then keys for each scenario's survival %
  scenarios: Array<{key: string, name: string, color: string}>; // e.g. {key: 'scenario1', name: 'FOLFOX', color: '#8884d8'}
}

export const TimeToProgressionChart: React.FC<TimeToProgressionChartProps> = ({ data, scenarios }) => {
  if (!data || data.length === 0 || !scenarios || scenarios.length === 0) {
    return <p className="text-sm text-neutral-dark p-4 text-center">Time-to-Progression data not available for charting.</p>;
  }
  
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" type="number" label={{ value: 'Months', position: 'insideBottomRight', offset: -5 }} unit="m" />
          <YAxis label={{ value: 'Progression-Free (%)', angle: -90, position: 'insideLeft' }} unit="%" domain={[0,100]} />
          <Tooltip formatter={(value: number) => [`${value}%`, "Progression-Free"]}/>
          <Legend />
          {scenarios.map(scenario => (
             <Line 
                key={scenario.key} 
                type="monotone" 
                dataKey={scenario.key} 
                name={scenario.name} 
                stroke={scenario.color} 
                activeDot={{ r: 8 }} 
             />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
