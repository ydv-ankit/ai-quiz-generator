import { zodResponseFormat } from "openai/helpers/zod.mjs";
import { openai } from "./client";
import { z } from "zod";
import { TGenerateQuiz } from "@/types/gpt";

export const GenerateQuizContent = async (
	content: string
): Promise<TGenerateQuiz[] | undefined> => {
	try {
		const total_questions = JSON.parse(content).total_questions;
		const response_structure = z.object({
			questions: z.array(
				z.object({
					question: z.string(),
					options: z.object({
						A: z.string(),
						B: z.string(),
						C: z.string(),
						D: z.string(),
					}),
					correct_answer: z.enum(["A", "B", "C", "D"]),
				})
			),
		});
		const shortDescription = await openai.chat.completions.create({
			messages: [
				{
					role: "system",
					content: `
						you are a teacher. you are given topics along with some constraints.
						you have to generate multiple choice questions based on the provided topics.
						
						- count and ensure total number of questions are same as asked by user and verify all questions with their answers.
						- distribute the questions evenly or proportionally across all specified topics.
						- ensure length of questions array is equal to total number of questions
						
						you have to do following tasks:
						- generate ${total_questions} questions from the provided topics by user and according to difficulty level: easy - school level, medium: college level, hard: research level.
						- generate 4 choices with 1 correct and 3 incorrect for each question.
						- shuffle the choices randomly so that the correct answer is not always in the same position.
						- provide which option is correct

						store the following in given format:
						question: generated question.
						options: generated choices.
						correct_answer: A | B | C | D
						
						return response in json format.
					`,
				},
				{ role: "user", content: content },
			],
			model: "gpt-4o-mini",
			response_format: zodResponseFormat(response_structure, "response_structure"),
		});
		return JSON.parse(shortDescription.choices[0].message.content as string) || null;
	} catch (error) {
		throw new Error(`Error generating response: ${error}`);
		return;
	}
};
