import { useState } from 'react';
import type { ExtractedActionItem } from '@/types/api';
import {
  PlusIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface ActionItemEditorProps {
  items: ExtractedActionItem[];
  onSave: (items: ExtractedActionItem[]) => void;
  onCancel: () => void;
}

export function ActionItemEditor({ items, onSave, onCancel }: ActionItemEditorProps) {
  const [editedItems, setEditedItems] = useState<ExtractedActionItem[]>(items);

  const handleItemChange = (index: number, field: keyof ExtractedActionItem, value: string | Date) => {
    const updated = [...editedItems];
    updated[index] = { ...updated[index], [field]: value };
    setEditedItems(updated);
  };

  const handleAddItem = () => {
    const newItem: ExtractedActionItem = {
      id: `action-${Date.now()}`,
      title: '',
      description: '',
      assignee: '',
      priority: 'Medium',
      confidence: 1.0,
      source: 'manual'
    };
    setEditedItems([...editedItems, newItem]);
  };

  const handleRemoveItem = (index: number) => {
    setEditedItems(editedItems.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    // Filter out empty items
    const validItems = editedItems.filter(item => item.title.trim());
    onSave(validItems);
  };

  return (
    <div className="space-y-4">
      {editedItems.map((item, index) => (
        <div key={item.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="flex-1">
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleItemChange(index, 'title', e.target.value)}
                  placeholder="Action item title..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                onClick={() => handleRemoveItem(index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>

            <textarea
              value={item.description}
              onChange={(e) => handleItemChange(index, 'description', e.target.value)}
              placeholder="Description..."
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Assignee
                </label>
                <input
                  type="text"
                  value={item.assignee}
                  onChange={(e) => handleItemChange(index, 'assignee', e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  value={item.priority}
                  onChange={(e) => handleItemChange(index, 'priority', e.target.value)}
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
                  Due Date
                </label>
                <input
                  type="date"
                  value={item.dueDate ? new Date(item.dueDate).toISOString().split('T')[0] : ''}
                  onChange={(e) => handleItemChange(index, 'dueDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {item.source === 'ai' && (
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>AI Extracted</span>
                <span>Confidence: {Math.round(item.confidence * 100)}%</span>
              </div>
            )}
          </div>
        </div>
      ))}

      <button
        onClick={handleAddItem}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center"
      >
        <PlusIcon className="h-5 w-5 mr-2" />
        Add Action Item
      </button>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
        >
          <XMarkIcon className="h-5 w-5 mr-2" />
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <CheckIcon className="h-5 w-5 mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  );
}