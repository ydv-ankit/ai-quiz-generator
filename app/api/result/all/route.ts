import { dbId, resultsCollectionId } from "@/models/name";
import { databases } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";

export const GET = async (req: NextRequest) => {
	try {
		const searchParams = req.nextUrl.searchParams;
		const userId = searchParams.get("userId");
		const results = await databases.listDocuments(dbId, resultsCollectionId, [
			Query.equal("userCollection", String(userId)),
		]);
		return NextResponse.json(
			{
				success: true,
				results,
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
