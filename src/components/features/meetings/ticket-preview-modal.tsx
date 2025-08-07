import { useState } from 'react';
import type { JiraTicket } from '@/types/api';
import {
  XMarkIcon,
  TicketIcon,
  CheckCircleIcon,
  PencilIcon,
  UserIcon
} from '@heroicons/react/24/outline';

interface TicketPreviewModalProps {
  tickets: Partial<JiraTicket>[];
  onConfirm: (tickets: Partial<JiraTicket>[]) => void;
  onCancel: () => void;
}

export function TicketPreviewModal({ tickets: initialTickets, onConfirm, onCancel }: TicketPreviewModalProps) {
  const [tickets, setTickets] = useState(initialTickets);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleTicketChange = (index: number, field: keyof JiraTicket, value: string | { displayName: string; emailAddress: string }) => {
    const updated = [...tickets];
    updated[index] = { ...updated[index], [field]: value };
    setTickets(updated);
  };

  const handleRemoveTicket = (index: number) => {
    setTickets(tickets.filter((_, i) => i !== index));
  };

  const handleConfirm = () => {
    onConfirm(tickets);
  };

  const getPriorityColor = (priority?: string) => {
    const colors: Record<string, string> = {
      'Critical': 'bg-red-100 text-red-700',
      'High': 'bg-orange-100 text-orange-700',
      'Medium': 'bg-yellow-100 text-yellow-700',
      'Low': 'bg-green-100 text-green-700'
    };
    return colors[priority || 'Medium'] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <TicketIcon className="h-6 w-6 text-blue-600 mr-3" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Review Tickets Before Creation</h2>
                <p className="text-sm text-gray-600 mt-0.5">
                  {tickets.length} ticket{tickets.length !== 1 ? 's' : ''} will be created in Jira
                </p>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-white hover:bg-opacity-50 rounded-lg transition-colors"
            >
              <XMarkIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Tickets List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {tickets.length === 0 ? (
            <div className="text-center py-12">
              <TicketIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No tickets to create</p>
            </div>
          ) : (
            <div className="space-y-4">
              {tickets.map((ticket, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                >
                  {editingIndex === index ? (
                    // Edit Mode
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={ticket.summary || ''}
                          onChange={(e) => handleTicketChange(index, 'summary', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          value={ticket.description || ''}
                          onChange={(e) => handleTicketChange(index, 'description', e.target.value)}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Priority
                          </label>
                          <select
                            value={ticket.priority || 'Medium'}
                            onChange={(e) => handleTicketChange(index, 'priority', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Critical">Critical</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Type
                          </label>
                          <select
                            value={ticket.issueType || 'Task'}
                            onChange={(e) => handleTicketChange(index, 'issueType', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="Task">Task</option>
                            <option value="Story">Story</option>
                            <option value="Bug">Bug</option>
                            <option value="Sub-task">Sub-task</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Assignee
                          </label>
                          <input
                            type="text"
                            value={ticket.assignee?.displayName || ''}
                            onChange={(e) => handleTicketChange(index, 'assignee', {
                              displayName: e.target.value,
                              emailAddress: `${e.target.value.toLowerCase().replace(' ', '.')}@genesys.com`
                            })}
                            placeholder="Unassigned"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setEditingIndex(null)}
                          className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium text-blue-600">
                              {ticket.key || 'NEW'}
                            </span>
                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getPriorityColor(ticket.priority)}`}>
                              {ticket.priority || 'Medium'}
                            </span>
                            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                              {ticket.issueType || 'Task'}
                            </span>
                          </div>
                          <h4 className="font-medium text-gray-900 mb-1">{ticket.summary}</h4>
                          <p className="text-sm text-gray-600 whitespace-pre-wrap">
                            {ticket.description}
                          </p>
                          {ticket.assignee && (
                            <div className="flex items-center mt-2 text-xs text-gray-500">
                              <UserIcon className="h-3 w-3 mr-1" />
                              {ticket.assignee.displayName}
                            </div>
                          )}
                        </div>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => setEditingIndex(index)}
                            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleRemoveTicket(index)}
                            className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <CheckCircleIcon className="h-5 w-5 text-green-500 inline mr-1" />
              Tickets will be created in the current project workspace
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={tickets.length === 0}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                  tickets.length > 0
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <CheckCircleIcon className="h-5 w-5 mr-2" />
                Create {tickets.length} Ticket{tickets.length !== 1 ? 's' : ''}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}