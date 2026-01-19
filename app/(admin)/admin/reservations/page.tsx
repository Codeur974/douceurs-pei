'use client';

import { useState, useEffect } from 'react';

interface Reservation {
  id: string;
  clientNom: string;
  clientEmail: string;
  clientTelephone: string;
  typePrestation: string;
  date: string;
  details?: string;
  statut: string;
  montant?: number;
  createdAt: string;
  client?: {
    id: string;
    nom: string;
    prenom: string;
    email: string;
  };
}

export default function AdminReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const res = await fetch('/api/reservation');
      const data = await res.json();
      setReservations(data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/reservation', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, statut: newStatus }),
      });

      if (res.ok) {
        fetchReservations();
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const filteredReservations = reservations.filter((r) => {
    if (filter === 'all') return true;
    return r.statut === filter;
  });

  const statutColors: Record<string, string> = {
    EN_ATTENTE: 'bg-yellow-100 text-yellow-800',
    CONFIRMEE: 'bg-green-100 text-green-800',
    ANNULEE: 'bg-red-100 text-red-800',
    TERMINEE: 'bg-gray-100 text-gray-800',
  };

  const statutLabels: Record<string, string> = {
    EN_ATTENTE: 'En attente',
    CONFIRMEE: 'Confirmée',
    ANNULEE: 'Annulée',
    TERMINEE: 'Terminée',
  };

  const prestationLabels: Record<string, string> = {
    PACK_DECOUVERTE: 'Pack Découverte',
    PACK_PREMIUM: 'Pack Premium',
    ATELIER: 'Atelier',
    SUR_MESURE: 'Sur Mesure',
  };

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Gestion des Réservations</h1>

      {/* Filtres */}
      <div className="mb-6 flex gap-2 flex-wrap">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            filter === 'all'
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Toutes ({reservations.length})
        </button>
        <button
          onClick={() => setFilter('EN_ATTENTE')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            filter === 'EN_ATTENTE'
              ? 'bg-yellow-500 text-white'
              : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
          }`}
        >
          En attente ({reservations.filter((r) => r.statut === 'EN_ATTENTE').length})
        </button>
        <button
          onClick={() => setFilter('CONFIRMEE')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            filter === 'CONFIRMEE'
              ? 'bg-green-500 text-white'
              : 'bg-green-100 text-green-800 hover:bg-green-200'
          }`}
        >
          Confirmées ({reservations.filter((r) => r.statut === 'CONFIRMEE').length})
        </button>
        <button
          onClick={() => setFilter('TERMINEE')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            filter === 'TERMINEE'
              ? 'bg-gray-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Terminées ({reservations.filter((r) => r.statut === 'TERMINEE').length})
        </button>
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {filteredReservations.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Aucune réservation
          </p>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Client</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Prestation</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Statut</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredReservations.map((reservation) => (
                <tr key={reservation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold">
                        {reservation.client
                          ? `${reservation.client.prenom} ${reservation.client.nom}`
                          : reservation.clientNom}
                      </p>
                      <p className="text-sm text-gray-600">{reservation.clientEmail}</p>
                      {reservation.clientTelephone && (
                        <p className="text-sm text-gray-500">{reservation.clientTelephone}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium">
                      {prestationLabels[reservation.typePrestation] || reservation.typePrestation}
                    </p>
                    {reservation.details && (
                      <p className="text-sm text-gray-500 max-w-xs truncate">
                        {reservation.details}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(reservation.date).toLocaleDateString('fr-FR', {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded ${statutColors[reservation.statut]}`}>
                      {statutLabels[reservation.statut]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {reservation.statut === 'EN_ATTENTE' && (
                        <>
                          <button
                            onClick={() => updateStatus(reservation.id, 'CONFIRMEE')}
                            className="text-green-600 hover:underline text-sm"
                          >
                            Confirmer
                          </button>
                          <button
                            onClick={() => updateStatus(reservation.id, 'ANNULEE')}
                            className="text-red-600 hover:underline text-sm"
                          >
                            Annuler
                          </button>
                        </>
                      )}
                      {reservation.statut === 'CONFIRMEE' && (
                        <button
                          onClick={() => updateStatus(reservation.id, 'TERMINEE')}
                          className="text-gray-600 hover:underline text-sm"
                        >
                          Terminer
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
