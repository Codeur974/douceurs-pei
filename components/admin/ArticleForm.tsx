'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useArticlesStore, Article } from '@/lib/stores';
import { Card, Input, Textarea, Select, Button } from '@/components/ui';
import { ImageUpload } from './ImageUpload';

interface ArticleFormProps {
  article?: Article;
}

const categoryOptions = [
  { value: 'atelier', label: 'Atelier' },
  { value: 'article', label: 'Article' },
];

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function ArticleForm({ article }: ArticleFormProps) {
  const router = useRouter();
  const { addArticle, updateArticle } = useArticlesStore();
  const isEditing = !!article;

  const [form, setForm] = useState({
    title: article?.title || '',
    slug: article?.slug || '',
    excerpt: article?.excerpt || '',
    content: article?.content || '',
    category: article?.category || 'article',
    date: article?.date || new Date().toISOString().split('T')[0],
    location: article?.location || '',
    image: article?.image || '',
    published: article?.published ?? true,
  });

  const handleTitleChange = (title: string) => {
    setForm({
      ...form,
      title,
      slug: isEditing ? form.slug : generateSlug(title),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing && article) {
      updateArticle(article.id, {
        ...form,
        category: form.category as 'atelier' | 'article',
      });
    } else {
      addArticle({
        ...form,
        category: form.category as 'atelier' | 'article',
      });
    }

    router.push('/admin/blog');
  };

  return (
    <Card className="p-4">
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            label="Titre"
            type="text"
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Ex: Mon atelier macarons chez Marie"
            required
          />
          <Input
            label="Slug (URL)"
            type="text"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            placeholder="mon-atelier-macarons (généré auto)"
            required
          />
        </div>

        <Input
          label="Extrait"
          type="text"
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          placeholder="Courte description qui apparaît sur la carte (1-2 phrases)"
          required
        />

        <Textarea
          label="Contenu"
          rows={6}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          placeholder="Rédigez votre article ici...

## Pour un titre de section
- Pour une liste à puces

Décrivez l'atelier, les recettes réalisées, l'ambiance..."
          required
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Select
            label="Catégorie"
            options={categoryOptions}
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <Input
            label="Date"
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
          <Input
            label="Lieu"
            type="text"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="Paris 15e"
          />
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="w-4 h-4 text-primary rounded focus:ring-primary"
              />
              <span className="text-sm font-medium">Publié</span>
            </label>
          </div>
        </div>

        <ImageUpload
          label="Image"
          value={form.image}
          onChange={(path) => setForm({ ...form, image: path })}
        />

        <div className="flex gap-3 pt-2">
          <Button type="submit">
            {isEditing ? 'Enregistrer' : 'Créer'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/blog')}
          >
            Annuler
          </Button>
        </div>
      </form>
    </Card>
  );
}
