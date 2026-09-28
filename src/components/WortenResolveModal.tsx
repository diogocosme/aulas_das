import React, { useState } from 'react';
import { X, Wrench, Search, ShieldCheck, CheckCircle2, Clock, Phone, Store, HelpCircle } from 'lucide-react';

interface WortenResolveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WortenResolveModal: React.FC<WortenResolveModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [trackingCode, setTrackingCode] = useState('WRT-8921');
  const [trackingResult, setTrackingResult] = useState<any>({
    code: 'WRT-8921',
    device: 'Apple iPhone 15 Pro 128GB Titânio',
    service: 'Substituição de Ecrã Original + Bateria',
    store: 'Loja Worten Colombo (Lisboa)',
    date: '14 Set 2026',
    step: 3, // 1: Recebido, 2: Diagnóstico, 3: Reparação Concluída, 4: Pronto
    estimatedPickup: 'Hoje às 17h30',
  });

  if (!isOpen) return null;

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingCode) return;
    setTrackingResult({
      code: trackingCode.toUpperCase(),
      device: 'Equipamento em Assistência Oficial Worten',
      service: 'Diagnóstico Eletrónico Avançado',
      store: 'Laboratório Central Worten Resolve',
      date: '15 Set 2026',
      step: 2,
      estimatedPickup: 'Amanhã às 14h00',
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-gray-100 overflow-hidden relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#df0000] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-black text-xl tracking-tight">Worten Resolve</h2>
                <span className="bg-white text-[#df0000] text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                  Oficial
                </span>
              </div>
              <p className="text-xs text-white/90">
                A tua assistência técnica de confiança para todas as marcas e equipamentos
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar Worten Resolve"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Tracking Form */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
            <h3 className="text-sm font-black text-gray-900 mb-1 flex items-center gap-1.5">
              <Search className="w-4 h-4 text-[#df0000]" />
              Consultar Estado da Reparação
            </h3>
            <p className="text-xs text-gray-500 mb-3">
              Introduz o código da tua folha de reparação para saber em tempo real o ponto de situação.
            </p>
            <form onSubmit={handleTrack} className="flex gap-2">
              <input
                type="text"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                placeholder="Ex: WRT-8921"
                className="flex-1 px-4 py-2 text-xs border border-gray-300 rounded-full font-mono uppercase focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
              />
              <button
                type="submit"
                className="bg-[#df0000] hover:bg-red-700 text-white font-bold text-xs px-6 py-2 rounded-full cursor-pointer transition-colors"
              >
                Consultar
              </button>
            </form>

            {/* Tracking Result Card */}
            {trackingResult && (
              <div className="mt-4 bg-white border border-gray-200 rounded-xl p-4 text-xs shadow-2xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-2">
                  <div>
                    <span className="font-mono font-black text-gray-900 block">{trackingResult.code}</span>
                    <span className="text-gray-500">{trackingResult.device}</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-[10px]">
                    Reparação Aprovada
                  </span>
                </div>

                {/* Progress Steps */}
                <div className="grid grid-cols-4 gap-2 pt-2 text-center text-[10px]">
                  {[
                    { label: 'Entregue', stepNum: 1 },
                    { label: 'Diagnóstico', stepNum: 2 },
                    { label: 'Concluído', stepNum: 3 },
                    { label: 'Pronto p/ Levantar', stepNum: 4 },
                  ].map((s) => {
                    const isDone = trackingResult.step >= s.stepNum;
                    return (
                      <div key={s.stepNum} className="flex flex-col items-center">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold mb-1 ${
                            isDone ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-400'
                          }`}
                        >
                          {isDone ? '✓' : s.stepNum}
                        </div>
                        <span className={isDone ? 'font-bold text-gray-900' : 'text-gray-400'}>
                          {s.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-emerald-50 text-emerald-900 p-2.5 rounded-lg flex items-center justify-between text-[11px]">
                  <span className="font-semibold">Previsão de Levantamento:</span>
                  <span className="font-black">{trackingResult.estimatedPickup} ({trackingResult.store})</span>
                </div>
              </div>
            )}
          </div>

          {/* 4 Pillars of Worten Resolve */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="border border-gray-200 rounded-2xl p-4 hover:border-red-300 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-red-50 text-[#df0000] flex items-center justify-center mb-2">
                <Wrench className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs text-gray-900">Reparação de Ecrãs e Baterias</h4>
              <p className="text-[11px] text-gray-500 mt-1 leading-normal">
                Peças de origem para iPhone, Samsung e Xiaomi. Reparações efetuadas em menos de 1 hora na loja.
              </p>
            </div>

            <div className="border border-gray-200 rounded-2xl p-4 hover:border-red-300 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs text-gray-900">Extensão de Garantia (+3 Anos)</h4>
              <p className="text-[11px] text-gray-500 mt-1 leading-normal">
                Protege o teu investimento para além da garantia legal de 3 anos com cobertura contra quebras e líquidos.
              </p>
            </div>

            <div className="border border-gray-200 rounded-2xl p-4 hover:border-red-300 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-2">
                <Store className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs text-gray-900">Instalação ao Domicílio</h4>
              <p className="text-[11px] text-gray-500 mt-1 leading-normal">
                Técnicos certificados para montagem de TVs na parede, ligação de placas de indução e frigoríficos.
              </p>
            </div>

            <div className="border border-gray-200 rounded-2xl p-4 hover:border-red-300 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                <Phone className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-xs text-gray-900">Linha de Apoio Expresso</h4>
              <p className="text-[11px] text-gray-500 mt-1 leading-normal">
                Disponível todos os dias das 8h às 23h através do número 210 155 222 com chamada direta.
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
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
