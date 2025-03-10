import { BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { APP_NAME } from "@/utils/constants";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

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
				<nav className="hidden md:flex gap-6">
					<SignedIn>
						<Link
							href="/"
							className="text-sm font-medium hover:underline underline-offset-4">
							Home
						</Link>
						<Link
							href="/dashboard"
							className="text-sm font-medium hover:underline underline-offset-4">
							Dashboard
						</Link>
					</SignedIn>
					<SignedOut>
						<Link
							href="/#features"
							className="text-sm font-medium hover:underline underline-offset-4">
							Features
						</Link>
						<Link
							href="/#pricing"
							className="text-sm font-medium hover:underline underline-offset-4">
							Pricing
						</Link>
					</SignedOut>
				</nav>
				<div className="flex items-center gap-4">
					<SignedOut>
						<SignInButton>
							<Button className="hidden md:inline-flex">Get Started</Button>
						</SignInButton>
					</SignedOut>
					<SignedIn>
						<UserButton />
					</SignedIn>
				</div>
			</div>
		</header>
	);
};
