'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MainLayout } from '@/components/layout/main-layout';
import { getAllMeetings } from '@/services/mock-data';
import type { ZoomMeeting } from '@/types/api';
import { TranscriptUploadModal } from '@/components/features/meetings/transcript-upload-modal';
import {
  VideoCameraIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  DocumentTextIcon,
  SparklesIcon,
  PlusIcon,
  ArrowUpTrayIcon,
  LinkIcon,
  PlayIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

export default function MeetingsListPage() {
  const router = useRouter();
  const [meetings, setMeetings] = useState<ZoomMeeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState<'all' | 'today' | 'week' | 'month'>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<ZoomMeeting | null>(null);

  useEffect(() => {
    loadMeetings();
  }, []);

  const loadMeetings = async () => {
    setLoading(true);
    try {
      const data = await getAllMeetings();
      setMeetings(data);
    } catch (error) {
      console.error('Failed to load meetings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTranscriptUpload = (meetingId: string) => {
    // In real app, this would save to backend
    console.log('Transcript uploaded for meeting:', meetingId);
    setShowUploadModal(false);
    // Navigate to meeting detail for AI analysis
    router.push(`/meetings/${meetingId}`);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'scheduled': 'bg-blue-100 text-blue-700',
      'started': 'bg-yellow-100 text-yellow-700',
      'completed': 'bg-green-100 text-green-700',
      'cancelled': 'bg-gray-100 text-gray-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const filterMeetings = () => {
    return meetings.filter(meeting => {
      const matchesSearch = meeting.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           meeting.hostEmail.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || meeting.status === statusFilter;
      
      let matchesDate = true;
      if (dateRange !== 'all') {
        const meetingDate = new Date(meeting.startTime);
        const now = new Date();
        
        if (dateRange === 'today') {
          matchesDate = meetingDate.toDateString() === now.toDateString();
        } else if (dateRange === 'week') {
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesDate = meetingDate >= weekAgo;
        } else if (dateRange === 'month') {
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          matchesDate = meetingDate >= monthAgo;
        }
      }
      
      return matchesSearch && matchesStatus && matchesDate;
    });
  };

  const stats = {
    total: meetings.length,
    scheduled: meetings.filter(m => m.status === 'scheduled').length,
    completed: meetings.filter(m => m.status === 'completed').length,
    withTranscripts: meetings.filter(m => m.transcriptUrl || m.aiAnalyzed).length,
    withActionItems: meetings.filter(m => m.actionItems && m.actionItems.length > 0).length
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

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FF451A] to-orange-600 bg-clip-text text-transparent">Meetings</h1>
            <p className="text-gray-600 mt-1">Manage meeting recordings, transcripts, and AI insights</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-4 py-2 glass-button rounded-lg flex items-center hover:text-[#FF451A]"
            >
              <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
              Upload Transcript
            </button>
            <button className="btn-primary flex items-center">
              <PlusIcon className="h-5 w-5 mr-2" />
              Schedule Meeting
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="glass-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <VideoCameraIcon className="h-8 w-8 text-gray-400" />
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-blue-600">{stats.scheduled}</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <CheckCircleIcon className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Transcripts</p>
                <p className="text-2xl font-bold text-purple-600">{stats.withTranscripts}</p>
              </div>
              <DocumentTextIcon className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Actions</p>
                <p className="text-2xl font-bold text-orange-600">{stats.withActionItems}</p>
              </div>
              <ExclamationCircleIcon className="h-8 w-8 text-orange-400" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="glass p-4 rounded-lg mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search meetings..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center space-x-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="scheduled">Scheduled</option>
                <option value="started">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as 'all' | 'today' | 'week' | 'month')}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
        </div>

        {/* Meetings List */}
        <div className="glass rounded-lg">
          {filterMeetings().length === 0 ? (
            <div className="text-center py-12">
              <VideoCameraIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No meetings found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filterMeetings().map((meeting) => (
                <div
                  key={meeting.id}
                  className="px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{meeting.topic}</h3>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(meeting.status)}`}>
                          {meeting.status}
                        </span>
                        {meeting.aiAnalyzed && (
                          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-purple-100 text-purple-700 flex items-center">
                            <SparklesIcon className="h-3 w-3 mr-1" />
                            AI Analyzed
                          </span>
                        )}
                        {meeting.linkedEpics && meeting.linkedEpics.length > 0 && (
                          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700 flex items-center">
                            <LinkIcon className="h-3 w-3 mr-1" />
                            {meeting.linkedEpics.length} Epic{meeting.linkedEpics.length > 1 ? 's' : ''}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
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

                      {meeting.actionItems && meeting.actionItems.length > 0 && (
                        <div className="mb-3">
                          <p className="text-xs font-medium text-gray-700 mb-1">Action Items:</p>
                          <div className="flex flex-wrap gap-2">
                            {meeting.actionItems.slice(0, 3).map((item, index) => (
                              <span key={index} className="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded-full">
                                {item}
                              </span>
                            ))}
                            {meeting.actionItems.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                +{meeting.actionItems.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-2">
                        <button
                          onClick={() => router.push(`/meetings/${meeting.id}`)}
                          className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex items-center"
                        >
                          View Details
                          <ChevronRightIcon className="h-4 w-4 ml-1" />
                        </button>
                        {meeting.recordingUrl && (
                          <button className="px-3 py-1 text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors flex items-center">
                            <PlayIcon className="h-4 w-4 mr-1" />
                            Recording
                          </button>
                        )}
                        {meeting.transcriptUrl && (
                          <button className="px-3 py-1 text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors flex items-center">
                            <DocumentTextIcon className="h-4 w-4 mr-1" />
                            Transcript
                          </button>
                        )}
                        {!meeting.transcriptUrl && meeting.status === 'completed' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedMeeting(meeting);
                              setShowUploadModal(true);
                            }}
                            className="px-3 py-1 text-sm bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors flex items-center"
                          >
                            <ArrowUpTrayIcon className="h-4 w-4 mr-1" />
                            Add Transcript
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Upload Transcript Modal */}
      {showUploadModal && (
        <TranscriptUploadModal
          meeting={selectedMeeting}
          onClose={() => {
            setShowUploadModal(false);
            setSelectedMeeting(null);
          }}
          onUpload={handleTranscriptUpload}
        />
      )}
    </MainLayout>
  );
}