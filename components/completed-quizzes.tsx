import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { AssignmentData } from "@/app/dashboard/page";
import { capitalizeFirstLetter } from "@/utils/helper";

export const CompletedQuizzes = ({ results }: { results: AssignmentData }) => {
	return (
		<div className="w-[95%] overflow-x-auto">
			<Table>
				<TableCaption>A list of your recent quizzes.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Serial No</TableHead>
						<TableHead className="w-[100px]">Id</TableHead>
						<TableHead>Subject</TableHead>
						<TableHead>Topics</TableHead>
						<TableHead className="text-right">Result</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{results.documents.map((result, i) => (
						<TableRow key={i}>
							<TableCell className="font-medium">{i + 1}</TableCell>
							<TableCell className="font-medium">
								{capitalizeFirstLetter(String(result.$id))}
							</TableCell>
							<TableCell>{result.quizCollection.subject}</TableCell>
							<TableCell>{JSON.parse(result.quizCollection.topics).join(", ")}</TableCell>
							<TableCell className="text-right">
								{result.resultantScore}/{result.totalScore}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};
