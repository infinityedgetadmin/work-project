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
    <header className="sticky top-0 z-50 w-full glass-nav">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold bg-gradient-to-r from-[#FF451A] to-orange-600 bg-clip-text text-transparent">
            QA Dashboard
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onNotificationClick}
            aria-label="Notifications"
            className="relative glass-button hover:text-[#FF451A]"
          >
            <BellIcon className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#FF451A]" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onProfileClick}
            className="flex items-center gap-2 glass-button hover:text-[#FF451A]"
          >
            <UserCircleIcon className="h-5 w-5" />
            <span className="hidden sm:inline-block">{userName}</span>
          </Button>
        </div>
      </div>
    </header>
  )
}