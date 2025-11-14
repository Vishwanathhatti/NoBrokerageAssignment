'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { loginAdmin, setAdminSession } from '@/lib/auth'

export function AdminLoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await loginAdmin({ email, password })
      setAdminSession(response.token)
      router.push('/admin')
    } catch (err) {
      setError('Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground">
          Admin Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@propertyhub.com"
          required
          className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-foreground">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
          className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="pt-2">
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-background/50 p-4">
        <p className="text-xs font-medium text-muted-foreground">Note:</p>
        <p className="mt-1 text-xs text-muted-foreground">Register an admin account first if you haven't already.</p>
      </div>
    </form>
  )
}
