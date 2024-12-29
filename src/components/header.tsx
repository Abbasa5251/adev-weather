import { Link } from "react-router";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/context/theme-provider";

function Header() {
	const { setTheme } = useTheme();
	return (
		<header className="sticky top-0 z-50 w-full border-b backdrop-blur bg-background/95 py-2 supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				<Link to="/">
					<h1 className="h-14 font-extrabold text-3xl">
						<span className="text-[#3bcfd5]">ADev</span> Weather
					</h1>
				</Link>

				<div>
					{/* Search */}
					{/* Theme toggle */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="icon">
								<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
								<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
								<span className="sr-only">Toggle theme</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={() => setTheme("light")}>
								Light
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setTheme("dark")}>
								Dark
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => setTheme("system")}
							>
								System
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	);
}

export default Header;
