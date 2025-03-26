import { dbId, quizCollectionId, resultsCollectionId } from "@/models/name";
import { databases } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";

export const GET = async (req: NextRequest) => {
	try {
		const searchParams = req.nextUrl.searchParams;
		const resultId = searchParams.get("id");
		const result = await databases.getDocument(dbId, resultsCollectionId, String(resultId));

		return NextResponse.json(
			{
				success: true,
				result,
			},
			{
				status: 200,
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

export const POST = async (req: NextRequest) => {
	try {
		const body = await req.json();
		const attempts = body.attempts;
		const questions = body.questions;
		const userId = body.userId;
		const quizId = body.quizId;

		let correct = 0;
		const total = questions.length;
		questions.map((question: any, idx: number) => {
			if (question.answer === attempts[idx]) correct++;
		});
		const result = await databases.createDocument(dbId, resultsCollectionId, ID.unique(), {
			totalScore: total,
			resultantScore: correct,
			userCollection: userId,
			quizCollection: quizId,
		});
		console.log("result", result);

		await databases.updateDocument(dbId, quizCollectionId, String(quizId), {
			status: "completed",
		});

		return NextResponse.json(
			{
				success: true,
				result,
			},
			{
				status: 200,
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
