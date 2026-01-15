export default function AdminReservations() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Gestion des Réservations</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
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
            <tr>
              <td className="px-6 py-4">
                <div>
                  <p className="font-semibold">Marie Dupont</p>
                  <p className="text-sm text-gray-600">marie@example.com</p>
                </div>
              </td>
              <td className="px-6 py-4">Pack Premium</td>
              <td className="px-6 py-4">15/01/2026</td>
              <td className="px-6 py-4">
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">En attente</span>
              </td>
              <td className="px-6 py-4">
                <button className="text-primary hover:underline mr-4">Voir</button>
                <button className="text-green-600 hover:underline">Confirmer</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
