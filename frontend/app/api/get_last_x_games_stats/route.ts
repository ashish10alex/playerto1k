

import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const numberOfGames = searchParams.get('numberOfGames')

    try {
        const result = await prisma.fixture.findMany({
            where: {
                goals: {
                    not: ''
                },
                date: {
                    lt: new Date()
                }
            },
            orderBy: {
                date: 'desc'
            },
            include: {
                playerFixtureStatistics: true
            },
            take: numberOfGames ? parseInt(numberOfGames) : 5
        });
        const sortedResult = result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        return NextResponse.json(sortedResult)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
    }
}

