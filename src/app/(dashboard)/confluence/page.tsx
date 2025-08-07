'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DocumentDuplicateIcon,
  MagnifyingGlassIcon,
  FolderIcon,
  DocumentTextIcon,
  ClockIcon,
  UserCircleIcon,
  SparklesIcon,
  ChatBubbleLeftRightIcon,
  ArrowTopRightOnSquareIcon,
  PlusIcon,
  BookOpenIcon,
  TagIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  LinkIcon,
  PencilIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

interface ConfluencePage {
  id: string;
  title: string;
  space: string;
  type: 'page' | 'blog' | 'meeting-notes' | 'documentation';
  author: string;
  lastModified: string;
  lastModifiedBy: string;
  labels: string[];
  status: 'published' | 'draft' | 'archived';
  views: number;
  likes: number;
  comments: number;
  url: string;
  hasUnresolvedComments?: boolean;
  linkedEpics?: string[];
}

const confluencePages: ConfluencePage[] = [
  {
    id: 'conf-001',
    title: 'ACD Routing Architecture Design',
    space: 'Engineering',
    type: 'documentation',
    author: 'Tech Lead',
    lastModified: '2 hours ago',
    lastModifiedBy: 'Senior Architect',
    labels: ['architecture', 'routing', 'acd', 'technical-spec'],
    status: 'published',
    views: 234,
    likes: 12,
    comments: 8,
    url: 'https://confluence.genesys.com/display/ENG/ACD-Routing-Architecture',
    hasUnresolvedComments: true,
    linkedEpics: ['GC-ACD-2024']
  },
  {
    id: 'conf-002',
    title: 'IVR Flow Testing Guidelines',
    space: 'QA',
    type: 'documentation',
    author: 'QA Lead',
    lastModified: '1 day ago',
    lastModifiedBy: 'QA Lead',
    labels: ['testing', 'ivr', 'guidelines', 'best-practices'],
    status: 'published',
    views: 156,
    likes: 8,
    comments: 3,
    url: 'https://confluence.genesys.com/display/QA/IVR-Testing-Guidelines',
    linkedEpics: ['GC-IVR-890']
  },
  {
    id: 'conf-003',
    title: 'Sprint 45 Planning Meeting Notes',
    space: 'Agile',
    type: 'meeting-notes',
    author: 'Scrum Master',
    lastModified: '3 days ago',
    lastModifiedBy: 'Product Owner',
    labels: ['sprint-45', 'planning', 'meeting'],
    status: 'published',
    views: 89,
    likes: 3,
    comments: 12,
    url: 'https://confluence.genesys.com/display/AGILE/Sprint-45-Planning',
    hasUnresolvedComments: false,
    linkedEpics: ['GC-WFM-780', 'GC-QUEUE-567']
  },
  {
    id: 'conf-004',
    title: 'Workforce Management API Documentation',
    space: 'API',
    type: 'documentation',
    author: 'API Team',
    lastModified: '1 week ago',
    lastModifiedBy: 'Backend Dev',
    labels: ['api', 'wfm', 'documentation', 'v2'],
    status: 'published',
    views: 445,
    likes: 23,
    comments: 15,
    url: 'https://confluence.genesys.com/display/API/WFM-API-Documentation',
    linkedEpics: ['GC-WFM-780']
  },
  {
    id: 'conf-005',
    title: 'Predictive Routing Algorithm Research',
    space: 'Research',
    type: 'blog',
    author: 'Data Scientist',
    lastModified: '2 weeks ago',
    lastModifiedBy: 'Data Scientist',
    labels: ['research', 'ml', 'predictive-routing'],
    status: 'draft',
    views: 67,
    likes: 5,
    comments: 2,
    url: 'https://confluence.genesys.com/display/RES/Predictive-Routing-Research',
    linkedEpics: ['GC-PRED-450']
  }
];

const recentActivity = [
  {
    id: '1',
    action: 'edited',
    page: 'ACD Routing Architecture Design',
    user: 'Senior Architect',
    time: '2 hours ago',
    description: 'Updated routing algorithm section'
  },
  {
    id: '2',
    action: 'commented',
    page: 'IVR Flow Testing Guidelines',
    user: 'QA Engineer',
    time: '4 hours ago',
    description: 'Added test case for language selection'
  },
  {
    id: '3',
    action: 'created',
    page: 'Queue Analytics Dashboard Specs',
    user: 'Product Manager',
    time: '6 hours ago',
    description: 'New documentation for analytics features'
  },
  {
    id: '4',
    action: 'resolved',
    page: 'Sprint 45 Planning Meeting Notes',
    user: 'Scrum Master',
    time: '1 day ago',
    description: 'Resolved all action items'
  }
];

