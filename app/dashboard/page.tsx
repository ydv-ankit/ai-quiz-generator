import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Link from "next/link";
import { BookOpen, Clock } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/shell";
import { DashboardHeader } from "@/components/dashboard/header";
import { QuizStats } from "@/components/charts/quiz-stats";
import { RecentQuizzes } from "@/components/recent-quizzes";

export default function StudentDashboardPage() {
	return (
		<DashboardShell>
			<DashboardHeader
				heading="Student Dashboard"
				text="Practice quizzes and complete your assignments.">
				<Link href="/student/practice">
					<Button>
						<BookOpen className="mr-2 h-4 w-4" />
						Practice Quiz
					</Button>
				</Link>
			</DashboardHeader>
			<div className="grid gap-4 md:gap-8">
				<Tabs defaultValue="overview" className="space-y-4">
					<TabsList>
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="assignments">Assignments</TabsTrigger>
						<TabsTrigger value="practice">Practice</TabsTrigger>
					</TabsList>
					<TabsContent value="overview" className="space-y-4">
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Pending Assignments
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">3</div>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Completed Quizzes
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">12</div>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Average Score
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">85%</div>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Practice Sessions
									</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">8</div>
								</CardContent>
							</Card>
						</div>
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
							<Card className="col-span-4">
								<CardHeader>
									<CardTitle>Recent Quizzes</CardTitle>
								</CardHeader>
								<CardContent>
									<RecentQuizzes />
								</CardContent>
							</Card>
							<Card className="col-span-3">
								<CardHeader>
									<CardTitle>Performance by Subject</CardTitle>
								</CardHeader>
								<CardContent>
									<QuizStats />
								</CardContent>
							</Card>
						</div>
					</TabsContent>
					<TabsContent value="assignments" className="space-y-4">
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
							{Array.from({ length: 3 }).map((_, i) => (
								<Card key={i}>
									<CardHeader>
										<CardTitle>Physics Assignment {i + 1}</CardTitle>
										<CardDescription>
											Due:{" "}
											{new Date(
												Date.now() + 86400000 * (i + 2)
											).toLocaleDateString()}
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="flex items-center gap-2 text-muted-foreground mb-2">
											<Clock className="h-4 w-4" />
											<span>30 minutes</span>
										</div>
										<p className="text-sm text-muted-foreground">
											Topics: Mechanics, Thermodynamics, Electromagnetism
										</p>
									</CardContent>
									<CardFooter>
										<Button className="w-full">Start Assignment</Button>
									</CardFooter>
								</Card>
							))}
						</div>
					</TabsContent>
					<TabsContent value="practice" className="space-y-4">
						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
							{[
								"Physics",
								"Chemistry",
								"Biology",
								"Mathematics",
								"History",
								"English",
							].map((subject, i) => (
								<Card key={i}>
									<CardHeader>
										<CardTitle>{subject}</CardTitle>
										<CardDescription>
											Practice questions on various {subject.toLowerCase()}{" "}
											topics
										</CardDescription>
									</CardHeader>
									<CardContent>
										<p className="text-sm text-muted-foreground">
											Generate custom quizzes to test your knowledge
										</p>
									</CardContent>
									<CardFooter>
										<Button className="w-full">Practice Now</Button>
									</CardFooter>
								</Card>
							))}
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</DashboardShell>
	);
}
