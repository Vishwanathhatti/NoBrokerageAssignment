'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { ImageCarousel } from '@/components/image-carousel'
import { PropertyDetails } from '@/components/property-details'
import { Property } from '@/lib/types'
import { getPropertyById } from '@/lib/db'

export default function PropertyDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProperty()
  }, [params.id])

  const fetchProperty = async () => {
    try {
      const data = await getPropertyById(params.id as string)
      setProperty(data)
    } catch (err) {
      setError('Failed to load property details')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:py-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/90">
            <ArrowLeft className="h-4 w-4" />
            Back to Properties
          </Link>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="text-center">
              <p className="text-muted-foreground">Loading property...</p>
            </div>
          </div>
        ) : error ? (
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-center">
            <p className="text-destructive">{error}</p>
          </div>
        ) : property ? (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Image Carousel - Left Side */}
            <div className="lg:col-span-2">
              <ImageCarousel images={[property.main_image, ...property.gallery_images]} title={property.project_name} />
            </div>

            {/* Property Details - Right Side */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <PropertyDetails property={property} />
              </div>
            </div>
          </div>
        ) : null}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-dark-grey/5 py-8 mt-8 sm:mt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2025 PropertyHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
