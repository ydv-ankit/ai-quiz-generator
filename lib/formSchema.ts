"use client";

import { z } from "zod";

const QuizFormSchema = z.object({
	subject: z.string(),
	topics: z.array(z.string()),
	total_questions: z
		.number()
		.min(5, "more than or equals to 5 questions required")
		.max(20, "exceeded questions limit"),
	difficulty_level: z.enum(["easy", "medium", "hard"]),
	additional_details: z.string(),
});

export { QuizFormSchema };
