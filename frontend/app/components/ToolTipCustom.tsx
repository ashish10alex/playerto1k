import React from 'react';
import { TooltipProps } from 'recharts';

interface DataPoint {
  opponent: string;
  attempted: number;
  successful: number;
  minutes: number;
}

export const CustomTooltipContent: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as DataPoint;

    return (
      <div className="bg-white p-2 border rounded shadow">
        <p className="font-bold">{`Opponent: ${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
        <p>{`Minutes: ${data.minutes}`}</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltipContent;
