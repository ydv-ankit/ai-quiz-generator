# 🧠 AI Quiz Generator

A modern, full-stack web application that generates personalized quizzes using AI. Built with Next.js 14, TypeScript, and Appwrite for authentication and data storage.

## ✨ Features

### 🎯 Core Functionality
- **AI-Powered Quiz Generation**: Create custom quizzes based on subjects, topics, and difficulty levels
- **Smart Authentication**: Secure user authentication with session management
- **Real-time Dashboard**: Track quiz performance and completion statistics
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **Dark/Light Mode**: Built-in theme switching for better user experience

### 🔐 Security & Protection
- **Route Protection**: Middleware-based authentication for protected routes
- **Session Management**: Automatic session cleanup and conflict prevention
- **Client-Side Guards**: Additional client-side authentication checks
- **Secure Cookies**: HttpOnly cookies with proper security attributes

### 📊 Analytics & Tracking
- **Performance Metrics**: Track average scores and completion rates
- **Quiz History**: View all completed quizzes with detailed results
- **Progress Tracking**: Monitor learning progress over time
- **Sorting & Filtering**: Results sorted by completion date (newest first)

## 🚀 Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Zustand**: State management with persistence
- **React Hook Form**: Form handling with validation
- **Zod**: Schema validation
- **Lucide React**: Beautiful icons

### Backend & Services
- **Appwrite**: Backend-as-a-Service for authentication and database
- **OpenAI GPT**: AI-powered quiz generation
- **Vercel**: Deployment and hosting

### UI Components
- **shadcn/ui**: Modern, accessible component library
- **Sonner**: Toast notifications
- **Framer Motion**: Smooth animations

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- Yarn or npm
- Appwrite account
- OpenAI API key

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ai-quiz-generator
```

### 2. Install Dependencies
```bash
yarn install
# or
npm install
```

### 3. Environment Setup
Copy the environment sample file and configure your variables:

```bash
cp env.sample .env.local
```

Update `.env.local` with your credentials:

```env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_HOST_URL=appwrite_host_url
NEXT_PUBLIC_PROJECT_ID=project_id
APPWRITE_API_KEY=appwrite_api_key

# OpenAI Configuration
OPENAI_API_KEY=openai_api_key

# Database IDs (from Appwrite)
NEXT_PUBLIC_DATABASE_ID=database_id
NEXT_PUBLIC_QUIZ_COLLECTION_ID=quiz_collection_id
NEXT_PUBLIC_QUESTION_COLLECTION_ID=question_collection_id
NEXT_PUBLIC_RESULTS_COLLECTION_ID=results_collection_id
NEXT_PUBLIC_USER_COLLECTION_ID=user_collection_id
```

### 4. Appwrite Setup

#### Create Collections
1. **Users Collection**: Store user profiles
2. **Quizzes Collection**: Store quiz metadata
3. **Questions Collection**: Store individual questions
4. **Results Collection**: Store quiz completion results

#### Set Permissions
Configure appropriate read/write permissions for each collection based on user roles.

### 5. Run Development Server
```bash
yarn dev
# or
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🎮 Usage

### For Users

1. **Sign Up/Login**: Create an account or log in to your existing account
2. **Generate Quiz**: Navigate to the "Generate" page
3. **Configure Quiz**: 
   - Enter subject (e.g., "Mathematics", "Physics")
   - Add specific topics (press Enter to add each topic)
   - Select difficulty level (Easy, Medium, Hard)
   - Set number of questions
   - Add optional additional instructions
4. **Take Quiz**: Complete the generated quiz
5. **View Results**: Check your performance in the dashboard

### For Developers

#### Project Structure
```
ai-quiz-generator/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── api/               # API routes
│   ├── dashboard/         # Protected dashboard
│   ├── generate/          # Quiz generation
│   ├── quiz/              # Quiz taking interface
│   └── results/           # Results display
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── auth-guard.tsx    # Authentication wrapper
│   └── ...
├── store/                # Zustand state management
│   └── auth.ts           # Authentication store
├── utils/                # Utility functions
├── models/               # Appwrite configuration
└── middleware.ts         # Route protection
```

#### Key Components

**Authentication Flow**
- `middleware.ts`: Server-side route protection
- `components/auth-guard.tsx`: Client-side authentication
- `store/auth.ts`: Authentication state management
- `utils/auth-utils.ts`: Cookie management

**Quiz Generation**
- `app/generate/page.tsx`: Quiz configuration interface
- `app/api/create/route.ts`: Quiz generation API
- `utils/gpt/gpt.ts`: OpenAI integration

**Dashboard & Analytics**
- `app/dashboard/page.tsx`: Main dashboard
- `components/charts/quiz-stats.tsx`: Performance charts
- `components/completed-quizzes.tsx`: Quiz history

## 🔧 Configuration

### Customizing Quiz Generation
Edit `utils/gpt/gpt.ts` to modify the AI prompt and quiz generation logic.

### Styling
The project uses Tailwind CSS. Customize styles in `tailwind.config.ts` and `app/globals.css`.

### Authentication
Modify `store/auth.ts` to change authentication behavior or add additional user roles.

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
# Build the application
yarn build

# Start production server
yarn start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Include steps to reproduce the problem

**Made with ❤️ by Ankit Ydv**
