import React, { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '../types';
import { SlidersHorizontal, ArrowUpDown, Sparkles, Zap } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  selectedCategory: string | null;
  searchQuery: string;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
  onClearFilters: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  searchQuery,
  onSelectProduct,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  onClearFilters,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'promos' | 'financing' | 'preorder'>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'discount'>('relevance');

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category filter
      if (selectedCategory && item.categorySlug !== selectedCategory) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchBrand = item.brand.toLowerCase().includes(q);
        const matchCategory = item.category.toLowerCase().includes(q);
        if (!matchTitle && !matchBrand && !matchCategory) return false;
      }
      // Pill tab filter
      if (filterType === 'promos') {
        return item.discountPercent && item.discountPercent > 0;
      }
      if (filterType === 'financing') {
        return (item.financingMonths || 0) >= 10;
      }
      if (filterType === 'preorder') {
        return item.isPreOrder;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'discount') return (b.discountPercent || 0) - (a.discountPercent || 0);
      return b.rating - a.rating;
    });
  }, [products, selectedCategory, searchQuery, filterType, sortBy]);

  return (
    <section className="mt-8 mb-12" id="produtos-destaque">
      {/* Header & Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              {searchQuery 
                ? `Resultados para "${searchQuery}"` 
                : selectedCategory 
                  ? `Artigos em ${selectedCategory.toUpperCase()}`
                  : 'Ofertas & Destaques Imperdíveis'}
            </h2>
            <span className="bg-red-100 text-[#df0000] text-xs font-black px-2.5 py-0.5 rounded-full">
              {filteredProducts.length} produtos
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Preços válidos nas datas assinaladas ou até ao limite do stock existente
          </p>
        </div>

        {/* Filter Pills & Sorting */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Quick Filter Buttons */}
          <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-full text-xs font-bold text-gray-700">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                filterType === 'all' 
                  ? 'bg-white text-[#df0000] shadow-xs' 
                  : 'hover:text-gray-900'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterType('promos')}
              className={`px-3 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                filterType === 'promos' 
                  ? 'bg-white text-[#df0000] shadow-xs' 
                  : 'hover:text-gray-900'
              }`}
            >
              <Zap className="w-3 h-3 text-red-500" />
              Com Desconto
            </button>
            <button
              onClick={() => setFilterType('financing')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                filterType === 'financing' 
                  ? 'bg-white text-[#df0000] shadow-xs' 
                  : 'hover:text-gray-900'
              }`}
            >
              Até 24x s/ Juros
            </button>
            <button
              onClick={() => setFilterType('preorder')}
              className={`px-3 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer ${
                filterType === 'preorder' 
                  ? 'bg-white text-[#df0000] shadow-xs' 
                  : 'hover:text-gray-900'
              }`}
            >
              <Sparkles className="w-3 h-3 text-yellow-500" />
              Pré-Vendas
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700 shadow-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent border-0 focus:ring-0 cursor-pointer pr-2 text-xs font-bold text-gray-800"
            >
              <option value="relevance">Mais Populares</option>
              <option value="price-asc">Preço: Baixo &gt; Alto</option>
              <option value="price-desc">Preço: Alto &gt; Baixo</option>
              <option value="discount">Maior Desconto %</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onAddToCart={onAddToCart}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
          <SlidersHorizontal className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-gray-900">
            Nenhum produto encontrado com os filtros atuais
          </h3>
          <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
            Tenta pesquisar por outro termo ou limpa os filtros ativos para ver todo o catálogo Worten.
          </p>
          <button
            onClick={onClearFilters}
            className="mt-4 bg-[#df0000] text-white text-xs font-bold px-6 py-2.5 rounded-full hover:bg-red-700 transition-colors cursor-pointer"
          >
            Limpar Todos os Filtros
          </button>
        </div>
      )}
    </section>
  );
};
