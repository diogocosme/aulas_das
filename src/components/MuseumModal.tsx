import React, { useState } from 'react';
import { X, History, Sparkles, Award, ArrowRight } from 'lucide-react';

interface MuseumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MuseumModal: React.FC<MuseumModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeDecade, setActiveDecade] = useState<'1996' | '2005' | '2015' | '2026'>('1996');

  if (!isOpen) return null;

  const milestones = {
    '1996': {
      year: '1996',
      title: 'A Primeira Loja Worten em Chaves',
      desc: 'Nasce a Worten em Portugal! O país descobre a primeira grande superfície especializada em eletrodomésticos e eletrónica de consumo, com o clássico slogan "Tecnologia para Todos".',
      highlightItem: 'Disquetes 3.5" de 1.44MB & Computador Pentium 133MHz',
      funFact: 'O primeiro artigo vendido numa loja Worten foi uma televisão a cores de tubo CRT de 14 polegadas!',
    },
    '2005': {
      year: '2005',
      title: 'A Explosão dos Leitores MP3 & Ecrãs Planos',
      desc: 'A era dos primeiros telemóveis com câmara VGA, do lendário Nokia 3310, das consolas PlayStation 2 e das primeiras televisões plasma e LCD de alta definição.',
      highlightItem: 'Leitor MP3 USB 256MB e TV Plasma 42"',
      funFact: 'Em 2005, a Worten ultrapassou a marca de 100 lojas físicas abertas de norte a sul do país.',
    },
    '2015': {
      year: '2015',
      title: 'A Consolidação do E-Commerce Líder worten.pt',
      desc: 'A Worten.pt consolida-se como o maior marketplace e loja online de Portugal com click & collect em loja e entrega express no próprio dia.',
      highlightItem: 'Smartphones 4G, Drones e Smart TVs 4K',
      funFact: 'Mais de 60% dos portugueses compraram ou pesquisaram tecnologia na Worten.pt neste período.',
    },
    '2026': {
      year: '2026',
      title: '30 Anos de Tecnologia: IA, Retoma e Sustentabilidade',
      desc: 'Três décadas a ligar as famílias portuguesas à melhor inovação. Lançamento da retoma até 1500€, ecossistema Worten Resolve e computadores com Inteligência Artificial de última geração.',
      highlightItem: 'iPhone 18 Pro Titânio & Copilot+ AI PC',
      funFact: 'Mais de 2 milhões de aparelhos reciclados e reparados pelo serviço oficial Worten Resolve!',
    }
  };

  const current = milestones[activeDecade];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-gray-100 overflow-hidden relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#d70016] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center">
              <History className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-black text-xl tracking-tight">Museu Worten</h2>
                <span className="bg-white text-[#d70016] text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                  30 Anos
                </span>
              </div>
              <p className="text-xs text-white/90">
                Uma viagem pela evolução da tecnologia e dos hábitos em Portugal desde 1996
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar Museu Worten"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Timeline Decade Tabs */}
        <div className="bg-gray-100 p-2 flex gap-2 border-b border-gray-200">
          {(['1996', '2005', '2015', '2026'] as const).map((year) => (
            <button
              key={year}
              onClick={() => setActiveDecade(year)}
              className={`flex-1 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeDecade === year
                  ? 'bg-[#d70016] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 space-y-5">
          <div className="border border-red-100 bg-red-50/50 rounded-2xl p-5">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#d70016] block mb-1">
              MARCO HISTÓRICO WORTEN
            </span>
            <h3 className="text-lg font-black text-gray-900 mb-2">
              {current.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
              {current.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
              <span className="text-[10px] font-bold uppercase text-gray-400 block mb-1">
                Ícone da Época
              </span>
              <p className="text-xs font-bold text-gray-900">
                {current.highlightItem}
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
              <span className="text-[10px] font-bold uppercase text-gray-400 block mb-1">
                Sabias Que?
              </span>
              <p className="text-xs text-gray-700">
                {current.funFact}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-900 text-white text-xs font-bold px-6 py-2 rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Fechar Exposição
          </button>
        </div>
      </div>
    </div>
  );
};
