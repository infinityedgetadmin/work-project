'use client'

import React from 'react'
import { MainLayout } from '@/components/layout/main-layout'
import { StatsWidget } from '@/components/features/dashboard/stats-widget'
import { RecentActivityWidget, ActivityItem } from '@/components/features/dashboard/recent-activity-widget'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  PlusIcon, 
  ArrowRightIcon,
  DocumentTextIcon,
  BeakerIcon,
  ChatBubbleLeftRightIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline'

const mockStats = [
  { label: 'Active Test Cases', value: 245, change: '+12%', changeType: 'increase' as const },
  { label: 'Pass Rate', value: '94.5%', change: '+2.3%', changeType: 'increase' as const },
  { label: 'Open Bugs', value: 18, change: '-5', changeType: 'decrease' as const },
  { label: 'Test Coverage', value: '78%', change: '+5%', changeType: 'increase' as const },
]

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'test',
    title: 'Regression Test Suite Completed',
    description: 'All 45 regression tests passed for release v2.1.0',
    timestamp: '30 minutes ago',
    user: 'Sarah Johnson',
  },
  {
    id: '2',
    type: 'bug',
    title: 'High Priority Bug Identified',
    description: 'Authentication issue affecting mobile users',
    timestamp: '2 hours ago',
    user: 'Mike Chen',
  },
  {
    id: '3',
    type: 'epic',
    title: 'Epic Updated: Payment Gateway Integration',
    description: 'Test plan approved and test cases created',
    timestamp: '5 hours ago',
    user: 'Emily Davis',
  },
  {
    id: '4',
    type: 'meeting',
    title: 'Sprint Planning Meeting Scheduled',
    description: 'QA team sync for Sprint 23 planning',
    timestamp: '1 day ago',
    user: 'Team Lead',
  },
]

const quickActions = [
  { icon: BeakerIcon, label: 'Create Test Case', href: '/test-cases/new' },
  { icon: DocumentTextIcon, label: 'New Epic', href: '/epics/new' },
  { icon: ChatBubbleLeftRightIcon, label: 'AI Assistant', href: '/ai-assistant' },
  { icon: VideoCameraIcon, label: 'Schedule Meeting', href: '/meetings/new' },
]

export default function DashboardPage() {
  return (
    <MainLayout userName="QA Tester">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FF451A] to-orange-600 bg-clip-text text-transparent">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here&apos;s your QA overview.</p>
          </div>
          <Button variant="primary" className="shadow-colored">
            <PlusIcon className="h-4 w-4 mr-2" />
            Quick Action
          </Button>
        </div>

        <StatsWidget title="Test Metrics" stats={mockStats} />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <RecentActivityWidget activities={mockActivities} className="lg:col-span-2" />
          
          <Card className="glass-orange">
            <CardHeader>
              <CardTitle className="text-lg text-[#FF451A]">Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {quickActions.map((action, index) => {
                  const Icon = action.icon
                  return (
                    <Button
                      key={index}
                      variant="secondary"
                      className="w-full justify-start hover:border-[#FF451A]/30"
                      onClick={() => console.log(`Navigate to ${action.href}`)}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {action.label}
                      <ArrowRightIcon className="h-4 w-4 ml-auto" />
                    </Button>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Test Execution Progress</CardTitle>
              <CardDescription>Current sprint test execution status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">Completed</span>
                    <span className="text-sm text-white/65">78/100</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-genesys-orange to-genesys-orange-light h-2 rounded-full shadow-glow-orange" style={{ width: '78%' }}></div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-genesys-success glow-text-green">68</p>
                    <p className="text-xs text-white/65">Passed</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-genesys-danger">8</p>
                    <p className="text-xs text-white/65">Failed</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-genesys-warning">2</p>
                    <p className="text-xs text-white/65">Blocked</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
              <CardDescription>Important dates and milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Release v2.1.0 Testing</p>
                    <p className="text-xs text-white/65">Full regression suite</p>
                  </div>
                  <span className="text-xs font-medium text-genesys-danger">2 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Sprint 23 Test Plan</p>
                    <p className="text-xs text-white/65">Review and approval</p>
                  </div>
                  <span className="text-xs font-medium text-genesys-warning">5 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">API Testing Workshop</p>
                    <p className="text-xs text-white/65">Team training session</p>
                  </div>
                  <span className="text-xs font-medium text-white/50">1 week</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}