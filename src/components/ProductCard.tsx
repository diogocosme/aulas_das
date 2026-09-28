import React from 'react';
import { Heart, ShoppingCart, Star, Check, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const badgeBg = {
    red: 'bg-[#df0000] text-white',
    terracotta: 'bg-[#d8583b] text-white',
    black: 'bg-gray-900 text-white',
    blue: 'bg-blue-700 text-white',
  }[product.badgeColor || 'red'];

  return (
    <article
      onClick={() => onSelect(product)}
      className="bg-white rounded-2xl border border-gray-200/80 p-4 shadow-xs hover:shadow-xl hover:border-gray-300 transition-all duration-300 flex flex-col justify-between group cursor-pointer relative"
    >
      {/* Top Section: Badges & Wishlist */}
      <div className="flex items-start justify-between gap-2 mb-2 z-10">
        <div className="flex flex-col gap-1 items-start">
          {product.badge && (
            <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${badgeBg} shadow-xs`}>
              {product.badge}
            </span>
          )}
          {product.financingMonths && (
            <span className="text-[9px] font-bold text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded">
              {product.financingMonths}x s/ juros
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={(e) => onToggleWishlist(product, e)}
          aria-label={isWishlisted ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isWishlisted 
              ? 'text-[#df0000] bg-red-50' 
              : 'text-gray-400 hover:text-[#df0000] hover:bg-gray-100'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Image */}
      <div className="relative w-full h-44 flex items-center justify-center p-2 mb-3 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          referrerPolicy="no-referrer"
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-xs"
        />
        {product.isPreOrder && (
          <div className="absolute bottom-1 left-2 bg-black/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-yellow-400" />
            <span>Pré-Venda</span>
          </div>
        )}
      </div>

      {/* Brand & Title */}
      <div className="mb-2">
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">
          {product.brand}
        </span>
        <h3 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-[#df0000] transition-colors mt-0.5">
          {product.title}
        </h3>
      </div>

      {/* Rating & Reviews */}
      <div className="flex items-center gap-1 mb-3">
        <div className="flex text-amber-400">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`}
            />
          ))}
        </div>
        <span className="text-[11px] font-bold text-gray-700">
          {product.rating}
        </span>
        <span className="text-[11px] text-gray-400">
          ({product.reviewsCount})
        </span>
      </div>

      {/* Pricing and Financing */}
      <div className="pt-2 border-t border-gray-100 mb-3">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight tabular-nums">
            {product.price.toFixed(2).replace('.', ',')}€
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through tabular-nums">
              {product.originalPrice.toFixed(2).replace('.', ',')}€
            </span>
          )}
        </div>

        {/* Financing Hook */}
        {product.financingNote && (
          <p className="text-[11px] font-semibold text-emerald-700 mt-0.5">
            {product.financingNote}
          </p>
        )}

        {/* Delivery Hook */}
        <div className="flex items-center gap-1 text-[10px] text-gray-500 mt-1">
          <Check className="w-3 h-3 text-emerald-600" />
          <span>{product.price >= 35 ? 'Entrega Grátis em Casa' : 'Levantamento Grátis em Loja'}</span>
        </div>
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={(e) => onAddToCart(product, e)}
        className="w-full bg-[#df0000] hover:bg-[#c50000] active:scale-98 text-white font-bold text-xs py-2.5 rounded-full flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
      >
        <ShoppingCart className="w-3.5 h-3.5" />
        <span>Adicionar</span>
      </button>
    </article>
  );
};
