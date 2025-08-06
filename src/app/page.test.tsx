import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/utils'
import DashboardPage from './page'

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('DashboardPage', () => {
  it('renders dashboard title and welcome message', () => {
    render(<DashboardPage />)
    
    expect(screen.getByRole('heading', { name: 'Dashboard', level: 1 })).toBeInTheDocument()
    expect(screen.getByText("Welcome back! Here's your QA overview.")).toBeInTheDocument()
  })

  it('displays test metrics', () => {
    render(<DashboardPage />)
    
    expect(screen.getByText('Test Metrics')).toBeInTheDocument()
    expect(screen.getByText('Active Test Cases')).toBeInTheDocument()
    expect(screen.getByText('245')).toBeInTheDocument()
    expect(screen.getByText('Pass Rate')).toBeInTheDocument()
    expect(screen.getByText('94.5%')).toBeInTheDocument()
    expect(screen.getByText('Open Bugs')).toBeInTheDocument()
    expect(screen.getByText('18')).toBeInTheDocument()
    expect(screen.getByText('Test Coverage')).toBeInTheDocument()
    expect(screen.getByText('78%')).toBeInTheDocument()
  })

  it('shows recent activity', () => {
    render(<DashboardPage />)
    
    expect(screen.getByText('Recent Activity')).toBeInTheDocument()
    expect(screen.getByText('Regression Test Suite Completed')).toBeInTheDocument()
    expect(screen.getByText('High Priority Bug Identified')).toBeInTheDocument()
    expect(screen.getByText('Epic Updated: Payment Gateway Integration')).toBeInTheDocument()
  })

  it('displays quick actions', () => {
    render(<DashboardPage />)
    
    expect(screen.getByText('Quick Actions')).toBeInTheDocument()
    expect(screen.getByText('Create Test Case')).toBeInTheDocument()
    expect(screen.getByText('New Epic')).toBeInTheDocument()
    expect(screen.getAllByText('AI Assistant')[1]).toBeInTheDocument()
    expect(screen.getByText('Schedule Meeting')).toBeInTheDocument()
  })

  it('shows test execution progress', () => {
    render(<DashboardPage />)
    
    expect(screen.getByText('Test Execution Progress')).toBeInTheDocument()
    expect(screen.getByText('78/100')).toBeInTheDocument()
    expect(screen.getByText('68')).toBeInTheDocument()
    expect(screen.getByText('Passed')).toBeInTheDocument()
    expect(screen.getByText('8')).toBeInTheDocument()
    expect(screen.getByText('Failed')).toBeInTheDocument()
  })

  it('displays upcoming deadlines', () => {
    render(<DashboardPage />)
    
    expect(screen.getByText('Upcoming Deadlines')).toBeInTheDocument()
    expect(screen.getByText('Release v2.1.0 Testing')).toBeInTheDocument()
    expect(screen.getByText('2 days')).toBeInTheDocument()
    expect(screen.getByText('Sprint 23 Test Plan')).toBeInTheDocument()
    expect(screen.getByText('5 days')).toBeInTheDocument()
  })

  it('renders quick action button', () => {
    render(<DashboardPage />)
    
    const quickActionButton = screen.getByRole('button', { name: /quick action/i })
    expect(quickActionButton).toBeInTheDocument()
  })

  it('renders with MainLayout', () => {
    render(<DashboardPage />)
    
    expect(screen.getByText('QA Dashboard')).toBeInTheDocument()
    expect(screen.getByText('QA Tester')).toBeInTheDocument()
  })
})