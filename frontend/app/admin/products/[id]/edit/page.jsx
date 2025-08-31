'use client'
import { useEffect, useState } from 'react';
import ProductForm from '@/components/ProductForm';
import { usePathname } from 'next/navigation';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api';

export default function EditProductPage() {
  const pathname = usePathname();
  const id = pathname.split('/').filter(Boolean).at(-2); // /admin/products/:id/edit
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/products/${id}`);
        if (!res.ok) throw new Error('Not found');
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    if (id) load();
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        
        {/* Breadcrumb Card */}
        <div className="mb-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
            <nav className="flex items-center space-x-2 text-sm">
              <button className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                Dashboard
              </button>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <button className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                Products
              </button>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-600 font-medium">Edit Product</span>
            </nav>
          </div>
        </div>

        {/* Header Card */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Edit Product</h1>
                  <p className="text-indigo-100 mt-1">Product ID: #{id}</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={() => window.history.back()}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg border border-white/30 backdrop-blur-sm transition-all duration-300 flex items-center space-x-2 font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Back</span>
                </button>
                
                <button 
                  onClick={() => window.location.href = '/admin/products'}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg border border-white/30 backdrop-blur-sm transition-all duration-300 flex items-center space-x-2 font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span>All Products</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {loading ? (
          /* Loading Card */
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="relative mb-6">
                <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-600 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDelay: '0.5s'}}></div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Product</h3>
              <p className="text-gray-600 mb-6">Fetching product details...</p>
              
              {/* Loading Skeleton */}
              <div className="w-full max-w-2xl space-y-4">
                <div className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 h-4 rounded-full animate-pulse bg-[length:200%_100%] animate-[loading_1.5s_ease-in-out_infinite]"></div>
                <div className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 h-4 rounded-full animate-pulse bg-[length:200%_100%] animate-[loading_1.5s_ease-in-out_infinite] w-3/4" style={{animationDelay: '0.2s'}}></div>
                <div className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 h-4 rounded-full animate-pulse bg-[length:200%_100%] animate-[loading_1.5s_ease-in-out_infinite] w-1/2" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        ) : data ? (
          /* Product Form Card */
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Status Bar */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border-b border-gray-100 p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 rounded-full p-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Product Loaded Successfully</h3>
                  <p className="text-sm text-gray-600">Ready to edit product information</p>
                </div>
              </div>
            </div>
            
            {/* Form Container */}
            <div className="p-8">
              <ProductForm mode="edit" initial={data} />
            </div>
          </div>
        ) : (
          /* Error Card */
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="text-center py-12">
              <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Product Not Found</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                The product you're looking for doesn't exist or may have been removed from the system.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={() => window.history.back()}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Go Back</span>
                </button>
                
                <button 
                  onClick={() => window.location.href = '/admin/products'}
                  className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-semibold border border-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span>View All Products</span>
                </button>
                
                <button 
                  onClick={() => window.location.href = '/admin/products/new'}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Add New Product</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Info Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 rounded-lg p-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Need Help?</h4>
                <p className="text-sm text-gray-600">Check our documentation</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 rounded-lg p-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Auto-Save</h4>
                <p className="text-sm text-gray-600">Changes saved automatically</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 rounded-lg p-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Secure</h4>
                <p className="text-sm text-gray-600">All data is encrypted</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes loading {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}