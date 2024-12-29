import { Coordinates } from "@/api/types";
import React from "react";

interface GeoLocationState {
	coordinates: Coordinates | null;
	error: string | null;
	isLoading: boolean;
}

export function useGeoLocation() {
	const [locationData, setLocationData] = React.useState<GeoLocationState>({
		coordinates: null,
		error: null,
		isLoading: true,
	});

	const getLocation = React.useCallback(() => {
		setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));
		if (!navigator.geolocation) {
			setLocationData({
				coordinates: null,
				error: "Geolocation is not supported",
				isLoading: false,
			});
			return;
		}

		navigator.geolocation.getCurrentPosition(
			({ coords }) => {
				setLocationData({
					coordinates: {
						lat: coords.latitude,
						lon: coords.longitude,
					},
					error: null,
					isLoading: false,
				});
			},
			(error) => {
				let errorMessage: string;
				switch (error.code) {
					case error.PERMISSION_DENIED:
						errorMessage =
							"User denied the request for Geolocation.";
						break;
					case error.POSITION_UNAVAILABLE:
						errorMessage = "Location information is unavailable.";
						break;
					case error.TIMEOUT:
						errorMessage =
							"The request to get user location timed out.";
						break;
					default:
						errorMessage = "An unknown error occurred.";
				}
				setLocationData({
					coordinates: null,
					error: errorMessage,
					isLoading: false,
				});
			},
			{
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0,
			}
		);
	}, []);

	React.useEffect(() => {
		getLocation();
	}, []);

	return {
		...locationData,
		getLocation,
	};
}
