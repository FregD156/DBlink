import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'new' | 'bestseller' | 'discount';
}

export function Badge({ className, variant = 'new', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 text-[10px] font-body font-semibold tracking-wider uppercase rounded-sm select-none shadow-sm",
        variant === 'new' && "bg-bg-secondary text-text-primary border border-border",
        variant === 'bestseller' && "bg-accent text-white",
        variant === 'discount' && "bg-error text-white",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
