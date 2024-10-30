import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import  prisma  from "@/lib/prisma";
import { Fixture } from '@/types'

type FetchOptions = {
  method: string;
  headers: {
    'x-rapidapi-host': string;
    'x-rapidapi-key': string;
  };
};


let getTeamFixtures = async (output:any): Promise<Fixture[]> => {
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
            id: output.response[i].fixture.id,
            season: 2024, // TODO: get season from the API
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

async function deleteTeamFixtures(){
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
    const { teamId } = body;

    if (!teamId) {
        return NextResponse.json({ error: 'Team ID is required' }, { status: 400 })
    }

    const season = 2024; // TODO: get season from the API
    const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?season=${season}&team=${teamId}`;
    const options: FetchOptions = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': process.env.X_RAPIDAPI_KEY as string,
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const output = await response.json();
        let fixtures = await getTeamFixtures(output);
        if (fixtures){
            const deletedFixtures = await deleteTeamFixtures()
            console.log(`deleted ${deletedFixtures.count} records from fixture table`)
            await addTeamFixtures(fixtures)
        }
        return NextResponse.json({ "fixtures": fixtures })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
    }
}

