import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@/test/utils'
import userEvent from '@testing-library/user-event'
import { Input } from './input'

describe('Input', () => {
  it('renders input element', () => {
    render(<Input placeholder="Enter text" />)
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('h-10', 'rounded-lg', 'border-gray-300')
  })

  it('accepts different input types', () => {
    const { rerender } = render(<Input type="text" placeholder="text" />)
    expect(screen.getByPlaceholderText('text')).toHaveAttribute('type', 'text')

    rerender(<Input type="email" placeholder="email" />)
    expect(screen.getByPlaceholderText('email')).toHaveAttribute('type', 'email')

    rerender(<Input type="password" placeholder="password" />)
    expect(screen.getByPlaceholderText('password')).toHaveAttribute('type', 'password')
  })

  it('handles user input', async () => {
    const user = userEvent.setup()
    render(<Input placeholder="Type here" />)
    const input = screen.getByPlaceholderText('Type here') as HTMLInputElement

    await user.type(input, 'Hello World')
    expect(input.value).toBe('Hello World')
  })

  it('handles change events', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    
    render(<Input placeholder="Type here" onChange={handleChange} />)
    const input = screen.getByPlaceholderText('Type here')
    
    await user.type(input, 'test')
    expect(handleChange).toHaveBeenCalled()
  })

  it('can be disabled', () => {
    render(<Input disabled placeholder="Disabled input" />)
    const input = screen.getByPlaceholderText('Disabled input')
    expect(input).toBeDisabled()
    expect(input).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50')
  })

  it('applies custom className', () => {
    render(<Input className="custom-class" placeholder="Custom" />)
    const input = screen.getByPlaceholderText('Custom')
    expect(input).toHaveClass('custom-class')
  })
})