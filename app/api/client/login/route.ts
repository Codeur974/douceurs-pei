import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const clientsPath = path.join(process.cwd(), 'data', 'clients.json');

interface Client {
  id: string;
  email: string;
  password: string;
  nom: string;
  prenom: string;
  telephone: string;
  createdAt: string;
}

async function getClients(): Promise<Client[]> {
  try {
    const data = await fs.readFile(clientsPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    const clients = await getClients();
    const client = clients.find(
      (c) => c.email === email && c.password === hashPassword(password)
    );

    if (!client) {
      return NextResponse.json(
        { error: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    // Créer le cookie de session
    const cookieStore = await cookies();
    const token = Buffer.from(`${client.id}:${Date.now()}`).toString('base64');

    cookieStore.set('client-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      path: '/',
    });

    cookieStore.set('client-id', client.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur connexion:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la connexion' },
      { status: 500 }
    );
  }
}
