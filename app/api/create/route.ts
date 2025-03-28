import { dbId, questionCollectionId, quizCollectionId } from "@/models/name";
import { databases } from "@/models/server/config";
import { GenerateQuizContent } from "@/utils/gpt/gpt";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";

export const POST = async (request: NextRequest) => {
	try {
		const { creatorId, data } = await request.json();
		const gptResponse = await GenerateQuizContent(JSON.stringify(data));
		console.log("gptResponse", gptResponse);
		if (!gptResponse) {
			return NextResponse.json(
				{
					success: false,
					error: "Error occured while generating quiz",
				},
				{
					status: 500,
				}
			);
		}

		// create document for quiz
		const quizResponse = await databases.createDocument(dbId, quizCollectionId, ID.unique(), {
			subject: data.subject,
			topics: JSON.stringify(data.topics),
			userCollection: creatorId,
			status: "pending",
		});
		// add questions to question collection
		for (const ques of gptResponse.questions) {
			await databases.createDocument(dbId, questionCollectionId, ID.unique(), {
				question: ques.question,
				choices: JSON.stringify(ques.options),
				answer: ques.correct_answer,
				quizCollection: quizResponse.$id,
			});
		}
		return NextResponse.json(
			{
				success: true,
				quizId: quizResponse.$id,
			},
			{
				status: 201,
			}
		);
	} catch (error: any) {
		console.log(error);
		return NextResponse.json(
			{
				success: false,
				error: error?.message || "Error occured",
			},
			{
				status: 500,
			}
		);
	}
};
