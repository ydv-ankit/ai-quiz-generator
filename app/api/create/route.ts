import { dbId, questionCollectionId, quizCollectionId } from "@/models/name";
import { databases } from "@/models/server/config";
import { TGptBody } from "@/types/gpt";
import { ApiResponse } from "@/utils/ApiResponse";
import { GenerateQuizContent } from "@/utils/gpt/gpt";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";

export const POST = async (request: NextRequest) => {
	try {
		const { creatorId, data } = await request.json();

		const gptResponse = await GenerateQuizContent(JSON.stringify(data));
		console.log("gptResponse", gptResponse);
		if (!gptResponse) {
			return NextResponse.json(new ApiResponse("error", "error generating quiz"));
		}

		// create document for quiz
		const quizResponse = await databases.createDocument(dbId, quizCollectionId, ID.unique(), {
			id: ID.unique(),
			creatorId,
			createdAt: new Date(),
		});
		console.log("quizResponse", quizResponse);
		// add questions to question collection
		for (const ques of gptResponse) {
			await databases.createDocument(dbId, questionCollectionId, ID.unique(), {
				id: ID.unique(),
				question: ques.question,
				choices: JSON.stringify(ques.options),
				answer: ques.correct_answer,
				quizCollectionId: quizResponse.$id,
			});
		}
		return NextResponse.json(new ApiResponse("success", "quiz created successfully", gptResponse));
	} catch (error) {
		console.log(error);
		return NextResponse.json(new ApiResponse("error", error as string));
	}
};
