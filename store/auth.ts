import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { AppwriteException, ID, Models, Query } from "appwrite";
import { account } from "@/models/client/config";
import { dbId, userCollectionId } from "@/models/name";
import { databases } from "@/models/server/config";

interface IAuthStore {
	session: Models.Session | null;
	jwt: string | null;
	user: Models.Document | null;
	hydrated: boolean;

	setHydrated(): void;
	verifySession(): Promise<void>;
	login(
		email: string,
		password: string
	): Promise<{
		success: boolean;
		error?: AppwriteException | null;
	}>;
	createAccount(
		name: string,
		email: string,
		password: string,
		role: string,
		teamId: string
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
			async login(email, password) {
				try {
					const session = await account.createEmailPasswordSession(email, password);
					const [user, { jwt }] = await Promise.all([
						databases.listDocuments(dbId, userCollectionId, [
							Query.equal("email", email),
							Query.limit(1),
						]),
						account.createJWT(),
					]);
					const t = user.documents[0];
					console.log("logged in user", t);

					set({
						session,
						user: user.documents[0],
						jwt,
					});
					return { success: true };
				} catch (error) {
					console.log(error);
					const err = error instanceof AppwriteException ? error : null;
					return { success: false, error: err };
				}
			},
			async createAccount(name, email, password, role, teamId) {
				try {
					const user = await account.create(ID.unique(), email, password, name);
					await databases.createDocument(dbId, userCollectionId, ID.unique(), {
						name,
						email,
						role,
						userId: user.$id,
						teamCollection: {
							name: teamId,
						},
					});
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
