import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import prisma from "@/lib/prisma";
import { Fixture } from '@/types'

type FetchOptions = {
    method: string;
    headers: {
        'x-rapidapi-host': string;
        'x-rapidapi-key': string;
    };
};


let getTeamFixtures = async (season: number, teamId: number): Promise<Fixture[]> => {
    const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?season=${season}&team=${teamId}`;
    const options: FetchOptions = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': process.env.X_RAPIDAPI_KEY as string,
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
        }
    };
    const response = await fetch(url, options);
    const output = await response.json();

    let fixtures = [];

    for (let i = 0; i < output.response.length; i++) {
        let status = output.response[i].fixture.status.short;
        let goals = "";
        if ((status === "FT" || status === "HT" || status === "PN") && output.response[i].goals.home !== null && output.response[i].goals.away !== null) {
            goals = output.response[i].goals.home + " - " + output.response[i].goals.away
        } else {
            goals = ""
        }

        fixtures.push({
            id: output.response[i].fixture.id,
            season: season,
            date: output.response[i].fixture.date,
            homeTeamId: output.response[i].teams.home.id,
            homeTeamName: output.response[i].teams.home.name,
            homeTeamLogo: output.response[i].teams.home.logo,
            awayTeamId: output.response[i].teams.away.id,
            awayTeamName: output.response[i].teams.away.name,
            awayTeamLogo: output.response[i].teams.away.logo,
            goals: goals,
            statusShort: output.response[i].fixture.status.short,
        })
    }
    return fixtures
}


async function addTeamFixtures(fixtureData: Fixture[]) {
    await prisma.fixture.createMany({
        data: fixtureData,
        skipDuplicates: true,
    })
}

async function deleteTeamFixtures() {
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
    const deletedRecords = await prisma.fixture.deleteMany({
        where: {
            date: {
                gte: tenDaysAgo
            }
        }
    })
    return deletedRecords
}

export async function POST(request: NextRequest) {
    let body = await request.json()
    const { teamIds } = body;

    if (!teamIds) {
        return NextResponse.json({ error: 'Team ID(s) is required' }, { status: 400 })
    }

    try {
        const seasons = [2024, 2025]
        for (let i = 0; i < teamIds.length; i++) {
            for (let j = 0; j < seasons.length; j++) {
                let fixtures = await getTeamFixtures(seasons[j], teamIds[i]);
                await addTeamFixtures(fixtures)
            }
        }
        return NextResponse.json({ "message": "Data added successfully" }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
    }
}

