import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/utils'
import userEvent from '@testing-library/user-event'
import { MainLayout } from './main-layout'

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('MainLayout', () => {
  it('renders header, sidebar, and children', () => {
    render(
      <MainLayout>
        <div>Main Content</div>
      </MainLayout>
    )
    
    expect(screen.getByText('QA Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Main Content')).toBeInTheDocument()
  })

  it('passes userName to header', () => {
    render(
      <MainLayout userName="Jane Doe">
        <div>Content</div>
      </MainLayout>
    )
    
    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
  })

  it('toggles sidebar collapse state', async () => {
    const user = userEvent.setup()
    
    render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    )
    
    const sidebar = screen.getByRole('complementary')
    expect(sidebar).toHaveClass('w-64')
    
    const toggleButton = screen.getByLabelText('Collapse sidebar')
    await user.click(toggleButton)
    
    expect(sidebar).toHaveClass('w-16')
  })

  it('renders children within max-width container', () => {
    render(
      <MainLayout>
        <div data-testid="child">Content</div>
      </MainLayout>
    )
    
    const child = screen.getByTestId('child')
    const container = child.closest('.max-w-7xl')
    expect(container).toBeInTheDocument()
  })

  it('applies correct background color', () => {
    render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    )
    
    const layoutContainer = screen.getByText('QA Dashboard').closest('.min-h-screen')
    expect(layoutContainer).toHaveClass('bg-gray-50')
  })
})