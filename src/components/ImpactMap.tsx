import React, { useState, useMemo } from 'react';
import { Relato, Category } from '../types';
import { 
  Filter, 
  MapPin, 
  Search, 
  Plus, 
  Minus, 
  Calendar, 
  AlertTriangle, 
  Info, 
  X, 
  Map, 
  Maximize2 
} from 'lucide-react';

interface ImpactMapProps {
  relatos: Relato[];
}

export default function ImpactMap({ relatos }: ImpactMapProps) {
  // Search and Advanced Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Todos'>('Todos');
  const [selectedGravity, setSelectedGravity] = useState<string>('Todos');
  const [selectedDateRange, setSelectedDateRange] = useState<string>('Todos'); // 'Todos' | '7dias' | '30dias'

  // Map Navigation State (Simulating Leaflet interactive functions)
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoverCoordinates, setHoverCoordinates] = useState<{ lat: string; lng: string } | null>(null);

  // Active Map Pop-up details
  const [activePopupRelato, setActivePopupRelato] = useState<Relato | null>(null);

  const categories: (Category | 'Todos')[] = [
    'Todos',
    'Ar',
    'Água',
    'Ruído',
    'Resíduos',
    'Mobilidade',
    'Verde urbano',
  ];

  // Helper function to translate coordinate points into highly realistic GPS latitude/longitude (Leaflet-feel)
  const getSimulatedGPS = (r: Relato) => {
    const x = r.coordenadas?.x ?? 50;
    const y = r.coordenadas?.y ?? 50;
    // Base center of our industrial periphery: Lat -23.5015, Lng -46.2104
    const lat = (-23.5015 - (y - 50) * 0.0022).toFixed(5);
    const lng = (-46.2104 + (x - 50) * 0.0025).toFixed(5);
    return { lat, lng };
  };

  // Dynamically Filtered Relatos based on and Search keywords + advanced filters
  const filteredRelatos = useMemo(() => {
    return relatos.filter((r) => {
      // 1. Category search matches
      const matchesCategory = selectedCategory === 'Todos' || r.categoria === selectedCategory;
      
      // 2. Keyword input matches (Neighborhood, problem, or description)
      const matchesSearch = 
        r.bairro.toLowerCase().includes(searchTerm.toLowerCase()) || 
        r.problema.toLowerCase().includes(searchTerm.toLowerCase()) || 
        r.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.autor && r.autor.toLowerCase().includes(searchTerm.toLowerCase()));

      // 3. Gravity level matches
      const matchesGravity = selectedGravity === 'Todos' || r.gravidade === selectedGravity;

      // 4. Date filtering matches (compared from mock environment time 2026-06-03)
      let matchesDate = true;
      if (selectedDateRange !== 'Todos') {
        const itemDate = new Date(r.data);
        const refDate = new Date('2026-06-03'); // Current local time is 2026-06-03
        const diffTime = Math.abs(refDate.getTime() - itemDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (selectedDateRange === '7dias') {
          matchesDate = diffDays <= 7;
        } else if (selectedDateRange === '30dias') {
          matchesDate = diffDays <= 30;
        }
      }

      return matchesCategory && matchesSearch && matchesGravity && matchesDate;
    });
  }, [relatos, selectedCategory, searchTerm, selectedGravity, selectedDateRange]);

  // Handle marker selection, simulating Leaflet re-centering & popup bind
  const handleMarkerClick = (r: Relato) => {
    setActivePopupRelato(r);
    // Simulating Leaflet's auto-panning closer on click:
    const x = r.coordenadas?.x ?? 50;
    const y = r.coordenadas?.y ?? 50;
    // Calculate off-set to keep marker in reasonable focus
    setPanOffset({ x: (50 - x) * 0.2, y: (50 - y) * 0.2 });
  };

  // Zoom limits helper
  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2.25));
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.75));
    setPanOffset({ x: 0, y: 0 }); // reset pan on zoom-out
  };

  // Mouse over coordinate tracker to simulate actual geographic canvas hover
  const handleMapMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Convert to mock coordinates
    const lat = (-23.5015 - (yPct - 50) * 0.0022).toFixed(5);
    const lng = (-46.2104 + (xPct - 50) * 0.0025).toFixed(5);
    setHoverCoordinates({ lat, lng });
  };

  const getGravityBadgeColor = (g: Relato['gravidade']) => {
    switch (g) {
      case 'Crítica': return 'bg-rose-50 text-rose-600 border-rose-200';
      case 'Alta': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Média': return 'bg-yellow-50 text-yellow-600 border-yellow-250';
      case 'Baixa': return 'bg-emerald-50 text-emerald-700 border-emerald-250';
    }
  };

  const getCategoryThemeColor = (cat: Category) => {
    switch (cat) {
      case 'Ar': return 'text-sky-600';
      case 'Água': return 'text-blue-600';
      case 'Ruído': return 'text-violet-600';
      case 'Resíduos': return 'text-amber-800';
      case 'Mobilidade': return 'text-teal-600';
      case 'Verde urbano': return 'text-emerald-600';
    }
  };

  return (
    <section id="mapa" className="py-20 bg-[#f5f7f6] border-t border-[#e9ecef]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-y-4">
          <div className="text-left">
            <span className="text-xs font-bold text-[#f28f3b] tracking-wider uppercase block mb-1">Cartografia Participativa</span>
            <h2 className="font-sans font-bold text-3xl md:text-4xl text-[#1b4332] tracking-tight">
              Mapa de Impactos Socioambientais
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-xl mt-1">
              Mapeamos de forma geo-referenciada as reclamações enviadas direta ou anonimamente no território de entorno.
            </p>
          </div>

          {/* Core Dynamic Search Bar */}
          <div className="relative w-full md:w-80 shrink-0">
            <input
              type="text"
              placeholder="Buscar relatos no mapa..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                // If anything starts filtering, dismiss the popups to avoid context clutter
                setActivePopupRelato(null);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#e9ecef] text-gray-800 placeholder-gray-400 text-xs sm:text-sm focus:outline-hidden focus:border-[#1b4332] transition-all font-medium shadow-xs"
            />
            <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-[#1b4332]" />
          </div>
        </div>

        {/* Dynamic Category Filter Bar directly tied to map */}
        <div className="flex flex-wrap gap-2 mb-6 bg-white p-2 rounded-2.5xl border border-[#e9ecef] shadow-2xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setActivePopupRelato(null); // Dismiss current pop-up
              }}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-[#0b3d59] text-white font-bold shadow-xs'
                  : 'text-gray-650 hover:bg-gray-50 hover:text-[#1b4332]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Advanced Filters Panel */}
        <div className="bg-white border border-[#e9ecef] rounded-2xl p-4 mb-8 text-left grid grid-cols-1 sm:grid-cols-3 gap-4 shadow-3xs">
          {/* Filter by Gravity */}
          <div className="space-y-1.5Col">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Filtrar por Gravidade</label>
            <select
              value={selectedGravity}
              onChange={(e) => {
                setSelectedGravity(e.target.value);
                setActivePopupRelato(null);
              }}
              className="w-full px-3 py-2 border border-[#e9ecef] bg-[#f5f7f6] rounded-xl text-xs sm:text-sm text-gray-700 focus:outline-hidden focus:border-[#1b4332] font-semibold"
            >
              <option value="Todos">Todos os Níveis</option>
              <option value="Baixa">Gravidade Baixa</option>
              <option value="Média">Gravidade Média</option>
              <option value="Alta">Gravidade Alta</option>
              <option value="Crítica">Gravidade Crítica</option>
            </select>
          </div>

          {/* Filter by Date scale */}
          <div className="space-y-1.5Col">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Filtrar por Data de Envio</label>
            <select
              value={selectedDateRange}
              onChange={(e) => {
                setSelectedDateRange(e.target.value);
                setActivePopupRelato(null);
              }}
              className="w-full px-3 py-2 border border-[#e9ecef] bg-[#f5f7f6] rounded-xl text-xs sm:text-sm text-gray-700 focus:outline-hidden focus:border-[#1b4332] font-semibold"
            >
              <option value="Todos">Todas as Datas</option>
              <option value="7dias">Últimos 7 dias</option>
              <option value="30dias">Últimos 30 dias</option>
            </select>
          </div>

          {/* Result statistics counter */}
          <div className="flex flex-col justify-end items-start pb-1 sm:items-end">
            <div className="text-[11px] text-gray-500 font-medium">
              Relatos Carregados: <strong className="text-[#1b4332] font-bold font-mono text-sm bg-[#1b4332]/10 border border-[#1b4332]/15 px-2.5 py-1 rounded-md">{filteredRelatos.length} / {relatos.length}</strong>
            </div>
          </div>
        </div>

        {/* Outer Grid Structure: Map on left, selection list on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* ===================== MAP PANEL (Simulated Leaflet canvas) ===================== */}
          <div className="lg:col-span-8 bg-white border border-[#e9ecef] rounded-3xl p-4 flex flex-col justify-between shadow-md relative min-h-[450px] overflow-hidden">
             
            {/* Map metadata watermarks */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 text-left">
              <div className="flex items-center space-x-2 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-[#e9ecef] shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                <span className="font-mono text-[9px] text-[#0b3d59] tracking-wide font-bold uppercase">Motor de Cartografia ESG v2.5</span>
              </div>
              <div className="bg-[#1b4332] text-[9.5px] font-mono text-white/95 px-2 py-0.5 rounded-md border border-[#235841] shadow-2xs self-start tracking-wider uppercase">
                {selectedCategory === 'Todos' ? 'Mapa Geral' : `Filtro Ativo: ${selectedCategory}`}
              </div>
            </div>

            {/* Simulated GPS Realtime coordinates mouse tracker */}
            {hoverCoordinates && (
              <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur-xs border border-[#e9ecef] px-2.5 py-1 rounded-lg text-[9px] font-mono text-gray-500 shadow-2xs">
                Lat: <span className="text-[#1b4332] font-bold">{hoverCoordinates.lat}</span> | Lng: <span className="text-[#1b4332] font-bold">{hoverCoordinates.lng}</span>
              </div>
            )}

            {/* Zoom controls pane */}
            <div className="absolute top-4 right-4 z-10 flex flex-col space-y-1">
              <button 
                onClick={handleZoomIn}
                className="w-8 h-8 bg-white hover:bg-gray-50 text-[#1b4332] border border-[#e9ecef] rounded-lg shadow-xs flex items-center justify-center font-bold text-sm transition-colors focus:outline-none"
                title="Ampliar Zoom"
              >
                <Plus className="h-4 w-4" />
              </button>
              <button 
                onClick={handleZoomOut}
                className="w-8 h-8 bg-white hover:bg-gray-50 text-[#1b4332] border border-[#e9ecef] rounded-lg shadow-xs flex items-center justify-center font-bold text-sm transition-colors focus:outline-none"
                title="Reduzir Zoom"
              >
                <Minus className="h-4 w-4" />
              </button>
            </div>

            {/* Geographical Interactive Canvas with scale transforming */}
            <div className="w-full h-full relative border border-gray-100 rounded-2.5xl bg-gradient-to-br from-[#f0f4f8] to-[#e4e9f0] flex items-center justify-center p-2 pt-16 min-h-[380px] overflow-hidden select-none">
              
              {/* Actual Map Graphic Scale Viewport */}
              <div 
                className="w-full h-full relative transition-all duration-300"
                style={{
                  transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
                  transformOrigin: 'center center',
                }}
              >
                <svg 
                  viewBox="0 0 100 100" 
                  className="w-full h-full object-cover opacity-95 text-left"
                  onMouseMove={handleMapMouseMove}
                >
                  <g>
                    {/* Simulated background rivers, rails, roads boundaries */}
                    {/* River Parahyba */}
                    <path d="M -20 110 Q 50 100 45 40 T 120 -10" fill="none" stroke="#2563eb" strokeWidth="6" className="opacity-15" />
                    <path d="M -20 110 Q 50 100 45 40 T 120 -10" fill="none" stroke="#60a5fa" strokeWidth="1.5" className="opacity-30" />
                    
                    {/* Railway line */}
                    <path d="M -10 15 Q 40 35 110 45" fill="none" stroke="#708090" strokeWidth="1" strokeDasharray="1,1.5" className="opacity-45" />
                    <text x="8" y="15" fontSize="1.8" fill="#708090" fontWeight="bold" opacity="0.6">Linha Férrea D-12</text>

                    {/* Neighborhood Roads Boundaries */}
                    {/* Road A */}
                    <path d="M 0 50 L 100 50" fill="none" stroke="#ffffff" strokeWidth="0.8" opacity="0.8" />
                    {/* Road B */}
                    <path d="M 40 0 L 40 100" fill="none" stroke="#ffffff" strokeWidth="0.8" opacity="0.8" />
                    
                    {/* Central Industrial Siderurgica zone (Arcel Zone) */}
                    <rect x="42" y="32" width="22" height="18" rx="2" fill="#1b4332" opacity="0.08" stroke="#ef4444" strokeWidth="0.3" strokeDasharray="0.5,0.5" />
                    <text x="53" y="39" fontSize="2.0" fill="#dc2626" fontWeight="bold" textAnchor="middle" opacity="0.85">
                      PLANTA SIDERÚRGICA
                    </text>
                    <text x="53" y="42" fontSize="1.3" fill="#1b4332" textAnchor="middle" opacity="0.75" className="tracking-wide">
                      Mapeamento Territorial Ativo
                    </text>

                    {/* Regional Labels */}
                    <text x="18" y="47" fontSize="2.6" fill="#1b4332" fontWeight="bold" opacity="0.7" textAnchor="middle">
                      Jesuítas (RJ)
                    </text>
                    <text x="35" y="24" fontSize="2.6" fill="#1b4332" fontWeight="bold" opacity="0.7" textAnchor="middle">
                      Vila Parisi (SP)
                    </text>
                    <text x="75" y="75" fontSize="2.6" fill="#1b4332" fontWeight="bold" opacity="0.7" textAnchor="middle">
                      Navegantes (SP)
                    </text>
                    <text x="22" y="85" fontSize="2.6" fill="#1b4332" fontWeight="bold" opacity="0.7" textAnchor="middle">
                      Bairro Veneza (MG)
                    </text>
                    <text x="65" y="15" fontSize="2.6" fill="#1b4332" fontWeight="bold" opacity="0.7" textAnchor="middle">
                      Zona Res. (RS)
                    </text>
                  </g>

                  {/* Render points of filtered reports as customized interactive markers */}
                  {filteredRelatos.map((r) => {
                    const xCoord = r.coordenadas?.x ?? 50;
                    const yCoord = r.coordenadas?.y ?? 50;
                    const isSelected = activePopupRelato?.id === r.id;

                    let markerPulseColor = '#1b4332';
                    let markerBgColor = 'fill-[#1b4332]';
                    let markerGlow = 'fill-[#1b4332]/20';

                    if (r.gravidade === 'Crítica') {
                      markerPulseColor = '#e11d48';
                      markerBgColor = 'fill-rose-600';
                      markerGlow = 'fill-rose-500/20';
                    } else if (r.gravidade === 'Alta') {
                      markerPulseColor = '#f28f3b';
                      markerBgColor = 'fill-[#f28f3b]';
                      markerGlow = 'fill-[#f28f3b]/20';
                    } else if (r.gravidade === 'Média') {
                      markerPulseColor = '#eab308';
                      markerBgColor = 'fill-yellow-500';
                      markerGlow = 'fill-yellow-500/20';
                    }

                    return (
                      <g 
                        key={r.id} 
                        className="cursor-pointer group/marker" 
                        onClick={() => handleMarkerClick(r)}
                      >
                        {/* Selected Pulsing background animation border */}
                        {isSelected && (
                          <circle 
                            cx={xCoord} 
                            cy={yCoord} 
                            r="6" 
                            fill="none" 
                            stroke={markerPulseColor} 
                            strokeWidth="0.4"
                            className="animate-pulse"
                          />
                        )}

                        {/* Concentric Glow Backdrop */}
                        <circle 
                          cx={xCoord} 
                          cy={yCoord} 
                          r={isSelected ? "4.5" : "3.2"} 
                          className={`transition-all duration-300 ${markerGlow}`}
                        />

                        {/* Interactive Pin point */}
                        <circle 
                          cx={xCoord} 
                          cy={yCoord} 
                          r={isSelected ? "2.0" : "1.4"} 
                          className={`transition-all duration-300 ${markerBgColor} stroke-white stroke-[0.15]`}
                        />

                        {/* Tiny hover tip watermark */}
                        <g className="opacity-0 group-hover/marker:opacity-100 transition-opacity duration-150 pointer-events-none">
                          <rect 
                            x={xCoord - 14} 
                            y={yCoord - 8} 
                            width="28" 
                            height="5.0" 
                            rx="1" 
                            fill="#1b4332" 
                          />
                          <text 
                            x={xCoord} 
                            y={yCoord - 4.5} 
                            fontSize="1.6" 
                            fill="#ffffff" 
                            fontWeight="bold" 
                            textAnchor="middle"
                          >
                            {r.bairro}
                          </text>
                        </g>

                      </g>
                    );
                  })}
                </svg>

                {/* ===================== SIMULATED LEAFLET POPUP ELEMENT ===================== */}
                {activePopupRelato && (
                  <div 
                    className="absolute z-20 bg-white border border-[#0b3d59]/25 rounded-2xl shadow-xl p-4.5 max-w-[250px] text-xs leading-normal animate-scale-up"
                    style={{
                      left: `${activePopupRelato.coordenadas?.x ?? 50}%`,
                      top: `${activePopupRelato.coordenadas?.y ?? 50}%`,
                      transform: 'translate(-50%, -105%) scale(0.9)', // Positions perfectly above marker
                    }}
                  >
                    {/* Popup indicator arrow downward */}
                    <div className="absolute bottom-[-6px] left-[50%] translate-x-[-50%] w-3 h-3 bg-white border-r border-b border-[#0b3d59]/25 rotate-45"></div>

                    {/* Pop-up header */}
                    <div className="flex items-center justify-between pb-1.5 border-b border-gray-100 mb-2 gap-x-2">
                      <span className="text-[9px] font-extrabold uppercase tracking-wide text-indigo-900 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded-md">
                        {activePopupRelato.categoria}
                      </span>
                      <span className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded-md border ${getGravityBadgeColor(activePopupRelato.gravidade)}`}>
                        {activePopupRelato.gravidade}
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePopupRelato(null);
                        }}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="space-y-1 text-left select-text">
                      <h4 className="font-sans font-bold text-gray-900 leading-tight">
                        {activePopupRelato.bairro}
                      </h4>
                      <p className="text-[#0b3d59] font-bold text-[10px] leading-tight mb-1">
                        {activePopupRelato.problema}
                      </p>
                      <p className="text-gray-600 text-[9.5px] leading-relaxed line-clamp-3">
                        {activePopupRelato.descricao}
                      </p>
                    </div>

                    {/* Lat / Lng Coordinates marker footer */}
                    <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-150 text-[8.5px] text-gray-500 font-mono select-text">
                      <span>Lat: {getSimulatedGPS(activePopupRelato).lat}</span>
                      <span>Lng: {getSimulatedGPS(activePopupRelato).lng}</span>
                    </div>

                  </div>
                )}

              </div>
            </div>

            {/* Map legends and quick tip info */}
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 items-center justify-between text-[11px] text-gray-500 font-semibold px-1 border-t border-gray-150 pt-3">
              <div className="flex items-center space-x-2">
                <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 mr-1.5 inline-block border border-white shadow-xs"></span> Crítica</span>
                <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-[#f28f3b] mr-1.5 inline-block border border-white shadow-xs"></span> Alta</span>
                <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-yellow-500 mr-1.5 inline-block border border-white shadow-xs"></span> Média</span>
                <span className="flex items-center"><span className="w-2.5 h-2.5 rounded-full bg-[#1b4332] mr-1.5 inline-block border border-white shadow-xs"></span> Baixa</span>
              </div>
              <span className="text-[#0b3d59] font-semibold flex items-center">
                <Info className="h-3 w-3 mr-1 text-[#f28f3b]" /> Dica: Clique nos pontos do mapa ou use as ferramentas de zoom!
              </span>
            </div>

          </div>

          {/* ===================== LIST & INSPECTOR PANEL (Right side sidebar) ===================== */}
          <div className="lg:col-span-4 flex flex-col space-y-4 text-left">
            
            {/* Inspector detail card displaying the active markers context */}
            <div className="bg-white border border-[#e9ecef] rounded-3xl p-5 shadow-sm text-left">
              {activePopupRelato ? (
                <div className="space-y-4 animate-fade-in select-text">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#1b4332] tracking-wider bg-[#1b4332]/10 border border-[#1b4332]/20 px-2 py-0.5 rounded-md uppercase">
                      Categoria: {activePopupRelato.categoria}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getGravityBadgeColor(activePopupRelato.gravidade)}`}>
                      Gravidade: {activePopupRelato.gravidade}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-sans font-bold text-xl text-[#1b4332] leading-tight">
                      {activePopupRelato.bairro}
                    </h3>
                    <p className="text-[10px] text-gray-400 font-mono mt-1">
                      Registro ID {activePopupRelato.id} • Enviado em {activePopupRelato.data}
                    </p>
                  </div>

                  <div className="space-y-1.5 bg-[#f5f7f6] p-3.5 rounded-xl border border-gray-150">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block font-sans">Descrição do Cidadão</span>
                    <h4 className="text-xs font-bold text-[#1b4332]">{activePopupRelato.problema}</h4>
                    <p className="text-xs text-gray-650 leading-relaxed pt-0.5">{activePopupRelato.descricao}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-[10.5px]">
                    <div className="bg-white p-2 rounded-lg border border-gray-150">
                      <span className="text-gray-400 block text-[9px] mb-0.5">Vulnerabilidade</span>
                      <strong className="text-gray-700 font-semibold">{activePopupRelato.vulnerabilidade}</strong>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-gray-150">
                      <span className="text-gray-400 block text-[9px] mb-0.5">Autor Autorizado</span>
                      <strong className="text-gray-700 font-semibold truncate block">{activePopupRelato.autor || 'Anônimo'}</strong>
                    </div>
                  </div>

                  <div className="bg-[#0b3d59]/5 p-2 rounded-lg border border-[#0b3d59]/10 text-[10.5px] flex justify-between font-mono">
                    <span className="text-gray-500">Coordenadas GPS:</span>
                    <span className="font-bold text-[#0b3d59]">{getSimulatedGPS(activePopupRelato).lat}, {getSimulatedGPS(activePopupRelato).lng}</span>
                  </div>
                </div>
              ) : (
                <div className="py-16 text-center text-gray-400 flex flex-col items-center justify-center space-y-2">
                  <Map className="h-10 w-10 text-[#1b4332]/40 mb-1" />
                  <p className="font-bold text-[#1b4332]">Informações do Ponto</p>
                  <p className="text-xs text-gray-500 max-w-[210px] mx-auto">Selecione um marcador territorial no mapa ou na lista abaixo para focar as métricas.</p>
                </div>
              )}
            </div>

            {/* Live List based on both search and selection criteria */}
            <div className="flex-1 bg-white border border-[#e9ecef] rounded-3xl p-5 shadow-sm flex flex-col min-h-[180px] max-h-[300px]">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5 block">
                Relatos Filtrados ({filteredRelatos.length})
              </span>
              
              <div className="space-y-2 overflow-y-auto pr-1 flex-1 custom-scrollbar">
                {filteredRelatos.length > 0 ? (
                  filteredRelatos.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => handleMarkerClick(r)}
                      className={`w-full p-2.5 rounded-xl border text-xs text-left transition-all flex items-center justify-between ${
                        activePopupRelato?.id === r.id
                          ? 'bg-[#1b4332]/10 border-[#1b4332] text-[#1b4332]'
                          : 'bg-[#f5f7f6] border-[#e9ecef] text-[#2d3436] hover:bg-white hover:border-gray-305'
                      }`}
                    >
                      <div className="truncate max-w-[70%]">
                        <h5 className="font-bold truncate text-[#1b4332]">{r.bairro}</h5>
                        <p className="text-gray-550 truncate text-[11px]">{r.problema}</p>
                      </div>
                      
                      <div className="flex items-center space-x-1 shrink-0">
                        <span className="text-[9px] font-semibold text-gray-400 font-sans">{r.categoria}</span>
                        <span className={`w-2 h-2 rounded-full inline-block ${
                          r.gravidade === 'Crítica' ? 'bg-rose-500' :
                          r.gravidade === 'Alta' ? 'bg-[#f28f3b]' :
                          r.gravidade === 'Média' ? 'bg-yellow-500' :
                          'bg-emerald-500'
                        }`} />
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="py-8 text-center text-xs text-gray-400 border border-dashed border-gray-150 rounded-xl">
                    Nenhum relato atende aos critérios ativos.
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
