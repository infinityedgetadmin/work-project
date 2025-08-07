'use client'

import React, { useState, useEffect } from 'react'
import { MainLayout } from '@/components/layout/main-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  VideoCameraIcon,
  ServerStackIcon,
  BoltIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  SparklesIcon,
  CalendarIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  LightBulbIcon,
  FlagIcon,
  FireIcon,
  BugAntIcon,
  CodeBracketIcon,
  ClockIcon,
  ArrowPathIcon,
  LinkIcon
} from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

// Mock data for the dashboard
const epicMetrics = {
  active: 12,
  completed: 45,
  blocked: 3,
  inReview: 8,
  completionRate: 78
}

const bugHuntMetrics = {
  activeSessions: 3,
  bugsFound: 24,
  resolved: 18,
  criticalBugs: 2,
  averageResolutionTime: '4.5 hrs'
}

const codeActivity = {
  totalCommits: 287,
  pullRequests: 42,
  mergedToday: 8,
  linkedEpics: 15,
  activeBranches: 23
}

const recentActivity = [
  {
    id: '1',
    type: 'epic',
    title: 'ACD Routing Engine Updated',
    description: '8 new commits linked to GC-ACD-2024',
    time: '15 minutes ago',
    icon: DocumentTextIcon,
    color: 'text-[#FF451A] bg-orange-100'
  },
  {
    id: '2',
    type: 'bug-hunt',
    title: 'IVR Flow Testing Completed',
    description: '5 bugs in call flow logic, 2 critical',
    time: '2 hours ago',
    icon: BugAntIcon,
    color: 'text-red-600 bg-red-100'
  },
  {
    id: '3',
    type: 'code',
    title: 'Skills-Based Routing Merged',
    description: 'PR #287 linked to Epic GC-ROUTE-890',
    time: '3 hours ago',
    icon: CodeBracketIcon,
    color: 'text-green-600 bg-green-100'
  },
  {
    id: '4',
    type: 'ai',
    title: 'Queue Analytics Analyzed',
    description: 'Performance impact for 4 queue epics',
    time: '5 hours ago',
    icon: SparklesIcon,
    color: 'text-purple-600 bg-purple-100'
  }
]

const upcomingBugHunts = [
  {
    id: '1',
    title: 'Predictive Routing Algorithm',
    time: 'Today, 2:00 PM',
    participants: 6,
    epic: 'GC-PRED-450'
  },
  {
    id: '2',
    title: 'Agent State Management',
    time: 'Tomorrow, 10:00 AM',
    participants: 4,
    epic: 'GC-AGENT-312'
  },
  {
    id: '3',
    title: 'Workforce Scheduling API',
    time: 'Friday, 3:00 PM',
    participants: 8,
    epic: 'GC-WFM-780'
  }
]

const aiInsights = [
  {
    id: '1',
    title: 'Queue Performance Degradation',
    description: 'Epic GC-QUEUE-567 shows increased wait times. Consider optimizing skill-based routing rules.',
    priority: 'high',
    confidence: 0.89
  },
  {
    id: '2',
    title: 'IVR Optimization Opportunity',
    description: 'Call flow analytics show 35% of callers bypass IVR menu. Simplify menu structure in GC-IVR-890.',
    priority: 'medium',
    confidence: 0.92
  },
  {
    id: '3',
    title: 'Agent Utilization Imbalance',
    description: 'Workforce analytics shows uneven distribution across skill groups. Review routing in GC-WFM-234.',
    priority: 'low',
    confidence: 0.87
  }
]

const linkedRepositories = [
  { name: 'genesys-routing-engine', commits: 145, epics: 8 },
  { name: 'genesys-architect-flows', commits: 89, epics: 5 },
  { name: 'genesys-analytics-api', commits: 53, epics: 3 }
]

