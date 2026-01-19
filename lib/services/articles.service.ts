import { prisma } from '@/lib/prisma';
import { CategorieArticle } from '@prisma/client';

export const ArticlesService = {
  // Récupérer tous les articles
  async getAll(options?: { published?: boolean; category?: CategorieArticle }) {
    const where: Record<string, unknown> = {};

    if (options?.published !== undefined) {
      where.published = options.published;
    }
    if (options?.category) {
      where.category = options.category;
    }

    return prisma.article.findMany({
      where,
      orderBy: { date: 'desc' }
    });
  },

  // Récupérer les articles publiés
  async getPublished() {
    return this.getAll({ published: true });
  },

  // Récupérer un article par ID
  async getById(id: string) {
    return prisma.article.findUnique({
      where: { id }
    });
  },

  // Récupérer un article par slug
  async getBySlug(slug: string) {
    return prisma.article.findUnique({
      where: { slug }
    });
  },

  // Créer un article
  async create(data: {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    category: CategorieArticle;
    date: Date;
    location?: string;
    published?: boolean;
  }) {
    return prisma.article.create({
      data: {
        ...data,
        published: data.published ?? false,
      }
    });
  },

  // Mettre à jour un article
  async update(id: string, data: Partial<{
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    category: CategorieArticle;
    date: Date;
    location: string;
    published: boolean;
  }>) {
    return prisma.article.update({
      where: { id },
      data
    });
  },

  // Supprimer un article
  async delete(id: string) {
    return prisma.article.delete({ where: { id } });
  },

  // Compter les articles
  async count(published?: boolean) {
    return prisma.article.count({
      where: published !== undefined ? { published } : undefined
    });
  }
};
