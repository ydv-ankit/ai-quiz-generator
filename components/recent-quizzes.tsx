import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function RecentQuizzes() {
	return (
		<div className="space-y-8">
			{recentQuizzes.map((quiz) => (
				<div key={quiz.id} className="flex items-center">
					<Avatar className="h-9 w-9 mr-4">
						<AvatarImage src={quiz.avatar} alt={quiz.name} />
						<AvatarFallback>{quiz.name.charAt(0)}</AvatarFallback>
					</Avatar>
					<div className="space-y-1">
						<p className="text-sm font-medium leading-none">{quiz.name}</p>
						<p className="text-sm text-muted-foreground">
							{quiz.date} • {quiz.questions} questions
						</p>
					</div>
					<div className="ml-auto flex items-center gap-2">
						<Badge
							variant={quiz.status === "Completed" ? "default" : "outline"}>
							{quiz.status}
						</Badge>
						<span className="text-sm font-medium">
							{quiz.score && `${quiz.score}%`}
						</span>
					</div>
				</div>
			))}
		</div>
	);
}

const recentQuizzes = [
	{
		id: "1",
		name: "Physics Fundamentals",
		avatar: "/placeholder.svg?height=32&width=32",
		date: "2 hours ago",
		questions: 15,
		status: "Completed",
		score: 85,
	},
	{
		id: "2",
		name: "Chemistry Basics",
		avatar: "/placeholder.svg?height=32&width=32",
		date: "Yesterday",
		questions: 10,
		status: "Completed",
		score: 92,
	},
	{
		id: "3",
		name: "Biology Exam",
		avatar: "/placeholder.svg?height=32&width=32",
		date: "3 days ago",
		questions: 20,
		status: "Completed",
		score: 78,
	},
	{
		id: "4",
		name: "Math Quiz",
		avatar: "/placeholder.svg?height=32&width=32",
		date: "1 week ago",
		questions: 12,
		status: "Completed",
		score: 95,
	},
];
