'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="border-b border-border bg-white sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <span className="font-bold text-primary-foreground">P</span>
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:inline">PropertyHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Properties
            </Link>
            <Link href="/admin" className="text-sm font-medium text-accent-grey hover:text-primary transition-colors">
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden p-2 rounded-md hover:bg-secondary"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="sm:hidden pb-4 space-y-2 border-t border-border">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-secondary"
              onClick={() => setIsOpen(false)}
            >
              Properties
            </Link>
            <Link
              href="/admin"
              className="block px-3 py-2 rounded-md text-sm font-medium text-accent-grey hover:bg-secondary"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