export default function ConfluencePage() {
  const [selectedPage, setSelectedPage] = useState<ConfluencePage | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [spaceFilter, setSpaceFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const spaces = ['all', 'Engineering', 'QA', 'Agile', 'API', 'Research'];
  const types = ['all', 'page', 'blog', 'meeting-notes', 'documentation'];

  const filteredPages = confluencePages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         page.labels.some(label => label.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSpace = spaceFilter === 'all' || page.space === spaceFilter;
    const matchesType = typeFilter === 'all' || page.type === typeFilter;
    return matchesSearch && matchesSpace && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'documentation': return DocumentTextIcon;
      case 'meeting-notes': return ClockIcon;
      case 'blog': return BookOpenIcon;
      default: return DocumentDuplicateIcon;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'documentation': return 'bg-blue-100 text-blue-600';
      case 'meeting-notes': return 'bg-purple-100 text-purple-600';
      case 'blog': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const handleSummarize = async (page: ConfluencePage) => {
    setIsAnalyzing(true);
    setSelectedPage(page);
    setShowAIPanel(true);
    
    // Simulate AI summarization
    setTimeout(() => {
      setAiResponse(`## Summary of "${page.title}"

This document covers the implementation details of ${page.title.toLowerCase()}. Key points include:

• **Architecture Overview**: Comprehensive design patterns for scalable implementation
• **Technical Requirements**: Detailed specifications for integration points
• **Testing Strategy**: Robust validation approach with automated test coverage
• **Performance Metrics**: Target KPIs and monitoring requirements

### Key Insights:
1. The proposed architecture aligns with current platform capabilities
2. Integration with existing systems requires minimal modifications
3. Performance targets are achievable with current infrastructure

### Recommended Actions:
- Review security implications with the security team
- Schedule architecture review meeting for next sprint
- Create follow-up tickets for implementation tasks`);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleCreateTicket = (page: ConfluencePage) => {
    alert(`Creating Jira ticket from "${page.title}"...`);
    // In real implementation, this would call the Jira API
  };

  const handleAskAI = () => {
    if (!aiQuery || !selectedPage) return;
    
    setIsAnalyzing(true);
    // Simulate AI response
    setTimeout(() => {
      setAiResponse(`Based on the document "${selectedPage.title}", here's my analysis of your question:

"${aiQuery}"

The document indicates that ${aiQuery.toLowerCase()} is addressed in section 3.2, where it discusses the implementation approach. The key considerations are:

1. **Technical Feasibility**: The proposed solution is technically viable with current infrastructure
2. **Resource Requirements**: Estimated 3-4 sprint cycles for complete implementation
3. **Risk Factors**: Minimal risk with proper testing and phased rollout

Would you like me to elaborate on any specific aspect?`);
      setIsAnalyzing(false);
      setAiQuery('');
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient-orange">Confluence</h1>
            <p className="text-gray-600 mt-2">Browse and analyze Confluence documentation with AI assistance</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 glass-button-primary text-white rounded-xl flex items-center gap-2 hover:scale-105 transition-all">
              <PlusIcon className="h-5 w-5" />
              Create Page
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glass-card hover-lift">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Pages</p>
                  <p className="text-2xl font-bold text-gray-900">248</p>
                </div>
                <DocumentDuplicateIcon className="h-8 w-8 text-[#FF451A]" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card hover-lift">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Updated Today</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
                <ClockIcon className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card hover-lift">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Unresolved Comments</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                </div>
                <ChatBubbleLeftRightIcon className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card hover-lift">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Draft Pages</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
                <PencilIcon className="h-8 w-8 text-gray-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Document List */}
          <div className="lg:col-span-2 space-y-4">
            {/* Filters */}
            <Card className="glass-card">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search pages by title or label..."
                      className="w-full pl-10 pr-4 py-2 glass-input rounded-lg"
                    />
                  </div>
                  
                  <select
                    value={spaceFilter}
                    onChange={(e) => setSpaceFilter(e.target.value)}
                    className="px-4 py-2 glass-input rounded-lg"
                  >
                    {spaces.map(space => (
                      <option key={space} value={space}>
                        {space === 'all' ? 'All Spaces' : space}
                      </option>
                    ))}
                  </select>
                  
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="px-4 py-2 glass-input rounded-lg"
                  >
                    {types.map(type => (
                      <option key={type} value={type}>
                        {type === 'all' ? 'All Types' : type.replace('-', ' ').charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                      </option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Document List */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Documents</CardTitle>
                <CardDescription>Browse and analyze Confluence pages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredPages.map((page) => {
                    const Icon = getTypeIcon(page.type);
                    return (
                      <div
                        key={page.id}
                        onClick={() => setSelectedPage(page)}
                        className={cn(
                          "p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md",
                          selectedPage?.id === page.id 
                            ? "border-[#FF451A] bg-orange-50" 
                            : "border-gray-200 hover:border-orange-200"
                        )}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className={cn("p-1.5 rounded-lg", getTypeColor(page.type))}>
                                <Icon className="h-4 w-4" />
                              </div>
                              <h3 className="font-medium text-gray-900">{page.title}</h3>
                              {page.status === 'draft' && (
                                <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                                  Draft
                                </span>
                              )}
                              {page.hasUnresolvedComments && (
                                <ExclamationTriangleIcon className="h-4 w-4 text-yellow-500" title="Has unresolved comments" />
                              )}
                            </div>
                            
                            <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                              <span className="flex items-center gap-1">
                                <FolderIcon className="h-3 w-3" />
                                {page.space}
                              </span>
                              <span className="flex items-center gap-1">
                                <UserCircleIcon className="h-3 w-3" />
                                {page.lastModifiedBy}
                              </span>
                              <span className="flex items-center gap-1">
                                <ClockIcon className="h-3 w-3" />
                                {page.lastModified}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-2 flex-wrap mb-2">
                              {page.labels.map((label) => (
                                <span
                                  key={label}
                                  className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full"
                                >
                                  {label}
                                </span>
                              ))}
                            </div>
                            
                            {page.linkedEpics && page.linkedEpics.length > 0 && (
                              <div className="flex items-center gap-2 text-xs text-[#FF451A]">
                                <LinkIcon className="h-3 w-3" />
                                Linked to: {page.linkedEpics.join(', ')}
                              </div>
                            )}
                            
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <ChartBarIcon className="h-3 w-3" />
                                {page.views} views
                              </span>
                              <span>{page.likes} likes</span>
                              <span>{page.comments} comments</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(page.url, '_blank');
                              }}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Open in Confluence"
                            >
                              <ArrowTopRightOnSquareIcon className="h-4 w-4 text-gray-500" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSummarize(page);
                              }}
                              className="p-2 hover:bg-orange-100 rounded-lg transition-colors"
                              title="Summarize with AI"
                            >
                              <SparklesIcon className="h-4 w-4 text-[#FF451A]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  {filteredPages.length === 0 && (
                    <div className="text-center py-8">
                      <DocumentDuplicateIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600">No documents found matching your filters</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-4">
            {/* AI Assistant Panel */}
            {selectedPage && showAIPanel && (
              <Card className="glass-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <SparklesIcon className="h-5 w-5 text-[#FF451A]" />
                      AI Assistant
                    </CardTitle>
                    <button
                      onClick={() => setShowAIPanel(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  </div>
                  <CardDescription>Analyzing: {selectedPage.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* AI Response */}
                    {aiResponse && (
                      <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
                        <div className="prose prose-sm max-w-none text-gray-700">
                          <div dangerouslySetInnerHTML={{ __html: aiResponse.replace(/\n/g, '<br />') }} />
                        </div>
                      </div>
                    )}
                    
                    {isAnalyzing && (
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <ArrowPathIcon className="h-5 w-5 text-[#FF451A] animate-spin" />
                        <span className="text-gray-600">Analyzing document...</span>
                      </div>
                    )}
                    
                    {/* AI Query Input */}
                    <div className="space-y-2">
                      <textarea
                        value={aiQuery}
                        onChange={(e) => setAiQuery(e.target.value)}
                        placeholder="Ask a question about this document..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF451A] resize-none"
                        rows={3}
                      />
                      <button
                        onClick={handleAskAI}
                        disabled={!aiQuery || isAnalyzing}
                        className="w-full px-4 py-2 glass-button-primary text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all"
                      >
                        Ask AI
                      </button>
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="space-y-2 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => handleCreateTicket(selectedPage)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <PlusIcon className="h-4 w-4" />
                        Create Jira Ticket
                      </button>
                      <button
                        onClick={() => handleSummarize(selectedPage)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <ArrowPathIcon className="h-4 w-4" />
                        Regenerate Summary
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Activity */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
                <CardDescription>Latest updates across all spaces</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className={cn(
                        "p-1.5 rounded-lg",
                        activity.action === 'edited' ? 'bg-blue-100' :
                        activity.action === 'commented' ? 'bg-purple-100' :
                        activity.action === 'created' ? 'bg-green-100' :
                        'bg-gray-100'
                      )}>
                        {activity.action === 'edited' ? <PencilIcon className="h-4 w-4 text-blue-600" /> :
                         activity.action === 'commented' ? <ChatBubbleLeftRightIcon className="h-4 w-4 text-purple-600" /> :
                         activity.action === 'created' ? <PlusIcon className="h-4 w-4 text-green-600" /> :
                         <CheckCircleIcon className="h-4 w-4 text-gray-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-sm font-medium text-gray-700 truncate">{activity.page}</p>
                        <p className="text-xs text-gray-500">{activity.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <LightBulbIcon className="h-5 w-5 text-yellow-500" />
                  Quick Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF451A]">•</span>
                    Click the AI icon to get instant summaries of any document
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF451A]">•</span>
                    Create Jira tickets directly from Confluence pages
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF451A]">•</span>
                    Use labels to quickly filter related documentation
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF451A]">•</span>
                    Ask the AI assistant specific questions about document content
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}