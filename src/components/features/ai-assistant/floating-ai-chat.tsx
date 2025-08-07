'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  ChatBubbleLeftRightIcon, 
  XMarkIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  MinusIcon
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export function FloatingAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your QA AI Assistant. I can help you analyze test results, generate test cases, review New Relic metrics, and answer questions about your QA processes. How can I assist you today?",
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(input),
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('new relic') || lowerQuery.includes('metrics')) {
      return "I've analyzed your New Relic metrics. Your test success rate is at 87.02%, which is above the threshold. However, I noticed increased response times in the profile API endpoints. Would you like me to generate a detailed performance analysis?";
    }
    if (lowerQuery.includes('test') && lowerQuery.includes('fail')) {
      return "Looking at recent test failures, I found 23 failed tests primarily in the Profile Upload suite. The main issues are: file size validation (5 failures) and network timeout scenarios (3 failures). Shall I help you create bug tickets for these?";
    }
    if (lowerQuery.includes('generate') || lowerQuery.includes('create')) {
      return "I can help you generate test cases. Please specify the feature or epic you'd like to test, and I'll create comprehensive test scenarios including edge cases, happy paths, and negative testing.";
    }
    if (lowerQuery.includes('performance')) {
      return "Based on the latest performance data: Average response time is 245ms (acceptable), but P95 latency at 680ms is concerning. The POST /api/v2/users/avatar endpoint shows 3.5% error rate. I recommend implementing caching and optimizing image processing.";
    }
    
    return "I understand you're asking about '" + query + "'. Let me help you with that. Based on your QA dashboard data, I can provide insights on test coverage, performance metrics, or help generate test cases. What specific aspect would you like to explore?";
  };

  const quickActions = [
    { label: 'Analyze Failures', action: 'Show me recent test failures' },
    { label: 'Performance Report', action: 'Generate performance analysis' },
    { label: 'Test Coverage', action: 'What is our test coverage?' },
    { label: 'New Relic Insights', action: 'Analyze New Relic metrics' }
  ];

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 p-4 glass-button-primary text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 group animate-bounce"
          aria-label="Open AI Assistant"
        >
          <ChatBubbleLeftRightIcon className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            AI Assistant
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={cn(
            "fixed z-50 transition-all duration-300 ease-in-out",
            isMinimized 
              ? "bottom-6 right-6 w-80 h-14"
              : "bottom-6 right-6 w-96 h-[600px] max-h-[80vh]"
          )}
        >
          <div className="flex flex-col h-full bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-slideUp">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#FF451A] to-[#ff6b47] text-white">
              <div className="flex items-center gap-2">
                <SparklesIcon className="h-5 w-5" />
                <span className="font-semibold">QA AI Assistant</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Minimize"
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex",
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-[80%] rounded-2xl px-4 py-2 animate-fadeIn",
                          message.role === 'user'
                            ? 'glass-button-primary text-white'
                            : 'bg-white border border-gray-200 text-gray-800 shadow-sm'
                        )}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={cn(
                          "text-xs mt-1",
                          message.role === 'user' ? 'text-orange-100' : 'text-gray-400'
                        )}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                {messages.length === 1 && (
                  <div className="px-4 py-2 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-2">Quick Actions:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickActions.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => setInput(action.action)}
                          className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Ask about tests, metrics, or QA processes..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF451A] focus:border-transparent transition-all"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim()}
                      className={cn(
                        "p-2 rounded-xl transition-all",
                        input.trim()
                          ? 'glass-button-primary text-white hover:shadow-lg hover:scale-105'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      )}
                      aria-label="Send message"
                    >
                      <PaperAirplaneIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}