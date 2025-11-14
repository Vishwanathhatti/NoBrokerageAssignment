import { Metadata } from 'next'
import { AdminLoginForm } from '@/components/admin-login-form'

export const metadata: Metadata = {
  title: 'Admin Login - PropertyHub',
  description: 'Admin panel login for PropertyHub',
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground">PropertyHub Admin</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to your admin account</p>
        </div>

        {/* Login Card */}
        <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
          <AdminLoginForm />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>Secure Admin Portal • PropertyHub © 2025</p>
        </div>
      </div>
    </div>
  )
}
