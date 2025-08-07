'use client';

import { useConfluencePage } from '@/hooks/useConfluence';
import { XMarkIcon, DocumentIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

interface ConfluencePageViewerProps {
  pageId: string;
  onClose?: () => void;
}

export function ConfluencePageViewer({ pageId, onClose }: ConfluencePageViewerProps) {
  const { data: page, isLoading, error } = useConfluencePage(pageId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        Failed to load page: {error.message}
      </div>
    );
  }

  if (!page) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <DocumentIcon className="h-5 w-5 text-gray-400" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{page.title}</h2>
            {page.space && (
              <p className="text-sm text-gray-500">{page.space.name}</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {page._links?.webui && (
            <a
              href={page._links.webui}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              title="Open in Confluence"
            >
              <ArrowTopRightOnSquareIcon className="h-5 w-5" />
            </a>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-h-96 overflow-y-auto">
        {page.body?.plainText ? (
          <div className="prose prose-sm max-w-none">
            <pre className="whitespace-pre-wrap font-sans">{page.body.plainText}</pre>
          </div>
        ) : page.body?.view?.value ? (
          <div 
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: page.body.view.value }}
          />
        ) : page.body?.storage?.value ? (
          <div 
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: page.body.storage.value }}
          />
        ) : (
          <p className="text-gray-500">No content available</p>
        )}
      </div>

      {/* Footer */}
      {page.version && (
        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-500">
            Version {page.version.number} • Last updated: {new Date(page.version.createdAt).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
}