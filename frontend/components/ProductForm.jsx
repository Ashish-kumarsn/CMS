
'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api';

export default function ProductForm({ mode = 'create', initial = null }) {
  const router = useRouter();
  const [form, setForm] = useState({
    product_name: initial?.product_name || '',
    product_desc: initial?.product_desc || '',
    status: initial?.status || 'Draft',
    actor: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      if (mode === 'create') {
        const res = await fetch(`${API_BASE}/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            product_name: form.product_name,
            product_desc: form.product_desc,
            status: form.status,
            created_by: form.actor || 'unknown'
          })
        });
        if (!res.ok) throw new Error('Create failed');
      } else {
        const res = await fetch(`${API_BASE}/products/${initial.product_id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            product_name: form.product_name,
            product_desc: form.product_desc,
            status: form.status,
            updated_by: form.actor || 'unknown'
          })
        });
        if (!res.ok) throw new Error('Update failed');
      }
      router.push('/admin/products');
    } catch (e) {
      console.error(e);
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3 text-white">
      <div>
        <label className="block mb-1 text-sm opacity-80">Product Name</label>
        <input name="product_name" value={form.product_name} onChange={onChange} className="input" required />
      </div>
      <div>
        <label className="block mb-1 text-sm opacity-80">Description</label>
        <textarea name="product_desc" value={form.product_desc} onChange={onChange} className="input h-28" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block mb-1 text-sm opacity-80">Status</label>
          <select name="status" value={form.status} onChange={onChange} className="input">
            <option>Draft</option>
            <option>Published</option>
            <option>Archived</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm opacity-80">Your Name (for audit)</label>
          <input name="actor" value={form.actor} onChange={onChange} className="input" placeholder="e.g., admin" />
        </div>
      </div>
      {error && <p className="text-red-400">{error}</p>}
      <div className="flex gap-3">
        <button className="btn" disabled={loading}>{loading ? 'Saving...' : (mode === 'create' ? 'Create' : 'Save')}</button>
        <a href="/admin/products" className="btn-secondary">Cancel</a>
      </div>
    </form>
  );
}
