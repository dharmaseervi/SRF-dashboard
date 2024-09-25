"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "Current and Predicted SR Chart";

const chartData = [
  { month: "January", currentSR: 79, predictedSR: 79 },
  { month: "February", currentSR: 82, predictedSR: 86 },
  { month: "March", currentSR: 81, predictedSR: 84 },
  { month: "April", currentSR: 79, predictedSR: 83 },
  { month: "May", currentSR: 84, predictedSR: 87 },
  { month: "June", currentSR: 83, predictedSR: 87 },
];

const chartConfig = {
  currentSR: {
    label: "Current SR",
    color: "hsl(var(--chart-1))", // Customize with desired color variable
  },
  predictedSR: {
    label: "Predicted SR",
    color: "hsl(var(--chart-2))", // Customize with desired color variable
  },
} satisfies ChartConfig;

export function Chart() {
  return (
    <Card>
      <CardHeader>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
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
           
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="currentSR"
              type="natural"
              fill="var(--color-currentSR)"
              fillOpacity={0.2} // Subtle background fill
              stroke="var(--color-currentSR)"
              strokeWidth={1.5} // Reduced stroke width for current SR
              stackId="a"
            />
            <Area
              dataKey="predictedSR"
              type="natural"
              fill="var(--color-predictedSR)"
              fillOpacity={0.2} // Subtle background fill
              stroke="var(--color-predictedSR)"
              strokeWidth={1.5} // Reduced stroke width for predicted SR
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
