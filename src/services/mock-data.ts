import type {
  JiraEpic,
  JiraTicket,
  ConfluenceDocument,
  ZoomMeeting,
  MeetingTranscript,
  MeetingDetails,
  ExtractedActionItem,
  NewRelicMetrics,
  BuildData,
  AIInsight,
  TestExecutionHistory,
  Release,
  EpicDashboardData
} from '@/types/api';

// Mock data generators with realistic QA data

export const mockJiraEpic: JiraEpic = {
  id: 'epic-001',
  key: 'PURE-1234',
  summary: 'User Profile Enhancement - Phase 2',
  description: `## Overview
Implement comprehensive user profile management system with advanced features including profile customization, privacy settings, and social integration.

## Acceptance Criteria
- Users can upload and manage profile pictures
- Privacy settings are granular and easy to understand
- Social media accounts can be linked/unlinked
- Profile completion percentage is displayed
- Data validation on all input fields

## Technical Requirements
- RESTful API endpoints for profile CRUD operations
- Real-time validation using WebSocket
- Image optimization and CDN integration
- GDPR compliance for data management`,
  status: 'In Progress',
  priority: 'High',
  assignee: {
    displayName: 'Hudson Shimanyula',
    emailAddress: 'hudson.s@genesys.com',
    avatarUrl: 'https://ui-avatars.com/api/?name=Hudson+Shimanyula&background=3b82f6&color=fff'
  },
  reporter: {
    displayName: 'Anu Manager',
    emailAddress: 'anu.m@genesys.com',
    avatarUrl: 'https://ui-avatars.com/api/?name=Anu+Manager&background=10b981&color=fff'
  },
  createdAt: '2024-10-15T08:00:00Z',
  updatedAt: '2024-12-06T14:30:00Z',
  dueDate: '2025-01-15T23:59:59Z',
  labels: ['profile', 'phase-2', 'high-priority', 'gdpr'],
  components: ['User Management', 'API', 'Frontend'],
  storyPoints: 21,
  issueType: 'Epic',
  linkedIssues: []
};

export const mockJiraTickets: JiraTicket[] = [
  {
    id: 'ticket-001',
    key: 'PURE-1235',
    summary: 'Implement profile picture upload with validation',
    description: 'Add ability to upload, crop, and validate profile pictures. Max size 5MB, formats: JPG, PNG, WebP',
    status: 'In Review',
    priority: 'High',
    issueType: 'Story',
    parentKey: 'PURE-1234',
    assignee: {
      displayName: 'Michael QA',
      emailAddress: 'michael.qa@genesys.com'
    },
    createdAt: '2024-10-20T09:00:00Z',
    updatedAt: '2024-12-05T16:00:00Z',
    timeEstimate: 8,
    timeSpent: 6
  },
  {
    id: 'ticket-002',
    key: 'PURE-1236',
    summary: 'Add privacy settings management UI',
    description: 'Create comprehensive privacy settings interface with toggles for data sharing, visibility, and third-party access',
    status: 'In Progress',
    priority: 'High',
    issueType: 'Story',
    parentKey: 'PURE-1234',
    assignee: {
      displayName: 'Hudson Shimanyula',
      emailAddress: 'hudson.s@genesys.com'
    },
    createdAt: '2024-10-22T10:00:00Z',
    updatedAt: '2024-12-06T10:00:00Z',
    timeEstimate: 13,
    timeSpent: 5
  },
  {
    id: 'ticket-003',
    key: 'PURE-1237',
    summary: 'Fix validation error on email field',
    description: 'Email validation incorrectly rejects valid emails with + symbol',
    status: 'Done',
    priority: 'Medium',
    issueType: 'Bug',
    parentKey: 'PURE-1234',
    assignee: {
      displayName: 'Dev Team',
      emailAddress: 'dev.team@genesys.com'
    },
    createdAt: '2024-11-10T14:00:00Z',
    updatedAt: '2024-11-12T09:00:00Z',
    resolution: 'Fixed',
    timeEstimate: 2,
    timeSpent: 3
  },
  {
    id: 'ticket-004',
    key: 'PURE-1238',
    summary: 'Social media integration - OAuth implementation',
    description: 'Implement OAuth 2.0 for LinkedIn, Twitter, and GitHub profile linking',
    status: 'To Do',
    priority: 'Medium',
    issueType: 'Story',
    parentKey: 'PURE-1234',
    createdAt: '2024-11-15T11:00:00Z',
    updatedAt: '2024-11-15T11:00:00Z',
    timeEstimate: 8
  },
  {
    id: 'ticket-005',
    key: 'PURE-1239',
    summary: 'Profile completion percentage calculator',
    description: 'Show users their profile completion status with suggestions for missing fields',
    status: 'Blocked',
    priority: 'Low',
    issueType: 'Task',
    parentKey: 'PURE-1234',
    assignee: {
      displayName: 'Hudson Shimanyula',
      emailAddress: 'hudson.s@genesys.com'
    },
    createdAt: '2024-11-20T13:00:00Z',
    updatedAt: '2024-12-01T15:00:00Z',
    timeEstimate: 5,
    timeSpent: 2
  }
];

