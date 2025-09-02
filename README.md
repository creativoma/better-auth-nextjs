# Better Auth with Next.js

A modern authentication system built with [Next.js 15](https://nextjs.org) and [Better Auth](https://better-auth.com) using PostgreSQL as the database.

## Features

- 🔐 Email & Password authentication
- 📧 Email verification
- 🔄 Session management
- 🗃️ PostgreSQL database integration
- 🎨 Tailwind CSS styling
- ⚡ Turbopack for fast development builds
- 📱 TypeScript for type safety

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- pnpm (recommended package manager)

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env.local
   ```

4. Configure your `.env.local` file:

   ```env
   # Database - Replace with your PostgreSQL connection string
   DATABASE_URL=postgresql://username:password@localhost:5432/better_auth_db

   # Better Auth - Generate a secure secret key
   BETTER_AUTH_SECRET=your-secret-key-here
   BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
   ```

### Database Setup

1. Create a PostgreSQL database
2. The Better Auth migrations will be automatically applied when you first run the application
3. Migration files are stored in `better-auth_migrations/` directory

### Development

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm prettier` - Format code
- `pnpm clean` - Clean build artifacts

## Project Structure

```
src/
├── app/
│   ├── api/auth/[...all]/     # Better Auth API routes
│   ├── dashboard/             # Protected dashboard page
│   ├── login/                 # Login page
│   ├── error/                 # Error page
│   └── page.tsx              # Home page
├── components/
│   └── AuthComponent.tsx     # Authentication component
└── lib/
    ├── auth.ts               # Server-side auth configuration
    └── auth-client.ts        # Client-side auth utilities
```

## Authentication

This project uses Better Auth for authentication with the following features:

- **Email/Password**: Users can register and login with email and password
- **Session Management**: Automatic session handling with secure cookies
- **Database Integration**: User data and sessions stored in PostgreSQL
- **Type Safety**: Full TypeScript support for auth operations

### Usage Example

```tsx
import { signIn, signUp, signOut, useSession } from '@/lib/auth-client';

// In your component
const { data: session, isPending } = useSession();

// Sign in
await signIn.email({
  email: 'user@example.com',
  password: 'password',
});

// Sign up
await signUp.email({
  email: 'user@example.com',
  password: 'password',
  name: 'User Name',
});

// Sign out
await signOut();
```

## Database Schema

The application uses the following main tables:

- **user**: User accounts with email, name, and verification status
- **session**: User sessions with expiration tracking
- **account**: Password storage and external provider accounts
- **verification**: Email verification tokens

## Deployment

### Vercel (Recommended)

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Set up environment variables in Vercel dashboard
4. Deploy

### Other Platforms

Ensure you:

1. Set up a PostgreSQL database
2. Configure environment variables
3. Run database migrations
4. Build and deploy the application

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
