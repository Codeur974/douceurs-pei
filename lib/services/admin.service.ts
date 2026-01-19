import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export const AdminService = {
  async getByEmail(email: string) {
    return prisma.admin.findUnique({ where: { email } });
  },

  async verifyPassword(email: string, password: string) {
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) return null;

    const isValid = await bcrypt.compare(password, admin.password);
    return isValid ? admin : null;
  },

  async create(data: { email: string; password: string; nom: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return prisma.admin.create({
      data: {
        email: data.email,
        password: hashedPassword,
        nom: data.nom,
      },
    });
  },

  async getAll() {
    return prisma.admin.findMany({
      select: { id: true, email: true, nom: true, createdAt: true },
    });
  },

  async count() {
    return prisma.admin.count();
  },

  async initializeDefault() {
    const count = await prisma.admin.count();
    if (count === 0) {
      const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';
      await this.create({
        email: 'eric.sermande@gmail.com',
        password: defaultPassword,
        nom: 'Administrateur',
      });
      return true;
    }
    return false;
  },
};
