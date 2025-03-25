"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";

const BottomGradient = () => {
	return (
		<>
			<span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
			<span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
		</>
	);
};

const LabelInputContainer = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>;
};

export default function Login() {
	const { login } = useAuthStore();
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const email = formData.get("email");
		const password = formData.get("password");

		if (!email || !password) {
			setError(() => "Please fill out all fields");
			return;
		}

		setIsLoading(() => true);
		setError(() => "");

		const loginResponse = await login(email.toString(), password.toString());
		if (loginResponse.error) {
			setError(() => loginResponse.error!.message);
		}

		setIsLoading(() => false);
		router.push("/dashboard");
	};

	return (
		<div className="mx-auto w-full max-w-md rounded-none md:p-8">
			<h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Login</h2>
			<p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
				<br /> If you don&apos;t have an account,{" "}
				<Link href="/signup" className="text-blue-500 hover:underline">
					register
				</Link>{" "}
				here
			</p>

			{error && <p className="mt-8 text-center text-red-500 dark:text-red-400">{error}</p>}
			<form className="my-8" onSubmit={handleSubmit}>
				<LabelInputContainer className="mb-4">
					<Label htmlFor="email">Email Address</Label>
					<Input id="email" name="email" placeholder="yourmail@domain.com" type="email" />
				</LabelInputContainer>
				<LabelInputContainer className="mb-4">
					<Label htmlFor="password">Password</Label>
					<Input id="password" name="password" placeholder="••••••••" type="password" />
				</LabelInputContainer>

				<button
					className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
					type="submit"
					disabled={isLoading}>
					Log in &rarr;
					<BottomGradient />
				</button>
			</form>
		</div>
	);
}
