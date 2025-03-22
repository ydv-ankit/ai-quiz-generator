import { dbId, questionCollectionId, quizCollectionId } from "@/models/name";
import { databases } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";

export const GET = async (req: NextRequest) => {
	try {
		const searchParams = req.nextUrl.searchParams;
		const quizId = searchParams.get("id");
		// check if quiz exists
		const quizDoc = await databases.getDocument(dbId, quizCollectionId, String(quizId));
		if (!quizDoc) {
			return NextResponse.json(
				{
					success: false,
					error: "quiz not found",
				},
				{
					status: 404,
				}
			);
		}
		const questions = await databases.listDocuments(dbId, questionCollectionId, [
			Query.equal("quizCollection", String(quizId)),
		]);
		return NextResponse.json(
			{
				success: true,
				data: questions.documents,
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
