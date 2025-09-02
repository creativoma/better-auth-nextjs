'use client';

import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && session) {
      router.push('/dashboard');
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div
            className="w-2 h-2 bg-white rounded-full animate-pulse"
            style={{ animationDelay: '0.1s' }}
          ></div>
          <div
            className="w-2 h-2 bg-white rounded-full animate-pulse"
            style={{ animationDelay: '0.2s' }}
          ></div>
        </div>
      </div>
    );
  }

  if (session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                <div className="w-3 h-3 bg-black rounded-sm"></div>
              </div>
              <span className="font-semibold text-lg">AuthMA</span>
            </div>
            <Link
              href="/login"
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="pt-24 pb-16 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
                Authentication
                <br />
                <span className="bg-gradient-to-r from-neutral-200 to-neutral-400 bg-clip-text text-transparent">
                  without complexity
                </span>
              </h1>
              <p className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                Implement secure authentication in minutes. Built for developers
                who value simplicity.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/login"
                className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-neutral-200 transition-colors inline-flex items-center"
              >
                Get Started
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
              <button className="text-neutral-400 hover:text-white transition-colors px-4 py-3 inline-flex items-center">
                View docs
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="py-24 border-t border-neutral-800">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="group">
              <div className="border border-neutral-800 rounded-xl p-8 h-full hover:border-neutral-700 transition-colors">
                <div className="w-10 h-10 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-center mb-6">
                  <svg
                    className="w-5 h-5 text-neutral-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Security First</h3>
                <p className="text-neutral-400 leading-relaxed">
                  Robust implementation with security best practices. Password
                  hashing, secure tokens, and CSRF protection included.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="border border-neutral-800 rounded-xl p-8 h-full hover:border-neutral-700 transition-colors">
                <div className="w-10 h-10 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-center mb-6">
                  <svg
                    className="w-5 h-5 text-neutral-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Quick Setup</h3>
                <p className="text-neutral-400 leading-relaxed">
                  From zero to production in minutes. No complex configurations,
                  no unnecessary dependencies. Just the essentials.
                </p>
              </div>
            </div>

            <div className="group">
              <div className="border border-neutral-800 rounded-xl p-8 h-full hover:border-neutral-700 transition-colors">
                <div className="w-10 h-10 bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-center mb-6">
                  <svg
                    className="w-5 h-5 text-neutral-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Smooth Experience
                </h3>
                <p className="text-neutral-400 leading-relaxed">
                  Automatic session management, smart redirects, and optimized
                  loading states for perfect UX.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Steps Section */}
        <div className="py-24 border-t border-neutral-800">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Three steps. Done.</h2>
              <p className="text-neutral-400 text-lg">
                You don&apos;t need to be a security expert to implement robust
                authentication.
              </p>
            </div>

            <div className="space-y-12">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-8 h-8 bg-neutral-900 border border-neutral-800 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Create your account
                  </h3>
                  <p className="text-neutral-400">
                    Sign up with your email and a secure password. The system
                    handles the rest.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-8 h-8 bg-neutral-900 border border-neutral-800 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Sign in</h3>
                  <p className="text-neutral-400">
                    Access with your credentials. Sessions remain secure
                    automatically.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-8 h-8 bg-neutral-900 border border-neutral-800 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Access dashboard
                  </h3>
                  <p className="text-neutral-400">
                    Your protected personal area awaits. Simple, secure,
                    functional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-800 mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-black rounded-sm"></div>
              </div>
              <span className="font-medium">AuthMA</span>
            </div>
            <p className="text-sm text-neutral-400">
              Built with ♥ by{' '}
              <a
                href="https://creativoma.com"
                className="underline hover:text-white"
              >
                CREATIVOMA
              </a>
            </p>
            <p className="text-sm text-neutral-400">
              &copy; {new Date().getFullYear()} AuthMA. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
