import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, CreditCard, ExternalLink } from 'lucide-react';

interface WortenLifeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WortenLifeModal: React.FC<WortenLifeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [continenteCardNumber, setContinenteCardNumber] = useState('1853 9021 4452 9011');
  const [isLinked, setIsLinked] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-gray-100 overflow-hidden relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#2e004f] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight text-white">Worten Life</span>
                <span className="text-red-500 font-serif italic text-2xl font-black">life</span>
              </div>
              <p className="text-xs text-purple-200">
                Parcerias exclusivas com Cartão Continente
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar Worten Life"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Card Linking Simulator */}
          <div className="bg-[#f0e3fc] border border-[#e1ccfc] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase tracking-wider text-purple-900">
                O Teu Cartão Continente
              </span>
              <span className="bg-purple-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {isLinked ? '✓ Associado à Conta' : 'Pendente'}
              </span>
            </div>

            <div className="bg-white rounded-xl p-3.5 border border-purple-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-gray-800 text-sm">
                  {continenteCardNumber}
                </span>
                <span className="text-xs font-bold text-emerald-700">Saldo: 42,50€</span>
              </div>
              <p className="text-[11px] text-gray-500">
                Todas as tuas compras na Worten acumulam saldo diretamente neste cartão, para descontares nas compras de supermercado Continente ou abastecimentos Galp.
              </p>
            </div>
          </div>

          {/* Partner Benefits */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-gray-700 mb-3">
              Vantagens em Parceiros Worten Life
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 border border-gray-200 rounded-xl hover:border-purple-300 transition-colors">
                <span className="font-black text-purple-900 block text-sm">Continente</span>
                <p className="text-[11px] text-gray-500 mt-0.5">Até 15% em cartão em tecnologia e eletrodomésticos selecionados.</p>
              </div>
              <div className="p-3 border border-gray-200 rounded-xl hover:border-purple-300 transition-colors">
                <span className="font-black text-purple-900 block text-sm">Galp Energia</span>
                <p className="text-[11px] text-gray-500 mt-0.5">Desconto até 14 cêntimos/litro em combustível Evologic.</p>
              </div>
              <div className="p-3 border border-gray-200 rounded-xl hover:border-purple-300 transition-colors">
                <span className="font-black text-purple-900 block text-sm">Wells Saúde</span>
                <p className="text-[11px] text-gray-500 mt-0.5">10% em Cartão Continente em produtos de ótica e bem-estar.</p>
              </div>
              <div className="p-3 border border-gray-200 rounded-xl hover:border-purple-300 transition-colors">
                <span className="font-black text-purple-900 block text-sm">Ginásios Solinca</span>
                <p className="text-[11px] text-gray-500 mt-0.5">Isenção da joia de inscrição e oferta da avaliação física inicial.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#2e004f] text-white text-xs font-bold px-6 py-2 rounded-full hover:bg-purple-950 transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
