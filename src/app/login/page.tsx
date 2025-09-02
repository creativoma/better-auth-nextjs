'use client';

import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const { error } = await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: '/dashboard',
      },
      {
        onRequest: () => {
          console.log('Iniciando sesión...');
        },
        onSuccess: () => {
          router.push('/dashboard');
        },
        onError: ctx => {
          setError(ctx.error.message);
          setIsLoading(false);
        },
      }
    );

    if (error) {
      setError(error.message || 'Error al iniciar sesión');
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const { error } = await authClient.signUp.email(
      {
        email,
        password,
        name: email.split('@')[0],
        callbackURL: '/dashboard',
      },
      {
        onRequest: () => {
          console.log('Registrando usuario...');
        },
        onSuccess: () => {
          router.push('/dashboard');
        },
        onError: ctx => {
          setError(ctx.error.message);
          setIsLoading(false);
        },
      }
    );

    if (error) {
      setError(error.message || 'Error al registrarse');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                <div className="w-3 h-3 bg-black rounded-sm"></div>
              </div>
              <span className="font-semibold text-lg">AuthMA</span>
            </Link>
            <Link
              href="/"
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-neutral-400">
              {isSignUp
                ? 'Join us and start your secure journey'
                : 'Sign in to access your dashboard'}
            </p>
          </div>

          <form
            className="space-y-6"
            onSubmit={isSignUp ? handleSignUp : handleSignIn}
          >
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-neutral-300 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-neutral-400"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-neutral-300 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-neutral-400"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-900/30 rounded-lg p-3">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black py-3 px-4 rounded-lg font-medium hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span>Please wait...</span>
                </div>
              ) : isSignUp ? (
                'Create Account'
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              {isSignUp
                ? 'Already have an account? Sign in'
                : "Don't have an account? Create one"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
