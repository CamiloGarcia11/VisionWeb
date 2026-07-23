import React, { useState } from 'react';

const PLANS_DATA = {
  landing: {
    id: 'landing',
    name: 'Landing Page',
    badge: 'Más Popular para Emprendedores',
    monthlyPrice: 150000,
    oneTimePrice: 490000,
    desc: 'Página de alta conversión diseñada para captar clientes rápida y eficazmente en campañas de marketing.',
    url: 'https://demo.visionweb.com/landing-conversion',
    features: [
      '1 Página estratégica orientada a ventas/lead generation',
      'Formulario de contacto interactivo directo a tu email',
      'Integración con Botón Flotante de WhatsApp',
      'Optimizada 100% para celulares y tablets (Responsive)',
      'Hosting de alta velocidad + Certificado SSL de seguridad',
      'SEO inicial y velocidad de carga ultrarrápida (< 1 seg)'
    ],
    maintenanceBenefits: [
      'Mantenimiento continuo mensual incluido',
      'Cambios ilimitados de imágenes y textos',
      'Monitoreo de disponibilidad 24/7 y respaldos de seguridad',
      'Soporte técnico directo por WhatsApp'
    ]
  },
  multisection: {
    id: 'multisection',
    name: 'Página Web Multisección',
    badge: 'Ideal para Empresas y Profesionales',
    monthlyPrice: 260000,
    oneTimePrice: 890000,
    desc: 'Sitio web completo corporativo con múltiples páginas para estructurar toda la información de tu negocio.',
    url: 'https://demo.visionweb.com/sitio-corporativo',
    features: [
      'Hasta 5 Secciones independientes (Inicio, Nosotros, Servicios, Galería, Contacto)',
      'Menú de navegación interactivo con barra superior',
      'Grilla dinámica de Servicios y Portafolio con filtros',
      'Sección de Preguntas Frecuentes (FAQ) interactivas',
      'Integración con Google Maps y múltiples formularios',
      'Optimización SEO avanzada para posicionamiento Google'
    ],
    maintenanceBenefits: [
      'Mantenimiento continuo y soporte técnico preferencial',
      'Actualización mensual de proyectos, noticias o servicios',
      'Optimización periódica de velocidad y seguridad SSL',
      'Asesoría mensual en presencia digital'
    ]
  },
  ecommerce: {
    id: 'ecommerce',
    name: 'E-commerce (Tienda Online)',
    badge: 'Máximo Potencial de Ventas',
    monthlyPrice: 390000,
    oneTimePrice: 1490000,
    desc: 'Tienda virtual completa con catálogo interactivo, carrito de compras y pasarela de pago para vender 24/7.',
    url: 'https://demo.visionweb.com/tienda-online',
    features: [
      'Catálogo de productos ilimitado con categorías y buscador',
      'Carrito de compras interactivo con cálculo automático',
      'Integración con Pasarelas de Pago (Wompi, Bold, Nequi, MercadoPago)',
      'Panel de Administración fácil para gestionar inventario y ventas',
      'Notificaciones de pedidos por WhatsApp y Correo Electrónico',
      'Certificado SSL transaccional y protección contra fraudes'
    ],
    maintenanceBenefits: [
      'Soporte continuo y mantenimiento de catálogo',
      'Actualizaciones de seguridad y mantenimiento de pasarelas',
      'Copia de respaldo diaria de la base de datos de productos',
      'Asistencia técnica dedicada para ventas online'
    ]
  }
};

// Sample E-commerce products
const ECOMMERCE_PRODUCTS = [
  { id: 1, name: 'Zapatillas Urban Neon', price: 189000, category: 'Calzado', tag: 'Top Ventas', color: 'from-blue-600 to-indigo-600' },
  { id: 2, name: 'Reloj Smartwatch Pro 2', price: 245000, category: 'Tecnología', tag: 'Nuevo', color: 'from-purple-600 to-pink-600' },
  { id: 3, name: 'Auriculares Inalámbricos X', price: 120000, category: 'Tecnología', tag: 'Oferta', color: 'from-[#2563EB] to-cyan-500' },
  { id: 4, name: 'Chaqueta Impermeable Tech', price: 210000, category: 'Moda', tag: 'Popular', color: 'from-emerald-600 to-teal-600' }
];

