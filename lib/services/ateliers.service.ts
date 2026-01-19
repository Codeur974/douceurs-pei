import { prisma } from '@/lib/prisma';
import { NiveauAtelier, StatutSessionAtelier } from '@prisma/client';

export const AteliersService = {
  // === ATELIERS ===

  // Récupérer tous les ateliers
  async getAll() {
    return prisma.atelier.findMany({
      orderBy: { nom: 'asc' },
      include: {
        sessions: {
          where: {
            date: { gte: new Date() },
            statut: 'PLANIFIE'
          },
          orderBy: { date: 'asc' }
        }
      }
    });
  },

  // Récupérer un atelier par ID
  async getById(id: string) {
    return prisma.atelier.findUnique({
      where: { id },
      include: { sessions: true }
    });
  },

  // Récupérer un atelier par slug
  async getBySlug(slug: string) {
    return prisma.atelier.findUnique({
      where: { slug },
      include: { sessions: true }
    });
  },

  // Créer un atelier
  async create(data: {
    nom: string;
    slug: string;
    description: string;
    duree: number;
    tarif: number;
    placesMax: number;
    imageUrl?: string;
    niveau: NiveauAtelier;
  }) {
    return prisma.atelier.create({ data });
  },

  // Mettre à jour un atelier
  async update(id: string, data: Partial<{
    nom: string;
    slug: string;
    description: string;
    duree: number;
    tarif: number;
    placesMax: number;
    imageUrl: string;
    niveau: NiveauAtelier;
  }>) {
    return prisma.atelier.update({
      where: { id },
      data
    });
  },

  // Supprimer un atelier
  async delete(id: string) {
    await prisma.sessionAtelier.deleteMany({ where: { atelierId: id } });
    return prisma.atelier.delete({ where: { id } });
  },

  // Compter les ateliers
  async count() {
    return prisma.atelier.count();
  },

  // === SESSIONS ===

  // Créer une session
  async createSession(data: {
    atelierId: string;
    date: Date;
    placesRestantes: number;
  }) {
    return prisma.sessionAtelier.create({
      data: {
        ...data,
        statut: 'PLANIFIE'
      }
    });
  },

  // Mettre à jour une session
  async updateSession(id: string, data: Partial<{
    date: Date;
    placesRestantes: number;
    statut: StatutSessionAtelier;
  }>) {
    return prisma.sessionAtelier.update({
      where: { id },
      data
    });
  },

  // === ATELIERS CLIENTS (Historique) ===

  // Récupérer les ateliers d'un client
  async getClientAteliers(clientId: string) {
    return prisma.atelierClient.findMany({
      where: { clientId },
      orderBy: { date: 'desc' }
    });
  },

  // Créer un atelier client
  async createClientAtelier(data: {
    clientId: string;
    date: Date;
    heure: string;
    duree: string;
    type: string;
    recettes: string[];
    notes?: string;
    atelierId?: string;
  }) {
    return prisma.atelierClient.create({ data });
  }
};