export const mockConfluenceDocuments: ConfluenceDocument[] = [
  {
    id: 'doc-001',
    title: 'User Profile Enhancement - Technical Specification',
    spaceKey: 'TECH',
    spaceName: 'Technical Documentation',
    content: `# User Profile Enhancement - Technical Specification

## Architecture Overview
The user profile system follows a microservices architecture with the following components...

## API Endpoints
- GET /api/v2/users/{id}/profile
- PUT /api/v2/users/{id}/profile
- POST /api/v2/users/{id}/profile/avatar
- DELETE /api/v2/users/{id}/profile/avatar

## Database Schema
Profile data is stored in PostgreSQL with Redis caching layer...`,
    excerpt: 'Complete technical specification for user profile enhancement including API design, database schema, and security considerations',
    version: 12,
    createdBy: {
      displayName: 'Tech Lead',
      emailAddress: 'tech.lead@genesys.com'
    },
    createdAt: '2024-10-10T08:00:00Z',
    lastModified: '2024-12-01T14:00:00Z',
    lastModifiedBy: {
      displayName: 'Hudson Shimanyula',
      emailAddress: 'hudson.s@genesys.com'
    },
    url: 'https://confluence.genesys.com/display/TECH/User+Profile+Enhancement',
    labels: ['technical-spec', 'api', 'architecture']
  },
  {
    id: 'doc-002',
    title: 'QA Test Plan - Profile Enhancement',
    spaceKey: 'QA',
    spaceName: 'Quality Assurance',
    content: `# QA Test Plan - Profile Enhancement

## Test Scope
Comprehensive testing of all profile enhancement features including functional, integration, performance, and security testing.

## Test Cases
1. Profile Picture Upload
   - Valid image formats
   - Invalid formats
   - Size limits
   - Crop functionality
   
2. Privacy Settings
   - Toggle behaviors
   - Permission inheritance
   - Default settings
   
## Test Environments
- DEV: dev.genesys.com
- STAGING: staging.genesys.com
- PROD: app.genesys.com`,
    excerpt: 'Complete QA test plan with test cases, scenarios, and acceptance criteria for profile enhancement epic',
    version: 8,
    createdBy: {
      displayName: 'Michael QA',
      emailAddress: 'michael.qa@genesys.com'
    },
    createdAt: '2024-10-18T10:00:00Z',
    lastModified: '2024-12-05T11:00:00Z',
    lastModifiedBy: {
      displayName: 'Hudson Shimanyula',
      emailAddress: 'hudson.s@genesys.com'
    },
    url: 'https://confluence.genesys.com/display/QA/Test+Plan+Profile+Enhancement',
    labels: ['test-plan', 'qa', 'profile']
  }
];

