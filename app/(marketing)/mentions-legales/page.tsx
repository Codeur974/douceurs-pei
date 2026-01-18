import { PageLayout } from '@/components/layout/PageLayout';

export default function MentionsLegales() {
  return (
    <PageLayout title="Mentions Légales">
      <div className="prose max-w-3xl mx-auto">
        <h2 className="!text-2xl !font-bold mt-6 mb-4 !font-sans">Éditeur du site</h2>
        <p className="text-gray-700">
          Pâtisserie à Domicile<br />
          [Adresse]<br />
          [Ville, Code Postal]<br />
          SIRET : [Numéro SIRET]
        </p>

        <h2 className="!text-2xl !font-bold mt-6 mb-4 !font-sans">Hébergeur</h2>
        <p className="text-gray-700">
          [Nom de l&apos;hébergeur]<br />
          [Adresse de l&apos;hébergeur]
        </p>

        <h2 className="!text-2xl !font-bold mt-6 mb-4 !font-sans">Protection des données</h2>
        <p className="text-gray-700">
          Les données collectées sur ce site sont utilisées uniquement dans le cadre de la gestion des commandes
          et ne sont en aucun cas transmises à des tiers.
        </p>
      </div>
    </PageLayout>
  );
}
