import React from 'react';
import { CATEGORIES } from '../data/mockData';

interface CategoryCirclesProps {
  selectedCategory: string | null;
  onSelectCategory: (slug: string | null) => void;
}

export const CategoryCircles: React.FC<CategoryCirclesProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section aria-label="Categorias em Destaque" className="mt-8 pb-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
            Categorias em Destaque
          </h2>
          <p className="text-xs text-gray-500">
            Encontra as melhores promoções e novidades por departamento
          </p>
        </div>
        {selectedCategory && (
          <button
            onClick={() => onSelectCategory(null)}
            className="text-xs font-bold text-[#df0000] hover:underline cursor-pointer"
          >
            Limpar Filtro ({selectedCategory})
          </button>
        )}
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-8 gap-4 text-center">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.slug;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(isSelected ? null : cat.slug)}
              className="group flex flex-col items-center focus:outline-none cursor-pointer"
            >
              <div 
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white p-2 flex items-center justify-center shadow-xs transition-all overflow-hidden relative ${
                  isSelected 
                    ? 'border-2 border-[#df0000] ring-4 ring-red-100 shadow-md scale-105' 
                    : 'border border-gray-200 group-hover:shadow-md group-hover:border-red-500'
                }`}
              >
                {cat.badge && (
                  <span className="absolute top-1 right-1 bg-[#df0000] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full z-10 leading-none shadow-xs">
                    {cat.badge}
                  </span>
                )}
                <img
                  src={cat.iconUrl}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className={`mt-2 text-xs font-semibold transition-colors ${
                isSelected ? 'text-[#df0000] font-bold' : 'text-gray-700 group-hover:text-red-600'
              }`}>
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
