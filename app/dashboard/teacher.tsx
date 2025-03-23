"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { useAuthStore } from "@/store/auth";
import { Assignment } from "@/components/assignments";
import { useEffect, useState } from "react";

export default function TeacherDashboardPage() {
	const [assignments, setAssignments] = useState<Array<any>>([]);
	const [students, setStudents] = useState<any>();
	const [view, setView] = useState<"assignments" | "" | "students">("");
	const { user } = useAuthStore();

	useEffect(() => {
		(async () => {
			const res = await fetch("/api/assignments");
			const data = await res.json();
			setAssignments(data.data.documents);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			const res = await fetch(`/api/users?team=${user?.team}`);
			const data = await res.json();
			setStudents(data.data);
		})();
	}, [user]);

	return (
		<div className="p-2">
			<DashboardHeader
				heading="Teacher Dashboard"
				text="Create and new quizzes and assign them to students"
				team={user?.team}>
				<Link href="/generate">
					<Button>
						<BookOpen className="mr-2 h-4 w-4" />
						New Quiz
					</Button>
				</Link>
			</DashboardHeader>
			<div className="grid gap-4 md:gap-8 my-4">
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{assignments.length}</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Total Students Enrolled</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{students?.total}</div>
						</CardContent>
					</Card>
				</div>
				{view === "assignments" && (
					<div className="w-full">
						<h1 className="text-xl font-bold mb-2">Recent Assignments</h1>
						<div className="flex items-center gap-2 flex-wrap gap-y-2">
							<Assignment assignments={assignments} />
						</div>
					</div>
				)}
				{view === "students" && (
					<div className="w-full">
						<h1 className="text-xl font-bold mb-2">Enrolled Students</h1>
						<div className="flex items-center gap-2 flex-wrap gap-y-2">
							<Assignment assignments={assignments} />
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
