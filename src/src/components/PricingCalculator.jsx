import React, { useState, useEffect } from 'react';

const PROJECT_TYPES = [
  { id: 'landing', name: 'Landing Page', monthlyPrice: 150000, oneTimePrice: 490000, baseDays: 5, icon: '🚀' },
  { id: 'corporate', name: 'Página Multisección', monthlyPrice: 260000, oneTimePrice: 890000, baseDays: 8, icon: '🏢' },
  { id: 'ecommerce', name: 'Tienda Online (E-commerce)', monthlyPrice: 390000, oneTimePrice: 1490000, baseDays: 12, icon: '🛒' },
  { id: 'custom', name: 'Plataforma Web / ERP', monthlyPrice: 650000, oneTimePrice: 2800000, baseDays: 20, icon: '⚙️' }
];

const EXTRA_FEATURES = [
  { id: 'seo', name: 'Optimización SEO Avanzada', monthlyPrice: 40000, oneTimePrice: 120000, days: 2 },
  { id: 'admin', name: 'Panel de Administración (CMS)', monthlyPrice: 60000, oneTimePrice: 250000, days: 3 },
  { id: 'multilang', name: 'Soporte Multi-idioma', monthlyPrice: 50000, oneTimePrice: 180000, days: 2 },
  { id: 'payments', name: 'Pasarela de Pagos Completa', monthlyPrice: 70000, oneTimePrice: 220000, days: 3 }
];

