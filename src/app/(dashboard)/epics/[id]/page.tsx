'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { MainLayout } from '@/components/layout/main-layout';
import { getEpicDashboardData, getMeetingTranscript } from '@/services/mock-data';
import type { EpicDashboardData, MeetingTranscript } from '@/types/api';
import {
  FolderIcon,
  TicketIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  SparklesIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  UserGroupIcon,
  CalendarIcon,
  ArrowRightIcon,
  PlayIcon,
  DocumentDuplicateIcon,
  ArrowsPointingOutIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolid } from '@heroicons/react/24/solid';

export default function EpicDetailPage() {
  const params = useParams();
  const [epicData, setEpicData] = useState<EpicDashboardData | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [selectedMeeting, setSelectedMeeting] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<MeetingTranscript | null>(null);

  useEffect(() => {
    loadEpicData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  useEffect(() => {
    if (selectedMeeting) {
      loadTranscript(selectedMeeting);
    }
  }, [selectedMeeting]);

  const loadEpicData = async () => {
    setLoading(true);
    try {
      const data = await getEpicDashboardData(params.id as string);
      setEpicData(data);
    } catch (error) {
      console.error('Failed to load epic data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTranscript = async (meetingId: string) => {
    try {
      const data = await getMeetingTranscript(meetingId);
      setTranscript(data);
    } catch (error) {
      console.error('Failed to load transcript:', error);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </MainLayout>
    );
  }

  if (!epicData) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <p className="text-gray-500">Epic not found</p>
        </div>
      </MainLayout>
    );
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'To Do': 'bg-gray-100 text-gray-700',
      'In Progress': 'bg-blue-100 text-blue-700',
      'In Review': 'bg-purple-100 text-purple-700',
      'Done': 'bg-green-100 text-green-700',
      'Blocked': 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getPriorityIcon = (priority: string) => {
    const colors: Record<string, string> = {
      'Critical': 'text-red-600',
      'High': 'text-orange-600',
      'Medium': 'text-yellow-600',
      'Low': 'text-green-600'
    };
    return colors[priority] || 'text-gray-600';
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FolderIcon },
    { id: 'tickets', label: `Tickets (${epicData.tickets.length})`, icon: TicketIcon },
    { id: 'documents', label: `Documents (${epicData.documents.length})`, icon: DocumentTextIcon },
    { id: 'meetings', label: `Meetings (${epicData.meetings.length})`, icon: VideoCameraIcon },
    { id: 'testing', label: 'Test Results', icon: ChartBarIcon },
    { id: 'insights', label: 'AI Insights', icon: SparklesIcon }
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Epic Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-sm font-medium text-gray-500">{epicData.epic.key}</span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(epicData.epic.status)}`}>
                  {epicData.epic.status}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityIcon(epicData.epic.priority)} border-current`}>
                  {epicData.epic.priority} Priority
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{epicData.epic.summary}</h1>
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <UserGroupIcon className="h-4 w-4 mr-1" />
                  Assignee: {epicData.epic.assignee.displayName}
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  Due: {new Date(epicData.epic.dueDate || '').toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <ChartBarIcon className="h-4 w-4 mr-1" />
                  {epicData.epic.storyPoints} story points
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Edit Epic
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Actions
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Description */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
                <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
                  {epicData.epic.description}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Completion</span>
                        <span className="font-medium">65%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Test Coverage</span>
                        <span className="font-medium">{epicData.testMetrics.coveragePercentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: `${epicData.testMetrics.coveragePercentage}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Labels & Components</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Labels</p>
                      <div className="flex flex-wrap gap-2">
                        {epicData.epic.labels.map((label) => (
                          <span key={label} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Components</p>
                      <div className="flex flex-wrap gap-2">
                        {epicData.epic.components.map((component) => (
                          <span key={component} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {component}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tickets' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Related Tickets</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {epicData.tickets.map((ticket) => (
                  <div key={ticket.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <span className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                            {ticket.key}
                          </span>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(ticket.status)}`}>
                            {ticket.status}
                          </span>
                          <span className={`text-xs ${getPriorityIcon(ticket.priority)}`}>
                            {ticket.priority}
                          </span>
                          {ticket.issueType === 'Bug' && (
                            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-700">
                              Bug
                            </span>
                          )}
                        </div>
                        <p className="text-gray-900 mb-1">{ticket.summary}</p>
                        {ticket.description && (
                          <p className="text-sm text-gray-600 line-clamp-2">{ticket.description}</p>
                        )}
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          {ticket.assignee && (
                            <span>Assignee: {ticket.assignee.displayName}</span>
                          )}
                          {ticket.timeEstimate && (
                            <span>Estimate: {ticket.timeEstimate}h</span>
                          )}
                          {ticket.timeSpent !== undefined && (
                            <span>Logged: {ticket.timeSpent}h</span>
                          )}
                        </div>
                      </div>
                      <ArrowRightIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {epicData.documents.map((doc) => (
                <div key={doc.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <DocumentTextIcon className="h-8 w-8 text-blue-600" />
                    <span className="text-xs text-gray-500">v{doc.version}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{doc.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{doc.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      <p>Modified {new Date(doc.lastModified).toLocaleDateString()}</p>
                      <p>by {doc.lastModifiedBy.displayName}</p>
                    </div>
                    <button className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                      View in Confluence
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'meetings' && (
            <div className="space-y-4">
              {epicData.meetings.map((meeting) => (
                <div key={meeting.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <VideoCameraIcon className="h-5 w-5 text-gray-400" />
                        <h3 className="font-semibold text-gray-900">{meeting.topic}</h3>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          meeting.status === 'completed' ? 'bg-green-100 text-green-700' :
                          meeting.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {meeting.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          {new Date(meeting.startTime).toLocaleString()}
                        </span>
                        <span className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          {meeting.duration} min
                        </span>
                        <span className="flex items-center">
                          <UserGroupIcon className="h-4 w-4 mr-1" />
                          {meeting.participants} participants
                        </span>
                      </div>
                      {meeting.agenda && (
                        <p className="text-sm text-gray-600 mb-3">{meeting.agenda}</p>
                      )}
                      <div className="flex space-x-2">
                        {meeting.recordingUrl && (
                          <button className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex items-center">
                            <PlayIcon className="h-4 w-4 mr-1" />
                            Watch Recording
                          </button>
                        )}
                        {meeting.transcriptUrl && (
                          <button
                            onClick={() => setSelectedMeeting(meeting.id)}
                            className="px-3 py-1 text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors flex items-center"
                          >
                            <DocumentDuplicateIcon className="h-4 w-4 mr-1" />
                            View Transcript
                          </button>
                        )}
                        {meeting.joinUrl && (
                          <button className="px-3 py-1 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors flex items-center">
                            <ArrowsPointingOutIcon className="h-4 w-4 mr-1" />
                            Join Meeting
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Transcript Display */}
                  {selectedMeeting === meeting.id && transcript && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-3">Meeting Transcript</h4>
                      <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                        <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">{transcript.content}</pre>
                      </div>
                      {transcript.actionItems && transcript.actionItems.length > 0 && (
                        <div className="mt-4">
                          <h5 className="font-medium text-gray-900 mb-2">Action Items</h5>
                          <ul className="space-y-1">
                            {transcript.actionItems.map((item, index) => (
                              <li key={index} className="flex items-start text-sm text-gray-700">
                                <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'testing' && (
            <div className="space-y-6">
              {/* Test Execution Summary */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Test Execution Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-900">{epicData.testMetrics.totalTests}</p>
                    <p className="text-sm text-gray-600">Total Tests</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">{epicData.testMetrics.passed}</p>
                    <p className="text-sm text-gray-600">Passed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-red-600">{epicData.testMetrics.failed}</p>
                    <p className="text-sm text-gray-600">Failed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">{epicData.testMetrics.successRate}%</p>
                    <p className="text-sm text-gray-600">Success Rate</p>
                  </div>
                </div>
              </div>

              {/* Test Suites */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Test Suites</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {epicData.testMetrics.testSuites.map((suite) => (
                    <div key={suite.name} className="px-6 py-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{suite.name}</h4>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-green-600">{suite.passed} passed</span>
                          <span className="text-red-600">{suite.failed} failed</span>
                          <span className="text-gray-500">{suite.duration}s</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${(suite.passed / suite.totalTests) * 100}%` }}
                        ></div>
                      </div>
                      {suite.failures.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {suite.failures.map((failure, index) => (
                            <div key={index} className="flex items-start text-sm">
                              <ExclamationTriangleIcon className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="font-medium text-gray-900">{failure.testName}</p>
                                <p className="text-gray-600">{failure.errorMessage}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Pipeline Status */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Latest Pipeline Run</h3>
                {epicData.pipelineStatus.map((pipeline) => (
                  <div key={pipeline.pipelineName}>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-medium text-gray-900">{pipeline.pipelineName} #{pipeline.buildNumber}</p>
                        <p className="text-sm text-gray-600">
                          Branch: {pipeline.branch} • Triggered by {pipeline.triggeredBy}
                        </p>
                      </div>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        pipeline.status === 'success' ? 'bg-green-100 text-green-700' :
                        pipeline.status === 'failed' ? 'bg-red-100 text-red-700' :
                        pipeline.status === 'running' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {pipeline.status}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {pipeline.stages.map((stage) => (
                        <div key={stage.name} className="flex items-center space-x-3">
                          {stage.status === 'success' ? (
                            <CheckCircleSolid className="h-5 w-5 text-green-500" />
                          ) : stage.status === 'failed' ? (
                            <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                          ) : stage.status === 'running' ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent"></div>
                          ) : (
                            <div className="h-5 w-5 rounded-full border-2 border-gray-300"></div>
                          )}
                          <span className="text-sm text-gray-700">{stage.name}</span>
                          {stage.duration > 0 && (
                            <span className="text-xs text-gray-500">({stage.duration}s)</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'insights' && (
            <div className="space-y-4">
              {epicData.aiInsights.map((insight) => (
                <div key={insight.id} className={`bg-white rounded-lg shadow-sm border p-6 ${
                  insight.type === 'risk' ? 'border-red-200' :
                  insight.type === 'suggestion' ? 'border-blue-200' :
                  insight.type === 'action' ? 'border-orange-200' :
                  'border-gray-200'
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {insight.type === 'risk' && <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />}
                      {insight.type === 'suggestion' && <SparklesIcon className="h-5 w-5 text-blue-500" />}
                      {insight.type === 'action' && <ExclamationTriangleIcon className="h-5 w-5 text-orange-500" />}
                      {insight.type === 'summary' && <DocumentTextIcon className="h-5 w-5 text-gray-500" />}
                      <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">Confidence: {Math.round(insight.confidence * 100)}%</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{new Date(insight.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{insight.content}</p>
                  {insight.actionable && insight.actions && (
                    <div className="flex space-x-2">
                      {insight.actions.map((action, index) => (
                        <button
                          key={index}
                          className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}