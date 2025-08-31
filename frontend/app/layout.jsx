import './globals.css';

export const metadata = {
  title: 'Products CMS',
  description: 'Simple CMS for managing products',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <div className="max-w-6xl mx-auto px-4 py-6">
          
          {/* HEADER */}
          <header className="bg-white rounded-lg shadow-sm border border-gray-200 px-6 py-4 flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">P</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                Products CMS
              </h1>
            </div>
            
            <nav className="flex items-center space-x-4">
              <a
                href="/"
                className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors font-medium"
              >
                Live Site
              </a>
              <a
                href="/admin/products"
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors font-medium"
              >
                Admin Panel
              </a>
            </nav>
          </header>
          
          {/* MAIN CONTENT */}
          <main className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 min-h-[600px]">
            {children}
          </main>
          
          {/* FOOTER */}
          <footer className="text-center text-sm text-gray-500 mt-6 py-4">
            <p>© {new Date().getFullYear()} Products Ashish. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}