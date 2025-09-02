'use client';

import { useState } from 'react';
import { signIn, signUp, signOut, useSession } from '@/lib/auth-client';

export function AuthComponent() {
  const { data: session, isPending } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        await signUp.email({
          email,
          password,
          name: email.split('@')[0], // Usar la parte del email como nombre
        });
      } else {
        await signIn.email({
          email,
          password,
        });
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  if (isPending) {
    return <div className="p-4 dark:text-white">Loading...</div>;
  }

  if (session) {
    return (
      <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 shadow-md">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Welcome!</h2>
        <div className="space-y-2">
          <p className="dark:text-gray-300">
            <strong>Email:</strong> {session.user.email}
          </p>
          <p className="dark:text-gray-300">
            <strong>Name:</strong> {session.user.name}
          </p>
          <p className="dark:text-gray-300">
            <strong>ID:</strong> {session.user.id}
          </p>
        </div>
        <button
          onClick={handleSignOut}
          className="mt-4 w-full bg-red-500 dark:bg-red-600 text-white py-2 px-4 rounded hover:bg-red-600 dark:hover:bg-red-700 transition-colors"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 shadow-md">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </h2>

      <form onSubmit={handleAuth} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 dark:bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors disabled:bg-blue-300 dark:disabled:bg-blue-800"
        >
          {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 text-sm"
        >
          {isSignUp
            ? 'Already have an account? Sign In'
            : 'Need an account? Sign Up'}
        </button>
      </div>
    </div>
  );
}
