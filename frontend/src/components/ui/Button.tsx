import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      className = '',
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold transition-all duration-200 cursor-pointer select-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2'

    const sizeStyles = {
      sm: 'text-xs px-3.5 py-1.5 min-h-[36px] rounded-lg gap-1.5',
      md: 'text-sm px-5 py-2.5 min-h-[44px] rounded-xl gap-2',
      lg: 'text-base px-6 py-3.5 min-h-[48px] rounded-xl gap-2.5',
    }

    const variantStyles = {
      primary:
        'bg-[var(--primary)] hover:bg-[var(--primary-hover)] active:bg-[var(--primary-active)] text-[var(--on-primary)] shadow-sm hover:shadow',
      secondary:
        'bg-[var(--bg-surface-secondary)] hover:bg-[var(--border-color)] text-[var(--text-main)]',
      outline:
        'border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-secondary)] text-[var(--text-main)]',
      ghost:
        'bg-transparent hover:bg-[var(--bg-surface-secondary)] text-[var(--text-main)]',
      danger:
        'bg-[var(--risk-danger)] hover:opacity-90 text-white shadow-sm',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        ) : (
          leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    )
  },
)

Button.displayName = 'Button'
