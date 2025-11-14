'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AdminHeader } from '@/components/admin-header'
import { PropertyForm } from '@/components/property-form'
import { getAdminSession } from '@/lib/auth'
import { createProperty } from '@/lib/db'

export default function AddPropertyPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const token = getAdminSession()
    if (!token) {
      router.push('/admin/login')
    } else {
      setIsLoading(false)
    }
  }, [router])

  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      await createProperty(data)
      router.push('/admin')
    } catch (error) {
      console.error('Failed to add property:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

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
      <main className="mx-auto max-w-4xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <PropertyForm onSubmit={handleSubmit} isLoading={isSubmitting} />
      </main>
    </div>
  )
}
