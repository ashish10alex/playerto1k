'use client';

import React from 'react';
import { Separator } from "@/components/ui/separator"
import { format } from 'date-fns';

interface MatchItemProps {
    team1: string;
    team1_logo: string;
    team2: string;
    team2_logo: string;
    goals: string;
    date: Date;
    status: string;
    onClick: (team1: string, team2: string) => void;
}

export const MatchItem: React.FC<MatchItemProps> = ({ team1, team1_logo, team2, team2_logo, goals, date, status, onClick }) => {
  const formattedDate = format(date, 'EEE, d MMM');
  const formattedTime = format(date, 'HH:mm');

  return (
    <React.Fragment>
      <div
        className="flex justify-between items-center cursor-pointer hover:bg-gray-100 p-2"
        onClick={() => onClick(team1, team2)}
      >
        <div className="flex flex-col">
          <span className="text-sm">{team1}</span>
          <span className="text-sm">{team2}</span>
        </div>
        <div className="flex items-center">

          { status === 'NS' ? (
              <span className="text-sm mr-4"></span>
          ) : (
              <span className="text-sm mr-4">{goals}</span>
          )}

          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-500">{formattedDate}</span>
            <span className="text-xs text-gray-500">{formattedTime}</span>
          </div>
        </div>
      </div>
      <Separator className="my-2" />
    </React.Fragment>
  );
};

export default MatchItem;
