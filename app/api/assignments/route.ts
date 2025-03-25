import { assignmentCollectionId, dbId, userCollectionId } from "@/models/name";
import { databases } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";
import { ID, Query } from "node-appwrite";

export const POST = async (req: NextRequest) => {
	try {
		const { quizId, creatorId, status } = await req.json();
		const assignment = await databases.createDocument(dbId, assignmentCollectionId, ID.unique(), {
			quizCollection: quizId,
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

export const GET = async (req: NextRequest) => {
	try {
		const searchParams = req.nextUrl.searchParams;
		const dataType = searchParams.get("type");
		const creatorId = searchParams.get("creatorId");

		const assignments = await databases.listDocuments(dbId, assignmentCollectionId, [
			Query.orderDesc("$createdAt"),
			Query.equal("status", String(dataType)),
			Query.equal("creatorId", String(creatorId)),
		]);
		console.log(assignments);

		return NextResponse.json({ success: true, data: assignments }, { status: 200 });
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

export const PUT = async (req: NextRequest) => {
	try {
		const { assignmentId } = await req.json();
		const assignment = await databases.updateDocument(dbId, assignmentCollectionId, assignmentId, {
			status: "posted",
		});

		return NextResponse.json({ success: true, data: assignment }, { status: 200 });
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
