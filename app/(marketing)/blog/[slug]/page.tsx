'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Nav } from '@/components/layout/Nav';
import { useArticlesStore } from '@/lib/stores';

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const { getArticleBySlug } = useArticlesStore();
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <div className="min-h-screen">
        <Nav />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Article non trouvé</h1>
          <Link href="/blog" className="text-primary hover:underline">
            ← Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Nav />
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/blog" className="text-primary hover:underline">
            ← Retour au blog
          </Link>
        </nav>

        <article className="max-w-3xl mx-auto">
          {/* En-tête */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                article.category === 'atelier'
                  ? 'bg-secondary/10 text-secondary'
                  : 'bg-primary/10 text-primary'
              }`}>
                {article.category === 'atelier' ? 'Atelier' : 'Article'}
              </span>
              <span className="text-gray-500">
                {new Date(article.date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
              {article.location && (
                <span className="text-gray-500 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {article.location}
                </span>
              )}
            </div>
            <h1 className="!text-3xl !font-bold text-primary mb-4 !font-sans">
              {article.title}
            </h1>
            <p className="text-xl text-gray-600">
              {article.excerpt}
            </p>
          </header>

          {/* Image placeholder */}
          <div className="relative h-64 md:h-96 bg-gray-200 rounded-lg mb-8 flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>

          {/* Contenu */}
          <div className="prose prose-lg max-w-none">
            {article.content.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return <h2 key={index} className="!text-2xl !font-bold mt-8 mb-4 text-primary !font-sans">{paragraph.slice(3)}</h2>;
              }
              if (paragraph.startsWith('### ')) {
                return <h3 key={index} className="!text-xl !font-semibold mt-6 mb-3 !font-sans">{paragraph.slice(4)}</h3>;
              }
              if (paragraph.startsWith('- ')) {
                return <li key={index} className="ml-4 text-gray-700">{paragraph.slice(2)}</li>;
              }
              if (paragraph.match(/^\d+\./)) {
                return <li key={index} className="ml-4 text-gray-700 list-decimal">{paragraph.slice(paragraph.indexOf('.') + 2)}</li>;
              }
              if (paragraph.trim()) {
                return <p key={index} className="text-gray-700 mb-4">{paragraph}</p>;
              }
              return null;
            })}
          </div>

          {/* CTA */}
          {article.category === 'atelier' && (
            <div className="mt-12 p-6 bg-secondary/5 rounded-lg border border-secondary/20">
              <h3 className="!text-xl !font-bold mb-2 !font-sans">Envie d&apos;un atelier chez vous ?</h3>
              <p className="text-gray-600 mb-4">
                Je me déplace à votre domicile pour animer un atelier pâtisserie sur mesure.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                Me contacter
              </Link>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
