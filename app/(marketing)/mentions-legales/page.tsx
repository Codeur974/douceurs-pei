export default function MentionsLegales() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-primary">Mentions Légales</h1>
      <div className="prose max-w-none">
        <h2 className="text-2xl font-bold mt-6 mb-4">Éditeur du site</h2>
        <p className="text-gray-700">
          Pâtisserie à Domicile<br />
          [Adresse]<br />
          [Ville, Code Postal]<br />
          SIRET : [Numéro SIRET]
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">Hébergeur</h2>
        <p className="text-gray-700">
          [Nom de l'hébergeur]<br />
          [Adresse de l'hébergeur]
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">Protection des données</h2>
        <p className="text-gray-700">
          Les données collectées sur ce site sont utilisées uniquement dans le cadre de la gestion des commandes
          et ne sont en aucun cas transmises à des tiers.
        </p>
      </div>
    </div>
  );
}
