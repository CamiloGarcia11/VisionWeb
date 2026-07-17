import React, { useState } from 'react';

const PROJECTS = [
  {
    id: 1,
    title: 'Crave Detail Co',
    slug: 'crave-detail-co',
    description: 'Sitio web premium para servicios de estética automotriz y detallado profesional. Cuenta con un diseño dinámico, galería de servicios y optimización de conversión.',
    category: 'detailing',
    categoryName: 'Estética Automotriz',
    tags: ['Detailing', 'Tailwind CSS', 'Aesthetic'],
    link: 'https://cravedetailco.netlify.app/',
    isPrivate: false,
    icon: '✨',
    image: '/assets/projects/crave.png',
    imgClass: 'project-img-1'
  },
  {
    id: 2,
    title: 'Cafii Tech Store',
    slug: 'cafiitechstore',
    description: 'Tienda virtual de tecnología y hardware de alto rendimiento. Interfaz intuitiva y moderna para catálogo de productos.',
    category: 'ecommerce',
    categoryName: 'E-commerce',
    tags: ['E-commerce', 'React/Next.js', 'UI/UX'],
    link: 'https://cafiitechstore.vercel.app/',
    isPrivate: false,
    icon: '🛒',
    image: '/assets/projects/cafii.png',
    imgClass: 'project-img-2'
  },
  {
    id: 3,
    title: 'Nova ERP',
    slug: 'nova-erp',
    description: 'Sistema de planificación de recursos empresariales (ERP) robusto para la administración y automatización de procesos internos, control de inventario e informes en tiempo real.',
    category: 'saas',
    categoryName: 'SaaS / ERP',
    tags: ['SaaS', 'Next.js', 'Panel Admin'],
    link: 'https://novaerp-iota.vercel.app/login',
    isPrivate: false,
    icon: '⚙️',
    image: '/assets/projects/nova.png',
    imgClass: 'project-img-3'
  },
  {
    id: 4,
    title: 'Gestión Documental - Gobernación de Boyacá',
    slug: 'gobernacion-boyaca',
    description: 'Plataforma institucional para la unificación, gestión y consulta en tiempo real del talento humano y documentos de la Gobernación de Boyacá.',
    category: 'gubernamental',
    categoryName: 'Gubernamental',
    tags: ['Gubernamental', 'Seguridad', 'Base de Datos'],
    link: '#',
    isPrivate: true,
    icon: '📄',
    image: null,
    imgClass: 'project-img-4'
  },
  {
    id: 5,
    title: 'Williams Cruz',
    slug: 'sus-finanzas',
    description: 'Plataforma web para asesoría financiera e hipotecaria. Integra un simulador interactivo de ahorro y cotizaciones de crédito de vivienda en tiempo real.',
    category: 'finanzas',
    categoryName: 'Finanzas & Consultoría',
    tags: ['Finanzas', 'Simulador', 'Astro', 'UI/UX'],
    link: 'https://williamscruzco.vercel.app/',
    isPrivate: false,
    icon: '📊',
    image: '/assets/projects/susfinanzas.png',
    imgClass: 'project-img-5'
  }
];

const CATEGORIES = [
  { id: 'all', name: 'Todos' },
  { id: 'saas', name: 'SaaS / ERP' },
  { id: 'ecommerce', name: 'E-commerce' },
  { id: 'detailing', name: 'Estética' },
  { id: 'finanzas', name: 'Finanzas' },
  { id: 'gubernamental', name: 'Gubernamental' }
];

