
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import  prisma  from "@/lib/prisma";

type FetchOptions = {
  method: string;
  headers: {
    'x-rapidapi-host': string;
    'x-rapidapi-key': string;
  };
};

async function createTeam(teamData:any) {
  const newTeam = await prisma.teams.create({
    data: teamData
  })

  //console.log("New team created:", newTeam)
  return newTeam
}

export async function POST(request: NextRequest){
    const searchParams = new URL(request.nextUrl);
    const teamId = 2939
    const season = 2024;
    const league = 307; // saudi league

    const url = `https://api-football-v1.p.rapidapi.com/v3/teams/statistics?league=${league}&season=${season}&team=${teamId}`;
    const options: FetchOptions = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': process.env.X_RAPIDAPI_KEY as string,
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
        }
    };

    try {
        //createTeam();
        const response = await fetch(url, options);
        const result = await response.json();
        let teamData  = {
            id: result.response.team.id,
            name: result.response.team.name,
            logo: result.response.team.logo,
            form: result.response.form,
            playerIds: []
        }
        createTeam(teamData);
        return NextResponse.json(teamData)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
    }
}


