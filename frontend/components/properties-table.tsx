'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Property } from '@/lib/types'
import { getProperties, deleteProperty } from '@/lib/db'

export function PropertiesTable() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

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

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return
    try {
      await deleteProperty(id)
      setProperties(properties.filter(p => p._id !== id))
    } catch (error) {
      console.error('Failed to delete property:', error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Properties</CardTitle>
        <CardDescription>Manage and view all property listings</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="py-8 text-center text-muted-foreground">Loading properties...</div>
        ) : properties.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">No properties found</div>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-2 sm:px-4 py-3 text-left font-semibold text-foreground">Project Name</th>
                    <th className="px-2 sm:px-4 py-3 text-left font-semibold text-foreground">Builder</th>
                    <th className="px-2 sm:px-4 py-3 text-left font-semibold text-foreground">Location</th>
                    <th className="px-2 sm:px-4 py-3 text-left font-semibold text-foreground">Price</th>
                    <th className="px-2 sm:px-4 py-3 text-left font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((property) => (
                    <tr key={property._id} className="border-b border-border hover:bg-secondary/30">
                      <td className="px-2 sm:px-4 py-3 font-medium text-foreground">{property.project_name}</td>
                      <td className="px-2 sm:px-4 py-3 text-muted-foreground">{property.builder_name}</td>
                      <td className="px-2 sm:px-4 py-3 text-muted-foreground">{property.location}</td>
                      <td className="px-2 sm:px-4 py-3 font-medium text-primary">
                        ₹{property.price.toLocaleString()}
                      </td>
                      <td className="px-2 sm:px-4 py-3">
                        <div className="flex gap-2">
                          <Link href={`/admin/edit/${property._id}`}>
                            <Button variant="outline" size="sm" className="text-primary">
                              Edit
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDelete(property._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-3">
              {properties.map((property) => (
                <div key={property._id} className="rounded-lg border border-border bg-card p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{property.project_name}</h3>
                      <p className="text-sm text-muted-foreground truncate">{property.location}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-semibold text-primary">${property.price.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{property.builder_name}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2 border-t border-border">
                    <Link href={`/admin/edit/${property._id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full text-primary">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-destructive"
                      onClick={() => handleDelete(property._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
