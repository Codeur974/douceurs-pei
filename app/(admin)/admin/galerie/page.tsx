'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface GalerieImage {
  id: string;
  src: string;
  title: string;
}

export default function AdminGalerie() {
  const [images, setImages] = useState<GalerieImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const res = await fetch('/api/admin/galerie');
    const data = await res.json();
    setImages(data);
    setLoading(false);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);

    const res = await fetch('/api/admin/galerie', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      setTitle('');
      setFile(null);
      fetchImages();
    }
    setUploading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette image ?')) return;

    await fetch('/api/admin/galerie', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    fetchImages();
  };

  const handleEdit = async (id: string) => {
    await fetch('/api/admin/galerie', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, title: editingTitle }),
    });

    setEditingId(null);
    fetchImages();
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Gestion de la Galerie</h1>

      {/* Formulaire d'ajout */}
      <form onSubmit={handleUpload} className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Ajouter une image</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Titre
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Gâteau d'anniversaire"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={uploading}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50"
            >
              {uploading ? 'Upload...' : 'Ajouter'}
            </button>
          </div>
        </div>
      </form>

      {/* Liste des images */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Images ({images.length})</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative group">
              <div className="aspect-square relative rounded-lg overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover"
                  sizes="150px"
                />
              </div>

              {editingId === image.id ? (
                <div className="mt-2">
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    className="w-full border rounded px-2 py-1 text-sm"
                    autoFocus
                  />
                  <div className="flex gap-1 mt-1">
                    <button
                      onClick={() => handleEdit(image.id)}
                      className="text-xs bg-green-500 text-white px-2 py-1 rounded"
                    >
                      OK
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-xs bg-gray-500 text-white px-2 py-1 rounded"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <p className="mt-2 text-sm text-gray-700 truncate">{image.title}</p>
              )}

              <div className="flex gap-1 mt-1">
                <button
                  onClick={() => {
                    setEditingId(image.id);
                    setEditingTitle(image.title);
                  }}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(image.id)}
                  className="text-xs text-red-600 hover:underline"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
