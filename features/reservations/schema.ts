import { z } from 'zod';

export const reservationSchema = z.object({
  clientNom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  clientEmail: z.string().email('Email invalide'),
  clientTelephone: z.string().regex(/^[0-9]{10}$/, 'Numéro de téléphone invalide'),
  typePrestation: z.enum(['pack-decouverte', 'pack-premium', 'atelier', 'sur-mesure']),
  date: z.string().or(z.date()),
  details: z.string().optional(),
});

export type ReservationInput = z.infer<typeof reservationSchema>;
