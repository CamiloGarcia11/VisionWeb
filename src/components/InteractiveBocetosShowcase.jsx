import React, { useState, useEffect } from 'react';

const PLANS_DATA = {
  landing: {
    id: 'landing',
    name: 'Landing Page',
    badge: 'Más Popular para Emprendedores',
    monthlyPrice: 150000,
    oneTimePrice: 490000,
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
  { id: 3, name: 'Auriculares Bluetooth Bass X', price: 120000, oldPrice: 160000, category: 'Tecnología', tag: 'Oferta', color: 'from-[#2563EB] to-cyan-500', stock: 15, rating: '5.0 ★' },
  { id: 4, name: 'Chaqueta Impermeable Urban', price: 210000, oldPrice: 250000, category: 'Moda', tag: 'Popular', color: 'from-emerald-600 to-teal-600', stock: 5, rating: '4.7 ★' },
  { id: 5, name: 'Gafas de Sol Polarizadas UV', price: 95000, oldPrice: 130000, category: 'Accesorios', tag: 'Verano', color: 'from-amber-600 to-orange-600', stock: 20, rating: '4.9 ★' },
  { id: 6, name: 'Mochila Antirrobo Waterproof', price: 165000, oldPrice: 195000, category: 'Accesorios', tag: 'Recomendado', color: 'from-slate-700 to-slate-900', stock: 10, rating: '4.8 ★' }
];

// Rich Portfolio Projects
const PORTFOLIO_PROJECTS = [
  { id: 1, title: 'Restaurante Gourmet & Co', type: 'Landing Pages', desc: 'Página de reservas online con menú interactivo.', imgColor: 'from-[#2563EB] to-blue-800' },
  { id: 2, title: 'Boutique Moda Urbana', type: 'E-commerce', desc: 'Tienda virtual con pasarela Wompi e inventario.', imgColor: 'from-purple-600 to-pink-700' },
  { id: 3, title: 'Firma de Abogados & Asesores', type: 'Corporativos', desc: 'Portal corporativo multisección con citas.', imgColor: 'from-emerald-700 to-teal-900' },
  { id: 4, title: 'Clínica Odontológica VIP', type: 'Corporativos', desc: 'Sitio institucional con testimonios y WhatsApp.', imgColor: 'from-cyan-600 to-blue-700' }
];

export default function InteractiveBocetosShowcase() {
  const [selectedTab, setSelectedTab] = useState('landing');
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

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header Info Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/30 text-[#2563EB] text-xs font-extrabold uppercase tracking-wider mb-4">
          🖱️ Bocetos 100% Funcionales e Interactivos
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Prueba el Boceto de tu <span class="text-[#2563EB]">Página Web</span>
        </h2>
        <p className="text-white/60 text-base sm:text-lg leading-relaxed">
          Haz clic directamente en los botones, formularios, pestañas, carrito de compras y productos dentro del simulador para experimentar todas las funcionalidades reales.
        </p>
      </div>

      {/* Control Bar: Project Selection Tabs & Device / Billing Switcher */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-[#0D0D0D] p-3 sm:p-4 rounded-3xl border border-white/10 mb-8 shadow-2xl">
        {/* Project Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 w-full lg:w-auto">
          {Object.values(PLANS_DATA).map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setSelectedTab(p.id);
                setLandingFormSubmitted(false);
                setActivePage('inicio');
                setShowCartDrawer(false);
              }}
              className={`px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center gap-2.5 ${
                selectedTab === p.id
                  ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-500/30 scale-105'
                  : 'bg-[#1F1F1F] text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{p.id === 'landing' ? '🚀' : p.id === 'multisection' ? '🌐' : '🛒'}</span>
              <span>{p.name}</span>
            </button>
          ))}
        </div>

        {/* Right side controls */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-center sm:justify-end">
          {/* Device Simulator Mode Switcher */}
          <div className="bg-[#1F1F1F] p-1.5 rounded-xl flex items-center border border-white/10">
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                deviceMode === 'desktop' ? 'bg-[#2563EB] text-white' : 'text-white/40 hover:text-white'
              }`}
            >
              💻 <span>Escritorio</span>
            </button>
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                deviceMode === 'mobile' ? 'bg-[#2563EB] text-white' : 'text-white/40 hover:text-white'
              }`}
            >
              📱 <span>Móvil</span>
            </button>
          </div>

          {/* Billing Mode Switcher */}
          <div className="bg-[#1F1F1F] p-1.5 rounded-2xl flex items-center border border-white/10">
            <button
              onClick={() => setBillingMode('monthly')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
                billingMode === 'monthly'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Mes a Mes
            </button>
            <button
              onClick={() => setBillingMode('oneTime')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
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

      {/* Main Grid Layout: Interactive Wireframe (Left 7 cols) & Pricing Info (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ================= LEFT COLUMN: INTERACTIVE WIREFRAME CANVAS ================= */}
        <div className="lg:col-span-7 flex flex-col items-center">
          
          {/* Hint Badge */}
          <div className="mb-3 text-[11px] text-white/50 flex items-center gap-1.5 font-medium">
            <span>💡</span> <span>Haz clic en los botones, menús, carritos y campos para interactuar</span>
          </div>

          <div
            className={`transition-all duration-500 bg-[#121212] rounded-3xl border border-white/15 shadow-2xl overflow-hidden relative flex flex-col ${
              deviceMode === 'mobile'
                ? 'w-[370px] min-h-[660px] border-[10px] border-[#262626] rounded-[42px]'
                : 'w-full min-h-[620px]'
            }`}
          >
            {/* Simulator Window Title Bar */}
            <div className="bg-[#1F1F1F] px-4 py-3 border-b border-white/10 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="flex-1 max-w-xs mx-3 bg-[#0D0D0D] px-3 py-1 rounded-lg border border-white/10 text-[11px] text-white/50 truncate text-center font-mono">
                🔒 {plan.url}
              </div>
              <div className="text-[10px] bg-[#2563EB]/20 text-[#2563EB] px-2 py-0.5 rounded font-bold uppercase">
                Boceto Activo
              </div>
            </div>

            {/* Canvas Body Container */}
            <div className="flex-1 p-4 sm:p-6 bg-[#080808] text-white overflow-y-auto max-h-[580px] relative scrollbar-thin">
              
              {/* Inner Wireframe Toast Notification */}
              {toastMessage && (
                <div className="sticky top-2 z-50 bg-[#2563EB] text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center justify-between gap-2 border border-white/20 animate-bounce mb-3">
                  <span className="text-xs font-extrabold truncate">{toastMessage}</span>
                  <button onClick={() => setToastMessage(null)} className="text-xs font-bold text-white/70 hover:text-white">✕</button>
                </div>
              )}
              
              {/* ========================================================================= */}
              {/* 1. LANDING PAGE INTERACTIVE WIREFRAME                                     */}
              {/* ========================================================================= */}
              {selectedTab === 'landing' && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Top Bar Navigation inside Landing */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#2563EB] flex items-center justify-center font-black text-xs">VW</div>
                      <span className="font-extrabold text-sm text-white">LandingPro Colombia</span>
                    </div>
                    <button
                      onClick={() => setLandingFormModal(true)}
                      className="bg-[#2563EB] hover:bg-blue-600 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md"
                    >
                      🔥 Obtener Oferta
                    </button>
                  </div>

                  {/* Hero Banner with Fictional Countdown Timer */}
                  <div className="text-center py-8 px-4 bg-gradient-to-b from-[#2563EB]/20 via-[#2563EB]/5 to-transparent rounded-2xl border border-[#2563EB]/30 relative overflow-hidden">
                    <span className="text-[10px] bg-[#2563EB] text-white px-3 py-1 rounded-full font-extrabold uppercase tracking-wider mb-3 inline-block shadow-md">
                      ⚡ Oferta Limitada - 50% DCTO
                    </span>
                    <h3 className="text-xl sm:text-3xl font-black text-white mt-2 leading-tight">
                      Aumenta tus Ventas y Clientes en Tiempo Récord
                    </h3>
                    <p className="text-xs sm:text-sm text-white/70 mt-2 max-w-md mx-auto leading-relaxed">
                      Transformamos visitantes casuales en clientes recurrentes con una Landing Page optimizada para la conversión.
                    </p>

                    {/* Fictional Countdown Timer */}
                    <div className="flex justify-center gap-2 my-4">
                      <div className="bg-[#141414] px-3 py-1.5 rounded-lg border border-white/10 text-center">
                        <span className="font-mono text-base font-black text-[#2563EB]">04</span>
                        <span className="text-[8px] text-white/40 block uppercase">Horas</span>
                      </div>
                      <div className="bg-[#141414] px-3 py-1.5 rounded-lg border border-white/10 text-center">
                        <span className="font-mono text-base font-black text-[#2563EB]">32</span>
                        <span className="text-[8px] text-white/40 block uppercase">Minutos</span>
                      </div>
                      <div className="bg-[#141414] px-3 py-1.5 rounded-lg border border-white/10 text-center">
                        <span className="font-mono text-base font-black text-[#2563EB]">45</span>
                        <span className="text-[8px] text-white/40 block uppercase">Segundos</span>
                      </div>
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
                        className="border border-white/20 text-white/80 px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-white/5"
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
                        className="bg-[#141414] p-3 rounded-2xl border border-white/5 text-left hover:border-[#2563EB]/40 transition-all group"
                      >
                        <span className="text-xl block mb-1">{ben.icon}</span>
                        <h4 className="font-bold text-xs text-white group-hover:text-[#2563EB]">{ben.title}</h4>
                        <p className="text-[10px] text-white/40 mt-0.5">{ben.desc}</p>
                      </button>
                    ))}
                  </div>

                  {/* Interactive Testimonial Selector */}
                  <div className="bg-[#141414] p-4 rounded-2xl border border-white/5 space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-xs text-white">⭐ Opiniones de Clientes Reales</h4>
                      <div className="flex gap-1">
                        {[0, 1, 2].map((idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveTestimonial(idx)}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${
                              activeTestimonial === idx ? 'bg-[#2563EB] w-5' : 'bg-white/20'
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
                        <div key={idx} className="bg-[#090909] p-3.5 rounded-xl border border-white/5 animate-fadeIn">
                          <p className="text-xs text-white/80 italic">"{t.comment}"</p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="font-bold text-xs text-[#2563EB]">{t.name}</span>
                            <span className="text-[10px] text-white/40">{t.role}</span>
                          </div>
                        </div>
                      )
                    ))}
                  </div>

                  {/* Interactive Lead Form embedded in Wireframe */}
                  <div className="bg-[#141414] p-5 rounded-2xl border border-[#2563EB]/40 relative">
                    <h4 className="font-bold text-xs text-center text-white mb-1">
                      📩 Formulario de Captura de Prospectos
                    </h4>
                    <p className="text-[10px] text-white/40 text-center mb-4">Prueba enviando una solicitud ficticia:</p>

                    {landingFormSubmitted ? (
                      <div className="bg-green-500/20 border border-green-500/40 p-5 rounded-2xl text-center animate-fadeIn">
                        <span className="text-3xl block mb-2">✅</span>
                        <p className="font-black text-xs text-green-400">¡Prospecto Capturado con Éxito!</p>
                        <p className="text-[10px] text-white/70 mt-1">El mensaje llegará directamente a tu correo electrónico y celular.</p>
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
                          <label className="text-[10px] text-white/60 font-semibold mb-1 block">Tu Nombre</label>
                          <input
                            type="text"
                            required
                            placeholder="Ej. Juan Pérez"
                            className="w-full bg-[#080808] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#2563EB]"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-white/60 font-semibold mb-1 block">Tu WhatsApp / Teléfono</label>
                          <input
                            type="tel"
                            required
                            placeholder="Ej. 300 123 4567"
                            className="w-full bg-[#080808] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#2563EB]"
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
                      <div className="absolute right-0 bottom-14 bg-[#1A1A1A] border border-emerald-500/40 p-4 rounded-2xl shadow-2xl w-64 animate-fadeIn z-30">
                        <div className="flex items-center justify-between pb-2 border-b border-white/10">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center font-black text-xs text-black">WA</div>
                            <div>
                              <p className="text-xs font-bold text-white">Soporte en Vivo</p>
                              <p className="text-[9px] text-emerald-400">En línea ahora</p>
                            </div>
                          </div>
                          <button onClick={() => setShowWaChat(false)} className="text-xs text-white/50">✕</button>
                        </div>
                        <p className="text-xs text-white/90 mt-3 bg-[#080808] p-3 rounded-xl border border-white/5">
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
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md p-6 rounded-2xl z-40 flex flex-col justify-center animate-fadeIn">
                      <div className="bg-[#141414] p-5 rounded-2xl border border-[#2563EB]/40 relative">
                        <button
                          onClick={() => setLandingFormModal(false)}
                          className="absolute top-3 right-3 text-white/50 hover:text-white text-xs font-bold"
                        >
                          ✕
                        </button>
                        <h4 className="font-extrabold text-sm text-center text-white mb-2">
                          🎁 Solicita tu Descuento Exclusivo
                        </h4>
                        <p className="text-xs text-white/60 text-center mb-4">Ingresa tus datos para activar la promoción:</p>
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            setLandingFormModal(false);
                            triggerToast('🎉 ¡Descuento reservado con éxito!');
                          }}
                          className="space-y-3"
                        >
                          <input type="text" required placeholder="Nombre completo" className="w-full bg-[#080808] border border-white/10 rounded-xl px-3 py-2 text-xs text-white" />
                          <input type="email" required placeholder="Correo electrónico" className="w-full bg-[#080808] border border-white/10 rounded-xl px-3 py-2 text-xs text-white" />
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
                  <div className="bg-[#141414] p-2.5 rounded-2xl border border-white/10 flex items-center justify-between gap-1 overflow-x-auto select-none">
                    <div className="flex items-center gap-1">
                      {['inicio', 'servicios', 'nosotros', 'portafolio', 'faq', 'contacto'].map((pg) => (
                        <button
                          key={pg}
                          onClick={() => setActivePage(pg)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap ${
                            activePage === pg
                              ? 'bg-[#2563EB] text-white shadow-md'
                              : 'text-white/60 hover:text-white hover:bg-white/5'
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
                      <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-[#141414] p-6 rounded-2xl border border-blue-500/30 text-center">
                        <span className="text-[10px] bg-[#2563EB] text-white px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider mb-2 inline-block">
                          Empresa Líder en Soluciones
                        </span>
                        <h3 className="font-black text-xl sm:text-2xl text-white">Innovación Digital para tu Negocio</h3>
                        <p className="text-xs text-white/60 mt-2 max-w-md mx-auto leading-relaxed">
                          Construimos plataformas corporativas completas que proyectan confianza y atraen grandes clientes.
                        </p>
                        <button
                          onClick={() => setActivePage('servicios')}
                          className="mt-4 bg-[#2563EB] hover:bg-blue-600 text-white px-5 py-2 rounded-xl text-xs font-bold transition-all"
                        >
                          Explorar Servicios →
                        </button>
                      </div>

                      {/* Statistics Counter */}
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-[#141414] p-3 rounded-xl border border-white/5">
                          <p className="text-lg font-black text-[#2563EB]">+180</p>
                          <p className="text-[9px] text-white/50 uppercase font-semibold">Proyectos Entregados</p>
                        </div>
                        <div className="bg-[#141414] p-3 rounded-xl border border-white/5">
                          <p className="text-lg font-black text-[#2563EB]">99.8%</p>
                          <p className="text-[9px] text-white/50 uppercase font-semibold">Disponibilidad</p>
                        </div>
                        <div className="bg-[#141414] p-3 rounded-xl border border-white/5">
                          <p className="text-lg font-black text-[#2563EB]">10+</p>
                          <p className="text-[9px] text-white/50 uppercase font-semibold">Años Experiencia</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ACTIVE PAGE: SERVICIOS */}
                  {activePage === 'servicios' && (
                    <div className="space-y-3 animate-fadeIn">
                      <div className="flex justify-between items-center">
                        <h4 className="font-extrabold text-sm text-white">💼 Portafolio de Servicios Corporativos</h4>
                        <span className="text-[10px] text-white/40">Haz clic en "Ver Detalle"</span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { title: 'Desarrollo Web a Medida', icon: '💻', desc: 'Soluciones empresariales escalables construidas con código limpio.' },
                          { title: 'Diseño UX/UI & Marca', icon: '🎨', desc: 'Interfaces modernas pensadas para la mejor experiencia de usuario.' },
                          { title: 'SEO & Posicionamiento', icon: '🚀', desc: 'Estrategia para aparecer en las primeras posiciones de Google.' },
                          { title: 'Mantenimiento & Nube', icon: '☁️', desc: 'Servidores de alta velocidad, respaldos y monitoreo continuo.' }
                        ].map((srv, idx) => (
                          <div key={idx} className="bg-[#141414] p-4 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-[#2563EB]/40 transition-all">
                            <div>
                              <span className="text-2xl block mb-1">{srv.icon}</span>
                              <h5 className="font-bold text-xs text-white">{srv.title}</h5>
                              <p className="text-[10px] text-white/50 mt-1 leading-normal">{srv.desc}</p>
                            </div>
                            <button
                              onClick={() => setSelectedServiceModal(srv)}
                              className="mt-3 text-[10px] bg-[#2563EB]/20 text-[#2563EB] py-1.5 px-3 rounded-lg font-bold hover:bg-[#2563EB] hover:text-white transition-all text-center"
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
                      <div className="bg-[#141414] p-5 rounded-2xl border border-white/5 space-y-3 text-left">
                        <span className="text-[10px] bg-[#2563EB]/20 text-[#2563EB] px-2.5 py-0.5 rounded font-bold uppercase">
                          Nuestra Trayectoria
                        </span>
                        <h4 className="font-extrabold text-sm text-white">Sobre Nuestra Empresa</h4>
                        <p className="text-xs text-white/70 leading-relaxed">
                          Somos un equipo apasionado por el desarrollo de software y el diseño de experiencia digital. Ayudamos a empresas colombianas a escalar su presencia con tecnología de punta.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-left">
                        <div className="bg-[#141414] p-3 rounded-xl border border-white/5">
                          <h5 className="font-bold text-xs text-[#2563EB]">🎯 Misión</h5>
                          <p className="text-[10px] text-white/50 mt-1">Conectar negocios con sus clientes ideales a través de páginas web excepcionales.</p>
                        </div>
                        <div className="bg-[#141414] p-3 rounded-xl border border-white/5">
                          <h5 className="font-bold text-xs text-[#2563EB]">👁️ Visión</h5>
                          <p className="text-[10px] text-white/50 mt-1">Ser la agencia referente en desarrollo web transparente y accesible.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ACTIVE PAGE: PORTAFOLIO */}
                  {activePage === 'portafolio' && (
                    <div className="space-y-3 animate-fadeIn">
                      <div className="flex justify-between items-center">
                        <h4 className="font-bold text-xs text-white">🖼️ Galería de Proyectos Recientes</h4>
                        {/* Filter pills */}
                        <div className="flex gap-1">
                          {['Todos', 'E-commerce', 'Corporativos'].map((f) => (
                            <button
                              key={f}
                              onClick={() => setPortfolioFilter(f)}
                              className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                                portfolioFilter === f ? 'bg-[#2563EB] text-white' : 'bg-white/10 text-white/50'
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
                              className="bg-[#141414] rounded-xl p-3 border border-white/5 text-left hover:border-[#2563EB] transition-all group"
                            >
                              <div className={`h-20 rounded-lg bg-gradient-to-br ${proj.imgColor} flex items-center justify-center font-bold text-xs text-white mb-2 group-hover:scale-105 transition-transform`}>
                                {proj.title}
                              </div>
                              <span className="text-[9px] text-[#2563EB] font-bold block">{proj.type}</span>
                              <h5 className="font-bold text-xs text-white truncate">{proj.title}</h5>
                            </button>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* ACTIVE PAGE: FAQ */}
                  {activePage === 'faq' && (
                    <div className="space-y-3 text-left animate-fadeIn">
                      <h4 className="font-bold text-xs text-white mb-2">❓ Preguntas Frecuentes (Acordeón Interactivo)</h4>
                      {[
                        { q: '¿Cuánto tiempo toma tener mi web lista?', a: 'El tiempo promedio de entrega es de 5 a 8 días hábiles dependiendo del volumen de información.' },
                        { q: '¿El sitio web queda a mi nombre?', a: 'Totalmente. Tanto el dominio como los contenidos son de tu propiedad.' },
                        { q: '¿Cómo funciona el soporte técnico?', a: 'Con el plan mensual cuentas con asistencia directa por WhatsApp para cualquier ajuste que requieras.' },
                        { q: '¿Se puede integrar pasarelas de pago?', a: '¡Por supuesto! Integramos pasarelas como Wompi, Nequi, Daviplata, MercadoPago y PSE.' }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-[#141414] rounded-xl border border-white/5 overflow-hidden">
                          <button
                            onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                            className="w-full text-left p-3.5 text-xs font-bold text-white flex justify-between items-center hover:bg-white/5 transition-all"
                          >
                            <span>{item.q}</span>
                            <span className="text-[#2563EB] font-black text-sm">{openFaqIndex === idx ? '−' : '+'}</span>
                          </button>
                          {openFaqIndex === idx && (
                            <div className="p-3.5 bg-[#080808] text-[11px] text-white/70 border-t border-white/5 animate-fadeIn">
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
                      <div className="bg-[#141414] p-4 rounded-2xl border border-white/5 space-y-2 text-left">
                        <h4 className="font-bold text-xs text-white">📍 Ubicación & Formulario de Contacto</h4>
                        <div className="flex justify-between items-center bg-[#080808] p-2.5 rounded-xl border border-white/10 text-xs">
                          <span className="text-white/70">Modo de Mapa:</span>
                          <div className="flex gap-1">
                            <button
                              onClick={() => setMapType('mapa')}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${mapType === 'mapa' ? 'bg-[#2563EB] text-white' : 'bg-white/10 text-white/50'}`}
                            >
                              Mapa
                            </button>
                            <button
                              onClick={() => setMapType('satelite')}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${mapType === 'satelite' ? 'bg-[#2563EB] text-white' : 'bg-white/10 text-white/50'}`}
                            >
                              Satélite
                            </button>
                          </div>
                        </div>

                        {/* Interactive Simulated Map */}
                        <div className={`h-28 rounded-xl flex items-center justify-center font-bold text-xs transition-all border border-white/10 ${
                          mapType === 'mapa' ? 'bg-gradient-to-r from-emerald-900/60 to-teal-900/60 text-emerald-300' : 'bg-gradient-to-r from-slate-900 to-zinc-900 text-cyan-300'
                        }`}>
                          🗺️ [Simulador de Google Maps - Bogotá, Colombia]
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Service Detail Modal */}
                  {selectedServiceModal && (
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md p-6 rounded-2xl z-40 flex flex-col justify-center animate-fadeIn">
                      <div className="bg-[#141414] p-5 rounded-2xl border border-[#2563EB] space-y-3 text-left">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-sm text-white">{selectedServiceModal.title}</h4>
                          <button onClick={() => setSelectedServiceModal(null)} className="text-white/50 font-bold text-xs">✕</button>
                        </div>
                        <p className="text-xs text-white/70">{selectedServiceModal.desc}</p>
                        <button
                          onClick={() => {
                            setSelectedServiceModal(null);
                            triggerToast('✅ Consulta sobre el servicio enviada');
                          }}
                          className="w-full bg-[#2563EB] text-white font-bold py-2 rounded-xl text-xs"
                        >
                          Solicitar Información de este Servicio
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Project Detail Modal */}
                  {selectedProjectModal && (
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md p-6 rounded-2xl z-40 flex flex-col justify-center animate-fadeIn">
                      <div className="bg-[#141414] p-5 rounded-2xl border border-white/20 space-y-3 text-left">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-sm text-white">{selectedProjectModal.title}</h4>
                          <button onClick={() => setSelectedProjectModal(null)} className="text-white/50 font-bold text-xs">✕</button>
                        </div>
                        <p className="text-xs text-white/70">{selectedProjectModal.desc}</p>
                        <span className="text-[10px] bg-[#2563EB]/20 text-[#2563EB] px-2 py-0.5 rounded font-bold">
                          Categoría: {selectedProjectModal.type}
                        </span>
                        <button
                          onClick={() => {
                            setSelectedProjectModal(null);
                            triggerToast('🌐 Abriendo demo del proyecto...');
                          }}
                          className="w-full bg-[#2563EB] text-white font-bold py-2 rounded-xl text-xs mt-2"
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
                  <div className="bg-[#141414] p-3 rounded-2xl border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🛍️</span>
                        <span className="font-black text-sm text-white">TechStore Colombia</span>
                      </div>

                      {/* Cart Trigger Button */}
                      <button
                        onClick={() => setShowCartDrawer(!showCartDrawer)}
                        className="bg-[#2563EB] hover:bg-blue-600 text-white px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-lg transition-all relative"
                      >
                        🛒 Carrito
                        <span className="bg-white text-[#2563EB] px-1.5 py-0.2 rounded-full text-[10px] font-black">
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
                        className="w-full bg-[#080808] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#2563EB]"
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
                            ? 'bg-white text-black shadow-md'
                            : 'bg-[#141414] text-white/60 hover:text-white'
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
                        <div key={prod.id} className="bg-[#141414] rounded-2xl p-3 border border-white/5 flex flex-col justify-between hover:border-[#2563EB]/40 transition-all group relative">
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
                              <span className="text-[9px] bg-white/10 text-white/70 px-1.5 py-0.5 rounded font-semibold uppercase">
                                {prod.tag}
                              </span>
                              <span className="text-[9px] text-amber-400 font-bold">{prod.rating}</span>
                            </div>

                            <h5 className="font-bold text-xs text-white mt-1.5 line-clamp-1">{prod.name}</h5>
                            <div className="flex items-baseline gap-1.5 mt-0.5">
                              <span className="text-xs font-black text-[#2563EB]">{formatCOP(prod.price)}</span>
                              <span className="text-[9px] text-white/30 line-through">{formatCOP(prod.oldPrice)}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-1 mt-2">
                            <button
                              onClick={() => setQuickViewProduct(prod)}
                              className="bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold py-1.5 rounded-lg text-center"
                            >
                              Detalle
                            </button>
                            <button
                              onClick={() => addToCart(prod)}
                              className="bg-[#2563EB] hover:bg-blue-600 text-white font-bold py-1.5 rounded-lg text-[10px] text-center shadow-md"
                            >
                              + Añadir
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Quick View Product Modal */}
                  {quickViewProduct && (
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md p-5 rounded-2xl z-40 flex flex-col justify-between animate-fadeIn">
                      <div>
                        <div className="flex justify-between items-center pb-2 border-b border-white/10">
                          <h4 className="font-bold text-xs text-white">Detalle de Producto</h4>
                          <button onClick={() => setQuickViewProduct(null)} className="text-white/50 text-xs font-bold">✕ Cerrar</button>
                        </div>

                        <div className="mt-3 text-center">
                          <div className={`h-32 rounded-2xl bg-gradient-to-br ${quickViewProduct.color} flex items-center justify-center text-4xl font-black text-white shadow-xl mb-3`}>
                            {quickViewProduct.name.substring(0, 2)}
                          </div>
                          <h4 className="font-extrabold text-sm text-white">{quickViewProduct.name}</h4>
                          <p className="text-xs font-black text-[#2563EB] mt-1">{formatCOP(quickViewProduct.price)}</p>
                          <p className="text-[10px] text-white/50 mt-1">Disponibles en inventario: {quickViewProduct.stock} unidades</p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          addToCart(quickViewProduct);
                          setQuickViewProduct(null);
                        }}
                        className="w-full bg-[#2563EB] hover:bg-blue-600 text-white font-bold py-2.5 rounded-xl text-xs shadow-lg"
                      >
                        Añadir al Carrito de Compras
                      </button>
                    </div>
                  )}

                  {/* Live Interactive Cart Drawer */}
                  {showCartDrawer && (
                    <div className="absolute inset-0 bg-black/95 backdrop-blur-md p-4 rounded-2xl z-40 flex flex-col justify-between animate-fadeIn">
                      <div>
                        <div className="flex justify-between items-center pb-2 border-b border-white/10">
                          <h4 className="font-bold text-xs text-white flex items-center gap-2">
                            🛒 Tu Carrito ({cartCount} artículos)
                          </h4>
                          <button
                            onClick={() => setShowCartDrawer(false)}
                            className="text-xs text-white/50 hover:text-white font-bold"
                          >
                            ✕ Cerrar
                          </button>
                        </div>

                        {/* Cart Items List */}
                        <div className="mt-3 space-y-2 max-h-48 overflow-y-auto pr-1">
                          {cart.length === 0 ? (
                            <p className="text-xs text-white/40 text-center py-6">Tu carrito está vacío</p>
                          ) : (
                            cart.map((item) => (
                              <div key={item.id} className="bg-[#141414] p-2.5 rounded-xl flex justify-between items-center border border-white/5">
                                <div>
                                  <p className="font-bold text-xs text-white">{item.name}</p>
                                  <p className="text-[10px] text-white/50">{formatCOP(item.price)} c/u</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center bg-[#080808] rounded-lg border border-white/10 px-1.5 py-0.5 text-xs">
                                    <button onClick={() => updateCartQty(item.id, -1)} className="px-1 text-white/50 hover:text-white font-bold">-</button>
                                    <span className="px-1.5 font-bold text-white">{item.qty}</span>
                                    <button onClick={() => updateCartQty(item.id, 1)} className="px-1 text-white/50 hover:text-white font-bold">+</button>
                                  </div>
                                  <button onClick={() => removeFromCart(item.id)} className="text-red-400 text-xs hover:text-red-300 font-bold">🗑️</button>
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
                              className="flex-1 bg-[#080808] border border-white/10 rounded-xl px-2.5 py-1 text-[11px] text-white uppercase placeholder-white/30"
                            />
                            <button
                              onClick={applyCoupon}
                              className="bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold px-3 rounded-xl"
                            >
                              Aplicar
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Cart Totals Footer */}
                      {cart.length > 0 && (
                        <div className="pt-3 border-t border-white/10 space-y-2">
                          {discountApplied > 0 && (
                            <div className="flex justify-between text-[11px] text-green-400">
                              <span>Descuento (10%):</span>
                              <span>-{formatCOP(discountAmount)}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-xs font-bold text-white">
                            <span>Total a Pagar:</span>
                            <span className="text-[#2563EB] text-sm font-black">{formatCOP(finalTotal)}</span>
                          </div>
                          <button
                            onClick={() => {
                              setShowCartDrawer(false);
                              setShowCheckoutStep(1);
                            }}
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-2.5 rounded-xl text-xs shadow-lg transition-all"
                          >
                            Ir al Checkout / Pasarela →
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 3-Step Interactive Checkout Modal */}
                  {showCheckoutStep > 0 && (
                    <div className="absolute inset-0 bg-black/95 backdrop-blur-md p-5 rounded-2xl z-50 flex flex-col justify-between animate-fadeIn">
                      
                      {/* Step 1: Customer Info */}
                      {showCheckoutStep === 1 && (
                        <div>
                          <div className="flex justify-between items-center pb-2 border-b border-white/10">
                            <h4 className="font-bold text-xs text-white">Paso 1: Datos de Envío</h4>
                            <button onClick={() => setShowCheckoutStep(0)} className="text-xs text-white/50">✕ Cancelar</button>
                          </div>

                          <div className="space-y-2 mt-3 text-left">
                            <input type="text" placeholder="Nombre completo" defaultValue="Carlos Gómez" className="w-full bg-[#080808] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white" />
                            <input type="text" placeholder="Dirección de entrega" defaultValue="Calle 100 #15-30" className="w-full bg-[#080808] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white" />
                            <input type="text" placeholder="Ciudad / Municipio" defaultValue="Bogotá D.C." className="w-full bg-[#080808] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white" />
                          </div>
                        </div>
                      )}

                      {/* Step 2: Payment Gateway Selection */}
                      {showCheckoutStep === 2 && (
                        <div>
                          <div className="flex justify-between items-center pb-2 border-b border-white/10">
                            <h4 className="font-bold text-xs text-white">Paso 2: Método de Pago</h4>
                            <button onClick={() => setShowCheckoutStep(0)} className="text-xs text-white/50">✕ Cancelar</button>
                          </div>

                          <div className="grid grid-cols-2 gap-2 mt-3 text-center">
                            {[
                              { id: 'wompi', name: 'Wompi / Bancolombia', color: 'text-blue-400' },
                              { id: 'nequi', name: 'Nequi / Daviplata', color: 'text-emerald-400' },
                              { id: 'card', name: 'Tarjeta Crédito/Débito', color: 'text-yellow-400' },
                              { id: 'pse', name: 'PSE / Efecty', color: 'text-purple-400' }
                            ].map((pm) => (
                              <button
                                key={pm.id}
                                onClick={() => setPaymentMethod(pm.id)}
                                className={`p-2.5 rounded-xl border transition-all text-xs font-bold ${
                                  paymentMethod === pm.id
                                    ? 'border-[#2563EB] bg-[#2563EB]/20 text-white'
                                    : 'border-white/10 bg-[#080808] text-white/60'
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
                          <h4 className="font-black text-sm text-green-400">¡Pedido Confirmado con Éxito!</h4>
                          <p className="text-[10px] text-white/60">Número de Orden: <strong class="text-white">#VW-89420</strong></p>
                          <div className="bg-[#080808] p-3 rounded-xl border border-white/10 text-xs text-white/80 space-y-1">
                            <p>Total pagado: <strong class="text-[#2563EB]">{formatCOP(finalTotal)}</strong></p>
                            <p>Método: {paymentMethod.toUpperCase()}</p>
                          </div>
                        </div>
                      )}

                      {/* Navigation buttons inside Checkout */}
                      <div className="pt-3 border-t border-white/10 flex justify-between">
                        {showCheckoutStep === 1 && (
                          <button onClick={() => setShowCheckoutStep(2)} className="w-full bg-[#2563EB] text-white font-bold py-2 rounded-xl text-xs">
                            Continuar al Pago →
                          </button>
                        )}
                        {showCheckoutStep === 2 && (
                          <button onClick={() => setShowCheckoutStep(3)} className="w-full bg-emerald-600 text-white font-bold py-2 rounded-xl text-xs">
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
                            className="w-full bg-[#2563EB] text-white font-bold py-2 rounded-xl text-xs"
                          >
                            Finalizar Simulación
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: PRICING & INCLUDED FEATURES CARD ================= */}
        <div className="lg:col-span-5 bg-[#0D0D0D] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-[#2563EB]/20 text-[#2563EB] border border-[#2563EB]/30 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide">
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
                  <span className="text-xs font-bold text-[#2563EB] ml-1.5">
                    {billingMode === 'monthly' ? '/ mes' : ' (Pago Único)'}
                  </span>
                </div>
              </div>

              {billingMode === 'monthly' ? (
                <div className="mt-2 pt-2 border-t border-white/5 flex items-center gap-2 text-[11px] text-green-400 font-semibold">
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
                    <span className="text-[#2563EB] font-bold mt-0.5">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Monthly Maintenance Perks if Monthly */}
            {billingMode === 'monthly' && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <h4 className="text-xs font-extrabold text-green-400 uppercase tracking-wider mb-2">
                  Incluido en Mantenimiento Mes a Mes:
                </h4>
                <ul className="space-y-1.5">
                  {plan.maintenanceBenefits.map((ben, i) => (
                    <li key={i} className="flex items-center gap-2 text-[11px] text-white/60">
                      <span className="text-green-400 font-bold">•</span>
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
              className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold py-4 px-6 rounded-2xl transition-all duration-300 shadow-xl shadow-blue-500/25 flex items-center justify-center gap-3 text-sm btn-shine group"
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
