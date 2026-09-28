import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Award, HeartHandshake } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 text-xs mt-16 border-t border-gray-800">
      {/* Top Reassurance strip */}
      <div className="bg-black/40 py-6 border-b border-gray-800">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-600/20 text-[#df0000] flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white block">Escolha do Consumidor</span>
              <span className="text-gray-400 text-[11px]">Marca n.º 1 em Eletrónica e Eletrodomésticos</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-600/20 text-teal-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white block">Pagamentos 100% Seguros</span>
              <span className="text-gray-400 text-[11px]">MB WAY, Multibanco e Cartão 3D Secure</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-600/20 text-purple-400 flex items-center justify-center flex-shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white block">Mais de 200 Lojas Físicas</span>
              <span className="text-gray-400 text-[11px]">Levantamentos e devoluções grátis em loja</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white block">Apoio ao Cliente 210 155 222</span>
              <span className="text-gray-400 text-[11px]">Segunda a Domingo, das 8h às 23h</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-black text-white text-sm uppercase tracking-wider mb-3">
            Sobre a Worten
          </h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Quem Somos</a></li>
            <li><a href="#" className="hover:text-white transition-colors">30 Anos de Tecnologia</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Sustentabilidade & Retoma</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Trabalhar na Worten</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Imprensa e Comunicação</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-white text-sm uppercase tracking-wider mb-3">
            Worten Resolve
          </h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Reparação de Telemóveis</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Instalação de Eletrodomésticos</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Garantia Extra (+3 Anos)</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Estado da Reparação</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Substituição de Baterias</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-white text-sm uppercase tracking-wider mb-3">
            Serviços & Parcerias
          </h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Worten Life & Cartão Continente</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Crédito e Financiamento 24x</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Cupões e Promoções Ativas</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Worten Empresas (B2B)</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Vender no Marketplace Worten</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black text-white text-sm uppercase tracking-wider mb-3">
            Ajuda & Segurança
          </h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white transition-colors">Perguntas Frequentes (FAQ)</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Prazos e Custos de Envio</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Devoluções e Trocas em Loja</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Livro de Reclamações Online</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade & Cookies</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright & Legal */}
      <div className="border-t border-gray-800 py-6 text-center text-gray-500 text-[11px] max-w-[1440px] mx-auto px-4">
        <p>© 1996 - 2026 Worten - Equipamentos para o Lar, S.A. Todos os direitos reservados.</p>
        <p className="mt-1">
          *Financiamento Cetelem / Banco CTT. Exemplos para TAEG 18,5%. Sujeito a aprovação. Consulta as condições gerais em loja ou worten.pt.
        </p>
      </div>
    </footer>
  );
};
