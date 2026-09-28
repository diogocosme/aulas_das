import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  ShoppingCart, 
  Star, 
  Check, 
  Truck, 
  Store, 
  ShieldCheck, 
  Calculator, 
  Sparkles, 
  RefreshCw, 
  ChevronRight,
  Info
} from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, withWarranty: boolean) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [selectedMonths, setSelectedMonths] = useState<number>(product.financingMonths || 10);
  const [tradeInTier, setTradeInTier] = useState<string>('none');
  const [withWarranty, setWithWarranty] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'financing' | 'tradein'>('specs');

  // Trade-in discount calculations
  const tradeInEstimates: Record<string, number> = {
    none: 0,
    functional: Math.round((product.maxTradeInValue || 300) * 0.35),
    good: Math.round((product.maxTradeInValue || 300) * 0.65),
    flawless: product.maxTradeInValue || 300,
  };

  const tradeInDeduction = tradeInEstimates[tradeInTier] || 0;
  const finalPrice = Math.max(1, product.price - tradeInDeduction);
  const monthlyPayment = (finalPrice / selectedMonths).toFixed(2);
  const warrantyPrice = product.price > 500 ? 59.99 : 29.99;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full my-auto shadow-2xl border border-gray-100 overflow-hidden relative max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/70">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              {product.category}
            </span>
            {product.badge && (
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#df0000] text-white">
                {product.badge}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar detalhe do produto"
            className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:border-gray-400 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left: Product Images & Trust markers */}
            <div className="md:col-span-6 flex flex-col items-center justify-center bg-gray-50/50 rounded-2xl p-6 border border-gray-100 relative">
              <img
                src={product.image}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="max-h-72 object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300"
              />

              {/* Trust Strip under image */}
              <div className="w-full grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-gray-200/60 text-center text-gray-600 text-[11px]">
                <div className="flex flex-col items-center">
                  <Truck className="w-4 h-4 text-teal-700 mb-1" />
                  <span className="font-bold text-gray-900">Entrega Grátis</span>
                  <span className="text-[10px] text-gray-400">&gt; 35€ em 24h</span>
                </div>
                <div className="flex flex-col items-center border-x border-gray-200/60 px-1">
                  <Store className="w-4 h-4 text-teal-700 mb-1" />
                  <span className="font-bold text-gray-900">Em Loja</span>
                  <span className="text-[10px] text-gray-400">Pronto em 15min</span>
                </div>
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-4 h-4 text-teal-700 mb-1" />
                  <span className="font-bold text-gray-900">3 Anos</span>
                  <span className="text-[10px] text-gray-400">Garantia Worten</span>
                </div>
              </div>
            </div>

            {/* Right: Pricing, Financing, Trade-In & CTAs */}
            <div className="md:col-span-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-wider">
                    {product.brand}
                  </span>
                  <button
                    onClick={() => onToggleWishlist(product)}
                    className={`flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full transition-colors ${
                      isWishlisted ? 'bg-red-50 text-[#df0000]' : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                    <span>{isWishlisted ? 'Guardado' : 'Favorito'}</span>
                  </button>
                </div>

                <h1 className="text-lg sm:text-xl font-black text-gray-900 leading-snug mb-3">
                  {product.title}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-gray-800">{product.rating}</span>
                  <span className="text-xs text-gray-400">({product.reviewsCount} avaliações verificadas)</span>
                </div>

                {/* Main Price Block */}
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200/80 mb-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-black text-gray-900 tabular-nums">
                      {finalPrice.toFixed(2).replace('.', ',')}€
                    </span>
                    {tradeInDeduction > 0 && (
                      <span className="text-sm font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        -{tradeInDeduction}€ com Retoma
                      </span>
                    )}
                    {product.originalPrice && tradeInDeduction === 0 && (
                      <span className="text-sm text-gray-400 line-through tabular-nums">
                        {product.originalPrice.toFixed(2).replace('.', ',')}€
                      </span>
                    )}
                  </div>

                  {/* Financing Highlight */}
                  <div className="mt-2 pt-2 border-t border-gray-200/60 flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-900 flex items-center gap-1">
                      <Calculator className="w-3.5 h-3.5 text-[#df0000]" />
                      Até {selectedMonths}x s/ juros de {monthlyPayment}€/mês
                    </span>
                    <span className="text-[10px] text-gray-500 font-semibold">{product.taegRate || 'TAEG 18,5%*'}</span>
                  </div>
                </div>

                {/* Interactive Value Tabs: Financing vs Trade-In */}
                <div className="space-y-3 mb-4">
                  {/* Financing Selector */}
                  <div className="border border-gray-200 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                        <Calculator className="w-4 h-4 text-red-600" />
                        Simulador de Crédito Sem Juros
                      </span>
                      <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded">
                        0% Juros
                      </span>
                    </div>
                    <div className="grid grid-cols-5 gap-1.5">
                      {[3, 6, 10, 12, 24].map((months) => (
                        <button
                          key={months}
                          type="button"
                          onClick={() => setSelectedMonths(months)}
                          className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            selectedMonths === months
                              ? 'bg-[#df0000] text-white shadow-xs'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {months}x
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Trade-In Hook if eligible */}
                  {product.tradeInEligible && (
                    <div className="border border-emerald-200 bg-emerald-50/40 rounded-xl p-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                          <RefreshCw className="w-4 h-4 text-emerald-600" />
                          Simular Retoma do Equipamento Antigo
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                          Até {product.maxTradeInValue}€
                        </span>
                      </div>
                      <p className="text-[11px] text-emerald-800 mb-2">
                        Entrega o teu telemóvel ou portátil usado numa loja Worten e abate no preço final.
                      </p>
                      <div className="grid grid-cols-4 gap-1 text-[11px] font-semibold">
                        {[
                          { id: 'none', label: 'Sem Retoma', val: 0 },
                          { id: 'functional', label: 'Funcional', val: tradeInEstimates.functional },
                          { id: 'good', label: 'Bom Estado', val: tradeInEstimates.good },
                          { id: 'flawless', label: 'Como Novo', val: tradeInEstimates.flawless },
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setTradeInTier(opt.id)}
                            className={`py-1 px-1.5 rounded-md border text-center transition-all cursor-pointer ${
                              tradeInTier === opt.id
                                ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                                : 'bg-white text-gray-700 border-gray-200 hover:bg-emerald-50'
                            }`}
                          >
                            <div className="leading-tight">{opt.label}</div>
                            {opt.val > 0 && <div className="text-[10px] opacity-90">-{opt.val}€</div>}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Worten Resolve Warranty Add-on */}
                  <div className="border border-gray-200 rounded-xl p-3 flex items-center justify-between bg-white">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="warranty-checkbox"
                        checked={withWarranty}
                        onChange={(e) => setWithWarranty(e.target.checked)}
                        className="w-4 h-4 text-[#df0000] rounded focus:ring-red-500 cursor-pointer"
                      />
                      <label htmlFor="warranty-checkbox" className="text-xs text-gray-800 cursor-pointer">
                        <span className="font-bold block">Proteção Worten Resolve (+3 Anos)</span>
                        <span className="text-gray-500 text-[11px]">Danos acidentais e avarias após garantia</span>
                      </label>
                    </div>
                    <span className="text-xs font-bold text-gray-900">
                      +{warrantyPrice.toFixed(2).replace('.', ',')}€
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Actions: Quantity & Add to Cart */}
              <div className="pt-4 border-t border-gray-200 flex items-center gap-3">
                <div className="flex items-center border border-gray-200 rounded-full overflow-hidden bg-gray-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-200 font-bold text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-bold text-gray-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-200 font-bold text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => {
                    onAddToCart(product, quantity, withWarranty);
                    onClose();
                  }}
                  className="flex-1 bg-[#df0000] hover:bg-[#c50000] text-white font-extrabold text-sm py-3 px-6 rounded-full shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Adicionar ao Carrinho • {(finalPrice * quantity + (withWarranty ? warrantyPrice * quantity : 0)).toFixed(2).replace('.', ',')}€</span>
                </button>
              </div>
            </div>
          </div>

          {/* Description & Technical Specifications */}
          <div className="border-t border-gray-100 pt-6">
            <h2 className="text-sm font-black uppercase tracking-wider text-gray-900 mb-2">
              Descrição do Produto
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>

            <h2 className="text-sm font-black uppercase tracking-wider text-gray-900 mb-3">
              Especificações Técnicas
            </h2>
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200/80 divide-y divide-gray-200/60">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="py-2 flex items-center justify-between text-xs">
                  <span className="font-semibold text-gray-600">{key}</span>
                  <span className="font-bold text-gray-900 text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
