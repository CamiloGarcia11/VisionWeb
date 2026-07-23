import React, { useState } from 'react';

const PLANS_DATA = {
  landing: {
    id: 'landing',
    name: 'Landing Page',
    badge: 'Más Popular para Emprendedores',
    monthlyPrice: 150000,
    oneTimePrice: 490000,
    themeColor: '#2563EB',
    accentGradient: 'from-blue-600 to-cyan-600',
    glowColor: 'rgba(37,99,235,0.3)',
    badgeBg: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    desc: 'Página de alta conversión de 1 sola sección estratégica diseñada para captar clientes rápida y eficazmente en campañas de marketing.',
    url: 'https://demo.visionweb.com/landing-conversion',
    features: [
      '1 Página estratégica de alta conversión orientada a captar prospectos (Leads)',
      'Formulario de contacto interactivo directo a tu correo electrónico',
      'Integración con Botón Flotante de WhatsApp y Chat interactivo',
      'Temporizador de ofertas/promociones y llamado a la acción (CTA) persistente',
      'Optimizada 100% para celulares y tablets (Diseño Responsive)',
      'Hosting de alta velocidad + Certificado SSL de seguridad incluido',
      'SEO inicial y velocidad de carga ultrarrápida (< 1 segundo)'
    ],
    maintenanceBenefits: [
      'Mantenimiento continuo mensual incluido',
      'Cambios ilimitados de imágenes, textos y ofertas',
      'Monitoreo de disponibilidad 24/7 y respaldos de seguridad semanales',
      'Soporte técnico preferencial por WhatsApp'
    ]
  },
  multisection: {
    id: 'multisection',
    name: 'Página Web Completa (Multisección)',
    badge: 'Ideal para Empresas y Profesionales',
    monthlyPrice: 260000,
    oneTimePrice: 890000,
    themeColor: '#7C3AED',
    accentGradient: 'from-purple-600 to-indigo-600',
    glowColor: 'rgba(124,58,237,0.3)',
    badgeBg: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    desc: 'Sitio web completo corporativo con múltiples páginas navegables para estructurar toda la información de tu empresa o marca.',
    url: 'https://demo.visionweb.com/sitio-corporativo',
    features: [
      'Navegación completa entre 6 Páginas (Inicio, Servicios, Nosotros, Portafolio, FAQ, Contacto)',
      'Modal interactivo de detalle para cada servicio y proyecto',
      'Portafolio con filtro interactivo por categoría de proyectos',
      'Sección de Preguntas Frecuentes (FAQ) con acordeón desplegable',
      'Formulario de contacto múltiple + Mapa interactivo simulado',
      'Optimización SEO avanzada para Google + Integración con Redes Sociales'
    ],
    maintenanceBenefits: [
      'Mantenimiento continuo y soporte técnico preferencial',
      'Actualizaciones mensuales de nuevos proyectos, blogs o noticias',
      'Monitoreo constante de velocidad, seguridad y certificados SSL',
      'Asesoría mensual en posicionamiento web'
    ]
  },
  ecommerce: {
    id: 'ecommerce',
    name: 'E-commerce (Tienda Online Completa)',
    badge: 'Máximo Potencial de Ventas 24/7',
    monthlyPrice: 390000,
    oneTimePrice: 1490000,
    themeColor: '#EA580C',
    accentGradient: 'from-orange-600 to-amber-600',
    glowColor: 'rgba(234,88,12,0.3)',
    badgeBg: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    desc: 'Tienda virtual completa con catálogo, buscador en tiempo real, vista rápida de productos, carrito de compras y pasarela de pago.',
    url: 'https://demo.visionweb.com/tienda-online',
    features: [
      'Catálogo de productos ilimitado con buscador en vivo y filtros por categoría',
      'Modal de Vista Rápida (Quick View) con selector de variantes y cantidad',
      'Carrito de compras interactivo con modificador de cantidades e ingreso de cupones',
      'Simulador de Checkout en 3 pasos con cálculo automático de totales en COP',
      'Integración con Pasarelas de Pago reales (Wompi, Nequi, Daviplata, Tarjetas, PSE)',
      'Notificaciones automáticas de compras por WhatsApp y Email',
      'Panel de Administración fácil para gestionar inventario, ofertas y ventas'
    ],
    maintenanceBenefits: [
      'Soporte dedicado continuo y mantenimiento de catálogo de productos',
      'Mantenimiento de conectores de pasarelas de pago y seguridad anti-fraude',
      'Copias de respaldo diarias de la base de datos de clientes y pedidos',
      'Asistencia personalizada en optimización de ventas online'
    ]
  }
};

// Rich E-commerce mock catalog
const ECOMMERCE_CATALOG = [
  { id: 1, name: 'Zapatillas Urban Neon Pro', price: 189000, oldPrice: 230000, category: 'Calzado', tag: 'Top Ventas', color: 'from-blue-600 to-indigo-600', stock: 12, rating: '4.9 ★' },
  { id: 2, name: 'Reloj Smartwatch Fit Pro 2', price: 245000, oldPrice: 290000, category: 'Tecnología', tag: 'Nuevo', color: 'from-purple-600 to-pink-600', stock: 8, rating: '4.8 ★' },
  { id: 3, name: 'Auriculares Bluetooth Bass X', price: 120000, oldPrice: 160000, category: 'Tecnología', tag: 'Oferta', color: 'from-orange-500 to-amber-500', stock: 15, rating: '5.0 ★' },
  { id: 4, name: 'Chaqueta Impermeable Urban', price: 210000, oldPrice: 250000, category: 'Moda', tag: 'Popular', color: 'from-emerald-600 to-teal-600', stock: 5, rating: '4.7 ★' },
  { id: 5, name: 'Gafas de Sol Polarizadas UV', price: 95000, oldPrice: 130000, category: 'Accesorios', tag: 'Verano', color: 'from-amber-600 to-red-500', stock: 20, rating: '4.9 ★' },
  { id: 6, name: 'Mochila Antirrobo Waterproof', price: 165000, oldPrice: 195000, category: 'Accesorios', tag: 'Recomendado', color: 'from-slate-700 to-slate-900', stock: 10, rating: '4.8 ★' }
];

// Rich Portfolio Projects
const PORTFOLIO_PROJECTS = [
  { id: 1, title: 'Restaurante Gourmet & Co', type: 'Landing Pages', desc: 'Página de reservas online con menú interactivo.', imgColor: 'from-blue-600 to-cyan-700' },
  { id: 2, title: 'Boutique Moda Urbana', type: 'E-commerce', desc: 'Tienda virtual con pasarela Wompi e inventario.', imgColor: 'from-purple-600 to-pink-700' },
  { id: 3, title: 'Firma de Abogados & Asesores', type: 'Corporativos', desc: 'Portal corporativo multisección con citas.', imgColor: 'from-indigo-700 to-slate-900' },
  { id: 4, title: 'Clínica Odontológica VIP', type: 'Corporativos', desc: 'Sitio institucional con testimonios y WhatsApp.', imgColor: 'from-emerald-600 to-teal-800' }
];

