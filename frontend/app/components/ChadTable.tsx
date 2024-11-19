import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react";

import { format } from 'date-fns';

async function gePlayerPenStats(numberOfGames: number): Promise<any> {
    const url = `/api/get_last_x_player_pen_goals/?numberOfGames=${numberOfGames}`
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`)
    }
    const data = await response.json()

    let playerPenStats: any = []

    data.map((stats: any) => {
        let opponent = stats.fixture.awayTeamName === "Al-Nassr" ? stats.fixture.homeTeamName : stats.fixture.awayTeamName
        if (opponent === "Portugal") {
            const homeTeamName = stats.fixture.homeTeamName
            const awayTeamName = stats.fixture.awayTeamName
            opponent = homeTeamName === "Portugal" ? awayTeamName : homeTeamName
        }
        const fixtureId = stats.fixture.id
        const fixtureDate = stats.fixture.date
        console.log(fixtureDate)
        const totalGoals = stats.goals_total
        const penaltyGoals = stats.penalty_scored
        playerPenStats.push({
            opponent: opponent,
            fixtureId: fixtureId,
            fixtureDate: format(fixtureDate, 'EEE, d MMM HH:mm'),
            totalGoals: totalGoals,
            penaltyGoals: penaltyGoals,
        })
    })
    console.log(playerPenStats)
    return playerPenStats
}

async function caculateSummaryStats(playerPenStats: any): Promise<any> {
    let totalGoals = 0
    let penaltyGoals = 0
    playerPenStats.map((stats: any) => {
        totalGoals += stats.totalGoals
        penaltyGoals += stats.penaltyGoals
    })
    const penaltyGoalsPercentage = Number(penaltyGoals / totalGoals)
    return (penaltyGoalsPercentage * 100).toFixed(2)
}


export default function Component() {
    const numberOfGames = 10
    let [playerPenStats, setPlayerPenStats] = useState([{ "opponent": "opponent", "fixtureId": "fixtureId", "fixtureDate": "fixtureDate", "totalGoals": 0, "penaltyGoals": 0 }])
    let [penaltyGoalsPercentage, setPenaltyGoalsPercentage] = useState(0)

    useEffect(() => {
        gePlayerPenStats(numberOfGames).then(data => {
            setPlayerPenStats(data)
        })
    }, [])

    useEffect(() => {
        caculateSummaryStats(playerPenStats).then(data => {
            setPenaltyGoalsPercentage(data)
        })
    }, [playerPenStats])

    return (
        <Table>
            <TableCaption> Of the games player has scored, percentage of goals that are penalties: {penaltyGoalsPercentage}</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">opponent</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total goals</TableHead>
                    <TableHead className="text-right">Penalty goals</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {playerPenStats.map((stat) => (
                    <TableRow key={stat.fixtureId}>
                        <TableCell className="font-medium">{stat.opponent}</TableCell>
                        <TableCell>{stat.fixtureDate}</TableCell>
                        <TableCell>{stat.totalGoals}</TableCell>
                        <TableCell className="text-right">{stat.penaltyGoals}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}></TableCell>
                    <TableCell className="text-right"></TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
