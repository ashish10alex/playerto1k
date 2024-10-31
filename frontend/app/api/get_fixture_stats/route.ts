
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const fixtureId = searchParams.get('fixtureId')

    if (!fixtureId) {
        return NextResponse.json({ error: 'Player ID is required' }, { status: 400 })
    }
    try {
        const result = await prisma.playerFixtureStatistic.findFirst({
            where: {
                fixtureId: parseInt(fixtureId)
            }
        })
        console.log(result)
        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
    }
}

