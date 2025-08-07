'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  CodeBracketIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  ArrowTopRightOnSquareIcon,
  FunnelIcon,
  CalendarIcon,
  UserIcon,
  LinkIcon
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

interface CodeChange {
  id: string;
  title: string;
  epicId: string;
  epicTitle: string;
  repository: string;
  author: string;
  status: 'merged' | 'open' | 'closed';
  createdAt: string;
  mergedAt?: string;
  filesChanged: number;
  linesAdded: number;
  linesRemoved: number;
  reviewers?: string[];
  description?: string;
}

const codeChanges: CodeChange[] = [
  {
    id: 'PR-287',
    title: 'Implement skills-based routing algorithm',
    epicId: 'GC-ROUTE-890',
    epicTitle: 'Advanced Routing Engine',
    repository: 'genesys-routing-engine',
    author: 'Dev Lead',
    status: 'merged',
    createdAt: '2024-12-05',
    mergedAt: '2024-12-06',
    filesChanged: 8,
    linesAdded: 245,
    linesRemoved: 67,
    reviewers: ['Senior Dev', 'QA Engineer'],
    description: 'Added skill-based agent assignment with priority queuing'
  },
  {
    id: 'PR-288',
    title: 'Add predictive routing capabilities',
    epicId: 'GC-PRED-450',
    epicTitle: 'Predictive Engagement',
    repository: 'genesys-analytics-api',
    author: 'Backend Dev',
    status: 'open',
    createdAt: '2024-12-06',
    filesChanged: 15,
    linesAdded: 890,
    linesRemoved: 120,
    reviewers: ['Tech Lead', 'Data Scientist'],
    description: 'Machine learning model for optimal agent-customer matching'
  },
  {
    id: 'PR-289',
    title: 'Fix IVR menu navigation flow',
    epicId: 'GC-IVR-890',
    epicTitle: 'IVR Modernization',
    repository: 'genesys-architect-flows',
    author: 'Frontend Dev',
    status: 'merged',
    createdAt: '2024-12-04',
    mergedAt: '2024-12-05',
    filesChanged: 12,
    linesAdded: 156,
    linesRemoved: 89,
    reviewers: ['UX Designer', 'QA Lead']
  },
  {
    id: 'PR-290',
    title: 'Queue performance optimization',
    epicId: 'GC-QUEUE-567',
    epicTitle: 'Queue Management System',
    repository: 'genesys-routing-engine',
    author: 'Senior Backend Dev',
    status: 'merged',
    createdAt: '2024-12-03',
    mergedAt: '2024-12-04',
    filesChanged: 5,
    linesAdded: 78,
    linesRemoved: 234,
    reviewers: ['DBA', 'Tech Lead'],
    description: 'Optimized queue distribution and reduced wait times'
  },
  {
    id: 'PR-291',
    title: 'Update agent state management',
    epicId: 'GC-AGENT-312',
    epicTitle: 'Agent Experience Enhancement',
    repository: 'genesys-routing-engine',
    author: 'Security Engineer',
    status: 'closed',
    createdAt: '2024-12-02',
    filesChanged: 3,
    linesAdded: 45,
    linesRemoved: 12,
    description: 'Agent state transitions - moved to next sprint'
  },
  {
    id: 'PR-292',
    title: 'Add workforce analytics API',
    epicId: 'GC-WFM-780',
    epicTitle: 'Workforce Management',
    repository: 'genesys-analytics-api',
    author: 'Frontend Lead',
    status: 'open',
    createdAt: '2024-12-06',
    filesChanged: 18,
    linesAdded: 567,
    linesRemoved: 23,
    reviewers: ['Product Manager', 'Data Analyst']
  }
];

const epicSummary = [
  {
    epicId: 'GC-ROUTE-890',
    epicTitle: 'Advanced Routing Engine',
    totalPRs: 8,
    mergedPRs: 6,
    openPRs: 2,
    lastActivity: '2 hours ago'
  },
  {
    epicId: 'GC-IVR-890',
    epicTitle: 'IVR Modernization',
    totalPRs: 5,
    mergedPRs: 3,
    openPRs: 2,
    lastActivity: '1 day ago'
  },
  {
    epicId: 'GC-QUEUE-567',
    epicTitle: 'Queue Management System',
    totalPRs: 4,
    mergedPRs: 4,
    openPRs: 0,
    lastActivity: '3 days ago'
  },
  {
    epicId: 'GC-WFM-780',
    epicTitle: 'Workforce Management',
    totalPRs: 3,
    mergedPRs: 3,
    openPRs: 0,
    lastActivity: '5 days ago'
  }
];

