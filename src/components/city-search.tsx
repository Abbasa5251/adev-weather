import { useState } from "react";
import { Button } from "./ui/button";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "./ui/command";
import { Clock, Loader2, Search, XCircle } from "lucide-react";
import { useLocationSearch } from "@/hooks/use-weather";
import { CommandSeparator } from "cmdk";
import { useNavigate } from "react-router";
import { useSearchHistory } from "@/hooks/use-search-history";
import { format } from "date-fns";

type Props = {};

function CitySearch({}: Props) {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const navigate = useNavigate();

	const { data: locations, isLoading } = useLocationSearch(query);
	const { history, clearHistory, addToHistory } = useSearchHistory();

	const handleSelect = (cityData: string) => {
		const [lat, lon, name, country] = cityData.split("|");

		addToHistory.mutate({
			query,
			lat: parseFloat(lat),
			lon: parseFloat(lon),
			name,
			country,
		});

		setOpen(false);
		setQuery("");
		navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
	};

	return (
		<>
			<Button
				variant={"outline"}
				className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
				onClick={() => setOpen(true)}
			>
				<Search className="size-4 mr-2" />
				Search cities...
			</Button>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput
					placeholder="Search cities..."
					value={query}
					onValueChange={setQuery}
				/>
				<CommandList>
					{query.length > 2 && !isLoading && (
						<CommandEmpty>No cities found.</CommandEmpty>
					)}
					{/* <CommandGroup heading="Favourites">
						<CommandItem>Calendar</CommandItem>
					</CommandGroup> */}

					{history.length > 0 && (
						<>
							<CommandSeparator />
							<CommandGroup>
								<div className="flex items-center justify-between px-2 my-2">
									<p>Recent Searches</p>
									<Button
										variant={"ghost"}
										size={"sm"}
										onClick={() => clearHistory.mutate()}
									>
										<XCircle className="size-4" />
										Clear
									</Button>
								</div>
								{history.map((item) => (
									<CommandItem
										key={`${item.lat}-${item.lon}`}
										value={`${item.lat}|${item.lon}|${item.name}|${item.country}`}
										onSelect={handleSelect}
									>
										<Clock className="size-4 mr-2 text-muted-foreground" />
										<span>{item.name}</span>
										{item.state && (
											<span className="text-sm text-muted-foreground">
												{item.state},
											</span>
										)}
										<span className="text-sm text-muted-foreground">
											{item.country},
										</span>
										<span className="text-sm text-muted-foreground">
											{" "}
											{format(
												item.searchedAt,
												"MMM d, h:mm a"
											)}
										</span>
									</CommandItem>
								))}
							</CommandGroup>
						</>
					)}

					{locations && locations.length && (
						<>
							<CommandSeparator />
							<CommandGroup heading="Suggestions">
								{isLoading && (
									<div className="flex items-center justify-center p-4">
										<Loader2 className="size-4 animate-spin" />
									</div>
								)}
								{locations.map((location) => (
									<CommandItem
										key={`${location.lat}-${location.lon}`}
										value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
										onSelect={handleSelect}
									>
										<Search className="size-4 mr-2" />
										<span>{location.name}</span>
										{location.state && (
											<span className="text-sm text-muted-foreground">
												{location.state},
											</span>
										)}
										<span className="text-sm text-muted-foreground">
											{location.country}
										</span>
									</CommandItem>
								))}
							</CommandGroup>
						</>
					)}
				</CommandList>
			</CommandDialog>
		</>
	);
}

export default CitySearch;
