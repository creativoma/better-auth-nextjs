# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application with TypeScript that implements authentication using Better Auth with PostgreSQL as the database. The project uses App Router and is configured to use Turbopack for faster development builds.

## Common Commands

### Development

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build production app with Turbopack
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm prettier` - Format code with Prettier
- `pnpm clean` - Clean build artifacts and dependencies

### Package Manager

This project uses `pnpm` as the package manager (configured in packageManager field). Always use `pnpm` instead of npm or yarn.

## Architecture

### Authentication System

- **Better Auth**: Configured in `src/lib/auth.ts` with PostgreSQL database connection
- **Client Auth**: Client-side authentication utilities in `src/lib/auth-client.ts`
- **API Route**: Authentication endpoints handled in `src/app/api/auth/[...all]/route.ts`
- **Database**: PostgreSQL with connection via `pg` package using `DATABASE_URL` environment variable
- **Migrations**: Database schema migrations stored in `better-auth_migrations/` directory

### Key Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `BETTER_AUTH_SECRET` - Secret key for Better Auth
- `BETTER_AUTH_URL` - Base URL for authentication endpoints
- `NEXT_PUBLIC_BETTER_AUTH_URL` - Public URL for client-side authentication (defaults to http://localhost:3000)

### Database Schema

The application uses a standard Better Auth schema with tables for:

- `user` - User accounts with email/password authentication
- `session` - User sessions with expiration tracking
- `account` - External provider accounts and password storage
- `verification` - Email verification tokens

### App Structure

- Uses Next.js App Router with TypeScript
- Authentication pages: `/login`, `/dashboard`, `/error`
- Tailwind CSS for styling
- React 19 with strict mode enabled

### Configuration Files

- `eslint.config.mjs` - ESLint configuration
- `postcss.config.mjs` - PostCSS configuration
- `next.config.ts` - Next.js configuration
- `.prettierrc` and `.prettierignore` - Prettier formatting configuration

## Development Notes

### TypeScript Configuration

The project uses TypeScript with strict settings. Always run `pnpm lint` after making changes to check for type errors and linting issues.

### Authentication Flow

- Server-side auth configuration is in `src/lib/auth.ts`
- Client-side auth hooks and utilities exported from `src/lib/auth-client.ts`
- Authentication API routes are automatically handled by Better Auth through the catch-all route

### Database Migrations

Better Auth automatically generates migrations in the `better-auth_migrations/` directory. These should be applied to your database when setting up the project or when auth schema changes occur.
