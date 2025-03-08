import type React from "react";
interface DashboardShellProps {
	children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
	return (
		<div className="flex min-h-screen flex-col">
			<header className="sticky top-0 z-10 border-b bg-background">
				<div className="container flex h-16 items-center justify-between py-4">
					<div className="flex items-center gap-2">
						<a href="/dashboard" className="flex items-center gap-2">
							<span className="text-xl font-bold">QuizGenius</span>
						</a>
					</div>
					<nav className="flex items-center gap-4">
						<a href="/dashboard" className="text-sm font-medium">
							Dashboard
						</a>
						<a href="/dashboard/quizzes" className="text-sm font-medium">
							Quizzes
						</a>
						<a href="/dashboard/assignments" className="text-sm font-medium">
							Assignments
						</a>
						<a href="/dashboard/students" className="text-sm font-medium">
							Students
						</a>
					</nav>
					<div className="flex items-center gap-4">
						<a href="/profile" className="text-sm font-medium">
							Profile
						</a>
					</div>
				</div>
			</header>
			<main className="flex-1">
				<div className="container grid gap-12 py-8">{children}</div>
			</main>
		</div>
	);
}
