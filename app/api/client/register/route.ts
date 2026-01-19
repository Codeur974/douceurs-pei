import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ClientsService } from '@/lib/services';

export async function POST(request: Request) {
  try {
    const { email, password, nom, prenom, telephone } = await request.json();

    if (!email || !password || !nom || !prenom) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    const existingClient = await ClientsService.getByEmail(email);
    if (existingClient) {
      return NextResponse.json({ error: 'Cet email est déjà utilisé' }, { status: 400 });
    }

    const newClient = await ClientsService.create({
      email,
      password,
      nom,
      prenom,
      telephone: telephone || undefined,
    });

    const cookieStore = await cookies();
    const token = Buffer.from(`${newClient.id}:${Date.now()}`).toString('base64');

    cookieStore.set('client-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    cookieStore.set('client-id', newClient.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur inscription:', error);
    return NextResponse.json({ error: 'Erreur lors de l\'inscription' }, { status: 500 });
  }
}
