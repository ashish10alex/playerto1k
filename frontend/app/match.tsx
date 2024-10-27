'use client';
import React from 'react';
import Image from 'next/image';
import { Separator } from "@/components/ui/separator"
import { format } from 'date-fns';

interface MatchItemProps {
    homeTeam: string;
    homeTeamLogo: string;
    awayTeam: string;
    awayTeamLogo: string;
    goals: string;
    date: Date;
    status: string;
    onClick: (team1: string, team2: string) => void;
}

export const MatchItem: React.FC<MatchItemProps> = ({ homeTeam, homeTeamLogo, awayTeam, awayTeamLogo, goals, date, status, onClick }) => {
  const formattedDate = format(date, 'EEE, d MMM');
  const formattedTime = format(date, 'HH:mm');

  return (
    <React.Fragment>
      <div
        className="flex justify-between items-center cursor-pointer hover:bg-gray-100 p-2"
        onClick={() => onClick(homeTeam, awayTeam)}
      >
        <div className="flex flex-col">
          <div className="flex items-center">
            <Image src={homeTeamLogo} alt={`${homeTeam} logo`} width={20} height={20} className="mr-2" />
            <span className="text-sm">{homeTeam}</span>
          </div>
          <div className="flex items-center mt-1">
            <Image src={awayTeamLogo} alt={`${awayTeam} logo`} width={20} height={20} className="mr-2" />
            <span className="text-sm">{awayTeam}</span>
          </div>
        </div>
        <div className="flex items-center">
          {status === 'NS' ? (
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
