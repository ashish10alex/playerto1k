

import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'

type FetchOptions = {
    method: string;
    headers: {
        'x-rapidapi-host': string;
        'x-rapidapi-key': string;
    };
};

let addPlayerStatsTodB = async (playerId: number, fixtureId: number, playerStatistics: any) => {
    const prismaCreate = await prisma.playerFixtureStatistic.create({
        data: {
            playerId: playerId,
            fixtureId: fixtureId,
            // Games
            games_minutes: playerStatistics.games.minutes,
            games_number: playerStatistics.games.number,
            games_position: playerStatistics.games.position,
            games_rating: playerStatistics.games.rating,
            games_captain: playerStatistics.games.captain,
            games_substitute: playerStatistics.games.substitute,

            // Other stats
            offsides: playerStatistics.offsides,

            // Shots
            shots_total: playerStatistics.shots.total,
            shots_on: playerStatistics.shots.on,

            // Goals
            goals_total: playerStatistics.goals.total,
            goals_conceded: playerStatistics.goals.conceded,
            goals_assists: playerStatistics.goals.assists,
            goals_saves: playerStatistics.goals.saves,

            // Passes
            passes_total: playerStatistics.passes.total,
            passes_key: playerStatistics.passes.key,
            passes_accuracy: playerStatistics.passes.accuracy,

            // Tackles
            tackles_total: playerStatistics.tackles.total,
            tackles_blocks: playerStatistics.tackles.blocks,
            tackles_interceptions: playerStatistics.tackles.interceptions,

            // Duels
            duels_total: playerStatistics.duels.total,
            duels_won: playerStatistics.duels.won,

            // Dribbles
            dribbles_attempts: playerStatistics.dribbles.attempts,
            dribbles_success: playerStatistics.dribbles.success,
            dribbles_past: playerStatistics.dribbles.past,

            // Fouls
            fouls_drawn: playerStatistics.fouls.drawn,
            fouls_committed: playerStatistics.fouls.committed,

            // Cards
            cards_yellow: playerStatistics.cards.yellow,
            cards_red: playerStatistics.cards.red,

            // Penalty
            penalty_won: playerStatistics.penalty.won,
            penalty_commited: playerStatistics.penalty.commited,
            penalty_scored: playerStatistics.penalty.scored,
            penalty_missed: playerStatistics.penalty.missed,
            penalty_saved: playerStatistics.penalty.saved,

        }
    })
    //return prismaCreate
}

let getPlayerStatsForFixture = async (fixtureId: number, playerId: number) => {
    const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?id=${fixtureId}`;
    const options: FetchOptions = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': process.env.X_RAPIDAPI_KEY as string,
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
        }
    };
    const response = await fetch(url, options);
    const result = await response.json();

    for (let i = 0; i < result.response[0].players.length; i++) {
        for (let j = 0; j < result.response[0].players[i].players.length; j++) {
            if (result.response[0].players[i].players[j].player.id === playerId) {
                const playerStatistics = result.response[0].players[i].players[j].statistics[0]
                return playerStatistics
            }
        }
    }
    console.log(`Player with id ${playerId} not found in fixture with id ${fixtureId}`)
    return null
}

//function delay(ms:number) {
//  return new Promise(resolve => setTimeout(resolve, ms));
//}

export async function POST(request: NextRequest) {
    let body = await request.json()
    const { playerId } = body;


    if (!playerId) {
        return NextResponse.json({ error: 'playerId is required' }, { status: 400 })
    }

    try {
        const fixtures = await prisma.fixture.findMany({
            select: {
                id: true
            },
            where: {
                date: {
                    lte: new Date()
                }
            }
        })
        console.log(fixtures.length)

        //const _fixtureId = 1219959
        //const playerStatistics = await getPlayerStatsForFixture(_fixtureId, playerId)
        //console.log(playerStatistics)
        //await addPlayerStatsTodB(playerId, _fixtureId, playerStatistics)
        //return NextResponse.json({ message: `Player statistics for player with id ${playerId} have been added to the database` }, { status: 200 })

        fixtures.forEach(async (fixture: any) => {
            console.log(`Adding player statistics for player with id ${playerId} for fixture with id ${fixture.id}`)
            //await delay(1) // this does not work
            const playerStatistics = await getPlayerStatsForFixture(fixture.id, playerId)
            if (playerStatistics !== null) {
                await addPlayerStatsTodB(playerId, fixture.id, playerStatistics)
            }
        })
        return NextResponse.json({ message: `Player statistics for player with id ${playerId} have been added to the database` }, { status: 200 })
    } catch (error: any) {

        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

