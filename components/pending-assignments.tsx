import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { capitalizeFirstLetter } from "@/utils/helper";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { AssignmentData } from "@/app/dashboard/page";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";

export const PendingAssignment = ({ assignments }: { assignments: AssignmentData }) => {
	const router = useRouter();
	return (
		<>
			{assignments.documents.map((assignment, i) => (
				<Card key={i}>
					<CardHeader>
						<CardTitle>
							{capitalizeFirstLetter(assignment.quizCollection.subject)} Assignment
						</CardTitle>
						<CardDescription>
							Created On: {new Date(assignment.$createdAt).toLocaleString()}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground">
							Topics: {JSON.parse(assignment.quizCollection.topics).join(", ")}
						</p>
					</CardContent>
					<CardFooter>
						{assignment.status === "posted" ? (
							<div className="text-center w-full text-slate-200 bg-black/70 rounded-lg p-2 cursor-not-allowed">
								Posted
							</div>
						) : (
							<Button
								className="w-full"
								onClick={() => router.push(`/quiz/${assignment.quizCollection.$id}`)}>
								Practice Now
							</Button>
						)}
					</CardFooter>
				</Card>
			))}
		</>
	);
};
