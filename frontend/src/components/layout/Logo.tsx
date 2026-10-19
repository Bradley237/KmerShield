import React from 'react'
import { Link } from 'react-router-dom'

interface LogoProps {
  className?: string
  variant?: 'default' | 'inverted'
}

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'default' }) => {
  const isDarkSurface = variant === 'inverted'

  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2.5 font-bold text-xl tracking-tight transition-opacity hover:opacity-90 ${className}`}
      style={{
        color: isDarkSurface ? 'var(--on-primary, #FFFFFF)' : 'var(--text-main)',
      }}
      aria-label="KmerShield - Accueil"
    >
      {/* Precision Shield SVG matching Stitch header icon */}
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform hover:scale-105"
        style={{
          backgroundColor: 'var(--primary-soft)',
          border: '1px solid var(--border-color)',
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
          style={{ color: 'var(--primary)' }}
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      </div>
      <span className="font-bold tracking-tight">KmerShield</span>
    </Link>
  )
}
