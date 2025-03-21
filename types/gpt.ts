export type TGenerateQuiz = {
	question: string;
	options: {
		A: string;
		B: string;
		C: string;
		D: string;
	};
	correct_answer: "A" | "B" | "C" | "D";
};

export type TGptBody = {
	subject: string;
	topics: string[];
	total_questions: number;
	difficulty_level: "easy" | "medium" | "hard";
	additional_details: string;
};
