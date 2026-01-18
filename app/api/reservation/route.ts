import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const clientsPath = path.join(process.cwd(), 'data', 'clients.json');
const reservationsPath = path.join(process.cwd(), 'data', 'reservations.json');

interface Client {
  id: string;
  email: string;
  password: string;
  nom: string;
  prenom: string;
  telephone: string;
  createdAt: string;
}

interface Reservation {
  id: string;
  clientId: string;
  prestation: string;
  date: string;
  nom: string;
  email: string;
  telephone: string;
  details: string;
  status: 'en_attente' | 'confirmee' | 'annulee';
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

async function getReservations(): Promise<Reservation[]> {
  try {
    const data = await fs.readFile(reservationsPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveReservations(reservations: Reservation[]): Promise<void> {
  await fs.writeFile(reservationsPath, JSON.stringify(reservations, null, 2));
}

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function generatePassword(): string {
  // Génère un mot de passe de 8 caractères
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

export async function POST(request: Request) {
  try {
    const { prestation, date, nom, email, telephone, details } = await request.json();

    if (!prestation || !date || !nom || !email) {
      return NextResponse.json(
        { error: 'Veuillez remplir tous les champs obligatoires' },
        { status: 400 }
      );
    }

    const clients = await getClients();
    let client = clients.find((c) => c.email === email);
    let generatedPassword: string | null = null;
    let isNewClient = false;

    // Si le client n'existe pas, on le crée
    if (!client) {
      isNewClient = true;
      generatedPassword = generatePassword();

      // Séparer le nom complet en prénom et nom
      const nameParts = nom.trim().split(' ');
      const prenom = nameParts[0] || '';
      const nomFamille = nameParts.slice(1).join(' ') || nameParts[0] || '';

      client = {
        id: Date.now().toString(),
        email,
        password: hashPassword(generatedPassword),
        nom: nomFamille,
        prenom,
        telephone: telephone || '',
        createdAt: new Date().toISOString(),
      };

      clients.push(client);
      await saveClients(clients);
    }

    // Créer la réservation
    const reservations = await getReservations();
    const newReservation: Reservation = {
      id: Date.now().toString(),
      clientId: client.id,
      prestation,
      date,
      nom,
      email,
      telephone: telephone || '',
      details: details || '',
      status: 'en_attente',
      createdAt: new Date().toISOString(),
    };

    reservations.push(newReservation);
    await saveReservations(reservations);

    // Retourner les infos
    return NextResponse.json({
      success: true,
      isNewClient,
      credentials: isNewClient ? {
        email,
        password: generatedPassword,
      } : null,
      reservation: {
        id: newReservation.id,
        prestation,
        date,
      },
    });
  } catch (error) {
    console.error('Erreur réservation:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la réservation' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const reservations = await getReservations();
    return NextResponse.json(reservations);
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
