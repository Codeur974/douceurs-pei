'use client';

import { useState } from 'react';
import Image from 'next/image';

interface GalerieImage {
  id: string;
  src: string;
  title: string;
}

interface ImageModalProps {
  images: GalerieImage[];
  sizePatterns: string[];
}

export function ImageGallery({ images, sizePatterns }: ImageModalProps) {
  const [selectedImage, setSelectedImage] = useState<GalerieImage | null>(null);

  return (
    <>
      {/* Grille d'images */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-4">
        {images.map((image, i) => (
          <div
            key={i}
            onClick={() => setSelectedImage(image)}
            className={`group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer ${sizePatterns[i % sizePatterns.length]}`}
          >
            <Image
              src={image.src}
              alt={image.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="font-[family-name:var(--font-alex-brush)] text-white text-2xl drop-shadow-lg">
                {image.title}
              </p>
            </div>
            <div className="absolute inset-0 border-4 border-white/0 group-hover:border-white/30 rounded-2xl transition-all duration-500" />
          </div>
        ))}
      </div>

      {/* Modal plein écran */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          {/* Bouton fermer */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white text-4xl hover:text-primary transition-colors z-10"
          >
            ×
          </button>

          {/* Titre */}
          <div className="absolute top-4 left-4 z-10">
            <p className="font-[family-name:var(--font-alex-brush)] text-white text-4xl drop-shadow-lg">
              {selectedImage.title}
            </p>
          </div>

          {/* Image */}
          <div className="relative w-full h-full max-w-5xl max-h-[85vh]">
            <Image
              src={selectedImage.src}
              alt={selectedImage.title}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Instructions */}
          <p className="absolute bottom-4 text-white/50 text-sm">
            Cliquez n&apos;importe où pour fermer
          </p>
        </div>
      )}
    </>
  );
}
