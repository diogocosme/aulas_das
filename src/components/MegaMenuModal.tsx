import React from 'react';
import { X, ChevronRight, Sparkles, Tag, Wrench, Shield, Laptop, Smartphone, Tv, WashingMachine, Dumbbell, Flower2, Hammer, Baby, Smile, Armchair } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

interface MegaMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (slug: string) => void;
  onNavigate: (screen: any) => void;
}

export const MegaMenuModal: React.FC<MegaMenuModalProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const mainDepartments = [
    { name: 'Informática & Monitores', slug: 'informatica', icon: Laptop, count: '1.240 artigos' },
    { name: 'Smartphones & Acessórios', slug: 'smartphones', icon: Smartphone, count: '890 artigos' },
    { name: 'Fitness & Desporto', slug: 'fitness', icon: Dumbbell, count: '430 artigos' },
    { name: 'Jardim & Exterior', slug: 'jardim', icon: Flower2, count: '510 artigos' },
    { name: 'Bricolage & Ferramentas', slug: 'bricolage', icon: Hammer, count: '670 artigos' },
    { name: 'Bebé & Puericultura', slug: 'bebe', icon: Baby, count: '310 artigos' },
    { name: 'Beleza & Cosmética', slug: 'beleza', icon: Smile, count: '920 artigos' },
    { name: 'Brinquedos & LEGO', slug: 'brinquedos', icon: Sparkles, count: '840 artigos' },
    { name: 'Cadeiras & Escritório', slug: 'cadeiras', icon: Armchair, count: '290 artigos' },
    { name: 'Móveis & Decoração', slug: 'moveis', icon: Armchair, count: '410 artigos' },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex justify-start">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="bg-[#df0000] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-black text-xl tracking-tight">Departamentos</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar menu"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Categories List */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-gray-100">
          {/* Quick Highlight Services */}
          <div className="pb-3 grid grid-cols-2 gap-2">
            <button
              onClick={() => { onNavigate('worten-resolve'); onClose(); }}
              className="p-2.5 rounded-xl bg-red-50 border border-red-100 text-left hover:bg-red-100/70 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#df0000]">
                <Wrench className="w-3.5 h-3.5" />
                <span>Worten Resolve</span>
              </div>
              <span className="text-[10px] text-gray-500">Reparações e Apoio</span>
            </button>
            <button
              onClick={() => { onNavigate('coupons'); onClose(); }}
              className="p-2.5 rounded-xl bg-yellow-50 border border-yellow-200 text-left hover:bg-yellow-100/70 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
                <Tag className="w-3.5 h-3.5" />
                <span>Cupões para ti</span>
              </div>
              <span className="text-[10px] text-gray-500">Descontos diretos</span>
            </button>
          </div>

          <div className="py-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block px-2 mb-2">
              Todas as Categorias
            </span>
            <div className="space-y-1">
              {mainDepartments.map((dept) => {
                const IconComponent = dept.icon;
                return (
                  <button
                    key={dept.slug}
                    onClick={() => {
                      onSelectCategory(dept.slug);
                      onClose();
                    }}
                    className="w-full px-3 py-2.5 rounded-xl flex items-center justify-between hover:bg-gray-50 text-left group transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center group-hover:bg-red-50 group-hover:text-[#df0000] transition-colors">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-gray-900 group-hover:text-[#df0000] transition-colors">
                          {dept.name}
                        </div>
                        <div className="text-[10px] text-gray-400">
                          {dept.count}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#df0000] group-hover:translate-x-0.5 transition-all" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 text-xs flex items-center justify-between">
          <button
            onClick={() => { onNavigate('museum'); onClose(); }}
            className="text-gray-600 hover:text-red-600 font-semibold"
          >
            Museu Worten (30 Anos)
          </button>
          <button
            onClick={() => { onNavigate('worten-life'); onClose(); }}
            className="text-purple-700 font-bold"
          >
            Worten Life Continente
          </button>
        </div>
      </div>
    </div>
  );
};
