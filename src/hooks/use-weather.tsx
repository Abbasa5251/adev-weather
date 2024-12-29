import { Coordinates } from "@/api/types";
import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

export const WEATHER_KEYS = {
	weather: (coords: Coordinates | null) => ["weather", coords] as const,
	forecast: (coords: Coordinates | null) => ["forecast", coords] as const,
	location: (coords: Coordinates | null) => ["location", coords] as const,
} as const;

export function useWeatherQuery(coordinates: Coordinates | null) {
	return useQuery({
		queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0 }),
		queryFn: async () =>
			coordinates ? weatherAPI.getCurrentWeather(coordinates) : null,
		enabled: !!coordinates,
	});
}

export function useForecastQuery(coordinates: Coordinates | null) {
	return useQuery({
		queryKey: WEATHER_KEYS.forecast(coordinates ?? { lat: 0, lon: 0 }),
		queryFn: async () =>
			coordinates ? weatherAPI.getForecast(coordinates) : null,
		enabled: !!coordinates,
	});
}

export function useReverseGeocodeQuery(coordinates: Coordinates | null) {
	return useQuery({
		queryKey: WEATHER_KEYS.location(coordinates ?? { lat: 0, lon: 0 }),
		queryFn: async () =>
			coordinates ? weatherAPI.reverseGeocode(coordinates) : null,
		enabled: !!coordinates,
	});
}
