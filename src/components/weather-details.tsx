import { WeatherData } from "@/api/types";
import { format } from "date-fns";
import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = { data: WeatherData };

function WeatherDetails({ data }: Props) {
	const { wind, main, sys } = data;

	const formatTime = (timestamp: number) => {
		return format(new Date(timestamp * 1000), "h:mm a");
	};

	const getWindDrirection = (degree: number) => {
		const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
		return directions[
			Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8
		];
	};

	const details = [
		{
			title: "Sunrise",
			value: formatTime(sys.sunrise),
			icon: Sunrise,
			color: "text-orange-500",
		},
		{
			title: "Sunset",
			value: formatTime(sys.sunset),
			icon: Sunset,
			color: "text-blue-500",
		},
		{
			title: "Wind Direction",
			value: `${getWindDrirection(wind.deg)} (${wind.deg}°)`,
			icon: Compass,
			color: "text-green-500",
		},
		{
			title: "Pressure",
			value: `${main.pressure} hPa`,
			icon: Gauge,
			color: "text-purple-500",
		},
	];

	return (
		<Card>
			<CardHeader>
				<CardTitle>Weather Details</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid md:grid-cols-2 gap-6">
					{details.map((detail, index) => (
						<div
							key={index}
							className="flex items-center gap-3 rounded-lg border p-4"
						>
							<detail.icon className={`size-5 ${detail.color}`} />
							<div>
								<p className="text-sm font-medium leading-none">
									{detail.title}
								</p>
								<p className="text-sm text-muted-foreground">
									{detail.value}
								</p>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}

export default WeatherDetails;