export default function InteractiveBocetosShowcase() {
  const [selectedTab, setSelectedTab] = useState('landing');
  const [billingMode, setBillingMode] = useState('monthly'); // 'monthly' | 'oneTime'
  const [deviceMode, setDeviceMode] = useState('desktop'); // 'desktop' | 'mobile'

  // Interactive state for Landing Wireframe
  const [leadFormSubmitted, setLeadFormSubmitted] = useState(false);
  const [showWaBubble, setShowWaBubble] = useState(false);

  // Interactive state for Multisection Wireframe
  const [activeNavPage, setActiveNavPage] = useState('inicio');
  const [openFaq, setOpenFaq] = useState(null);

  // Interactive state for E-commerce Wireframe
  const [cart, setCart] = useState([
    { id: 1, name: 'Zapatillas Urban Neon', price: 189000, qty: 1 }
  ]);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [productCategory, setProductCategory] = useState('Todos');
  const [toastMessage, setToastMessage] = useState(null);

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
    setTimeout(() => setToastMessage(null), 3000);
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
    triggerToast(`🛒 ¡${product.name} agregado al carrito!`);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const getWaLink = () => {
    const modeText = billingMode === 'monthly'
      ? `la suscripción mensual de ${formatCOP(plan.monthlyPrice)}/mes (con mantenimiento incluido)`
      : `el pago único de ${formatCOP(plan.oneTimePrice)}`;

    const text = encodeURIComponent(
      `Hola Vision Web! 👋 Me interesa contratar la opción de *${plan.name}* en ${modeText}. ¿Podrían brindarme más información para iniciar mi proyecto?`
    );
    return `https://wa.me/573052311490?text=${text}`;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2563EB] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce border border-white/20">
          <span className="text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/30 text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-4">
          ✨ Experimenta Nuevas Funcionalidades
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
          Bocetos <span className="text-[#2563EB]">Interactivos</span> en Vivo
        </h2>
        <p className="text-white/60 text-base sm:text-lg leading-relaxed">
          Prueba directamente en esta demostración cómo funcionará tu página web. Selecciona el tipo de proyecto, interactúa con sus módulos y descubre nuestros precios accesibles.
        </p>
      </div>

      {/* Controls Bar: Project Tabs & Billing Mode Switcher */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-[#0D0D0D] p-3 sm:p-4 rounded-3xl border border-white/10 mb-10 shadow-2xl">
        {/* Project Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 w-full lg:w-auto">
          {Object.values(PLANS_DATA).map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setSelectedTab(p.id);
                setLeadFormSubmitted(false);
                setActiveNavPage('inicio');
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

        {/* Right side: Device simulator mode & Billing Mode Switcher */}
        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-center sm:justify-end">
          {/* Device Switcher */}
          <div className="bg-[#1F1F1F] p-1 rounded-xl flex items-center border border-white/10">
            <button
              onClick={() => setDeviceMode('desktop')}
              title="Vista Escritorio"
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                deviceMode === 'desktop' ? 'bg-[#2563EB] text-white' : 'text-white/40 hover:text-white'
              }`}
            >
              💻 <span className="hidden sm:inline">Escritorio</span>
            </button>
            <button
              onClick={() => setDeviceMode('mobile')}
              title="Vista Celular"
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                deviceMode === 'mobile' ? 'bg-[#2563EB] text-white' : 'text-white/40 hover:text-white'
              }`}
            >
              📱 <span className="hidden sm:inline">Móvil</span>
            </button>
          </div>

          {/* Billing Mode Switcher (Monthly vs OneTime) */}
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

      {/* Main Grid: Interactive Canvas & Plan Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Wireframe Simulator Canvas (7 cols) */}
        <div className="lg:col-span-7 flex justify-center">
          <div
            className={`transition-all duration-500 bg-[#141414] rounded-3xl border border-white/15 shadow-2xl overflow-hidden relative flex flex-col ${
              deviceMode === 'mobile'
                ? 'w-[360px] min-h-[640px] border-[10px] border-[#262626] rounded-[40px]'
                : 'w-full min-h-[580px]'
            }`}
          >
            {/* Window Browser Header */}
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
                Demo
              </div>
            </div>

            {/* Canvas Body Content based on selectedTab */}
            <div className="flex-1 p-4 sm:p-6 bg-[#090909] text-white overflow-y-auto max-h-[550px] relative scrollbar-thin">
              
              {/* ==================== 1. LANDING PAGE WIREFRAME ==================== */}
              {selectedTab === 'landing' && (
                <div className="space-y-6 animate-fadeIn">
                  {/* Mini Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#2563EB] flex items-center justify-center font-black text-xs">VW</div>
                      <span className="font-extrabold text-sm tracking-tight text-white">Tu Marca Pro</span>
                    </div>
                    <a
                      href="#contacto-demo"
                      className="bg-[#2563EB] text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-600 transition-all shadow-md shadow-blue-500/20"
                    >
                      Solicitar Oferta
                    </a>
                  </div>

                  {/* Hero Wireframe */}
                  <div className="text-center py-6 px-4 bg-gradient-to-b from-[#2563EB]/15 to-transparent rounded-2xl border border-white/5 relative overflow-hidden">
                    <span className="text-[10px] bg-[#2563EB]/20 text-[#2563EB] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider mb-2 inline-block">
                      🔥 Oferta Exclusiva 2026
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white mt-2 leading-tight">
                      Aumenta tus Ventas con una Página Web de Alto Impacto
                    </h3>
                    <p className="text-xs text-white/60 mt-2 max-w-md mx-auto">
                      Diseñada estratégicamente para convertir visitantes en clientes activos. Lista en tiempo récord.
                    </p>
                    <div className="mt-4 flex justify-center gap-2">
                      <button
                        onClick={() => triggerToast('⚡ Botón de CTA interactivo cliqueado')}
                        className="bg-[#2563EB] hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg"
                      >
                        Quiero Empezar Ahora
                      </button>
                      <button
                        onClick={() => triggerToast('ℹ️ Información desplegada')}
                        className="border border-white/20 text-white/80 px-4 py-2 rounded-xl text-xs font-semibold hover:bg-white/5"
                      >
                        Ver Beneficios
                      </button>
                    </div>
                  </div>

                  {/* Feature Highlights Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#141414] p-3 rounded-xl border border-white/5 text-left">
                      <span className="text-lg mb-1 block">⚡</span>
                      <h4 className="font-bold text-xs">Carga Ultra Rápida</h4>
                      <p className="text-[10px] text-white/40">Optimizada para máxima velocidad en redes móviles.</p>
                    </div>
                    <div className="bg-[#141414] p-3 rounded-xl border border-white/5 text-left">
                      <span className="text-lg mb-1 block">📱</span>
                      <h4 className="font-bold text-xs">100% Celular</h4>
                      <p className="text-[10px] text-white/40">Diseño adaptable a cualquier pantalla táctil.</p>
                    </div>
                  </div>

                  {/* Interactive Lead Form */}
                  <div id="contacto-demo" className="bg-[#141414] p-4 rounded-2xl border border-[#2563EB]/30 relative">
                    <h4 className="font-bold text-xs text-center text-white mb-1">
                      📩 Formulario de Contacto en Vivo
                    </h4>
                    <p className="text-[10px] text-white/40 text-center mb-3">Prueba enviando una solicitud ficticia:</p>

                    {leadFormSubmitted ? (
                      <div className="bg-green-500/20 border border-green-500/40 p-4 rounded-xl text-center animate-fadeIn">
                        <span className="text-2xl mb-1 block">✅</span>
                        <p className="font-bold text-xs text-green-400">¡Mensaje Enviado con Éxito!</p>
                        <p className="text-[10px] text-white/60 mt-1">Así recibirá tu cliente una confirmación instantánea.</p>
                        <button
                          onClick={() => setLeadFormSubmitted(false)}
                          className="mt-2 text-[10px] text-[#2563EB] underline font-bold"
                        >
                          Enviar otro mensaje
                        </button>
                      </div>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setLeadFormSubmitted(true);
                          triggerToast('📩 ¡Formulario de prueba procesado!');
                        }}
                        className="space-y-2 text-left"
                      >
                        <div>
                          <input
                            type="text"
                            required
                            placeholder="Tu Nombre completo"
                            className="w-full bg-[#090909] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#2563EB]"
                          />
                        </div>
                        <div>
                          <input
                            type="email"
                            required
                            placeholder="Tu Correo o Teléfono"
                            className="w-full bg-[#090909] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#2563EB]"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-[#2563EB] hover:bg-blue-600 text-white font-bold py-2 rounded-lg text-xs transition-all shadow-md"
                        >
                          Probar Envío de Formulario
                        </button>
                      </form>
                    )}
                  </div>

                  {/* Floating WhatsApp Interactive Widget */}
                  <div className="relative">
                    <button
                      onClick={() => setShowWaBubble(!showWaBubble)}
                      className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-full text-xs font-bold shadow-lg transition-all ml-auto"
                    >
                      <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                      💬 WhatsApp Flotante (Haz clic)
                    </button>

                    {showWaBubble && (
                      <div className="absolute right-0 bottom-12 bg-[#1A1A1A] border border-emerald-500/40 p-3 rounded-2xl shadow-2xl w-56 animate-fadeIn z-20">
                        <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                          <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] font-bold text-black">WA</div>
                          <span className="text-xs font-bold text-white">Soporte en Vivo</span>
                        </div>
                        <p className="text-[11px] text-white/80 mt-2 bg-[#0D0D0D] p-2 rounded-lg">
                          ¡Hola! 👋 ¿En qué te podemos ayudar hoy con tu pedido?
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ==================== 2. MULTI-SECTION WIREFRAME ==================== */}
              {selectedTab === 'multisection' && (
                <div className="space-y-5 animate-fadeIn">
                  {/* Multi-page Navbar */}
                  <div className="bg-[#141414] p-2 rounded-xl border border-white/10 flex items-center justify-between gap-1 overflow-x-auto">
                    {['inicio', 'servicios', 'nosotros', 'faq', 'contacto'].map((pg) => (
                      <button
                        key={pg}
                        onClick={() => setActiveNavPage(pg)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize transition-all whitespace-nowrap ${
                          activeNavPage === pg
                            ? 'bg-[#2563EB] text-white'
                            : 'text-white/50 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {pg}
                      </button>
                    ))}
                  </div>

                  {/* Active Page View content */}
                  {activeNavPage === 'inicio' && (
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 p-5 rounded-2xl border border-blue-500/30 text-center">
                        <h3 className="font-extrabold text-lg text-white">Soluciones Corporativas Integrales</h3>
                        <p className="text-xs text-white/60 mt-1">Impulsamos la identidad de tu empresa en el mundo digital.</p>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-[#141414] p-2.5 rounded-xl border border-white/5">
                          <p className="text-base font-black text-[#2563EB]">+150</p>
                          <p className="text-[9px] text-white/50">Proyectos</p>
                        </div>
                        <div className="bg-[#141414] p-2.5 rounded-xl border border-white/5">
                          <p className="text-base font-black text-[#2563EB]">100%</p>
                          <p className="text-[9px] text-white/50">Garantía</p>
                        </div>
                        <div className="bg-[#141414] p-2.5 rounded-xl border border-white/5">
                          <p className="text-base font-black text-[#2563EB]">24/7</p>
                          <p className="text-[9px] text-white/50">Soporte</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeNavPage === 'servicios' && (
                    <div className="space-y-3">
                      <h4 className="font-bold text-xs text-white/80">Nuestra Lista de Servicios</h4>
                      <div className="space-y-2">
                        {['Consultoría Digital & Estrategia', 'Diseño de Marca e Identidad Visual', 'Desarrollo de Software a Medida'].map((srv, idx) => (
                          <div key={idx} className="bg-[#141414] p-3 rounded-xl border border-white/5 flex items-center justify-between">
                            <span className="text-xs font-bold text-white/90">{srv}</span>
                            <button
                              onClick={() => triggerToast(`🔍 Viendo detalle de: ${srv}`)}
                              className="text-[10px] bg-[#2563EB]/20 text-[#2563EB] px-2 py-1 rounded font-bold hover:bg-[#2563EB] hover:text-white transition-all"
                            >
                              Saber Más
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeNavPage === 'nosotros' && (
                    <div className="bg-[#141414] p-4 rounded-2xl border border-white/5 space-y-2 text-left">
                      <h4 className="font-bold text-xs text-[#2563EB]">Sobre Nuestra Empresa</h4>
                      <p className="text-xs text-white/70 leading-relaxed">
                        Somos una agencia comprometida con crear soluciones digitales modernas, elegantes e interactivas que aceleran el crecimiento empresarial.
                      </p>
                    </div>
                  )}

                  {activeNavPage === 'faq' && (
                    <div className="space-y-2 text-left">
                      <h4 className="font-bold text-xs text-white/80 mb-2">Preguntas Frecuentes (FAQ Interactivo)</h4>
                      {[
                        { q: '¿Cuánto tarda el desarrollo?', a: 'Entregamos en un promedio de 5 a 10 días hábiles.' },
                        { q: '¿Incluye mantenimiento?', a: '¡Sí! Con el plan mensual cuentas con soporte e intervenciones continuas.' },
                        { q: '¿Puedo cambiar de plan luego?', a: 'Totalmente. Puedes escalar tu sitio cuando lo necesites.' }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-[#141414] rounded-xl border border-white/5 overflow-hidden">
                          <button
                            onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                            className="w-full text-left p-3 text-xs font-bold text-white flex justify-between items-center"
                          >
                            <span>{item.q}</span>
                            <span className="text-[#2563EB]">{openFaq === idx ? '−' : '+'}</span>
                          </button>
                          {openFaq === idx && (
                            <div className="p-3 bg-[#0D0D0D] text-[11px] text-white/60 border-t border-white/5 animate-fadeIn">
                              {item.a}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {activeNavPage === 'contacto' && (
                    <div className="bg-[#141414] p-4 rounded-2xl border border-white/5 space-y-3">
                      <h4 className="font-bold text-xs text-white">📍 Ubicación & Datos de Contacto</h4>
                      <div className="bg-[#090909] p-3 rounded-xl border border-white/10 text-xs text-white/70 space-y-1">
                        <p>📍 Bogotá, Colombia</p>
                        <p>📞 +57 305 231 1490</p>
                        <p>✉️ contacto@visionweb.com</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ==================== 3. E-COMMERCE WIREFRAME ==================== */}
              {selectedTab === 'ecommerce' && (
                <div className="space-y-4 animate-fadeIn">
                  {/* Store Bar Header */}
                  <div className="bg-[#141414] p-2.5 rounded-xl border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🛍️</span>
                      <span className="font-extrabold text-xs text-white">Mi Tienda Online</span>
                    </div>

                    {/* Cart Trigger */}
                    <button
                      onClick={() => setShowCartDrawer(!showCartDrawer)}
                      className="bg-[#2563EB] hover:bg-blue-600 text-white px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-lg transition-all relative"
                    >
                      🛒 Carrito
                      <span className="bg-white text-[#2563EB] px-1.5 py-0.2 rounded-full text-[10px] font-black">
                        {cartCount}
                      </span>
                    </button>
                  </div>

                  {/* Categories Pills */}
                  <div className="flex gap-1.5 overflow-x-auto pb-1">
                    {['Todos', 'Tecnología', 'Calzado', 'Moda'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setProductCategory(cat)}
                        className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${
                          productCategory === cat
                            ? 'bg-white text-black'
                            : 'bg-[#141414] text-white/60 hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Product Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {ECOMMERCE_PRODUCTS
                      .filter(p => productCategory === 'Todos' || p.category === productCategory)
                      .map((prod) => (
                        <div key={prod.id} className="bg-[#141414] rounded-2xl p-3 border border-white/5 flex flex-col justify-between hover:border-[#2563EB]/40 transition-all group">
                          <div>
                            <div className={`h-24 rounded-xl bg-gradient-to-br ${prod.color} flex items-center justify-center text-2xl font-bold text-white shadow-inner mb-2 group-hover:scale-105 transition-transform`}>
                              {prod.name.substring(0, 2)}
                            </div>
                            <span className="text-[9px] bg-white/10 text-white/70 px-1.5 py-0.5 rounded font-semibold uppercase">
                              {prod.tag}
                            </span>
                            <h5 className="font-bold text-xs text-white mt-1 line-clamp-1">{prod.name}</h5>
                            <p className="text-xs font-black text-[#2563EB] mt-0.5">{formatCOP(prod.price)}</p>
                          </div>

                          <button
                            onClick={() => addToCart(prod)}
                            className="mt-2 w-full bg-[#2563EB] hover:bg-blue-600 text-white font-bold py-1.5 rounded-lg text-[10px] transition-all flex items-center justify-center gap-1 shadow-sm"
                          >
                            + Agregar
                          </button>
                        </div>
                      ))}
                  </div>

                  {/* Sliding Interactive Cart Drawer Overlay inside Wireframe */}
                  {showCartDrawer && (
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md p-4 rounded-2xl z-30 flex flex-col justify-between animate-fadeIn">
                      <div>
                        <div className="flex justify-between items-center pb-2 border-b border-white/10">
                          <h4 className="font-bold text-xs text-white flex items-center gap-2">
                            🛒 Tu Carrito de Compras
                          </h4>
                          <button
                            onClick={() => setShowCartDrawer(false)}
                            className="text-xs text-white/50 hover:text-white font-bold"
                          >
                            ✕ Cerrar
                          </button>
                        </div>

                        <div className="mt-3 space-y-2 max-h-56 overflow-y-auto pr-1">
                          {cart.length === 0 ? (
                            <p className="text-xs text-white/40 text-center py-6">Tu carrito está vacío</p>
                          ) : (
                            cart.map((item) => (
                              <div key={item.id} className="bg-[#141414] p-2.5 rounded-xl flex justify-between items-center border border-white/5">
                                <div>
                                  <p className="font-bold text-xs text-white">{item.name}</p>
                                  <p className="text-[10px] text-white/50">{formatCOP(item.price)} x {item.qty}</p>
                                </div>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-red-400 text-xs hover:text-red-300 px-2 py-1 font-bold"
                                >
                                  Eliminar
                                </button>
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      {cart.length > 0 && (
                        <div className="pt-3 border-t border-white/10 space-y-2">
                          <div className="flex justify-between text-xs font-bold text-white">
                            <span>Total a Pagar:</span>
                            <span className="text-[#2563EB] text-sm font-black">{formatCOP(cartTotal)}</span>
                          </div>
                          <button
                            onClick={() => {
                              setShowCartDrawer(false);
                              setShowCheckoutModal(true);
                            }}
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-2 rounded-xl text-xs shadow-lg transition-all"
                          >
                            Simular Checkout / Pasarela
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Checkout Gateway Simulation Modal */}
                  {showCheckoutModal && (
                    <div className="absolute inset-0 bg-black/95 p-4 rounded-2xl z-40 flex flex-col justify-between animate-fadeIn">
                      <div className="text-center">
                        <span className="text-3xl mb-1 block">💳</span>
                        <h4 className="font-black text-sm text-white">Simulador de Pasarela de Pago</h4>
                        <p className="text-[10px] text-white/50 mt-1">Tus clientes podrán pagar de forma segura con:</p>
                        
                        <div className="grid grid-cols-2 gap-2 mt-4">
                          <div className="bg-[#141414] p-2 rounded-xl border border-white/10 text-center">
                            <span className="text-xs font-bold text-blue-400">Wompi / Bancolombia</span>
                          </div>
                          <div className="bg-[#141414] p-2 rounded-xl border border-white/10 text-center">
                            <span className="text-xs font-bold text-emerald-400">Nequi & Daviplata</span>
                          </div>
                          <div className="bg-[#141414] p-2 rounded-xl border border-white/10 text-center">
                            <span className="text-xs font-bold text-yellow-400">Tarjetas Crédito/Débito</span>
                          </div>
                          <div className="bg-[#141414] p-2 rounded-xl border border-white/10 text-center">
                            <span className="text-xs font-bold text-purple-400">PSE / Efecty</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setShowCheckoutModal(false);
                          setCart([]);
                          triggerToast('🎉 ¡Pago ficticio procesado exitosamente!');
                        }}
                        className="w-full bg-[#2563EB] hover:bg-blue-600 text-white font-bold py-2 rounded-xl text-xs"
                      >
                        Completar Demostración de Pago
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & Included Features Card (5 cols) */}
        <div className="lg:col-span-5 bg-[#0D0D0D] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl flex flex-col justify-between relative overflow-hidden">
          {/* Top Badge */}
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
                Funcionalidades Incluidas:
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
