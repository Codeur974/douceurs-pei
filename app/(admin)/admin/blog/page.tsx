'use client';

import Link from 'next/link';
import { useArticlesStore } from '@/lib/stores';
import { Button, Card } from '@/components/ui';

export default function AdminBlog() {
  const { articles, deleteArticle } = useArticlesStore();

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Supprimer l'article "${title}" ?`)) {
      deleteArticle(id);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Gestion du Blog</h1>
        <Link href="/admin/blog/nouveau">
          <Button>Nouvel article</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {articles.map((article) => (
          <Card key={article.id} className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="font-bold text-lg">{article.title}</h2>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  article.category === 'atelier'
                    ? 'bg-secondary/10 text-secondary'
                    : 'bg-primary/10 text-primary'
                }`}>
                  {article.category === 'atelier' ? 'Atelier' : 'Article'}
                </span>
                {!article.published && (
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-600">
                    Brouillon
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm">{article.excerpt}</p>
              <p className="text-gray-400 text-xs mt-1">
                {new Date(article.date).toLocaleDateString('fr-FR')}
                {article.location && ` • ${article.location}`}
              </p>
            </div>
            <div className="flex gap-2 ml-4">
              <Link href={`/admin/blog/${article.id}`}>
                <Button variant="outline" size="sm">Modifier</Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                className="!text-red-500 !border-red-500 hover:!bg-red-50"
                onClick={() => handleDelete(article.id, article.title)}
              >
                Supprimer
              </Button>
            </div>
          </Card>
        ))}

        {articles.length === 0 && (
          <p className="text-center text-gray-500 py-12">
            Aucun article. Créez votre premier article !
          </p>
        )}
      </div>
    </div>
  );
}
