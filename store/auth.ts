import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { AppwriteException, ID, Models } from "appwrite";
import { account } from "@/models/client/config";

export interface UserPrefs {
	role: "student" | "teacher";
}

interface IAuthStore {
	session: Models.Session | null;
	jwt: string | null;
	user: Models.User<UserPrefs> | null;
	hydrated: boolean;

	setHydrated(): void;
	verifySession(): Promise<void>;
	login(
		email: string,
		password: string,
		role?: UserPrefs["role"]
	): Promise<{
		success: boolean;
		error?: AppwriteException | null;
	}>;
	createAccount(
		name: string,
		email: string,
		password: string
	): Promise<{
		success: boolean;
		error?: AppwriteException | null;
	}>;
	logout(): Promise<void>;
}

export const useAuthStore = create<IAuthStore>()(
	persist(
		immer((set) => ({
			session: null,
			jwt: null,
			user: null,
			hydrated: false,

			setHydrated() {
				set({
					hydrated: true,
				});
			},
			async verifySession() {
				try {
					const session = await account.getSession("current");
					set({
						session,
					});
				} catch (error) {
					console.log(error);
				}
			},
			async login(email, password, role) {
				try {
					console.log(role);

					const session = await account.createEmailPasswordSession(email, password);
					await account.updatePrefs<UserPrefs>({
						role,
					});
					const [user, { jwt }] = await Promise.all([
						account.get<UserPrefs>(),
						account.createJWT(),
					]);

					set({
						session,
						user,
						jwt,
					});
					return { success: true };
				} catch (error) {
					console.log(error);
					const err = error instanceof AppwriteException ? error : null;
					return { success: false, error: err };
				}
			},
			async createAccount(name, email, password) {
				try {
					await account.create(ID.unique(), email, password, name);
					return {
						success: true,
					};
				} catch (error) {
					console.log(error);
					return {
						success: false,
						error: error instanceof AppwriteException ? error : null,
					};
				}
			},
			async logout() {
				try {
					await account.deleteSessions();
					set({
						session: null,
						user: null,
						jwt: null,
					});
				} catch (error) {
					console.log(error);
				}
			},
		})),
		{
			name: "auth",
			onRehydrateStorage() {
				return (state: any, error: any) => {
					if (!error) state?.setHydrated();
				};
			},
		}
	)
);
