'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  HomeIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  ServerStackIcon,
  Cog6ToothIcon,
  VideoCameraIcon,
  BugAntIcon,
  CodeBracketIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

export interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const defaultNavItems: NavItem[] = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Epics', href: '/epics', icon: DocumentTextIcon },
  { name: 'Bug Hunts', href: '/bug-hunts', icon: BugAntIcon },
  { name: 'Code Changes', href: '/code-changes', icon: CodeBracketIcon },
  { name: 'Confluence', href: '/confluence', icon: DocumentDuplicateIcon },
  { name: 'AI Assistant', href: '/ai-assistant', icon: ChatBubbleLeftRightIcon },
  { name: 'Meetings', href: '/meetings', icon: VideoCameraIcon },
  { name: 'New Relic', href: '/new-relic', icon: ServerStackIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
]

export interface SidebarProps {
  navItems?: NavItem[]
  collapsed?: boolean
  onToggle?: () => void
}

export function Sidebar({ navItems = defaultNavItems, collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        'sticky top-16 h-[calc(100vh-4rem)] glass-sidebar transition-all duration-500 ease-in-out',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <nav className="flex h-full flex-col p-4">
        <ul className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300 relative overflow-hidden',
                    isActive
                      ? 'glass-button-primary shadow-lg text-white'
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-orange-100/50 hover:text-[#FF451A] hover:border-orange-200'
                  )}
                  title={collapsed ? item.name : undefined}
                >
                  <Icon className={cn(
                    "h-5 w-5 flex-shrink-0 transition-transform duration-300",
                    isActive ? "scale-110" : "group-hover:scale-110 group-hover:rotate-3"
                  )} />
                  {!collapsed && (
                    <span className="transition-all duration-300 group-hover:translate-x-0.5">
                      {item.name}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
        
        <button
          onClick={onToggle}
          className="mt-auto flex items-center justify-center rounded-xl p-2.5 text-gray-600 hover:text-[#FF451A] glass-button transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-orange-100/50"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg
            className={cn('h-5 w-5 transition-transform', collapsed && 'rotate-180')}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        </button>
      </nav>
    </aside>
  )
}