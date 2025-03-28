import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { capitalizeFirstLetter } from "@/utils/helper";
import { AssignmentData } from "@/app/dashboard/page";
import { useRouter } from "next/navigation";

export const PendingQuizzes = ({ quizzes }: { quizzes: AssignmentData }) => {
	const router = useRouter();
	return (
		<>
			{quizzes.documents.map((quiz, i) => (
				<Card key={i} className="flex flex-col h-full">
					<CardHeader>
						<CardTitle>{capitalizeFirstLetter(quiz.subject)} quiz</CardTitle>
						<CardDescription>
							Created On: {new Date(quiz.$createdAt).toLocaleString()}
						</CardDescription>
					</CardHeader>
					<CardContent className="flex-1">
						<p className="text-sm text-muted-foreground flex flex-col">
							Topics
							<span className="flex gap-2 flex-wrap">
								{JSON.parse(quiz.topics).map((topic: string) => (
									<span className="bg-zinc-300 text-zinc-700 rounded-md p-1">{topic}</span>
								))}
								{JSON.parse(quiz.topics).map((topic: string) => (
									<span className="bg-zinc-300 text-zinc-700 rounded-md p-1">{topic}</span>
								))}
							</span>
						</p>
					</CardContent>
					<CardFooter className="relative bottom-0">
						{quiz.status === "posted" ? (
							<div className="text-center w-full text-slate-200 bg-black/70 rounded-lg p-2 cursor-not-allowed">
								Posted
							</div>
						) : (
							<Button
								className="w-full relative bottom-0"
								onClick={() => router.push(`/quiz/${quiz.$id}`)}>
								Practice Now
							</Button>
						)}
					</CardFooter>
				</Card>
			))}
		</>
	);
};
