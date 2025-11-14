'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { clearAdminSession, getAdminSession } from '@/lib/auth'
import { Menu, X } from 'lucide-react'

export function AdminHeader() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = getAdminSession()
    setIsAuthenticated(!!token)
  }, [])

  const handleLogout = () => {
    clearAdminSession()
    router.push('/admin/login')
  }

  return (
    <header className="border-b border-border bg-white sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo and Title */}
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground truncate">PropertyHub Admin</h1>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground hidden sm:block">Manage your property listings</p>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center gap-2">
            <Link 
              href="/admin" 
              className="rounded-md bg-primary px-3 sm:px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Dashboard
            </Link>
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="rounded-md border border-border px-3 sm:px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                Logout
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="sm:hidden p-2 rounded-md hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="sm:hidden border-t border-border mt-4 pt-4 space-y-2">
            <Link 
              href="/admin" 
              className="block rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            {isAuthenticated && (
              <button
                onClick={() => {
                  handleLogout()
                  setIsMobileMenuOpen(false)
                }}
                className="w-full text-left rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
