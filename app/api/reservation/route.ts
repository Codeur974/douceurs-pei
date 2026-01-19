import { NextResponse } from 'next/server';
import { ClientsService, ReservationsService } from '@/lib/services';
import { TypePrestation, StatutReservation } from '@prisma/client';

function generatePassword(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

const typePrestationMap: Record<string, TypePrestation> = {
  'pack-decouverte': 'PACK_DECOUVERTE',
  'pack-premium': 'PACK_PREMIUM',
  'atelier': 'ATELIER',
  'sur-mesure': 'SUR_MESURE',
};

const statutMap: Record<string, StatutReservation> = {
  'en-attente': 'EN_ATTENTE',
  'confirmee': 'CONFIRMEE',
  'annulee': 'ANNULEE',
  'terminee': 'TERMINEE',
  'EN_ATTENTE': 'EN_ATTENTE',
  'CONFIRMEE': 'CONFIRMEE',
  'ANNULEE': 'ANNULEE',
  'TERMINEE': 'TERMINEE',
};

export async function POST(request: Request) {
  try {
    const { prestation, date, nom, email, telephone, details } = await request.json();

    if (!prestation || !date || !nom || !email) {
      return NextResponse.json(
        { error: 'Veuillez remplir tous les champs obligatoires' },
        { status: 400 }
      );
    }

    let client = await ClientsService.getByEmail(email);
    let generatedPassword: string | null = null;
    let isNewClient = false;

    if (!client) {
      isNewClient = true;
      generatedPassword = generatePassword();

      const nameParts = nom.trim().split(' ');
      const prenom = nameParts[0] || '';
      const nomFamille = nameParts.slice(1).join(' ') || nameParts[0] || '';

      client = await ClientsService.create({
        email,
        password: generatedPassword,
        nom: nomFamille,
        prenom,
        telephone: telephone || undefined,
      });
    }

    const newReservation = await ReservationsService.create({
      clientNom: nom,
      clientEmail: email,
      clientTelephone: telephone || '',
      typePrestation: typePrestationMap[prestation] || 'SUR_MESURE',
      date: new Date(date),
      details: details || undefined,
      clientId: client.id,
    });

    return NextResponse.json({
      success: true,
      isNewClient,
      credentials: isNewClient ? { email, password: generatedPassword } : null,
      reservation: { id: newReservation.id, prestation, date },
    });
  } catch (error) {
    console.error('Erreur réservation:', error);
    return NextResponse.json({ error: 'Erreur lors de la réservation' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const reservations = await ReservationsService.getAll();
    return NextResponse.json(reservations);
  } catch (error) {
    console.error('Erreur GET reservations:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, statut, ...rest } = await request.json();

    const data: Record<string, unknown> = { ...rest };
    if (statut) {
      data.statut = statutMap[statut] || statut;
    }

    const reservation = await ReservationsService.update(id, data as Parameters<typeof ReservationsService.update>[1]);
    return NextResponse.json(reservation);
  } catch (error) {
    console.error('Erreur PUT reservation:', error);
    return NextResponse.json({ error: 'Erreur lors de la modification' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await ReservationsService.delete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur DELETE reservation:', error);
    return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 });
  }
}