export default function CodeChangesPage() {
  const [selectedEpic, setSelectedEpic] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredChanges = codeChanges.filter(change => {
    const matchesEpic = !selectedEpic || change.epicId === selectedEpic;
    const matchesStatus = statusFilter === 'all' || change.status === statusFilter;
    return matchesEpic && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'merged':
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
      case 'open':
        return <ClockIcon className="h-5 w-5 text-yellow-600" />;
      case 'closed':
        return <XCircleIcon className="h-5 w-5 text-gray-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'merged':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'open':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'closed':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient-orange">Code Changes</h1>
            <p className="text-gray-600 mt-2">Track pull requests and code changes linked to epics</p>
          </div>
          
          <div className="flex items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 glass-input rounded-xl"
            >
              <option value="all">All Status</option>
              <option value="merged">Merged</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
            
            <select
              value={selectedEpic || ''}
              onChange={(e) => setSelectedEpic(e.target.value || null)}
              className="px-4 py-2 glass-input rounded-xl"
            >
              <option value="">All Epics</option>
              {epicSummary.map(epic => (
                <option key={epic.epicId} value={epic.epicId}>
                  {epic.epicId}: {epic.epicTitle}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Epic Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {epicSummary.map((epic) => (
            <Card
              key={epic.epicId}
              className={cn(
                "glass-card hover-lift cursor-pointer transition-all",
                selectedEpic === epic.epicId && "ring-2 ring-[#FF451A]"
              )}
              onClick={() => setSelectedEpic(selectedEpic === epic.epicId ? null : epic.epicId)}
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-3">
                  <DocumentTextIcon className="h-5 w-5 text-[#FF451A]" />
                  <span className="text-xs text-gray-500">{epic.lastActivity}</span>
                </div>
                <h3 className="font-medium text-gray-900 text-sm mb-1">{epic.epicTitle}</h3>
                <p className="text-xs text-gray-600 mb-3">{epic.epicId}</p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-lg font-bold text-gray-900">{epic.totalPRs}</p>
                    <p className="text-xs text-gray-500">Total</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-green-600">{epic.mergedPRs}</p>
                    <p className="text-xs text-gray-500">Merged</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-yellow-600">{epic.openPRs}</p>
                    <p className="text-xs text-gray-500">Open</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Code Changes List */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Pull Requests</CardTitle>
            <CardDescription>
              {selectedEpic 
                ? `Showing changes for ${epicSummary.find(e => e.epicId === selectedEpic)?.epicTitle}`
                : 'All pull requests linked to epics'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredChanges.map((change) => (
                <div
                  key={change.id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-orange-200 hover:bg-orange-50/50 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(change.status)}
                          <h3 className="font-medium text-gray-900">{change.title}</h3>
                        </div>
                        <span className={cn(
                          "px-2 py-1 text-xs font-medium rounded-full border",
                          getStatusColor(change.status)
                        )}>
                          {change.status}
                        </span>
                      </div>
                      
                      {change.description && (
                        <p className="text-sm text-gray-600 mb-2">{change.description}</p>
                      )}
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <LinkIcon className="h-3 w-3" />
                          {change.id}
                        </span>
                        <span className="flex items-center gap-1">
                          <DocumentTextIcon className="h-3 w-3" />
                          {change.epicId}: {change.epicTitle}
                        </span>
                        <span className="flex items-center gap-1">
                          <CodeBracketIcon className="h-3 w-3" />
                          {change.repository}
                        </span>
                        <span className="flex items-center gap-1">
                          <UserIcon className="h-3 w-3" />
                          {change.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" />
                          {change.createdAt}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-600">
                          {change.filesChanged} files changed
                        </span>
                        <span className="text-xs text-green-600">
                          +{change.linesAdded}
                        </span>
                        <span className="text-xs text-red-600">
                          -{change.linesRemoved}
                        </span>
                        {change.reviewers && (
                          <span className="text-xs text-gray-600">
                            {change.reviewers.length} reviewers
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <ArrowTopRightOnSquareIcon className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              ))}
              
              {filteredChanges.length === 0 && (
                <div className="text-center py-8">
                  <CodeBracketIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No code changes found matching your filters</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}