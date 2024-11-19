import { NextRequest, NextResponse } from "next/server"
//import prisma from '@/lib/prisma'

async function getFixturePredictions(fixtureId: string) {
    const url = `https://api-football-v1.p.rapidapi.com/v3/predictions?fixture=${fixtureId}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': process.env.X_RAPIDAPI_KEY as string,
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
        }
    };

    const response = await fetch(url, options);
    return response.json()
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const fixtureId = searchParams.get('fixtureId')

    if (!fixtureId) {
        return NextResponse.json({ error: 'fixtureId is required' }, { status: 400 })
    }
    try {
        const response = await getFixturePredictions(fixtureId)
        return NextResponse.json(response)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
    }
}


