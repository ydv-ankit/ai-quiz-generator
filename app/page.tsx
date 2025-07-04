"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowBigDown, BookOpen, GraduationCap, Users } from "lucide-react";
import { Footer } from "@/components/footer";
import { Globe } from "@/components/magicui/globe";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();
	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-1">
				<section className="relative w-full py-12 md:py-24 lg:py-32 h-screen flex items-center justify-center">
					<AnimatedGridPattern className="opacity-10 hidden md:block" />
					<div className="container px-4 md:px-6 w-full">
						<div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
							<div className="flex flex-col justify-center space-y-4">
								<div className="space-y-2">
									<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl leading-relaxed">
										Create Smart, Adaptive Quizzes Instantly!
									</h1>
									<p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
										Create personalized quizzes based on any topic, difficulty level, and question
										count. Perfect for practicing concepts.
									</p>
								</div>
								<div className="flex flex-col gap-2 min-[400px]:flex-row items-center">
									<div className="w-fit flex items-center justify-center gap-2 bg-black hover:bg-zinc-100/30 duration-200 text-white rounded-md cursor-pointer text-sm font-thin">
										<Button size="lg" onClick={() => router.push("/login")}>
											Create Now
										</Button>
									</div>
									<Link href="/#features">
										<Button size="lg" variant="outline" className="w-full">
											Learn More
										</Button>
									</Link>
								</div>
							</div>
							<div className="mx-auto lg:mx-0 relative">
								<Globe className="-mt-72 opacity-70" />
							</div>
						</div>
					</div>
					<div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center justify-center mt-10">
						<ArrowBigDown className="h-10 w-10 animate-bounce cursor-pointer hover:scale-110" onClick={() => {
							window.scrollTo({
								top: window.innerHeight + 100,
								behavior: "smooth",
							});
						}}/>
					</div>
				</section>
				<section
					id="features"
					className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
					<div className="container px-4 md:px-6">
						<div className="flex flex-col items-center justify-center space-y-4 text-center">
							<div className="space-y-2">
								<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Key Features</h2>
								<p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
									Everything you need to create, assign, and take quizzes
								</p>
							</div>
						</div>
						<div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
							<Card className="relative overflow-hidden">
								<CardContent className="p-6 flex flex-col items-center text-center space-y-4">
									<div className="rounded-full bg-primary/10 p-3 text-primary">
										<BookOpen className="h-6 w-6" />
									</div>
									<h3 className="text-xl font-bold">Customizable Question Generation</h3>
									<p className="text-gray-500 dark:text-gray-400">
										Generate quiz questions tailored to specific topics of your choice—whether it&apos;s
										science, history, pop culture, or any subject you want to focus on.
									</p>
								</CardContent>
							</Card>
							<Card className="relative overflow-hidden">
								<CardContent className="p-6 flex flex-col items-center text-center space-y-4">
									<div className="rounded-full bg-primary/10 p-3 text-primary">
										<GraduationCap className="h-6 w-6" />
									</div>
									<h3 className="text-xl font-bold">Instant Score Feedback</h3>
									<p className="text-gray-500 dark:text-gray-400">
										After completing the quiz, instantly receive a score based on your answers, with
										a clear breakdown of correct and incorrect responses.
									</p>
								</CardContent>
							</Card>
							<Card className="relative overflow-hidden">
								<CardContent className="p-6 flex flex-col items-center text-center space-y-4">
									<div className="rounded-full bg-primary/10 p-3 text-primary">
										<Users className="h-6 w-6" />
									</div>
									<h3 className="text-xl font-bold">AI-Powered Question Variety</h3>
									<p className="text-gray-500 dark:text-gray-400">
										The AI generates unique questions every time, so you never get the same quiz
										twice—ensuring a fresh experience with every try.
									</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}
