import { useState } from 'react';
import { Search, Filter, Star, ShoppingBag } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { Card } from '../components/ui/Card';

const products = [
  { name: 'MacBook Pro 13”', category: 'Laptop', price: '$2,399.00', rating: 4.8, stock: 42, img: '/images/MacBook.jpg' },
  { name: 'Apple Watch Ultra', category: 'Watch', price: '$879.00', rating: 4.6, stock: 18, img: '/images/Apple Watch.jpg' },
  { name: 'iPhone 15 Pro Max', category: 'Smartphone', price: '$1,869.00', rating: 4.9, stock: 65, img: '/images/Ihone 13.jpg' },
  { name: 'iPad Pro 3rd Gen', category: 'Electronics', price: '$1,699.00', rating: 4.7, stock: 0, img: '/images/ipad pro3rd gen.jpg' },
  { name: 'AirPods Pro 2nd Gen', category: 'Accessories', price: '$240.00', rating: 4.5, stock: 120, img: '/images/AirPoda Pro 2ND gEN.jpg' },
];

const categories = ['All', 'Laptop', 'Watch', 'Smartphone', 'Electronics', 'Accessories'];

export default function EcommerceMain() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = products.filter((p) =>
    (category === 'All' || p.category === category) && p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader
        eyebrow="Storefront"
        eyebrowIcon={<ShoppingBag size={14} />}
        title="E-commerce Catalog"
        subtitle="Browse, search, and manage every product listed in your store."
        gradient="from-blue-600 via-cyan-600 to-teal-600"
      />

      <Card className="p-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div className="relative flex-1 md:max-w-sm">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Search size={16} />
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Filter size={16} className="text-gray-400" />
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${category === c ? 'bg-blue-600 text-white' : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((p) => (
          <Card key={p.name} className="p-4 hover:shadow-md transition-shadow">
            <div className="h-40 w-full rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800 mb-4">
              <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-400">{p.category}</p>
                <h4 className="text-sm font-bold text-gray-800 dark:text-gray-100 mt-0.5">{p.name}</h4>
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded-full">
                <Star size={11} fill="currentColor" /> {p.rating}
              </span>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span className="text-base font-bold text-gray-800 dark:text-gray-100">{p.price}</span>
              <span className={`text-xs font-semibold ${p.stock === 0 ? 'text-red-500' : 'text-green-600 dark:text-green-400'}`}>
                {p.stock === 0 ? 'Out of stock' : `${p.stock} in stock`}
              </span>
            </div>
          </Card>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-16 text-gray-400 text-sm">No products match your search.</div>
        )}
      </div>
    </div>
  );
}
