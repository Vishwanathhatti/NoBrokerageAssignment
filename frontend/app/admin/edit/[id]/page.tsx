'use client'

import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AdminHeader } from '@/components/admin-header'
import { PropertyForm } from '@/components/property-form'
import { Property } from '@/lib/types'
import { getAdminSession } from '@/lib/auth'
import { getPropertyById, updateProperty } from '@/lib/db'

export default function EditPropertyPage() {
  const router = useRouter()
  const params = useParams()
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const token = getAdminSession()
    if (!token) {
      router.push('/admin/login')
    } else {
      fetchProperty()
    }
  }, [params.id, router])

  const fetchProperty = async () => {
    try {
      const data = await getPropertyById(params.id as string)
      setProperty(data)
    } catch (error) {
      console.error('Failed to fetch property:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      await updateProperty(params.id as string, data)
      router.push('/admin')
    } catch (error) {
      console.error('Failed to update property:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <main className="mx-auto max-w-4xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center text-muted-foreground">Loading property...</div>
        ) : property ? (
          <PropertyForm initialData={property} onSubmit={handleSubmit} isLoading={isSubmitting} />
        ) : (
          <div className="text-center text-destructive">Property not found</div>
        )}
      </main>
    </div>
  )
}
