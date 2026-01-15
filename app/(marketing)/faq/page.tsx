export default function FAQ() {
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

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">Questions Fréquentes</h1>
      <div className="max-w-3xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg p-6 bg-white">
            <h3 className="font-bold text-lg mb-3 text-secondary">{faq.question}</h3>
            <p className="text-gray-700">{faq.reponse}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