export const mockZoomMeetings: ZoomMeeting[] = [
  {
    id: 'meeting-001',
    topic: 'Sprint Planning - Profile Enhancement',
    startTime: '2024-12-02T14:00:00Z',
    duration: 60,
    status: 'completed',
    hostEmail: 'anu.m@genesys.com',
    participants: 8,
    recordingUrl: 'https://zoom.us/rec/share/abc123',
    transcriptUrl: 'https://zoom.us/transcript/abc123',
    agenda: 'Review sprint backlog, estimate story points, identify dependencies',
    meetingType: 'scheduled',
    linkedEpics: ['PURE-1234'],
    actionItems: ['Create test cases for upload', 'Review API specs', 'Update documentation'],
    aiAnalyzed: true,
    createdTickets: ['PURE-1241', 'PURE-1242']
  },
  {
    id: 'meeting-002',
    topic: 'QA Sync - Test Case Review',
    startTime: '2024-12-05T15:00:00Z',
    duration: 30,
    status: 'completed',
    hostEmail: 'hudson.s@genesys.com',
    participants: 4,
    recordingUrl: 'https://zoom.us/rec/share/def456',
    transcriptUrl: 'https://zoom.us/transcript/def456',
    agenda: 'Review test cases for profile upload feature',
    meetingType: 'scheduled',
    linkedEpics: ['PURE-1234', 'PURE-1240'],
    aiAnalyzed: true
  },
  {
    id: 'meeting-003',
    topic: 'Security Review - GDPR Compliance',
    startTime: '2024-12-10T16:00:00Z',
    duration: 45,
    status: 'scheduled',
    hostEmail: 'security@genesys.com',
    participants: 0,
    joinUrl: 'https://zoom.us/j/12345678',
    agenda: 'Review GDPR compliance for profile data handling',
    meetingType: 'scheduled',
    linkedEpics: ['PURE-1234']
  },
  {
    id: 'meeting-004',
    topic: 'Payment Gateway Integration Kickoff',
    startTime: '2024-12-01T10:00:00Z',
    duration: 90,
    status: 'completed',
    hostEmail: 'po@genesys.com',
    participants: 12,
    recordingUrl: 'https://zoom.us/rec/share/ghi789',
    agenda: 'Kickoff meeting for payment gateway integration with Stripe and PayPal',
    meetingType: 'scheduled',
    linkedEpics: ['PURE-1240'],
    actionItems: ['Research Stripe API', 'Setup test accounts', 'Create integration plan'],
    aiAnalyzed: false
  },
  {
    id: 'meeting-005',
    topic: 'Weekly QA Standup',
    startTime: '2024-12-06T09:00:00Z',
    duration: 15,
    status: 'completed',
    hostEmail: 'hudson.s@genesys.com',
    participants: 6,
    meetingType: 'recurring',
    aiAnalyzed: false
  }
];

export const mockNewRelicMetrics: NewRelicMetrics = {
  timestamp: new Date().toISOString(),
  testExecution: {
    totalTests: 285,
    passed: 248,
    failed: 23,
    skipped: 14,
    duration: 1847, // seconds
    successRate: 87.02,
    coveragePercentage: 78.5,
    automationCoverage: 82.3,
    testSuites: [
      {
        name: 'Profile Upload Tests',
        totalTests: 45,
        passed: 38,
        failed: 5,
        duration: 320,
        failures: [
          {
            testName: 'should reject files over 5MB',
            suiteName: 'Profile Upload Tests',
            errorMessage: 'Expected file to be rejected but upload succeeded',
            stackTrace: 'at ProfileUpload.test.js:145:10',
            timestamp: '2024-12-06T10:30:00Z',
            severity: 'high'
          },
          {
            testName: 'should handle network timeout gracefully',
            suiteName: 'Profile Upload Tests',
            errorMessage: 'Timeout: Test exceeded 5000ms',
            timestamp: '2024-12-06T10:32:00Z',
            severity: 'medium'
          }
        ]
      },
      {
        name: 'Privacy Settings Tests',
        totalTests: 38,
        passed: 35,
        failed: 2,
        duration: 280,
        failures: [
          {
            testName: 'should inherit parent privacy settings',
            suiteName: 'Privacy Settings Tests',
            errorMessage: 'Settings not inherited correctly',
            timestamp: '2024-12-06T10:35:00Z',
            severity: 'high'
          }
        ]
      },
      {
        name: 'Integration Tests',
        totalTests: 62,
        passed: 55,
        failed: 4,
        duration: 450,
        failures: []
      },
      {
        name: 'E2E User Journey',
        totalTests: 28,
        passed: 26,
        failed: 2,
        duration: 380,
        failures: []
      },
      {
        name: 'Performance Tests',
        totalTests: 35,
        passed: 30,
        failed: 3,
        duration: 210,
        failures: []
      },
      {
        name: 'Security Tests',
        totalTests: 42,
        passed: 38,
        failed: 3,
        duration: 187,
        failures: []
      },
      {
        name: 'API Contract Tests',
        totalTests: 35,
        passed: 26,
        failed: 4,
        duration: 20,
        failures: []
      }
    ]
  },
  pipeline: {
    pipelineName: 'profile-enhancement-pipeline',
    buildNumber: 1247,
    status: 'failed',
    startTime: '2024-12-06T10:00:00Z',
    endTime: '2024-12-06T10:31:00Z',
    duration: 1860,
    stages: [
      {
        name: 'Checkout',
        status: 'success',
        duration: 15,
        startTime: '2024-12-06T10:00:00Z',
        endTime: '2024-12-06T10:00:15Z'
      },
      {
        name: 'Build',
        status: 'success',
        duration: 180,
        startTime: '2024-12-06T10:00:15Z',
        endTime: '2024-12-06T10:03:15Z'
      },
      {
        name: 'Unit Tests',
        status: 'success',
        duration: 240,
        startTime: '2024-12-06T10:03:15Z',
        endTime: '2024-12-06T10:07:15Z'
      },
      {
        name: 'Integration Tests',
        status: 'failed',
        duration: 450,
        startTime: '2024-12-06T10:07:15Z',
        endTime: '2024-12-06T10:14:45Z'
      },
      {
        name: 'E2E Tests',
        status: 'skipped',
        duration: 0,
        startTime: '2024-12-06T10:14:45Z'
      },
      {
        name: 'Deploy to Staging',
        status: 'skipped',
        duration: 0,
        startTime: '2024-12-06T10:14:45Z'
      }
    ],
    triggeredBy: 'hudson.s@genesys.com',
    branch: 'feature/profile-enhancement',
    commitHash: 'a3f5c89'
  },
  performance: {
    responseTime: {
      avg: 245,
      median: 180,
      p90: 450,
      p95: 680,
      p99: 1200
    },
    throughput: 125.5,
    errorRate: 2.3,
    apdex: 0.92,
    transactions: [
      {
        name: 'GET /api/v2/users/profile',
        avgDuration: 120,
        callCount: 15420,
        errorRate: 0.5,
        throughput: 25.7
      },
      {
        name: 'PUT /api/v2/users/profile',
        avgDuration: 340,
        callCount: 8230,
        errorRate: 1.2,
        throughput: 13.7
      },
      {
        name: 'POST /api/v2/users/avatar',
        avgDuration: 890,
        callCount: 2150,
        errorRate: 3.5,
        throughput: 3.6
      }
    ]
  },
  quality: {
    defectDensity: 3.2,
    defectDiscoveryRate: 8.5,
    escapedDefects: 2,
    mttr: 4.5,
    mttd: 2.3,
    testEfficiency: 0.85,
    releaseReadiness: 72.5
  }
};

