import { prisma } from '@/lib/prisma';
import { Difficulte } from '@prisma/client';

export const RecettesService = {
  // Récupérer toutes les recettes
  async getAll() {
    return prisma.recette.findMany({
      orderBy: { titre: 'asc' }
    });
  },

  // Récupérer une recette par ID
  async getById(id: string) {
    return prisma.recette.findUnique({
      where: { id }
    });
  },

  // Créer une recette
  async create(data: {
    titre: string;
    description: string;
    image: string;
    difficulte: Difficulte;
    temps: string;
    ingredients: string[];
    etapes: { titre: string; description: string }[];
  }) {
    return prisma.recette.create({ data });
  },

  // Mettre à jour une recette
  async update(id: string, data: Partial<{
    titre: string;
    description: string;
    image: string;
    difficulte: Difficulte;
    temps: string;
    ingredients: string[];
    etapes: { titre: string; description: string }[];
  }>) {
    return prisma.recette.update({
      where: { id },
      data
    });
  },

  // Supprimer une recette
  async delete(id: string) {
    return prisma.recette.delete({ where: { id } });
  },

  // Compter les recettes
  async count() {
    return prisma.recette.count();
  }
};
