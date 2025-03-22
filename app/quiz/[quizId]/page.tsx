"use client";

import { QuizQuestions } from "@/components/quiz-questions";
import { useEffect, useState } from "react";

export default function Quiz({ params }: { params: Promise<{ quizId: string }> }) {
	const [questions, setQuestions] = useState<Array<any>>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("got some errors");

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
				{questions?.length > 0 && <QuizQuestions questions={questions} />}
			</div>
		</div>
	);
}