export const mockTestExecutionHistory: TestExecutionHistory = {
  date: '2024-12-06',
  totalRuns: 1247,
  passRate: 87.02,
  failRate: 8.07,
  avgDuration: 1847,
  trends: {
    daily: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      passed: Math.floor(240 + Math.random() * 20),
      failed: Math.floor(15 + Math.random() * 10),
      skipped: Math.floor(10 + Math.random() * 5),
      duration: Math.floor(1800 + Math.random() * 200)
    })).reverse(),
    weekly: Array.from({ length: 4 }, (_, i) => ({
      date: `Week ${52 - i}`,
      passed: Math.floor(1680 + Math.random() * 100),
      failed: Math.floor(120 + Math.random() * 40),
      skipped: Math.floor(80 + Math.random() * 20),
      duration: Math.floor(12000 + Math.random() * 1000)
    })).reverse(),
    monthly: Array.from({ length: 6 }, (_, i) => ({
      date: new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000).toLocaleString('default', { month: 'short' }),
      passed: Math.floor(7200 + Math.random() * 500),
      failed: Math.floor(500 + Math.random() * 100),
      skipped: Math.floor(350 + Math.random() * 50),
      duration: Math.floor(52000 + Math.random() * 5000)
    })).reverse()
  }
};

export const mockBuildData: BuildData[] = [
  {
    id: 'build-1247',
    number: 1247,
    displayName: 'Profile Enhancement #1247',
    result: 'FAILURE',
    timestamp: '2024-12-06T10:00:00Z',
    duration: 1860000,
    building: false,
    url: 'https://jenkins.genesys.com/job/profile-enhancement/1247',
    branch: 'feature/profile-enhancement',
    commitHash: 'a3f5c89',
    testResults: {
      total: 285,
      passed: 248,
      failed: 23,
      skipped: 14
    }
  },
  {
    id: 'build-1246',
    number: 1246,
    displayName: 'Profile Enhancement #1246',
    result: 'SUCCESS',
    timestamp: '2024-12-06T08:00:00Z',
    duration: 1750000,
    building: false,
    url: 'https://jenkins.genesys.com/job/profile-enhancement/1246',
    branch: 'feature/profile-enhancement',
    commitHash: 'b2e4d78',
    testResults: {
      total: 285,
      passed: 279,
      failed: 2,
      skipped: 4
    }
  },
  {
    id: 'build-1245',
    number: 1245,
    displayName: 'Profile Enhancement #1245',
    result: 'UNSTABLE',
    timestamp: '2024-12-05T16:00:00Z',
    duration: 1820000,
    building: false,
    url: 'https://jenkins.genesys.com/job/profile-enhancement/1245',
    branch: 'feature/profile-enhancement',
    commitHash: 'c1d3f67',
    testResults: {
      total: 280,
      passed: 265,
      failed: 10,
      skipped: 5
    }
  }
];

