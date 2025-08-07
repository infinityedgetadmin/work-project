// API Types for QA Dashboard - Easily replaceable with real API responses

// Jira Types
export interface JiraEpic {
  id: string;
  key: string;
  summary: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'In Review' | 'Done' | 'Blocked';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  assignee: {
    displayName: string;
    emailAddress: string;
    avatarUrl: string;
  };
  reporter: {
    displayName: string;
    emailAddress: string;
    avatarUrl: string;
  };
  createdAt: string;
  updatedAt: string;
  dueDate?: string;
  labels: string[];
  components: string[];
  storyPoints?: number;
  issueType: 'Epic' | 'Story' | 'Task' | 'Bug';
  linkedIssues: JiraTicket[];
  customFields?: Record<string, unknown>;
}

export interface JiraTicket {
  id: string;
  key: string;
  summary: string;
  description?: string;
  status: 'To Do' | 'In Progress' | 'In Review' | 'Done' | 'Blocked';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  issueType: 'Story' | 'Task' | 'Bug' | 'Sub-task';
  parentKey?: string;
  assignee?: {
    displayName: string;
    emailAddress: string;
  };
  createdAt: string;
  updatedAt: string;
  resolution?: string;
  timeEstimate?: number;
  timeSpent?: number;
}

// Confluence Types
export interface ConfluenceDocument {
  id: string;
  title: string;
  spaceKey: string;
  spaceName: string;
  content: string;
  excerpt: string;
  version: number;
  createdBy: {
    displayName: string;
    emailAddress: string;
  };
  createdAt: string;
  lastModified: string;
  lastModifiedBy: {
    displayName: string;
    emailAddress: string;
  };
  url: string;
  attachments?: ConfluenceAttachment[];
  labels: string[];
}

export interface ConfluenceAttachment {
  id: string;
  title: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  downloadUrl: string;
}

// Zoom Types
export interface ZoomMeeting {
  id: string;
  topic: string;
  startTime: string;
  duration: number; // in minutes
  status: 'scheduled' | 'started' | 'completed' | 'cancelled';
  hostEmail: string;
  participants: number;
  recordingUrl?: string;
  transcriptUrl?: string;
  joinUrl?: string;
  agenda?: string;
  meetingType: 'scheduled' | 'instant' | 'recurring';
  linkedEpics?: string[];
  actionItems?: string[];
  aiAnalyzed?: boolean;
  createdTickets?: string[];
}

export interface MeetingTranscript {
  meetingId: string;
  content: string;
  speakers: Array<{
    name: string;
    email: string;
    duration: number;
  }>;
  keywords: string[];
  summary?: string;
  actionItems?: string[];
}

// New Relic Types
export interface NewRelicMetrics {
  timestamp: string;
  testExecution: TestExecutionMetrics;
  pipeline: PipelineMetrics;
  performance: PerformanceMetrics;
  quality: QualityMetrics;
}

export interface TestExecutionMetrics {
  totalTests: number;
  passed: number;
  failed: number;
  skipped: number;
  duration: number; // in seconds
  successRate: number; // percentage
  coveragePercentage: number;
  automationCoverage: number;
  testSuites: TestSuite[];
}

export interface TestSuite {
  name: string;
  totalTests: number;
  passed: number;
  failed: number;
  duration: number;
  failures: TestFailure[];
}

export interface TestFailure {
  testName: string;
  suiteName: string;
  errorMessage: string;
  stackTrace?: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface PipelineMetrics {
  pipelineName: string;
  buildNumber: number;
  status: 'success' | 'failed' | 'running' | 'queued';
  startTime: string;
  endTime?: string;
  duration?: number;
  stages: PipelineStage[];
  triggeredBy: string;
  branch: string;
  commitHash: string;
}

export interface PipelineStage {
  name: string;
  status: 'success' | 'failed' | 'running' | 'skipped';
  duration: number;
  startTime: string;
  endTime?: string;
  logs?: string;
}

export interface PerformanceMetrics {
  responseTime: {
    avg: number;
    median: number;
    p90: number;
    p95: number;
    p99: number;
  };
  throughput: number; // requests per second
  errorRate: number; // percentage
  apdex: number; // Application Performance Index
  transactions: TransactionMetric[];
}

export interface TransactionMetric {
  name: string;
  avgDuration: number;
  callCount: number;
  errorRate: number;
  throughput: number;
}

export interface QualityMetrics {
  defectDensity: number;
  defectDiscoveryRate: number;
  escapedDefects: number;
  mttr: number; // Mean Time To Repair in hours
  mttd: number; // Mean Time To Detect in hours
  testEfficiency: number; // Test cases executed vs defects found
  releaseReadiness: number; // percentage
}

// CI/CD Build Data (from New Relic's Jenkins integration)
export interface BuildData {
  id: string;
  number: number;
  displayName: string;
  result: 'SUCCESS' | 'FAILURE' | 'UNSTABLE' | 'ABORTED' | 'NOT_BUILT';
  timestamp: string;
  duration: number;
  building: boolean;
  url: string;
  branch: string;
  commitHash: string;
  testResults?: {
    total: number;
    passed: number;
    failed: number;
    skipped: number;
  };
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
  status: 'success' | 'error';
  message?: string;
}

// Dashboard Aggregated Types
export interface EpicDashboardData {
  epic: JiraEpic;
  tickets: JiraTicket[];
  documents: ConfluenceDocument[];
  meetings: ZoomMeeting[];
  testMetrics: TestExecutionMetrics;
  pipelineStatus: PipelineMetrics[];
  aiInsights: AIInsight[];
}

export interface AIInsight {
  id: string;
  type: 'risk' | 'suggestion' | 'summary' | 'action';
  title: string;
  content: string;
  confidence: number;
  source: string;
  timestamp: string;
  actionable: boolean;
  actions?: Array<{
    label: string;
    action: string;
  }>;
}

// Test Execution History
export interface TestExecutionHistory {
  date: string;
  totalRuns: number;
  passRate: number;
  failRate: number;
  avgDuration: number;
  trends: {
    daily: TestExecutionTrend[];
    weekly: TestExecutionTrend[];
    monthly: TestExecutionTrend[];
  };
}

export interface TestExecutionTrend {
  date: string;
  passed: number;
  failed: number;
  skipped: number;
  duration: number;
}

// Extended Meeting Types
export interface ExtractedActionItem {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  dueDate?: string;
  confidence: number;
  source: 'ai' | 'manual';
}

export interface MeetingDetails extends ZoomMeeting {
  transcript?: string;
  participantsList?: Array<{
    name: string;
    email: string;
    duration: number;
  }>;
  extractedActionItems?: ExtractedActionItem[];
  aiSummary?: {
    summary: string;
    keyDecisions?: string[];
    topics?: string[];
    confidence: number;
  };
}

// Release Types
export interface Release {
  id: string;
  version: string;
  name: string;
  status: 'planning' | 'development' | 'testing' | 'staged' | 'released';
  releaseDate?: string;
  features: string[];
  bugs: string[];
  testCoverage: number;
  riskLevel: 'low' | 'medium' | 'high';
  goLiveChecklist: ChecklistItem[];
}

export interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
  assignee?: string;
  dueDate?: string;
  category: 'testing' | 'deployment' | 'documentation' | 'approval';
}