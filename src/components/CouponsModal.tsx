import React from 'react';
import { X, Tag, Sparkles, CheckCircle, Clock } from 'lucide-react';
import { COUPONS } from '../data/mockData';
import { Coupon } from '../types';

interface CouponsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyCoupon: (code: string) => void;
  appliedCouponCode?: string;
}

export const CouponsModal: React.FC<CouponsModalProps> = ({
  isOpen,
  onClose,
  onApplyCoupon,
  appliedCouponCode,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-gray-100 overflow-hidden relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#df0000] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center">
              <Tag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-black text-xl tracking-tight">Cupões para ti</h2>
              <p className="text-xs text-white/90">
                Ativa os teus descontos exclusivos para descontar diretamente no carrinho
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar Cupões"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Coupons List */}
        <div className="overflow-y-auto p-6 space-y-4">
          {COUPONS.map((coupon) => {
            const isApplied = appliedCouponCode === coupon.code;
            return (
              <div
                key={coupon.code}
                className={`border rounded-2xl p-4 transition-all relative overflow-hidden flex flex-col justify-between ${
                  isApplied
                    ? 'border-emerald-500 bg-emerald-50/40 ring-2 ring-emerald-100'
                    : 'border-gray-200 bg-white hover:border-red-300 shadow-2xs'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono font-black text-sm text-[#df0000] bg-red-50 border border-red-200 px-2 py-0.5 rounded-md">
                        {coupon.code}
                      </span>
                      {coupon.discountType === 'cashback' && (
                        <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Worten Life
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-sm text-gray-900">{coupon.title}</h3>
                    <p className="text-xs text-gray-600 mt-0.5 leading-snug">{coupon.description}</p>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="text-2xl font-black text-gray-900 tabular-nums">
                      {coupon.discountType === 'percent'
                        ? `${coupon.value}%`
                        : coupon.discountType === 'cashback'
                        ? `${coupon.value}%`
                        : `-${coupon.value}€`}
                    </span>
                    <span className="block text-[10px] text-gray-400 font-semibold">
                      Mínimo {coupon.minSpend}€
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs mt-2">
                  <div className="flex items-center gap-1 text-[11px] text-gray-500">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>Válido até: {coupon.expiryDate}</span>
                  </div>

                  <button
                    onClick={() => {
                      onApplyCoupon(coupon.code);
                      onClose();
                    }}
                    className={`font-bold px-4 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                      isApplied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#df0000] hover:bg-red-700 text-white active:scale-95'
                    }`}
                  >
                    {isApplied ? '✓ Cupão Ativo' : 'Ativar no Carrinho'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-900 text-white text-xs font-bold px-6 py-2 rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Concluir
          </button>
        </div>
      </div>
    </div>
  );
};
