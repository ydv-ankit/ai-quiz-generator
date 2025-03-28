import { Loader2 } from "lucide-react";

export const Loader = () => {
	return (
		<div className="flex h-screen w-full items-center justify-center relative">
			<div className="absolute inset-0 bg-black opacity-50"></div>
			<div className="absolute inset-0 bg-gradient-to-b from-gray-200 to-gray-800 opacity-30"></div>
			<Loader2 className="animate-spin text-blue-800" size={50} />
		</div>
	);
};
