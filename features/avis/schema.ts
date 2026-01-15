import { z } from 'zod';

export const avisSchema = z.object({
  clientNom: z.string().min(2),
  note: z.number().min(1).max(5),
  commentaire: z.string().min(10, 'Le commentaire doit contenir au moins 10 caractères'),
  reservationId: z.string().optional(),
});

export type AvisInput = z.infer<typeof avisSchema>;
