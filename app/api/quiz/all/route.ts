import { dbId, quizCollectionId } from "@/models/name";
import { databases } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";

export const GET = async (req: NextRequest) => {
	try {
		const searchParams = req.nextUrl.searchParams;
		const creatorId = searchParams.get("creatorId");
		const type = searchParams.get("type");
		// check if quiz exists
		const quizDocs = await databases.listDocuments(dbId, quizCollectionId, [
			Query.equal("userCollection", String(creatorId)),
			Query.equal("status", String(type)),
			Query.orderDesc("$createdAt"),
		]);
		return NextResponse.json(
			{
				success: true,
				data: quizDocs,
			},
			{
				status: 200,
			}
		);
	} catch (error: any) {
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
