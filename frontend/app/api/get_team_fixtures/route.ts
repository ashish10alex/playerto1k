import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

type FetchOptions = {
  method: string;
  headers: {
    'x-rapidapi-host': string;
    'x-rapidapi-key': string;
  };
};

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const team_id = searchParams.get('team_id')

    if (!team_id) {
        return NextResponse.json({ error: 'Team ID is required' }, { status: 400 })
    }

    const season = 2024;
    const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?season=${season}&team=${team_id}`;
    const options: FetchOptions = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': process.env.X_RAPIDAPI_KEY as string,
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
    }
}

