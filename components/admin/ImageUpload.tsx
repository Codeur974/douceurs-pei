'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  value: string;
  onChange: (path: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label = 'Image' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      setError('Veuillez sélectionner une image');
      return;
    }

    // Vérifier la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('L\'image ne doit pas dépasser 5MB');
      return;
    }

    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'upload');
      }

      const data = await response.json();
      onChange(data.path);
    } catch (err) {
      setError('Erreur lors de l\'upload de l\'image');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    onChange('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block font-medium text-gray-700">{label}</label>

      {value ? (
        <div className="flex items-center gap-3 p-2 border rounded-lg bg-gray-50">
          <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
            <Image
              src={value}
              alt="Aperçu"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-sm text-gray-600 flex-1 truncate">{value}</p>
          <button
            type="button"
            onClick={handleRemove}
            className="text-red-500 hover:text-red-600 p-1"
          >
            ×
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors
            ${uploading ? 'border-gray-300 bg-gray-50' : 'border-gray-300 hover:border-primary hover:bg-primary/5'}
          `}
        >
          {uploading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
              <span className="text-gray-500 text-sm">Upload...</span>
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              Cliquez pour ajouter une image (max 5MB)
            </p>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={uploading}
      />

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
