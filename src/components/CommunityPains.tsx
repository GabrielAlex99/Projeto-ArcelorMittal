import React, { useState } from 'react';
import { 
  Heart, 
  Wind, 
  Volume2, 
  Droplet, 
  AlertCircle, 
  MessageSquare, 
  User, 
  Sparkles, 
  Activity, 
  ArrowRight,
  TrendingUp,
  MapPin,
  Calendar,
  Frown,
  BadgeAlert
} from 'lucide-react';

interface Depoimento {
  id: string;
  nome: string;
  idade: number;
  bairro: string;
  categoria: 'Ar' | 'Água' | 'Ruído' | 'Geral';
  queixa: string;
  historia: string;
  dataTermometro: number; // 0-100 indicating severeness
  saudeEfeito: string;
  cotidianoAfetado: string;
}

export default function CommunityPains() {
  const [activeFiltro, setActiveFiltro] = useState<'Todos' | 'Ar' | 'Água' | 'Ruído'>('Todos');
  const [selectedDepoimento, setSelectedDepoimento] = useState<string | null>(null);

  const depoimentos: Depoimento[] = [
    {
      id: 'dep-1',
      nome: 'Dona Maria de Lourdes',
      idade: 64,
      bairro: 'Jesuítas (Santa Cruz - RJ)',
      categoria: 'Ar',
      queixa: 'Poeira cinza e brilhante que cobre o quintal e ataca a asma',
      historia: 'Todo dia de manhã, varro um pó denso de minério que parece purpurina escura. Minha neta de 4 anos usa bombinha de asma três vezes por semana. No verão, o ar fica tão pesado que arde a garganta só de respirar no quintal. Sentimos que as indústrias lucram enquanto nós pagamos com a saúde dos nossos pulmões.',
      dataTermometro: 89,
      saudeEfeito: 'Crises crônicas de bronquite e asma infantil na família.',
      cotidianoAfetado: 'Não é possível estender roupas no varal; janelas precisam ficar fechadas 24h por dia.'
    },
    {
      id: 'dep-2',
      nome: 'Seu Sebastião "Tião"',
      idade: 52,
      bairro: 'Vila Parisi (Cubatão - SP)',
      categoria: 'Ar',
      queixa: 'Odor químico irritante e neblina ácida em dias frios',
      historia: 'Moro aqui há trinta anos. Embora as indústrias tenham colocado filtros no passado, o cheiro forte de enxofre e amônia volta com tudo durante as madrugadas. Tem noite que a gente acorda tossindo com um gosto metálico na boca. O posto de saúde vive lotado de crianças e idosos com inalação.',
      dataTermometro: 92,
      saudeEfeito: 'Irritação ocular severa, garganta inflamada crônica e dores de cabeça.',
      cotidianoAfetado: 'Impossibilidade de praticar atividades físicas ao ar livre; noites de sono interrompidas.'
    },
    {
      id: 'dep-3',
      nome: 'Cláudio Santos (Pescador)',
      idade: 47,
      bairro: 'Santa Cruz dos Navegantes (Guarujá - SP)',
      categoria: 'Água',
      queixa: 'Esgoto sem tratamento desaguando próximo às moradias e praias',
      historia: 'A maré traz os detritos diretamente para as praias onde as crianças brincam. O peixe diminuiu por causa do óleo das embarcações e da sujeira acumulada do porto. Quem vive da pesca aqui está vendo a água adoecer, e nossa renda indo embora junto com a dignidade de ter uma praia limpa.',
      dataTermometro: 78,
      saudeEfeito: 'Surtos recorrentes de dermatite na pele e diarreia infantil.',
      cotidianoAfetado: 'Pesca artesanal prejudicada; redução drástica da segurança alimentar das famílias tradicionais.'
    },
    {
      id: 'dep-4',
      nome: 'Rita de Cássia',
      idade: 38,
      bairro: 'Bairro Veneza (Ipatinga - MG)',
      categoria: 'Ruído',
      queixa: 'Zumbido de motores pesados e tremores residenciais na madrugada',
      historia: 'O barulho das máquinas da siderúrgica não para. É um som contínuo, tipo um zumbido grave que entra na cabeça da gente e não sai. O pior é de madrugada, quando eles fazem o descarregamento de escória. A casa inteira estremece levemente, e as xícaras no armário tilintam. Meu filho autista entra em pânico quase toda semana.',
      dataTermometro: 85,
      saudeEfeito: 'Privação severa de sono, ansiedade instalada e estresse auditivo contínuo.',
      cotidianoAfetado: 'Impossível assistir televisão ou ler um livro em paz; rachaduras constantes no reboco das paredes.'
    },
    {
      id: 'dep-5',
      nome: 'Ezequiel da Silva',
      idade: 71,
      bairro: 'Zona Residencial (Candiota - RS)',
      categoria: 'Ar',
      queixa: 'Fumaça escura de carvão e fuligem ácida nas plantações',
      historia: 'As folhas de couve e o milharal no meu quintal nascem manchados de cinza. A água da chuva que a gente capta vem turva. A queima do carvão na usina causa uma chuva ácida de leve que destrói a horta da vizinhança. A gente plantava para comer, hoje temos medo de comer o que a terra dá.',
      dataTermometro: 82,
      saudeEfeito: 'Problemas de pele, ardência constante nos olhos e dores nas articulações.',
      cotidianoAfetado: 'Perda total do sustento de subsistência por pequenas hortas domésticas.'
    }
  ];

  const doresEstatisticas = [
    { title: "Insônia e Distúrbios de Sono", rate: "76%", badge: "Ruído Noturno", color: "rose", desc: "Moradores vizinhos às indústrias relatam noites perdidas pelo ruído grave constante." },
    { title: "Inalação de Emergência", rate: "4.2x", badge: "Poluição do Ar", color: "red", desc: "Crianças em áreas com fuligem de minério usam nebulizadores quatro vezes mais que a média nacional." },
    { title: "Contaminação Ocular / Conjuntivite", rate: "58%", badge: "Fuligem Química", color: "amber", desc: "Casos frequentes de ardor e conjuntivite crônica devido a micropartículas suspensas." },
    { title: "Rachaduras Estruturais", rate: "1 em cada 3 casas", badge: "Vibração de Solo", color: "orange", desc: "Danos residenciais acumulados devidos ao tráfego pesado de carretas na região periférica." }
  ];

  const palavrasDeTristeza = [
    { word: "Sono Interrompido", level: "Crítico" },
    { word: "Medo de Respirar", level: "Crítico" },
    { word: "Bombinha de Asma", level: "Frequente" },
    { word: "Garganta Seca", level: "Diário" },
    { word: "Vidros Vibrando", level: "Noturno" },
    { word: "Pó Preto nas Mãos", level: "Diário" },
    { word: "Água Amarelada", level: "Urgente" },
    { word: "Zumbido na Cabeça", level: "Constante" },
    { word: "Falta de Quintal Limpo", level: "Crônico" },
  ];

  const filteredDepoimentos = activeFiltro === 'Todos' 
    ? depoimentos 
    : depoimentos.filter(d => d.categoria === activeFiltro);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-left animate-fade-in">
      
      {/* Intro Header */}
      <div className="mb-12 border-b border-gray-100 pb-8">
        <span className="text-xs font-black text-rose-600 tracking-wider uppercase bg-rose-50 px-3 py-1 rounded-full inline-block mb-3 animate-pulse">
          💔 Impacto Real & Humano
        </span>
        <h1 className="font-sans font-bold text-3.5xl md:text-4.5xl text-[#1b4332] tracking-tight">
          Vozes & Dores da Comunidade
        </h1>
        <p className="text-gray-650 text-base md:text-lg max-w-3xl mt-2 leading-relaxed">
          Para além dos relatórios técnicos e planilhas ESG corporativas, existem pessoas de carne e osso sofrendo os efeitos colaterais imediatos da vizinhança industrial. Conheça as narrativas reais, os sentimentos e as dores de quem vivencia esses problemas diariamente.
        </p>
      </div>

      {/* Grid: Bento Structure for Pains and Pains Cloud */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        
        {/* Statistics of Pains Card */}
        <div className="bg-gradient-to-br from-rose-50 to-white border border-rose-100 rounded-3.5xl p-6 md:p-8 flex flex-col justify-between shadow-xs lg:col-span-2">
          <div>
            <div className="flex items-center space-x-2 text-rose-700 font-bold mb-4">
              <Activity className="h-5 w-5 text-rose-600" />
              <span className="text-sm uppercase tracking-wider">Métricas Reais de Desconforto</span>
            </div>
            <h2 className="font-sans font-bold text-2xl text-gray-900 tracking-tight mb-2">
              O Termômetro Clínico da Vizinhança
            </h2>
            <p className="text-gray-600 text-xs md:text-sm mb-6 leading-relaxed">
              Dados obtidos através de questionários de impacto comunitário autônomos. Estas taxas refletem o cotidiano das famílias que compartilham divisas com grandes polos industriais e logísticos.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {doresEstatisticas.map((stat, idx) => (
                <div key={idx} className="bg-white border border-rose-50 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition-shadow">
                  <div className="flex justify-between items-start mb-1.5">
                    <span className="text-2.5xl font-black text-rose-600 tracking-tight">{stat.rate}</span>
                    <span className="text-[10px] bg-rose-50 border border-rose-100 text-rose-700 px-2 py-0.5 rounded-full font-bold">
                      {stat.badge}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-850 text-xs sm:text-sm">{stat.title}</h3>
                  <p className="text-[11px] text-gray-500 mt-1 leading-snug">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-rose-100/50 flex items-center justify-between text-xs text-rose-950">
            <span>Diagnóstico consolidado por comitês de base territorial.</span>
            <span className="font-bold flex items-center text-rose-700">
              Total de moradias afetadas ~14k <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </span>
          </div>
        </div>

        {/* Emotion Word Tag Board */}
        <div className="bg-[#0b131a] text-white rounded-3.5xl p-6 md:p-8 flex flex-col justify-between shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full filter blur-2xl pointer-events-none"></div>
          <div>
            <div className="flex items-center space-x-2 text-rose-450 font-bold mb-4">
              <BadgeAlert className="h-5 w-5 text-rose-500" />
              <span className="text-xs uppercase tracking-wider text-rose-500">Mural Sensorial de Sobrecarga</span>
            </div>
            <h2 className="font-sans font-bold text-xl text-gray-100 tracking-tight mb-2">
              Dicionário do Desgaste
            </h2>
            <p className="text-gray-400 text-xs mb-6 leading-relaxed">
              O que os moradores escutam, enxergam, respiram e sentem nos piores momentos do mês.
            </p>

            <div className="flex flex-wrap gap-2.5">
              {palavrasDeTristeza.map((item, idx) => (
                <span 
                  key={idx} 
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-default transition-all hover:scale-105 duration-100 ${
                    item.level === 'Crítico' 
                      ? 'bg-rose-550/20 text-rose-350 border border-rose-500/30'
                      : item.level === 'Urgente'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-slate-800 text-slate-300 border border-slate-700/50'
                  }`}
                  title={`Frequência do sintoma: ${item.level}`}
                >
                  {item.word}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800 text-[11px] text-gray-400 flex items-center justify-between">
            <span>Palavras recolhidas de depoimentos espontâneos.</span>
            <Frown className="h-4 w-4 text-rose-400" />
          </div>
        </div>

      </div>

      {/* Main Depoimentos Workspace Area */}
      <div className="bg-white border border-[#e9ecef] rounded-3.5xl p-6 md:p-8 shadow-xs">
        
        {/* Filtering & Navigation topbar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-gray-100 pb-5">
          <div>
            <h3 className="font-sans font-bold text-lg text-gray-900">Relatos Íntimos & Entrevistas</h3>
            <p className="text-xs text-gray-500">Filtrar narrativas por tipo de impacto ou dor principal.</p>
          </div>

          {/* Filtering buttons */}
          <div className="flex flex-wrap gap-2">
            {(['Todos', 'Ar', 'Água', 'Ruído'] as const).map(f => (
              <button
                key={f}
                onClick={() => { setActiveFiltro(f); setSelectedDepoimento(null); }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeFiltro === f
                    ? 'bg-[#1b4332] text-white shadow-xs'
                    : 'bg-[#f5f7f6] text-gray-600 hover:bg-gray-100 border border-[#e9ecef]'
                }`}
              >
                {f === 'Todos' ? 'Todos os Relatos' : `Impactos de ${f}`}
              </button>
            ))}
          </div>
        </div>

        {/* Big layout area split into Side list of names and Main details preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* List of Persons */}
          <div className="lg:col-span-5 space-y-3.5 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredDepoimentos.map((dep) => {
              const isSelected = selectedDepoimento === dep.id || (!selectedDepoimento && filteredDepoimentos[0]?.id === dep.id);
              const tagColors = {
                Ar: 'bg-teal-50 text-teal-700 border-teal-100',
                Água: 'bg-blue-50 text-blue-700 border-blue-100',
                Ruído: 'bg-purple-50 text-purple-700 border-purple-100',
                Geral: 'bg-gray-50 text-gray-700 border-gray-100'
              };

              return (
                <button
                  key={dep.id}
                  onClick={() => setSelectedDepoimento(dep.id)}
                  className={`w-full text-left p-4.5 rounded-2.5xl border transition-all flex flex-col space-y-2 relative focus:outline-hidden ${
                    isSelected
                      ? 'bg-rose-50/40 border-rose-200 ring-1 ring-rose-200'
                      : 'bg-white border-[#e9ecef] hover:bg-gray-50/50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 block tracking-wider uppercase">Morador(a) Afetado(a)</span>
                      <h4 className="font-bold text-sm text-gray-900">{dep.nome}, {dep.idade} anos</h4>
                    </div>
                    <span className={`text-[10px] font-bold border px-2 py-0.5 rounded-full ${tagColors[dep.categoria]}`}>
                      {dep.categoria}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 font-medium italic line-clamp-2">
                    "{dep.queixa}"
                  </p>

                  <div className="flex justify-between items-center text-[10px] text-gray-550 pt-2 border-t border-gray-100/50">
                    <span className="flex items-center text-gray-500">
                      <MapPin className="h-3 w-3 mr-1 text-[#f28f3b]" />
                      {dep.bairro}
                    </span>
                    <span className="font-bold text-rose-600">
                      Gravidade: {dep.dataTermometro}%
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Large display selected testimony */}
          <div className="lg:col-span-7">
            {(() => {
              const activeId = selectedDepoimento || filteredDepoimentos[0]?.id;
              const depObj = depoimentos.find(d => d.id === activeId);

              if (!depObj) {
                return (
                  <div className="h-full bg-gray-50 border border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center text-gray-400">
                    <User className="h-12 w-12 mb-2 stroke-1" />
                    <p className="text-xs">Clique em um depoimento para ler o relato completo deste morador.</p>
                  </div>
                );
              }

              return (
                <div className="bg-[#f5f7f6] border border-[#e9ecef] rounded-3.5xl p-6 md:p-8 text-left space-y-6 relative h-full flex flex-col justify-between">
                  <div className="absolute top-5 right-5 w-24 h-24 bg-[#1b4332]/5 rounded-full filter blur-2xl pointer-events-none"></div>
                  
                  <div className="space-y-4">
                    {/* Person Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div className="flex items-center space-x-3.5">
                        <div className="w-12 h-12 bg-rose-100/80 text-rose-700 rounded-full border border-rose-300/30 flex items-center justify-center font-bold text-lg">
                          {depObj.nome.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-sans font-bold text-base md:text-lg text-[#1b4332]">{depObj.nome}</h3>
                            <span className="text-xs text-gray-500 font-medium">({depObj.idade} anos)</span>
                          </div>
                          <span className="text-xs text-gray-600 flex items-center mt-0.5">
                            <MapPin className="h-3 w-3 text-[#f28f3b] mr-1" />
                            {depObj.bairro}
                          </span>
                        </div>
                      </div>

                      {/* Thermometer rating */}
                      <div className="bg-white border border-[#e9ecef] rounded-xl px-3 py-2 text-right shadow-2xs shrink-0 self-start sm:self-center">
                        <span className="text-[10px] text-gray-400 block font-medium uppercase tracking-wider">Índice de Afetação</span>
                        <div className="flex items-center space-x-1.5">
                          <span className="text-sm font-black text-rose-600">{depObj.dataTermometro}%</span>
                          <div className="w-10 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-rose-500 rounded-full" style={{ width: `${depObj.dataTermometro}%` }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Problem brief */}
                    <div className="bg-white/80 border border-gray-150 rounded-2xl p-4 text-xs font-semibold text-gray-800 flex items-start space-x-2.5">
                      <MessageSquare className="h-4.5 w-4.5 text-rose-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Queixa Declarada</span>
                        "{depObj.queixa}"
                      </div>
                    </div>

                    {/* Extended testmonial narrative */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">O Relato do Quotidiano</span>
                      <p className="text-xs md:text-sm text-gray-700 leading-relaxed italic bg-white p-5 rounded-2.5xl border border-gray-150 shadow-2xs">
                        "{depObj.historia}"
                      </p>
                    </div>

                    {/* Specific clinical side effect */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="bg-rose-50/40 border border-rose-100 rounded-2xl p-4 text-xs text-rose-900 space-y-1">
                        <strong className="text-rose-950 font-semibold block flex items-center">
                          <Heart className="h-3.5 w-3.5 mr-1 text-rose-600 fill-rose-100" />
                          Saúde & Impacto Físico
                        </strong>
                        <p className="text-rose-800 text-[11px] leading-relaxed">{depObj.saudeEfeito}</p>
                      </div>

                      <div className="bg-amber-50/40 border border-amber-100 rounded-2xl p-4 text-xs text-amber-900 space-y-1">
                        <strong className="text-amber-950 font-semibold block flex items-center">
                          <Activity className="h-3.5 w-3.5 mr-1 text-amber-600" />
                          Limitações do Dia a Dia
                        </strong>
                        <p className="text-amber-800 text-[11px] leading-relaxed">{depObj.cotidianoAfetado}</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-[10px] text-gray-400 text-right italic pt-4 mt-4 border-t border-gray-200/55 flex justify-between items-center">
                    <span className="flex items-center text-gray-500">
                      <Calendar className="h-3.5 w-3.5 mr-1 text-gray-400" />
                      Entrevista colhida em Maio de 2026
                    </span>
                    <span>Os nomes reais dos entrevistados foram alterados em conformidade com as diretrizes da LGPD.</span>
                  </div>
                </div>
              );
            })()}
          </div>

        </div>

      </div>

    </div>
  );
}
