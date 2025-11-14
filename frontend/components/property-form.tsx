'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Property } from '@/lib/types'

interface PropertyFormProps {
  initialData?: Property
  onSubmit: (data: FormData) => Promise<void>
  isLoading?: boolean
}

export function PropertyForm({ initialData, onSubmit, isLoading = false }: PropertyFormProps) {
  const [formData, setFormData] = useState({
    project_name: initialData?.project_name || '',
    builder_name: initialData?.builder_name || '',
    location: initialData?.location || '',
    price: initialData?.price || '',
    description: initialData?.description || '',
    highlights: initialData?.highlights || '',
  })
  const [mainImage, setMainImage] = useState<File | null>(null)
  const [galleryImages, setGalleryImages] = useState<File[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMainImage(e.target.files[0])
    }
  }

  const handleGalleryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setGalleryImages(Array.from(e.target.files))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const submitData = new FormData()
    submitData.append('project_name', formData.project_name)
    submitData.append('builder_name', formData.builder_name)
    submitData.append('location', formData.location)
    submitData.append('price', formData.price.toString())
    submitData.append('description', formData.description)
    submitData.append('highlights', formData.highlights)

    if (mainImage) {
      submitData.append('main_image', mainImage)
    }

    galleryImages.forEach((file, index) => {
      submitData.append('gallery_images', file)
    })

    await onSubmit(submitData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? 'Edit Property' : 'Add New Property'}</CardTitle>
        <CardDescription>Fill in the property details below</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-foreground">Project Name</label>
              <input
                type="text"
                name="project_name"
                value={formData.project_name}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground">Builder Name</label>
              <input
                type="text"
                name="builder_name"
                value={formData.builder_name}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-foreground">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">Highlights</label>
            <textarea
              name="highlights"
              value={formData.highlights}
              onChange={handleChange}
              required
              rows={3}
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">Main Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleMainImageChange}
              required={!initialData}
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
            />
            {mainImage && <p className="mt-1 text-sm text-muted-foreground">Selected: {mainImage.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">Gallery Images (max 10)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryImagesChange}
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
            />
            {galleryImages.length > 0 && (
              <p className="mt-1 text-sm text-muted-foreground">
                Selected: {galleryImages.length} image{galleryImages.length > 1 ? 's' : ''}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button type="submit" disabled={isLoading} className="bg-primary text-primary-foreground hover:bg-primary/90">
              {isLoading ? 'Saving...' : initialData ? 'Update Property' : 'Add Property'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
