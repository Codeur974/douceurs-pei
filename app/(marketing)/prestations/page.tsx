export default function Prestations() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-primary">Nos Prestations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Pack Découverte</h2>
          <p className="text-gray-600 mb-4">Idéal pour découvrir nos créations</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>6 pâtisseries individuelles</li>
            <li>2 saveurs au choix</li>
            <li>Livraison incluse</li>
          </ul>
        </div>
        <div className="border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Pack Événement</h2>
          <p className="text-gray-600 mb-4">Pour vos occasions spéciales</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Gâteau personnalisé 8-10 personnes</li>
            <li>12 mini pâtisseries</li>
            <li>Décoration sur mesure</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
