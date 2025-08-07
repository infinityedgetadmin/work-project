'use client';

import { useState, useRef, useEffect } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { ChatMessage } from '@/components/features/ai-assistant/chat-message';
import { ChatInput } from '@/components/features/ai-assistant/chat-input';
import { PromptTemplates } from '@/components/features/ai-assistant/prompt-templates';
import { ContextPanel } from '@/components/features/ai-assistant/context-panel';
import { 
  InformationCircleIcon,
  DocumentTextIcon,
  CodeBracketIcon,
  ChartBarIcon,
  BeakerIcon,
  BugAntIcon,
  LightBulbIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { SparklesIcon as SparklesSolid } from '@heroicons/react/24/solid';

export interface Message {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  sources?: Array<{ title: string; url: string }>;
  confidence?: number;
  actions?: Array<{ label: string; action: string }>;
  isStreaming?: boolean;
}

export interface Context {
  type: 'epic' | 'meeting' | 'document' | 'ticket';
  id: string;
  title: string;
  metadata?: Record<string, unknown>;
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: 'Hello! I\'m your QA AI Assistant. I can help you generate test cases, analyze meetings, review requirements, and assist with various QA tasks. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeContext, setActiveContext] = useState<Context | null>(null);
  const [showTemplates, setShowTemplates] = useState(true);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setShowTemplates(false);

    // Simulate AI response with streaming
    const assistantMessageId = (Date.now() + 1).toString();
    setStreamingMessageId(assistantMessageId);

    const assistantMessage: Message = {
      id: assistantMessageId,
      type: 'assistant',
      content: '',
      timestamp: new Date(),
      isStreaming: true,
      confidence: 0.92,
    };

    setMessages(prev => [...prev, assistantMessage]);

    // Simulate streaming response
    const fullResponse = 'I\'ll help you with that request. Based on the context provided, here are the test cases I\'ve generated:\n\n## Test Cases for Profile Edit Feature\n\n1. **Verify profile fields are editable**\n   - Priority: High\n   - Steps: Navigate to profile, click edit, modify fields\n   - Expected: All fields should be editable\n\n2. **Validate required field validation**\n   - Priority: High\n   - Steps: Clear required fields, attempt to save\n   - Expected: Error messages should appear\n\n3. **Test profile image upload**\n   - Priority: Medium\n   - Steps: Upload new profile image\n   - Expected: Image should upload and display correctly';

    let currentText = '';
    const words = fullResponse.split(' ');
    
    for (let i = 0; i < words.length; i++) {
      currentText += (i > 0 ? ' ' : '') + words[i];
      
      setMessages(prev => prev.map(msg => 
        msg.id === assistantMessageId 
          ? { ...msg, content: currentText }
          : msg
      ));
      
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    // Final update with sources and actions
    setMessages(prev => prev.map(msg => 
      msg.id === assistantMessageId 
        ? { 
            ...msg, 
            isStreaming: false,
            sources: [
              { title: 'Testing Best Practices Guide', url: '#' },
              { title: 'Profile Feature Requirements', url: '#' }
            ],
            actions: [
              { label: 'Create Jira Tickets', action: 'create-tickets' },
              { label: 'Export to CSV', action: 'export-csv' },
              { label: 'Generate More', action: 'generate-more' }
            ]
          }
        : msg
    ));

    setStreamingMessageId(null);
    setIsLoading(false);
  };

  const handleTemplateSelect = (template: string) => {
    setInputValue(template);
    setShowTemplates(false);
  };

  const handleContextSelect = (context: Context) => {
    setActiveContext(context);
  };

  const handleRegenerateResponse = () => {
    if (messages.length > 1) {
      const lastUserMessage = [...messages].reverse().find(m => m.type === 'user');
      if (lastUserMessage) {
        handleSendMessage(lastUserMessage.content);
      }
    }
  };

  const promptTemplates = [
    {
      icon: BeakerIcon,
      title: 'Generate Test Cases',
      prompt: 'Generate comprehensive test cases for [feature name] including positive, negative, and edge cases',
      category: 'Testing'
    },
    {
      icon: DocumentTextIcon,
      title: 'Analyze Requirements',
      prompt: 'Analyze the requirements for [epic/feature] and identify potential gaps or ambiguities',
      category: 'Analysis'
    },
    {
      icon: BugAntIcon,
      title: 'Bug Impact Analysis',
      prompt: 'Analyze the impact of [bug description] on existing features and suggest regression test areas',
      category: 'Analysis'
    },
    {
      icon: ChartBarIcon,
      title: 'Meeting Summary',
      prompt: 'Summarize the key decisions and action items from the [meeting name] meeting',
      category: 'Meetings'
    },
    {
      icon: CodeBracketIcon,
      title: 'API Test Scripts',
      prompt: 'Generate API test scripts for [endpoint] including authentication and error scenarios',
      category: 'Testing'
    },
    {
      icon: LightBulbIcon,
      title: 'Testing Strategy',
      prompt: 'Create a comprehensive testing strategy for [release/sprint] including risk assessment',
      category: 'Planning'
    },
    {
      icon: ChartBarIcon,
      title: 'Analyze Test Failures',
      prompt: 'Analyze the recent test failures from New Relic dashboard and suggest root causes and fixes',
      category: 'New Relic'
    },
    {
      icon: ArrowPathIcon,
      title: 'Pipeline Analysis',
      prompt: 'Review the CI/CD pipeline performance metrics and suggest optimizations for faster test execution',
      category: 'New Relic'
    }
  ];

  return (
    <MainLayout>
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col glass">
          {/* Chat Header */}
          <div className="border-b border-white/20 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <SparklesSolid className="h-6 w-6 text-blue-600 mr-3" />
                <div>
                  <h1 className="text-xl font-semibold bg-gradient-to-r from-[#FF451A] to-orange-600 bg-clip-text text-transparent">AI Assistant</h1>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Online • Claude 3 Sonnet
                    {activeContext && (
                      <span className="ml-3 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                        Context: {activeContext.title}
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleRegenerateResponse}
                  className="p-2 text-gray-400 hover:text-[#FF451A] glass-button rounded-lg transition-colors"
                  title="Regenerate last response"
                >
                  <ArrowPathIcon className="h-5 w-5" />
                </button>
                <button
                  className="p-2 text-gray-400 hover:text-[#FF451A] glass-button rounded-lg transition-colors"
                  title="AI capabilities and limitations"
                >
                  <InformationCircleIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto px-6 py-4"
          >
            {messages.length === 1 && showTemplates && (
              <PromptTemplates
                templates={promptTemplates}
                onSelectTemplate={handleTemplateSelect}
              />
            )}

            <div className="max-w-4xl mx-auto space-y-4">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  isStreaming={message.id === streamingMessageId}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <ChatInput
            value={inputValue}
            onChange={setInputValue}
            onSend={handleSendMessage}
            isLoading={isLoading}
            placeholder="Ask about epics, generate tests, analyze meetings..."
            suggestions={[
              'Generate test cases for the login feature',
              'Analyze the latest sprint retrospective',
              'What are the requirements for EPIC-123?',
              'Create a test plan for the payment module'
            ]}
          />
        </div>

        {/* Context Panel */}
        <ContextPanel
          activeContext={activeContext}
          onSelectContext={handleContextSelect}
          recentContexts={[
            { type: 'epic', id: 'EPIC-123', title: 'User Profile Enhancement' },
            { type: 'meeting', id: 'MTG-456', title: 'Sprint Planning - Week 45' },
            { type: 'document', id: 'DOC-789', title: 'Payment API Specification' },
            { type: 'ticket', id: 'BUG-321', title: 'Login validation issue' }
          ]}
        />
      </div>
    </MainLayout>
  );
}