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
