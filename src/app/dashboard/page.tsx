'use client';

import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/login');
    }
  }, [session, isPending, router]);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/');
        },
      },
    });
  };

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

  if (!session) {
    return null; // Se redirigirá automáticamente
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
            <div className="flex items-center space-x-6">
              <span className="text-sm text-neutral-400">
                Welcome, {session.user.name || session.user.email}
              </span>
              <button
                onClick={handleSignOut}
                className="text-sm text-neutral-400 hover:text-white transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
          <p className="text-xl text-neutral-400">
            Your secure personal area. All your information is protected and
            encrypted.
          </p>
        </div>

        {/* User Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* User Profile Card */}
          <div className="border border-neutral-800 rounded-xl p-8 hover:border-neutral-700 transition-colors">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-neutral-900 border border-neutral-800 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-neutral-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold ml-4">User Profile</h2>
            </div>

            <div className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-neutral-500 mb-1">
                  User ID
                </dt>
                <dd className="text-neutral-300 font-mono text-sm bg-neutral-900 px-3 py-2 rounded border border-neutral-800">
                  {session.user.id}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-neutral-500 mb-1">
                  Email Address
                </dt>
                <dd className="text-neutral-300">{session.user.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-neutral-500 mb-1">
                  Display Name
                </dt>
                <dd className="text-neutral-300">
                  {session.user.name || (
                    <span className="text-neutral-500 italic">
                      Not specified
                    </span>
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-neutral-500 mb-1">
                  Account Created
                </dt>
                <dd className="text-neutral-300">
                  {new Date(session.user.createdAt).toLocaleDateString(
                    'en-US',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    }
                  )}
                </dd>
              </div>
            </div>
          </div>

          {/* Session Info Card */}
          <div className="border border-neutral-800 rounded-xl p-8 hover:border-neutral-700 transition-colors">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-neutral-900 border border-neutral-800 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-neutral-400"
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
              <h2 className="text-2xl font-semibold ml-4">Session Info</h2>
            </div>

            <div className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-neutral-500 mb-1">
                  Session ID
                </dt>
                <dd className="text-neutral-300 font-mono text-sm bg-neutral-900 px-3 py-2 rounded border border-neutral-800 break-all">
                  {session.session.id}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-neutral-500 mb-1">
                  Expires At
                </dt>
                <dd className="text-neutral-300">
                  {new Date(session.session.expiresAt).toLocaleDateString(
                    'en-US',
                    {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    }
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-neutral-500 mb-1">
                  Status
                </dt>
                <dd className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <span className="text-green-400 font-medium">Active</span>
                </dd>
              </div>
            </div>
          </div>
        </div>

        {/* Status Banner */}
        <div className="border border-green-900/30 bg-green-900/20 rounded-xl p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="w-6 h-6 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-green-400 mb-1">
                Authentication Successful
              </h3>
              <p className="text-green-300/80">
                You&apos;re viewing this protected area because you&apos;ve
                successfully authenticated. Your session is secure and will be
                automatically renewed as needed.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button className="border border-neutral-800 rounded-lg p-4 hover:border-neutral-700 transition-colors text-left">
              <div className="flex items-center mb-2">
                <svg
                  className="w-5 h-5 text-neutral-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="font-medium">Edit Profile</span>
              </div>
              <p className="text-sm text-neutral-400">
                Update your personal information
              </p>
            </button>

            <button className="border border-neutral-800 rounded-lg p-4 hover:border-neutral-700 transition-colors text-left">
              <div className="flex items-center mb-2">
                <svg
                  className="w-5 h-5 text-neutral-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="font-medium">Settings</span>
              </div>
              <p className="text-sm text-neutral-400">
                Manage your account settings
              </p>
            </button>

            <button
              onClick={handleSignOut}
              className="border border-red-900/30 bg-red-900/20 rounded-lg p-4 hover:border-red-800/40 hover:bg-red-900/30 transition-colors text-left"
            >
              <div className="flex items-center mb-2">
                <svg
                  className="w-5 h-5 text-red-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span className="font-medium text-red-400">Sign Out</span>
              </div>
              <p className="text-sm text-red-400/70">
                End your current session
              </p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
