import React, { useState } from 'react';
import { 
  Search, 
  User, 
  Heart, 
  ShoppingCart, 
  Menu as MenuIcon, 
  X, 
  Wrench, 
  Tag, 
  Sparkles, 
  Smartphone, 
  History,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';
import { ActiveScreen } from '../types';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenMegaMenu: () => void;
  onNavigate: (screen: ActiveScreen, category?: string) => void;
  activeScreen: ActiveScreen;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenMegaMenu,
  onNavigate,
  activeScreen,
}) => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  return (
    <header className="bg-[#df0000] text-white w-full sticky top-0 z-40 shadow-md">
      {/* Top Banner Notice: Contact & Express Delivery */}
      <div className="bg-[#c50000] text-[11px] font-medium py-1 px-4 text-center border-b border-red-700/40 hidden sm:flex items-center justify-between max-w-[1440px] mx-auto">
        <div className="flex items-center gap-2">
          <span className="font-bold bg-white/20 px-2 py-0.5 rounded text-[10px] uppercase">Garantia Worten</span>
          <span>Entregas grátis em milhares de produtos &gt; 35€ | Levantamento em loja em 15 minutos</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <PhoneCall className="w-3 h-3" /> Apoio ao Cliente: 210 155 222
          </span>
          <button 
            onClick={() => onNavigate('worten-resolve')}
            className="hover:underline flex items-center gap-1 font-semibold"
          >
            <Wrench className="w-3 h-3" /> Reparar Equipamento
          </button>
        </div>
      </div>

      {/* Main Bar: Logo, Search Bar, and Utility Icons */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => onNavigate('home')}
          aria-label="Worten Página Inicial"
          className="flex-shrink-0 text-left focus:outline-none group cursor-pointer"
        >
          <span className="text-3xl lg:text-[34px] font-black tracking-tighter text-white select-none inline-block transform group-hover:scale-[1.02] transition-transform">
            worten
          </span>
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-3xl mx-2 lg:mx-6" data-purpose="search-container">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="O que estás à procura? (ex: iPhone 18, Portáteis, Merach, Bricolage...)"
              className="w-full pl-5 pr-12 py-2.5 rounded-full text-sm text-gray-900 bg-white placeholder-gray-500 border-0 focus:outline-none focus:ring-2 focus:ring-red-300 shadow-sm"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Limpar pesquisa"
                className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            ) : null}
            <button
              aria-label="Pesquisar"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-900 transition-colors"
              type="button"
              onClick={() => onNavigate('catalog')}
            >
              <Search className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>
        </div>

        {/* User Actions / Utilities */}
        <div className="flex items-center gap-4 lg:gap-6 select-none flex-shrink-0 relative">
          {/* Account / Login Trigger */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 text-white hover:opacity-90 focus:outline-none"
              data-purpose="user-login"
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <User className="w-5 h-5 stroke-[1.8]" />
                </div>
                {userLoggedIn ? (
                  <span className="absolute -bottom-0.5 -right-0.5 bg-green-500 text-white rounded-full p-[1px] leading-none text-[8px] font-bold">✓</span>
                ) : (
                  <span className="absolute -bottom-0.5 -right-0.5 bg-white text-[#df0000] rounded-full p-[1px] leading-none text-[9px] font-bold">✕</span>
                )}
              </div>
              <div className="text-xs leading-tight hidden sm:block text-left">
                <span className="block font-medium opacity-90">
                  {userLoggedIn ? 'Olá, Diogo!' : 'Olá!'}
                </span>
                <span className="font-bold">
                  {userLoggedIn ? 'A Minha Conta' : 'Iniciar Sessão'}
                </span>
              </div>
            </button>

            {/* Dropdown Menu */}
            {userDropdownOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white text-gray-800 rounded-xl shadow-2xl py-3 px-4 z-50 border border-gray-100 text-sm">
                <div className="pb-3 border-b border-gray-100">
                  <p className="font-bold text-gray-900">
                    {userLoggedIn ? 'Diogo Fernandes' : 'Bem-vindo à Worten'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {userLoggedIn ? 'ogoid.fmc01@gmail.com' : 'Acede às tuas encomendas e cupões'}
                  </p>
                </div>
                <div className="py-2 space-y-1">
                  <button
                    onClick={() => {
                      setUserLoggedIn(!userLoggedIn);
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left py-1.5 px-2 hover:bg-gray-50 rounded font-semibold text-[#df0000] flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {userLoggedIn ? 'Terminar Sessão' : 'Iniciar com 1 Clique'}
                  </button>
                  <button 
                    onClick={() => { onNavigate('coupons'); setUserDropdownOpen(false); }}
                    className="w-full text-left py-1.5 px-2 hover:bg-gray-50 rounded flex items-center justify-between text-gray-700"
                  >
                    <span>Os Meus Cupões</span>
                    <span className="bg-red-100 text-red-700 text-[10px] font-bold px-1.5 py-0.5 rounded">4 ativos</span>
                  </button>
                  <button 
                    onClick={() => { onNavigate('worten-resolve'); setUserDropdownOpen(false); }}
                    className="w-full text-left py-1.5 px-2 hover:bg-gray-50 rounded text-gray-700"
                  >
                    As Minhas Reparações
                  </button>
                  <button 
                    onClick={() => { onNavigate('worten-life'); setUserDropdownOpen(false); }}
                    className="w-full text-left py-1.5 px-2 hover:bg-gray-50 rounded text-gray-700"
                  >
                    Cartão Continente Associado
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Wishlist Icon */}
          <button
            onClick={onOpenWishlist}
            aria-label="Favoritos"
            className="text-white hover:opacity-90 p-1 relative focus:outline-none"
          >
            <Heart className="w-6 h-6 stroke-[2]" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-yellow-400 text-gray-900 font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Cart Icon */}
          <button
            onClick={onOpenCart}
            aria-label="Carrinho de Compras"
            className="text-white hover:opacity-90 p-1 relative flex items-center gap-2 focus:outline-none"
          >
            <div className="relative">
              <ShoppingCart className="w-6 h-6 stroke-[2]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-white text-[#df0000] font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Secondary Category / Promotion Navigation Ribbon */}
      <nav aria-label="Navegação secundária" className="border-t border-red-700/40 bg-[#df0000]">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-6 flex items-center gap-4 sm:gap-6 text-sm font-semibold h-11 overflow-x-auto nav-scrollbar whitespace-nowrap">
          {/* Mega Menu Trigger */}
          <button
            onClick={onOpenMegaMenu}
            aria-label="Abrir Menu Principal"
            className="flex items-center gap-2 bg-red-800/40 hover:bg-red-800/60 px-3 py-1.5 rounded-full text-white transition-colors"
          >
            <MenuIcon className="w-4 h-4 stroke-[2.5]" />
            <span className="font-bold">Menu</span>
          </button>

          {/* Promoções */}
          <button
            onClick={() => onNavigate('catalog')}
            className={`hover:text-red-100 transition-colors flex items-center gap-1.5 ${
              activeScreen === 'catalog' ? 'underline underline-offset-4 decoration-2' : ''
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Promoções</span>
          </button>

          {/* Worten Resolve Badge */}
          <button
            onClick={() => onNavigate('worten-resolve')}
            className="bg-white text-[#df0000] px-3 py-1 rounded font-bold text-xs shadow-sm hover:bg-gray-100 transition-all flex items-center gap-1"
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Worten Resolve</span>
          </button>

          {/* Cupões para ti */}
          <button
            onClick={() => onNavigate('coupons')}
            className="hover:text-red-100 transition-colors flex items-center gap-1 relative"
          >
            <span>Cupões para ti</span>
            <span className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse"></span>
          </button>

          {/* Worten Life Badge */}
          <button
            onClick={() => onNavigate('worten-life')}
            className="bg-white text-[#df0000] px-3 py-1 rounded font-bold text-xs shadow-sm hover:bg-gray-100 transition-all flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-red-500" />
            <span>Worten Life</span>
          </button>

          {/* Dicas e Novidades */}
          <button
            onClick={() => onNavigate('catalog')}
            className="hover:text-red-100 transition-colors"
          >
            Dicas e Novidades
          </button>

          {/* App Worten */}
          <button
            onClick={() => onNavigate('coupons')}
            className="hover:text-red-100 transition-colors flex items-center gap-1"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>App Worten</span>
          </button>

          {/* Museu Worten */}
          <button
            onClick={() => onNavigate('museum')}
            className="hover:text-red-100 transition-colors flex items-center gap-1"
          >
            <History className="w-3.5 h-3.5" />
            <span>Museu Worten</span>
          </button>
        </div>
      </nav>
    </header>
  );
};
