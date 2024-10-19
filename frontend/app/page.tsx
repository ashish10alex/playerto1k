//import Image from "next/image";
"use client";

import * as React from "react"
import { useState } from 'react';

import { ScrollArea } from "@/components/ui/scroll-area"
import { LineComponent } from "./line";
import { MatchItem } from "./match";
import { RadarComponent } from "./radar";
import { footballMatches } from "./footballMatches";
import { TableComponent } from "./table";
import { SofaPlayerEmbed } from './sofa';


export default function Home() {
    const [selectedMatch, setSelectedMatch] = useState<string>("Al Nassr vs Al Hilal: 1");


    const handleMatchClick = (match: string) => {
        console.log(`Clicked on match: ${match}`);
        setSelectedMatch(match);
    };




    return (
        <div className="flex h-screen">
            <div className="w-80">
                <SofaPlayerEmbed />
            </div>
            <ScrollArea className="h-100 w-80 rounded-md border">
                <div className="p-4">
                    <h4 className="mb-4 text-sm font-bold leading-none">Matches</h4>
                    {footballMatches.map((data) => (
                        <MatchItem
                            key={data.team1 + " vs " + data.team2}
                            team1={data.team1}
                            team2={data.team2}
                            expectedGoals={data.expectedGoals}
                            onClick={handleMatchClick}
                        />
                    ))}
                </div>
            </ScrollArea>
            <div className="flex flex-col flex-grow">
                <div className="flex-grow">
                    <LineComponent />
                </div>
                <div className="flex-1">
                    <TableComponent />
                </div>
                <div className="flex-1">
                    <RadarComponent selectedMatch={selectedMatch} />
                </div>
            </div>
        </div>
    )
}
