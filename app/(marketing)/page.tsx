export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-primary to-primary-light text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Pâtisserie à Domicile</h1>
          <p className="text-xl mb-8">Des créations gourmandes livrées chez vous</p>
          <a 
            href="/reservation" 
            className="bg-secondary hover:bg-secondary-dark text-white px-8 py-3 rounded-lg text-lg font-semibold inline-block transition"
          >
            Réserver maintenant
          </a>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Nos Prestations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2 text-primary">Gâteaux sur mesure</h3>
            <p className="text-gray-600">Créations personnalisées pour vos événements</p>
          </div>
          <div className="border rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2 text-primary">Ateliers pâtisserie</h3>
            <p className="text-gray-600">Apprenez à créer vos propres desserts</p>
          </div>
          <div className="border rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2 text-primary">Buffets sucrés</h3>
            <p className="text-gray-600">Pour vos réceptions et fêtes</p>
          </div>
        </div>
      </section>
    </div>
  );
}
