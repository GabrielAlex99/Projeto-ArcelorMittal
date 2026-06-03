import React, { useState, useMemo } from 'react';
import { SolucaoPadrao, Category } from '../types';
import { Search, Eye, Filter, CheckCircle, Info, X, Compass, Check, DollarSign, ListFilter } from 'lucide-react';

interface SolutionBankProps {
  solucoes: SolucaoPadrao[];
}

export default function SolutionBank({ solucoes }: SolutionBankProps) {
  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedComplexity, setSelectedComplexity] = useState<string>('Todos');

  const [activeModalSol, setActiveModalSol] = useState<SolucaoPadrao | null>(null);

  // Extract unique categories dynamically from the actual database list to support standard & user-made ones!
  const uniqueCategories = useMemo(() => {
    const list = new Set<string>();
    list.add('Todos');
    solucoes.forEach(s => {
      if (s.categoria) {
        // Standardize capital letters
        list.add(s.categoria);
      }
    });
    return Array.from(list);
  }, [solucoes]);

  // Filtering criteria based on Search keywords, category, and complexity level
  const filteredSolucoes = useMemo(() => {
    return solucoes.filter(s => {
      const matchesCategory = selectedCategory === 'Todos' || s.categoria === selectedCategory;
      
      const matchesComplexity = selectedComplexity === 'Todos' || s.complexidade === selectedComplexity;

      const matchesSearch = 
        s.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || 
        s.problemaRelacionado.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.impactoEsperado && s.impactoEsperado.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesCategory && matchesComplexity && matchesSearch;
    });
  }, [solucoes, selectedCategory, selectedComplexity, searchTerm]);

  const getComplexityColor = (c: SolucaoPadrao['complexidade']) => {
    switch (c) {
      case 'Baixa': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Média': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Alta': return 'bg-rose-50 text-rose-700 border-rose-250';
    }
  };

  return (
    <section id="banco" className="py-20 bg-white border-t border-[#e9ecef]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Header */}
        <div className="text-left mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-y-4">
          <div>
            <span className="text-xs font-bold text-[#f28f3b] tracking-wider uppercase block mb-1">Catálogo de Práticas Sustentáveis</span>
            <h2 className="font-sans font-bold text-3xl md:text-4xl text-[#1b4332] tracking-tight">
              Banco de Soluções Socioambientais
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-xl mt-1">
              Catálogo interativo de contra-medidas técnicas que mitigam os impactos residuais, restaurando a harmonia urbana e climática das periferias.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-80 shrink-0">
            <input
              type="text"
              placeholder="Pesquisar soluções ou problemas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#f5f7f6] border border-[#e9ecef] text-gray-850 placeholder-gray-400 text-xs sm:text-sm focus:outline-hidden focus:border-[#1b4332] transition-all font-medium shadow-2xs"
            />
            <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-[#1b4332]" />
          </div>
        </div>

        {/* Dynamic Category Selector Filters row */}
        <div className="flex flex-col space-y-4 bg-[#f5f7f6] p-4.5 rounded-3xl border border-[#e9ecef] mb-8 text-left">
          
          <div className="flex items-center space-x-2 pb-2 border-b border-[#e9ecef]/60">
            <ListFilter className="h-4.5 w-4.5 text-[#1b4332]" />
            <span className="text-xs font-bold text-[#1b4332] uppercase tracking-wider block">Filtros Avançados de Pesquisa</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Filter by Category */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Filtrar por Categoria / Tipo de Solução</label>
              <div className="flex flex-wrap gap-1.5">
                {uniqueCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedCategory === cat
                        ? 'bg-[#0b3d59] text-white shadow-xs'
                        : 'bg-white border border-[#e9ecef] text-gray-650 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter by Complexity */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Por Complexidade Técnica</label>
              <div className="flex flex-wrap gap-1.5">
                {['Todos', 'Baixa', 'Média', 'Alta'].map((comp) => (
                  <button
                    key={comp}
                    onClick={() => setSelectedComplexity(comp)}
                    className={`px-4.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedComplexity === comp
                        ? 'bg-[#1b4332] text-white shadow-xs'
                        : 'bg-white border border-[#e9ecef] text-gray-650 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    {comp === 'Todos' ? 'Todas' : comp}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Dynamic statistics pill */}
          <div className="pt-2 text-[10px] text-gray-500 font-mono text-right flex justify-between items-center bg-white px-3 py-1.5 rounded-xl border border-[#e9ecef]/40">
            <span>Resultados encontrados:</span>
            <strong className="text-[#0b3d59]">{filteredSolucoes.length} soluções</strong>
          </div>

        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {filteredSolucoes.length > 0 ? (
            filteredSolucoes.map((s) => (
              <div 
                key={s.id} 
                className="bg-[#f5f7f6] border border-[#e9ecef] rounded-2.5xl p-6 shadow-xs relative flex flex-col justify-between hover:border-[#1b4332]/40 transition-all duration-300 group hover:-translate-y-1 hover:shadow-md"
              >
                <div className="space-y-4">
                  
                  {/* Category and Complexity pill */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-[#1b4332] bg-[#1b4332]/10 border border-[#1b4332]/20 px-2.5 py-1 rounded-md">
                      {s.categoria}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getComplexityColor(s.complexidade)}`}>
                      Complexidade {s.complexidade}
                    </span>
                  </div>

                  {/* Title & Target problem */}
                  <div className="space-y-1">
                    <h3 className="font-sans font-bold text-lg text-[#1b4332] group-hover:text-[#0b3d59] transition-colors">
                      {s.titulo}
                    </h3>
                    <p className="text-xs text-[#0b3d59] font-bold line-clamp-1">
                      Problema: {s.problemaRelacionado}
                    </p>
                  </div>

                  {/* Core description */}
                  <p className="text-gray-650 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {s.descricao}
                  </p>

                  {/* Expected impact snippet */}
                  <div className="bg-white p-3 rounded-xl border border-[#e9ecef] text-xs">
                    <strong className="text-[#0b3d59] block mb-0.5">Impacto Esperado:</strong>
                    <span className="text-gray-650 font-medium line-clamp-2">{s.impactoEsperado}</span>
                  </div>

                </div>

                {/* Inspect Button */}
                <div className="pt-5 mt-4 border-t border-gray-150 flex justify-end">
                  <button
                    onClick={() => setActiveModalSol(s)}
                    className="px-4.5 py-2 bg-white hover:bg-[#1b4332] hover:text-white text-[#1b4332] font-bold rounded-lg text-xs transition-all flex items-center space-x-1.5 shadow-xs border border-[#1b4332]/35"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>Ver detalhes</span>
                  </button>
                </div>

              </div>
            ))
          ) : (
            <div className="col-span-full py-16 bg-[#f5f7f6] rounded-3xl text-center text-gray-500 border border-dashed border-[#e9ecef] flex flex-col items-center justify-center space-y-2">
              <Compass className="h-8 w-8 text-[#1b4332]" />
              <p className="font-bold text-gray-800">Nenhuma solução cadastrada ou correspondente</p>
              <p className="text-xs text-gray-500">Mude os filtros avançados ou verifique o termo escrito no campo superior.</p>
            </div>
          )}
        </div>

        {/* Dynamic Detail Modal */}
        {activeModalSol && (
          <div className="fixed inset-0 z-55 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white border border-[#e9ecef] rounded-3.5xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative text-left animate-scale-up max-h-[90vh] overflow-y-auto custom-scrollbar">
              
              {/* Close Button */}
              <button 
                onClick={() => setActiveModalSol(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-[#f5f7f6] text-gray-400 hover:text-gray-750 border border-[#e9ecef]"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-6">
                
                {/* Header labels */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-[#1b4332] uppercase bg-[#1b4332]/10 border border-[#1b4332]/20 px-2.5 py-1 rounded-md">
                    Catálogo de Soluções • {activeModalSol.categoria}
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md border ${getComplexityColor(activeModalSol.complexidade)}`}>
                    Complexidade {activeModalSol.complexidade}
                  </span>
                </div>

                {/* Main title */}
                <div>
                  <h3 className="font-sans font-bold text-2xl md:text-3xl text-[#1b4332] tracking-tight">
                    {activeModalSol.titulo}
                  </h3>
                  <p className="text-sm font-semibold text-[#0b3d59] mt-1">
                    Problema Resolvido: {activeModalSol.problemaRelacionado}
                  </p>
                </div>

                {/* Body paragraph */}
                <div className="space-y-2 bg-[#f5f7f6] p-4.5 rounded-2xl border border-[#e9ecef]">
                  <h4 className="text-xs font-bold text-[#1b4332] uppercase tracking-widest">Escopo da Ação Preventiva</h4>
                  <p className="text-sm text-gray-750 leading-relaxed font-normal">{activeModalSol.descricao}</p>
                </div>

                {/* Technical stats grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#f5f7f6] p-4 rounded-xl border border-[#e9ecef] text-xs">
                    <strong className="text-[#1b4332] block mb-1 font-semibold">Impacto Socioambiental</strong>
                    <p className="text-gray-650 leading-relaxed">{activeModalSol.impactoEsperado}</p>
                  </div>

                  <div className="bg-[#f5f7f6] p-4 rounded-xl border border-[#e9ecef] text-xs">
                    <strong className="text-[#1b4332] block mb-1 font-semibold">Alinhamento ESG</strong>
                    <ul className="space-y-1 text-gray-650">
                      <li className="flex items-center"><Check className="h-3 w-3 mr-1.5 text-[#1b4332]" /> Preservação do Ar e Atmosfera</li>
                      <li className="flex items-center"><Check className="h-3 w-3 mr-1.5 text-[#1b4332]" /> Relacionamento Ético Território</li>
                      <li className="flex items-center"><Check className="h-3 w-3 mr-1.5 text-[#1b4332]" /> Licença de Operação Social</li>
                    </ul>
                  </div>
                </div>

                {/* Footer warning informative */}
                <div className="text-xs text-gray-500 flex items-start space-x-2 bg-[#f5f7f6] p-3 rounded-xl border border-[#e9ecef]">
                  <Info className="h-4 w-4 text-[#f28f3b] shrink-0 mt-0.5" />
                  <p>O nível de complexidade reflete o esforço de engenharia mecânica, biológica e parcerias civis para implantar o sistema no perímetro adjacente à Siderúrgica.</p>
                </div>

                {/* Action controls */}
                <div className="flex justify-end pt-4 border-t border-gray-150">
                  <button
                    onClick={() => setActiveModalSol(null)}
                    className="px-6 py-2.5 bg-[#0b3d59] hover:bg-[#072a42] text-white font-bold rounded-xl text-sm transition-all"
                  >
                    Entendido
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
