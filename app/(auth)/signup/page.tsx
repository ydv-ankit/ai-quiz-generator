"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AuthGuard } from "@/components/auth-guard";

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

function RegisterContent() {
	const { login, createAccount } = useAuthStore();
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState("");
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const firstname = formData.get("firstname");
		const lastname = formData.get("lastname");
		const email = formData.get("email");
		const password = formData.get("password");

		if (!firstname || !lastname || !email || !password) {
			setError(() => "Please fill out all fields");
			return;
		}

		setIsLoading(() => true);
		setError(() => "");
		try {
			const response = await createAccount(
				`${String(firstname)} ${String(lastname)}`,
				String(email),
				String(password)
			);

			if (response.error) {
				setError(() => response.error!.message);
			} else {
				const loginResponse = await login(email.toString(), password.toString());
				if (loginResponse.error) {
					setError(() => loginResponse.error!.message);
				}
				router.push("/dashboard");
			}
		} catch (error) {
			console.log(error);

			toast("Error", {
				description: (
					<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
						<code className="text-white">Error creating account...</code>
					</pre>
				),
			});
		} finally {
			setIsLoading(() => false);
		}
	};

	return (
		<div className="mx-auto w-full max-w-md rounded-none  md:p-8">
			<h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Welcome</h2>
			<p className="mt-2 max-w-sm  text-neutral-600 dark:text-neutral-300">
				Signup if you you don&apos;t have an account.
				<br /> If you already have an account,{" "}
				<Link href="/login" className="text-blue-500 hover:underline">
					login
				</Link>{" "}
				here
			</p>

			{error && <p className="mt-8 text-center text-sm text-red-500 dark:text-red-400">{error}</p>}
			<form className="my-8" onSubmit={handleSubmit}>
				<div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
					<LabelInputContainer>
						<Label htmlFor="firstname">First name</Label>
						<Input id="firstname" name="firstname" placeholder="Ankit" type="text" />
					</LabelInputContainer>
					<LabelInputContainer>
						<Label htmlFor="lastname">Last name</Label>
						<Input id="lastname" name="lastname" placeholder="Ydv" type="text" />
					</LabelInputContainer>
				</div>
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
					Sign up &rarr;
					<BottomGradient />
				</button>
			</form>
		</div>
	);
}

export default function Register() {
	return (
		<AuthGuard requireAuth={false}>
			<RegisterContent />
		</AuthGuard>
	);
}
