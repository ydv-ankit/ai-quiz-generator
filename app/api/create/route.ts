import {
	assignmentCollectionId,
	dbId,
	questionCollectionId,
	quizCollectionId,
} from "@/models/name";
import { databases } from "@/models/server/config";
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
			subject: data.subject,
			topics: JSON.stringify(data.topics),
			userCollection: creatorId,
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
		return NextResponse.json(new ApiResponse("success", "quiz created successfully", quizResponse));
	} catch (error) {
		console.log(error);
		return NextResponse.json(new ApiResponse("error", error as string));
	}
};
