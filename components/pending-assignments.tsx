import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { capitalizeFirstLetter } from "@/utils/helper";
import { AssignmentData } from "@/app/dashboard/page";
import { useRouter } from "next/navigation";

export const PendingAssignment = ({ quizzes }: { quizzes: AssignmentData }) => {
	const router = useRouter();
	return (
		<>
			{quizzes.documents.map((quiz, i) => (
				<Card key={i}>
					<CardHeader>
						<CardTitle>{capitalizeFirstLetter(quiz.subject)} quiz</CardTitle>
						<CardDescription>
							Created On: {new Date(quiz.$createdAt).toLocaleString()}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground">
							Topics:{" "}
							<span className=" bg-muted-foreground/10 p-2 rounded-md">
								{JSON.parse(quiz.topics).join(", ")}
							</span>
						</p>
					</CardContent>
					<CardFooter>
						{quiz.status === "posted" ? (
							<div className="text-center w-full text-slate-200 bg-black/70 rounded-lg p-2 cursor-not-allowed">
								Posted
							</div>
						) : (
							<Button className="w-full" onClick={() => router.push(`/quiz/${quiz.$id}`)}>
								Practice Now
							</Button>
						)}
					</CardFooter>
				</Card>
			))}
		</>
	);
};
