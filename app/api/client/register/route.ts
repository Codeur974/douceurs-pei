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

async function saveClients(clients: Client[]): Promise<void> {
  await fs.writeFile(clientsPath, JSON.stringify(clients, null, 2));
}

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function POST(request: Request) {
  try {
    const { email, password, nom, prenom, telephone } = await request.json();

    if (!email || !password || !nom || !prenom) {
      return NextResponse.json(
        { error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    const clients = await getClients();

    // Vérifier si l'email existe déjà
    if (clients.find((c) => c.email === email)) {
      return NextResponse.json(
        { error: 'Cet email est déjà utilisé' },
        { status: 400 }
      );
    }

    // Créer le nouveau client
    const newClient: Client = {
      id: Date.now().toString(),
      email,
      password: hashPassword(password),
      nom,
      prenom,
      telephone: telephone || '',
      createdAt: new Date().toISOString(),
    };

    clients.push(newClient);
    await saveClients(clients);

    // Créer le cookie de session
    const cookieStore = await cookies();
    const token = Buffer.from(`${newClient.id}:${Date.now()}`).toString('base64');

    cookieStore.set('client-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 jours
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
    return NextResponse.json(
      { error: 'Erreur lors de l\'inscription' },
      { status: 500 }
    );
  }
}
