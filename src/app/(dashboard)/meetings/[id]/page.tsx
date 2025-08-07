'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MainLayout } from '@/components/layout/main-layout';
import { getMeetingDetails } from '@/services/mock-data';
import { ActionItemEditor } from '@/components/features/meetings/action-item-editor';
import { TicketPreviewModal } from '@/components/features/meetings/ticket-preview-modal';
import type { MeetingDetails, ExtractedActionItem, JiraTicket } from '@/types/api';
import {
  VideoCameraIcon,
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  DocumentTextIcon,
  SparklesIcon,
  LinkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PencilIcon,
  TicketIcon,
  ArrowLeftIcon,
  PlayIcon,
  LightBulbIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  FolderIcon
} from '@heroicons/react/24/outline';
import { SparklesIcon as SparklesSolid } from '@heroicons/react/24/solid';

export default function MeetingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [meeting, setMeeting] = useState<MeetingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'summary' | 'transcript' | 'actions' | 'insights'>('summary');
  const [editingActions, setEditingActions] = useState(false);
  const [selectedActions, setSelectedActions] = useState<ExtractedActionItem[]>([]);
  const [showTicketPreview, setShowTicketPreview] = useState(false);
  const [ticketsToCreate, setTicketsToCreate] = useState<Partial<JiraTicket>[]>([]);

  useEffect(() => {
    loadMeetingDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const loadMeetingDetails = async () => {
    setLoading(true);
    try {
      const data = await getMeetingDetails(params.id as string);
      setMeeting(data);
    } catch (error) {
      console.error('Failed to load meeting details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleActionItemsUpdate = (items: ExtractedActionItem[]) => {
    if (meeting) {
      setMeeting({ ...meeting, extractedActionItems: items });
    }
    setEditingActions(false);
  };

  const handleCreateTickets = () => {
    const tickets = selectedActions.map(action => ({
      key: `PURE-${Math.floor(Math.random() * 9000) + 1000}`,
      summary: action.title,
      description: `${action.description}\n\nSource: Meeting "${meeting?.topic}" on ${new Date(meeting?.startTime || '').toLocaleDateString()}\nAssignee suggested: ${action.assignee}`,
      status: 'To Do' as const,
      priority: action.priority,
      issueType: 'Task' as const,
      assignee: {
        displayName: action.assignee,
        emailAddress: `${action.assignee.toLowerCase().replace(' ', '.')}@genesys.com`
      }
    }));
    setTicketsToCreate(tickets);
    setShowTicketPreview(true);
  };

  const handleConfirmTicketCreation = (tickets: Partial<JiraTicket>[]) => {
    // In real app, this would create tickets via API
    console.log('Creating tickets:', tickets);
    setShowTicketPreview(false);
    setSelectedActions([]);
    // Show success message
  };

  if (loading || !meeting) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </MainLayout>
    );
  }

  const tabs = [
    { id: 'summary', label: 'Summary', icon: DocumentTextIcon },
    { id: 'transcript', label: 'Transcript', icon: ChatBubbleLeftRightIcon },
    { id: 'actions', label: 'Action Items', icon: TicketIcon, count: meeting.extractedActionItems?.length },
    { id: 'insights', label: 'AI Insights', icon: SparklesIcon }
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.push('/meetings')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Meetings
          </button>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <VideoCameraIcon className="h-6 w-6 text-gray-400" />
                  <h1 className="text-2xl font-bold text-gray-900">{meeting.topic}</h1>
                  {meeting.aiAnalyzed && (
                    <span className="px-3 py-1 text-sm font-medium rounded-full bg-purple-100 text-purple-700 flex items-center">
                      <SparklesSolid className="h-4 w-4 mr-1" />
                      AI Analyzed
                    </span>
                  )}
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    {new Date(meeting.startTime).toLocaleString()}
                  </span>
                  <span className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {meeting.duration} minutes
                  </span>
                  <span className="flex items-center">
                    <UserGroupIcon className="h-4 w-4 mr-1" />
                    {meeting.participants} participants
                  </span>
                  <span className="flex items-center">
                    <UserIcon className="h-4 w-4 mr-1" />
                    Host: {meeting.hostEmail}
                  </span>
                </div>

                {meeting.linkedEpics && meeting.linkedEpics.length > 0 && (
                  <div className="mt-3 flex items-center space-x-2">
                    <FolderIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Linked Epics:</span>
                    <div className="flex gap-2">
                      {meeting.linkedEpics.map(epic => (
                        <button
                          key={epic}
                          onClick={() => router.push(`/epics/${epic}`)}
                          className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full hover:bg-blue-100 transition-colors"
                        >
                          {epic}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2">
                {meeting.recordingUrl && (
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                    <PlayIcon className="h-5 w-5 mr-2" />
                    Watch Recording
                  </button>
                )}
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                  <LinkIcon className="h-5 w-5 mr-2" />
                  Link to Epic
                </button>
              </div>
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
                  onClick={() => setActiveTab(tab.id as 'summary' | 'transcript' | 'actions' | 'insights')}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {tab.label}
                  {tab.count && (
                    <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'summary' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* AI Summary */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                      <SparklesSolid className="h-5 w-5 text-purple-500 mr-2" />
                      AI-Generated Summary
                    </h2>
                    <span className="text-xs text-gray-500">
                      Confidence: {meeting.aiSummary?.confidence ? `${Math.round(meeting.aiSummary.confidence * 100)}%` : 'N/A'}
                    </span>
                  </div>
                  <div className="prose prose-sm max-w-none text-gray-700">
                    {meeting.aiSummary?.summary || meeting.agenda}
                  </div>
                </div>

                {/* Key Decisions */}
                {meeting.aiSummary?.keyDecisions && meeting.aiSummary.keyDecisions.length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                      Key Decisions
                    </h2>
                    <ul className="space-y-2">
                      {meeting.aiSummary.keyDecisions.map((decision, index) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-block w-6 h-6 bg-green-100 text-green-700 text-xs font-medium rounded-full text-center leading-6 mr-3 flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-gray-700">{decision}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Discussion Topics */}
                {meeting.aiSummary?.topics && meeting.aiSummary.topics.length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <ChatBubbleLeftRightIcon className="h-5 w-5 text-blue-500 mr-2" />
                      Discussion Topics
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {meeting.aiSummary.topics.map((topic, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Participants */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Participants</h3>
                  <div className="space-y-3">
                    {meeting.participantsList?.map((participant, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                            <UserIcon className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{participant.name}</p>
                            <p className="text-xs text-gray-500">{participant.email}</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">{participant.duration}m</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Action Items</span>
                      <span className="text-sm font-medium text-gray-900">
                        {meeting.extractedActionItems?.length || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Key Decisions</span>
                      <span className="text-sm font-medium text-gray-900">
                        {meeting.aiSummary?.keyDecisions?.length || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Topics Discussed</span>
                      <span className="text-sm font-medium text-gray-900">
                        {meeting.aiSummary?.topics?.length || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Linked Tickets</span>
                      <span className="text-sm font-medium text-gray-900">
                        {meeting.createdTickets?.length || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transcript' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Meeting Transcript</h2>
                <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <PencilIcon className="h-4 w-4 inline mr-1" />
                  Edit
                </button>
              </div>
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-gray-700 bg-gray-50 p-4 rounded-lg">
                  {meeting.transcript || 'No transcript available'}
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'actions' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <ExclamationTriangleIcon className="h-5 w-5 text-orange-500 mr-2" />
                    Extracted Action Items
                  </h2>
                  <div className="flex space-x-2">
                    {!editingActions ? (
                      <>
                        <button
                          onClick={() => setEditingActions(true)}
                          className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <PencilIcon className="h-4 w-4 inline mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={handleCreateTickets}
                          disabled={selectedActions.length === 0}
                          className={`px-3 py-1 text-sm rounded-lg transition-colors flex items-center ${
                            selectedActions.length > 0
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          <TicketIcon className="h-4 w-4 mr-1" />
                          Create {selectedActions.length} Ticket{selectedActions.length !== 1 ? 's' : ''}
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setEditingActions(false)}
                        className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>

                {editingActions ? (
                  <ActionItemEditor
                    items={meeting.extractedActionItems || []}
                    onSave={handleActionItemsUpdate}
                    onCancel={() => setEditingActions(false)}
                  />
                ) : (
                  <div className="space-y-3">
                    {meeting.extractedActionItems && meeting.extractedActionItems.length > 0 ? (
                      meeting.extractedActionItems.map((item) => (
                        <div
                          key={item.id}
                          className={`p-4 rounded-lg border transition-all ${
                            selectedActions.find(a => a.id === item.id)
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-start">
                            <input
                              type="checkbox"
                              checked={!!selectedActions.find(a => a.id === item.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedActions([...selectedActions, item]);
                                } else {
                                  setSelectedActions(selectedActions.filter(a => a.id !== item.id));
                                }
                              }}
                              className="mt-1 mr-3 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-medium text-gray-900">{item.title}</h4>
                                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                                  item.priority === 'High' ? 'bg-red-100 text-red-700' :
                                  item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-green-100 text-green-700'
                                }`}>
                                  {item.priority}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                              <div className="flex items-center space-x-4 text-xs text-gray-500">
                                <span className="flex items-center">
                                  <UserIcon className="h-3 w-3 mr-1" />
                                  {item.assignee}
                                </span>
                                {item.dueDate && (
                                  <span className="flex items-center">
                                    <CalendarIcon className="h-3 w-3 mr-1" />
                                    {new Date(item.dueDate).toLocaleDateString()}
                                  </span>
                                )}
                                <span className="text-gray-400">
                                  Confidence: {Math.round(item.confidence * 100)}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 py-8">
                        No action items extracted from this meeting
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Created Tickets */}
              {meeting.createdTickets && meeting.createdTickets.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Created Tickets</h3>
                  <div className="space-y-2">
                    {meeting.createdTickets.map((ticketKey) => (
                      <button
                        key={ticketKey}
                        className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between"
                      >
                        <span className="text-sm font-medium text-blue-600">{ticketKey}</span>
                        <ArrowLeftIcon className="h-4 w-4 text-gray-400 rotate-180" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'insights' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sentiment Analysis */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <LightBulbIcon className="h-5 w-5 text-yellow-500 mr-2" />
                  Meeting Sentiment
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Overall Sentiment</span>
                      <span className="font-medium text-green-600">Positive</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <p className="text-sm text-gray-700">
                      The meeting had a productive tone with constructive discussions. 
                      Participants were engaged and collaborative in problem-solving.
                    </p>
                  </div>
                </div>
              </div>

              {/* Risks & Concerns */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-500 mr-2" />
                  Identified Risks
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    <span className="text-sm text-gray-700">
                      Timeline concerns raised about profile upload feature - may need additional sprint
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    <span className="text-sm text-gray-700">
                      Dependency on third-party API not yet resolved
                    </span>
                  </li>
                </ul>
              </div>

              {/* Follow-up Recommendations */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <SparklesSolid className="h-5 w-5 text-purple-500 mr-2" />
                  AI Recommendations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-purple-900 mb-2">Schedule Follow-up</h4>
                    <p className="text-sm text-purple-700">
                      Consider scheduling a technical deep-dive session to address the API dependency concerns raised.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Documentation Update</h4>
                    <p className="text-sm text-blue-700">
                      Update the technical specification document with the decisions made about validation rules.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2">Resource Allocation</h4>
                    <p className="text-sm text-green-700">
                      Consider adding one more QA resource to meet the aggressive timeline discussed.
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-medium text-orange-900 mb-2">Risk Mitigation</h4>
                    <p className="text-sm text-orange-700">
                      Create a contingency plan for the third-party API integration before the next sprint.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Ticket Preview Modal */}
      {showTicketPreview && (
        <TicketPreviewModal
          tickets={ticketsToCreate}
          onConfirm={handleConfirmTicketCreation}
          onCancel={() => {
            setShowTicketPreview(false);
            setTicketsToCreate([]);
          }}
        />
      )}
    </MainLayout>
  );
}