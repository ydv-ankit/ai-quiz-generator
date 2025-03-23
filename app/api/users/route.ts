import { dbId, userCollectionId } from "@/models/name";
import { databases } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";

export const GET = async (req: NextRequest) => {
	try {
		const searchParams = req.nextUrl.searchParams;
		const team = searchParams.get("team");
		const users = await databases.listDocuments(dbId, userCollectionId, [
			Query.equal("role", "student"),
			Query.equal("team", String(team)),
		]);
		return NextResponse.json(
			{
				success: true,
				data: users,
			},
			{
				status: 200,
			}
		);
	} catch (error: any) {
		return NextResponse.json(
			{
				success: false,
				error: error?.message,
			},
			{
				status: 500,
			}
		);
	}
};
