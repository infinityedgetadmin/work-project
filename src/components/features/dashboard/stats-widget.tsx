import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export interface StatItem {
  label: string
  value: string | number
  change?: string
  changeType?: 'increase' | 'decrease' | 'neutral'
}

export interface StatsWidgetProps {
  title: string
  stats: StatItem[]
  className?: string
}

export function StatsWidget({ title, stats, className }: StatsWidgetProps) {
  return (
    <Card className={cn('', className)}>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <p className="text-sm font-medium text-white/65">{stat.label}</p>
              <p className="text-2xl font-bold gradient-text">{stat.value}</p>
              {stat.change && (
                <p
                  className={cn(
                    'text-xs font-medium',
                    stat.changeType === 'increase' && 'text-genesys-success',
                    stat.changeType === 'decrease' && 'text-genesys-danger',
                    stat.changeType === 'neutral' && 'text-white/50'
                  )}
                >
                  {stat.change}
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}