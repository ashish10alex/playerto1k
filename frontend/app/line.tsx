"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

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

const getStrokeColor = (date:any) => {
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
  { date: "2024-10-01", goals: 1 },
  { date: "2024-10-02", goals: 0 },
  { date: "2024-10-03", goals: 2 },
  { date: "2024-10-10", goals: 1 },
  { date: "2024-10-05", goals: 0 },
  { date: "2024-10-06", goals: 0 },
  { date: "2024-10-07", goals: 1 },
  { date: "2024-10-08", goals: 3 },
  { date: "2024-10-09", goals: 2 },
  { date: "2024-10-10", goals: 1 },
  { date: "2024-10-11", goals: 0 },
  { date: "2024-10-12", goals: 2 },
  { date: "2024-10-13", goals: 1 },
  { date: "2024-10-14", goals: 3 },
  { date: "2024-10-15", goals: 0 },
  { date: "2024-10-16", goals: 1 },
  { date: "2024-10-17", goals: 2 },
  { date: "2024-10-18", goals: 1 },
  { date: "2024-10-19", goals: 0 },
  { date: "2024-10-20", goals: 2 },
  { date: "2024-10-21", goals: 1 },
  { date: "2024-10-22", goals: 3 },
  { date: "2024-10-23", goals: 0 },
  { date: "2024-10-24", goals: 2 },
  { date: "2024-10-25", goals: 1 },
  { date: "2024-10-26", goals: 0 },
  { date: "2024-10-27", goals: 2 },
  { date: "2024-10-28", goals: 1 },
  { date: "2024-10-29", goals: 3 },
  { date: "2024-10-30", goals: 0 },
  { date: "2024-11-01", goals: 2 },
  { date: "2024-11-02", goals: 1 },
  { date: "2024-11-03", goals: 0 },
  { date: "2024-11-04", goals: 2 },
  { date: "2024-11-11", goals: 1 },
  { date: "2024-11-06", goals: 3 },
  { date: "2024-11-07", goals: 0 },
  { date: "2024-11-08", goals: 2 },
  { date: "2024-11-09", goals: 1 },
  { date: "2024-11-10", goals: 0 },
  { date: "2024-11-11", goals: 2 },
  { date: "2024-11-12", goals: 1 },
  { date: "2024-11-13", goals: 3 },
  { date: "2024-11-14", goals: 0 },
  { date: "2024-11-15", goals: 2 },
  { date: "2024-11-16", goals: 1 },
  { date: "2024-11-17", goals: 0 },
  { date: "2024-11-18", goals: 2 },
  { date: "2024-11-19", goals: 1 },
  { date: "2024-11-20", goals: 3 },
  { date: "2024-11-21", goals: 0 },
  { date: "2024-11-22", goals: 2 },
  { date: "2024-11-23", goals: 1 },
  { date: "2024-11-24", goals: 0 },
  { date: "2024-11-25", goals: 2 },
  { date: "2024-11-26", goals: 1 },
  { date: "2024-11-27", goals: 3 },
  { date: "2024-11-28", goals: 0 }
].map((item, index, array) => ({
  ...item,
  runningTotal: array.slice(0, index + 1).reduce((sum, curr) => sum + curr.goals, 0)
}));

const chartConfig = {
  goals: {
    label: "Goals Running Total",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function LineComponent() {
  const totalGoals = React.useMemo(
    () => chartData[chartData.length - 1].runningTotal,
    []
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Journey to 1000 goals</CardTitle>
        </div>
        <div className="flex">
          <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">
                Current goals
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {907}
            </span>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">
                Matches to reach 1000 goals
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {127}
            </span>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-xs text-muted-foreground">
                Date to reach 1000 goals
            </span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
                { "2025-08-01" }
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
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
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value:any) => value.toLocaleString()}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="goals"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />

          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
              {chartData.map((entry, index) => (
                <stop
                  key={index}
                  offset={`${(index / (chartData.length - 1)) * 100}%`}
                  stopColor={getStrokeColor(entry.date)}
                />
              ))}
            </linearGradient>
          </defs>

            <Line
              dataKey="runningTotal"
              type="monotone"
              stroke="url(#colorGradient)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