export default function InteractiveBocetosShowcase() {
  const [selectedTab, setSelectedTab] = useState('landing');
  const [bocetoTheme, setBocetoTheme] = useState('light'); // 'light' (default, high contrast) | 'dark'
  const [billingMode, setBillingMode] = useState('monthly'); // 'monthly' | 'oneTime'
  const [deviceMode, setDeviceMode] = useState('desktop'); // 'desktop' | 'mobile'

  // Toast notification
  const [toastMessage, setToastMessage] = useState(null);

  // ------------------ 1. LANDING STATES ------------------
  const [landingFormSubmitted, setLandingFormSubmitted] = useState(false);
  const [landingFormModal, setLandingFormModal] = useState(false);
  const [showWaChat, setShowWaChat] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // ------------------ 2. MULTI-SECTION STATES ------------------
  const [activePage, setActivePage] = useState('inicio');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [selectedServiceModal, setSelectedServiceModal] = useState(null);
  const [selectedProjectModal, setSelectedProjectModal] = useState(null);
  const [portfolioFilter, setPortfolioFilter] = useState('Todos');
  const [mapType, setMapType] = useState('mapa');

  // ------------------ 3. E-COMMERCE STATES ------------------
  const [cart, setCart] = useState([
    { id: 1, name: 'Zapatillas Urban Neon Pro', price: 189000, qty: 1 }
  ]);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [showCheckoutStep, setShowCheckoutStep] = useState(0); // 0 = null, 1 = Form, 2 = Payment Gateway, 3 = Confirmation
  const [searchQuery, setSearchQuery] = useState('');
  const [ecomCategory, setEcomCategory] = useState('Todos');
  const [couponCode, setCouponCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('wompi');

  const plan = PLANS_DATA[selectedTab];

  const formatCOP = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Cart operations
  const addToCart = (product, qtyToAdd = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + qtyToAdd } : item);
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: qtyToAdd }];
    });
    triggerToast(`🛒 ¡${product.name} agregado al carrito!`);
  };

  const updateCartQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
    triggerToast('🗑️ Producto eliminado del carrito');
  };

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'VISION10') {
      setDiscountApplied(0.10);
      triggerToast('🎉 ¡Cupón VISION10 aplicado (10% de descuento)!');
    } else {
      triggerToast('❌ Cupón no válido. Pruebe con: VISION10');
    }
  };

  const rawTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const discountAmount = rawTotal * discountApplied;
  const finalTotal = Math.max(0, rawTotal - discountAmount);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const getWaLink = () => {
    const modeText = billingMode === 'monthly'
      ? `la modalidad mensual de ${formatCOP(plan.monthlyPrice)}/mes (con mantenimiento incluido)`
      : `el pago único de ${formatCOP(plan.oneTimePrice)}`;

    const text = encodeURIComponent(
      `Hola Vision Web! 👋 Vengo de explorar el boceto interactivo de *${plan.name}*. Me interesa solicitar este desarrollo en ${modeText}.`
    );
    return `https://wa.me/573052311490?text=${text}`;
  };

  const isLight = bocetoTheme === 'light';

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header Info Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/30 text-[#2563EB] text-xs font-extrabold uppercase tracking-wider mb-4">
          🖱️ Simulación Interactivas de Bocetos Web
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Prueba el Boceto de tu <span className="text-[#2563EB]">Página Web</span>
        </h2>
        <p className="text-white/60 text-base sm:text-lg leading-relaxed">
          Nuestros bocetos están diferenciados visualmente para que experimentes la estructura real de tu futuro sitio. Interactúa con botones, formularios y productos en tiempo real.
        </p>
      </div>

      {/* Control Bar: Project Selection Tabs with Distinct Color Themes & Viewport Switchers */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-[#0D0D0D] p-3 sm:p-4 rounded-3xl border border-white/10 mb-8 shadow-2xl">
        {/* Project Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 w-full lg:w-auto">
          {Object.values(PLANS_DATA).map((p) => {
            const isSelected = selectedTab === p.id;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedTab(p.id);
                  setLandingFormSubmitted(false);
                  setActivePage('inicio');
                  setShowCartDrawer(false);
                }}
                style={{
                  boxShadow: isSelected ? `0 10px 25px -5px ${p.glowColor}` : 'none'
                }}
                className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm transition-all duration-300 flex items-center gap-2.5 ${
                  isSelected
                    ? `bg-gradient-to-r ${p.accentGradient} text-white scale-105 border border-white/20`
                    : 'bg-[#181818] text-white/70 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                <span className="text-base">{p.id === 'landing' ? '🚀' : p.id === 'multisection' ? '🌐' : '🛒'}</span>
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>

        {/* Right side controls: Theme Switcher, Device Switcher, Billing */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-center sm:justify-end">
          
          {/* Boceto Inner Theme Switcher: Light / Dark */}
          <div className="bg-[#181818] p-1.5 rounded-xl flex items-center border border-white/10">
            <span className="text-[10px] text-white/40 font-bold px-2 hidden sm:inline">Vista Boceto:</span>
            <button
              onClick={() => setBocetoTheme('light')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                bocetoTheme === 'light' ? 'bg-amber-400 text-slate-950 shadow-md font-black' : 'text-white/50 hover:text-white'
              }`}
              title="Ver boceto en modo claro de alta visibilidad"
            >
              ☀️ <span>Claro</span>
            </button>
            <button
              onClick={() => setBocetoTheme('dark')}
              className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                bocetoTheme === 'dark' ? 'bg-indigo-600 text-white shadow-md' : 'text-white/50 hover:text-white'
              }`}
              title="Ver boceto en modo oscuro"
            >
              🌙 <span>Oscuro</span>
            </button>
          </div>

          {/* Device Simulator Mode Switcher */}
          <div className="bg-[#181818] p-1.5 rounded-xl flex items-center border border-white/10">
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                deviceMode === 'desktop' ? 'bg-white/20 text-white' : 'text-white/40 hover:text-white'
              }`}
            >
              💻 <span className="hidden sm:inline">Escritorio</span>
            </button>
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                deviceMode === 'mobile' ? 'bg-white/20 text-white' : 'text-white/40 hover:text-white'
              }`}
            >
              📱 <span className="hidden sm:inline">Móvil</span>
            </button>
          </div>

          {/* Billing Mode Switcher */}
          <div className="bg-[#181818] p-1.5 rounded-2xl flex items-center border border-white/10">
            <button
              onClick={() => setBillingMode('monthly')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                billingMode === 'monthly'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              Mes a Mes
            </button>
            <button
              onClick={() => setBillingMode('oneTime')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                billingMode === 'oneTime'
                  ? 'bg-white/20 text-white shadow-md'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              Pago Único
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid Layout: Interactive Wireframe Canvas (Left 7 cols) & Pricing Info (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ================= LEFT COLUMN: INTERACTIVE WIREFRAME CANVAS ================= */}
        <div className="lg:col-span-7 flex flex-col items-center">
          
          {/* Top Banner Tag identifying the interactive preview */}
          <div className="mb-3 text-xs text-white/70 flex items-center gap-2 font-bold bg-[#141414] px-4 py-1.5 rounded-full border border-white/10">
            <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: plan.themeColor }}></span>
            <span>PROTOTIPO INTERACTIVO DE SITIO CLIENTE ({plan.name.toUpperCase()})</span>
          </div>

          {/* Simulator Main Window Frame */}
          <div
            style={{
              borderColor: isLight ? '#38BDF8' : plan.themeColor,
              boxShadow: `0 20px 50px -10px ${plan.glowColor}`
            }}
            className={`transition-all duration-500 rounded-3xl border-2 shadow-2xl overflow-hidden relative flex flex-col ${
              deviceMode === 'mobile'
                ? 'w-[370px] min-h-[660px] border-[10px] border-[#1F2937] rounded-[44px]'
                : 'w-full min-h-[620px]'
            }`}
          >
            {/* Simulator Browser Window Header */}
            <div className="bg-[#1E293B] px-4 py-3 border-b border-slate-700 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 max-w-xs mx-3 bg-[#0F172A] px-3 py-1 rounded-lg border border-slate-700 text-[11px] text-cyan-300 truncate text-center font-mono flex items-center justify-center gap-1.5">
                <span>🔒</span> <span>{plan.url}</span>
              </div>
              <div 
                className="text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-wider text-white shadow-sm"
                style={{ backgroundColor: plan.themeColor }}
              >
                Boceto Activo
              </div>
            </div>

            {/* Canvas Body Container - LIGHT or DARK mode */}
            <div className={`flex-1 p-4 sm:p-6 overflow-y-auto max-h-[580px] relative scrollbar-thin transition-colors duration-300 ${
              isLight 
                ? 'bg-[#F8FAFC] text-slate-900' 
                : selectedTab === 'landing' ? 'bg-[#0B1120] text-slate-100' : selectedTab === 'multisection' ? 'bg-[#110C24] text-slate-100' : 'bg-[#1C100B] text-slate-100'
            }`}>
              
              {/* Inner Wireframe Toast Notification */}
              {toastMessage && (
                <div 
                  style={{ backgroundColor: plan.themeColor }}
                  className="sticky top-2 z-50 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center justify-between gap-2 border border-white/30 animate-bounce mb-3"
                >
                  <span className="text-xs font-extrabold truncate">{toastMessage}</span>
                  <button onClick={() => setToastMessage(null)} className="text-xs font-bold text-white/80 hover:text-white">✕</button>
                </div>
              )}
              
              {/* ========================================================================= */}
              {/* 1. LANDING PAGE INTERACTIVE WIREFRAME                                     */}
              {/* ========================================================================= */}
              {selectedTab === 'landing' && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Top Bar Navigation inside Landing */}
                  <div className={`flex items-center justify-between pb-3 border-b ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#2563EB] flex items-center justify-center font-black text-xs text-white shadow-md">VW</div>
                      <span className={`font-extrabold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>LandingPro Colombia</span>
                    </div>
                    <button
                      onClick={() => setLandingFormModal(true)}
                      className="bg-[#2563EB] hover:bg-blue-600 text-white px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all shadow-md"
                    >
                      🔥 Obtener Oferta
                    </button>
                  </div>

                  {/* Hero Banner with Fictional Countdown Timer */}
                  <div className={`text-center py-8 px-4 rounded-2xl border relative overflow-hidden ${
                    isLight 
                      ? 'bg-gradient-to-b from-blue-100/70 via-indigo-50/60 to-white border-blue-200 shadow-sm'
                      : 'bg-gradient-to-b from-[#2563EB]/30 via-[#2563EB]/10 to-transparent border-[#2563EB]/40'
                  }`}>
                    <span className="text-[10px] bg-[#2563EB] text-white px-3 py-1 rounded-full font-extrabold uppercase tracking-wider mb-3 inline-block shadow-md">
                      ⚡ Oferta Limitada - 50% DCTO
                    </span>
                    <h3 className={`text-xl sm:text-3xl font-black mt-2 leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      Aumenta tus Ventas y Clientes en Tiempo Récord
                    </h3>
                    <p className={`text-xs sm:text-sm mt-2 max-w-md mx-auto leading-relaxed ${isLight ? 'text-slate-600' : 'text-white/70'}`}>
                      Transformamos visitantes casuales en clientes recurrentes con una Landing Page optimizada para la conversión.
                    </p>

                    {/* Fictional Countdown Timer */}
                    <div className="flex justify-center gap-2 my-4">
                      {['04', '32', '45'].map((val, idx) => (
                        <div key={idx} className={`px-3 py-1.5 rounded-lg border text-center ${
                          isLight ? 'bg-white border-blue-200 shadow-sm' : 'bg-[#141414] border-white/10'
                        }`}>
                          <span className="font-mono text-base font-black text-[#2563EB]">{val}</span>
                          <span className={`text-[8px] block uppercase font-bold ${isLight ? 'text-slate-400' : 'text-white/40'}`}>
                            {idx === 0 ? 'Horas' : idx === 1 ? 'Minutos' : 'Segundos'}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => setLandingFormModal(true)}
                        className="bg-[#2563EB] hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all shadow-xl shadow-blue-500/30 scale-105"
                      >
                        Quiero mi Landing Page
                      </button>
                      <button
                        onClick={() => triggerToast('ℹ️ Beneficios desplegados')}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                          isLight ? 'border-slate-300 text-slate-700 hover:bg-slate-100' : 'border-white/20 text-white/80 hover:bg-white/5'
                        }`}
                      >
                        Conocer Más
                      </button>
                    </div>
                  </div>

                  {/* Interactive Benefits Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: '⚡', title: 'Carga Ultrarrápida', desc: 'Optimizada a 99% de velocidad' },
                      { icon: '📱', title: '100% Celulares', desc: 'Diseño responsive de alto nivel' },
                      { icon: '💬', title: 'WhatsApp Directo', desc: 'Botón de contacto instantáneo' },
                      { icon: '🎯', title: 'Mayor Conversión', desc: 'Diseño enfocado en ventas' }
                    ].map((ben, i) => (
                      <button
                        key={i}
                        onClick={() => triggerToast(`💡 Beneficio seleccionado: ${ben.title}`)}
                        className={`p-3.5 rounded-2xl border text-left transition-all group ${
                          isLight
                            ? 'bg-white border-slate-200 hover:border-[#2563EB] shadow-sm hover:shadow-md'
                            : 'bg-[#141A29] border-white/5 hover:border-[#2563EB]/40'
                        }`}
                      >
                        <span className="text-xl block mb-1">{ben.icon}</span>
                        <h4 className={`font-bold text-xs group-hover:text-[#2563EB] ${isLight ? 'text-slate-900' : 'text-white'}`}>{ben.title}</h4>
                        <p className={`text-[10px] mt-0.5 ${isLight ? 'text-slate-500' : 'text-white/40'}`}>{ben.desc}</p>
                      </button>
                    ))}
                  </div>

                  {/* Interactive Testimonial Selector */}
                  <div className={`p-4 rounded-2xl border space-y-3 ${
                    isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#141A29] border-white/5'
                  }`}>
                    <div className="flex justify-between items-center">
                      <h4 className={`font-bold text-xs ${isLight ? 'text-slate-900' : 'text-white'}`}>⭐ Opiniones de Clientes Reales</h4>
                      <div className="flex gap-1">
                        {[0, 1, 2].map((idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveTestimonial(idx)}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${
                              activeTestimonial === idx ? 'bg-[#2563EB] w-5' : isLight ? 'bg-slate-300' : 'bg-white/20'
                            }`}
                          ></button>
                        ))}
                      </div>
                    </div>

                    {[
                      { name: 'Carlos Mendoza', role: 'Gerente Comercial', comment: '¡La landing page aumentó nuestros contactos un 300% en el primer mes!' },
                      { name: 'Laura Restrepo', role: 'Fundadora de Marca', comment: 'Excelente diseño y velocidad. Los clientes nos felicitan a diario.' },
                      { name: 'Andrés Gómez', role: 'Director de Marketing', comment: 'El mantenimiento mensual nos ahorra tiempo y preocupaciones.' }
                    ].map((t, idx) => (
                      activeTestimonial === idx && (
                        <div key={idx} className={`p-3.5 rounded-xl border animate-fadeIn ${
                          isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#0B1120] border-white/5'
                        }`}>
                          <p className={`text-xs italic ${isLight ? 'text-slate-700' : 'text-white/80'}`}>"{t.comment}"</p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="font-extrabold text-xs text-[#2563EB]">{t.name}</span>
                            <span className={`text-[10px] ${isLight ? 'text-slate-400' : 'text-white/40'}`}>{t.role}</span>
                          </div>
                        </div>
                      )
                    ))}
                  </div>

                  {/* Interactive Lead Form embedded in Wireframe */}
                  <div className={`p-5 rounded-2xl border relative ${
                    isLight ? 'bg-white border-blue-300 shadow-md' : 'bg-[#141A29] border-[#2563EB]/40'
                  }`}>
                    <h4 className={`font-extrabold text-xs text-center mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      📩 Formulario de Captura de Prospectos
                    </h4>
                    <p className={`text-[10px] text-center mb-4 ${isLight ? 'text-slate-500' : 'text-white/40'}`}>
                      Prueba enviando una solicitud ficticia:
                    </p>

                    {landingFormSubmitted ? (
                      <div className="bg-emerald-500/20 border border-emerald-500/40 p-5 rounded-2xl text-center animate-fadeIn">
                        <span className="text-3xl block mb-2">✅</span>
                        <p className="font-black text-xs text-emerald-600">¡Prospecto Capturado con Éxito!</p>
                        <p className={`text-[10px] mt-1 ${isLight ? 'text-slate-600' : 'text-white/70'}`}>
                          El mensaje llegará directamente a tu correo electrónico y celular.
                        </p>
                        <button
                          onClick={() => setLandingFormSubmitted(false)}
                          className="mt-3 text-xs text-[#2563EB] underline font-bold"
                        >
                          Enviar otro mensaje de prueba
                        </button>
                      </div>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setLandingFormSubmitted(true);
                          triggerToast('📩 ¡Prospecto registrado exitosamente!');
                        }}
                        className="space-y-3 text-left"
                      >
                        <div>
                          <label className={`text-[10px] font-semibold mb-1 block ${isLight ? 'text-slate-600' : 'text-white/60'}`}>Tu Nombre</label>
                          <input
                            type="text"
                            required
                            placeholder="Ej. Juan Pérez"
                            className={`w-full border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#2563EB] ${
                              isLight ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400' : 'bg-[#080808] border-white/10 text-white placeholder-white/30'
                            }`}
                          />
                        </div>
                        <div>
                          <label className={`text-[10px] font-semibold mb-1 block ${isLight ? 'text-slate-600' : 'text-white/60'}`}>Tu WhatsApp / Teléfono</label>
                          <input
                            type="tel"
                            required
                            placeholder="Ej. 300 123 4567"
                            className={`w-full border rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#2563EB] ${
                              isLight ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400' : 'bg-[#080808] border-white/10 text-white placeholder-white/30'
                            }`}
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-[#2563EB] hover:bg-blue-600 text-white font-extrabold py-2.5 rounded-xl text-xs transition-all shadow-lg shadow-blue-500/20"
                        >
                          Probar Envío de Formulario
                        </button>
                      </form>
                    )}
                  </div>

                  {/* Interactive Floating WhatsApp Widget */}
                  <div className="relative">
                    <button
                      onClick={() => setShowWaChat(!showWaChat)}
                      className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-full text-xs font-extrabold shadow-xl transition-all ml-auto"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
                      💬 Probar Chat de WhatsApp
                    </button>

                    {showWaChat && (
                      <div className={`absolute right-0 bottom-14 border p-4 rounded-2xl shadow-2xl w-64 animate-fadeIn z-30 ${
                        isLight ? 'bg-white border-emerald-400 text-slate-900' : 'bg-[#1A1A1A] border-emerald-500/40 text-white'
                      }`}>
                        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center font-black text-xs text-white">WA</div>
                            <div>
                              <p className="text-xs font-extrabold">Soporte en Vivo</p>
                              <p className="text-[9px] text-emerald-600 font-bold">En línea ahora</p>
                            </div>
                          </div>
                          <button onClick={() => setShowWaChat(false)} className="text-xs text-slate-400">✕</button>
                        </div>
                        <p className={`text-xs mt-3 p-3 rounded-xl border ${
                          isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-[#080808] border-white/5 text-white/90'
                        }`}>
                          ¡Hola! 👋 Gracias por visitar nuestra web. ¿En qué podemos ayudarte hoy?
                        </p>
                        <button
                          onClick={() => triggerToast('📲 Redirigiendo a WhatsApp...')}
                          className="mt-3 w-full bg-emerald-600 text-white text-[11px] font-bold py-1.5 rounded-lg text-center"
                        >
                          Iniciar Conversación
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Lead Form Modal Overlay if triggered from CTA */}
                  {landingFormModal && (
                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl z-40 flex flex-col justify-center animate-fadeIn">
                      <div className="bg-white p-5 rounded-2xl border border-blue-500 shadow-2xl relative text-slate-900">
                        <button
                          onClick={() => setLandingFormModal(false)}
                          className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 text-xs font-bold"
                        >
                          ✕
                        </button>
                        <h4 className="font-extrabold text-sm text-center text-slate-900 mb-2">
                          🎁 Solicita tu Descuento Exclusivo
                        </h4>
                        <p className="text-xs text-slate-600 text-center mb-4">Ingresa tus datos para activar la promoción:</p>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            setLandingFormModal(false);
                            triggerToast('🎉 ¡Descuento reservado con éxito!');
                          }}
                          className="space-y-3"
                        >
                          <input type="text" required placeholder="Nombre completo" className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900" />
                          <input type="email" required placeholder="Correo electrónico" className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900" />
                          <button type="submit" className="w-full bg-[#2563EB] text-white font-bold py-2.5 rounded-xl text-xs">
                            Confirmar Solicitud
                          </button>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ========================================================================= */}
              {/* 2. MULTI-SECTION (FULL WEBSITE) INTERACTIVE WIREFRAME                      */}
              {/* ========================================================================= */}
              {selectedTab === 'multisection' && (
                <div className="space-y-5 animate-fadeIn">
                  {/* Multi-page Top Navbar inside Wireframe */}
                  <div className={`p-2.5 rounded-2xl border flex items-center justify-between gap-1 overflow-x-auto select-none ${
                    isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#18122D] border-white/10'
                  }`}>
                    <div className="flex items-center gap-1">
                      {['inicio', 'servicios', 'nosotros', 'portafolio', 'faq', 'contacto'].map((pg) => (
                        <button
                          key={pg}
                          onClick={() => setActivePage(pg)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap ${
                            activePage === pg
                              ? 'bg-[#7C3AED] text-white shadow-md'
                              : isLight ? 'text-slate-600 hover:bg-slate-100' : 'text-white/60 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {pg}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ACTIVE PAGE: INICIO */}
                  {activePage === 'inicio' && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className={`p-6 rounded-2xl border text-center ${
                        isLight
                          ? 'bg-gradient-to-r from-purple-100 via-indigo-50 to-white border-purple-200 shadow-sm'
                          : 'bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-[#18122D] border-purple-500/30'
                      }`}>
                        <span className="text-[10px] bg-[#7C3AED] text-white px-2.5 py-0.5 rounded-full font-extrabold uppercase tracking-wider mb-2 inline-block shadow-sm">
                          Empresa Líder en Soluciones
                        </span>
                        <h3 className={`font-black text-xl sm:text-2xl ${isLight ? 'text-slate-900' : 'text-white'}`}>Innovación Digital para tu Negocio</h3>
                        <p className={`text-xs mt-2 max-w-md mx-auto leading-relaxed ${isLight ? 'text-slate-600' : 'text-white/60'}`}>
                          Construimos plataformas corporativas completas que proyectan confianza y atraen grandes clientes.
                        </p>
                        <button
                          onClick={() => setActivePage('servicios')}
                          className="mt-4 bg-[#7C3AED] hover:bg-purple-700 text-white px-5 py-2 rounded-xl text-xs font-extrabold transition-all shadow-md"
                        >
                          Explorar Servicios →
                        </button>
                      </div>

                      {/* Statistics Counter */}
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className={`p-3 rounded-xl border ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#18122D] border-white/5'}`}>
                          <p className="text-lg font-black text-[#7C3AED]">+180</p>
                          <p className={`text-[9px] uppercase font-bold ${isLight ? 'text-slate-500' : 'text-white/50'}`}>Proyectos Entregados</p>
                        </div>
                        <div className={`p-3 rounded-xl border ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#18122D] border-white/5'}`}>
                          <p className="text-lg font-black text-[#7C3AED]">99.8%</p>
                          <p className={`text-[9px] uppercase font-bold ${isLight ? 'text-slate-500' : 'text-white/50'}`}>Disponibilidad</p>
                        </div>
                        <div className={`p-3 rounded-xl border ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#18122D] border-white/5'}`}>
                          <p className="text-lg font-black text-[#7C3AED]">10+</p>
                          <p className={`text-[9px] uppercase font-bold ${isLight ? 'text-slate-500' : 'text-white/50'}`}>Años Experiencia</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ACTIVE PAGE: SERVICIOS */}
                  {activePage === 'servicios' && (
                    <div className="space-y-3 animate-fadeIn">
                      <div className="flex justify-between items-center">
                        <h4 className={`font-extrabold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>💼 Portafolio de Servicios Corporativos</h4>
                        <span className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-white/40'}`}>Haz clic en "Ver Detalle"</span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { title: 'Desarrollo Web a Medida', icon: '💻', desc: 'Soluciones empresariales escalables construidas con código limpio.' },
                          { title: 'Diseño UX/UI & Marca', icon: '🎨', desc: 'Interfaces modernas pensadas para la mejor experiencia de usuario.' },
                          { title: 'SEO & Posicionamiento', icon: '🚀', desc: 'Estrategia para aparecer en las primeras posiciones de Google.' },
                          { title: 'Mantenimiento & Nube', icon: '☁️', desc: 'Servidores de alta velocidad, respaldos y monitoreo continuo.' }
                        ].map((srv, idx) => (
                          <div key={idx} className={`p-4 rounded-2xl border flex flex-col justify-between transition-all hover:border-[#7C3AED] ${
                            isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#18122D] border-white/5'
                          }`}>
                            <div>
                              <span className="text-2xl block mb-1">{srv.icon}</span>
                              <h5 className={`font-bold text-xs ${isLight ? 'text-slate-900' : 'text-white'}`}>{srv.title}</h5>
                              <p className={`text-[10px] mt-1 leading-normal ${isLight ? 'text-slate-600' : 'text-white/50'}`}>{srv.desc}</p>
                            </div>
                            <button
                              onClick={() => setSelectedServiceModal(srv)}
                              className="mt-3 text-[10px] bg-purple-500/15 text-[#7C3AED] py-1.5 px-3 rounded-lg font-bold hover:bg-[#7C3AED] hover:text-white transition-all text-center"
                            >
                              Ver Detalle Completo
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ACTIVE PAGE: NOSOTROS */}
                  {activePage === 'nosotros' && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className={`p-5 rounded-2xl border space-y-3 text-left ${
                        isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#18122D] border-white/5'
                      }`}>
                        <span className="text-[10px] bg-purple-500/20 text-[#7C3AED] px-2.5 py-0.5 rounded font-extrabold uppercase">
                          Nuestra Trayectoria
                        </span>
                        <h4 className={`font-extrabold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>Sobre Nuestra Empresa</h4>
                        <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-white/70'}`}>
                          Somos un equipo apasionado por el desarrollo de software y el diseño de experiencia digital. Ayudamos a empresas colombianas a escalar su presencia con tecnología de punta.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-left">
                        <div className={`p-3 rounded-xl border ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#18122D] border-white/5'}`}>
                          <h5 className="font-bold text-xs text-[#7C3AED]">🎯 Misión</h5>
                          <p className={`text-[10px] mt-1 ${isLight ? 'text-slate-600' : 'text-white/50'}`}>Conectar negocios con sus clientes ideales a través de páginas web excepcionales.</p>
                        </div>
                        <div className={`p-3 rounded-xl border ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#18122D] border-white/5'}`}>
                          <h5 className="font-bold text-xs text-[#7C3AED]">👁️ Visión</h5>
                          <p className={`text-[10px] mt-1 ${isLight ? 'text-slate-600' : 'text-white/50'}`}>Ser la agencia referente en desarrollo web transparente y accesible.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ACTIVE PAGE: PORTAFOLIO */}
                  {activePage === 'portafolio' && (
                    <div className="space-y-3 animate-fadeIn">
                      <div className="flex justify-between items-center">
                        <h4 className={`font-bold text-xs ${isLight ? 'text-slate-900' : 'text-white'}`}>🖼️ Galería de Proyectos Recientes</h4>
                        {/* Filter pills */}
                        <div className="flex gap-1">
                          {['Todos', 'E-commerce', 'Corporativos'].map((f) => (
                            <button
                              key={f}
                              onClick={() => setPortfolioFilter(f)}
                              className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                                portfolioFilter === f ? 'bg-[#7C3AED] text-white' : isLight ? 'bg-slate-200 text-slate-700' : 'bg-white/10 text-white/50'
                              }`}
                            >
                              {f}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {PORTFOLIO_PROJECTS
                          .filter(p => portfolioFilter === 'Todos' || p.type === portfolioFilter)
                          .map((proj) => (
                            <button
                              key={proj.id}
                              onClick={() => setSelectedProjectModal(proj)}
                              className={`rounded-xl p-3 border text-left transition-all group ${
                                isLight ? 'bg-white border-slate-200 shadow-sm hover:border-[#7C3AED]' : 'bg-[#18122D] border-white/5 hover:border-[#7C3AED]'
                              }`}
                            >
                              <div className={`h-20 rounded-lg bg-gradient-to-br ${proj.imgColor} flex items-center justify-center font-bold text-xs text-white mb-2 group-hover:scale-105 transition-transform`}>
                                {proj.title}
                              </div>
                              <span className="text-[9px] text-[#7C3AED] font-bold block">{proj.type}</span>
                              <h5 className={`font-bold text-xs truncate ${isLight ? 'text-slate-900' : 'text-white'}`}>{proj.title}</h5>
                            </button>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* ACTIVE PAGE: FAQ */}
                  {activePage === 'faq' && (
                    <div className="space-y-3 text-left animate-fadeIn">
                      <h4 className={`font-bold text-xs mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>❓ Preguntas Frecuentes (Acordeón Interactivo)</h4>
                      {[
                        { q: '¿Cuánto tiempo toma tener mi web lista?', a: 'El tiempo promedio de entrega es de 5 a 8 días hábiles dependiendo del volumen de información.' },
                        { q: '¿El sitio web queda a mi nombre?', a: 'Totalmente. Tanto el dominio como los contenidos son de tu propiedad.' },
                        { q: '¿Cómo funciona el soporte técnico?', a: 'Con el plan mensual cuentas con asistencia directa por WhatsApp para cualquier ajuste que requieras.' },
                        { q: '¿Se puede integrar pasarelas de pago?', a: '¡Por supuesto! Integramos pasarelas como Wompi, Nequi, Daviplata, MercadoPago y PSE.' }
                      ].map((item, idx) => (
                        <div key={idx} className={`rounded-xl border overflow-hidden ${
                          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#18122D] border-white/5'
                        }`}>
                          <button
                            onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                            className={`w-full text-left p-3.5 text-xs font-bold flex justify-between items-center transition-all ${
                              isLight ? 'text-slate-900 hover:bg-slate-50' : 'text-white hover:bg-white/5'
                            }`}
                          >
                            <span>{item.q}</span>
                            <span className="text-[#7C3AED] font-black text-sm">{openFaqIndex === idx ? '−' : '+'}</span>
                          </button>
                          {openFaqIndex === idx && (
                            <div className={`p-3.5 text-[11px] border-t animate-fadeIn ${
                              isLight ? 'bg-slate-50 text-slate-700 border-slate-200' : 'bg-[#0B0818] text-white/70 border-white/5'
                            }`}>
                              {item.a}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ACTIVE PAGE: CONTACTO */}
                  {activePage === 'contacto' && (
                    <div className="space-y-3 animate-fadeIn">
                      <div className={`p-4 rounded-2xl border space-y-2 text-left ${
                        isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#18122D] border-white/5'
                      }`}>
                        <h4 className={`font-bold text-xs ${isLight ? 'text-slate-900' : 'text-white'}`}>📍 Ubicación & Formulario de Contacto</h4>
                        <div className={`flex justify-between items-center p-2.5 rounded-xl border text-xs ${
                          isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#0B0818] border-white/10'
                        }`}>
                          <span className={isLight ? 'text-slate-600' : 'text-white/70'}>Modo de Mapa:</span>
                          <div className="flex gap-1">
                            <button
                              onClick={() => setMapType('mapa')}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${mapType === 'mapa' ? 'bg-[#7C3AED] text-white' : isLight ? 'bg-slate-200 text-slate-700' : 'bg-white/10 text-white/50'}`}
                            >
                              Mapa
                            </button>
                            <button
                              onClick={() => setMapType('satelite')}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${mapType === 'satelite' ? 'bg-[#7C3AED] text-white' : isLight ? 'bg-slate-200 text-slate-700' : 'bg-white/10 text-white/50'}`}
                            >
                              Satélite
                            </button>
                          </div>
                        </div>

                        {/* Interactive Simulated Map */}
                        <div className={`h-28 rounded-xl flex items-center justify-center font-bold text-xs transition-all border ${
                          mapType === 'mapa' 
                            ? isLight ? 'bg-emerald-100 border-emerald-300 text-emerald-800' : 'bg-gradient-to-r from-emerald-900/60 to-teal-900/60 text-emerald-300 border-white/10'
                            : isLight ? 'bg-slate-800 border-slate-900 text-cyan-300' : 'bg-gradient-to-r from-slate-900 to-zinc-900 text-cyan-300 border-white/10'
                        }`}>
                          🗺️ [Simulador de Google Maps - Bogotá, Colombia]
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Service Detail Modal */}
                  {selectedServiceModal && (
                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl z-40 flex flex-col justify-center animate-fadeIn">
                      <div className="bg-white p-5 rounded-2xl border border-purple-500 space-y-3 text-left text-slate-900 shadow-2xl">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-sm text-slate-900">{selectedServiceModal.title}</h4>
                          <button onClick={() => setSelectedServiceModal(null)} className="text-slate-400 font-bold text-xs">✕</button>
                        </div>
                        <p className="text-xs text-slate-600">{selectedServiceModal.desc}</p>
                        <button
                          onClick={() => {
                            setSelectedServiceModal(null);
                            triggerToast('✅ Consulta sobre el servicio enviada');
                          }}
                          className="w-full bg-[#7C3AED] text-white font-bold py-2 rounded-xl text-xs shadow-md"
                        >
                          Solicitar Información de este Servicio
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Project Detail Modal */}
                  {selectedProjectModal && (
                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl z-40 flex flex-col justify-center animate-fadeIn">
                      <div className="bg-white p-5 rounded-2xl border border-purple-300 space-y-3 text-left text-slate-900 shadow-2xl">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-sm text-slate-900">{selectedProjectModal.title}</h4>
                          <button onClick={() => setSelectedProjectModal(null)} className="text-slate-400 font-bold text-xs">✕</button>
                        </div>
                        <p className="text-xs text-slate-600">{selectedProjectModal.desc}</p>
                        <span className="text-[10px] bg-purple-100 text-[#7C3AED] px-2 py-0.5 rounded font-extrabold">
                          Categoría: {selectedProjectModal.type}
                        </span>
                        <button
                          onClick={() => {
                            setSelectedProjectModal(null);
                            triggerToast('🌐 Abriendo demo del proyecto...');
                          }}
                          className="w-full bg-[#7C3AED] text-white font-bold py-2 rounded-xl text-xs mt-2 shadow-md"
                        >
                          Ver Sitio Web en Vivo
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ========================================================================= */}
              {/* 3. E-COMMERCE (ONLINE STORE) INTERACTIVE WIREFRAME                        */}
              {/* ========================================================================= */}
              {selectedTab === 'ecommerce' && (
                <div className="space-y-4 animate-fadeIn">
                  {/* Store Header Bar */}
                  <div className={`p-3 rounded-2xl border space-y-2 ${
                    isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#26150F] border-white/10'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🛍️</span>
                        <span className={`font-black text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>TechStore Colombia</span>
                      </div>

                      {/* Cart Trigger Button */}
                      <button
                        onClick={() => setShowCartDrawer(!showCartDrawer)}
                        className="bg-[#EA580C] hover:bg-orange-600 text-white px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-lg transition-all relative"
                      >
                        🛒 Carrito
                        <span className="bg-white text-[#EA580C] px-1.5 py-0.2 rounded-full text-[10px] font-black">
                          {cartCount}
                        </span>
                      </button>
                    </div>

                    {/* Search Bar in Store */}
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="🔍 Buscar productos (ej. Zapatillas, Reloj)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full border rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-[#EA580C] ${
                          isLight ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400' : 'bg-[#080808] border-white/10 text-white placeholder-white/30'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Categories Pills Bar */}
                  <div className="flex gap-1.5 overflow-x-auto pb-1 select-none">
                    {['Todos', 'Tecnología', 'Calzado', 'Moda', 'Accesorios'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setEcomCategory(cat)}
                        className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all whitespace-nowrap ${
                          ecomCategory === cat
                            ? 'bg-[#EA580C] text-white shadow-md'
                            : isLight ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' : 'bg-[#26150F] text-white/60 hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Products Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {ECOMMERCE_CATALOG
                      .filter(p => (ecomCategory === 'Todos' || p.category === ecomCategory) &&
                                   (p.name.toLowerCase().includes(searchQuery.toLowerCase())))
                      .map((prod) => (
                        <div key={prod.id} className={`rounded-2xl p-3 border flex flex-col justify-between transition-all group relative ${
                          isLight ? 'bg-white border-slate-200 shadow-sm hover:border-[#EA580C] hover:shadow-md' : 'bg-[#26150F] border-white/5 hover:border-[#EA580C]/40'
                        }`}>
                          <div>
                            {/* Card Image Placeholder */}
                            <div
                              onClick={() => setQuickViewProduct(prod)}
                              className={`h-24 rounded-xl bg-gradient-to-br ${prod.color} flex flex-col items-center justify-center text-white shadow-inner mb-2 cursor-pointer group-hover:scale-105 transition-transform relative overflow-hidden`}
                            >
                              <span className="font-black text-xl">{prod.name.substring(0, 2)}</span>
                              <span className="text-[9px] bg-black/40 px-2 py-0.5 rounded mt-1 opacity-0 group-hover:opacity-100 transition-opacity">👁️ Vista Rápida</span>
                            </div>

                            <div className="flex justify-between items-center">
                              <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold uppercase ${
                                isLight ? 'bg-slate-100 text-slate-600' : 'bg-white/10 text-white/70'
                              }`}>
                                {prod.tag}
                              </span>
                              <span className="text-[9px] text-amber-500 font-bold">{prod.rating}</span>
                            </div>

                            <h5 className={`font-bold text-xs mt-1.5 line-clamp-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>{prod.name}</h5>
                            <div className="flex items-baseline gap-1.5 mt-0.5">
                              <span className="text-xs font-black text-[#EA580C]">{formatCOP(prod.price)}</span>
                              <span className={`text-[9px] line-through ${isLight ? 'text-slate-400' : 'text-white/30'}`}>{formatCOP(prod.oldPrice)}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-1 mt-2">
                            <button
                              onClick={() => setQuickViewProduct(prod)}
                              className={`text-[10px] font-bold py-1.5 rounded-lg text-center ${
                                isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-800' : 'bg-white/10 hover:bg-white/20 text-white'
                              }`}
                            >
                              Detalle
                            </button>
                            <button
                              onClick={() => addToCart(prod)}
                              className="bg-[#EA580C] hover:bg-orange-600 text-white font-bold py-1.5 rounded-lg text-[10px] text-center shadow-md"
                            >
                              + Añadir
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Quick View Product Modal */}
                  {quickViewProduct && (
                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md p-5 rounded-2xl z-40 flex flex-col justify-between animate-fadeIn">
                      <div className="bg-white p-5 rounded-2xl border border-orange-300 shadow-2xl text-slate-900">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                          <h4 className="font-bold text-xs text-slate-900">Detalle de Producto</h4>
                          <button onClick={() => setQuickViewProduct(null)} className="text-slate-400 text-xs font-bold">✕ Cerrar</button>
                        </div>

                        <div className="mt-3 text-center">
                          <div className={`h-32 rounded-2xl bg-gradient-to-br ${quickViewProduct.color} flex items-center justify-center text-4xl font-black text-white shadow-xl mb-3`}>
                            {quickViewProduct.name.substring(0, 2)}
                          </div>
                          <h4 className="font-extrabold text-sm text-slate-900">{quickViewProduct.name}</h4>
                          <p className="text-xs font-black text-[#EA580C] mt-1">{formatCOP(quickViewProduct.price)}</p>
                          <p className="text-[10px] text-slate-500 mt-1">Disponibles en inventario: {quickViewProduct.stock} unidades</p>
                        </div>

                        <button
                          onClick={() => {
                            addToCart(quickViewProduct);
                            setQuickViewProduct(null);
                          }}
                          className="mt-4 w-full bg-[#EA580C] hover:bg-orange-600 text-white font-bold py-2.5 rounded-xl text-xs shadow-lg"
                        >
                          Añadir al Carrito de Compras
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Live Interactive Cart Drawer */}
                  {showCartDrawer && (
                    <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl z-40 flex flex-col justify-between animate-fadeIn">
                      <div className="bg-white p-4 rounded-2xl border border-orange-300 shadow-2xl text-slate-900 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                            <h4 className="font-bold text-xs text-slate-900 flex items-center gap-2">
                              🛒 Tu Carrito ({cartCount} artículos)
                            </h4>
                            <button
                              onClick={() => setShowCartDrawer(false)}
                              className="text-xs text-slate-400 hover:text-slate-700 font-bold"
                            >
                              ✕ Cerrar
                            </button>
                          </div>

                          {/* Cart Items List */}
                          <div className="mt-3 space-y-2 max-h-48 overflow-y-auto pr-1">
                            {cart.length === 0 ? (
                              <p className="text-xs text-slate-400 text-center py-6">Tu carrito está vacío</p>
                            ) : (
                              cart.map((item) => (
                                <div key={item.id} className="bg-slate-50 p-2.5 rounded-xl flex justify-between items-center border border-slate-200">
                                  <div>
                                    <p className="font-bold text-xs text-slate-900">{item.name}</p>
                                    <p className="text-[10px] text-slate-500">{formatCOP(item.price)} c/u</p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="flex items-center bg-white rounded-lg border border-slate-300 px-1.5 py-0.5 text-xs">
                                      <button onClick={() => updateCartQty(item.id, -1)} className="px-1 text-slate-500 hover:text-slate-900 font-bold">-</button>
                                      <span className="px-1.5 font-bold text-slate-900">{item.qty}</span>
                                      <button onClick={() => updateCartQty(item.id, 1)} className="px-1 text-slate-500 hover:text-slate-900 font-bold">+</button>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-xs hover:text-red-700 font-bold">🗑️</button>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>

                          {/* Coupon Code Input */}
                          {cart.length > 0 && (
                            <div className="mt-3 flex gap-2">
                              <input
                                type="text"
                                placeholder="Cupón: VISION10"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1 text-[11px] text-slate-900 uppercase placeholder-slate-400"
                              />
                              <button
                                onClick={applyCoupon}
                                className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-[10px] font-bold px-3 rounded-xl"
                              >
                                Aplicar
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Cart Totals Footer */}
                        {cart.length > 0 && (
                          <div className="pt-3 border-t border-slate-200 space-y-2">
                            {discountApplied > 0 && (
                              <div className="flex justify-between text-[11px] text-emerald-600 font-bold">
                                <span>Descuento (10%):</span>
                                <span>-{formatCOP(discountAmount)}</span>
                              </div>
                            )}
                            <div className="flex justify-between text-xs font-bold text-slate-900">
                              <span>Total a Pagar:</span>
                              <span className="text-[#EA580C] text-sm font-black">{formatCOP(finalTotal)}</span>
                            </div>
                            <button
                              onClick={() => {
                                setShowCartDrawer(false);
                                setShowCheckoutStep(1);
                              }}
                              className="w-full bg-[#EA580C] hover:bg-orange-600 text-white font-black py-2.5 rounded-xl text-xs shadow-lg transition-all"
                            >
                              Ir al Checkout / Pasarela →
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* 3-Step Interactive Checkout Modal */}
                  {showCheckoutStep > 0 && (
                    <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl z-50 flex flex-col justify-between animate-fadeIn">
                      <div className="bg-white p-5 rounded-2xl border border-orange-300 shadow-2xl text-slate-900 flex-1 flex flex-col justify-between">
                        
                        {/* Step 1: Customer Info */}
                        {showCheckoutStep === 1 && (
                          <div>
                            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                              <h4 className="font-bold text-xs text-slate-900">Paso 1: Datos de Envío</h4>
                              <button onClick={() => setShowCheckoutStep(0)} className="text-xs text-slate-400">✕ Cancelar</button>
                            </div>

                            <div className="space-y-2 mt-3 text-left">
                              <input type="text" placeholder="Nombre completo" defaultValue="Carlos Gómez" className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900" />
                              <input type="text" placeholder="Dirección de entrega" defaultValue="Calle 100 #15-30" className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900" />
                              <input type="text" placeholder="Ciudad / Municipio" defaultValue="Bogotá D.C." className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900" />
                            </div>
                          </div>
                        )}

                        {/* Step 2: Payment Gateway Selection */}
                        {showCheckoutStep === 2 && (
                          <div>
                            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                              <h4 className="font-bold text-xs text-slate-900">Paso 2: Método de Pago</h4>
                              <button onClick={() => setShowCheckoutStep(0)} className="text-xs text-slate-400">✕ Cancelar</button>
                            </div>

                            <div className="grid grid-cols-2 gap-2 mt-3 text-center">
                              {[
                                { id: 'wompi', name: 'Wompi / Bancolombia', color: 'text-blue-600' },
                                { id: 'nequi', name: 'Nequi / Daviplata', color: 'text-emerald-600' },
                                { id: 'card', name: 'Tarjeta Crédito/Débito', color: 'text-amber-600' },
                                { id: 'pse', name: 'PSE / Efecty', color: 'text-purple-600' }
                              ].map((pm) => (
                                <button
                                  key={pm.id}
                                  onClick={() => setPaymentMethod(pm.id)}
                                  className={`p-2.5 rounded-xl border transition-all text-xs font-bold ${
                                    paymentMethod === pm.id
                                      ? 'border-[#EA580C] bg-orange-50 text-slate-900 shadow-sm'
                                      : 'border-slate-200 bg-slate-50 text-slate-600'
                                  }`}
                                >
                                  <span className={pm.color}>{pm.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Step 3: Order Confirmation Receipt */}
                        {showCheckoutStep === 3 && (
                          <div className="text-center py-4 space-y-2 animate-fadeIn">
                            <span className="text-4xl block">🎉</span>
                            <h4 className="font-black text-sm text-emerald-600">¡Pedido Confirmado con Éxito!</h4>
                            <p className="text-[10px] text-slate-500">Número de Orden: <strong className="text-slate-900">#VW-89420</strong></p>
                            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                              <p>Total pagado: <strong className="text-[#EA580C]">{formatCOP(finalTotal)}</strong></p>
                              <p>Método: {paymentMethod.toUpperCase()}</p>
                            </div>
                          </div>
                        )}

                        {/* Navigation buttons inside Checkout */}
                        <div className="pt-3 border-t border-slate-200 flex justify-between mt-4">
                          {showCheckoutStep === 1 && (
                            <button onClick={() => setShowCheckoutStep(2)} className="w-full bg-[#EA580C] text-white font-bold py-2 rounded-xl text-xs shadow-md">
                              Continuar al Pago →
                            </button>
                          )}
                          {showCheckoutStep === 2 && (
                            <button onClick={() => setShowCheckoutStep(3)} className="w-full bg-emerald-600 text-white font-bold py-2 rounded-xl text-xs shadow-md">
                              Simular Confirmación de Pago
                            </button>
                          )}
                          {showCheckoutStep === 3 && (
                            <button
                              onClick={() => {
                                setShowCheckoutStep(0);
                                setCart([]);
                                triggerToast('🛍️ Demostración de compra completada');
                              }}
                              className="w-full bg-[#EA580C] text-white font-bold py-2 rounded-xl text-xs shadow-md"
                            >
                              Finalizar Simulación
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: PRICING & INCLUDED FEATURES CARD ================= */}
        <div 
          style={{
            borderColor: plan.themeColor
          }}
          className="lg:col-span-5 bg-[#0D0D0D] rounded-3xl p-6 sm:p-8 border-2 shadow-2xl flex flex-col justify-between relative overflow-hidden transition-colors duration-300"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide ${plan.badgeBg}`}>
                {plan.badge}
              </span>
              <span className="text-xs text-white/40 font-mono">
                ID: {plan.id}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              {plan.name}
            </h3>

            <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
              {plan.desc}
            </p>

            {/* Dynamic Price Display */}
            <div className="bg-[#141414] p-5 rounded-2xl border border-white/10 my-4 relative">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-3xl sm:text-4xl font-black text-white">
                    {billingMode === 'monthly' ? formatCOP(plan.monthlyPrice) : formatCOP(plan.oneTimePrice)}
                  </span>
                  <span className="text-xs font-bold ml-1.5" style={{ color: plan.themeColor }}>
                    {billingMode === 'monthly' ? '/ mes' : ' (Pago Único)'}
                  </span>
                </div>
              </div>

              {billingMode === 'monthly' ? (
                <div className="mt-2 pt-2 border-t border-white/5 flex items-center gap-2 text-[11px] text-emerald-400 font-semibold">
                  <span>✓</span> Mantenimiento continuo de página mes a mes incluido
                </div>
              ) : (
                <div className="mt-2 pt-2 border-t border-white/5 text-[11px] text-white/40">
                  Propiedad 100% de la web sin cuotas mensuales obligatorias.
                </div>
              )}
            </div>

            {/* Included Features List */}
            <div>
              <h4 className="text-xs font-extrabold text-white/70 uppercase tracking-wider mb-3">
                Funcionalidades Completas Incluidas:
              </h4>
              <ul className="space-y-2.5">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-white/80">
                    <span className="font-bold mt-0.5" style={{ color: plan.themeColor }}>✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Monthly Maintenance Perks if Monthly */}
            {billingMode === 'monthly' && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <h4 className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider mb-2">
                  Incluido en Mantenimiento Mes a Mes:
                </h4>
                <ul className="space-y-1.5">
                  {plan.maintenanceBenefits.map((ben, i) => (
                    <li key={i} className="flex items-center gap-2 text-[11px] text-white/60">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{ben}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action CTA Button */}
          <div className="mt-8">
            <a
              href={getWaLink()}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: plan.themeColor,
                boxShadow: `0 10px 25px -5px ${plan.glowColor}`
              }}
              className="w-full hover:brightness-110 text-white font-extrabold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 text-sm btn-shine group"
            >
              <span>Contratar {plan.name}</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <p className="text-[10px] text-center text-white/40 mt-2">
              Respuesta inmediata por WhatsApp | Sin compromisos iniciales
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
