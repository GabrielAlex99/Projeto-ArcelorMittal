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

        {/* UN SDGs (ODS) Section */}
        <div className="pt-12 mt-12 border-t border-gray-200 text-left">
          <div className="flex items-center space-x-2 mb-6">
            <span className="w-8 h-px bg-[#1b4332]"></span>
            <span className="text-xs font-bold text-[#f28f3b] uppercase tracking-widest">Compromisso Global</span>
          </div>
          
          <div className="max-w-3xl mb-8">
            <h3 className="font-sans font-bold text-2xl text-[#1b4332] tracking-tight">
              Alinhamento com as ODS da Agenda 2030 (ONU)
            </h3>
            <p className="text-gray-650 text-sm mt-2 leading-relaxed">
              O projeto atua diretamente na consecução de metas globais da Organização das Nações Unidas (ONU) para o desenvolvimento sustentável. Mapeamos os pontos críticos comunitários correlacionando-os aos seguintes Objetivos de Desenvolvimento Sustentável (ODS):
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* ODS 3 */}
            <div className="p-5 bg-white border border-[#4C9F38]/20 hover:border-[#4C9F38] rounded-2.5xl shadow-2xs transition-all relative group text-left">
              <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-[#4C9F38] text-white flex items-center justify-center font-bold text-sm font-mono shadow-xs">
                3
              </div>
              <span className="text-[10px] font-bold text-[#4C9F38] uppercase tracking-wider block mb-1">ODS 3</span>
              <h4 className="font-sans font-bold text-sm text-[#1b4332]">Saúde e Bem-Estar</h4>
              <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
                Combate à proliferação de moléstias do trato respiratório e estresse crônico causados pela dispersão descontrolada de poeiras pesadas e poluição sonora contínua.
              </p>
            </div>

            {/* ODS 6 */}
            <div className="p-5 bg-white border border-[#26BDE2]/20 hover:border-[#26BDE2] rounded-2.5xl shadow-2xs transition-all relative group text-left">
              <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-[#26BDE2] text-white flex items-center justify-center font-bold text-sm font-mono shadow-xs">
                6
              </div>
              <span className="text-[10px] font-bold text-[#26BDE2] uppercase tracking-wider block mb-1">ODS 6</span>
              <h4 className="font-sans font-bold text-sm text-[#1b4332]">Água Potável e Saneamento</h4>
              <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
                Mapeamento ativo para sanar contaminações furtivas em mananciais, poços rasos periféricos e bacias de amortecimento por metais pesados e efluentes industriais líquidos.
              </p>
            </div>

            {/* ODS 9 */}
            <div className="p-5 bg-white border border-[#F36D25]/20 hover:border-[#F36D25] rounded-2.5xl shadow-2xs transition-all relative group text-left">
              <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-[#F36D25] text-white flex items-center justify-center font-bold text-sm font-mono shadow-xs">
                9
              </div>
              <span className="text-[10px] font-bold text-[#F36D25] uppercase tracking-wider block mb-1">ODS 9</span>
              <h4 className="font-sans font-bold text-sm text-[#1b4332]">Indústria, Inovação e Infra</h4>
              <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
                Estímulo ao desenvolvimento de processos produtivos limpos por meio de propostas tecnológicas, cinturões florestais de atenuação e aspersão inteligente.
              </p>
            </div>

            {/* ODS 11 */}
            <div className="p-5 bg-white border border-[#FD9D24]/20 hover:border-[#FD9D24] rounded-2.5xl shadow-2xs transition-all relative group text-left">
              <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-[#FD9D24] text-white flex items-center justify-center font-bold text-sm font-mono shadow-xs">
                11
              </div>
              <span className="text-[10px] font-bold text-[#FD9D24] uppercase tracking-wider block mb-1">ODS 11</span>
              <h4 className="font-sans font-bold text-sm text-[#1b4332]">Cidades e Comunidades</h4>
              <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
                Redução drástica do impacto ecológico e vulnerabilidade habitacional de bairros operários lindeiros a polos industriais petroquímicos e siderúrgicos nacionais.
              </p>
            </div>

            {/* ODS 12 */}
            <div className="p-5 bg-white border border-[#C1971F]/20 hover:border-[#C1971F] rounded-2.5xl shadow-2xs transition-all relative group text-left">
              <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-[#C1971F] text-white flex items-center justify-center font-bold text-sm font-mono shadow-xs">
                12
              </div>
              <span className="text-[10px] font-bold text-[#C1971F] uppercase tracking-wider block mb-1">ODS 12</span>
              <h4 className="font-sans font-bold text-sm text-[#1b4332]">Consumo e Prod. Responsáveis</h4>
              <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
                Destinação segura de escórias industriais, reaproveitamento de agregados na economia circular e promoção da simbiose industrial perante a comunidade.
              </p>
            </div>

            {/* ODS 13 */}
            <div className="p-5 bg-white border border-[#3F7E44]/20 hover:border-[#3F7E44] rounded-2.5xl shadow-2xs transition-all relative group text-left">
              <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-[#3F7E44] text-white flex items-center justify-center font-bold text-sm font-mono shadow-xs">
                13
              </div>
              <span className="text-[10px] font-bold text-[#3F7E44] uppercase tracking-wider block mb-1">ODS 13</span>
              <h4 className="font-sans font-bold text-sm text-[#1b4332]">Ação Contra a Mudança do Clima</h4>
              <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
                Plantios perimetrais de arborização viária para arrefecimento térmico nas vilas operárias, sequestro direto de gases estufa e regulação de microclima local.
              </p>
            </div>

            {/* ODS 15 */}
            <div className="p-5 bg-white border border-[#56C02B]/20 hover:border-[#56C02B] rounded-2.5xl shadow-2xs transition-all relative group text-left">
              <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-[#56C02B] text-white flex items-center justify-center font-bold text-sm font-mono shadow-xs">
                15
              </div>
              <span className="text-[10px] font-bold text-[#56C02B] uppercase tracking-wider block mb-1">ODS 15</span>
              <h4 className="font-sans font-bold text-sm text-[#1b4332]">Vida Terrestre</h4>
              <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
                Uso de sementes e mudas endêmicas da Mata Atlântica/Cerrado para recuperação botânica de corredores degradados e faixas de refúgio ecológico.
              </p>
            </div>

            {/* ODS 17 */}
            <div className="p-5 bg-white border border-[#194873]/20 hover:border-[#194873] rounded-2.5xl shadow-2xs transition-all relative group text-left">
              <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-[#194873] text-white flex items-center justify-center font-bold text-sm font-mono shadow-xs">
                17
              </div>
              <span className="text-[10px] font-bold text-[#194873] uppercase tracking-wider block mb-1">ODS 17</span>
              <h4 className="font-sans font-bold text-sm text-[#1b4332]">Parcerias e Meios de Implantação</h4>
              <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
                Aproximação multissetorial entre conselhos comunitários de saúde, academia regional técnica e agentes empresariais em prol do bem comum socioambiental.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
