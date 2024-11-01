//import Image from "next/image";
"use client";

import * as React from "react"
import { useState, useEffect } from 'react';

import { ScrollArea } from "@/components/ui/scroll-area"
import { LineComponent } from "./line";
import { MatchItem } from "./match";
//import { RadarComponent } from "./radar";
//import { TableComponent } from "./table";
import { SofaPlayerEmbed } from './sofa';
import { Fixture } from '@/types';
import FixtureStatsComponent from "./components/FixtureStatsComponent";

async function getTeamFixtures(teamIds: number[]): Promise<Fixture[]> {
    const url = `/api/get_team_fixtures`
    let options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "teamIds": teamIds
        })
    }
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Request failed with status: {response.status}`)
    }

    const data: Fixture[] = await response.json()
    return data;
}

async function getFixtureStats(fixtureId: number): Promise<any> {
    const url = `/api/get_fixture_stats?fixtureId=${fixtureId}`
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Request failed with status: {response.status}`)
    }

    const data = await response.json()
    return data;
}

export default function Home() {
    const [selectedFixture, setSelectedFixture] = useState<number | null>(null);
    const [fixtureStats, setFixtureStats] = useState<any>(null);
    const [teamFixtures, setTeamFixtures] = useState<Fixture[]>([]);
    const alNassrTeamId = 2939;
    const portugalTeamId = 27;
    const teamIds = [alNassrTeamId, portugalTeamId]

    useEffect(() => {
        getTeamFixtures(teamIds).then(data => {
            if (data) setTeamFixtures(data)
        })
    }, [])

    const handleMatchClick = async (fixtureId: any) => {
        const fixtureStats = await getFixtureStats(fixtureId);
        setFixtureStats(fixtureStats);
        setSelectedFixture(fixtureId);
    };

    return (
        <div className="flex h-screen">
            <div className="w-80">
                <SofaPlayerEmbed />
            </div>
            <ScrollArea className="h-100 w-80 rounded-md border">
                <div className="p-4">
                    <h4 className="mb-4 text-sm font-bold leading-none">Matches</h4>
                    {teamFixtures.map((data: any) => (
                        <MatchItem
                            key={data.id}
                            fixtureId={data.id}
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
            <div className="flex flex-col flex-grow gap-2">
                <div>
                    <LineComponent />
                </div>
                <div>
                    <FixtureStatsComponent stats={fixtureStats} />
                </div>
            </div>
        </div>
    )
}
