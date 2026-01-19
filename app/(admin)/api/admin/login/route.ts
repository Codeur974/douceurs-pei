import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { AdminService } from '@/lib/services';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email et mot de passe requis' }, { status: 400 });
    }

    // Initialiser l'admin par défaut si aucun n'existe
    await AdminService.initializeDefault();

    const admin = await AdminService.verifyPassword(email, password);

    if (!admin) {
      return NextResponse.json({ error: 'Email ou mot de passe incorrect' }, { status: 401 });
    }

    const cookieStore = await cookies();
    const token = Buffer.from(`${admin.id}:${Date.now()}`).toString('base64');

    cookieStore.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    cookieStore.set('admin-id', admin.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    return NextResponse.json({ success: true, admin: { nom: admin.nom, email: admin.email } });
  } catch (error) {
    console.error('Erreur connexion admin:', error);
    return NextResponse.json({ error: 'Erreur lors de la connexion' }, { status: 500 });
  }
}
