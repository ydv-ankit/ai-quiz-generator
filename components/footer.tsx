import { APP_NAME } from "@/utils/constants";
import { useMemo } from "react";

export const Footer = () => {
	const currentYear = useMemo(() => {
		return new Date().getFullYear();
	}, [new Date().getFullYear()]);
	return (
		<footer className="border-t py-6 md:py-8">
			<div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 text-center">
				<p className="text-sm text-gray-500 dark:text-gray-400">
					&copy; {currentYear} {APP_NAME}. All rights reserved.
				</p>
			</div>
		</footer>
	);
};
