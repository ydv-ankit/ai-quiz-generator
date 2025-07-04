import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { AppwriteException, ID, Models, Query } from "appwrite";
import { account } from "@/models/client/config";
import { dbId, userCollectionId } from "@/models/name";
import { databases } from "@/models/client/config";
import { setAuthCookie, removeAuthCookie } from "@/utils/auth-utils";

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
					// Set auth cookie for middleware
					if (session) {
						setAuthCookie(session.$id);
					}
				} catch (error) {
					console.log("No current session found:", error);
					set({
						session: null,
						user: null,
						jwt: null,
					});
					// Remove auth cookie
					removeAuthCookie();
				}
			},
			async login(email, password) {
				try {
					// First, check if there's an existing session and delete it if present
					try {
						const existingSession = await account.getSession("current");
						if (existingSession) {
							await account.deleteSessions();
						}
					} catch (sessionError) {
						// No existing session found, which is fine
						console.log("No existing sessions to delete");
					}

					const session = await account.createEmailPasswordSession(email, password);
					const [userResponse, { jwt }] = await Promise.all([
						databases.listDocuments(dbId, userCollectionId, [
							Query.equal("email", email),
							Query.limit(1),
						]),
						account.createJWT(),
					]);

					// Check if user document exists
					if (!userResponse.documents || userResponse.documents.length === 0) {
						throw new Error("User document not found");
					}

					set({
						session,
						user: userResponse.documents[0],
						jwt,
					});
					
					// Set auth cookie for middleware
					setAuthCookie(session.$id);
					
					return { success: true };
				} catch (error) {
					console.log("Login error:", error);
					const err = error instanceof AppwriteException ? error : null;
					return { success: false, error: err };
				}
			},
			async createAccount(name, email, password) {
				try {
					// First, check if there's an existing session and delete it if present
					try {
						const existingSession = await account.getSession("current");
						if (existingSession) {
							await account.deleteSessions();
						}
					} catch (sessionError) {
						// No existing session found, which is fine
						console.log("No existing sessions to delete");
					}

					const user = await account.create(ID.unique(), email, password, name);
					await databases.createDocument(dbId, userCollectionId, ID.unique(), {
						name,
						email,
						userId: user.$id,
					});
					return {
						success: true,
					};
				} catch (error) {
					console.log("Account creation error:", error);
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
					// Remove auth cookie
					removeAuthCookie();
				} catch (error) {
					console.log("Logout error:", error);
					// Even if logout fails, clear the local state
					set({
						session: null,
						user: null,
						jwt: null,
					});
					// Remove auth cookie
					removeAuthCookie();
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

export const getLoggedInSession = async () => {
	try {
		const session = await account.getSession("current");
		return session;
	} catch (error) {
		console.log("No logged in session found:", error);
		return null;
	}
};
