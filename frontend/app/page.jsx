'use client'
import { useEffect, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api';

export default function HomePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/live/products`);
        const data = await res.json();
        setItems(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <main className="space-y-6 px-4 md:px-8 py-6">
      <h2 className="text-3xl font-extrabold text-gray-800 border-b-2 border-indigo-300 pb-2 mb-4">
        🚀 Live Products
      </h2>

      {loading ? (
        <p className="text-gray-600 text-lg">Loading products...</p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.length === 0 && (
            <p className="text-gray-500 col-span-full text-center mt-6">
              No published products yet.
            </p>
          )}

          {items.map(p => (
            <div
              key={p.product_id}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold text-indigo-700 mb-2">{p.product_name}</h3>
                <p className="text-gray-600">{p.product_desc || 'No description available.'}</p>
              </div>

              <span className="mt-4 text-sm font-medium text-gray-400">
                Status: {p.status || 'Draft'}
              </span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
