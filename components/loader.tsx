import { Loader2 } from "lucide-react";

export const Loader = () => {
	return (
		<div className="flex h-screen w-full items-center justify-center relative">
			<Loader2 className="animate-spin text-blue-800" size={50} />
		</div>
	);
};
