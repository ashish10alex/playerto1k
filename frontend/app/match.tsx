//'use client';
//
//import React from 'react';
//import { Separator } from "@/components/ui/separator"
//
//interface MatchItemProps {
//  match: string;
//  onClick: (match: string) => void;
//}
//
//export const MatchItem: React.FC<MatchItemProps> = ({ match, onClick }) => {
//  return (
//    <React.Fragment>
//      <div
//        className="text-sm cursor-pointer hover:bg-gray-100"
//        onClick={() => onClick(match)}
//      >
//        {match}
//      </div>
//      <Separator className="my-2" />
//    </React.Fragment>
//  );
//};
//
//export default MatchItem;
//
'use client';

import React from 'react';
import { Separator } from "@/components/ui/separator"

interface MatchItemProps {
  team1: string;
  team2: string;
  expectedGoals: number;
  onClick: (team1: string, team2: string) => void;
}

export const MatchItem: React.FC<MatchItemProps> = ({ team1, team2, expectedGoals, onClick }) => {
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
        <div className="flex flex-col items-end">
          <span className="text-sm">{expectedGoals}</span>
        </div>
      </div>
      <Separator className="my-2" />
    </React.Fragment>
  );
};

export default MatchItem;
