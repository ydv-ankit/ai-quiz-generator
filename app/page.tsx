import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import Link from "next/link";

const words: { text: string; className?: string | undefined }[] = [
	{ text: "Generate", className: "text-2xl mt-4 text-center text-blue-500" },
	{ text: "Quizzes", className: "text-2xl mt-4 text-center text-orange-500" },
	{ text: "For", className: "text-2xl mt-4 text-center text-blue-500" },
	{ text: "Any", className: "text-2xl mt-4 text-center text-blue-500" },
	{ text: "Topics", className: "text-2xl mt-4 text-center text-blue-500" },
	{ text: "Using", className: "text-2xl mt-4 text-center text-blue-500" },
	{ text: "AI", className: "text-2xl mt-4 text-center text-blue-500" },
];

export default function Home() {
	return (
		<div>
			<AuroraBackground>
				<div className="flex flex-col items-center z-10 justify-center">
					<h1 className="text-7xl font-bold">AI Quiz Generator</h1>
					<TypewriterEffect words={words} cursorClassName="md:h-4 h-2 lg:h-5" />
					<Link href={"/create"}>
						<button className="p-[3px] relative mt-10 hover:scale-105 transition-all duration-200">
							<div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
							<div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
								Try Now
							</div>
						</button>
					</Link>
				</div>
			</AuroraBackground>
		</div>
	);
}
