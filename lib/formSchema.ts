"use client";

import { z } from "zod";

const QuizFormSchema = z.object({
	content: z.array(
		z.object({
			subject: z.string(),
			topics: z.array(z.string()),
		})
	),
	constraints: z.object({
		total_questions: z.number(),
		difficulty_level: z.enum(["easy", "medium", "hard"]),
	}),
});

export { QuizFormSchema };
