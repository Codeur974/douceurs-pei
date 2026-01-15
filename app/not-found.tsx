export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page non trouvée</h2>
        <p className="text-gray-600 mb-8">
          Désolé, la page que vous recherchez n'existe pas.
        </p>
        <a
          href="/"
          className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg inline-block transition"
        >
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
}
