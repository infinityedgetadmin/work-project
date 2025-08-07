'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MainLayout } from '@/components/layout/main-layout';
import { getAllEpics } from '@/services/mock-data';
import type { JiraEpic } from '@/types/api';
import {
  FolderIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronRightIcon,
  CalendarIcon,
  UserGroupIcon,
  ChartBarIcon,
  ClockIcon,
  PlusIcon,
  ArrowsUpDownIcon
} from '@heroicons/react/24/outline';

export default function EpicsListPage() {
  const router = useRouter();
  const [epics, setEpics] = useState<JiraEpic[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'updated' | 'created' | 'dueDate' | 'priority'>('updated');

  useEffect(() => {
    loadEpics();
  }, []);

  const loadEpics = async () => {
    setLoading(true);
    try {
      const data = await getAllEpics();
      setEpics(data);
    } catch (error) {
      console.error('Failed to load epics:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      'Critical': 'bg-red-100 text-red-700 border-red-300',
      'High': 'bg-orange-100 text-orange-700 border-orange-300',
      'Medium': 'bg-yellow-100 text-yellow-700 border-yellow-300',
      'Low': 'bg-green-100 text-green-700 border-green-300'
    };
    return colors[priority] || 'bg-gray-100 text-gray-700 border-gray-300';
  };

  // Filter and sort epics
  const filteredEpics = epics
    .filter(epic => {
      const matchesSearch = epic.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           epic.key.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || epic.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || epic.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'updated':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        case 'created':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'dueDate':
          return new Date(a.dueDate || '9999-12-31').getTime() - new Date(b.dueDate || '9999-12-31').getTime();
        case 'priority':
          const priorityOrder = { 'Critical': 0, 'High': 1, 'Medium': 2, 'Low': 3 };
          return (priorityOrder[a.priority as keyof typeof priorityOrder] || 99) - 
                 (priorityOrder[b.priority as keyof typeof priorityOrder] || 99);
        default:
          return 0;
      }
    });

  const stats = {
    total: epics.length,
    inProgress: epics.filter(e => e.status === 'In Progress').length,
    done: epics.filter(e => e.status === 'Done').length,
    blocked: epics.filter(e => e.status === 'Blocked').length
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
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FF451A] to-orange-600 bg-clip-text text-transparent">Epics</h1>
            <p className="text-gray-600 mt-1">Manage and track all project epics</p>
          </div>
          <button className="btn-primary flex items-center">
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Epic
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="glass-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Epics</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <FolderIcon className="h-8 w-8 text-gray-400" />
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
              </div>
              <ClockIcon className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{stats.done}</p>
              </div>
              <ChartBarIcon className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Blocked</p>
                <p className="text-2xl font-bold text-red-600">{stats.blocked}</p>
              </div>
              <FolderIcon className="h-8 w-8 text-red-400" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="glass p-4 rounded-lg mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search epics by key or title..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <FunnelIcon className="h-5 w-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="In Review">In Review</option>
                  <option value="Done">Done</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </div>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Priority</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              <div className="flex items-center space-x-2">
                <ArrowsUpDownIcon className="h-5 w-5 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'updated' | 'created' | 'dueDate' | 'priority')}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="updated">Last Updated</option>
                  <option value="created">Created Date</option>
                  <option value="dueDate">Due Date</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Epics List */}
        <div className="glass rounded-lg">
          {filteredEpics.length === 0 ? (
            <div className="text-center py-12">
              <FolderIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No epics found matching your criteria</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredEpics.map((epic) => (
                <div
                  key={epic.id}
                  onClick={() => router.push(`/epics/${epic.key}`)}
                  className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-sm font-medium text-blue-600 hover:text-blue-800">
                          {epic.key}
                        </span>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(epic.status)}`}>
                          {epic.status}
                        </span>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getPriorityColor(epic.priority)}`}>
                          {epic.priority} Priority
                        </span>
                        {epic.storyPoints && (
                          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                            {epic.storyPoints} points
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-medium text-gray-900 mb-1">
                        {epic.summary}
                      </h3>
                      
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {epic.description?.split('\n')[0]}
                      </p>

                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center">
                          <UserGroupIcon className="h-4 w-4 mr-1" />
                          {epic.assignee.displayName}
                        </div>
                        {epic.dueDate && (
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            Due {new Date(epic.dueDate).toLocaleDateString()}
                          </div>
                        )}
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          Updated {new Date(epic.updatedAt).toLocaleDateString()}
                        </div>
                        {epic.linkedIssues && epic.linkedIssues.length > 0 && (
                          <div className="flex items-center">
                            <ChartBarIcon className="h-4 w-4 mr-1" />
                            {epic.linkedIssues.length} linked issues
                          </div>
                        )}
                      </div>

                      {epic.labels.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {epic.labels.slice(0, 4).map((label) => (
                            <span key={label} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              {label}
                            </span>
                          ))}
                          {epic.labels.length > 4 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              +{epic.labels.length - 4} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <ChevronRightIcon className="h-5 w-5 text-gray-400 flex-shrink-0 ml-4" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}