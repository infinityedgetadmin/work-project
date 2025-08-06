import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/utils'
import userEvent from '@testing-library/user-event'
import { Sidebar } from './sidebar'
import { HomeIcon } from '@heroicons/react/24/outline'

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Sidebar', () => {
  it('renders default navigation items', () => {
    render(<Sidebar />)
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Epics')).toBeInTheDocument()
    expect(screen.getByText('Test Cases')).toBeInTheDocument()
    expect(screen.getByText('AI Assistant')).toBeInTheDocument()
    expect(screen.getByText('Meetings')).toBeInTheDocument()
    expect(screen.getByText('Research')).toBeInTheDocument()
    expect(screen.getByText('Analytics')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('renders custom navigation items', () => {
    const customItems = [
      { name: 'Custom Item', href: '/custom', icon: HomeIcon },
    ]
    
    render(<Sidebar navItems={customItems} />)
    expect(screen.getByText('Custom Item')).toBeInTheDocument()
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument()
  })

  it('highlights active navigation item', () => {
    render(<Sidebar />)
    const dashboardLink = screen.getByText('Dashboard').closest('a')
    expect(dashboardLink).toHaveClass('bg-blue-50', 'text-blue-600')
  })

  it('renders in collapsed state', () => {
    render(<Sidebar collapsed={true} />)
    const sidebar = screen.getByRole('complementary')
    expect(sidebar).toHaveClass('w-16')
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument()
  })

  it('renders in expanded state', () => {
    render(<Sidebar collapsed={false} />)
    const sidebar = screen.getByRole('complementary')
    expect(sidebar).toHaveClass('w-64')
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('handles toggle button click', async () => {
    const handleToggle = vi.fn()
    const user = userEvent.setup()
    
    render(<Sidebar onToggle={handleToggle} />)
    const toggleButton = screen.getByLabelText('Collapse sidebar')
    
    await user.click(toggleButton)
    expect(handleToggle).toHaveBeenCalledTimes(1)
  })

  it('shows correct aria-label for toggle button', () => {
    const { rerender } = render(<Sidebar collapsed={false} />)
    expect(screen.getByLabelText('Collapse sidebar')).toBeInTheDocument()
    
    rerender(<Sidebar collapsed={true} />)
    expect(screen.getByLabelText('Expand sidebar')).toBeInTheDocument()
  })

  it('adds title attribute to links when collapsed', () => {
    render(<Sidebar collapsed={true} />)
    const links = screen.getAllByRole('link')
    links.forEach((link) => {
      expect(link).toHaveAttribute('title')
    })
  })
})