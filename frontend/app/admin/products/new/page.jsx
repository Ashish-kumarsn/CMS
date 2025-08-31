
'use client'
import ProductForm from '@/components/ProductForm';

export default function NewProductPage() {
  return (
    <main className="space-y-4">
      <h2 className="text-xl font-semibold">Create Product</h2>
      <div className="card rounded-2xl p-4">
        <ProductForm mode="create" />
      </div>
    </main>
  );
}
