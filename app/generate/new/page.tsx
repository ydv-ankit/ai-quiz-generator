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

export default function CreateQuestion() {
	const [topicValue, setTopicValue] = useState<string>("");
	const { session } = useAuthStore();
	console.log(session);

	const form = useForm<z.infer<typeof QuizFormSchema>>({
		resolver: zodResolver(QuizFormSchema),
		defaultValues: {
			subject: "",
			topics: [],
			difficulty_level: "medium",
			total_questions: 10,
			addition_details: "",
		},
	});
	form.watch("topics");

	async function onSubmit(data: z.infer<typeof QuizFormSchema>) {
		try {
			await fetch("/api/create", {
				method: "POST",
				body: JSON.stringify({
					creatorId: session?.$id,
					data: data,
				}),
			});
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
		<div className="max-w-[430px] mx-auto p-4 rounded-md mt-4 text-wrap">
			<h2 className="text-xl mb-4">Generate questions with your preferences</h2>
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
										className="flex items-center text-sm gap-2 bg-blue-700 w-fit rounded-full px-3 py-1">
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
							placeholder="topic related to the subject"
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
										<Select {...field}>
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
										<Input placeholder="number of questions" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="addition_details"
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
						className="bg-blue-800 hover:bg-blue-600 w-full">
						<span>Generate</span>
						<WandSparkles />
					</Button>
				</form>
			</Form>
		</div>
	);
}
