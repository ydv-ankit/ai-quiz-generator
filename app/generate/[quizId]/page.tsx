"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Quiz({ params }: { params: Promise<{ quizId: string }> }) {
	const [questions, setQuestions] = useState<Array<any>>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("got some errors");
	const { user } = useAuthStore();
	const router = useRouter();

	const searchParams = useSearchParams();

	const handleSaveQuiz = async () => {
		try {
			const { quizId } = await params;
			await fetch("/api/assignments", {
				method: "POST",
				body: JSON.stringify({
					quizId,
					creatorId: user?.$id,
					status: "unposted",
				}),
			});
			router.push("/dashboard");
		} catch (error) {
			toast("Error", {
				description: (
					<pre className="mt-2 w-[340px] rounded-md dark:bg-slate-950 p-4">
						<code className="text-white">Error saving quiz...</code>
					</pre>
				),
			});
		}
	};

	useEffect(() => {
		(async () => {
			try {
				setIsLoading(true);
				setError("");
				const { quizId } = await params;
				const res = await fetch(`/api/quiz?id=${quizId}`);
				const questionsRes = await res.json();
				console.log("questionsRes", questionsRes);
				if (questionsRes.success) {
					setQuestions(questionsRes.data);
				} else {
					setError(questionsRes.error);
				}
			} catch (error: any) {
				setError(error?.message);
			} finally {
				setIsLoading(false);
			}
		})();
	}, [params]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="w-[80%] mx-auto">
			<h1 className="text-xl">Quiz Questions</h1>
			<div className="my-6">
				{error && <div className="text-red-700 bg-red-200 text-lg p-2">{error}</div>}
				{questions?.length > 0 && (
					<div className="">
						<div className="space-y-2 w-full">
							{questions.map((ques, idx) => {
								return (
									<div key={idx} className="flex flex-col gap-1 border-b m-4 py-2">
										{/* question */}
										<div className="flex gap-2 text-lg">
											<span className="font-bold text-nowrap">Q {idx + 1}.</span>
											<span className="text-wrap">{ques.question}</span>
										</div>
										{/* choices */}
										<div>
											{Object.entries(JSON.parse(ques.choices)).map(([key, value]) => (
												<div key={key} className="text-gray-700 dark:text-gray-300">
													<strong className="text-nowrap">{key}:</strong>
													<span className="text-wrap"> {value as string}</span>
												</div>
											))}
										</div>
									</div>
								);
							})}
							{searchParams.get("view") === "allow" ? (
								<Button className="mx-auto w-fit" onClick={() => router.back()}>
									Back
								</Button>
							) : (
								<Button className="mx-auto w-fit" onClick={handleSaveQuiz}>
									Save
								</Button>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
