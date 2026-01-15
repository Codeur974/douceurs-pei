export default function Tarifs() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">Nos Tarifs</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="border-2 border-gray-200 rounded-lg p-8 hover:border-primary transition">
          <h2 className="text-2xl font-bold mb-4">Basic</h2>
          <p className="text-4xl font-bold text-primary mb-6">45€</p>
          <ul className="space-y-3 text-gray-700">
            <li>✓ 4 pâtisseries</li>
            <li>✓ 1 saveur</li>
            <li>✓ Livraison standard</li>
          </ul>
        </div>
        <div className="border-2 border-primary rounded-lg p-8 shadow-lg transform scale-105">
          <div className="bg-primary text-white text-sm font-bold py-1 px-3 rounded-full inline-block mb-4">
            Populaire
          </div>
          <h2 className="text-2xl font-bold mb-4">Premium</h2>
          <p className="text-4xl font-bold text-primary mb-6">89€</p>
          <ul className="space-y-3 text-gray-700">
            <li>✓ 8 pâtisseries</li>
            <li>✓ 3 saveurs</li>
            <li>✓ Livraison express</li>
            <li>✓ Personnalisation</li>
          </ul>
        </div>
        <div className="border-2 border-gray-200 rounded-lg p-8 hover:border-primary transition">
          <h2 className="text-2xl font-bold mb-4">Événement</h2>
          <p className="text-4xl font-bold text-primary mb-6">Sur devis</p>
          <ul className="space-y-3 text-gray-700">
            <li>✓ Quantité illimitée</li>
            <li>✓ Saveurs multiples</li>
            <li>✓ Création sur mesure</li>
            <li>✓ Service complet</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
