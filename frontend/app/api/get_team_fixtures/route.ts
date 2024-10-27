import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const teamId = searchParams.get('teamId')

    if (!teamId) {
        return NextResponse.json({ error: 'Team ID is required' }, { status: 400 })
    }
    try {
        let fixtures = await prisma.fixture.findMany({
            where: {
                OR: [
                    { homeTeamId: parseInt(teamId) },
                    { awayTeamId: parseInt(teamId) },
                ],
            }
        })
        return NextResponse.json(fixtures)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
    }
}

