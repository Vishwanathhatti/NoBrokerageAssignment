'use client'

import { useState, useCallback } from 'react'
import { Search, ChevronDown } from 'lucide-react'

interface FilterState {
  searchTerm: string
  location: string
  priceMin: string
  priceMax: string
  projectName: string
}

interface SearchFilterBarProps {
  onFilterChange: (filters: FilterState) => void
  projects: string[]
}

export function SearchFilterBar({ onFilterChange, projects }: SearchFilterBarProps) {
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    location: '',
    priceMin: '',
    priceMax: '',
    projectName: '',
  })

  const handleFilterChange = useCallback((newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters }
    setFilters(updated)
    onFilterChange(updated)
  }, [filters, onFilterChange])

  return (
    <div className="space-y-4 rounded-lg bg-white p-4 shadow-sm ring-1 ring-border sm:p-6">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search properties..."
          value={filters.searchTerm}
          onChange={(e) => handleFilterChange({ searchTerm: e.target.value })}
          className="w-full rounded-md border border-border bg-background pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Location Filter */}
        <div>
          <label className="block text-xs font-medium text-foreground mb-2 sm:text-sm">Location</label>
          <input
            type="text"
            placeholder="Enter location"
            value={filters.location}
            onChange={(e) => handleFilterChange({ location: e.target.value })}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Project Filter */}
        <div>
          <label className="block text-xs font-medium text-foreground mb-2 sm:text-sm">Project</label>
          <select
            value={filters.projectName}
            onChange={(e) => handleFilterChange({ projectName: e.target.value })}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">All Projects</option>
            {projects.map((project) => (
              <option key={project} value={project}>
                {project}
              </option>
            ))}
          </select>
        </div>

        {/* Price Min */}
        <div>
          <label className="block text-xs font-medium text-foreground mb-2 sm:text-sm">Min Price</label>
          <input
            type="number"
            placeholder="Min"
            value={filters.priceMin}
            onChange={(e) => handleFilterChange({ priceMin: e.target.value })}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Price Max */}
        <div>
          <label className="block text-xs font-medium text-foreground mb-2 sm:text-sm">Max Price</label>
          <input
            type="number"
            placeholder="Max"
            value={filters.priceMax}
            onChange={(e) => handleFilterChange({ priceMax: e.target.value })}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Reset Button */}
      {(filters.searchTerm || filters.location || filters.priceMin || filters.priceMax || filters.projectName) && (
        <button
          onClick={() => {
            setFilters({ searchTerm: '', location: '', priceMin: '', priceMax: '', projectName: '' })
            onFilterChange({ searchTerm: '', location: '', priceMin: '', priceMax: '', projectName: '' })
          }}
          className="text-sm font-medium text-primary hover:text-primary/90"
        >
          Clear Filters
        </button>
      )}
    </div>
  )
}