export const mockAIInsights: AIInsight[] = [
  {
    id: 'insight-001',
    type: 'risk',
    title: 'High Failure Rate in Upload Tests',
    content: 'The profile upload test suite has a 11% failure rate, significantly higher than the 5% threshold. The failures are concentrated around file size validation and network timeout scenarios.',
    confidence: 0.92,
    source: 'Test Execution Analysis',
    timestamp: '2024-12-06T11:00:00Z',
    actionable: true,
    actions: [
      { label: 'View Failed Tests', action: 'view-failures' },
      { label: 'Create Bug Ticket', action: 'create-ticket' },
      { label: 'Analyze Root Cause', action: 'analyze' }
    ]
  },
  {
    id: 'insight-002',
    type: 'suggestion',
    title: 'Test Coverage Gap Identified',
    content: 'Privacy settings inheritance lacks edge case testing. Consider adding tests for nested privacy configurations and cross-feature privacy implications.',
    confidence: 0.85,
    source: 'Coverage Analysis',
    timestamp: '2024-12-06T10:30:00Z',
    actionable: true,
    actions: [
      { label: 'Generate Test Cases', action: 'generate-tests' },
      { label: 'Update Test Plan', action: 'update-plan' }
    ]
  },
  {
    id: 'insight-003',
    type: 'summary',
    title: 'Sprint Progress Summary',
    content: 'Epic PURE-1234 is 65% complete with 2 stories in review, 1 in progress, and 2 blocked. Current velocity suggests completion by sprint end if blockers are resolved.',
    confidence: 0.88,
    source: 'Sprint Analytics',
    timestamp: '2024-12-06T09:00:00Z',
    actionable: false
  },
  {
    id: 'insight-004',
    type: 'action',
    title: 'Performance Regression Detected',
    content: 'API response times have increased by 23% compared to last week. The PUT /api/v2/users/profile endpoint shows the largest degradation.',
    confidence: 0.95,
    source: 'Performance Monitoring',
    timestamp: '2024-12-06T08:00:00Z',
    actionable: true,
    actions: [
      { label: 'View Performance Trends', action: 'view-trends' },
      { label: 'Run Performance Tests', action: 'run-perf-tests' }
    ]
  }
];

export const mockRelease: Release = {
  id: 'release-2.5',
  version: '2.5.0',
  name: 'Winter 2024 Release',
  status: 'testing',
  releaseDate: '2025-01-15T00:00:00Z',
  features: ['PURE-1234', 'PURE-1240', 'PURE-1245'],
  bugs: ['BUG-456', 'BUG-457', 'BUG-460'],
  testCoverage: 78.5,
  riskLevel: 'medium',
  goLiveChecklist: [
    {
      id: 'check-001',
      title: 'All P1 test cases passed',
      completed: true,
      assignee: 'hudson.s@genesys.com',
      category: 'testing'
    },
    {
      id: 'check-002',
      title: 'Performance benchmarks met',
      completed: false,
      assignee: 'michael.qa@genesys.com',
      dueDate: '2025-01-10T00:00:00Z',
      category: 'testing'
    },
    {
      id: 'check-003',
      title: 'Security scan completed',
      completed: true,
      assignee: 'security@genesys.com',
      category: 'testing'
    },
    {
      id: 'check-004',
      title: 'Documentation updated',
      completed: false,
      assignee: 'tech.writer@genesys.com',
      dueDate: '2025-01-12T00:00:00Z',
      category: 'documentation'
    },
    {
      id: 'check-005',
      title: 'Deployment runbook prepared',
      completed: true,
      assignee: 'devops@genesys.com',
      category: 'deployment'
    },
    {
      id: 'check-006',
      title: 'Stakeholder approval',
      completed: false,
      assignee: 'anu.m@genesys.com',
      dueDate: '2025-01-14T00:00:00Z',
      category: 'approval'
    }
  ]
};

