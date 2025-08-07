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
    <Card className={cn('glass', className)}>
      <CardHeader>
        <CardTitle className="text-lg text-[#FF451A]">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-2 p-4 glass-light rounded-lg">
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-[#FF451A] to-orange-600 bg-clip-text text-transparent">{stat.value}</p>
              {stat.change && (
                <p
                  className={cn(
                    'text-xs font-medium',
                    stat.changeType === 'increase' && 'text-green-600',
                    stat.changeType === 'decrease' && 'text-red-600',
                    stat.changeType === 'neutral' && 'text-gray-500'
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