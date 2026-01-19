import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export const ClientsService = {
  // Récupérer tous les clients
  async getAll() {
    return prisma.client.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        nom: true,
        prenom: true,
        telephone: true,
        createdAt: true,
        _count: {
          select: {
            reservations: true,
            ateliersClients: true,
            avis: true,
          }
        }
      }
    });
  },

  // Récupérer un client par ID
  async getById(id: string) {
    return prisma.client.findUnique({
      where: { id }
    });
  },

  // Récupérer un client par email
  async getByEmail(email: string) {
    return prisma.client.findUnique({
      where: { email }
    });
  },

  // Créer un client
  async create(data: {
    email: string;
    password: string;
    nom: string;
    prenom: string;
    telephone?: string;
  }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return prisma.client.create({
      data: {
        ...data,
        password: hashedPassword,
        telephone: data.telephone || null,
      }
    });
  },

  // Vérifier le mot de passe
  async verifyPassword(email: string, password: string) {
    const client = await this.getByEmail(email);
    if (!client) return null;

    const isValid = await bcrypt.compare(password, client.password);
    return isValid ? client : null;
  },

  // Mettre à jour un client
  async update(id: string, data: Partial<{
    email: string;
    nom: string;
    prenom: string;
    telephone: string;
  }>) {
    return prisma.client.update({
      where: { id },
      data
    });
  },

  // Supprimer un client et ses données liées
  async delete(id: string) {
    await prisma.atelierClient.deleteMany({ where: { clientId: id } });
    await prisma.avis.deleteMany({ where: { clientId: id } });
    await prisma.reservation.deleteMany({ where: { clientId: id } });
    return prisma.client.delete({ where: { id } });
  },

  // Compter les clients
  async count() {
    return prisma.client.count();
  }
};
