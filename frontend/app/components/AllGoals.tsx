"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "An interactive line chart"

const getStrokeColor = (date: any) => {
    const currentDate = new Date();
    const dataDate = new Date(date);

    if (dataDate < currentDate) {
        return "hsl(var(--chart-1))"
    } else if (dataDate.toDateString() === currentDate.toDateString()) {
        return "hsl(var(--chart-2))";
    } else {
        return "hsl(var(--chart-3))";
    }
};


const chartData = [
    { date: "2002-01-01", goals: 5 },
    { date: "2003-01-01", goals: 6 },
    { date: "2004-01-01", goals: 9 },
    { date: "2005-01-01", goals: 9 },
    { date: "2006-01-01", goals: 23 },
    { date: "2007-01-01", goals: 42 },
    { date: "2008-01-01", goals: 26 },
    { date: "2009-01-01", goals: 33 },
    { date: "2010-01-01", goals: 48 },
    { date: "2011-01-01", goals: 60 },
    { date: "2012-01-01", goals: 55 },
    { date: "2013-01-01", goals: 69 },
    { date: "2014-01-01", goals: 61 },
    { date: "2015-01-01", goals: 57 },
    { date: "2016-01-01", goals: 55 },
    { date: "2017-01-01", goals: 53 },
    { date: "2018-01-01", goals: 49 },
    { date: "2019-01-01", goals: 39 },
    { date: "2020-01-01", goals: 37 },
    { date: "2021-01-01", goals: 47 },
    { date: "2022-01-01", goals: 31 },
    { date: "2023-01-01", goals: 54 },
    { date: "2024-01-01", goals: 9 }
].map((item, index, array) => ({
    ...item,
    runningTotal: array.slice(0, index + 1).reduce((sum, curr) => sum + curr.goals, 0)
}));


async function getPlayerGoals(playerId: number): Promise<any | null> {
    //let goalsByTeam:any = {}
    //let totalGoals = 0
    //for (let season = 2024; season <= 2024; season++) {
    //    const response = await fetch(`/api/get_player_stat?player_id=${playerId}&season=${season}`)
    //    let output = await response.json()
    //    console.log(`season: ${season} `)
    //    console.log(output)
    //    for (let i = 0; i < output.response[0].statistics.length; i++) {
    //        const _goals = output.response[0].statistics[i].goals.total
    //        const _teamName = output.response[0].statistics[i].team.name
    //        const _league = output.response[0].statistics[i].league.name
    //        console.log(`season: ${season} team: ${_teamName} goals: ${_goals} league: ${_league}`)
    //        if (goalsByTeam[_teamName]) {
    //            goalsByTeam[_teamName] += _goals
    //        }else{
    //            goalsByTeam[_teamName] = _goals
    //        }
    //        //console.log(`season: ${season} team: ${output.response[0].statistics[i].team.name} goals: ${output.response[0].statistics[i].goals.total}`)
    //        totalGoals += output.response[0].statistics[i].goals.total
    //    }
    //}
    //console.log(goalsByTeam)
    //return totalGoals
    return 907
}

const chartConfig = {
    goals: {
        label: "Goals",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

export default function Component() {

    const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("goals")
    const [totalGoals, setTotalGoals] = useState()

    useEffect(() => {
        const ronaldoPlayerId = 874
        getPlayerGoals(ronaldoPlayerId).then(data => {
            if (data) setTotalGoals(data)
        })
    }, [])

    return (

        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Total goals</CardTitle>
                    <CardDescription>
                        Path to 1000 goals
                    </CardDescription>
                </div>
                <div className="flex">
                    {["goals"].map((key) => {
                        const chart = key as keyof typeof chartConfig
                        return (
                            <button
                                key={chart}
                                data-active={activeChart === chart}
                                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                onClick={() => setActiveChart(chart)}
                            >
                                <span className="text-xs text-muted-foreground">
                                    {chartConfig[chart].label}
                                </span>
                                <span className="text-lg font-bold leading-none sm:text-3xl">
                                    {`Total goals: ${totalGoals}`}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    year: "numeric",
                                })
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey="views"
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })
                                    }}
                                />
                            }
                        />
                        <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
