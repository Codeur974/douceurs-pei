import { PageLayout } from '@/components/layout/PageLayout';
import { Card } from '@/components/ui';

const faqs = [
  {
    question: "Quels sont les délais de livraison ?",
    reponse: "Nous livrons sous 48h pour les commandes standards et proposons une livraison express sous 24h.",
  },
  {
    question: "Proposez-vous des options sans allergènes ?",
    reponse: "Oui, nous pouvons adapter nos recettes pour les allergies courantes (gluten, lactose, fruits à coque).",
  },
  {
    question: "Comment se déroulent les ateliers ?",
    reponse: "Les ateliers durent 3h en petits groupes de 6 personnes maximum. Tout le matériel est fourni.",
  },
];

export default function FAQ() {
  return (
    <PageLayout title="Questions Fréquentes">
      <div className="max-w-3xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <Card key={index}>
            <h3 className="font-bold text-lg mb-3 text-secondary">{faq.question}</h3>
            <p className="text-gray-700">{faq.reponse}</p>
          </Card>
        ))}
      </div>
    </PageLayout>
  );
}
