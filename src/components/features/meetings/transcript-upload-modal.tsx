import { useState } from 'react';
import type { ZoomMeeting } from '@/types/api';
import {
  XMarkIcon,
  DocumentTextIcon,
  ArrowUpTrayIcon,
  ClipboardDocumentIcon
} from '@heroicons/react/24/outline';

interface TranscriptUploadModalProps {
  meeting: ZoomMeeting | null;
  onClose: () => void;
  onUpload: (meetingId: string, transcript: string) => void;
}

export function TranscriptUploadModal({ meeting, onClose, onUpload }: TranscriptUploadModalProps) {
  const [transcript, setTranscript] = useState('');
  const [uploadMethod, setUploadMethod] = useState<'paste' | 'file'>('paste');
  const [fileName, setFileName] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setTranscript(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = () => {
    if (transcript.trim()) {
      const meetingId = meeting?.id || `meeting-${Date.now()}`;
      onUpload(meetingId, transcript);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Upload Meeting Transcript</h2>
              {meeting && (
                <p className="text-sm text-gray-600 mt-1">For: {meeting.topic}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XMarkIcon className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Upload Method Tabs */}
        <div className="px-6 pt-4">
          <div className="flex space-x-4 border-b border-gray-200">
            <button
              onClick={() => setUploadMethod('paste')}
              className={`pb-3 px-1 font-medium text-sm transition-colors ${
                uploadMethod === 'paste'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <ClipboardDocumentIcon className="h-5 w-5 inline mr-2" />
              Paste Transcript
            </button>
            <button
              onClick={() => setUploadMethod('file')}
              className={`pb-3 px-1 font-medium text-sm transition-colors ${
                uploadMethod === 'file'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <ArrowUpTrayIcon className="h-5 w-5 inline mr-2" />
              Upload File
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {uploadMethod === 'paste' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Paste your meeting transcript below
              </label>
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="[00:00] Speaker Name: Meeting content...
[00:30] Another Speaker: Response...
                
Or paste any format of transcript text here..."
                className="w-full h-96 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-2">
                Tip: Include timestamps and speaker names for better AI analysis
              </p>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Upload a transcript file
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <div className="mb-4">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-block">
                      Choose File
                    </span>
                    <input
                      id="file-upload"
                      type="file"
                      accept=".txt,.doc,.docx,.pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                {fileName ? (
                  <p className="text-sm text-gray-600">Selected: {fileName}</p>
                ) : (
                  <p className="text-sm text-gray-500">
                    Supported formats: TXT, DOC, DOCX, PDF
                  </p>
                )}
              </div>
              {transcript && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preview
                  </label>
                  <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                    <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">
                      {transcript.substring(0, 1000)}
                      {transcript.length > 1000 && '...'}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              {transcript ? `${transcript.length} characters` : 'No transcript added'}
            </p>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!transcript.trim()}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  transcript.trim()
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Upload & Analyze
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}