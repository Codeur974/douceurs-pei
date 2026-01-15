export default function AdminAteliers() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestion des Ateliers</h1>
        <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-semibold">
          + Nouvel atelier
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Nom</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Durée</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Tarif</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Places max</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="px-6 py-4">Atelier Macarons</td>
              <td className="px-6 py-4">3h</td>
              <td className="px-6 py-4">75€</td>
              <td className="px-6 py-4">6</td>
              <td className="px-6 py-4">
                <button className="text-primary hover:underline mr-4">Modifier</button>
                <button className="text-red-600 hover:underline">Supprimer</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4">Atelier Tartes</td>
              <td className="px-6 py-4">3h</td>
              <td className="px-6 py-4">70€</td>
              <td className="px-6 py-4">6</td>
              <td className="px-6 py-4">
                <button className="text-primary hover:underline mr-4">Modifier</button>
                <button className="text-red-600 hover:underline">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
