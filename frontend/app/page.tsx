"use client";

import * as React from "react"
import { useState, useEffect } from 'react';

import { ScrollArea } from "@/components/ui/scroll-area"
import { LineComponent } from "./line";
import { MatchItem } from "./match";
import { SofaPlayerEmbed } from './sofa';
import { Fixture } from '@/types';
import FixtureStatsComponent from "./components/FixtureStatsComponent";
import HeadedToHead from './components/HeadToHead';
import { FixturePredictionProps } from "@/types"

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
        throw new Error(`Request failed with status: ${response.status}`)
    }

    return await response.json()
}

async function getFixturePredictions(fixtureId: number): Promise<any> {
    const url = `/api/get_fixture_predictions?fixtureId=${fixtureId}`
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`)
    }

    return await response.json()
}

function fixtureDateInFuture(date: Date) {
    return date > new Date();
}

export default function Home() {
    const [selectedFixture, setSelectedFixture] = useState<number | null>(null);
    const [selectedFixtureDate, setSelectedFixtureDate] = useState<Date | null>(null);
    const [fixtureStats, setFixtureStats] = useState<any>(null);
    const [teamFixtures, setTeamFixtures] = useState<Fixture[]>([]);
    const [fixturePredictions, setFixturePredictions] = useState<FixturePredictionProps>({
        competition: {
            logo: '',
            name: ''
        },
        teams: {
            home: {
                name: '',
                logo: '',
                recentForm: []
            },
            away: {
                name: '',
                logo: '',
                recentForm: []
            }
        },
        potentialWinner: '',
        headToHeads: []
    });
    const alNassrTeamId = 2939;
    const portugalTeamId = 27;
    const teamIds = [alNassrTeamId, portugalTeamId]

    useEffect(() => {
        getTeamFixtures(teamIds).then(data => {
            if (data) setTeamFixtures(data)
        })
    }, [])

    const handleMatchClick = async (fixtureId: any, date: Date) => {
        const data = await getFixturePredictions(fixtureId)

        const headToHeads = data.response[0].h2h.filter((h2h: any) => h2h.goals.home !== null)
            .map((h2h: any) => {
                return {
                    fixtureId: h2h.fixture.id,
                    date: new Date(h2h.fixture.date),
                    competition: {
                        name: h2h.league.name,
                        logo: h2h.league.logo
                    },
                    teams: {
                        home: {
                            name: h2h.teams.home.name,
                            logo: h2h.teams.home.logo
                        },
                        away: {
                            name: h2h.teams.away.name,
                            logo: h2h.teams.away.logo
                        }
                    },
                    score: h2h.goals.home + '-' + h2h.goals.away,
                    status: h2h.fixture.status
                }
            })

        const fixturePredictions = {
            competition: {
                logo: data.response[0].league.logo || '',
                name: data.response[0].league.name || ''
            },
            teams: {
                home: {
                    name: data.response[0].teams.home.name || '',
                    logo: data.response[0].teams.home.logo || '',
                    recentForm: data.response[0].teams.home.league.form.split('').slice(-5),
                },
                away: {
                    name: data.response[0].teams.away.name || '',
                    logo: data.response[0].teams.away.logo || '',
                    recentForm: data.response[0].teams.away.league.form.split('').slice(-5),
                }
            },
            potentialWinner: data.response[0].predictions.winner.name || '',
            headToHeads: headToHeads
        }
        setFixturePredictions(fixturePredictions)
        setSelectedFixtureDate(date)

        // ***  DO NOT DELETE ***//
        const fixtureStats = await getFixtureStats(fixtureId);
        setFixtureStats(fixtureStats);
        setSelectedFixture(fixtureId);
    };

    return (
        <div className="flex h-screen">
            <div className="w-80">
                <SofaPlayerEmbed />
            </div>
            <ScrollArea className="h-100 w-80 rounded-md border mx-auto p-4">
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
                <div className="w-1/2">
                    {fixtureDateInFuture(selectedFixtureDate || new Date())
                        ? <HeadedToHead {...fixturePredictions} />
                        : <FixtureStatsComponent stats={fixtureStats} />
                    }
                </div>
            </div>
        </div>
    )
}
