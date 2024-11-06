"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
//import CustomTooltipContent from "./ToolTipCustom"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"

export const description = "A stacked area chart"

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

async function getPassingStatsLastXGames(numberOfGames: number): Promise<any> {
    const url = `/api/get_last_x_games_stats/?numberOfGames=${numberOfGames}`
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`)
    }
    const data = await response.json()

    let passingStats: any = []

    data.map((fixture: any) => {
        if (fixture?.playerFixtureStatistics?.length === 0) {
            return
        }
        let opponent = fixture.awayTeamName === "Al-Nassr" ? fixture.homeTeamName : fixture.awayTeamName
        if (opponent === "Portugal") {
            const homeTeamName = fixture.homeTeamName
            const awayTeamName = fixture.awayTeamName
            opponent = homeTeamName === "Portugal" ? awayTeamName : homeTeamName
        }
        const completedPasses = parseInt(fixture.playerFixtureStatistics[0].passes_accuracy)
        const totalPasses = fixture.playerFixtureStatistics[0].passes_total
        passingStats.push({
            opponent: opponent,
            percentage: ((completedPasses / totalPasses) * 100).toFixed(0),
        })
    })
    return passingStats
}

const calculatePassingAccuracyPercentage = (passingStats: any) => {
    const totalPasses = passingStats.reduce((acc: any, curr: any) => acc + curr.attempted, 0)
    const totalSuccessfullPasses = passingStats.reduce((acc: any, curr: any) => acc + curr.successfull, 0)
    return (totalSuccessfullPasses / totalPasses) * 100
}

const calculatePassingAccuracyPercentageChange = (passingStats: any) => {
    const recentPassingStats = passingStats.slice(0, 5)
    const pastPassingStats = passingStats.slice(5, passingStats.length)
    const recentPassingAccuracy = calculatePassingAccuracyPercentage(recentPassingStats)
    const pastPassingAccuracy = calculatePassingAccuracyPercentage(pastPassingStats)
    return ((recentPassingAccuracy - pastPassingAccuracy) / pastPassingAccuracy * 100).toFixed(2)
}


export default function Component() {

    const numberOfGames = 5
    let [passingStats, setPassingStats] = useState([{ "opponent": "opponent", "percentage": 0 }])
    let [passingAccuracyPercentageTrend, setPassingAccuracyPercentageTrend] = useState(0)

    useEffect(() => {
        getPassingStatsLastXGames(numberOfGames).then(data => {
            setPassingStats(data)
        })
    }, [])

    useEffect(() => {
        const passingAccuracyPercentageTrend = calculatePassingAccuracyPercentageChange(passingStats)
        setPassingAccuracyPercentageTrend(parseFloat(passingAccuracyPercentageTrend))
    }, [passingStats])



    return (
        <Card>
            <CardHeader>
                <CardTitle>Passing percentage</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={passingStats}
                        margin={{
                            top: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="opponent"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        <Bar dataKey="percentage" fill="var(--color-desktop)" radius={8}>
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter>
        </Card>
    )
}
