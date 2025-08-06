'use client'

import React from 'react'
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'

export interface HeaderProps {
  userName?: string
  onNotificationClick?: () => void
  onProfileClick?: () => void
}

export function Header({ userName = 'User', onNotificationClick, onProfileClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-900">QA Dashboard</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onNotificationClick}
            aria-label="Notifications"
            className="relative"
          >
            <BellIcon className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onProfileClick}
            className="flex items-center gap-2"
          >
            <UserCircleIcon className="h-5 w-5" />
            <span className="hidden sm:inline-block">{userName}</span>
          </Button>
        </div>
      </div>
    </header>
  )
}