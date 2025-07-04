const env = {
	appwrite: {
		endpoint: String(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL),
		projectId: String(process.env.NEXT_PUBLIC_PROJECT_ID),
		apiKey: String(process.env.APPWRITE_API_KEY),
		databaseId: String(process.env.NEXT_PUBLIC_DATABASE_ID),
		quizCollectionId: String(process.env.NEXT_PUBLIC_QUIZ_COLLECTION_ID),
		questionCollectionId: String(process.env.NEXT_PUBLIC_QUESTION_COLLECTION_ID),
		resultsCollectionId: String(process.env.NEXT_PUBLIC_RESULTS_COLLECTION_ID),
		userCollectionId: String(process.env.NEXT_PUBLIC_USER_COLLECTION_ID),
	},
	openai: {
		apiKey: String(process.env.OPENAI_API_KEY),
	},
};

export default env;
