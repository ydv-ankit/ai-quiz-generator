import { User } from "@/types/user";
import { create } from "zustand";

type UserStore = {
	user: User | undefined;
	setUser: (user: User) => void;
	logout: () => void;
};

export const useUserStore = create<UserStore>()((set) => ({
	user: undefined,
	setUser: (user: User) => {},
	logout: () => {},
}));
