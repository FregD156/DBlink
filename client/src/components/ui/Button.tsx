import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-body font-medium transition-all duration-300 ease-out focus:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-95",
          // Variants
          variant === 'primary' && "bg-accent text-white hover:bg-[#B36852] rounded-button shadow-sm hover:shadow",
          variant === 'outline' && "border border-text-primary text-text-primary bg-transparent hover:bg-text-primary hover:text-white rounded-button",
          variant === 'ghost' && "bg-transparent text-text-primary hover:bg-bg-secondary rounded-button",
          // Sizes
          size === 'sm' && "px-4 py-2 text-xs uppercase tracking-wider",
          size === 'md' && "px-8 py-3.5 text-sm uppercase tracking-wider",
          size === 'lg' && "px-10 py-4 text-base uppercase tracking-wider",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
