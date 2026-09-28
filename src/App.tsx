import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TrustBadges } from './components/TrustBadges';
import { DualMarketingBanners } from './components/DualMarketingBanners';
import { CategoryCircles } from './components/CategoryCircles';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistModal } from './components/WishlistModal';
import { MegaMenuModal } from './components/MegaMenuModal';
import { WortenResolveModal } from './components/WortenResolveModal';
import { CouponsModal } from './components/CouponsModal';
import { MuseumModal } from './components/MuseumModal';
import { WortenLifeModal } from './components/WortenLifeModal';
import { Footer } from './components/Footer';

import { PRODUCTS, COUPONS } from './data/mockData';
import { Product, CartItem, Coupon, ActiveScreen } from './types';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

export default function App() {
  // Navigation & Screens
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isResolveOpen, setIsResolveOpen] = useState(false);
  const [isCouponsOpen, setIsCouponsOpen] = useState(false);
  const [isMuseumOpen, setIsMuseumOpen] = useState(false);
  const [isWortenLifeOpen, setIsWortenLifeOpen] = useState(false);

  // Cart & Wishlist State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Initial friendly demo item
    return [
      {
        product: PRODUCTS[0],
        quantity: 1,
        warrantyProtection: false,
      }
    ];
  });
  const [wishlistIds, setWishlistIds] = useState<string[]>(['iphone-18-pro']);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Add to cart handler
  const handleAddToCart = (product: Product, e?: React.MouseEvent | number, withWarranty?: boolean) => {
    let qty = 1;
    let warranty = false;

    if (typeof e === 'number') {
      qty = e;
      warranty = !!withWarranty;
    } else if (e) {
      e.stopPropagation();
    }

    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + qty, warrantyProtection: warranty || item.warrantyProtection }
            : item
        );
      }
      return [
        ...prev,
        {
          product,
          quantity: qty,
          warrantyProtection: warranty,
          warrantyPrice: product.price > 500 ? 59.99 : 29.99,
        }
      ];
    });

    showToast(`"${product.title.slice(0, 32)}..." adicionado ao carrinho!`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist handler
  const handleToggleWishlist = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast('Artigo removido dos favoritos.');
        return prev.filter((id) => id !== product.id);
      } else {
        showToast('Artigo adicionado aos teus favoritos!');
        return [...prev, product.id];
      }
    });
  };

  // Coupon handling
  const handleApplyCoupon = (code: string) => {
    const found = COUPONS.find((c) => c.code.toUpperCase() === code.toUpperCase());
    if (!found) {
      return { success: false, message: 'Cupão inválido ou expirado.' };
    }
    setAppliedCoupon(found);
    showToast(`Cupão "${found.code}" ativado com sucesso!`);
    return { success: true, message: `Cupão ${found.code} aplicado com sucesso!` };
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    showToast('Cupão removido do carrinho.');
  };

  // Navigation router
  const handleNavigate = (screen: ActiveScreen, category?: string) => {
    setActiveScreen(screen);
    if (category) {
      setSelectedCategory(category);
    }
    if (screen === 'worten-resolve') {
      setIsResolveOpen(true);
    } else if (screen === 'coupons') {
      setIsCouponsOpen(true);
    } else if (screen === 'museum') {
      setIsMuseumOpen(true);
    } else if (screen === 'worten-life') {
      setIsWortenLifeOpen(true);
    } else if (screen === 'catalog') {
      const el = document.getElementById('produtos-destaque');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Select product by ID (e.g. from Hero or Cards)
  const handleSelectProductById = (id: string) => {
    const p = PRODUCTS.find((item) => item.id === id);
    if (p) {
      setSelectedProduct(p);
    }
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f6f6] font-sans text-gray-900 selection:bg-red-500 selection:text-white">
      {/* Main Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenMegaMenu={() => setIsMegaMenuOpen(true)}
        onNavigate={handleNavigate}
        activeScreen={activeScreen}
      />

      {/* Main Page Body */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-2 sm:px-4 lg:px-6 pt-3 pb-8">
        {/* Section 2: Primary Dynamic Hero Carousel & Stacked Promotional Grid */}
        <HeroSection
          onSelectProduct={handleSelectProductById}
          onExploreCatalog={(cat) => {
            setSelectedCategory(cat || null);
            const el = document.getElementById('produtos-destaque');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Section 3: Risk-Reversal & Reassurance Trust Strip */}
        <TrustBadges />

        {/* Section 4: Brand Ecosystem & Loyalty Program Banner Strip */}
        <DualMarketingBanners
          onOpenMuseum={() => setIsMuseumOpen(true)}
          onOpenWortenLife={() => setIsWortenLifeOpen(true)}
        />

        {/* Section 5: High-Density Category Quick-Navigation */}
        <CategoryCircles
          selectedCategory={selectedCategory}
          onSelectCategory={(slug) => {
            setSelectedCategory(slug);
            const el = document.getElementById('produtos-destaque');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Section 6: High-Converting Product Catalog & Flash Deals Grid */}
        <ProductGrid
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onAddToCart={(p, e) => handleAddToCart(p, e)}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onClearFilters={() => {
            setSelectedCategory(null);
            setSearchQuery('');
          }}
        />
      </main>

      {/* Toast feedback snackbar */}
      {toastMessage && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-gray-900/95 text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-full shadow-2xl flex items-center gap-2.5 z-50 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 bg-[#df0000] text-white text-[11px] px-2.5 py-1 rounded-full hover:bg-red-700 transition-colors"
          >
            Ver Carrinho
          </button>
        </div>
      )}

      {/* Product Detail Screen / Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(product, qty, withWarranty) => handleAddToCart(product, qty, withWarranty)}
          isWishlisted={wishlistIds.includes(selectedProduct.id)}
          onToggleWishlist={(p) => handleToggleWishlist(p)}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={handleApplyCoupon}
        onRemoveCoupon={handleRemoveCoupon}
        onClearCart={handleClearCart}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveWishlist={(id) => setWishlistIds((prev) => prev.filter((x) => x !== id))}
        onMoveToCart={(p) => {
          handleAddToCart(p);
          setWishlistIds((prev) => prev.filter((x) => x !== p.id));
        }}
      />

      {/* Mega Menu Drawer */}
      <MegaMenuModal
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
        onSelectCategory={(slug) => {
          setSelectedCategory(slug);
          const el = document.getElementById('produtos-destaque');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onNavigate={handleNavigate}
      />

      {/* Worten Resolve Service Screen */}
      <WortenResolveModal
        isOpen={isResolveOpen}
        onClose={() => setIsResolveOpen(false)}
      />

      {/* Coupons Wallet Modal */}
      <CouponsModal
        isOpen={isCouponsOpen}
        onClose={() => setIsCouponsOpen(false)}
        onApplyCoupon={(code) => {
          handleApplyCoupon(code);
          setIsCartOpen(true);
        }}
        appliedCouponCode={appliedCoupon?.code}
      />

      {/* Museu Worten 30 Anos Modal */}
      <MuseumModal
        isOpen={isMuseumOpen}
        onClose={() => setIsMuseumOpen(false)}
      />

      {/* Worten Life Continente Modal */}
      <WortenLifeModal
        isOpen={isWortenLifeOpen}
        onClose={() => setIsWortenLifeOpen(false)}
      />

      {/* Global Portuguese Retail Footer */}
      <Footer />
    </div>
  );
}
