import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/utils'
import userEvent from '@testing-library/user-event'
import { Header } from './header'

describe('Header', () => {
  it('renders header with title', () => {
    render(<Header />)
    expect(screen.getByText('QA Dashboard')).toBeInTheDocument()
  })

  it('displays default user name when not provided', () => {
    render(<Header />)
    expect(screen.getByText('User')).toBeInTheDocument()
  })

  it('displays custom user name when provided', () => {
    render(<Header userName="John Doe" />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('renders notification button with indicator', () => {
    render(<Header />)
    const notificationButton = screen.getByLabelText('Notifications')
    expect(notificationButton).toBeInTheDocument()
    const indicator = notificationButton.querySelector('.bg-genesys-orange')
    expect(indicator).toBeInTheDocument()
  })

  it('handles notification button click', async () => {
    const handleNotificationClick = vi.fn()
    const user = userEvent.setup()
    
    render(<Header onNotificationClick={handleNotificationClick} />)
    const notificationButton = screen.getByLabelText('Notifications')
    
    await user.click(notificationButton)
    expect(handleNotificationClick).toHaveBeenCalledTimes(1)
  })

  it('handles profile button click', async () => {
    const handleProfileClick = vi.fn()
    const user = userEvent.setup()
    
    render(<Header userName="John" onProfileClick={handleProfileClick} />)
    const profileButton = screen.getByText('John').closest('button')!
    
    await user.click(profileButton)
    expect(handleProfileClick).toHaveBeenCalledTimes(1)
  })

  it('has sticky positioning', () => {
    render(<Header />)
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('sticky', 'top-0', 'z-50')
  })
})