export default function PricingCalculator() {
  const [projectType, setProjectType] = useState('landing');
  const [billingMode, setBillingMode] = useState('monthly'); // 'monthly' | 'oneTime'
  const [pages, setPages] = useState(1);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDays, setTotalDays] = useState(0);

  const formatCOP = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(amount);
  };

  useEffect(() => {
    const selectedType = PROJECT_TYPES.find(t => t.id === projectType);
    if (!selectedType) return;

    let price = billingMode === 'monthly' ? selectedType.monthlyPrice : selectedType.oneTimePrice;
    let days = selectedType.baseDays;

    // Add extra page costs
    if (projectType === 'corporate' || projectType === 'ecommerce') {
      const pageCost = billingMode === 'monthly' ? 20000 : 60000;
      price += (pages - 1) * pageCost;
      days += Math.floor((pages - 1) / 2);
    }

    // Add extra features
    selectedFeatures.forEach(featureId => {
      const feat = EXTRA_FEATURES.find(f => f.id === featureId);
      if (feat) {
        price += billingMode === 'monthly' ? feat.monthlyPrice : feat.oneTimePrice;
        days += feat.days;
      }
    });

    setTotalPrice(price);
    setTotalDays(days);
  }, [projectType, billingMode, pages, selectedFeatures]);

  const handleFeatureToggle = (featureId) => {
    if (selectedFeatures.includes(featureId)) {
      setSelectedFeatures(selectedFeatures.filter(id => id !== featureId));
    } else {
      setSelectedFeatures([...selectedFeatures, featureId]);
    }
  };

  const getContactLink = () => {
    const selectedType = PROJECT_TYPES.find(t => t.id === projectType);
    const featuresList = selectedFeatures.map(f => EXTRA_FEATURES.find(ef => ef.id === f)?.name).filter(Boolean).join(', ');
    const modeLabel = billingMode === 'monthly' ? 'Suscripción Mensual (Con Mantenimiento Incluido)' : 'Pago Único';
    
    const message = encodeURIComponent(
      `Hola Vision Web! 👋 Me gustaría solicitar una cotización personalizada:\n\n` +
      `- Tipo de Proyecto: ${selectedType?.name}\n` +
      `- Modalidad de Pago: ${modeLabel}\n` +
      `- Cantidad de Páginas: ${pages}\n` +
      `- Adicionales: ${featuresList || 'Ninguno'}\n` +
      `- Estimado total: ${formatCOP(totalPrice)}${billingMode === 'monthly' ? '/mes' : ''}\n` +
      `- Tiempo estimado: ${totalDays} días hábiles\n\n` +
      `Quedo atento para coordinar la entrega.`
    );
    
    return `https://wa.me/573052311490?text=${message}`;
  };

  return (
    <div className="bg-[#1F1F1F] rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl relative overflow-hidden max-w-4xl mx-auto">
      {/* Background glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="text-center mb-8">
        <span className="text-[#2563EB] text-xs font-bold tracking-widest uppercase mb-2 block">Cotizador Interactivo</span>
        <h3 className="text-2xl md:text-3xl font-extrabold text-white">Calcula tu Proyecto Web a Medida</h3>
        <p className="text-white/50 text-xs sm:text-sm mt-2">Configura las opciones según las necesidades exactas de tu negocio.</p>
        
        {/* Billing Mode Switcher */}
        <div className="mt-6 inline-flex bg-[#0D0D0D] p-1.5 rounded-2xl border border-white/10">
          <button
            onClick={() => setBillingMode('monthly')}
            className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 ${
              billingMode === 'monthly'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                : 'text-white/50 hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Mes a Mes (Con Mantenimiento)
          </button>
          <button
            onClick={() => setBillingMode('oneTime')}
            className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all ${
              billingMode === 'oneTime'
                ? 'bg-white/20 text-white shadow-md'
                : 'text-white/50 hover:text-white'
            }`}
          >
            Pago Único
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Options */}
        <div className="lg:col-span-7 space-y-6">
          {/* Project Type */}
          <div>
            <label className="text-xs font-bold text-white/60 uppercase tracking-wider block mb-3">1. Tipo de Proyecto</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PROJECT_TYPES.map(type => (
                <button
                  key={type.id}
                  onClick={() => {
                    setProjectType(type.id);
                    if (type.id === 'landing') setPages(1);
                  }}
                  className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between h-28 ${
                    projectType === type.id
                      ? 'border-[#2563EB] bg-[#2563EB]/10 text-white'
                      : 'border-white/5 bg-[#0D0D0D]/40 text-white/50 hover:border-white/10 hover:bg-[#0D0D0D]/60'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-2xl">{type.icon}</span>
                    <span className="text-[10px] font-bold text-[#2563EB] bg-[#2563EB]/10 px-2 py-0.5 rounded">
                      {formatCOP(billingMode === 'monthly' ? type.monthlyPrice : type.oneTimePrice)}
                      {billingMode === 'monthly' ? '/mes' : ''}
                    </span>
                  </div>
                  <span className="font-bold text-xs sm:text-sm leading-tight text-white">{type.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Number of Pages */}
          {(projectType === 'corporate' || projectType === 'ecommerce') && (
            <div className="bg-[#0D0D0D]/40 p-4 rounded-xl border border-white/5">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider">2. Cantidad de Páginas</label>
                <span className="text-[#2563EB] font-bold text-base">{pages} {pages === 1 ? 'página' : 'páginas'}</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                value={pages}
                onChange={(e) => setPages(parseInt(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
              />
              <div className="flex justify-between text-[10px] text-white/30 mt-1">
                <span>1 página</span>
                <span>8 páginas</span>
                <span>15 páginas</span>
              </div>
            </div>
          )}

          {/* Extra Features */}
          <div>
            <label className="text-xs font-bold text-white/60 uppercase tracking-wider block mb-3">3. Características Adicionales</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {EXTRA_FEATURES.map(feature => {
                const isSelected = selectedFeatures.includes(feature.id);
                const featPrice = billingMode === 'monthly' ? feature.monthlyPrice : feature.oneTimePrice;
                return (
                  <button
                    key={feature.id}
                    onClick={() => handleFeatureToggle(feature.id)}
                    className={`p-3.5 rounded-xl text-left border transition-all flex items-center gap-3 ${
                      isSelected
                        ? 'border-[#2563EB] bg-[#2563EB]/10 text-white'
                        : 'border-white/5 bg-[#0D0D0D]/40 text-white/50 hover:border-white/10 hover:bg-[#0D0D0D]/60'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                      isSelected ? 'border-[#2563EB] bg-[#2563EB]' : 'border-white/20'
                    }`}>
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-xs truncate leading-normal text-white">{feature.name}</p>
                      <p className="text-[10px] text-white/40">+{formatCOP(featPrice)} {billingMode === 'monthly' ? '/mes' : ''} / +{feature.days}d</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Summary */}
        <div className="lg:col-span-5 bg-[#0D0D0D]/80 border border-white/10 rounded-2xl p-6 flex flex-col justify-between relative">
          <div className="space-y-5">
            <h4 className="text-xs font-bold text-white/60 uppercase tracking-wider">Resumen de Cotización</h4>
            
            <div className="space-y-3">
              <div className="flex justify-between items-baseline border-b border-white/5 pb-2.5">
                <span className="text-xs text-white/50">Base ({PROJECT_TYPES.find(t => t.id === projectType)?.name}):</span>
                <span className="text-xs font-bold text-white">
                  {formatCOP(billingMode === 'monthly' ? PROJECT_TYPES.find(t => t.id === projectType)?.monthlyPrice : PROJECT_TYPES.find(t => t.id === projectType)?.oneTimePrice)}
                </span>
              </div>
              
              {(projectType === 'corporate' || projectType === 'ecommerce') && pages > 1 && (
                <div className="flex justify-between items-baseline border-b border-white/5 pb-2.5">
                  <span className="text-xs text-white/50">Páginas extras ({pages - 1}):</span>
                  <span className="text-xs font-bold text-white">
                    +{formatCOP((pages - 1) * (billingMode === 'monthly' ? 20000 : 60000))}
                  </span>
                </div>
              )}
              
              {selectedFeatures.length > 0 && (
                <div className="flex justify-between items-baseline border-b border-white/5 pb-2.5">
                  <span className="text-xs text-white/50">Adicionales ({selectedFeatures.length}):</span>
                  <span className="text-xs font-bold text-white">
                    +{formatCOP(selectedFeatures.reduce((acc, f) => acc + (billingMode === 'monthly' ? EXTRA_FEATURES.find(ef => ef.id === f)?.monthlyPrice : EXTRA_FEATURES.find(ef => ef.id === f)?.oneTimePrice || 0), 0))}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#1F1F1F] p-3.5 rounded-xl text-center border border-white/5">
                <p className="text-[9px] text-white/40 uppercase font-bold tracking-wider mb-1">Precio Estimado</p>
                <p className="text-xl sm:text-2xl font-black text-[#2563EB]">{formatCOP(totalPrice)}</p>
                <p className="text-[9px] text-white/30 mt-0.5">{billingMode === 'monthly' ? 'COP / mes' : 'COP (Pago Único)'}</p>
              </div>

              <div className="bg-[#1F1F1F] p-3.5 rounded-xl text-center border border-white/5">
                <p className="text-[9px] text-white/40 uppercase font-bold tracking-wider mb-1">Tiempo de Entrega</p>
                <p className="text-xl sm:text-2xl font-black text-white">{totalDays}</p>
                <p className="text-[9px] text-white/30 mt-0.5">días hábiles</p>
              </div>
            </div>

            <a
              href={getContactLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/20 text-center block text-xs btn-shine"
            >
              Enviar Cotización por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
