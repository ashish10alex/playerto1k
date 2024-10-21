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


async function getTeamFixtures(teamId: number) {
    const response = await fetch(`/api/get_team_fixtures?team_id=${teamId}`)
    let output = await response.json()
    let fixtures = [];

    for (let i = 0; i < output.response.length; i++) {
        let status = output.response[i].fixture.status.short;
        let goals = "";
        if ((status === "FT" || status === "HT" || status === "PN") &&  output.response[i].goals.home !== null && output.response[i].goals.away !== null) {
            goals = output.response[i].goals.home + " - " + output.response[i].goals.away
        }else{
            goals = ""
        }

        fixtures.push({
            fixture_date: output.response[i].fixture.date,
            team1: output.response[i].teams.home.name,
            team1_logo: output.response[i].teams.home.logo,
            team2: output.response[i].teams.away.name,
            team2_logo: output.response[i].teams.away.logo,
            goals: goals,
            status: output.response[i].fixture.status.short,
            key: output.response[i].fixture.id
        })
    }
    fixtures.sort((a, b) => new Date(a.fixture_date).getTime() - new Date(b.fixture_date).getTime())
    return fixtures
}

export default function Home() {
    const [selectedMatch, setSelectedMatch] = useState<string>("");
    const [teamFixtures, setTeamFixtures] = useState<any>([])
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
                            key={data.key}
                            team1={data.team1}
                            team1_logo={data.team1_logo}
                            team2={data.team2}
                            team2_logo={data.team2_logo}
                            goals={data.goals}
                            date={data.fixture_date}
                            status={data.status}
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