// Additional mock epics for list view
const additionalEpics: JiraEpic[] = [
  {
    id: 'epic-002',
    key: 'PURE-1240',
    summary: 'Payment Gateway Integration - Stripe & PayPal',
    description: 'Implement payment processing with multiple gateway support',
    status: 'In Progress',
    priority: 'Critical',
    assignee: {
      displayName: 'Michael QA',
      emailAddress: 'michael.qa@genesys.com',
      avatarUrl: 'https://ui-avatars.com/api/?name=Michael+QA&background=3b82f6&color=fff'
    },
    reporter: {
      displayName: 'Product Owner',
      emailAddress: 'po@genesys.com',
      avatarUrl: 'https://ui-avatars.com/api/?name=Product+Owner&background=10b981&color=fff'
    },
    createdAt: '2024-09-01T08:00:00Z',
    updatedAt: '2024-12-05T14:30:00Z',
    dueDate: '2024-12-20T23:59:59Z',
    labels: ['payment', 'critical', 'integration'],
    components: ['Payment', 'API'],
    storyPoints: 34,
    issueType: 'Epic',
    linkedIssues: []
  },
  {
    id: 'epic-003',
    key: 'PURE-1245',
    summary: 'Mobile App Responsive Design Overhaul',
    description: 'Complete redesign of mobile experience with improved performance',
    status: 'To Do',
    priority: 'High',
    assignee: {
      displayName: 'Frontend Team',
      emailAddress: 'frontend@genesys.com',
      avatarUrl: 'https://ui-avatars.com/api/?name=Frontend+Team&background=3b82f6&color=fff'
    },
    reporter: {
      displayName: 'Design Lead',
      emailAddress: 'design@genesys.com',
      avatarUrl: 'https://ui-avatars.com/api/?name=Design+Lead&background=10b981&color=fff'
    },
    createdAt: '2024-11-15T08:00:00Z',
    updatedAt: '2024-12-04T10:00:00Z',
    dueDate: '2025-02-01T23:59:59Z',
    labels: ['mobile', 'ui', 'responsive'],
    components: ['Mobile', 'UI/UX'],
    storyPoints: 55,
    issueType: 'Epic',
    linkedIssues: []
  },
  {
    id: 'epic-004',
    key: 'PURE-1250',
    summary: 'API Rate Limiting and Throttling',
    description: 'Implement comprehensive rate limiting to prevent API abuse',
    status: 'Done',
    priority: 'Medium',
    assignee: {
      displayName: 'Backend Team',
      emailAddress: 'backend@genesys.com',
      avatarUrl: 'https://ui-avatars.com/api/?name=Backend+Team&background=3b82f6&color=fff'
    },
    reporter: {
      displayName: 'Security Team',
      emailAddress: 'security@genesys.com',
      avatarUrl: 'https://ui-avatars.com/api/?name=Security+Team&background=10b981&color=fff'
    },
    createdAt: '2024-08-01T08:00:00Z',
    updatedAt: '2024-11-30T16:00:00Z',
    labels: ['security', 'api', 'performance'],
    components: ['API', 'Security'],
    storyPoints: 21,
    issueType: 'Epic',
    linkedIssues: []
  },
  {
    id: 'epic-005',
    key: 'PURE-1255',
    summary: 'Data Analytics Dashboard',
    description: 'Build comprehensive analytics dashboard for business metrics',
    status: 'In Review',
    priority: 'High',
    assignee: {
      displayName: 'Hudson Shimanyula',
      emailAddress: 'hudson.s@genesys.com',
      avatarUrl: 'https://ui-avatars.com/api/?name=Hudson+Shimanyula&background=3b82f6&color=fff'
    },
    reporter: {
      displayName: 'Business Analytics',
      emailAddress: 'analytics@genesys.com',
      avatarUrl: 'https://ui-avatars.com/api/?name=Business+Analytics&background=10b981&color=fff'
    },
    createdAt: '2024-10-01T08:00:00Z',
    updatedAt: '2024-12-06T09:00:00Z',
    dueDate: '2024-12-15T23:59:59Z',
    labels: ['analytics', 'dashboard', 'reporting'],
    components: ['Analytics', 'Frontend'],
    storyPoints: 34,
    issueType: 'Epic',
    linkedIssues: []
  },
  {
    id: 'epic-006',
    key: 'PURE-1260',
    summary: 'Accessibility Compliance - WCAG 2.1 AA',
    description: 'Ensure full accessibility compliance across all features',
    status: 'Blocked',
    priority: 'High',
    assignee: {
      displayName: 'QA Team',
      emailAddress: 'qa@genesys.com',
      avatarUrl: 'https://ui-avatars.com/api/?name=QA+Team&background=3b82f6&color=fff'
    },
    reporter: {
      displayName: 'Compliance Officer',
      emailAddress: 'compliance@genesys.com',
      avatarUrl: 'https://ui-avatars.com/api/?name=Compliance+Officer&background=10b981&color=fff'
    },
    createdAt: '2024-09-15T08:00:00Z',
    updatedAt: '2024-12-03T14:00:00Z',
    dueDate: '2025-01-01T23:59:59Z',
    labels: ['accessibility', 'compliance', 'wcag'],
    components: ['UI/UX', 'Frontend'],
    storyPoints: 89,
    issueType: 'Epic',
    linkedIssues: []
  },
  {
    id: 'epic-007',
    key: 'PURE-1265',
    summary: 'Real-time Notifications System',
    description: 'Implement WebSocket-based real-time notifications',
    status: 'In Progress',
    priority: 'Medium',
    assignee: {
      displayName: 'Full Stack Team',
      emailAddress: 'fullstack@genesys.com',
      avatarUrl: 'https://ui-avatars.com/api/?name=Full+Stack+Team&background=3b82f6&color=fff'
    },
    reporter: {
      displayName: 'Technical Lead',
      emailAddress: 'tech.lead@genesys.com',
      avatarUrl: 'https://ui-avatars.com/api/?name=Technical+Lead&background=10b981&color=fff'
    },
    createdAt: '2024-11-01T08:00:00Z',
    updatedAt: '2024-12-05T11:00:00Z',
    labels: ['notifications', 'websocket', 'real-time'],
    components: ['Backend', 'Frontend'],
    storyPoints: 34,
    issueType: 'Epic',
    linkedIssues: []
  },
  {
    id: 'epic-008',
    key: 'PURE-1270',
    summary: 'Multi-language Support (i18n)',
    description: 'Add support for 10 additional languages',
    status: 'To Do',
    priority: 'Low',
    assignee: {
      displayName: 'Localization Team',
      emailAddress: 'l10n@genesys.com',
      avatarUrl: 'https://ui-avatars.com/api/?name=Localization+Team&background=3b82f6&color=fff'
    },
    reporter: {
      displayName: 'International PM',
      emailAddress: 'intl.pm@genesys.com',
      avatarUrl: 'https://ui-avatars.com/api/?name=International+PM&background=10b981&color=fff'
    },
    createdAt: '2024-11-20T08:00:00Z',
    updatedAt: '2024-11-25T10:00:00Z',
    dueDate: '2025-03-01T23:59:59Z',
    labels: ['i18n', 'localization', 'international'],
    components: ['Frontend', 'Content'],
    storyPoints: 55,
    issueType: 'Epic',
    linkedIssues: []
  }
];

