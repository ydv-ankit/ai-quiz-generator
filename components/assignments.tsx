import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { capitalizeFirstLetter } from "@/utils/helper";
import { toast } from "sonner";
import { revalidatePath } from "next/cache";

export const Assignment = ({ assignments }: { assignments: Array<any> }) => {
	const handlePostAssignment = async (id: string) => {
		try {
			await fetch("/api/assignments", {
				method: "PUT",
				body: JSON.stringify({
					assignmentId: id,
				}),
			});
			revalidatePath("/dashboard");
		} catch (error) {
			toast("Error", {
				description: (
					<pre>
						<code>Error! Cannot post assignment</code>
					</pre>
				),
			});
		}
	};

	return (
		<>
			{assignments.map((assignment, i) => (
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
							<Button className="w-full" onClick={() => handlePostAssignment(assignment.$id)}>
								Post
							</Button>
						)}
					</CardFooter>
				</Card>
			))}
		</>
	);
};
