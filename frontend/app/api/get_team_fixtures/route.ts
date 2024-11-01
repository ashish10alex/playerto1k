import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {

    let body = await request.json()
    let { teamIds } = body;

    if (!teamIds) {
        return NextResponse.json({ error: 'Team ID is required' }, { status: 400 })
    }
    try {
        const fixtures = await prisma.fixture.findMany({
            where: {
                OR: teamIds.flatMap((teamId: string) => [
                    { homeTeamId: parseInt(teamId) },
                    { awayTeamId: parseInt(teamId) },
                ]),
                date: {
                    gte: new Date(new Date().setMonth(new Date().getMonth() - 1))
                }
            },
            orderBy: {
                date: "asc"
            }
        });
        return NextResponse.json(fixtures)

    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
    }
}

