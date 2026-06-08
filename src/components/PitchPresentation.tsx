import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Tv, 
  Presentation, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  Heart, 
  Building,
  Target,
  Sparkles
} from 'lucide-react';

interface Slide {
  title: string;
  subtitle: string;
  narrativeText: string;
  talkingPoints: string[];
  visualType: 'cover' | 'problem' | 'how-works' | 'solutions' | 'esg-impact' | 'closure';
  badge: string;
}

export default function PitchPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [voiceOverEnabled, setVoiceOverEnabled] = useState(true);
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);
  const progressTimer = useRef<NodeJS.Timeout | null>(null);

  const SLIDE_DURATION = 28000; // 28 seconds per slide for a pleasant and complete voice readout of the slides

  const slides: Slide[] = [
    {
      badge: "Inovação ESG",
      title: "Aliança Socioambiental ArcelorMittal",
      subtitle: "Compromisso Estruturado com a Justiça Climática, Escuta Ativa e Modelos de Governança Integrada na Siderurgia Moderna.",
      narrativeText: "Sejam bem-vindos à apresentação executiva do portal aliança socioambiental Arcelor Mittal. Este projeto foi concebido para os tomadores de decisão e líderes de ESG da Arcelor Mittal, de forma a reestruturar a relação territorial com as comunidades vizinhas por meio de tecnologia e transparência.",
      talkingPoints: [
        "Sistematização do diálogo comunitário (Cidades de Vitória, Vila Velha, Serra e Cariacica)",
        "Fortalecimento da licença social para operar no Complexo Siderúrgico",
        "Conectividade direta entre relatos periféricos e canais internos de engenharia mitigadora",
        "Transição da postura reativa para liderança ESG de alto impacto"
      ],
      visualType: 'cover'
    },
    {
      badge: "Análise do Território",
      title: "O Desafio Social Limitante",
      subtitle: "Como as assimetrias históricas e a dispersão dos impactos operacionais geram fricção social silenciosa.",
      narrativeText: "Nas margens industriais, as comunidades adjacentes relatam historicamente eventos frequentes de poeira difusa, ruídos de pátios ferroviários, escoamento de sedimentos e odores. Sem canais integrados de dados, o conflito se judicializa ou desgasta a imagem institucional.",
      talkingPoints: [
        "Pó Preto e Poeira Suspensa: Percepções imediatas de qualidade sanitária local",
        "Poluição Sonora Noturna: Conflitos acústicos em áreas limítrofes",
        "Afastamento Social: Ruptura no canal de interlocução transparente",
        "Risco Tecnológico e Reputacional: Vulnerabilidades mitigáveis com escuta atenta"
      ],
      visualType: 'problem'
    },
    {
      badge: "Arquitetura da Solução",
      title: "O Portal da Escuta Ativa e Co-Criação",
      subtitle: "Um ecossistema digital que centraliza denúncias territoriais anônimas e as traduz em ações georreferenciadas.",
      narrativeText: "A nossa solução substitui o ruído administrativo por uma central dinâmica. Os moradores relatam em tempo real, gerando uma nuvem de pontos térmicos para auditoria. A Arcelor Mittal responde com planos claros, gerando uma governança transparente e incontestável.",
      talkingPoints: [
        "Mapeamento Térmico em Tempo Real: Identificação instantânea de focos geográficos de estresse",
        "Escuta Descentralizada: Inclusão digital para comunidades vulnerabilizadas",
        "Clínica de Vozes: Relatos humanos e dores convertidos em métricas qualitativas e quantitativas",
        "Gestão de Dados e Conectividade Aberta: Ciência de dados no pilar Social do ESG"
      ],
      visualType: 'how-works'
    },
    {
      badge: "Inovação e Ações Práticas",
      title: "Co-Criação e o Banco de Projetos",
      subtitle: "Convertendo queixas históricas de poluição em portfólios visíveis de mitigação socioindustrial de alta engenharia.",
      narrativeText: "Mais do que denunciar, os moradores e engenheiros colaboram formulando soluções viáveis de atenuação de poluição e infraestrutura urbana. Do reflorestamento periférico à instalação de barreiras acústicas ecológicas.",
      talkingPoints: [
        "Ideação Sustentável: Filtros magnéticos, aspersores digitais, viveiros de mudas comunitários",
        "Prazos e Transparência: Acompanhamento público do cronograma das obras mitigadoras",
        "Investimento Co-Participativo: Engajamento social e estimativa orçamentária compartilhada",
        "Transformação Territorial: A Arcelor Mittal financiando impacto real ao lado de seus vizinhos"
      ],
      visualType: 'solutions'
    },
    {
      badge: "Métricas e Impacto ESG",
      title: "Indicadores de Governança e Impacto",
      subtitle: "Perfeita adequação aos frameworks internacionais GRI, pacto global da ONU e integridade territorial corporativa.",
      narrativeText: "A governança socioambiental baseada em dados reduz os passivos judiciais, melhora o rating de sustentabilidade corporativa da Arcelor Mittal no mercado financeiro global e cumpre rigorosamente as premissas nacionais de combate às assimetrias climáticas.",
      talkingPoints: [
        "Framework GRI & SASB Compliance: Relatórios anuais com dados estruturados da comunidade",
        "S - Social: Resolução rápida de conflitos territoriais (tempo médio de resposta de crises)",
        "G - Governance: Auditoria interna preventiva unificada com auditoria populacional externa",
        "Proteção Jurídica: Menor volume de lides por meio de conciliação comunitária transparente"
      ],
      visualType: 'esg-impact'
    },
    {
      badge: "Liderança para o Futuro",
      title: "Protagonismo e Licença Social",
      subtitle: "ArcelorMittal liderando a siderurgia transparente e transformadora na América Latina.",
      narrativeText: "Ao adotar a Plataforma Aliança Socioambiental, a Arcelor Mittal de Tubarão assume a vanguarda absoluta. Mostramos que o desenvolvimento tecnológico e a produção do aço podem e devem caminhar em profunda conciliação com a vida humana e a justiça territorial. Obrigado.",
      talkingPoints: [
        "Inovação Aberta com a Sociedade: Coexistência harmoniosa baseada em fatos e cooperação",
        "Previsibilidade de Crise: Evitando desgaste midiático e focando em mitigamento produtivo",
        "Criação de Valor Compartilhado: O sucesso industrial impulsionando a prosperidade local",
        "Implementação Imediata: Sistema modular pronto para integração de canais de ouvidoria"
      ],
      visualType: 'closure'
    }
  ];

  // Stop Speech when leaving/changing slide
  const stopVoice = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  // Speak narration
  const speakSlideNarration = (index: number) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    
    // Always call cancel first to clear any queue
    window.speechSynthesis.cancel();
    
    // If mute is active, don't play
    if (!voiceOverEnabled) return;
    
    const slide = slides[index];
    const utterance = new SpeechSynthesisUtterance(slide.narrativeText);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.0; // Pleasant reading speed
    window.speechSynthesis.speak(utterance);
  };

  // Handle Play/Pause
  useEffect(() => {
    if (isPlaying) {
      speakSlideNarration(currentSlide);
      
      // Setup interval for advancement
      const startTime = Date.now();
      progressTimer.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const currentProgress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
        setProgress(currentProgress);
      }, 50);

      autoPlayTimer.current = setTimeout(() => {
        handleNextSlide();
      }, SLIDE_DURATION);

    } else {
      stopVoice();
      if (autoPlayTimer.current) clearTimeout(autoPlayTimer.current);
      if (progressTimer.current) clearInterval(progressTimer.current);
    }

    return () => {
      if (autoPlayTimer.current) clearTimeout(autoPlayTimer.current);
      if (progressTimer.current) clearInterval(progressTimer.current);
    };
  }, [isPlaying, currentSlide, voiceOverEnabled]);

  const handleNextSlide = () => {
    setProgress(0);
    setCurrentSlide((prev) => {
      const next = (prev + 1) % slides.length;
      if (isPlaying) {
        // Trigger speech on next
        setTimeout(() => speakSlideNarration(next), 100);
      }
      return next;
    });
  };

  const handlePrevSlide = () => {
    setProgress(0);
    setCurrentSlide((prev) => {
      const next = prev === 0 ? slides.length - 1 : prev - 1;
      if (isPlaying) {
        setTimeout(() => speakSlideNarration(next), 100);
      }
      return next;
    });
  };

  const selectSlide = (index: number) => {
    setProgress(0);
    setCurrentSlide(index);
    if (isPlaying) {
      setTimeout(() => speakSlideNarration(index), 100);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleVoice = () => {
    const nextVoice = !voiceOverEnabled;
    setVoiceOverEnabled(nextVoice);
    if (!nextVoice) {
      stopVoice();
    } else if (isPlaying) {
      speakSlideNarration(currentSlide);
    }
  };

  useEffect(() => {
    return () => {
      stopVoice();
    };
  }, []);

  const currentSlideData = slides[currentSlide];

  return (
    <div className="max-w-6xl mx-auto px-4 pt-12 md:pt-16 pb-12 text-left font-sans" id="pitch-presentation-root">
      
      {/* Title Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="bg-orange-500/10 border border-orange-500/30 px-3 py-1 rounded-full text-[11px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider mb-2 inline-block">
            🎬 MULTIMÍDIA EXCLUSIVA
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1b4332] dark:text-white tracking-tight flex items-center space-x-2.5">
            <Presentation className="h-7 w-7 text-emerald-700 dark:text-emerald-400 shrink-0" />
            <span className="text-[#1b4332] dark:text-slate-100">Apresentação Executiva ArcelorMittal</span>
          </h2>
          <p className="text-gray-700 dark:text-slate-350 text-xs md:text-sm font-medium mt-1">
            Formato de vídeo e slides interativos para sensibilização estratégica, métricas e mitigação de estresses territoriais.
          </p>
        </div>

        {/* Narrative Speak Prompt */}
        <button
          onClick={toggleVoice}
          className={`px-4 py-2 rounded-xl border font-bold text-xs flex items-center space-x-2 cursor-pointer transition-all ${
            voiceOverEnabled 
              ? 'bg-emerald-600 text-white border-emerald-500' 
              : 'bg-gray-100 dark:bg-zinc-850 text-gray-500 border-gray-200'
          }`}
          title="Alternar áudio da narração da apresentação (Voz Sintética)"
        >
          {voiceOverEnabled ? <Volume2 className="h-4.5 w-4.5" /> : <VolumeX className="h-4.5 w-4.5" />}
          <span>{voiceOverEnabled ? 'Narração Ativa (Voz)' : 'Sem Áudio'}</span>
        </button>
      </div>

      {/* Cinematic Screen View */}
      <div className="bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border-4 border-[#1b4332]/40 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[440px] md:min-h-[480px]">
          
          {/* Visual Presentation Canvas side (Simulated Video) */}
          <div className="lg:col-span-7 bg-[#0b241a] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-emerald-950/40">
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full filter blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full filter blur-3xl pointer-events-none" />

            {/* Slide Header Indicator */}
            <div className="flex items-center justify-between relative z-10">
              <span className="bg-emerald-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
                {currentSlideData.badge}
              </span>
              <span className="text-emerald-400 font-mono text-xs font-bold">
                SLIDE {currentSlide + 1} DE {slides.length}
              </span>
            </div>

            {/* Main Title Center */}
            <div className="my-8 relative z-10 space-y-4">
              <h3 className="text-white font-sans font-bold text-2.5xl md:text-3.5xl leading-tight tracking-tight">
                {currentSlideData.title}
              </h3>
              <p className="text-emerald-100/90 text-xs md:text-sm font-medium leading-relaxed italic border-l-2 border-orange-500 pl-4">
                {currentSlideData.subtitle}
              </p>
            </div>

            {/* Decorative Conceptual Graphics depending on Visual Type */}
            <div className="h-16 relative z-10 flex items-center">
              {currentSlideData.visualType === 'cover' && (
                <div className="flex items-center space-x-2 text-orange-400 font-bold text-[11px] uppercase tracking-wider">
                  <Sparkles className="h-5 w-5 animate-spin" />
                  <span>ArcelorMittal Tubarão • ESG Compliance</span>
                </div>
              )}
              {currentSlideData.visualType === 'problem' && (
                <div className="flex items-center space-x-4">
                  <div className="h-1 text-red-500/40 w-24 bg-red-800 rounded">
                    <div className="h-full bg-red-400 animate-pulse" style={{width: '80%'}} />
                  </div>
                  <span className="text-red-400 font-mono text-[10px] font-extrabold">Zona de Atrito Socioambiental</span>
                </div>
              )}
              {currentSlideData.visualType === 'how-works' && (
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-emerald-400 font-mono text-[10px]">RECEPÇÃO MULTICANAL E TERMOGRAFIA ATIVA</span>
                </div>
              )}
              {currentSlideData.visualType === 'solutions' && (
                <div className="flex items-center space-x-3 bg-slate-900/40 border border-emerald-900/50 p-2.5 rounded-xl">
                  <TrendingUp className="h-4 w-4 text-orange-400" />
                  <span className="text-slate-300 text-[10.5px] font-medium font-mono">Retorno de Investimento Comunitário (+38%)</span>
                </div>
              )}
              {currentSlideData.visualType === 'esg-impact' && (
                <div className="flex space-x-1.5">
                  <span className="px-2 py-0.5 bg-sky-950 border border-sky-850 rounded text-sky-400 font-mono text-[9px] font-bold">GRI COMPLIANT</span>
                  <span className="px-2 py-0.5 bg-yellow-950 border border-yellow-850 rounded text-yellow-400 font-mono text-[9px] font-bold">UN COMPACT S17</span>
                </div>
              )}
              {currentSlideData.visualType === 'closure' && (
                <div className="flex items-center space-x-1.5 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
                  <ShieldCheck className="h-4.5 w-4.5 text-emerald-400" />
                  <span>Governança Integrada Pronta para Uso</span>
                </div>
              )}
            </div>

            {/* Video-Style Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-800">
              <div 
                className="h-full bg-orange-500 transition-all duration-75" 
                style={{ width: isPlaying ? `${progress}%` : `${((currentSlide + 1) / slides.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Video Voice Over Narration Side (Translates to executive details) */}
          <div className="lg:col-span-5 bg-slate-900 p-8 flex flex-col justify-between text-left space-y-6">
            <div className="space-y-4">
              <h4 className="text-gray-400 font-bold font-mono text-[10px] tracking-widest uppercase">
                DETALHES DO DIRETORIO / PONTO CHAVE DA APRESENTAÇÃO
              </h4>
              
              {/* Talking points structured neatly */}
              <ul className="space-y-3.5">
                {currentSlideData.talkingPoints.map((point, index) => (
                  <li key={index} className="flex items-start space-x-2.5 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span className="text-xs font-normal leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Interactive Transcript Player subtitle block */}
            <div className="bg-[#1b4332]/10 border border-[#1b4332]/25 p-4 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold font-mono text-emerald-400 uppercase tracking-widest">
                  Transcrição do Narrador
                </span>
                <span className="text-[9px] bg-[#1b4332]/25 px-2 py-0.5 rounded text-emerald-300 font-mono">
                  Áudio pt-BR
                </span>
              </div>
              <p className="text-[11.5px] text-slate-300 leading-relaxed italic block max-h-36 overflow-y-auto custom-scrollbar">
                &ldquo;{currentSlideData.narrativeText}&rdquo;
              </p>
            </div>
            
          </div>
        </div>

        {/* Video Control Bar Banner */}
        <div className="bg-slate-900 px-6 py-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Main Controls - Play / Pause */}
          <div className="flex items-center space-x-4">
            <button
              onClick={togglePlay}
              className={`p-3.5 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center ${
                isPlaying 
                  ? 'bg-rose-600 text-white hover:bg-rose-750' 
                  : 'bg-emerald-600 text-slate-950 font-bold hover:bg-emerald-700 hover:text-white'
              }`}
              title={isPlaying ? "Pausar reprodução do vídeo" : "Iniciar reprodução (Autoplay com Voz)"}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-current" />}
            </button>

            <div>
              <span className="text-white text-xs font-bold block">
                {isPlaying ? "REPRODUZINDO VÍDEO" : "APRESENTAÇÃO PAUSADA"}
              </span>
              <span className="text-gray-400 text-[10.5px] block font-mono">
                {isPlaying ? 'Avanço Automático Ativo (28s por Tela)' : 'Clique em play para assistir com narração automatizada'}
              </span>
            </div>
          </div>

          {/* Navigation Dots for fast swapping */}
          <div className="flex items-center space-x-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => selectSlide(idx)}
                className={`w-7.5 h-2.5 transition-all rounded-full cursor-pointer ${
                  idx === currentSlide 
                    ? 'bg-emerald-500 scale-x-110' 
                    : 'bg-slate-700 hover:bg-slate-600'
                }`}
                title={`Ir para o Slide ${idx + 1}`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Manual step back and forth */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevSlide}
              className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-gray-200 hover:text-white rounded-xl transition-all cursor-pointer"
              title="Slide Anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              onClick={handleNextSlide}
              className="p-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-gray-200 hover:text-white rounded-xl transition-all cursor-pointer"
              title="Próximo Slide"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

        </div>
      </div>

      {/* ArcelorMittal Leadership Summary Context Card */}
      <div className="mt-10 bg-white dark:bg-zinc-900 border border-[#e9ecef] dark:border-zinc-800 rounded-3xl p-6.5 shadow-md grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-start space-x-3.5">
          <div className="bg-[#1b4332]/10 p-3 rounded-2.5xl text-[#1b4332] dark:text-emerald-400 shrink-0">
            <Target className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#1b4332] dark:text-white mb-1 uppercase tracking-tight">Mitigação de Impacto</h4>
            <p className="text-gray-500 dark:text-zinc-400 text-xs leading-relaxed">
              Recebimento seguro de dados comunitários legítimos sobre particulado (pó preto), ruído noturno das transportadoras de minério e efluentes.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3.5">
          <div className="bg-[#1b4332]/10 p-3 rounded-2.5xl text-[#1b4332] dark:text-emerald-400 shrink-0">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#1b4332] dark:text-white mb-1 uppercase tracking-tight">Licença de Operação</h4>
            <p className="text-gray-500 dark:text-zinc-400 text-xs leading-relaxed">
              Consolidação de uma cultura de transparência territorial radical que assegura conformidade diante de órgãos de fiscalização municipais e estaduais.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3.5">
          <div className="bg-[#1b4332]/10 p-3 rounded-2.5xl text-[#1b4332] dark:text-emerald-400 shrink-0">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-[#1b4332] dark:text-white mb-1 uppercase tracking-tight">Governança GRI/Compliance</h4>
            <p className="text-gray-500 dark:text-zinc-400 text-xs leading-relaxed">
              Resultados brutos quantificados alimentando diretamente o relatório anual integrado da ArcelorMittal sob a ótica das diretrizes internacionais ESG.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
