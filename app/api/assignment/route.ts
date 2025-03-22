import { assignmentCollectionId, dbId } from "@/models/name";
import { databases } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";

export const POST = async (req: NextRequest) => {
	try {
		const { quizId, creatorId, status } = await req.json();
		const assignment = await databases.createDocument(dbId, assignmentCollectionId, ID.unique(), {
			quizId,
			creatorId,
			status,
		});
		return NextResponse.json({ success: true, data: assignment }, { status: 201 });
	} catch (error: any) {
		return NextResponse.json(
			{
				success: false,
				error: error?.message || "unknown error occured",
			},
			{
				status: 500,
			}
		);
	}
};
