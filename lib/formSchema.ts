"use client";

import { z } from "zod";

const QuizFormSchema = z.object({
	subject: z.string(),
	topics: z.array(z.string()),
	total_questions: z.number(),
	difficulty_level: z.enum(["easy", "medium", "hard"]),
	addition_details: z.string(),
});

export { QuizFormSchema };
