import { 
  UserIcon, 
  SparklesIcon,
  ClipboardDocumentIcon,
  ArrowTopRightOnSquareIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { SparklesIcon as SparklesSolid } from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';
import type { Message } from '@/app/(dashboard)/ai-assistant/page';

interface ChatMessageProps {
  message: Message;
  isStreaming?: boolean;
}

export function ChatMessage({ message, isStreaming = false }: ChatMessageProps) {
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);
  const [copied, setCopied] = useState(false);
  const [displayedContent, setDisplayedContent] = useState(message.content);

  useEffect(() => {
    setDisplayedContent(message.content);
  }, [message.content]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFeedback = (type: 'up' | 'down') => {
    setFeedback(type);
    // In production, send feedback to backend
  };

  const handleAction = (action: string) => {
    console.log('Action triggered:', action);
    // Handle different actions
  };

  const formatContent = (content: string) => {
    // Simple markdown-like formatting
    const lines = content.split('\n');
    return lines.map((line, index) => {
      // Headers
      if (line.startsWith('## ')) {
        return (
          <h3 key={index} className="text-lg font-semibold text-gray-900 mt-4 mb-2">
            {line.substring(3)}
          </h3>
        );
      }
      if (line.startsWith('# ')) {
        return (
          <h2 key={index} className="text-xl font-bold text-gray-900 mt-4 mb-2">
            {line.substring(2)}
          </h2>
        );
      }
      
      // List items with proper formatting
      if (line.match(/^\d+\.\s/)) {
        const [number, ...rest] = line.split('. ');
        const text = rest.join('. ');
        const parts = text.split(/(\*\*.*?\*\*)/g);
        
        return (
          <div key={index} className="flex mt-2">
            <span className="text-gray-500 mr-2">{number}.</span>
            <div className="flex-1">
              {parts.map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  return <strong key={i} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>;
                }
                
                // Check for sub-items (lines starting with -)
                if (part.includes('\n   -')) {
                  const [main, ...subItems] = part.split('\n   -');
                  return (
                    <span key={i}>
                      {main}
                      <div className="ml-4 mt-1 text-sm text-gray-600">
                        {subItems.map((sub, j) => (
                          <div key={j} className="mt-1">• {sub.trim()}</div>
                        ))}
                      </div>
                    </span>
                  );
                }
                
                return <span key={i}>{part}</span>;
              })}
            </div>
          </div>
        );
      }
      
      // Bullet points
      if (line.startsWith('- ') || line.startsWith('• ')) {
        return (
          <div key={index} className="flex mt-1">
            <span className="text-gray-400 mr-2">•</span>
            <span className="flex-1">{line.substring(2)}</span>
          </div>
        );
      }
      
      // Regular paragraphs
      if (line.trim()) {
        return <p key={index} className="mt-2">{line}</p>;
      }
      
      return <div key={index} className="h-2" />;
    });
  };

  if (message.type === 'system') {
    return (
      <div className="flex items-start space-x-3 mb-4" role="status" aria-live="polite">
        <div className="flex-shrink-0">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <SparklesSolid className="h-5 w-5 text-white" />
          </div>
        </div>
        <div className="flex-1">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg px-4 py-3 border border-blue-200">
            <p className="text-sm text-gray-700">{message.content}</p>
          </div>
        </div>
      </div>
    );
  }

  if (message.type === 'user') {
    return (
      <div className="flex items-start space-x-3 mb-4 justify-end" role="article">
        <div className="flex-1 max-w-2xl">
          <div className="bg-blue-600 text-white rounded-lg px-4 py-3 ml-auto">
            <p className="text-sm">{message.content}</p>
          </div>
          <div className="flex items-center justify-end mt-1 space-x-2">
            <time className="text-xs text-gray-500">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </time>
          </div>
        </div>
        <div className="flex-shrink-0">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <UserIcon className="h-5 w-5 text-gray-600" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start space-x-3 mb-4" role="article">
      <div className="flex-shrink-0">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
          <SparklesIcon className="h-5 w-5 text-white" />
        </div>
      </div>
      <div className="flex-1">
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm">
          {/* Confidence Indicator */}
          {message.confidence && !isStreaming && (
            <div className="flex items-center mb-2 text-xs">
              <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-gray-600">
                Confidence: {Math.round(message.confidence * 100)}%
              </span>
              {message.confidence < 0.7 && (
                <span className="ml-2 text-amber-600 flex items-center">
                  <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                  Please verify this information
                </span>
              )}
            </div>
          )}

          {/* Message Content */}
          <div className="text-sm text-gray-700">
            {formatContent(displayedContent)}
            {isStreaming && (
              <span className="inline-block w-2 h-4 bg-blue-600 animate-pulse ml-1" />
            )}
          </div>

          {/* Sources */}
          {message.sources && message.sources.length > 0 && !isStreaming && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs font-medium text-gray-600 mb-2">Sources:</p>
              <div className="space-y-1">
                {message.sources.map((source, index) => (
                  <a
                    key={index}
                    href={source.url}
                    className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ArrowTopRightOnSquareIcon className="h-3 w-3 mr-1" />
                    {source.title}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {message.actions && message.actions.length > 0 && !isStreaming && (
            <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap gap-2">
              {message.actions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleAction(action.action)}
                  className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-medium rounded-lg transition-colors"
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Message Actions */}
        {!isStreaming && message.type === 'assistant' && (
          <div className="flex items-center mt-2 space-x-2">
            <button
              onClick={handleCopy}
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded hover:bg-gray-100 transition-colors"
              title="Copy message"
            >
              {copied ? (
                <CheckCircleIcon className="h-4 w-4 text-green-500" />
              ) : (
                <ClipboardDocumentIcon className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={() => handleFeedback('up')}
              className={`p-1.5 rounded hover:bg-gray-100 transition-colors ${
                feedback === 'up' ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'
              }`}
              title="Good response"
            >
              <HandThumbUpIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleFeedback('down')}
              className={`p-1.5 rounded hover:bg-gray-100 transition-colors ${
                feedback === 'down' ? 'text-red-600' : 'text-gray-400 hover:text-gray-600'
              }`}
              title="Poor response"
            >
              <HandThumbDownIcon className="h-4 w-4" />
            </button>
            <time className="text-xs text-gray-500 ml-2">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </time>
          </div>
        )}
      </div>
    </div>
  );
}