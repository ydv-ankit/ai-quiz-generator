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
	content: {
		subject: string;
		topics: string[];
	}[];
	constraints: {
		total_questions: number;
		difficulty_level: "easy" | "medium" | "hard";
	};
};
