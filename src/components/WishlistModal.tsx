import React from 'react';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveWishlist: (productId: string) => void;
  onMoveToCart: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveWishlist,
  onMoveToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-gray-100 overflow-hidden relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#df0000] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center">
              <Heart className="w-5 h-5 text-white fill-current" />
            </div>
            <div>
              <h2 className="font-black text-xl tracking-tight">Os Meus Favoritos</h2>
              <p className="text-xs text-white/90">
                Artigos que guardaste para acompanhar preços e promoções
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar favoritos"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-3">
          {wishlistProducts.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="font-bold text-gray-800 text-sm">Não tens artigos guardados</p>
              <p className="text-xs text-gray-500 mt-1">Clica no coração de qualquer produto para adicioná-lo à tua lista.</p>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between gap-4 p-3.5 rounded-2xl border border-gray-200 bg-white hover:border-gray-300 transition-all shadow-2xs"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 object-contain rounded-lg p-1 bg-gray-50 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-gray-900 truncate">
                    {product.title}
                  </h4>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-black text-sm text-gray-900 tabular-nums">
                      {product.price.toFixed(2).replace('.', ',')}€
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through tabular-nums">
                        {product.originalPrice.toFixed(2).replace('.', ',')}€
                      </span>
                    )}
                  </div>
                  {product.financingNote && (
                    <span className="text-[10px] text-emerald-700 font-semibold block">
                      {product.financingNote}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => onMoveToCart(product)}
                    title="Mover para o Carrinho"
                    className="bg-[#df0000] hover:bg-red-700 text-white text-xs font-bold px-3 py-2 rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Comprar</span>
                  </button>
                  <button
                    onClick={() => onRemoveWishlist(product.id)}
                    aria-label="Remover dos favoritos"
                    className="text-gray-400 hover:text-red-600 p-2 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-900 text-white text-xs font-bold px-6 py-2 rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
