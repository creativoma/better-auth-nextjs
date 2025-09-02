'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <>
      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-6">
        <div className="max-w-md w-full text-center">
          {/* Error Icon */}
          <div className="mb-8">
            <div className="w-16 h-16 bg-red-900/20 border border-red-900/30 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Authentication Error</h1>
            <p className="text-neutral-400 text-lg mb-6">
              {error
                ? decodeURIComponent(error)
                : 'Something went wrong during the authentication process'}
            </p>
            <div className="bg-red-900/20 border border-red-900/30 rounded-lg p-4">
              <p className="text-red-400 text-sm">
                This error occurred while trying to authenticate your request.
                Please try again or contact support if the problem persists.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link
              href="/login"
              className="w-full bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-neutral-200 transition-colors inline-flex items-center justify-center"
            >
              Try Again
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
            <Link
              href="/"
              className="w-full border border-neutral-800 text-neutral-300 px-6 py-3 rounded-lg font-medium hover:border-neutral-700 hover:text-white transition-colors inline-flex items-center justify-center"
            >
              Back to Home
            </Link>
          </div>

          {/* Help Section */}
          <div className="mt-12 pt-8 border-t border-neutral-800">
            <h3 className="text-lg font-medium mb-3">Need Help?</h3>
            <p className="text-neutral-400 text-sm mb-4">
              If you continue to experience authentication issues, here are some
              steps you can try:
            </p>
            <ul className="text-neutral-400 text-sm space-y-2 text-left">
              <li className="flex items-start">
                <span className="text-neutral-600 mr-2">•</span>
                Clear your browser cookies and try again
              </li>
              <li className="flex items-start">
                <span className="text-neutral-600 mr-2">•</span>
                Make sure your email and password are correct
              </li>
              <li className="flex items-start">
                <span className="text-neutral-600 mr-2">•</span>
                Try using a different browser or device
              </li>
              <li className="flex items-start">
                <span className="text-neutral-600 mr-2">•</span>
                Contact our support team for assistance
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-6">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 bg-neutral-900/20 border border-neutral-800 rounded-full flex items-center justify-center mx-auto">
          <div className="w-6 h-6 border-2 border-neutral-600 border-t-white rounded-full animate-spin"></div>
        </div>
        <p className="text-neutral-400 mt-4">Loading...</p>
      </div>
    </div>
  );
}

export default function ErrorPage() {
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

      <Suspense fallback={<LoadingFallback />}>
        <ErrorContent />
      </Suspense>
    </div>
  );
}
