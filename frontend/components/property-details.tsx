'use client'

import { Property } from '@/lib/types'
import { MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PropertyDetailsProps {
  property: Property
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div>
        <div className="mb-4 flex items-start justify-between gap-4 flex-col sm:flex-row">
          <div>
            <h1 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
              {property.project_name}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">{property.builder_name}</p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-lg text-accent-grey">
          <MapPin className="h-5 w-5 text-primary" />
          <span>{property.location}</span>
        </div>
      </div>

      {/* Price Section */}
      <div className="rounded-lg border border-border bg-secondary/30 p-6">
        <p className="text-sm font-medium text-muted-foreground mb-2">List Price</p>
        <p className="text-4xl font-bold text-primary">
          ₹{property.price.toLocaleString()}
        </p>
      </div>

      {/* Highlights */}
      <div>
        <h2 className="mb-3 text-xl font-bold text-foreground">Highlights</h2>
        <p className="leading-relaxed text-muted-foreground">{property.highlights}</p>
      </div>

      {/* Description */}
      <div>
        <h2 className="mb-3 text-xl font-bold text-foreground">Description</h2>
        <p className="leading-relaxed text-muted-foreground">{property.description}</p>
      </div>



      {/* Contact CTA */}
      <div className="flex flex-col gap-3 border-t border-border pt-8 sm:flex-row">
        <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base">
          Schedule a Viewing
        </Button>
        <Button variant="outline" className="flex-1 py-6 text-base border-primary text-primary hover:bg-primary/5">
          Contact Agent
        </Button>
      </div>
    </div>
  )
}
