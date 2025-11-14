import Link from 'next/link'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { Property } from '@/lib/types'

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/property/${property._id}`}>
      <div className="group cursor-pointer overflow-hidden rounded-lg border border-border bg-white transition-all hover:shadow-lg hover:ring-1 hover:ring-primary/50">
        {/* Image Container */}
        <div className="relative h-64 w-full overflow-hidden bg-secondary">
          <img
            src={property.main_image || '/placeholder.svg?height=256&width=400&query=property'}
            alt={property.project_name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="mb-3">
            <h3 className="font-semibold text-foreground line-clamp-1 text-lg">{property.project_name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1">{property.builder_name}</p>
          </div>

          {/* Location */}
          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 flex-shrink-0 text-primary" />
            <span className="line-clamp-1">{property.location}</span>
          </div>

          {/* Price */}
          <div className="mb-4 border-t border-b border-border py-4">
            <p className="text-2xl font-bold text-primary">
              ₹{property.price.toLocaleString()}
            </p>
          </div>

          {/* Description */}
          <div className="text-sm text-muted-foreground line-clamp-2">
            {property.description}
          </div>
        </div>
      </div>
    </Link>
  )
}
