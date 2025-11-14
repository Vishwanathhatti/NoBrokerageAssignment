'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AdminHeader } from '@/components/admin-header'
import { PropertiesTable } from '@/components/properties-table'
import { getAdminSession } from '@/lib/auth'

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = getAdminSession()
    if (!token) {
      router.push('/admin/login')
    } else {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Manage Properties</h2>
            <p className="mt-1 text-sm text-muted-foreground">View, edit, and delete your property listings</p>
          </div>
          <Link href="/admin/add" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
              + Add New Property
            </Button>
          </Link>
        </div>
        <PropertiesTable />
      </main>
    </div>
  )
}
