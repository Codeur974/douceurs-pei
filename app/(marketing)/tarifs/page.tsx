import { Nav } from '@/components/layout/Nav';

export default function Tarifs() {
  return (
    <section
      className="min-h-screen relative bg-cover bg-center"
      style={{ backgroundImage: "url('/images/paribrest.jpg')" }}
    >
      <div className="absolute inset-0 bg-white/70"></div>
      <div className="relative z-10">
        <Nav />
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-12 text-center text-primary">
            Mes Tarifs
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-primary transition shadow-lg">
              <h2 className="text-2xl font-bold mb-2 text-stone-800">
                Atelier Découverte
              </h2>
              <p className="text-stone-500 mb-4">2 heures</p>
              <p className="text-4xl font-bold text-primary mb-6">60€</p>
              <ul className="space-y-3 text-gray-700">
                <li>✓ 1 recette au choix</li>
                <li>✓ Matériel du quotidien</li>
                <li>✓ Fiche recette incluse</li>
                <li>✓ Idéal pour débuter</li>
              </ul>
            </div>

            <div className="bg-white border-2 border-primary rounded-2xl p-8 shadow-xl transform md:scale-105">
              <div className="bg-primary text-white text-sm font-bold py-1 px-3 rounded-full inline-block mb-4">
                Populaire
              </div>
              <h2 className="text-2xl font-bold mb-2 text-stone-800">
                Atelier Classique
              </h2>
              <p className="text-stone-500 mb-4">3 heures</p>
              <p className="text-4xl font-bold text-primary mb-6">85€</p>
              <ul className="space-y-3 text-gray-700">
                <li>✓ 2 recettes au choix</li>
                <li>✓ Bases et techniques</li>
                <li>✓ Fiches recettes + astuces</li>
                <li>✓ Dégustation ensemble</li>
              </ul>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-primary transition shadow-lg">
              <h2 className="text-2xl font-bold mb-2 text-stone-800">
                Atelier Groupe
              </h2>
              <p className="text-stone-500 mb-4">3-4 heures</p>
              <p className="text-4xl font-bold text-primary mb-6">Sur devis</p>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Jusqu&apos;à 6 personnes</li>
                <li>✓ Programme personnalisé</li>
                <li>✓ EVJF, anniversaires, team building</li>
                <li>✓ Fourniture ingrédients possible</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
