import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from '@heroicons/react/24/outline'

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
    <Card className={cn('glass-card hover-lift', className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="relative group space-y-2 p-4 glass-light rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-white/90 cursor-pointer overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
              <p className="text-sm font-medium text-gray-600 relative z-10">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 relative z-10 transition-all duration-300 group-hover:scale-110">{stat.value}</p>
              {stat.change && (
                <div
                  className={cn(
                    'flex items-center gap-1 text-xs font-medium relative z-10',
                    stat.changeType === 'increase' && 'text-green-600',
                    stat.changeType === 'decrease' && 'text-red-600',
                    stat.changeType === 'neutral' && 'text-gray-500'
                  )}
                >
                  {stat.changeType === 'increase' && <ArrowUpIcon className="h-3 w-3" />}
                  {stat.changeType === 'decrease' && <ArrowDownIcon className="h-3 w-3" />}
                  {stat.changeType === 'neutral' && <MinusIcon className="h-3 w-3" />}
                  <span>{stat.change}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}