// Get all epics
export async function getAllEpics(): Promise<JiraEpic[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return [mockJiraEpic, ...additionalEpics];
}

// Mock API functions that return typed data
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getEpicDashboardData(epicKey: string): Promise<EpicDashboardData> {
  // Simulate API delay
  // In real implementation, epicKey would be used to fetch specific epic data
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    epic: mockJiraEpic,
    tickets: mockJiraTickets,
    documents: mockConfluenceDocuments,
    meetings: mockZoomMeetings,
    testMetrics: mockNewRelicMetrics.testExecution,
    pipelineStatus: [mockNewRelicMetrics.pipeline],
    aiInsights: mockAIInsights
  };
}

export async function getNewRelicMetrics(): Promise<NewRelicMetrics> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockNewRelicMetrics;
}

export async function getTestExecutionHistory(): Promise<TestExecutionHistory> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockTestExecutionHistory;
}

export async function getBuildHistory(): Promise<BuildData[]> {
  await new Promise(resolve => setTimeout(resolve, 250));
  return mockBuildData;
}

// Get all meetings
export async function getAllMeetings(): Promise<ZoomMeeting[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockZoomMeetings;
}

// Get meeting details with AI analysis
export async function getMeetingDetails(meetingId: string): Promise<MeetingDetails> {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const baseMeeting = mockZoomMeetings.find(m => m.id === meetingId) || mockZoomMeetings[0];
  
  const extractedActionItems: ExtractedActionItem[] = [
    {
      id: 'action-001',
      title: 'Create comprehensive test cases for profile upload feature',
      description: 'Develop test cases covering file size validation, format validation, and concurrent upload scenarios',
      assignee: 'Hudson Shimanyula',
      priority: 'High',
      dueDate: '2024-12-15T00:00:00Z',
      confidence: 0.92,
      source: 'ai'
    },
    {
      id: 'action-002',
      title: 'Review and update API documentation',
      description: 'Update the API specs to reflect the new validation rules discussed in the meeting',
      assignee: 'Michael QA',
      priority: 'Medium',
      confidence: 0.88,
      source: 'ai'
    },
    {
      id: 'action-003',
      title: 'Schedule follow-up meeting for GDPR compliance',
      description: 'Organize a technical deep-dive session to address data privacy concerns',
      assignee: 'Anu Manager',
      priority: 'High',
      dueDate: '2024-12-10T00:00:00Z',
      confidence: 0.95,
      source: 'ai'
    }
  ];

  return {
    ...baseMeeting,
    transcript: `[00:00] Anu: Good morning everyone, let's start our sprint planning for the profile enhancement epic.
    
[00:30] Hudson: Thanks Anu. I've reviewed the test cases for the profile upload feature. We have good coverage for the happy path, but we need more edge cases.

[02:15] Michael: I agree. Specifically, we should test concurrent uploads and network interruption scenarios.

[05:45] Dev Lead: From the development side, we're on track with the API implementation. The image processing service is ready for integration testing.

[10:20] Hudson: Great. I'll create additional test cases for the edge scenarios Michael mentioned. We should also add performance tests for the image processing.

[15:00] Anu: What about the GDPR compliance? Do we have test coverage for data deletion and export features?

[16:30] Michael: Yes, I've included those in the security test suite. We're testing both the right to be forgotten and data portability requirements.

[25:00] Anu: Excellent. Let's assign story points...`,
    participantsList: [
      { name: 'Anu Manager', email: 'anu.m@genesys.com', duration: 60 },
      { name: 'Hudson Shimanyula', email: 'hudson.s@genesys.com', duration: 60 },
      { name: 'Michael QA', email: 'michael.qa@genesys.com', duration: 45 },
      { name: 'Dev Lead', email: 'dev.lead@genesys.com', duration: 30 }
    ],
    extractedActionItems,
    aiSummary: {
      summary: 'Sprint planning meeting focused on the profile enhancement epic. The team discussed test coverage gaps, particularly around edge cases for file uploads and concurrent operations. API implementation is on track, with the image processing service ready for integration testing. GDPR compliance testing has been included in the security test suite. Key decisions were made about validation rules and performance benchmarks.',
      keyDecisions: [
        'Add edge case testing for concurrent uploads and network interruptions',
        'Include performance tests for image processing service',
        'Maintain current sprint timeline despite additional test requirements',
        'Prioritize GDPR compliance testing in the security suite'
      ],
      topics: [
        'Test Coverage',
        'API Implementation',
        'GDPR Compliance',
        'Performance Testing',
        'Sprint Planning',
        'Edge Cases',
        'Security Testing'
      ],
      confidence: 0.91
    }
  };
}

