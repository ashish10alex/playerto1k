"use client"

import { useState, useEffect } from 'react';
import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
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

//export const description = "Compare teams"

interface ChartDataPoint {
    attribute: string;
    playerTeam: number;
    opponentTeam: number;
}


const defaultChartData: ChartDataPoint[] = [
  { attribute: "Attack", playerTeam: 186, opponentTeam: 80 },
  { attribute: "Defense", playerTeam: 305, opponentTeam: 200 },
  { attribute: "Form", playerTeam: 237, opponentTeam: 120 },
]

const chartConfig = {
  playerTeam: {
    label: "playerTeam",
    color: "hsl(var(--chart-1))",
  },
  opponentTeam: {
    label: "opponentTeam",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

interface RadarComponentProps {
    selectedMatch: string;
}

export const RadarComponent: React.FC<RadarComponentProps> = ({ selectedMatch }) => {


    const [chartData, setChartData] = useState<ChartDataPoint[]>(defaultChartData);
    useEffect(() => {
        console.log(`I was clicked on ${selectedMatch}`);
    }, [selectedMatch]);

  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Compare teams</CardTitle>
        <CardDescription>
            Select match to compare teams
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              bottom: 10,
              left: 10,
            }}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis
              dataKey="attribute"
              tick={({ x, y, textAnchor, value, index, ...props }) => {
                const data = chartData[index]

                return (
                  <text
                    x={x}
                    y={index === 0 ? y - 10 : y}
                    textAnchor={textAnchor}
                    fontSize={13}
                    fontWeight={500}
                    {...props}
                  >
                    <tspan>{data.playerTeam}</tspan>
                    <tspan className="fill-muted-foreground">/</tspan>
                    <tspan>{data.opponentTeam}</tspan>
                    <tspan
                      x={x}
                      dy={"1rem"}
                      fontSize={12}
                      className="fill-muted-foreground"
                    >
                      {data.attribute}
                    </tspan>
                  </text>
                )
              }}
            />

            <PolarGrid />
            <Radar
              dataKey="playerTeam"
              fill="var(--color-playerTeam)"
              fillOpacity={0.6}
            />
            <Radar dataKey="opponentTeam" fill="var(--color-opponentTeam)" />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Something here.. <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          January - June 2024
        </div>
      </CardFooter>
    </Card>
  )
}
