'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get('message') || 'An authentication error occurred';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Authentication Error
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {errorMessage}
          </p>
        </div>
        
        <div className="mt-8 space-y-4">
          <Link
            href="/api/auth/atlassian/login"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Try Again
          </Link>
          
          <Link
            href="/"
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Go to Homepage
          </Link>
        </div>

        <div className="mt-6 text-center">
          <details className="text-sm text-gray-500">
            <summary className="cursor-pointer hover:text-gray-700">
              Troubleshooting Tips
            </summary>
            <div className="mt-4 text-left space-y-2">
              <p>• Ensure you have access to Confluence in your Atlassian account</p>
              <p>• Clear your browser cookies and try again</p>
              <p>• Check that the app is properly configured in Atlassian</p>
              <p>• Verify your .env.local file has the correct credentials</p>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}