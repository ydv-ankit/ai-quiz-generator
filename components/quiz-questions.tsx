import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";

export const QuizQuestions = ({
	questions,
	quizId,
}: {
	questions: Array<unknown>;
	quizId: Promise<{
		quizId: string;
	}>;
}) => {
	const [selections, setSelections] = useState<Array<string | undefined>>(
		Array.from({ length: questions.length }, () => undefined)
	);
	const { user } = useAuthStore();
	const router = useRouter();

	const handleSubmitQuiz = async () => {
		try {
			// check if all selections are made
			if (selections.find((e) => e === undefined)) {
				toast("Please select all options", {
					description: (
						<pre className="mt-2 w-[340px] rounded-md dark:bg-slate-950 p-4">
							<code className="text-white">Please select all options</code>
						</pre>
					),
				});
				return;
			}
			const bodyParams = {
				attempts: selections,
				questions,
				userId: user?.$id,
				quizId: (await quizId).quizId,
			};
			console.log("bodyParams", bodyParams);

			const res = await fetch("/api/result", {
				method: "POST",
				body: JSON.stringify(bodyParams),
			});
			const data = await res.json();
			console.log("data", data);
			if (!data.success) {
				toast("Error", {
					description: (
						<pre className="mt-2 w-[340px] rounded-md dark:bg-slate-950 p-4">
							<code className="dark:text-white">Error getting result...</code>
						</pre>
					),
				});
				return;
			}

			router.push(`/results/${data.result.$id}`);
		} catch (error: unknown) {
			console.log(error);

			toast("Error", {
				description: (
					<pre className="mt-2 w-[340px] rounded-md dark:bg-slate-950 p-4">
						<code className="dark:text-white">Error creating quiz...</code>
					</pre>
				),
			});
		}
	};

	const handleSelectOption = (e: any, idx: number) => {
		selections[idx] = e;
		setSelections(() => selections);
	};

	return (
		<div className="">
			<div className="space-y-2 w-full">
				{questions.map((ques: any, idx) => {
					return (
						<div key={idx} className="flex flex-col gap-1 border-b m-4">
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
							{/* options to choose from < A | B | C | D > */}
							<div className="my-2">
								<RadioGroup
									defaultValue={undefined}
									className="flex space-x-8"
									onValueChange={(e) => handleSelectOption(e, idx)}>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="A" id="A" />
										<Label htmlFor="A">A</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="B" id="B" />
										<Label htmlFor="B">B</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="C" id="C" />
										<Label htmlFor="C">C</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="D" id="D" />
										<Label htmlFor="D">D</Label>
									</div>
								</RadioGroup>
							</div>
						</div>
					);
				})}
				<Button className="mx-auto w-fit" onClick={handleSubmitQuiz}>
					Submit
				</Button>
			</div>
		</div>
	);
};
