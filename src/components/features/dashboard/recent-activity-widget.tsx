import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export interface ActivityItem {
  id: string
  type: 'test' | 'bug' | 'epic' | 'meeting'
  title: string
  description: string
  timestamp: string
  user?: string
}

export interface RecentActivityWidgetProps {
  activities: ActivityItem[]
  className?: string
}

const activityTypeStyles = {
  test: 'bg-gradient-to-r from-genesys-info to-genesys-info/80 text-white shadow-sm',
  bug: 'bg-gradient-to-r from-genesys-danger to-genesys-danger-light text-white shadow-sm',
  epic: 'bg-gradient-to-r from-genesys-navy to-genesys-navy-light text-white shadow-sm',
  meeting: 'bg-gradient-to-r from-genesys-success to-genesys-success/80 text-white shadow-sm',
}

export function RecentActivityWidget({ activities, className }: RecentActivityWidgetProps) {
  return (
    <Card className={cn('', className)}>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-sm text-white/50">No recent activity</p>
          ) : (
            activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <span
                  className={cn(
                    'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
                    activityTypeStyles[activity.type]
                  )}
                >
                  {activity.type}
                </span>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-white">{activity.title}</p>
                  <p className="text-sm text-white/65">{activity.description}</p>
                  <div className="flex items-center gap-2 text-xs text-white/50">
                    <span>{activity.timestamp}</span>
                    {activity.user && (
                      <>
                        <span>•</span>
                        <span>{activity.user}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}