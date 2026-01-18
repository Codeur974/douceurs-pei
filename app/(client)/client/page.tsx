import { cookies } from 'next/headers';
import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

interface Client {
  id: string;
  email: string;
  nom: string;
  prenom: string;
  telephone: string;
  createdAt: string;
}

interface Atelier {
  id: string;
  clientId: string;
  date: string;
  heure: string;
  duree: string;
  type: string;
  recettes: string[];
  notes: string;
}

async function getClient(clientId: string): Promise<Client | null> {
  try {
    const data = await fs.readFile(
      path.join(process.cwd(), 'data', 'clients.json'),
      'utf-8'
    );
    const clients: Client[] = JSON.parse(data);
    return clients.find((c) => c.id === clientId) || null;
  } catch {
    return null;
  }
}

async function getClientAteliers(clientId: string): Promise<Atelier[]> {
  try {
    const data = await fs.readFile(
      path.join(process.cwd(), 'data', 'ateliers-clients.json'),
      'utf-8'
    );
    const ateliers: Atelier[] = JSON.parse(data);
    return ateliers.filter((a) => a.clientId === clientId);
  } catch {
    return [];
  }
}

export default async function ClientDashboard() {
  const cookieStore = await cookies();
  const clientId = cookieStore.get('client-id')?.value || '';
  const client = await getClient(clientId);
  const ateliers = await getClientAteliers(clientId);

  const prochainAtelier = ateliers
    .filter((a) => new Date(a.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Bonjour {client?.prenom || 'Client'} !
      </h1>
      <p className="text-gray-600 mb-8">
        Bienvenue dans votre espace personnel
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Carte Ateliers */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-primary">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Mes Ateliers</h3>
          <p className="text-4xl font-bold text-primary mb-2">{ateliers.length}</p>
          <p className="text-gray-500 text-sm">ateliers réalisés</p>
          <Link
            href="/client/mes-ateliers"
            className="mt-4 inline-block text-primary hover:underline text-sm"
          >
            Voir l'historique →
          </Link>
        </div>

        {/* Carte Recettes */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-secondary">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Mes Recettes</h3>
          <p className="text-4xl font-bold text-secondary mb-2">
            {ateliers.reduce((acc, a) => acc + a.recettes.length, 0)}
          </p>
          <p className="text-gray-500 text-sm">recettes apprises</p>
          <Link
            href="/client/recettes"
            className="mt-4 inline-block text-secondary hover:underline text-sm"
          >
            Voir les recettes →
          </Link>
        </div>

        {/* Carte Prochain Atelier */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Prochain Atelier</h3>
          {prochainAtelier ? (
            <>
              <p className="text-xl font-bold text-blue-500 mb-2">
                {new Date(prochainAtelier.date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                })}
              </p>
              <p className="text-gray-500 text-sm">{prochainAtelier.type}</p>
            </>
          ) : (
            <>
              <p className="text-gray-500 mb-2">Aucun atelier prévu</p>
              <Link
                href="/reservation"
                className="mt-2 inline-block text-blue-500 hover:underline text-sm"
              >
                Réserver un atelier →
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Derniers ateliers */}
      {ateliers.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Derniers ateliers</h3>
          <div className="space-y-4">
            {ateliers.slice(0, 3).map((atelier) => (
              <div
                key={atelier.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-800">{atelier.type}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(atelier.date).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })} à {atelier.heure}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">
                    {atelier.recettes.join(', ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
