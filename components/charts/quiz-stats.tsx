"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export function QuizStats() {
	const data = [
		{
			name: "Physics",
			total: 85,
		},
		{
			name: "Chemistry",
			total: 92,
		},
		{
			name: "Biology",
			total: 78,
		},
		{
			name: "Math",
			total: 95,
		},
		{
			name: "History",
			total: 88,
		},
		{
			name: "English",
			total: 90,
		},
	];

	return (
		<ResponsiveContainer width="100%" height={350}>
			<BarChart data={data}>
				<XAxis
					dataKey="name"
					stroke="#888888"
					fontSize={12}
					tickLine={false}
					axisLine={false}
				/>
				<YAxis
					stroke="#888888"
					fontSize={12}
					tickLine={false}
					axisLine={false}
					tickFormatter={(value) => `${value}%`}
				/>
				<Bar
					dataKey="total"
					fill="currentColor"
					radius={[4, 4, 0, 0]}
					className="fill-primary"
				/>
			</BarChart>
		</ResponsiveContainer>
	);
}
