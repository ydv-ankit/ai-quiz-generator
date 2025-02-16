import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "../components/navbar";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
	title: "AI Quiz Generator",
	description: "Generate and organise quizes using AI",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body>
					<Navbar />
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