export async function getMeetingTranscript(meetingId: string): Promise<MeetingTranscript> {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return {
    meetingId,
    content: `[00:00] Anu: Good morning everyone, let's start our sprint planning for the profile enhancement epic.
    
[00:30] Hudson: Thanks Anu. I've reviewed the test cases for the profile upload feature. We have good coverage for the happy path, but we need more edge cases.

[02:15] Michael: I agree. Specifically, we should test concurrent uploads and network interruption scenarios.

[05:45] Dev Lead: From the development side, we're on track with the API implementation. The image processing service is ready for integration testing.

[10:20] Hudson: Great. I'll create additional test cases for the edge scenarios Michael mentioned. We should also add performance tests for the image processing.

[15:00] Anu: What about the GDPR compliance? Do we have test coverage for data deletion and export features?

[16:30] Michael: Yes, I've included those in the security test suite. We're testing both the right to be forgotten and data portability requirements.

[25:00] Anu: Excellent. Let's assign story points...`,
    speakers: [
      { name: 'Anu Manager', email: 'anu.m@genesys.com', duration: 780 },
      { name: 'Hudson Shimanyula', email: 'hudson.s@genesys.com', duration: 920 },
      { name: 'Michael QA', email: 'michael.qa@genesys.com', duration: 640 },
      { name: 'Dev Lead', email: 'dev.lead@genesys.com', duration: 460 }
    ],
    keywords: ['sprint planning', 'profile enhancement', 'test cases', 'GDPR', 'edge cases', 'performance testing'],
    summary: 'Sprint planning meeting for profile enhancement epic. Discussed test coverage gaps, GDPR compliance testing, and assigned story points to remaining tasks.',
    actionItems: [
      'Hudson: Create additional edge case tests for concurrent uploads',
      'Michael: Finalize security test suite for GDPR compliance',
      'Dev Lead: Complete API integration for image processing',
      'Team: Review and estimate remaining stories in backlog'
    ]
  };
}