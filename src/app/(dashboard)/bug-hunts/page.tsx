'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BugAntIcon,
  PlayIcon,
  StopIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  UserGroupIcon,
  SparklesIcon,
  PlusIcon,
  MicrophoneIcon,
  DocumentDuplicateIcon,
  LinkIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

interface BugHunt {
  id: string;
  title: string;
  epic: string;
  status: 'scheduled' | 'active' | 'completed';
  date: string;
  duration?: string;
  participants: number;
  bugsFound?: number;
  bugsResolved?: number;
  recording?: string;
  transcript?: boolean;
  aiSummary?: string;
  linkedTickets?: string[];
}

const bugHunts: BugHunt[] = [
  {
    id: '1',
    title: 'ACD Routing Logic Validation',
    epic: 'GC-ACD-2024',
    status: 'completed',
    date: '2024-12-05',
    duration: '2.5 hours',
    participants: 6,
    bugsFound: 12,
    bugsResolved: 8,
    recording: 'zoom.us/rec/12345',
    transcript: true,
    aiSummary: 'Critical issues in skill-based routing algorithm. 3 P1 bugs affecting agent assignment logic.',
    linkedTickets: ['BUG-456', 'BUG-457', 'BUG-458']
  },
  {
    id: '2',
    title: 'IVR Call Flow Testing',
    epic: 'GC-IVR-890',
    status: 'active',
    date: '2024-12-06',
    participants: 4,
    bugsFound: 3,
    bugsResolved: 1
  },
  {
    id: '3',
    title: 'Queue Management API Test',
    epic: 'GC-QUEUE-567',
    status: 'scheduled',
    date: '2024-12-08',
    participants: 8
  },
  {
    id: '4',
    title: 'Workforce Scheduling Audit',
    epic: 'GC-WFM-780',
    status: 'completed',
    date: '2024-12-04',
    duration: '3 hours',
    participants: 5,
    bugsFound: 7,
    bugsResolved: 7,
    recording: 'zoom.us/rec/67890',
    transcript: true,
    linkedTickets: ['BUG-451', 'BUG-452']
  }
];

const activeBugHunt = {
  title: 'IVR Call Flow Testing',
  epic: 'GC-IVR-890',
  startTime: '10:00 AM',
  elapsed: '45 minutes',
  participants: [
    { name: 'QA Lead', role: 'Moderator' },
    { name: 'Senior QA', role: 'Tester' },
    { name: 'Developer', role: 'Observer' },
    { name: 'PM', role: 'Observer' }
  ],
  bugs: [
    { id: 'BH-001', title: 'Menu option 3 routes to wrong queue', severity: 'critical', status: 'open' },
    { id: 'BH-002', title: 'Voice recognition fails on accent variations', severity: 'medium', status: 'resolved' },
    { id: 'BH-003', title: 'Call disconnect on language selection', severity: 'low', status: 'open' }
  ]
};

