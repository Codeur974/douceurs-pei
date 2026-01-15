import Link from 'next/link';

export default function Ateliers() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-primary">Nos Ateliers</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/ateliers/macarons" className="border rounded-lg p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-bold mb-2">Atelier Macarons</h2>
          <p className="text-gray-600">Maîtrisez l&apos;art des macarons parfaits</p>
        </Link>
        <Link href="/ateliers/tartes" className="border rounded-lg p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-bold mb-2">Atelier Tartes</h2>
          <p className="text-gray-600">Créez des tartes gourmandes</p>
        </Link>
        <Link href="/ateliers/cupcakes" className="border rounded-lg p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-bold mb-2">Atelier Cupcakes</h2>
          <p className="text-gray-600">Décorez vos cupcakes comme un pro</p>
        </Link>
      </div>
    </div>
  );
}