export default function DashboardPage() {
  const [realTimeData, setRealTimeData] = useState({
    activeEpics: 12,
    codeCommits: 287,
    bugHuntSessions: 3
  })

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        activeEpics: prev.activeEpics,
        codeCommits: prev.codeCommits + Math.floor(Math.random() * 3),
        bugHuntSessions: Math.max(0, prev.bugHuntSessions + Math.floor(Math.random() * 2 - 0.5))
      }))
    }, 10000)
    
    return () => clearInterval(interval)
  }, [])

  const quickActions = [
    { icon: DocumentTextIcon, label: 'View Epics', href: '/epics', color: 'from-[#FF451A] to-[#ff8c66]' },
    { icon: BugAntIcon, label: 'Bug Hunts', href: '/bug-hunts', color: 'from-[#ff6b47] to-[#FF451A]' },
    { icon: CodeBracketIcon, label: 'Code Changes', href: '/code-changes', color: 'from-[#FF451A] to-[#ff9980]' },
    { icon: ChatBubbleLeftRightIcon, label: 'AI Assistant', href: '/ai-assistant', color: 'from-[#E63D17] to-[#FF451A]' },
  ]

  return (
    <MainLayout userName="Team Member">
      <div className="space-y-6 section-gradient-strong rounded-2xl p-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="animate-fadeIn">
            <h1 className="text-4xl font-bold text-gradient-orange">
              Epic Intelligence Hub
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Unified epic management with code insights and bug tracking
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-xl">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-700">All Systems Connected</span>
            </div>
          </div>
        </div>

        {/* Real-time Metrics Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card hover-lift flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Epics</p>
              <p className="text-2xl font-bold text-gray-900">{realTimeData.activeEpics}</p>
              <p className="text-xs text-green-600 mt-1">2 completed this week</p>
            </div>
            <DocumentTextIcon className="h-8 w-8 text-[#FF451A]" />
          </div>
          
          <div className="glass-card hover-lift flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Code Commits Today</p>
              <p className="text-2xl font-bold text-gray-900">{realTimeData.codeCommits}</p>
              <p className="text-xs text-[#ff6b47] mt-1">Across 15 repositories</p>
            </div>
            <CodeBracketIcon className="h-8 w-8 text-[#ff6b47]" />
          </div>
          
          <div className="glass-card hover-lift flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Bug Hunts</p>
              <p className="text-2xl font-bold text-gray-900">{realTimeData.bugHuntSessions}</p>
              <p className="text-xs text-red-600 mt-1">24 bugs found today</p>
            </div>
            <BugAntIcon className="h-8 w-8 text-[#E63D17]" />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Epic Overview & Code Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Epic Overview */}
            <Card className="glass-card hover-lift">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <DocumentTextIcon className="h-5 w-5 text-[#FF451A]" />
                  Epic Overview
                </CardTitle>
                <CardDescription>Current sprint progress and epic status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-[#FF451A]">{epicMetrics.active}</p>
                    <p className="text-xs text-gray-600 mt-1">Active</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">{epicMetrics.completed}</p>
                    <p className="text-xs text-gray-600 mt-1">Completed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-yellow-600">{epicMetrics.inReview}</p>
                    <p className="text-xs text-gray-600 mt-1">In Review</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-red-600">{epicMetrics.blocked}</p>
                    <p className="text-xs text-gray-600 mt-1">Blocked</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Sprint Completion</span>
                    <span className="text-sm font-semibold text-gray-900">{epicMetrics.completionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#FF451A] to-[#ff8c66] rounded-full transition-all duration-1000 ease-out glow-orange"
                      style={{ width: `${epicMetrics.completionRate}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center pt-2">
                    <div className="px-3 py-2 bg-orange-50 rounded-lg">
                      <p className="text-xs text-gray-600">Sprint Day</p>
                      <p className="text-sm font-semibold text-[#FF451A]">8 of 14</p>
                    </div>
                    <div className="px-3 py-2 bg-green-50 rounded-lg">
                      <p className="text-xs text-gray-600">Story Points</p>
                      <p className="text-sm font-semibold text-green-600">34 / 55</p>
                    </div>
                    <div className="px-3 py-2 bg-orange-50 rounded-lg">
                      <p className="text-xs text-gray-600">Velocity</p>
                      <p className="text-sm font-semibold text-[#ff6b47]">+12%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Code Activity & Repository Links */}
            <Card className="glass-card hover-lift">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <CodeBracketIcon className="h-5 w-5 text-green-600" />
                  Code Activity & Epic Links
                </CardTitle>
                <CardDescription>Repository activity linked to epics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-600">Total Commits</p>
                    <p className="text-xl font-bold text-gray-900">{codeActivity.totalCommits}</p>
                    <div className="flex items-center gap-1">
                      <ArrowTrendingUpIcon className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-green-600">+23%</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-xs text-gray-600">Pull Requests</p>
                    <p className="text-xl font-bold text-gray-900">{codeActivity.pullRequests}</p>
                    <div className="flex items-center gap-1">
                      <ClockIcon className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs text-yellow-600">8 pending</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-xs text-gray-600">Merged Today</p>
                    <p className="text-xl font-bold text-gray-900">{codeActivity.mergedToday}</p>
                    <div className="flex items-center gap-1">
                      <CheckCircleIcon className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-green-600">On track</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-xs text-gray-600">Linked Epics</p>
                    <p className="text-xl font-bold text-gray-900">{codeActivity.linkedEpics}</p>
                    <div className="flex items-center gap-1">
                      <LinkIcon className="h-3 w-3 text-[#FF451A]" />
                      <span className="text-xs text-[#FF451A]">Connected</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-xs text-gray-600">Active Branches</p>
                    <p className="text-xl font-bold text-gray-900">{codeActivity.activeBranches}</p>
                    <div className="flex items-center gap-1">
                      <ArrowPathIcon className="h-3 w-3 text-blue-500" />
                      <span className="text-xs text-blue-600">In progress</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-gray-700 mb-2">Linked Repositories</p>
                  {linkedRepositories.map((repo, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-2">
                        <CodeBracketIcon className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">{repo.name}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-gray-600">{repo.commits} commits</span>
                        <span className="px-2 py-1 bg-orange-100 text-[#FF451A] rounded-full">{repo.epics} epics</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Bug Hunt Summary */}
            <Card className="glass-card hover-lift">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <BugAntIcon className="h-5 w-5 text-red-600" />
                  Bug Hunt Activity
                </CardTitle>
                <CardDescription>Testing sessions and bug discovery metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{bugHuntMetrics.activeSessions}</p>
                    <p className="text-xs text-gray-600">Active Sessions</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">{bugHuntMetrics.bugsFound}</p>
                    <p className="text-xs text-gray-600">Bugs Found</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{bugHuntMetrics.resolved}</p>
                    <p className="text-xs text-gray-600">Resolved</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-700">{bugHuntMetrics.criticalBugs}</p>
                    <p className="text-xs text-gray-600">Critical</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-[#FF451A]">{bugHuntMetrics.averageResolutionTime}</p>
                    <p className="text-xs text-gray-600">Avg Resolution</p>
                  </div>
                </div>
                
                <div className="mt-4 p-3 gradient-orange-light rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Bug Resolution Rate</span>
                    <span className="text-lg font-bold text-[#FF451A]">75%</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">6 bugs pending review</div>
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card className="glass-card hover-lift">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <SparklesIcon className="h-5 w-5 text-[#FF451A]" />
                  AI Insights & Recommendations
                </CardTitle>
                <CardDescription>Powered by code analysis and epic tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiInsights.map((insight) => (
                    <div
                      key={insight.id}
                      className={cn(
                        "p-3 rounded-lg border transition-all duration-300 hover:shadow-md cursor-pointer",
                        insight.priority === 'high' ? 'border-red-200 bg-red-50' :
                        insight.priority === 'medium' ? 'border-yellow-200 bg-yellow-50' :
                        'border-green-200 bg-green-50'
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <LightBulbIcon className={cn(
                              "h-4 w-4",
                              insight.priority === 'high' ? 'text-red-600' :
                              insight.priority === 'medium' ? 'text-yellow-600' :
                              'text-green-600'
                            )} />
                            <h4 className="font-medium text-gray-900">{insight.title}</h4>
                          </div>
                          <p className="text-sm text-gray-600">{insight.description}</p>
                        </div>
                        <div className="text-right ml-4">
                          <span className={cn(
                            "px-2 py-1 text-xs font-medium rounded-full",
                            insight.priority === 'high' ? 'bg-red-100 text-red-700' :
                            insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          )}>
                            {insight.priority}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">
                            {Math.round(insight.confidence * 100)}% confidence
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Activity & Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="glass-card hover-lift">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon
                    return (
                      <button
                        key={index}
                        onClick={() => console.log(`Navigate to ${action.href}`)}
                        className="group relative p-4 rounded-xl bg-gradient-to-br hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden"
                      >
                        <div className={cn(
                          "absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity",
                          action.color
                        )} />
                        <Icon className="h-8 w-8 mb-2 text-gray-700 group-hover:scale-110 transition-transform" />
                        <p className="text-xs font-medium text-gray-700">{action.label}</p>
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="glass-card hover-lift">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
                <CardDescription>Latest updates across epics and code</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity) => {
                    const Icon = activity.icon
                    return (
                      <div key={activity.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className={cn("p-2 rounded-lg", activity.color)}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
                          <p className="text-xs text-gray-600">{activity.description}</p>
                          <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Bug Hunts */}
            <Card className="glass-card hover-lift">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <BugAntIcon className="h-5 w-5 text-red-600" />
                  Upcoming Bug Hunts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingBugHunts.map((hunt) => (
                    <div key={hunt.id} className="p-3 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-all cursor-pointer">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{hunt.title}</p>
                          <p className="text-xs text-gray-600 mt-1">{hunt.time}</p>
                          <p className="text-xs text-[#FF451A] mt-1">Epic: {hunt.epic}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <UserGroupIcon className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{hunt.participants}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-3 px-3 py-2 text-sm font-medium text-white glass-button-primary rounded-lg transition-all hover:scale-105">
                  Schedule Bug Hunt →
                </button>
              </CardContent>
            </Card>

            {/* Integration Status */}
            <Card className="glass-card hover-lift">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Integration Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-700">Jira</span>
                    </div>
                    <span className="text-xs text-green-600">Connected</span>
                  </div>
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-700">Confluence</span>
                    </div>
                    <span className="text-xs text-green-600">Connected</span>
                  </div>
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-700">Bitbucket</span>
                    </div>
                    <span className="text-xs text-green-600">Connected</span>
                  </div>
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-700">GitHub</span>
                    </div>
                    <span className="text-xs text-green-600">Connected</span>
                  </div>
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-700">New Relic</span>
                    </div>
                    <span className="text-xs text-green-600">Connected</span>
                  </div>
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Zoom</span>
                    </div>
                    <span className="text-xs text-yellow-600">Auth Required</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}