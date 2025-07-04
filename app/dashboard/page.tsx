"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/header";
import { useAuthStore } from "@/store/auth";
import { PendingQuizzes } from "@/components/pending-quizzes";
import { useEffect, useState } from "react";
import { Loader } from "@/components/loader";
import { CompletedQuizzes } from "@/components/completed-quizzes";
import { AuthGuard } from "@/components/auth-guard";

export interface AssignmentData {
	total: number;
	documents: Array<any>;
}

enum Views {
	"CA", // Completed Assignments
	"PA", // Pending Assignments
}

function DashboardContent() {
	const [isLoading, setIsLoading] = useState(false);
	const [averageScore, setAverageScore] = useState(0);
	const [pendingQuizzes, setPendingQuizzes] = useState<AssignmentData>({
		total: 0,
		documents: [],
	});
	const [results, setResults] = useState<AssignmentData>({
		total: 0,
		documents: [],
	});
	const [view, setView] = useState<Views>(Views.CA);
	const { user } = useAuthStore();

	useEffect(() => {
		(() => {
			if (!results?.total) return 0;

			let totalScore = 0;
			let resultantTotalScore = 0;
			for (const result of results.documents) {
				totalScore += result.totalScore;
				resultantTotalScore += result.resultantScore;
			}

			const avg = Number(resultantTotalScore) / Number(totalScore);

			setAverageScore(() => Math.floor(avg * 100));
		})();
	}, [results]);

	const handleGetResults = async () => {
		try {
			if (!user) return;
			const res = await fetch(`/api/result/all?userId=${user?.$id}`);
			const data = await res.json();

			// sort results by createdAt in descending order (newest first)
			const sortedResults = data.results.documents.sort((a: any, b: any) => {
				const dateA = new Date(a.$createdAt);
				const dateB = new Date(b.$createdAt);
				return dateB.getTime() - dateA.getTime();
			});
			
			setResults(() => ({
				total: sortedResults.length,
				documents: sortedResults,
			}));
		} catch (error) {
			console.log(error);
		}
	};

	const handleGetAssignments = async (type: "pending") => {
		if (!user) return;
		const res = await fetch(`/api/quiz/all?type=${type}&creatorId=${user?.$id}`);
		const data = await res.json();

		setPendingQuizzes(() => data.data);
	};
	useEffect(() => {
		(async () => {
			setIsLoading(true);
			await handleGetAssignments("pending");
			await handleGetResults();
			setIsLoading(false);
		})();
	}, [user?.$id]);

	if (!user || isLoading) {
		return <Loader />;
	}

	return (
		<div className="p-2">
			<DashboardHeader heading="Dashboard" text="Create new quizzes and evaluate your knowledge">
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
								<div className="text-2xl font-bold">{results?.total}</div>
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
							<div className="text-2xl font-bold">{averageScore}%</div>
						</CardContent>
					</Card>
				</div>
				{view === Views.CA && (
					<div className="w-full">
						<h1 className="text-xl font-bold mb-2">Recent Quizzes</h1>
						<div className="flex items-center gap-2 flex-wrap gap-y-2">
							{results.documents.length > 0 ? (
								<CompletedQuizzes results={results} />
							) : (
								<div className="mx-auto mt-2">Complete a quiz and come back...</div>
							)}
						</div>
					</div>
				)}
				{view === Views.PA && (
					<div className="w-full">
						<h1 className="text-xl font-bold mb-2">Pending Quizzes</h1>
						{/* <div className="flex items-center gap-2 flex-wrap gap-y-2"> */}
						<div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
							{pendingQuizzes.documents.length > 0 ? (
								<PendingQuizzes quizzes={pendingQuizzes} />
							) : (
								<div className="mx-auto mt-2">Create a quiz first...</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default function Dashboard() {
	return (
		<AuthGuard>
			<DashboardContent />
		</AuthGuard>
	);
}
