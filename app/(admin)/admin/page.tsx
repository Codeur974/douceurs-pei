import { ClientsService, ReservationsService, AteliersService } from '@/lib/services';
import Link from 'next/link';

export default async function AdminDashboard() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [reservationsCount, clientsCount, ateliersCount, recentReservations, chiffreAffaires] = await Promise.all([
    ReservationsService.count(),
    ClientsService.count(),
    AteliersService.count(),
    ReservationsService.getRecentReservations(5),
    ReservationsService.getChiffreAffaires(startOfMonth),
  ]);

  const reservationsMonth = await ReservationsService.count({ createdAt: { gte: startOfMonth } });

  const statutColors: Record<string, string> = {
    EN_ATTENTE: 'bg-yellow-100 text-yellow-800',
    CONFIRMEE: 'bg-green-100 text-green-800',
    ANNULEE: 'bg-red-100 text-red-800',
    TERMINEE: 'bg-gray-100 text-gray-800',
  };

  const statutLabels: Record<string, string> = {
    EN_ATTENTE: 'En attente', CONFIRMEE: 'Confirmée', ANNULEE: 'Annulée', TERMINEE: 'Terminée',
  };

  const prestationLabels: Record<string, string> = {
    PACK_DECOUVERTE: 'Pack Découverte', PACK_PREMIUM: 'Pack Premium', ATELIER: 'Atelier', SUR_MESURE: 'Sur Mesure',
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-600 text-sm font-semibold mb-2">Réservations du mois</h2>
          <p className="text-4xl font-bold text-primary">{reservationsMonth}</p>
          <p className="text-sm text-gray-500 mt-1">{reservationsCount} au total</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-600 text-sm font-semibold mb-2">Ateliers disponibles</h2>
          <p className="text-4xl font-bold text-secondary">{ateliersCount}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-600 text-sm font-semibold mb-2">Clients inscrits</h2>
          <p className="text-4xl font-bold text-blue-600">{clientsCount}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-600 text-sm font-semibold mb-2">CA du mois</h2>
          <p className="text-4xl font-bold text-green-600">{chiffreAffaires.toLocaleString('fr-FR')}€</p>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Réservations récentes</h2>
          <Link href="/admin/reservations" className="text-primary hover:underline text-sm">Voir tout →</Link>
        </div>
        {recentReservations.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Aucune réservation pour le moment</p>
        ) : (
          <div className="space-y-3">
            {recentReservations.map((reservation) => (
              <div key={reservation.id} className="border-b pb-3 last:border-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">
                      {reservation.client ? `${reservation.client.prenom} ${reservation.client.nom}` : reservation.clientNom}
                    </p>
                    <p className="text-sm text-gray-600">
                      {prestationLabels[reservation.typePrestation] || reservation.typePrestation} - {new Date(reservation.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${statutColors[reservation.statut]}`}>
                    {statutLabels[reservation.statut]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
