export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-600 text-sm font-semibold mb-2">
            Réservations du mois
          </h2>
          <p className="text-4xl font-bold text-primary">24</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-600 text-sm font-semibold mb-2">
            Ateliers planifiés
          </h2>
          <p className="text-4xl font-bold text-secondary">8</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-600 text-sm font-semibold mb-2">
            Chiffre d&apos;affaires
          </h2>
          <p className="text-4xl font-bold text-green-600">3,450€</p>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Réservations récentes</h2>
        <div className="space-y-3">
          <div className="border-b pb-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">Marie Dupont</p>
                <p className="text-sm text-gray-600">
                  Pack Premium - 15 janvier 2026
                </p>
              </div>
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                En attente
              </span>
            </div>
          </div>
          <div className="border-b pb-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">Pierre Martin</p>
                <p className="text-sm text-gray-600">
                  Atelier Macarons - 18 janvier 2026
                </p>
              </div>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                Confirmée
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
