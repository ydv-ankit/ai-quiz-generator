"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResultPage({ params }: { params: Promise<{ resultId: string }> }) {
	const [result, setResult] = useState<any>();
	const router = useRouter();

	useEffect(() => {
		(async () => {
			const resultId = (await params).resultId;
			const res = await fetch(`/api/result?id=${resultId}`);
			const data = await res.json();
			setResult(data.result);
		})();
	}, []);

	return (
		<div>
			<h1>Quiz Completed</h1>
			<div>Result</div>
			<div>
				<div>
					<span>Total marks:</span>
					<span>{result?.totalScore}</span>
				</div>

				<div>
					<span>Marks scored:</span>
					<span>{result?.resultantScore}</span>
				</div>
			</div>
			<Button onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
		</div>
	);
}
