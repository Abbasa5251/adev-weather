import { ForecastData } from "@/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "./ui/chart";
import { format } from "date-fns";

type Props = {
	data: ForecastData;
};

function HourlyTemperature({ data }: Props) {
	const chartData = data.list.slice(0, 8).map((item) => ({
		time: format(new Date(item.dt * 1000), "ha"),
		temp: Math.round(item.main.temp),
		feels_like: Math.round(item.main.feels_like),
	}));

	const chartConfig = {
		temp: {
			label: "Temperature",
			color: "hsl(var(--chart-1))",
		},
		feels_like: {
			label: "Feels Like",
			color: "hsl(var(--chart-2))",
		},
	} satisfies ChartConfig;

	return (
		<Card className="flex-1">
			<CardHeader>
				<CardTitle>Today's Temperature</CardTitle>
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
							dataKey="time"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
						/>
						<YAxis
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => `${value}°`}
						/>
						<Line
							dataKey="temp"
							type="monotone"
							stroke="#2563eb"
							strokeWidth={2}
							dot={false}
						/>
						<Line
							dataKey="feels_like"
							type="monotone"
							stroke="#64748b"
							strokeWidth={2}
							dot={false}
							strokeDasharray={"3 3"}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
					</LineChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}

export default HourlyTemperature;
