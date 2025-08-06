import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { RecentActivityWidget, ActivityItem } from './recent-activity-widget'

describe('RecentActivityWidget', () => {
  const mockActivities: ActivityItem[] = [
    {
      id: '1',
      type: 'test',
      title: 'Login Test Suite Completed',
      description: 'All 15 tests passed successfully',
      timestamp: '2 hours ago',
      user: 'John Doe',
    },
    {
      id: '2',
      type: 'bug',
      title: 'Critical Bug Found',
      description: 'Payment processing issue in checkout flow',
      timestamp: '4 hours ago',
      user: 'Jane Smith',
    },
    {
      id: '3',
      type: 'epic',
      title: 'New Epic Created',
      description: 'User authentication improvements',
      timestamp: '1 day ago',
    },
    {
      id: '4',
      type: 'meeting',
      title: 'QA Review Meeting',
      description: 'Sprint retrospective and planning',
      timestamp: '2 days ago',
      user: 'Team Lead',
    },
  ]

  it('renders the widget title', () => {
    render(<RecentActivityWidget activities={[]} />)
    expect(screen.getByText('Recent Activity')).toBeInTheDocument()
  })

  it('displays all activities', () => {
    render(<RecentActivityWidget activities={mockActivities} />)
    
    expect(screen.getByText('Login Test Suite Completed')).toBeInTheDocument()
    expect(screen.getByText('Critical Bug Found')).toBeInTheDocument()
    expect(screen.getByText('New Epic Created')).toBeInTheDocument()
    expect(screen.getByText('QA Review Meeting')).toBeInTheDocument()
  })

  it('shows activity descriptions', () => {
    render(<RecentActivityWidget activities={mockActivities} />)
    
    expect(screen.getByText('All 15 tests passed successfully')).toBeInTheDocument()
    expect(screen.getByText('Payment processing issue in checkout flow')).toBeInTheDocument()
  })

  it('displays timestamps and users', () => {
    render(<RecentActivityWidget activities={mockActivities} />)
    
    expect(screen.getByText('2 hours ago')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
  })

  it('applies correct type badges with colors', () => {
    render(<RecentActivityWidget activities={mockActivities} />)
    
    const testBadge = screen.getByText('test')
    expect(testBadge).toHaveClass('bg-blue-100', 'text-blue-800')
    
    const bugBadge = screen.getByText('bug')
    expect(bugBadge).toHaveClass('bg-red-100', 'text-red-800')
    
    const epicBadge = screen.getByText('epic')
    expect(epicBadge).toHaveClass('bg-purple-100', 'text-purple-800')
    
    const meetingBadge = screen.getByText('meeting')
    expect(meetingBadge).toHaveClass('bg-green-100', 'text-green-800')
  })

  it('shows empty state when no activities', () => {
    render(<RecentActivityWidget activities={[]} />)
    expect(screen.getByText('No recent activity')).toBeInTheDocument()
  })

  it('handles activities without user field', () => {
    const activityWithoutUser = [{
      id: '1',
      type: 'epic' as const,
      title: 'Epic Title',
      description: 'Epic description',
      timestamp: 'Just now',
    }]
    
    render(<RecentActivityWidget activities={activityWithoutUser} />)
    expect(screen.getByText('Epic Title')).toBeInTheDocument()
    expect(screen.getByText('Just now')).toBeInTheDocument()
  })
})