export default function BugHuntsPage() {
  const [selectedHunt, setSelectedHunt] = useState<BugHunt | null>(null);
  const [showNewHunt, setShowNewHunt] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'completed': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'scheduled': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient-orange">Bug Hunts</h1>
            <p className="text-gray-600 mt-2">Collaborative testing sessions with AI-powered insights</p>
          </div>
          <button
            onClick={() => setShowNewHunt(true)}
            className="px-4 py-2 glass-button-primary text-white rounded-xl flex items-center gap-2 hover:scale-105 transition-all"
          >
            <PlusIcon className="h-5 w-5" />
            Schedule Bug Hunt
          </button>
        </div>

        {/* Active Bug Hunt */}
        {bugHunts.some(h => h.status === 'active') && (
          <Card className="glass-card border-2 border-green-200 bg-gradient-to-r from-green-50/50 to-orange-50/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <PlayIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Active Bug Hunt Session</CardTitle>
                    <CardDescription>{activeBugHunt.title} • Epic: {activeBugHunt.epic}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-5 w-5 text-gray-500" />
                    <span className="text-sm font-medium">{activeBugHunt.elapsed}</span>
                  </div>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors">
                    <StopIcon className="h-4 w-4" />
                    End Session
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Participants */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Participants</h3>
                  <div className="space-y-2">
                    {activeBugHunt.participants.map((participant, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-white/70 rounded-lg">
                        <div className="flex items-center gap-2">
                          <UserGroupIcon className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium">{participant.name}</span>
                        </div>
                        <span className="text-xs text-gray-500">{participant.role}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bugs Found */}
                <div className="md:col-span-2">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Bugs Identified</h3>
                  <div className="space-y-2">
                    {activeBugHunt.bugs.map((bug) => (
                      <div key={bug.id} className="flex items-center justify-between p-3 bg-white/70 rounded-lg">
                        <div className="flex items-center gap-3">
                          <BugAntIcon className="h-5 w-5 text-red-500" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{bug.title}</p>
                            <p className="text-xs text-gray-500">{bug.id}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "px-2 py-1 text-xs font-medium rounded-full",
                            getSeverityColor(bug.severity)
                          )}>
                            {bug.severity}
                          </span>
                          {bug.status === 'resolved' ? (
                            <CheckCircleIcon className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircleIcon className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-200">
                <button className="px-3 py-1.5 bg-white/70 rounded-lg flex items-center gap-2 text-sm hover:bg-white transition-colors">
                  <MicrophoneIcon className="h-4 w-4 text-gray-600" />
                  Start Recording
                </button>
                <button className="px-3 py-1.5 bg-white/70 rounded-lg flex items-center gap-2 text-sm hover:bg-white transition-colors">
                  <DocumentDuplicateIcon className="h-4 w-4 text-gray-600" />
                  Generate Transcript
                </button>
                <button className="px-3 py-1.5 bg-white/70 rounded-lg flex items-center gap-2 text-sm hover:bg-white transition-colors">
                  <SparklesIcon className="h-4 w-4 text-[#FF451A]" />
                  AI Analysis
                </button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bug Hunt History */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List */}
          <div className="lg:col-span-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Bug Hunt Sessions</CardTitle>
                <CardDescription>Recent and upcoming testing sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {bugHunts.map((hunt) => (
                    <div
                      key={hunt.id}
                      onClick={() => setSelectedHunt(hunt)}
                      className={cn(
                        "p-4 rounded-lg border transition-all cursor-pointer hover:shadow-md",
                        selectedHunt?.id === hunt.id ? 'border-[#FF451A] bg-orange-50' : 'border-gray-200 hover:border-orange-200'
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium text-gray-900">{hunt.title}</h3>
                            <span className={cn(
                              "px-2 py-1 text-xs font-medium rounded-full border",
                              getStatusColor(hunt.status)
                            )}>
                              {hunt.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>Epic: {hunt.epic}</span>
                            <span>{hunt.date}</span>
                            {hunt.duration && <span>{hunt.duration}</span>}
                            <span className="flex items-center gap-1">
                              <UserGroupIcon className="h-3 w-3" />
                              {hunt.participants}
                            </span>
                          </div>
                          {hunt.bugsFound !== undefined && (
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-xs text-red-600">
                                {hunt.bugsFound} bugs found
                              </span>
                              <span className="text-xs text-green-600">
                                {hunt.bugsResolved} resolved
                              </span>
                              {hunt.linkedTickets && (
                                <span className="text-xs text-blue-600">
                                  {hunt.linkedTickets.length} tickets created
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-2">
                          {hunt.recording && (
                            <div className="p-1.5 bg-purple-100 rounded-lg" title="Has Recording">
                              <VideoCameraIcon className="h-4 w-4 text-purple-600" />
                            </div>
                          )}
                          {hunt.transcript && (
                            <div className="p-1.5 bg-blue-100 rounded-lg" title="Has Transcript">
                              <DocumentTextIcon className="h-4 w-4 text-blue-600" />
                            </div>
                          )}
                          {hunt.aiSummary && (
                            <div className="p-1.5 bg-orange-100 rounded-lg" title="AI Analysis Available">
                              <SparklesIcon className="h-4 w-4 text-[#FF451A]" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Details Panel */}
          <div>
            {selectedHunt ? (
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">Session Details</CardTitle>
                  <CardDescription>{selectedHunt.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Metrics */}
                    {selectedHunt.bugsFound !== undefined && (
                      <div className="grid grid-cols-2 gap-3">
                        <div className="text-center p-3 bg-red-50 rounded-lg">
                          <p className="text-2xl font-bold text-red-600">{selectedHunt.bugsFound}</p>
                          <p className="text-xs text-gray-600">Bugs Found</p>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <p className="text-2xl font-bold text-green-600">{selectedHunt.bugsResolved}</p>
                          <p className="text-xs text-gray-600">Resolved</p>
                        </div>
                      </div>
                    )}

                    {/* AI Summary */}
                    {selectedHunt.aiSummary && (
                      <div className="p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200">
                        <div className="flex items-center gap-2 mb-2">
                          <SparklesIcon className="h-5 w-5 text-[#FF451A]" />
                          <span className="text-sm font-semibold text-gray-700">AI Summary</span>
                        </div>
                        <p className="text-sm text-gray-600">{selectedHunt.aiSummary}</p>
                      </div>
                    )}

                    {/* Linked Tickets */}
                    {selectedHunt.linkedTickets && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Created Tickets</h4>
                        <div className="space-y-2">
                          {selectedHunt.linkedTickets.map((ticket) => (
                            <div key={ticket} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                              <div className="flex items-center gap-2">
                                <LinkIcon className="h-4 w-4 text-gray-500" />
                                <span className="text-sm font-medium text-blue-600">{ticket}</span>
                              </div>
                              <ExclamationTriangleIcon className="h-4 w-4 text-yellow-500" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="space-y-2 pt-4 border-t border-gray-200">
                      {selectedHunt.recording && (
                        <button className="w-full px-3 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-100 transition-colors">
                          View Recording
                        </button>
                      )}
                      {selectedHunt.transcript && (
                        <button className="w-full px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                          View Transcript
                        </button>
                      )}
                      <button className="w-full px-3 py-2 glass-button-primary text-white rounded-lg text-sm font-medium hover:scale-105 transition-all">
                        Generate Report
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="glass-card">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <BugAntIcon className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600 text-center">Select a bug hunt session to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}