export default function ProjectShowcase() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = PROJECTS.filter(project => {
    const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#1F1F1F]/60 backdrop-blur-md p-4 rounded-2xl border border-white/5 max-w-4xl mx-auto">
        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                activeCategory === category.id
                  ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-500/20'
                  : 'bg-[#0D0D0D]/40 text-white/40 hover:bg-[#0D0D0D]/60 hover:text-white border border-white/5'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <input
            type="text"
            placeholder="Buscar proyectos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0D0D0D]/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/30 focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] outline-none transition-all pl-10"
          />
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map(project => (
            <div
              key={project.id}
              className="project-card bg-[#1F1F1F] rounded-2xl overflow-hidden border border-white/5 flex flex-col justify-between"
            >
              {/* Image with browser mockup */}
              <div className={`${project.imgClass} h-60 relative flex items-center justify-center p-4 overflow-hidden group`}>
                <div className="relative z-10 w-full h-full flex flex-col bg-[#0D0D0D]/60 backdrop-blur-sm border border-white/10 rounded-xl shadow-2xl overflow-hidden transition-transform duration-500 group-hover:scale-102">
                  {/* Browser Bar */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-black/45 border-b border-white/5 shrink-0">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-red-400/60"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-400/60"></div>
                      <div className="w-2 h-2 rounded-full bg-green-400/60"></div>
                    </div>
                    {/* URL bar */}
                    <div className="bg-white/5 border border-white/5 px-3 py-0.5 rounded text-[9px] text-white/30 truncate max-w-[140px] font-mono">
                      {project.isPrivate ? 'visionweb.co/private' : project.link.replace('https://', '')}
                    </div>
                    <div className="w-8"></div>
                  </div>
                  {/* Screenshot Image */}
                  <div className="flex-1 w-full relative bg-[#1F1F1F]">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" 
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/20 text-xs italic">
                        Sistema Privado / Intranet
                      </div>
                    )}
                  </div>
                </div>
                {/* Glow layer */}
                <div className="absolute inset-0 bg-[#2563EB]/0 group-hover:bg-[#2563EB]/5 transition-colors duration-500"></div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{project.icon}</span>
                      <h3 className="text-xl font-bold text-white tracking-tight">{project.title}</h3>
                    </div>
                    <span className="text-[10px] font-semibold text-[#2563EB] bg-[#2563EB]/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {project.categoryName}
                    </span>
                  </div>
                  <p className="text-white/50 text-xs md:text-sm leading-relaxed">{project.description}</p>
                </div>

                <div className="mt-6 pt-6 border-t border-white/5 flex flex-wrap gap-2 justify-between items-center">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="tag-pill text-[10px] font-medium px-2.5 py-1 rounded-full bg-white/5 text-white/40 border border-white/10 hover:bg-[#2563EB]/10 hover:text-[#60a5fa] transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 w-full sm:w-auto">
                    <a
                      href={`/proyectos/${project.slug}`}
                      className="inline-flex items-center gap-1.5 bg-white/5 hover:bg-white/10 text-white/70 text-xs font-semibold px-4 py-2.5 rounded-lg border border-white/10 transition-colors"
                    >
                      Detalles
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </a>

                    {project.isPrivate ? (
                      <span
                        className="inline-flex items-center gap-1.5 bg-white/5 text-white/40 text-xs font-semibold px-4 py-2.5 rounded-lg cursor-not-allowed border border-white/5"
                        title="Acceso restringido a red gubernamental"
                      >
                        Privado
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </span>
                    ) : (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-shine inline-flex items-center gap-1.5 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors duration-300 shadow-md shadow-blue-500/10"
                      >
                        Visitar
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#1F1F1F]/40 rounded-3xl border border-white/5 max-w-xl mx-auto">
          <div className="text-4xl mb-4">🔍</div>
          <h4 className="text-lg font-bold text-white">No se encontraron proyectos</h4>
          <p className="text-white/40 text-sm mt-1">Prueba con términos de búsqueda diferentes o cambia de categoría.</p>
          <button
            onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
            className="mt-6 px-4 py-2 bg-[#2563EB]/10 border border-[#2563EB]/30 hover:bg-[#2563EB] hover:text-white transition-all text-[#2563EB] text-xs font-semibold rounded-xl"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}
