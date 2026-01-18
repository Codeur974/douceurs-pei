import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { password } = await request.json();

  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    console.error('ADMIN_PASSWORD non défini dans les variables d\'environnement');
    return NextResponse.json({ error: 'Configuration error' }, { status: 500 });
  }

  if (password === adminPassword) {
    const cookieStore = await cookies();

    // Créer un token simple (en production, utiliser un JWT)
    const token = Buffer.from(`admin:${Date.now()}`).toString('base64');

    cookieStore.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 heures
      path: '/',
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
}
