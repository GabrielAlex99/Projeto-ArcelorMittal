import React, { useState } from 'react';
import { Relato, Category } from '../types';
import { Send, CheckCircle, Shield, AlertTriangle, User, MapPin, Link2 } from 'lucide-react';

interface ReportFormProps {
  onAddRelato: (novo: Relato) => void;
}

export default function ReportForm({ onAddRelato }: ReportFormProps) {
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [nome, setNome] = useState('');
  const [bairro, setBairro] = useState('');
  const [categoria, setCategoria] = useState<Category>('Ar');
  const [problema, setProblema] = useState('');
  const [frequencia, setFrequencia] = useState('Diária');
  const [gravidade, setGravidade] = useState<'Baixa' | 'Média' | 'Alta' | 'Crítica'>('Alta');
  const [descricao, setDescricao] = useState('');
  const [evidenciaLink, setEvidenciaLink] = useState('');
  const [lgpdConsent, setLgpdConsent] = useState(false);
  
  const [submitted, setSubmitted] = useState(false);
  const [errorMess, setErrorMess] = useState('');

  const bairrosSugeridos = [
    'Jesuítas (Santa Cruz - RJ)',
    'Vila Parisi (Cubatão - SP)',
    'Santa Cruz dos Navegantes (Guarujá - SP)',
    'Bairro Veneza (Ipatinga - MG)',
    'Zona Residencial (Candiota - RS)'
  ];

  const categoriesChoices: { value: Category; label: string }[] = [
    { value: 'Ar', label: 'Poluição do ar / Fumaça' },
    { value: 'Água', label: 'Contaminação da água / Esgoto' },
    { value: 'Ruído', label: 'Ruído excessivo / Sons industriais' },
    { value: 'Resíduos', label: 'Descarte irregular / Lixo' },
    { value: 'Mobilidade', label: 'Tráfego de caminhões / Ônibus' },
    { value: 'Verde urbano', label: 'Falta de áreas verdes / Ilhas de calor' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // LGPD Validation
    if (!lgpdConsent) {
      setErrorMess('De acordo com a LGPD, você deve aceitar os termos de consentimento para envio de dados socioambientais e/ou pessoais.');
      return;
    }

    // Basic Validation
    if (!bairro.trim()) {
      setErrorMess('Por favor, informe o bairro ou região.');
      return;
    }
    if (!problema.trim()) {
      setErrorMess('Por favor, defina em uma linha qual é o problema principal.');
      return;
    }
    if (!descricao.trim() || descricao.length < 15) {
      setErrorMess('Por favor, descreva em detalhes o problema (mínimo de 15 caracteres).');
      return;
    }

    setErrorMess('');

    // Generate random coordinate for the new point on map relative to neighborhood
    let mapX = 20 + Math.floor(Math.random() * 60);
    let mapY = 20 + Math.floor(Math.random() * 60);

    // Fine-tune map coordinate placement according to selected predefined neighborhoods
    if (bairro.includes('Jesuítas')) { mapX = 28 + Math.random() * 6; mapY = 44 + Math.random() * 6; }
    else if (bairro.includes('Vila Parisi')) { mapX = 44 + Math.random() * 6; mapY = 36 + Math.random() * 6; }
    else if (bairro.includes('Navegantes')) { mapX = 67 + Math.random() * 6; mapY = 72 + Math.random() * 4; }
    else if (bairro.includes('Veneza')) { mapX = 21 + Math.random() * 4; mapY = 76 + Math.random() * 4; }
    else if (bairro.includes('Candiota')) { mapX = 52 + Math.random() * 6; mapY = 18 + Math.random() * 6; }

    const novoRelato: Relato = {
      id: String(Date.now()),
      bairro,
      problema,
      descricao,
      gravidade,
      categoria,
      frequência: frequencia,
      autor: isAnonymous ? 'Relato Anônimo' : nome || 'Morador Identificado',
      data: new Date().toISOString().split('T')[0],
      coordenadas: { x: Math.round(mapX), y: Math.round(mapY) },
      vulnerabilidade: Math.random() > 0.4 ? 'Alta' : 'Média',
      numRelatos: 1
    };

    onAddRelato(novoRelato);
    setSubmitted(true);
  };

  const handleReset = () => {
    setBairro('');
    setProblema('');
    setDescricao('');
    setEvidenciaLink('');
    setNome('');
    setIsAnonymous(true);
    setLgpdConsent(false);
    setSubmitted(false);
  };

  return (
    <section id="relatar" className="py-20 bg-white border-t border-[#e9ecef] relative">
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#1b4332]/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section info */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-[#f28f3b] tracking-wider uppercase block mb-2">Canal Direto da Comunidade</span>
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-[#1b4332] tracking-tight">
            Registrar Relato de Ocorrência
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto mt-2">
            Identificou poeira excessiva, alagamento, barulho incomum ou resíduos industriais? Expresse sua queixa. Seu relato ajudará a guiar decisões de prioridade ESG.
          </p>
        </div>

        {/* Form panel container */}
        <div className="bg-[#f5f7f6] border border-[#e9ecef] rounded-3xl p-6 md:p-10 shadow-lg relative">
          
          {submitted ? (
            /* Animated success window */
            <div className="py-12 px-4 text-center space-y-6 animate-fade-in text-left">
              <div className="w-16 h-16 bg-[#1b4332]/10 text-[#1b4332] rounded-full border border-[#1b4332]/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10" />
              </div>
              <h3 className="font-sans font-bold text-2.5xl text-[#1b4332]">Relato enviado com sucesso!</h3>
              <p className="text-gray-600 text-base max-w-lg mx-auto leading-relaxed">
                Sua contribuição ajuda a construir soluções mais justas e sustentáveis. O relato foi plotado de forma interativa no <strong className="text-[#1b4332]">Mapa de Impactos</strong> e incorporado à prioridade estatística no Painel ESG.
              </p>
              
              <div className="pt-6">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-[#1b4332] text-white font-bold rounded-xl text-sm transition-all hover:bg-[#133024]"
                >
                  Registrar outro relato
                </button>
              </div>
            </div>
          ) : (
            /* Real form layout */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Alert prompt about privacy */}
              <div className="bg-white border border-[#e9ecef] rounded-2xl p-4 flex items-start space-x-3 text-left shadow-xs">
                <Shield className="h-5 w-5 text-[#f28f3b] shrink-0 mt-0.5" />
                <div className="text-xs text-gray-600 space-y-1">
                  <strong className="text-[#1b4332] block font-semibold">Garantia de Confidencialidade</strong>
                  Você escolhe se quer se identificar ou enviar um relato <strong>100% anônimo</strong>. Seus dados cadastrais não são compartilhados com corporações parceiras de forma externa.
                </div>
              </div>

              {errorMess && (
                <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl text-xs text-rose-700 flex items-center space-x-2 text-left">
                  <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0" />
                  <span>{errorMess}</span>
                </div>
              )}

              {/* Autonomy switch */}
              <div className="space-y-3 text-left">
                <label className="text-xs font-bold text-[#1b4332] uppercase tracking-wider block" id="id-tipo-identificacao">Tipo de Identificação</label>
                <div className="grid grid-cols-2 gap-4" role="group" aria-labelledby="id-tipo-identificacao">
                  <button
                    type="button"
                    onClick={() => { setIsAnonymous(true); setNome(''); }}
                    aria-pressed={isAnonymous}
                    className={`p-3 rounded-xl border flex items-center justify-center space-x-2 transition-all ${
                      isAnonymous
                        ? 'bg-[#0b3d59] border-[#0b3d59] text-white font-semibold'
                        : 'bg-white border-[#e9ecef] text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <Shield className="h-4 w-4" aria-hidden="true" />
                    <span>Relato Anônimo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsAnonymous(false)}
                    aria-pressed={!isAnonymous}
                    className={`p-3 rounded-xl border flex items-center justify-center space-x-2 transition-all ${
                      !isAnonymous
                        ? 'bg-[#0b3d59] border-[#0b3d59] text-white font-semibold'
                        : 'bg-white border-[#e9ecef] text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <User className="h-4 w-4" aria-hidden="true" />
                    <span>Identificar-me</span>
                  </button>
                </div>
              </div>

              {/* Conditional Name Field */}
              {!isAnonymous && (
                <div className="space-y-1.5 text-left animate-fade-in">
                  <label htmlFor="input-nome" className="text-xs font-bold text-gray-600 uppercase block">Seu Nome Completo *</label>
                  <input
                    id="input-nome"
                    type="text"
                    required
                    aria-required="true"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Ex: João da Silva Santos"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#e9ecef] text-gray-800 placeholder-gray-400 focus:outline-hidden focus:border-[#1b4332] text-sm transition-colors shadow-xs"
                  />
                </div>
              )}

              {/* Neighborhood and category grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                
                {/* Bairro Region with autocomplete suggestions */}
                <div className="space-y-1.5">
                  <label htmlFor="select-bairro" className="text-xs font-bold text-gray-600 uppercase block flex justify-between">
                    <span>Bairro / Região *</span>
                    <span className="text-[10px] text-[#f28f3b] font-normal lowercase">(vizinhos mapeados)</span>
                  </label>
                  <div className="relative">
                    <select
                      id="select-bairro"
                      value={bairro}
                      required
                      aria-required="true"
                      onChange={(e) => setBairro(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#e9ecef] text-gray-800 focus:outline-hidden focus:border-[#1b4332] text-sm transition-colors appearance-none shadow-xs"
                    >
                      <option value="">Selecione a região...</option>
                      {bairrosSugeridos.map(b => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                    <MapPin className="absolute right-3.5 top-3.5 h-4 w-4 text-[#1b4332] pointer-events-none" aria-hidden="true" />
                  </div>
                </div>

                {/* Category chooser */}
                <div className="space-y-1.5">
                  <label htmlFor="select-categoria" className="text-xs font-bold text-gray-600 uppercase block">Categoria do Problema *</label>
                  <select
                    id="select-categoria"
                    value={categoria}
                    required
                    aria-required="true"
                    onChange={(e) => setCategoria(e.target.value as Category)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#e9ecef] text-[#0b3d59] focus:outline-hidden focus:border-[#1b4332] text-sm transition-colors shadow-xs font-medium"
                  >
                    {categoriesChoices.map(c => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Title & Frequency details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                
                {/* Problem Title */}
                <div className="md:col-span-2 space-y-1.5">
                  <label htmlFor="input-problema" className="text-xs font-bold text-gray-600 uppercase block">O que está acontecendo? (Resumo) *</label>
                  <input
                    id="input-problema"
                    type="text"
                    required
                    aria-required="true"
                    value={problema}
                    onChange={(e) => setProblema(e.target.value)}
                    placeholder="Ex: Fumaça de minério excessiva pela manhã"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#e9ecef] text-gray-800 placeholder-gray-400 focus:outline-hidden focus:border-[#1b4332] text-sm transition-colors shadow-xs"
                  />
                </div>

                {/* Frequency */}
                <div className="space-y-1.5">
                  <label htmlFor="select-frequencia" className="text-xs font-bold text-gray-600 uppercase block">Frequência *</label>
                  <select
                    id="select-frequencia"
                    value={frequencia}
                    required
                    aria-required="true"
                    onChange={(e) => setFrequencia(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#e9ecef] text-gray-800 focus:outline-hidden focus:border-[#1b4332] text-sm transition-colors shadow-xs font-medium"
                  >
                    <option value="Diária">Diária (Todo dia)</option>
                    <option value="Intermitente (noturno)">Durante a noite</option>
                    <option value="Sempre que chove forte">Sempre que chove</option>
                    <option value="Finais de semana">Finais de semana</option>
                    <option value="Eventual">Ocasional / Eventual</option>
                  </select>
                </div>

              </div>

              {/* Gravity selector */}
              <div className="text-left space-y-2">
                <label className="text-xs font-bold text-gray-600 uppercase block">Nível de Gravidade Estimado</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(['Baixa', 'Média', 'Alta', 'Crítica'] as const).map((g) => {
                    const isActive = gravidade === g;
                    const styleColors = {
                      Baixa: 'bg-white text-[#1b4332] border-[#e9ecef] hover:bg-gray-50',
                      Média: 'bg-white text-yellow-605 border-[#e9ecef] hover:bg-gray-50',
                      Alta: 'bg-white text-[#f28f3b] border-[#e9ecef] hover:bg-gray-50',
                      Crítica: 'bg-white text-rose-600 border-[#e9ecef] hover:bg-gray-50'
                    };
                    const activeColors = {
                      Baixa: 'bg-[#1b4332]/10 border-[#1b4332] text-[#1b4332] font-bold',
                      Média: 'bg-yellow-500/10 border-yellow-500 text-yellow-600 font-bold',
                      Alta: 'bg-[#f28f3b]/10 border-[#f28f3b] text-[#f28f3b] font-bold',
                      Crítica: 'bg-rose-500/10 border-rose-500 text-rose-600 font-bold'
                    };

                    return (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGravidade(g)}
                        aria-pressed={isActive}
                        className={`py-2 px-3 border rounded-xl text-xs transition-colors shadow-xs ${
                          isActive ? activeColors[g] : styleColors[g]
                        }`}
                      >
                        {g}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Detailed Description */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="textarea-desc" className="text-xs font-bold text-gray-600 uppercase block">Descrição Detalhada do Problema *</label>
                <textarea
                  id="textarea-desc"
                  rows={4}
                  required
                  aria-required="true"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Por favor, dê detalhes do impacto ambiental na vizinhança. Como isso atrapalha a sua saúde, seu sono e sua rotina? Se for um incômodo periódico, especifique os horários..."
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#e9ecef] text-gray-800 placeholder-gray-400 focus:outline-hidden focus:border-[#1b4332] text-sm transition-colors resize-none leading-relaxed shadow-xs"
                />
              </div>

              {/* Image Evidence Link (Fake placeholder link) */}
              <div className="space-y-1.5 text-left">
                <label htmlFor="input-url" className="text-xs font-bold text-gray-600 uppercase block flex items-center justify-between">
                  <span>Link de Imagem / Evidência (Opcional)</span>
                  <span className="text-[10px] text-gray-500 lowercase">(ex: Google Drive, Dropbox)</span>
                </label>
                <div className="relative">
                  <input
                    id="input-url"
                    type="url"
                    value={evidenciaLink}
                    onChange={(e) => setEvidenciaLink(e.target.value)}
                    placeholder="https://drive.google.com/sua-imagem..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#e9ecef] text-gray-800 placeholder-gray-400 focus:outline-hidden focus:border-[#1b4332] text-sm transition-colors shadow-xs"
                  />
                  <Link2 className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-[#1b4332]" aria-hidden="true" />
                </div>
              </div>

              {/* LGPD Clause */}
              <div className="bg-[#1b4332]/5 border border-[#1b4332]/10 rounded-2xl p-4.5 text-left text-xs text-gray-650 space-y-3 shadow-xs">
                <div className="flex items-start space-x-2.5">
                  <input
                    id="checkbox-lgpd-relato"
                    type="checkbox"
                    checked={lgpdConsent}
                    onChange={(e) => setLgpdConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-[#1b4332] focus:ring-[#1b4332]"
                  />
                  <label htmlFor="checkbox-lgpd-relato" className="leading-relaxed select-none cursor-pointer text-gray-700">
                    <strong className="text-[#1b4332] font-semibold">Consentimento LGPD:</strong> Estou ciente e concordo com o tratamento dos dados informados neste relato (incluindo localização geográfica, queixas de impacto e meu nome caso tenha optado por me identificar) em estrita conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/18). Os dados serão utilizados exclusivamente de forma coletiva, transparente e estatística para guiar painéis de priorização socioambiental.
                  </label>
                </div>
              </div>

              {/* Submit button wrapper */}
              <div className="pt-4 border-t border-gray-150 text-right">
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#0b3d59] hover:bg-[#072a42] text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center space-x-2 inline-flex"
                >
                  <Send className="h-4 w-4" />
                  <span>Enviar Relato Comunitário</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
