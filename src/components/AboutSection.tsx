import React from 'react';
import { Award, CheckCircle, Shield, Globe, Users, Code, BookOpen } from 'lucide-react';

export default function AboutSection() {
  const pilares = [
    { p: 'Desenvolvimento Web', desc: 'Codificado em arquiteturas de fácil compressão para fomentar o aprendizado de jovens desenvolvedores civis.', icon: <Code className="h-5 w-5" /> },
    { p: 'Sustentabilidade', desc: 'Foco na conservação dos ecossistemas locais, melhoria da qualidade do ar, solo e vazão hídrica.', icon: <Globe className="h-5 w-5" /> },
    { p: 'Governança ESG', desc: 'Adequação ética em Environmental, Social and Governance, demonstrando como indústrias de grande porte reduzem passivos.', icon: <CheckCircle className="h-5 w-5" /> },
    { p: 'Justiça Ambiental', desc: 'Prevenção e combate ao Racismo Ambiental de forma prática, redistribuindo os recursos de bem-estar de forma justa.', icon: <Shield className="h-5 w-5" /> },
    { p: 'Escuta Comunitária', desc: 'Canais abertos que colhem depoimentos sem burocracias, gerando legitimidade e transparência direta.', icon: <Users className="h-5 w-5" /> },
    { p: 'Inovação Social', desc: 'Mobilização coletiva onde moradores e academia cocriam engenharia urbana aplicada à vida real.', icon: <Award className="h-5 w-5" /> },
    { p: 'Responsabilidade Social', desc: 'Aproximação institucional entre forças de mercado industrial e as vilas operárias vizinhas.', icon: <BookOpen className="h-5 w-5" /> }
  ];

  return (
    <section id="sobre" className="py-20 bg-[#f5f7f6] border-t border-[#e9ecef] text-left relative">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#1b4332]/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Description Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center space-x-2">
              <span className="w-8 h-px bg-[#1b4332]"></span>
              <span className="text-xs font-bold text-[#f28f3b] uppercase tracking-widest">Sobre o Projeto</span>
            </div>
            
            <h2 className="font-sans font-bold text-3xl md:text-4xl text-[#1b4332] tracking-tight leading-tight">
              Transformar escuta em ação, dados em prioridades concretas.
            </h2>
            
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              A Plataforma de Escuta, Mapeamento e Soluções Socioambientais nasce como uma proposta tecnológica para apoiar empresas, comunidades e instituições na identificação de desigualdades ambientais. A ferramenta busca transformar relatos comunitários em dados, dados em prioridades e prioridades em ações concretas.
            </p>

            <blockquote className="border-l-2 border-[#1b4332] pl-4 py-1 italic text-gray-500 text-xs sm:text-sm">
              &ldquo;Mapear impactos é o primeiro passo para reduzir desigualdades. Sustentabilidade também significa justiça territorial.&rdquo;
            </blockquote>

            <div className="p-4 bg-white border border-[#e9ecef] rounded-2xl shadow-xs">
              <span className="text-[#f28f3b] font-bold ml-1 text-xs sm:text-sm uppercase block mb-1">Fundamentação Científica e de Governança Digital</span>
              <p className="text-gray-600 text-xs leading-relaxed">
                Esta plataforma baseia-se em parâmetros físico-químicos e acústicos reais estabelecidos pela legislação brasileira, incluindo as resoluções do CONAMA 491/2018 para qualidade do ar (PM10, PM2.5), a norma técnica NBR 10151 para limites de conforto acústico residencial, e as diretrizes globais do GRI (Global Reporting Initiative) para governança ESG aplicada.
              </p>
            </div>
          </div>

          {/* Right Pillar Grid Column */}
          <div className="lg:col-span-6">
            <div className="bg-white border border-[#e9ecef] p-6 md:p-8 rounded-3xl shadow-md space-y-4">
              <h3 className="text-xs font-bold text-[#0b3d59] uppercase tracking-widest block mb-4">
                Integração Multidimensional do Projeto
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pilares.slice(0, 6).map((item) => (
                  <div key={item.p} className="p-4 bg-[#f5f7f6] rounded-2xl border border-[#e9ecef] text-left">
                    <div className="text-[#1b4332] mb-2">{item.icon}</div>
                    <h4 className="font-bold text-[#1b4332] text-xs">{item.p}</h4>
                    <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
