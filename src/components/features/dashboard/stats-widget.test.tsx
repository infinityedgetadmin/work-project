import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { StatsWidget } from './stats-widget'

describe('StatsWidget', () => {
  const mockStats = [
    { label: 'Total Tests', value: 150, change: '+10%', changeType: 'increase' as const },
    { label: 'Pass Rate', value: '95%', change: '-2%', changeType: 'decrease' as const },
    { label: 'Active Epics', value: 12, change: 'No change', changeType: 'neutral' as const },
    { label: 'Bugs Found', value: 23 },
  ]

  it('renders title and all stats', () => {
    render(<StatsWidget title="Test Statistics" stats={mockStats} />)
    
    expect(screen.getByText('Test Statistics')).toBeInTheDocument()
    expect(screen.getByText('Total Tests')).toBeInTheDocument()
    expect(screen.getByText('150')).toBeInTheDocument()
    expect(screen.getByText('Pass Rate')).toBeInTheDocument()
    expect(screen.getByText('95%')).toBeInTheDocument()
    expect(screen.getByText('Active Epics')).toBeInTheDocument()
    expect(screen.getByText('12')).toBeInTheDocument()
    expect(screen.getByText('Bugs Found')).toBeInTheDocument()
    expect(screen.getByText('23')).toBeInTheDocument()
  })

  it('renders change indicators with correct colors', () => {
    render(<StatsWidget title="Stats" stats={mockStats} />)
    
    const increaseChange = screen.getByText('+10%')
    expect(increaseChange).toHaveClass('text-green-600')
    
    const decreaseChange = screen.getByText('-2%')
    expect(decreaseChange).toHaveClass('text-red-600')
    
    const neutralChange = screen.getByText('No change')
    expect(neutralChange).toHaveClass('text-gray-600')
  })

  it('handles stats without change values', () => {
    const statsWithoutChange = [
      { label: 'Metric', value: 100 }
    ]
    
    render(<StatsWidget title="Simple Stats" stats={statsWithoutChange} />)
    expect(screen.getByText('Metric')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
    expect(screen.queryByText('+10%')).not.toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <StatsWidget 
        title="Stats" 
        stats={mockStats} 
        className="custom-class" 
      />
    )
    
    const card = screen.getByText('Stats').closest('.custom-class')
    expect(card).toBeInTheDocument()
  })
})