'use client'

import { useState, useMemo, useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { SearchFilterBar } from '@/components/search-filter-bar'
import { PropertyCard } from '@/components/property-card'
import { Property } from '@/lib/types'
import { getProperties } from '@/lib/db'

interface FilterState {
  searchTerm: string
  location: string
  priceMin: string
  priceMax: string
  projectName: string
}

export default function ListingPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    location: '',
    priceMin: '',
    priceMax: '',
    projectName: '',
  })

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    try {
      const data = await getProperties()
      setProperties(data)
    } catch (error) {
      console.error('Failed to fetch properties:', error)
    } finally {
      setLoading(false)
    }
  }

  const uniqueProjects = useMemo(() => {
    return [...new Set(properties.map(p => p.project_name))].sort()
  }, [properties])

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesSearch = property.project_name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                           property.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
      const matchesLocation = !filters.location || property.location.toLowerCase().includes(filters.location.toLowerCase())
      const matchesProject = !filters.projectName || property.project_name === filters.projectName
      const matchesPriceMin = !filters.priceMin || property.price >= Number(filters.priceMin)
      const matchesPriceMax = !filters.priceMax || property.price <= Number(filters.priceMax)

      return matchesSearch && matchesLocation && matchesProject && matchesPriceMin && matchesPriceMax
    })
  }, [properties, filters])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-secondary to-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-balance text-4xl font-bold text-foreground sm:text-5xl">
            Find Your Perfect Property
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Browse our exclusive collection of premium properties in prime locations
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Search and Filters */}
        <SearchFilterBar
          projects={uniqueProjects}
          onFilterChange={setFilters}
        />

        {/* Results Info */}
        <div className="mt-8 mb-6">
          <h2 className="text-lg font-semibold text-foreground">
            {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'} Found
          </h2>
        </div>

        {/* Properties Grid */}
        {loading ? (
          <div className="py-12 text-center text-muted-foreground">
            Loading properties...
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="rounded-lg border border-border bg-secondary p-12 text-center">
            <p className="text-muted-foreground">No properties match your search criteria</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-dark-grey/5 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2025 PropertyHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
