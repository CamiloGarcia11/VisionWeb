import React, { useState, useEffect } from 'react';

const PROJECT_TYPES = [
  { id: 'landing', name: 'Landing Page', basePrice: 300, baseDays: 5, icon: '🚀' },
  { id: 'corporate', name: 'Sitio Web Corporativo', basePrice: 600, baseDays: 10, icon: '🏢' },
  { id: 'ecommerce', name: 'Tienda Online (E-commerce)', basePrice: 1100, baseDays: 15, icon: '🛒' },
  { id: 'custom', name: 'Plataforma Web / ERP', basePrice: 2200, baseDays: 25, icon: '⚙️' }
];

const EXTRA_FEATURES = [
  { id: 'seo', name: 'Optimización SEO Avanzada', price: 120, days: 2 },
  { id: 'admin', name: 'Panel de Administración (CMS)', price: 250, days: 4 },
  { id: 'multilang', name: 'Soporte Multi-idioma', price: 150, days: 3 },
  { id: 'payments', name: 'Integración Pasarela de Pagos', price: 200, days: 3 }
];

export default function PricingCalculator() {
  const [projectType, setProjectType] = useState('landing');
  const [pages, setPages] = useState(1);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDays, setTotalDays] = useState(0);

  useEffect(() => {
    const selectedType = PROJECT_TYPES.find(t => t.id === projectType);
    if (!selectedType) return;

    let price = selectedType.basePrice;
    let days = selectedType.baseDays;

    // Add page costs (if corporate/ecommerce and page > 1)
    if (projectType === 'corporate' || projectType === 'ecommerce') {
      price += (pages - 1) * 35;
      days += Math.floor((pages - 1) / 3);
    }

    // Add extra features
    selectedFeatures.forEach(featureId => {
      const feat = EXTRA_FEATURES.find(f => f.id === featureId);
      if (feat) {
        price += feat.price;
        days += feat.days;
      }
    });

    setTotalPrice(price);
    setTotalDays(days);
  }, [projectType, pages, selectedFeatures]);

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
    
    const subject = encodeURIComponent(`Cotización de Proyecto: ${selectedType?.name}`);
    const message = encodeURIComponent(
      `Hola Vision Web,\n\nMe gustaría cotizar un proyecto con las siguientes características:\n` +
      `- Tipo: ${selectedType?.name}\n` +
      `- Páginas: ${pages}\n` +
      `- Extras: ${featuresList || 'Ninguno'}\n` +
      `- Precio estimado: $${totalPrice} USD\n` +
      `- Tiempo estimado: ${totalDays} días\n\n` +
      `Quedo atento a su respuesta.`
    );
    
    return `/contacto?subject=${subject}&message=${message}`;
  };

  return (
    <div className="bg-[#1F1F1F] rounded-3xl p-6 md:p-8 border border-white/5 shadow-2xl relative overflow-hidden max-w-4xl mx-auto">
      {/* Background glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="text-center mb-10">
        <span className="text-[#2563EB] text-sm font-semibold tracking-widest uppercase mb-2 block">Presupuestador</span>
        <h3 className="text-2xl md:text-3xl font-extrabold text-white">Calcula tu Proyecto Web</h3>
        <p className="text-white/40 text-sm mt-2">Personaliza las opciones y obtén un estimado instantáneo.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Options */}
        <div className="lg:col-span-7 space-y-6">
          {/* Project Type */}
          <div>
            <label className="text-xs font-bold text-white/60 uppercase tracking-wider block mb-3">1. Tipo de Proyecto</label>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  <span className="text-2xl">{type.icon}</span>
                  <span className="font-bold text-sm leading-tight">{type.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Number of Pages */}
          {(projectType === 'corporate' || projectType === 'ecommerce') && (
            <div className="bg-[#0D0D0D]/40 p-4 rounded-xl border border-white/5">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-white/60 uppercase tracking-wider">2. Cantidad de Páginas</label>
                <span className="text-[#2563EB] font-bold text-lg">{pages} {pages === 1 ? 'página' : 'páginas'}</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={pages}
                onChange={(e) => setPages(parseInt(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
              />
              <div className="flex justify-between text-[10px] text-white/30 mt-1">
                <span>1 página</span>
                <span>10 páginas</span>
                <span>20 páginas</span>
              </div>
            </div>
          )}

          {/* Extra Features */}
          <div>
            <label className="text-xs font-bold text-white/60 uppercase tracking-wider block mb-3">3. Características Adicionales</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {EXTRA_FEATURES.map(feature => {
                const isSelected = selectedFeatures.includes(feature.id);
                return (
                  <button
                    key={feature.id}
                    onClick={() => handleFeatureToggle(feature.id)}
                    className={`p-4 rounded-xl text-left border transition-all flex items-center gap-3 ${
                      isSelected
                        ? 'border-[#2563EB] bg-[#2563EB]/10 text-white'
                        : 'border-white/5 bg-[#0D0D0D]/40 text-white/50 hover:border-white/10 hover:bg-[#0D0D0D]/60'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                      isSelected ? 'border-[#2563EB] bg-[#2563EB]' : 'border-white/20'
                    }`}>
                      {isSelected && (
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-xs truncate leading-normal">{feature.name}</p>
                      <p className="text-[10px] text-white/30">+${feature.price} USD / +{feature.days}d</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Summary */}
        <div className="lg:col-span-5 bg-[#0D0D0D]/60 border border-white/5 rounded-2xl p-6 flex flex-col justify-between relative">
          <div className="space-y-6">
            <h4 className="text-xs font-bold text-white/60 uppercase tracking-wider">Resumen Estimado</h4>
            
            <div className="space-y-4">
              <div className="flex justify-between items-baseline border-b border-white/5 pb-3">
                <span className="text-sm text-white/50">Base:</span>
                <span className="text-sm font-semibold text-white">
                  ${PROJECT_TYPES.find(t => t.id === projectType)?.basePrice} USD
                </span>
              </div>
              
              {(projectType === 'corporate' || projectType === 'ecommerce') && pages > 1 && (
                <div className="flex justify-between items-baseline border-b border-white/5 pb-3">
                  <span className="text-sm text-white/50">Páginas extras ({pages - 1}):</span>
                  <span className="text-sm font-semibold text-white">${(pages - 1) * 35} USD</span>
                </div>
              )}
              
              {selectedFeatures.length > 0 && (
                <div className="flex justify-between items-baseline border-b border-white/5 pb-3">
                  <span className="text-sm text-white/50">Adicionales ({selectedFeatures.length}):</span>
                  <span className="text-sm font-semibold text-white">
                    +${selectedFeatures.reduce((acc, f) => acc + (EXTRA_FEATURES.find(ef => ef.id === f)?.price || 0), 0)} USD
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1F1F1F] p-4 rounded-xl text-center border border-white/5">
                <p className="text-[10px] text-white/30 uppercase font-bold tracking-wider mb-1">Precio Estimado</p>
                <p className="text-2xl md:text-3xl font-extrabold text-[#2563EB]">${totalPrice}</p>
                <p className="text-[9px] text-white/20 mt-0.5">USD</p>
              </div>

              <div className="bg-[#1F1F1F] p-4 rounded-xl text-center border border-white/5">
                <p className="text-[10px] text-white/30 uppercase font-bold tracking-wider mb-1">Tiempo de Entrega</p>
                <p className="text-2xl md:text-3xl font-extrabold text-white">{totalDays}</p>
                <p className="text-[9px] text-white/20 mt-0.5">días hábiles</p>
              </div>
            </div>

            <a
              href={getContactLink()}
              className="w-full py-4 bg-[#2563EB] hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/20 text-center block text-sm btn-shine"
            >
              Enviar esta Configuración
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
