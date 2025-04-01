"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { QuizFormSchema } from "@/lib/formSchema";
import { WandSparkles, X } from "lucide-react";
import { KeyboardEvent, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";

export default function CreateQuestion() {
	const [topicValue, setTopicValue] = useState<string>("");
	const { user } = useAuthStore();
	const router = useRouter();

	const form = useForm<z.infer<typeof QuizFormSchema>>({
		resolver: zodResolver(QuizFormSchema),
		defaultValues: {
			subject: "",
			topics: [],
			difficulty_level: "medium",
			total_questions: 10,
			additional_details: "",
		},
	});
	form.watch("topics");

	async function onSubmit(data: z.infer<typeof QuizFormSchema>) {
		toast("You got me", {
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white text-wrap">
						I've to pay API key bills. But don't worry, yours will definitely work.
					</code>
				</pre>
			),
		});
		return;
		try {
			const response = await fetch("/api/create", {
				method: "POST",
				body: JSON.stringify({
					creatorId: user?.$id,
					data: data,
				}),
			});
			await response.json();
			router.push(`/dashboard`);
		} catch (error) {
			console.log(error);
			toast("Error", {
				description: (
					<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
						<code className="text-white">Error creating quiz...</code>
					</pre>
				),
			});
		}
	}

	function handleTopicDelete(idx: number) {
		const filteredTopics = form.getValues().topics.filter((topic, i) => i !== idx);
		form.setValue("topics", filteredTopics);
	}

	function handleTopicAdd(e: KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter") {
			e.preventDefault();
			const trimmedTopic = topicValue.trim();
			if (trimmedTopic) {
				const currentTopics = form.getValues().topics;
				form.setValue("topics", [...currentTopics, trimmedTopic]);
				setTopicValue("");
			}
		}
	}

	return (
		<div className="max-w-[530px] mx-auto p-4 rounded-md mt-4 text-wrap">
			<h2 className="text-xl md:text-2xl mb-4 font-bold">
				Generate questions with your preferences
			</h2>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<FormField
						control={form.control}
						name="subject"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Subject</FormLabel>
								<FormControl>
									<Input
										placeholder="english, mathematics, physics, biology, ..."
										{...field}
										className="w-full"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* topics */}
					<div className="space-y-2">
						<FormLabel>Topics</FormLabel>
						<div className="flex gap-2 flex-wrap">
							{form.getValues().topics.map((topic, idx) => {
								return (
									<div
										key={idx}
										className="flex items-center text-sm gap-2 text-blue-100 bg-blue-700 w-fit rounded-full px-3 py-1">
										<span className="">{topic}</span>
										<X
											size={14}
											className="cursor-pointer"
											onClick={() => handleTopicDelete(idx)}
										/>
									</div>
								);
							})}
						</div>
						<Input
							placeholder="topic related to the subject (press enter when done)..."
							className="w-full"
							onKeyDown={handleTopicAdd}
							value={topicValue}
							onChange={(e) => setTopicValue(e.target.value)}
						/>
					</div>
					<div className="flex justify-between">
						<FormField
							control={form.control}
							name="difficulty_level"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Difficulty Level</FormLabel>
									<FormControl>
										<Select onValueChange={field.onChange} value={field.value}>
											<SelectTrigger className="w-[180px]">
												<SelectValue placeholder="Difficulty level" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="easy">Easy</SelectItem>
												<SelectItem value="medium">Medium</SelectItem>
												<SelectItem value="hard">Hard</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="total_questions"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Total questions</FormLabel>
									<FormControl>
										<Input
											placeholder="number of questions"
											{...field}
											value={field.value ?? ""}
											onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : "")}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="additional_details"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Additional Instructions <span className="text-neutral-400">(optional)</span>
								</FormLabel>
								<FormControl>
									<Textarea placeholder="Type your details here." {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						variant={"outline"}
						className="text-blue-100 hover:text-blue-100 bg-blue-800 hover:bg-blue-600 w-full">
						<span>Generate</span>
						<WandSparkles />
					</Button>
				</form>
			</Form>
		</div>
	);
}
