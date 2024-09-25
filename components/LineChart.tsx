"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

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

export const description = "A multiple line chart for Success Rate"

const chartData = [
  { month: "January", currentSR: 75, predictedSR: 85 },
  { month: "February", currentSR: 76, predictedSR: 86 },
  { month: "March", currentSR: 78, predictedSR: 88 },
  { month: "April", currentSR: 80, predictedSR: 90 },
  { month: "May", currentSR: 82, predictedSR: 92 },
  { month: "June", currentSR: 83, predictedSR: 93 },
]

const chartConfig = {
  currentSR: {
    label: "Current SR",
    color: "hsl(var(--chart-1))",
  },
  predictedSR: {
    label: "Predicted SR",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function LineCharts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart - Success Rate</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
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
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis domain={[70, 100]} tickLine={false} axisLine={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="currentSR"
              type="monotone"
              stroke="var(--color-currentSR)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="predictedSR"
              type="monotone"
              stroke="var(--color-predictedSR)"
              strokeWidth={3} // Make predicted line a bit thicker for distinction
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing success rates for January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
