import { useState } from 'react';
import { 
  FolderIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  TicketIcon,
  XMarkIcon,
  PlusIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline';
import type { Context } from '@/app/(dashboard)/ai-assistant/page';
import { ConfluenceSearchPanel } from '@/components/features/confluence/search-panel';
import { ConfluencePage } from '@/services/mcp/confluence-client';

interface ContextPanelProps {
  activeContext: Context | null;
  onSelectContext: (context: Context) => void;
  recentContexts: Context[];
}

export function ContextPanel({ 
  activeContext, 
  onSelectContext, 
  recentContexts 
}: ContextPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['recent', 'active'])
  );
  const [showConfluenceSearch, setShowConfluenceSearch] = useState(false);
  const [selectedConfluencePages, setSelectedConfluencePages] = useState<ConfluencePage[]>([]);

  const getContextIcon = (type: Context['type']) => {
    switch (type) {
      case 'epic':
        return FolderIcon;
      case 'meeting':
        return VideoCameraIcon;
      case 'document':
        return DocumentTextIcon;
      case 'ticket':
        return TicketIcon;
      case 'confluence':
        return DocumentDuplicateIcon;
      default:
        return DocumentTextIcon;
    }
  };

  const getContextColor = (type: Context['type']) => {
    switch (type) {
      case 'epic':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'meeting':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'document':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'ticket':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'confluence':
        return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const filteredContexts = recentContexts.filter(context =>
    context.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    context.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isCollapsed) {
    return (
      <div className="w-16 bg-gray-50 border-l border-gray-200 p-2">
        <button
          onClick={() => setIsCollapsed(false)}
          className="w-full p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          title="Expand context panel"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
        
        {activeContext && (
          <div className="mt-4">
            <div className="w-full p-2 bg-white border border-gray-200 rounded-lg">
              {(() => {
                const Icon = getContextIcon(activeContext.type);
                return <Icon className="h-5 w-5 text-gray-600" />;
              })()}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-80 bg-gray-50 border-l border-gray-200 flex flex-col">
      {/* Panel Header */}
      <div className="border-b border-gray-200 px-4 py-3 bg-white">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Context</h2>
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-1 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100 transition-colors"
            title="Collapse panel"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Active Context */}
      {activeContext && (
        <div className="p-4 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">Active Context</h3>
            <button
              onClick={() => onSelectContext({} as Context)}
              className="p-1 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100 transition-colors"
              title="Clear context"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
          
          <div className={`p-3 rounded-lg border ${getContextColor(activeContext.type)}`}>
            <div className="flex items-start space-x-2">
              {(() => {
                const Icon = getContextIcon(activeContext.type);
                return <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />;
              })()}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{activeContext.title}</p>
                <p className="text-xs mt-0.5 opacity-75">{activeContext.id}</p>
              </div>
            </div>
          </div>

          {/* Context Metadata */}
          {activeContext.metadata && (
            <div className="mt-3 space-y-2">
              <div className="text-xs text-gray-600">
                {Object.entries(activeContext.metadata).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-1">
                    <span className="text-gray-500">{key}:</span>
                    <span className="font-medium">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search contexts..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Recent Contexts */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div>
          <button
            onClick={() => toggleSection('recent')}
            className="w-full flex items-center justify-between py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            <span className="flex items-center">
              <ClockIcon className="h-4 w-4 mr-2" />
              Recent Contexts
            </span>
            {expandedSections.has('recent') ? (
              <ChevronDownIcon className="h-4 w-4" />
            ) : (
              <ChevronRightIcon className="h-4 w-4" />
            )}
          </button>
          
          {expandedSections.has('recent') && (
            <div className="mt-2 space-y-2">
              {filteredContexts.length > 0 ? (
                filteredContexts.map((context) => {
                  const Icon = getContextIcon(context.type);
                  const isActive = activeContext?.id === context.id;
                  
                  return (
                    <button
                      key={context.id}
                      onClick={() => onSelectContext(context)}
                      className={`w-full p-3 bg-white border rounded-lg text-left transition-all hover:shadow-md ${
                        isActive
                          ? 'border-blue-500 shadow-sm ring-2 ring-blue-100'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        <div className={`p-1.5 rounded ${
                          isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                        }`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {context.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {context.type} • {context.id}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">
                  No matching contexts found
                </p>
              )}
            </div>
          )}
        </div>

        {/* Add Context Buttons */}
        <div className="mt-4 space-y-2">
          <button 
            onClick={() => setShowConfluenceSearch(!showConfluenceSearch)}
            className="w-full p-3 border-2 border-dashed border-indigo-300 rounded-lg text-indigo-600 hover:border-indigo-400 hover:text-indigo-700 transition-colors flex items-center justify-center space-x-2">
            <DocumentDuplicateIcon className="h-4 w-4" />
            <span className="text-sm font-medium">Add Confluence Context</span>
          </button>
          <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center space-x-2">
            <PlusIcon className="h-4 w-4" />
            <span className="text-sm font-medium">Add Other Context</span>
          </button>
        </div>
      </div>

      {/* Context Info Footer */}
      <div className="p-4 border-t border-gray-200 bg-blue-50">
        <p className="text-xs text-blue-800">
          <strong>Tip:</strong> Adding context helps the AI provide more relevant and accurate responses specific to your current work.
        </p>
      </div>

      {/* Confluence Search Modal */}
      {showConfluenceSearch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-[600px] h-[600px] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Add Confluence Pages as Context</h3>
              <button
                onClick={() => setShowConfluenceSearch(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 p-4">
              <ConfluenceSearchPanel
                onPageSelect={(page) => {
                  const exists = selectedConfluencePages.some(p => p.id === page.id);
                  if (!exists) {
                    setSelectedConfluencePages(prev => [...prev, page]);
                    onSelectContext({
                      type: 'confluence',
                      id: page.id,
                      title: page.title,
                      metadata: {
                        space: page.space?.name,
                        url: page._links?.webui
                      }
                    });
                  }
                }}
                selectedPages={selectedConfluencePages}
              />
            </div>
            <div className="p-4 border-t">
              <button
                onClick={() => {
                  setShowConfluenceSearch(false);
                  if (selectedConfluencePages.length > 0) {
                    // Pages already added as context
                  }
                }}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Done ({selectedConfluencePages.length} pages selected)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}