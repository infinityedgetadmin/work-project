import { useState, useRef, KeyboardEvent } from 'react';
import { 
  PaperAirplaneIcon, 
  PaperClipIcon,
  MicrophoneIcon,
  StopIcon,
  CommandLineIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  suggestions?: string[];
}

export function ChatInput({
  value,
  onChange,
  onSend,
  isLoading = false,
  placeholder = 'Type your message...',
  suggestions = []
}: ChatInputProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    // Filter suggestions based on input
    if (newValue.trim()) {
      const filtered = suggestions.filter(s => 
        s.toLowerCase().includes(newValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setFilteredSuggestions(suggestions);
      setShowSuggestions(false);
    }

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (showSuggestions && filteredSuggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < filteredSuggestions.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : filteredSuggestions.length - 1
        );
      } else if (e.key === 'Tab' && selectedSuggestionIndex >= 0) {
        e.preventDefault();
        selectSuggestion(filteredSuggestions[selectedSuggestionIndex]);
      }
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }

    // Cmd/Ctrl + K for quick commands
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setShowSuggestions(!showSuggestions);
    }
  };

  const handleSend = () => {
    if (value.trim() && !isLoading) {
      onSend(value);
      setShowSuggestions(false);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const selectSuggestion = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    textareaRef.current?.focus();
  };

  const handleFocus = () => {
    if (!value.trim() && suggestions.length > 0) {
      setFilteredSuggestions(suggestions.slice(0, 4));
      setShowSuggestions(true);
    }
  };

  return (
    <div className="relative border-t border-gray-200 bg-white">
      {/* Suggestions Dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute bottom-full left-0 right-0 mb-2 mx-4">
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
            <div className="p-2">
              <div className="flex items-center justify-between mb-2 px-2">
                <span className="text-xs font-medium text-gray-500">Suggestions</span>
                <button
                  onClick={() => setShowSuggestions(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => selectSuggestion(suggestion)}
                  onMouseEnter={() => setSelectedSuggestionIndex(index)}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                    index === selectedSuggestionIndex
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="px-4 py-3">
        <div className="flex items-end space-x-2">
          {/* File Attachment Button */}
          <button
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors mb-1"
            title="Attach file"
            disabled={isLoading}
          >
            <PaperClipIcon className="h-5 w-5" />
          </button>

          {/* Textarea Container */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              placeholder={placeholder}
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm text-gray-900 placeholder-gray-500 disabled:bg-gray-50 disabled:text-gray-500"
              rows={1}
              style={{ minHeight: '40px', maxHeight: '200px' }}
              aria-label="Message input"
              aria-describedby="input-hints"
            />
            
            {/* Input Hints */}
            <div id="input-hints" className="sr-only">
              Press Enter to send, Shift+Enter for new line, Cmd+K for suggestions
            </div>
          </div>

          {/* Voice Input Button */}
          <button
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors mb-1"
            title="Voice input"
            disabled={isLoading}
          >
            <MicrophoneIcon className="h-5 w-5" />
          </button>

          {/* Send/Stop Button */}
          <button
            onClick={handleSend}
            disabled={!value.trim() || isLoading}
            className={`p-2 rounded-lg transition-all mb-1 ${
              isLoading
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : value.trim()
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            title={isLoading ? 'Stop generation' : 'Send message'}
          >
            {isLoading ? (
              <StopIcon className="h-5 w-5" />
            ) : (
              <PaperAirplaneIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Input Status Bar */}
        <div className="flex items-center justify-between mt-2 px-1">
          <div className="flex items-center space-x-3 text-xs text-gray-500">
            <span className="flex items-center">
              <CommandLineIcon className="h-3 w-3 mr-1" />
              <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">⌘K</kbd>
              <span className="ml-1">for suggestions</span>
            </span>
            <span>•</span>
            <span>
              <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">↵</kbd> to send
            </span>
            <span>•</span>
            <span>
              <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">⇧↵</kbd> for new line
            </span>
          </div>
          <div className="text-xs text-gray-500">
            {value.length} / 4000 characters
          </div>
        </div>
      </div>
    </div>
  );
}