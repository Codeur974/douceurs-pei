export default function Confirmation() {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-white rounded-lg shadow-md p-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-primary">Réservation confirmée !</h1>
        <p className="text-gray-700 mb-8">
          Votre demande de réservation a bien été enregistrée. Vous recevrez un email de confirmation
          dans quelques instants avec tous les détails.
        </p>
        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
          <h2 className="font-bold mb-4">Prochaines étapes :</h2>
          <ol className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="font-bold text-primary mr-2">1.</span>
              Vous recevrez un email de confirmation
            </li>
            <li className="flex items-start">
              <span className="font-bold text-primary mr-2">2.</span>
              Nous vous contacterons sous 24h pour finaliser les détails
            </li>
            <li className="flex items-start">
              <span className="font-bold text-primary mr-2">3.</span>
              Profitez de vos pâtisseries !
            </li>
          </ol>
        </div>
        <a 
          href="/"
          className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-semibold inline-block transition"
        >
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
}
