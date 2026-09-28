import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  CheckCircle2, 
  Truck, 
  CreditCard, 
  ShieldCheck, 
  Sparkles, 
  Tag 
} from 'lucide-react';
import { CartItem, Coupon } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  appliedCoupon: Coupon | null;
  onApplyCoupon: (code: string) => { success: boolean; message: string };
  onRemoveCoupon: () => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  onClearCart,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'mbway' | 'multibanco' | 'card' | 'cetelem'>('mbway');

  if (!isOpen) return null;

  // Subtotals
  const itemsSubtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const warrantySubtotal = items.reduce(
    (acc, item) => acc + (item.warrantyProtection && item.warrantyPrice ? item.warrantyPrice * item.quantity : 0),
    0
  );
  const grossTotal = itemsSubtotal + warrantySubtotal;

  // Discount calculation
  let couponDiscount = 0;
  if (appliedCoupon && grossTotal >= appliedCoupon.minSpend) {
    if (appliedCoupon.discountType === 'fixed') {
      couponDiscount = appliedCoupon.value;
    } else if (appliedCoupon.discountType === 'percent') {
      couponDiscount = (grossTotal * appliedCoupon.value) / 100;
    }
  }

  // Delivery
  const isFreeDelivery = grossTotal >= 35 || items.length === 0;
  const deliveryFee = isFreeDelivery ? 0 : 3.99;
  const deliveryThresholdDiff = Math.max(0, 35 - grossTotal);

  // Cartão Continente Cashback (15% on eligible partner spend)
  const continenteCashback = (grossTotal * 0.15).toFixed(2);

  const netTotal = Math.max(0, grossTotal - couponDiscount + deliveryFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = onApplyCoupon(couponInput.trim());
    setCouponFeedback(res);
  };

  const handleFinishOrder = () => {
    setOrderComplete(true);
    setTimeout(() => {
      onClearCart();
    }, 4000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex justify-end">
      <div className="bg-white w-full max-w-lg h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Cart Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#df0000]" />
            <h2 className="font-black text-gray-900 text-lg tracking-tight">
              O Teu Carrinho
            </h2>
            <span className="bg-red-100 text-[#df0000] text-xs font-extrabold px-2 py-0.5 rounded-full">
              {items.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar carrinho"
            className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Order Complete View */}
        {orderComplete ? (
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">
              Encomenda Confirmada!
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-4 max-w-sm">
              Obrigado pela tua compra na Worten.pt. Enviámos o comprovativo e o número de guia de rastreio para o teu email.
            </p>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 w-full text-left text-xs mb-6 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-gray-500">N.º da Encomenda:</span>
                <span className="font-mono font-bold text-gray-900">WRT-9842109</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Método de Envio:</span>
                <span className="font-bold text-gray-900">Entrega Rápida ao Domicílio</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Saldo Cartão Continente:</span>
                <span className="font-bold text-purple-700">+{continenteCashback}€ creditados</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 font-black text-sm">
                <span>Total Pago:</span>
                <span className="text-[#df0000]">{netTotal.toFixed(2).replace('.', ',')}€</span>
              </div>
            </div>
            <button
              onClick={() => {
                setOrderComplete(false);
                setIsCheckingOut(false);
                onClose();
              }}
              className="bg-[#df0000] text-white px-8 py-3 rounded-full text-xs font-bold hover:bg-red-700 transition-colors"
            >
              Continuar a Comprar
            </button>
          </div>
        ) : isCheckingOut ? (
          /* Checkout Step View */
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            <div>
              <button
                onClick={() => setIsCheckingOut(false)}
                className="text-xs font-bold text-gray-500 hover:text-gray-900 mb-2 flex items-center gap-1"
              >
                ← Voltar ao carrinho
              </button>
              <h3 className="text-lg font-black text-gray-900">
                Finalizar Compra Segura
              </h3>
              <p className="text-xs text-gray-500">
                Escolhe o método de pagamento e confirma a entrega
              </p>
            </div>

            {/* Delivery Details */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 text-xs space-y-2">
              <div className="flex items-center justify-between font-bold text-gray-900">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-teal-700" />
                  Morada de Entrega:
                </span>
                <span className="text-teal-700">Entrega Grátis</span>
              </div>
              <p className="text-gray-600">
                Avenida da Liberdade 120, 4º Dto<br />
                1250-142 Lisboa, Portugal
              </p>
            </div>

            {/* Payment Methods */}
            <div>
              <h4 className="text-xs font-black uppercase text-gray-700 mb-2">
                Método de Pagamento
              </h4>
              <div className="space-y-2">
                {[
                  { id: 'mbway', name: 'MB WAY', desc: 'Aprovação instantânea no telemóvel' },
                  { id: 'cetelem', name: 'Worten Financiamento 24x s/ juros', desc: 'Até 24x sem juros TAEG 18,5%' },
                  { id: 'multibanco', name: 'Referência Multibanco', desc: 'Pagamento em ATM ou Homebanking' },
                  { id: 'card', name: 'Cartão de Crédito / Débito', desc: 'Visa, Mastercard com 3D Secure' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`w-full p-3 rounded-xl border text-left flex items-start justify-between transition-all cursor-pointer ${
                      paymentMethod === m.id
                        ? 'border-[#df0000] bg-red-50/50 shadow-xs'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs text-gray-900">{m.name}</div>
                      <div className="text-[11px] text-gray-500">{m.desc}</div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      paymentMethod === m.id ? 'border-[#df0000] bg-[#df0000]' : 'border-gray-300'
                    }`}>
                      {paymentMethod === m.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Order Summary in Checkout */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 text-xs space-y-1.5">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal Artigos:</span>
                <span>{itemsSubtotal.toFixed(2).replace('.', ',')}€</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Desconto ({appliedCoupon?.code}):</span>
                  <span>-{couponDiscount.toFixed(2).replace('.', ',')}€</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Portes de Envio:</span>
                <span className="text-teal-700 font-bold">GRÁTIS</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 font-black text-sm text-gray-900">
                <span>Total a Pagar:</span>
                <span className="text-[#df0000]">{netTotal.toFixed(2).replace('.', ',')}€</span>
              </div>
            </div>

            <button
              onClick={handleFinishOrder}
              className="w-full bg-[#df0000] hover:bg-red-700 text-white font-extrabold text-sm py-3.5 rounded-full shadow-md transition-all active:scale-98 cursor-pointer"
            >
              Confirmar e Pagar ({netTotal.toFixed(2).replace('.', ',')}€)
            </button>
          </div>
        ) : (
          /* Normal Cart List View */
          <>
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {/* Free Delivery Meter */}
              <div className="bg-red-50/70 border border-red-100 rounded-2xl p-3.5">
                <div className="flex items-center justify-between text-xs font-bold text-gray-900 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#df0000]" />
                    {isFreeDelivery 
                      ? 'Parabéns! Tens Entregas Grátis em Casa' 
                      : `Faltam ${deliveryThresholdDiff.toFixed(2).replace('.', ',')}€ para Entrega Grátis!`}
                  </span>
                  <span className="text-[11px] text-gray-500 font-normal">Base: 35€</span>
                </div>
                <div className="w-full bg-red-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#df0000] h-full transition-all duration-500 rounded-full"
                    style={{ width: `${Math.min(100, (grossTotal / 35) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              {items.length === 0 ? (
                <div className="py-16 text-center">
                  <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="font-bold text-gray-800 text-sm">O teu carrinho está vazio</p>
                  <p className="text-xs text-gray-500 mt-1">Explora os destaques e adiciona as melhores ofertas.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="bg-white border border-gray-200 rounded-2xl p-3.5 flex gap-3 shadow-2xs relative"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        referrerPolicy="no-referrer"
                        className="w-18 h-18 object-contain rounded-lg p-1 bg-gray-50 border border-gray-100 flex-shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="text-xs font-bold text-gray-900 line-clamp-2 leading-tight">
                              {item.product.title}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              aria-label="Remover produto"
                              className="text-gray-400 hover:text-red-600 p-0.5 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="text-[11px] text-gray-500 block mt-0.5">
                            {item.product.brand}
                          </span>
                        </div>

                        {/* Warranty info tag */}
                        {item.warrantyProtection && (
                          <div className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1 font-semibold mt-1">
                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                            <span>Garantia Worten Resolve (+{item.warrantyPrice}€)</span>
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-2 pt-1 border-t border-gray-100">
                          {/* Quantity selector */}
                          <div className="flex items-center border border-gray-200 rounded-full overflow-hidden bg-gray-50">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                              className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-200 font-bold cursor-pointer"
                            >
                              -
                            </button>
                            <span className="px-2 py-0.5 text-xs font-bold text-gray-900 tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-200 font-bold cursor-pointer"
                            >
                              +
                            </button>
                          </div>

                          {/* Price */}
                          <span className="font-black text-sm text-gray-900 tabular-nums">
                            {((item.product.price + (item.warrantyProtection ? item.warrantyPrice || 0 : 0)) * item.quantity)
                              .toFixed(2)
                              .replace('.', ',')}€
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Worten Life Continente Box */}
              {items.length > 0 && (
                <div className="bg-[#f5eafd] border border-purple-200 rounded-2xl p-3 flex items-center justify-between text-xs text-purple-950">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <div>
                      <span className="font-bold block">Worten Life & Cartão Continente</span>
                      <span className="text-[11px] text-purple-800">Acumulas {continenteCashback}€ em saldo</span>
                    </div>
                  </div>
                  <span className="bg-purple-600 text-white font-black text-[10px] px-2 py-1 rounded-full">
                    15% Saldo
                  </span>
                </div>
              )}

              {/* Coupon Form */}
              {items.length > 0 && (
                <div className="bg-gray-50 rounded-2xl p-3.5 border border-gray-200">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-800 mb-2">
                    <Tag className="w-3.5 h-3.5 text-red-600" />
                    <span>Tens um cupão de desconto?</span>
                  </div>

                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-xs">
                      <div>
                        <span className="font-bold text-emerald-900 block">{appliedCoupon.code}</span>
                        <span className="text-[11px] text-emerald-700">{appliedCoupon.title}</span>
                      </div>
                      <button
                        onClick={onRemoveCoupon}
                        className="text-xs text-red-600 font-bold hover:underline cursor-pointer"
                      >
                        Remover
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        placeholder="Ex: REGRESSOAULAS"
                        className="flex-1 px-3 py-1.5 text-xs border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-red-500 uppercase font-mono"
                      />
                      <button
                        type="submit"
                        className="bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold px-4 py-1.5 rounded-full cursor-pointer transition-colors"
                      >
                        Aplicar
                      </button>
                    </form>
                  )}

                  {couponFeedback && (
                    <p className={`text-[11px] mt-1.5 font-semibold ${couponFeedback.success ? 'text-emerald-700' : 'text-red-600'}`}>
                      {couponFeedback.message}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {items.length > 0 && (
              <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50/80 space-y-3">
                <div className="space-y-1.5 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-bold text-gray-900 tabular-nums">
                      {grossTotal.toFixed(2).replace('.', ',')}€
                    </span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Desconto de Cupão:</span>
                      <span className="tabular-nums">-{couponDiscount.toFixed(2).replace('.', ',')}€</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Portes de Envio:</span>
                    <span className={`font-bold ${isFreeDelivery ? 'text-teal-700' : 'text-gray-900'}`}>
                      {isFreeDelivery ? 'GRÁTIS' : `${deliveryFee.toFixed(2).replace('.', ',')}€`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-gray-900 pt-2 border-t border-gray-200">
                    <span>Total Final:</span>
                    <span className="text-xl text-[#df0000] tabular-nums">
                      {netTotal.toFixed(2).replace('.', ',')}€
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full bg-[#df0000] hover:bg-[#c50000] active:scale-98 text-white font-extrabold text-sm py-3.5 rounded-full shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Avançar para o Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
