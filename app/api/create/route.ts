import { ApiResponse } from "@/utils/ApiResponse";
import { GenerateQuizContent } from "@/utils/gpt/gpt";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
	try {
		const body: string = await request.json();
		console.log(body);

		const gptResponse = await GenerateQuizContent(JSON.stringify(body));

		return NextResponse.json(new ApiResponse("success", "hello", gptResponse));
	} catch (error) {
		console.log(error);
		return NextResponse.json(new ApiResponse("error", error as string));
	}
};
