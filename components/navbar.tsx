"use client";

import { BookOpen } from "lucide-react";
import Link from "next/link";
import { APP_NAME } from "@/utils/constants";
import { ModeToggle } from "./theme-toggle";
import { useAuthStore } from "@/store/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const Navbar = () => {
	const { session, user, logout } = useAuthStore();
	const router = useRouter();

	const handleLogout = async () => {
		await logout();
		router.push("/login");
	};

	return (
		<header className="border-b">
			<div className="w-full flex h-16 items-center justify-between px-4 md:px-6">
				<Link href="/">
					<div className="flex items-center gap-2">
						<BookOpen className="h-6 w-6 text-primary" />
						<span className="text-xl font-bold">{APP_NAME}</span>
					</div>
				</Link>
				<nav className="hidden md:flex gap-6"></nav>
				<div className="flex items-center gap-4">
					<ModeToggle />
					<div>
						{session ? (
							<div>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Avatar>
											<AvatarImage
												src={`https://ui-avatars.com/api/?name=${user?.name.replace(" ", "+")}`}
												className="cursor-pointer"
											/>
											<AvatarFallback>{user?.name.substring(0, 2)}</AvatarFallback>
										</Avatar>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="w-56">
										<DropdownMenuLabel className="text-sm font-light text-neutral-500">
											{user?.email}
										</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuGroup>
											<DropdownMenuItem
												className="cursor-pointer"
												onClick={() => router.push("/dashboard")}>
												Dashboard
											</DropdownMenuItem>
											<DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
												Logout
											</DropdownMenuItem>
										</DropdownMenuGroup>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						) : (
							<div>
								<Button variant={"outline"} onClick={() => router.push("/login")}>
									Login
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};
