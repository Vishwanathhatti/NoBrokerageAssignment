'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageCarouselProps {
  images: string[]
  title: string
}

export function ImageCarousel({ images, title }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (!images || images.length === 0) {
    return (
      <div className="h-64 w-full bg-secondary flex items-center justify-center rounded-lg sm:h-96 lg:h-[500px]">
        <p className="text-muted-foreground text-sm">No images available</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="relative h-64 w-full overflow-hidden rounded-lg bg-secondary sm:h-96 lg:h-[500px]">
        <img
          src={images[currentIndex] ? `${process.env.NEXT_PUBLIC_API_BASE_URL?.replace('/api', '')}${images[currentIndex]}` : '/placeholder.svg?height=500&width=800&query=property'}
          alt={`${title} - Image ${currentIndex + 1}`}
          className="h-full w-full object-cover"
        />

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              aria-label="Previous image"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1.5 sm:p-2 text-white hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <button
              onClick={goToNext}
              aria-label="Next image"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1.5 sm:p-2 text-white hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 rounded-full bg-black/70 px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-white">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 rounded-md border-2 overflow-hidden transition-all hover:border-primary ${
                currentIndex === index ? 'border-primary' : 'border-border'
              }`}
            >
              <img
                src={image ? `${process.env.NEXT_PUBLIC_API_BASE_URL?.replace('/api', '')}${image}` : '/placeholder.svg?height=80&width=80&query=property'}
                alt={`Thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
