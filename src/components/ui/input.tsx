import * as React from 'react'
import { cn } from '@/lib/utils'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-lg glass-subtle px-4 py-2 text-sm text-white placeholder:text-white/50 transition-all duration-250 focus:glass focus:border-genesys-orange/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-genesys-orange focus-visible:ring-offset-2 focus-visible:ring-offset-dark-bg disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }