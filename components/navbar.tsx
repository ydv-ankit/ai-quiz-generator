"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
export const Navbar = () => {
	return (
		<nav className="p-4 border-b w-full justify-between flex">
			<div>
				<Link href="/">
				Home
				</Link>
			</div>
			<div>
				<Link href="/">Home</Link>
				<Link href="/quiz">Quiz</Link>
				<Link href="/about">About</Link>
			</div>
			<div>
				<SignedOut>
					<SignInButton />
				</SignedOut>
				<SignedIn>
					<UserButton />
				</SignedIn>
			</div>
		</nav>
	);
};
