import { ForecastData } from "@/api/types";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";

type Props = {
	data: ForecastData;
};

interface DailyForecast {
	date: number;
	temp_min: number;
	temp_max: number;
	humidity: number;
	wind: number;
	weather: {
		id: number;
		main: string;
		description: string;
		icon: string;
	};
}

function WeatherForecast({ data }: Props) {
	const dailyForecast = data.list.reduce((acc, forecast) => {
		const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");

		if (!acc[date]) {
			acc[date] = {
				temp_min: forecast.main.temp_min,
				temp_max: forecast.main.temp_max,
				humidity: forecast.main.humidity,
				wind: forecast.wind.speed,
				weather: forecast.weather[0],
				date: forecast.dt,
			};
		} else {
			acc[date].temp_min = Math.min(
				acc[date].temp_min,
				forecast.main.temp_min
			);
			acc[date].temp_max = Math.max(
				acc[date].temp_max,
				forecast.main.temp_max
			);
		}

		return acc;
	}, {} as Record<string, DailyForecast>);

	const nextDays = Object.values(dailyForecast).slice(0, 6);

	const formatTemperature = (temp: number) => {
		return `${Math.round(temp)}°C`;
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>5-Day Forecast</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					{nextDays.map((day, index) => (
						<div
							key={index}
							className="grid grid-cols-3 gap-4 items-center rounded-lg border p-4"
						>
							<div>
								<p className="font-medium">
									{format(
										new Date(day.date * 1000),
										"EEE, MMM d"
									)}
								</p>
								<p className="text-sm text-muted-foreground capitalize">
									{day.weather.description}
								</p>
							</div>

							<div className="flex justify-center gap-4">
								<span className="flex items-center text-blue-500">
									<ArrowDown className="size-4 mr-1" />
									{formatTemperature(day.temp_min)}
								</span>
								<span className="flex items-center text-red-500">
									<ArrowUp className="size-4 mr-1" />
									{formatTemperature(day.temp_max)}
								</span>
							</div>

							<div className="flex justify-end gap-4">
								<span className="flex items-center gap-1">
									<Droplets className="size-4 text-blue-500" />
									<span className="text-sm">
										{day.humidity}%
									</span>
								</span>
								<span className="flex items-center gap-1">
									<Wind className="size-4 text-blue-500" />
									<span className="text-sm">
										{day.wind}m/s
									</span>
								</span>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}

export default WeatherForecast;