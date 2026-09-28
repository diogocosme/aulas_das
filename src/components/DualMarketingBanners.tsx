import React from 'react';
import { ArrowRight } from 'lucide-react';

interface DualMarketingBannersProps {
  onOpenMuseum: () => void;
  onOpenWortenLife: () => void;
}

export const DualMarketingBanners: React.FC<DualMarketingBannersProps> = ({
  onOpenMuseum,
  onOpenWortenLife,
}) => {
  return (
    <section aria-label="Programas e Iniciativas" className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Left Red Banner: Museu Worten 30 Anos */}
      <button
        type="button"
        onClick={onOpenMuseum}
        className="bg-[#d70016] rounded-2xl p-3 sm:px-6 flex items-center justify-between text-white hover:bg-red-700 transition-all shadow-xs group cursor-pointer text-left w-full"
      >
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Museo Worten Badge */}
          <div className="bg-white/95 text-[#d70016] px-3 py-1 rounded-full font-black text-xs sm:text-sm tracking-tight flex items-center gap-1 shadow-xs">
            <span>museu</span>
            <span className="bg-[#d70016] text-white px-2 py-0.5 rounded-full text-[10px] font-black uppercase">
              worten
            </span>
          </div>

          {/* 30 Anos Pill */}
          <div className="bg-red-900/60 border border-white/20 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
            <span className="font-black text-sm text-yellow-300">30 anos</span>
            <span className="text-white/90">de tecnologia</span>
          </div>
        </div>

        {/* Right Indicator Arrow */}
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
          <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
        </div>
      </button>

      {/* Right Lilac Banner: Parcerias Worten Life */}
      <button
        type="button"
        onClick={onOpenWortenLife}
        className="bg-[#f0e3fc] border border-[#e1ccfc] rounded-2xl p-3 sm:px-6 flex items-center justify-between text-[#2e004f] hover:bg-[#ebd9fc] transition-all shadow-xs group cursor-pointer text-left w-full"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Parcerias Worten Life Emblem */}
          <div className="flex flex-col text-[10px] font-black uppercase leading-none tracking-tight text-gray-700">
            <span>PARCERIAS</span>
            <span className="text-red-600 font-extrabold lowercase text-xs">worten</span>
          </div>
          <span className="text-red-500 font-serif italic text-2xl font-black">life</span>
          {/* Description */}
          <span className="text-xs sm:text-sm font-bold text-gray-900 pl-1">
            Acumula até 15% em Cartão Continente nos nossos parceiros
          </span>
        </div>

        {/* Right Indicator Arrow */}
        <div className="w-8 h-8 rounded-full bg-purple-200/50 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
          <ArrowRight className="w-4 h-4 text-gray-900 group-hover:translate-x-1 transition-transform" />
        </div>
      </button>
    </section>
  );
};
