
import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    let numberOfGames = searchParams.get('numberOfGames')

    if (numberOfGames === null) {
        numberOfGames = "10";
    }

    try {
        const result = await prisma.playerFixtureStatistic.findMany({
            select: {
                playerId: true,
                fixture: {
                    select: {
                        date: true,
                        id: true,
                        awayTeamName: true,
                        homeTeamName: true
                    },
                },
                penalty_scored: true,
                goals_total: true,

            },
            orderBy: {
                fixture: {
                    date: 'desc'
                }
            },
            where: {
                goals_total: {
                    not: null
                },
            },
            take: parseInt(numberOfGames),
        });
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
    }
}

