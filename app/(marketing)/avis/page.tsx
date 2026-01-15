export default function Avis() {
  const avis = [
    { nom: "Marie L.", note: 5, commentaire: "Des pâtisseries exceptionnelles ! Le gâteau était délicieux." },
    { nom: "Pierre D.", note: 5, commentaire: "Service impeccable et créations magnifiques." },
    { nom: "Sophie M.", note: 5, commentaire: "L'atelier macarons était super, j'ai adoré !" },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">Avis Clients</h1>
      <div className="max-w-4xl mx-auto space-y-6">
        {avis.map((item, index) => (
          <div key={index} className="border rounded-lg p-6 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">{item.nom}</h3>
              <div className="flex text-yellow-400">
                {[...Array(item.note)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
            </div>
            <p className="text-gray-700">{item.commentaire}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
