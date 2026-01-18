import { cookies } from 'next/headers';
import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

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

async function getClientAteliers(clientId: string): Promise<Atelier[]> {
  try {
    const data = await fs.readFile(
      path.join(process.cwd(), 'data', 'ateliers-clients.json'),
      'utf-8'
    );
    const ateliers: Atelier[] = JSON.parse(data);
    return ateliers
      .filter((a) => a.clientId === clientId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    return [];
  }
}

export default async function MesAteliersPage() {
  const cookieStore = await cookies();
  const clientId = cookieStore.get('client-id')?.value || '';
  const ateliers = await getClientAteliers(clientId);

  const ateliersPasses = ateliers.filter((a) => new Date(a.date) < new Date());
  const ateliersAVenir = ateliers.filter((a) => new Date(a.date) >= new Date());

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Mes Ateliers</h1>
          <p className="text-gray-600">
            Historique de tous vos ateliers de pâtisserie
          </p>
        </div>
        <Link
          href="/reservation"
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition"
        >
          Réserver un atelier
        </Link>
      </div>

      {/* Ateliers à venir */}
      {ateliersAVenir.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
            Ateliers à venir
          </h2>
          <div className="space-y-4">
            {ateliersAVenir.map((atelier) => (
              <div
                key={atelier.id}
                className="bg-blue-50 border border-blue-200 rounded-xl p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {atelier.type}
                    </h3>
                    <p className="text-blue-600 font-medium">
                      {new Date(atelier.date).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })} à {atelier.heure}
                    </p>
                  </div>
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                    À venir
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Durée :</span> {atelier.duree}
                  </p>
                  <p className="text-gray-600 text-sm">
                    <span className="font-medium">Recettes prévues :</span>{' '}
                    {atelier.recettes.join(', ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ateliers passés */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
          Ateliers réalisés ({ateliersPasses.length})
        </h2>

        {ateliersPasses.length === 0 ? (
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <p className="text-gray-500 mb-4">
              Vous n'avez pas encore réalisé d'atelier
            </p>
            <Link
              href="/reservation"
              className="text-primary hover:underline"
            >
              Réserver votre premier atelier →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {ateliersPasses.map((atelier) => (
              <div
                key={atelier.id}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {atelier.type}
                    </h3>
                    <p className="text-gray-500">
                      {new Date(atelier.date).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })} à {atelier.heure}
                    </p>
                  </div>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    Réalisé
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Durée</p>
                    <p className="text-gray-800">{atelier.duree}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Recettes réalisées</p>
                    <div className="flex flex-wrap gap-2">
                      {atelier.recettes.map((recette, i) => (
                        <span
                          key={i}
                          className="bg-primary/10 text-primary px-2 py-1 rounded text-sm"
                        >
                          {recette}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {atelier.notes && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-gray-500 mb-1">Notes</p>
                    <p className="text-gray-600 text-sm">{atelier.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
