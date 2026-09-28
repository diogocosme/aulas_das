import React, { useState } from 'react';
import { Truck, CreditCard, RotateCcw, Store, BadgePercent, Check, X, ShieldCheck } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const [activeTrustModal, setActiveTrustModal] = useState<string | null>(null);

  const trustDetails: Record<string, { title: string; subtitle: string; fullDetails: string }> = {
    delivery: {
      title: 'Entregas Grátis > 35€',
      subtitle: 'pequenos formatos Worten',
      fullDetails: 'Envio grátis para Portugal Continental em encomendas de valor igual ou superior a 35€ expedidas pela Worten. Recebe comodamente na tua morada com tracking em tempo real por SMS.'
    },
    financing: {
      title: '10x s/juros >185€ TAEG 18,5%*',
      subtitle: '+ comissão e imposto selo',
      fullDetails: 'Campanha de crédito sem juros para montantes financiados a partir de 185€. TAEG 18,5%. Sujeito a aprovação da instituição de crédito Cetelem / Banco CTT parceiro.'
    },
    returns: {
      title: 'Devoluções grátis em loja',
      subtitle: 'Mais de 200 lojas em Portugal',
      fullDetails: 'Tens até 30 dias após a receção da encomenda para devolver gratuitamente em qualquer loja física Worten em Portugal Continental e Ilhas, sem burocracias.'
    },
    pickup: {
      title: 'Entregas grátis em loja',
      subtitle: 'Levantamento em 15 minutos',
      fullDetails: 'Encomenda online e levanta sem qualquer custo de transporte na tua loja favorita. Se o produto estiver em stock na loja, fica pronto para levantamento em apenas 15 minutos!'
    },
    price: {
      title: 'Preço mínimo garantido',
      subtitle: 'Igualamos o preço',
      fullDetails: 'Se encontrares o mesmo artigo novo e disponível a um preço inferior em qualquer concorrente oficial em Portugal, a Worten iguala o preço na hora ou devolve a diferença!'
    }
  };

  return (
    <>
      <section 
        aria-label="Garantias e Serviços Worten" 
        className="mt-4 bg-white rounded-2xl border border-gray-200 py-3.5 px-4 shadow-xs"
      >
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-2 divide-y md:divide-y-0 md:divide-x divide-gray-100 text-gray-800">
          {/* Badge 1: Entregas Grátis > 35€ */}
          <div 
            onClick={() => setActiveTrustModal('delivery')}
            className="flex items-center gap-3 px-2 pt-2 md:pt-0 cursor-pointer hover:bg-gray-50/70 p-1.5 rounded-lg transition-colors group"
          >
            <div className="text-teal-700 flex-shrink-0 group-hover:scale-110 transition-transform">
              <Truck className="w-7 h-7 stroke-[1.8]" />
            </div>
            <div className="text-xs">
              <span className="font-bold block text-gray-900 group-hover:text-red-600 transition-colors">
                Entregas Grátis &gt; 35€
              </span>
              <span className="text-gray-500 text-[11px]">pequenos formatos Worten</span>
            </div>
          </div>

          {/* Badge 2: Crédito sem juros */}
          <div 
            onClick={() => setActiveTrustModal('financing')}
            className="flex items-center gap-3 px-2 pt-2 md:pt-0 cursor-pointer hover:bg-gray-50/70 p-1.5 rounded-lg transition-colors group"
          >
            <div className="text-gray-800 flex-shrink-0 group-hover:scale-110 transition-transform">
              <CreditCard className="w-7 h-7 stroke-[1.8]" />
            </div>
            <div className="text-xs">
              <span className="font-bold block text-gray-900 group-hover:text-red-600 transition-colors">
                10x s/juros &gt;185€ TAEG 18,5%*
              </span>
              <span className="text-gray-500 text-[11px]">+ comissão e imposto selo</span>
            </div>
          </div>

          {/* Badge 3: Devoluções grátis */}
          <div 
            onClick={() => setActiveTrustModal('returns')}
            className="flex items-center gap-3 px-2 pt-2 md:pt-0 cursor-pointer hover:bg-gray-50/70 p-1.5 rounded-lg transition-colors group"
          >
            <div className="text-teal-700 flex-shrink-0 group-hover:scale-110 transition-transform">
              <RotateCcw className="w-7 h-7 stroke-[1.8]" />
            </div>
            <div className="text-xs">
              <span className="font-bold text-gray-900 block group-hover:text-red-600 transition-colors">
                Devoluções grátis em loja
              </span>
              <span className="text-gray-500 text-[11px]">30 dias sem custos</span>
            </div>
          </div>

          {/* Badge 4: Levantamento em loja */}
          <div 
            onClick={() => setActiveTrustModal('pickup')}
            className="flex items-center gap-3 px-2 pt-2 md:pt-0 cursor-pointer hover:bg-gray-50/70 p-1.5 rounded-lg transition-colors group"
          >
            <div className="text-teal-700 flex-shrink-0 group-hover:scale-110 transition-transform">
              <Store className="w-7 h-7 stroke-[1.8]" />
            </div>
            <div className="text-xs">
              <span className="font-bold text-gray-900 block group-hover:text-red-600 transition-colors">
                Entregas grátis em loja
              </span>
              <span className="text-gray-500 text-[11px]">pronto em 15 min</span>
            </div>
          </div>

          {/* Badge 5: Preço Mínimo Garantido */}
          <div 
            onClick={() => setActiveTrustModal('price')}
            className="flex items-center gap-3 px-2 pt-2 md:pt-0 cursor-pointer hover:bg-gray-50/70 p-1.5 rounded-lg transition-colors group"
          >
            <div className="text-gray-800 flex-shrink-0 group-hover:scale-110 transition-transform">
              <BadgePercent className="w-7 h-7 stroke-[1.8]" />
            </div>
            <div className="text-xs">
              <span className="font-bold text-gray-900 block group-hover:text-red-600 transition-colors">
                Preço mínimo garantido
              </span>
              <span className="text-gray-500 text-[11px]">igualamos na hora</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Details Modal */}
      {activeTrustModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-gray-100">
            <button
              onClick={() => setActiveTrustModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-50 text-[#df0000] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {trustDetails[activeTrustModal]?.title}
                </h3>
                <p className="text-xs text-gray-500">
                  {trustDetails[activeTrustModal]?.subtitle}
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed mb-6">
              {trustDetails[activeTrustModal]?.fullDetails}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setActiveTrustModal(null)}
                className="bg-[#df0000] text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-red-700 transition-colors cursor-pointer"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
