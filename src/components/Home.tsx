import React from 'react';
import { ShieldAlert, Map, Send, HelpCircle, FileText, ChevronRight } from 'lucide-react';

interface HomeProps {
  onNavigate: (sectionId: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const handleAction = (id: string) => {
    onNavigate(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="home" className="pt-32 pb-20 md:py-36 bg-gradient-to-b from-[#eef2f0] via-[#f5f7f6] to-[#f5f7f6] relative overflow-hidden">
      {/* Decorative clean ambient background glow */}
      <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-[#f28f3b]/5 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute top-2/3 -left-1/4 w-96 h-96 bg-[#1b4332]/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & Hero Heroics */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Tag indicator */}
            <div className="inline-flex items-center space-x-2 bg-[#1b4332]/10 border border-[#1b4332]/20 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#1b4332] tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#f28f3b] animate-pulse"></span>
              <span>Engajamento ESG &amp; Justiça Ambiental</span>
            </div>

            <h1 className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl text-[#1b4332] tracking-tight leading-[1.1] md:max-w-xl">
              Escuta, dados e soluções para uma indústria mais <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1b4332] via-[#0b3d59] to-[#1b4332]">justa e sustentável</span>.
            </h1>

            <p className="text-[#2d3436] text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
              Uma plataforma de mapeamento socioambiental que conecta comunidades, empresas e soluções sustentáveis para enfrentar desigualdades ambientais.
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2" id="tour-hero-actions">
              <button
                id="tour-btn-relatar"
                onClick={() => handleAction('relatar')}
                className="px-6 py-3.5 bg-[#0b3d59] hover:bg-[#072a42] text-white font-semibold rounded-xl flex items-center justify-center space-x-2 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-cyan-950/10"
              >
                <Send className="h-4.5 w-4.5" />
                <span>Relatar Problema</span>
              </button>
              
              <button
                id="tour-btn-mapa"
                onClick={() => handleAction('mapa')}
                className="px-6 py-3.5 bg-[#1b4332] hover:bg-[#133024] text-white font-semibold rounded-xl flex items-center justify-center space-x-2 border border-[#2d5c48] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 shadow-md"
              >
                <Map className="h-4.5 w-4.5 text-[#f28f3b]" />
                <span>Ver Mapa de Impactos</span>
              </button>

              <button
                id="tour-btn-propor"
                onClick={() => handleAction('propor')}
                className="px-6 py-3.5 bg-white hover:bg-gray-50 text-[#0b3d59] font-semibold rounded-xl flex items-center justify-center space-x-2 border border-[#0b3d59]/30 transition-all duration-200"
              >
                <HelpCircle className="h-4.5 w-4.5" />
                <span>Propor Solução</span>
              </button>
            </div>
          </div>
          
          {/* Right Column: Key ESG highlight summary card */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="bg-white border border-[#e9ecef] rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden text-left">
              {/* Top ambient highlight */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#f28f3b]"></div>
              
              <div className="flex items-center space-x-3 mb-6 bg-[#f5f7f6] p-3 rounded-2xl border border-[#e9ecef]">
                <div className="bg-[#1b4332]/10 p-2 rounded-xl text-[#1b4332]">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1b4332] text-sm">Modelo de Governança Inovadora</h3>
                  <p className="text-[11px] text-[#0b3d59]">Para siderúrgicas &amp; indústrias de grande porte</p>
                </div>
              </div>

              <blockquote className="space-y-4">
                <span className="text-xs font-bold text-[#f28f3b] tracking-wider uppercase block">Contexto de Justiça Ambiental</span>
                <p className="text-[#2d3436] text-sm md:text-base leading-relaxed italic">
                  &ldquo;A escuta ativa comunitária não é apenas um pilar ESG, mas um ato de governança ética. Mapear impactos socioambientais de forma transparente permite à indústria construir progresso técnico de mãos dadas com a justiça territorial.&rdquo;
                </p>
                <cite className="block text-right pr-2 text-xs font-semibold text-[#1b4332]">— Comitê de Responsabilidade ESG</cite>
              </blockquote>
            </div>
          </div>

        </div>

        {/* Section: Descobrindo o Racismo Ambiental */}
        <div className="mt-20 md:mt-28 bg-white rounded-3xl p-8 md:p-12 border-l-6 border-[#f28f3b] border-y border-r border-[#e9ecef] shadow-md text-left">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center space-x-2.5">
              <span className="w-8 h-px bg-[#1b4332]"></span>
              <span className="text-xs font-bold text-[#1b4332] uppercase tracking-widest">Conceito Fundamental</span>
            </div>
            
            <h2 className="font-sans font-bold text-2.5xl md:text-3.5xl text-[#1b4332] tracking-tight">
              O que é Racismo Ambiental?
            </h2>
            
            <p className="text-[#2d3436] text-base md:text-lg leading-relaxed font-light">
              Racismo ambiental ocorre quando populações vulnerabilizadas, muitas vezes periféricas, negras, indígenas ou de baixa renda, sofrem de forma desproporcional os impactos negativos da degradação ambiental, da poluição, da falta de infraestrutura e da má distribuição de recursos ambientais.
            </p>
            
            <p className="text-[#0b3d59] text-sm font-medium">
              Ao descentralizar o monitoramento ambiental, a plataforma atua na mitigação de assimetrias históricas, convertendo queixas em soluções viáveis.
            </p>
          </div>
        </div>

        {/* The Three Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 md:mt-24">
          
          <div className="bg-white border border-[#e9ecef] hover:border-[#1b4332]/40 p-8 rounded-2.5xl text-left transition-all duration-300 hover:shadow-xl group shadow-xs">
            <div className="bg-[#1b4332]/10 border border-[#1b4332]/20 w-12 h-12 rounded-2xl flex items-center justify-center text-[#1b4332] mb-6 group-hover:scale-105 transition-transform">
              <HelpCircle className="h-6 w-6" />
            </div>
            <h3 className="font-sans font-bold text-xl text-[#1b4332] mb-2">Escutar</h3>
            <p className="text-[#2d3436] text-sm leading-relaxed mb-4">
              Receber relatos diretos e seguros da comunidade sobre poeira, ruídos, drenagem ou resíduos, garantindo anonimato quando necessário.
            </p>
            <button onClick={() => handleAction('relatar')} className="text-[#0b3d59] text-xs font-bold flex items-center space-x-1 hover:text-[#1b4332]">
              <span>Registrar meu relato</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          <div className="bg-white border border-[#e9ecef] hover:border-[#1b4332]/40 p-8 rounded-2.5xl text-left transition-all duration-300 hover:shadow-xl group shadow-xs">
            <div className="bg-[#1b4332]/10 border border-[#1b4332]/20 w-12 h-12 rounded-2xl flex items-center justify-center text-[#1b4332] mb-6 group-hover:scale-105 transition-transform">
              <Map className="h-6 w-6" />
            </div>
            <h3 className="font-sans font-bold text-xl text-[#1b4332] mb-2">Mapear</h3>
            <p className="text-[#2d3436] text-sm leading-relaxed mb-4">
              Consolidar queixas no mapa territorial para identificar de forma visual as regiões e bairros vizinhos com maior concentração de ocorrências.
            </p>
            <button onClick={() => handleAction('mapa')} className="text-[#0b3d59] text-xs font-bold flex items-center space-x-1 hover:text-[#1b4332]">
              <span>Explorar mapa</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          <div className="bg-white border border-[#e9ecef] hover:border-[#1b4332]/40 p-8 rounded-2.5xl text-left transition-all duration-300 hover:shadow-xl group shadow-xs">
            <div className="bg-[#1b4332]/10 border border-[#1b4332]/20 w-12 h-12 rounded-2xl flex items-center justify-center text-[#1b4332] mb-6 group-hover:scale-105 transition-transform">
              <Send className="h-6 w-6" />
            </div>
            <h3 className="font-sans font-bold text-xl text-[#1b4332] mb-2">Transformar</h3>
            <p className="text-[#2d3436] text-sm leading-relaxed mb-4">
              Estruturar propostas de mitigação de engenharia social e sustentável com orçamentos estimativos e monitoramentos transparentes de progresso.
            </p>
            <button onClick={() => handleAction('propor')} className="text-[#0b3d59] text-xs font-bold flex items-center space-x-1 hover:text-[#1b4332]">
              <span>Enviar proposta</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
