const env = {
	appwrite: {
		endpoint: String(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL),
		projectId: String(process.env.NEXT_PUBLIC_PROJECT_ID),
		apiKey: String(process.env.APPWRITE_API_KEY),
	},
	openai: {
		apiKey: String(process.env.OPENAI_API_KEY),
	},
};

export default env;
