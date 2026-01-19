import { prisma } from '@/lib/prisma';

export const GalerieService = {
  // Récupérer toutes les images
  async getAll() {
    return prisma.imageGalerie.findMany({
      orderBy: { ordre: 'asc' }
    });
  },

  // Récupérer une image par ID
  async getById(id: string) {
    return prisma.imageGalerie.findUnique({
      where: { id }
    });
  },

  // Ajouter une image
  async create(data: { src: string; title: string }) {
    const maxOrdre = await prisma.imageGalerie.aggregate({
      _max: { ordre: true }
    });

    return prisma.imageGalerie.create({
      data: {
        ...data,
        ordre: (maxOrdre._max.ordre || 0) + 1,
      }
    });
  },

  // Modifier le titre
  async updateTitle(id: string, title: string) {
    return prisma.imageGalerie.update({
      where: { id },
      data: { title }
    });
  },

  // Modifier l'ordre
  async updateOrdre(id: string, ordre: number) {
    return prisma.imageGalerie.update({
      where: { id },
      data: { ordre }
    });
  },

  // Supprimer une image
  async delete(id: string) {
    return prisma.imageGalerie.delete({ where: { id } });
  },

  // Compter les images
  async count() {
    return prisma.imageGalerie.count();
  }
};
