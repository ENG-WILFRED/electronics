import React from 'react'

interface Props { images: string[] }

export default function Gallery({ images }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
      {images.map((src, i) => (
        <a key={i} href={src} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transform transition duration-300 border border-gray-700">
          <img src={src} alt={`Project ${i + 1}`} loading="lazy" className="w-full h-64 object-cover" />
        </a>
      ))}
    </div>
  )
}
