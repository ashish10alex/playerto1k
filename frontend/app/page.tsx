//import Image from "next/image";
"use client";

import * as React from "react"
import { useState, useEffect } from 'react';

import { ScrollArea } from "@/components/ui/scroll-area"
import { LineComponent } from "./line";
import { MatchItem } from "./match";
import { RadarComponent } from "./radar";
import { TableComponent } from "./table";
import { SofaPlayerEmbed } from './sofa';

type Fixture = {
    id: number;
    season: number;
    date: string;
    homeTeamId: number;
    homeTeamName: string;
    homeTeamLogo: string;
    awayTeamId: number;
    awayTeamName: string;
    awayTeamLogo: string;
    goals: string;
    statusShort: string;
}


async function getTeamFixtures(teamId: number): Promise<Fixture[]> {
    const url = `/api/get_team_fixtures/?teamId=${teamId}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Fixture[] = await response.json();
    console.log(data);

    return data
}

export default function Home() {
    const [selectedMatch, setSelectedMatch] = useState<string>("");
    const [teamFixtures, setTeamFixtures] = useState<Fixture[]>([]);
    const alNassrTeamId = 2939

    useEffect(() => {
        getTeamFixtures(alNassrTeamId).then(data => {
            if (data) setTeamFixtures(data)
        })
    }, [])



    const handleMatchClick = (match: string) => {
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
                    {teamFixtures.map((data:any) => (
                        <MatchItem
                            key={data.id}
                            homeTeam={data.homeTeamName}
                            homeTeamLogo={data.homeTeamLogo}
                            awayTeam={data.awayTeamName}
                            awayTeamLogo={data.awayTeamLogo}
                            goals={data.goals}
                            date={new Date(data.date)}
                            status={data.statusShort}
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
