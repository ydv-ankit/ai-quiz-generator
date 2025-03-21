import { BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { APP_NAME } from "@/utils/constants";
import { ModeToggle } from "./theme-toggle";

export const Navbar = () => {
	return (
		<header className="border-b">
			<div className="container flex h-16 items-center justify-between px-4 md:px-6">
				<Link href="/">
					<div className="flex items-center gap-2">
						<BookOpen className="h-6 w-6 text-primary" />
						<span className="text-xl font-bold">{APP_NAME}</span>
					</div>
				</Link>
				<nav className="hidden md:flex gap-6"></nav>
				<div className="flex items-center gap-4">
					<ModeToggle />
				</div>
			</div>
		</header>
	);
};
