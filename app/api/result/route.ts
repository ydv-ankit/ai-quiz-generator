import { dbId, resultsCollectionId } from "@/models/name";
import { databases } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";

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
