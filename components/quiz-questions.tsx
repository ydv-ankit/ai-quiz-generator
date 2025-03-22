import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "./ui/button";
import { useState } from "react";

export const QuizQuestions = ({ questions }: { questions: Array<any> }) => {
	const [selections, setSelections] = useState<Array<string>>(new Array(questions?.length));

	const handleSelectOption = (e: any, idx: number) => {
		selections[idx] = e;
		setSelections(() => selections);
		console.log(selections[7]);
	};

	return (
		<div className="">
			<div className="space-y-2 w-full">
				{questions.map((ques, idx) => {
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
				<Button className="mx-auto w-fit">Submit</Button>
			</div>
		</div>
	);
};
