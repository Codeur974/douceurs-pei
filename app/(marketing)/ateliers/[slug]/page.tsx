export default async function AtelierDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-primary capitalize">Atelier {slug}</h1>
      <div className="prose max-w-none">
        <p className="text-lg text-gray-700 mb-6">
          Découvrez tous les secrets de cet atelier et réservez votre place.
        </p>
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h2 className="text-2xl font-bold mb-4">Informations pratiques</h2>
          <ul className="space-y-2">
            <li><strong>Durée :</strong> 3 heures</li>
            <li><strong>Niveau :</strong> Tous niveaux</li>
            <li><strong>Participants :</strong> 6 maximum</li>
            <li><strong>Tarif :</strong> À partir de 75€</li>
          </ul>
        </div>
        <a 
          href="/reservation"
          className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg inline-block"
        >
          Réserver cet atelier
        </a>
      </div>
    </div>
  );
}
