import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/navbar";

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
					<Toaster />
				</body>
			</html>
		</ClerkProvider>
	);
}
