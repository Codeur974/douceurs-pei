import { prisma } from '@/lib/prisma';

export const AvisService = {
  // Récupérer tous les avis
  async getAll(valide?: boolean) {
    const where = valide !== undefined ? { valide } : undefined;

    return prisma.avis.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        client: {
          select: {
            id: true,
            nom: true,
            prenom: true,
          }
        },
        reservation: {
          select: {
            id: true,
            typePrestation: true,
            date: true,
          }
        }
      }
    });
  },

  // Récupérer les avis validés (pour affichage public)
  async getValidated() {
    return this.getAll(true);
  },

  // Récupérer un avis par ID
  async getById(id: string) {
    return prisma.avis.findUnique({
      where: { id },
      include: { client: true, reservation: true }
    });
  },

  // Créer un avis
  async create(data: {
    clientNom: string;
    note: number;
    commentaire: string;
    clientId?: string;
    reservationId?: string;
  }) {
    return prisma.avis.create({
      data: {
        ...data,
        valide: false, // Non validé par défaut
      }
    });
  },

  // Valider/Invalider un avis
  async setValidation(id: string, valide: boolean) {
    return prisma.avis.update({
      where: { id },
      data: { valide }
    });
  },

  // Mettre à jour un avis
  async update(id: string, data: Partial<{
    clientNom: string;
    note: number;
    commentaire: string;
    valide: boolean;
  }>) {
    return prisma.avis.update({
      where: { id },
      data
    });
  },

  // Supprimer un avis
  async delete(id: string) {
    return prisma.avis.delete({ where: { id } });
  },

  // Statistiques
  async getStats() {
    const avis = await prisma.avis.findMany({
      where: { valide: true },
      select: { note: true }
    });

    const total = avis.length;
    const moyenne = total > 0
      ? avis.reduce((acc, a) => acc + a.note, 0) / total
      : 0;

    return { total, moyenne: Math.round(moyenne * 10) / 10 };
  }
};
