"use client"

import { useState } from "react"
import { CarouselGallery } from "@/components/carousel-gallery"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { GalleryDetail } from "@/components/gallery-detail"

const galleryItems = [
  {
    id: "01",
    name: "pickles",
    author: "Omar Faruq Tawsif",
    bg: "#e4cdac",
    image: "/images/pickles.jpg",
  },
  {
    id: "02",
    name: "tea",
    author: "Omar Faruq Tawsif",
    bg: "#f0f0f0",
    image: "/images/tea.jpg",
  },
  {
    id: "03",
    name: "still",
    author: "Omar Faruq Tawsif",
    bg: "#d1d1ca",
    image: "/images/still.jpg",
  },
  {
    id: "04",
    name: "nature",
    author: "Omar Faruq Tawsif",
    bg: "#c9d6c9",
    image: "/images/nature.png",
  },
  {
    id: "05",
    name: "abstract",
    author: "Omar Faruq Tawsif",
    bg: "#e0d0e0",
    image: "/images/abstract.png",
  },
]

export default function GalleryPage() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleOpenItem = (id: string) => {
    setSelectedItem(id)
  }

  const handleCloseItem = () => {
    setSelectedItem(null)
  }

  const selectedGalleryItem = galleryItems.find((item) => item.id === selectedItem)

  return (
    <div className="min-h-screen bg-[#f0f0f0] flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-12">Galerie d'Art</h1>

      <CarouselGallery
        items={galleryItems}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        onOpenItem={handleOpenItem}
      />

      <Dialog open={!!selectedItem} onOpenChange={handleCloseItem}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none shadow-2xl">
          {selectedGalleryItem && (
            <GalleryDetail
              id={selectedGalleryItem.id}
              name={selectedGalleryItem.name}
              author={selectedGalleryItem.author}
              bg={selectedGalleryItem.bg}
              image={selectedGalleryItem.image}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
