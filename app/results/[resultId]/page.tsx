"use client";

import { Loader } from "@/components/loader";
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

	if (!result) {
		return <Loader />;
	}

	return (
		<div className="flex items-center flex-col h-screen gap-3">
			<h1 className="text-xl md:text-2xl font-bold my-4">Quiz Completed</h1>
			<div className="flex items-center flex-col justify-center">
				<div className="text-lg">
					<span className="font-bold">Total marks:</span>
					<span className="mx-2">{result?.totalScore}</span>
				</div>

				<div>
					<span className="font-bold">Marks scored:</span>
					<span className="mx-2">{result?.resultantScore}</span>
				</div>
			</div>
			<Button onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
		</div>
	);
}
