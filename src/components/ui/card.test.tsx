import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card'

describe('Card Components', () => {
  it('renders Card with children', () => {
    render(
      <Card data-testid="card">
        <div>Card content</div>
      </Card>
    )
    const card = screen.getByTestId('card')
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass('rounded-xl', 'border', 'bg-white')
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('renders complete Card structure', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Main content</p>
        </CardContent>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>
    )

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByText('Main content')).toBeInTheDocument()
    expect(screen.getByText('Action')).toBeInTheDocument()
  })

  it('applies custom className to Card', () => {
    render(
      <Card data-testid="card" className="custom-class">
        Content
      </Card>
    )
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('custom-class')
  })

  it('CardTitle renders as h3 element', () => {
    render(<CardTitle>Title Text</CardTitle>)
    const title = screen.getByText('Title Text')
    expect(title.tagName).toBe('H3')
    expect(title).toHaveClass('text-2xl', 'font-semibold')
  })

  it('CardDescription has correct styling', () => {
    render(<CardDescription>Description Text</CardDescription>)
    const description = screen.getByText('Description Text')
    expect(description.tagName).toBe('P')
    expect(description).toHaveClass('text-sm', 'text-gray-600')
  })
})