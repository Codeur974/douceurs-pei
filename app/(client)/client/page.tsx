import { cookies } from 'next/headers';
import Link from 'next/link';
import { ClientsService, AteliersService, ReservationsService } from '@/lib/services';

export default async function ClientDashboard() {
  const cookieStore = await cookies();
  const clientId = cookieStore.get('client-id')?.value || '';

  const client = clientId ? await ClientsService.getById(clientId) : null;
  const ateliers = clientId ? await AteliersService.getClientAteliers(clientId) : [];
  const reservations = clientId ? await ReservationsService.getByClientId(clientId) : [];

  const prochainAtelier = ateliers
    .filter((a) => new Date(a.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  const prochaineReservation = reservations
    .filter((r) => new Date(r.date) >= new Date() && r.statut !== 'ANNULEE')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Bonjour {client?.prenom || 'Client'} !
      </h1>
      <p className="text-gray-600 mb-8">Bienvenue dans votre espace personnel</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-primary">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Mes Ateliers</h3>
          <p className="text-4xl font-bold text-primary mb-2">{ateliers.length}</p>
          <p className="text-gray-500 text-sm">ateliers réalisés</p>
          <Link href="/client/mes-ateliers" className="mt-4 inline-block text-primary hover:underline text-sm">
            Voir l'historique →
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-secondary">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Mes Recettes</h3>
          <p className="text-4xl font-bold text-secondary mb-2">
            {ateliers.reduce((acc, a) => acc + a.recettes.length, 0)}
          </p>
          <p className="text-gray-500 text-sm">recettes apprises</p>
          <Link href="/client/recettes" className="mt-4 inline-block text-secondary hover:underline text-sm">
            Voir les recettes →
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Prochain Atelier</h3>
          {prochainAtelier ? (
            <>
              <p className="text-xl font-bold text-blue-500 mb-2">
                {new Date(prochainAtelier.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
              </p>
              <p className="text-gray-500 text-sm">{prochainAtelier.type}</p>
            </>
          ) : prochaineReservation ? (
            <>
              <p className="text-xl font-bold text-blue-500 mb-2">
                {new Date(prochaineReservation.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
              </p>
              <p className="text-gray-500 text-sm">Réservation en attente</p>
            </>
          ) : (
            <>
              <p className="text-gray-500 mb-2">Aucun atelier prévu</p>
              <Link href="/reservation" className="mt-2 inline-block text-blue-500 hover:underline text-sm">
                Réserver un atelier →
              </Link>
            </>
          )}
        </div>
      </div>

      {ateliers.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Derniers ateliers</h3>
          <div className="space-y-4">
            {ateliers.slice(0, 3).map((atelier) => (
              <div key={atelier.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{atelier.type}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(atelier.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} à {atelier.heure}
                  </p>
                </div>
                <p className="text-sm text-gray-600">{atelier.recettes.join(', ')}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {reservations.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Mes réservations</h3>
          <div className="space-y-4">
            {reservations.slice(0, 3).map((reservation) => (
              <div key={reservation.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{reservation.typePrestation.replace('_', ' ')}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(reservation.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs ${
                  reservation.statut === 'CONFIRMEE' ? 'bg-green-100 text-green-700' :
                  reservation.statut === 'ANNULEE' ? 'bg-red-100 text-red-700' :
                  reservation.statut === 'TERMINEE' ? 'bg-gray-100 text-gray-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {reservation.statut === 'EN_ATTENTE' ? 'En attente' :
                   reservation.statut === 'CONFIRMEE' ? 'Confirmée' :
                   reservation.statut === 'ANNULEE' ? 'Annulée' : 'Terminée'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
