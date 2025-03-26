"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { useAuthStore } from "@/store/auth";
import { PendingAssignment } from "@/components/pending-assignments";
import { useEffect, useState } from "react";
import { Loader } from "@/components/loader";

export interface AssignmentData {
	total: number;
	documents: Array<any>;
}

enum Views {
	"CA",
	"PA",
}

export default function TeacherDashboardPage() {
	const [isLoading, setIsLoading] = useState(true);

	const [pendingQuizzes, setPendingQuizzes] = useState<AssignmentData>({
		total: 0,
		documents: [],
	});
	const [completedAssignments, setCompletedAssignments] = useState<AssignmentData>({
		total: 0,
		documents: [],
	});
	const [view, setView] = useState<Views | null>(null);
	const { user } = useAuthStore();

	const handleGetAssignments = async (type: "pending" | "completed") => {
		if (!user) return;
		setIsLoading(true);
		const res = await fetch(`/api/quiz/all?type=${type}&creatorId=${user?.$id}`);
		const data = await res.json();
		console.log(type, data);

		if (type === "pending") setPendingQuizzes(data.data);
		if (type === "completed") setCompletedAssignments(data.data);
		setIsLoading(false);
	};
	useEffect(() => {
		handleGetAssignments("pending");
		handleGetAssignments("completed");
	}, [user?.$id]);

	if (!user) {
		return <Loader />;
	}
	console.log(pendingQuizzes);

	return (
		<div className="p-2">
			<DashboardHeader
				heading="Dashboard"
				text="Create and new quizzes and evaluate your knowledge">
				<Link href="/generate">
					<Button>
						<BookOpen className="mr-2 h-4 w-4" />
						New Quiz
					</Button>
				</Link>
			</DashboardHeader>
			<div className="grid gap-4 md:gap-8 my-4">
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Completed Quizzes</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex items-center justify-between">
								<div className="text-2xl font-bold">{completedAssignments?.total}</div>
								<Button onClick={() => setView(Views.CA)}>View</Button>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Pending Quizzes</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex items-center justify-between">
								<div className="text-2xl font-bold">{pendingQuizzes?.total}</div>
								<Button onClick={() => setView(Views.PA)}>View</Button>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">Average Score</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">85%</div>
						</CardContent>
					</Card>
				</div>
				{view === Views.CA && (
					<div className="w-full">
						<h1 className="text-xl font-bold mb-2">Recent Assignments</h1>
						<div className="flex items-center gap-2 flex-wrap gap-y-2"></div>
					</div>
				)}
				{view === Views.PA && (
					<div className="w-full">
						<h1 className="text-xl font-bold mb-2">Pending Quizzes</h1>
						<div className="flex items-center gap-2 flex-wrap gap-y-2">
							{pendingQuizzes && <PendingAssignment quizzes={pendingQuizzes} />}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
