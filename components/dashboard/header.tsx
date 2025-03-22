import type React from "react";
interface DashboardHeaderProps {
	heading: string;
	text?: string;
	team: string;
	children?: React.ReactNode;
}

export function DashboardHeader({ heading, text, team, children }: DashboardHeaderProps) {
	return (
		<div className="flex items-center justify-between px-2">
			<div className="grid gap-1">
				<div className="flex items-center ">
					<h1 className="text-2xl font-bold tracking-wide">{heading}</h1>
					<span className="text-sm p-2 py-1 mx-2 text-slate-500 bg-zinc-300 rounded-lg">
						{team}
					</span>
				</div>
				{text && <p className="text-muted-foreground">{text}</p>}
			</div>
			{children}
		</div>
	);
}
