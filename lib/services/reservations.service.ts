import { prisma } from '@/lib/prisma';
import { StatutReservation, TypePrestation } from '@prisma/client';

export const ReservationsService = {
  // Récupérer toutes les réservations
  async getAll() {
    return prisma.reservation.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        client: {
          select: {
            id: true,
            nom: true,
            prenom: true,
            email: true,
          }
        }
      }
    });
  },

  // Récupérer les réservations d'un client
  async getByClientId(clientId: string) {
    return prisma.reservation.findMany({
      where: { clientId },
      orderBy: { date: 'desc' }
    });
  },

  // Récupérer une réservation par ID
  async getById(id: string) {
    return prisma.reservation.findUnique({
      where: { id },
      include: { client: true }
    });
  },

  // Créer une réservation
  async create(data: {
    clientNom: string;
    clientEmail: string;
    clientTelephone: string;
    typePrestation: TypePrestation;
    date: Date;
    details?: string;
    clientId?: string;
    montant?: number;
  }) {
    return prisma.reservation.create({
      data: {
        ...data,
        statut: 'EN_ATTENTE',
      }
    });
  },

  // Mettre à jour le statut
  async updateStatus(id: string, statut: StatutReservation) {
    return prisma.reservation.update({
      where: { id },
      data: { statut }
    });
  },

  // Mettre à jour une réservation
  async update(id: string, data: Partial<{
    date: Date;
    details: string;
    statut: StatutReservation;
    montant: number;
  }>) {
    return prisma.reservation.update({
      where: { id },
      data
    });
  },

  // Supprimer une réservation
  async delete(id: string) {
    return prisma.reservation.delete({ where: { id } });
  },

  // Statistiques
  async count(where?: { createdAt?: { gte: Date } }) {
    return prisma.reservation.count({ where });
  },

  async getRecentReservations(limit = 5) {
    return prisma.reservation.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        client: {
          select: { nom: true, prenom: true }
        }
      }
    });
  },

  async getChiffreAffaires(depuis: Date) {
    const reservations = await prisma.reservation.findMany({
      where: {
        createdAt: { gte: depuis },
        statut: { in: ['CONFIRMEE', 'TERMINEE'] }
      },
      select: { montant: true }
    });
    return reservations.reduce((acc, r) => acc + (r.montant || 0), 0);
  }
};
