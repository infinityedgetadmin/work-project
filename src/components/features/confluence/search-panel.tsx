'use client';

import { useState, useCallback } from 'react';
import { useConfluenceSearch, useConfluenceSpaces } from '@/hooks/useConfluence';
import { ConfluencePage } from '@/services/mcp/confluence-client';
import { MagnifyingGlassIcon, DocumentIcon, FolderIcon } from '@heroicons/react/24/outline';
import { useDebounce } from '@/hooks/useDebounce';

interface ConfluenceSearchPanelProps {
  onPageSelect?: (page: ConfluencePage) => void;
  selectedPages?: ConfluencePage[];
  className?: string;
}

export function ConfluenceSearchPanel({ 
  onPageSelect, 
  selectedPages = [],
  className = '' 
}: ConfluenceSearchPanelProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpace, setSelectedSpace] = useState<string>('');
  const debouncedQuery = useDebounce(searchQuery, 500);

  const { data: spaces } = useConfluenceSpaces();
  const { 
    data: searchResults, 
    isLoading: searchLoading,
    error: searchError 
  } = useConfluenceSearch({
    query: debouncedQuery,
    spaceKey: selectedSpace || undefined,
    limit: 10,
  });

  const handlePageClick = useCallback((page: ConfluencePage) => {
    if (onPageSelect) {
      onPageSelect(page);
    }
  }, [onPageSelect]);

  const isPageSelected = useCallback((pageId: string) => {
    return selectedPages.some(p => p.id === pageId);
  }, [selectedPages]);

  return (
    <div className={`flex flex-col h-full bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Confluence Search</h3>
        
        {/* Space Selector */}
        {spaces && spaces.results && (
          <div className="mb-3">
            <label htmlFor="space-select" className="block text-sm font-medium text-gray-700 mb-1">
              Space Filter
            </label>
            <select
              id="space-select"
              value={selectedSpace}
              onChange={(e) => setSelectedSpace(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="">All Spaces</option>
              {spaces.results.map((space: { id: string; key: string; name: string }) => (
                <option key={space.id} value={space.key}>
                  {space.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Confluence pages..."
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto p-4">
        {searchLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}

        {searchError && (
          <div className="text-red-600 text-sm p-4 bg-red-50 rounded-lg">
            Error searching Confluence: {searchError.message}
          </div>
        )}

        {searchResults && searchResults.results.length === 0 && debouncedQuery && (
          <div className="text-gray-500 text-center py-8">
            No pages found matching &ldquo;{debouncedQuery}&rdquo;
          </div>
        )}

        {searchResults && searchResults.results.length > 0 && (
          <div className="space-y-2">
            {searchResults.results.map((page) => (
              <div
                key={page.id}
                onClick={() => handlePageClick(page)}
                className={`
                  p-3 rounded-lg border cursor-pointer transition-all
                  ${isPageSelected(page.id) 
                    ? 'border-blue-500 bg-blue-50 shadow-sm' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex items-start space-x-3">
                  <DocumentIcon className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {page.title}
                    </h4>
                    {page.space && (
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <FolderIcon className="h-3 w-3 mr-1" />
                        {page.space.name}
                      </div>
                    )}
                    {page._links?.webui && (
                      <a
                        href={page._links.webui}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs text-blue-600 hover:text-blue-800 mt-1 inline-block"
                      >
                        View in Confluence →
                      </a>
                    )}
                  </div>
                  {isPageSelected(page.id) && (
                    <div className="flex-shrink-0">
                      <span className="text-xs text-blue-600 font-medium">Selected</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {!debouncedQuery && !searchLoading && (
          <div className="text-gray-400 text-center py-8">
            Enter a search query to find Confluence pages
          </div>
        )}
      </div>

      {/* Selected Pages Count */}
      {selectedPages.length > 0 && (
        <div className="p-3 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600">
            {selectedPages.length} page{selectedPages.length !== 1 ? 's' : ''} selected for context
          </p>
        </div>
      )}
    </div>
  );
}