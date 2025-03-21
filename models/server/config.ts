import env from "@/lib/env";
import { Client, Avatars, Databases, Users } from "node-appwrite";

const client = new Client()
	.setEndpoint(env.appwrite.endpoint)
	.setProject(env.appwrite.projectId)
	.setKey(env.appwrite.apiKey);

const databases = new Databases(client);
const avatars = new Avatars(client);
const users = new Users(client);

export { client, users, databases, avatars };
