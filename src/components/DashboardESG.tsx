import React from 'react';
import { Relato, Proposta, PlataformaUser } from '../types';
import { Activity, ShieldAlert, Award, TrendingUp, Users, CheckCircle, Download, Lock, Bot, Sparkles } from 'lucide-react';
import { jsPDF } from 'jspdf';

interface DashboardESGProps {
  relatos: Relato[];
  propostas: Proposta[];
  currentUser?: PlataformaUser | null;
}

export default function DashboardESG({ relatos, propostas, currentUser }: DashboardESGProps) {
  // Let's compute statistics dynamically based on our state + base numbers
  const baseRelatosCount = 123; // base academic count
  const totalRelatos = baseRelatosCount + relatos.reduce((acc, r) => acc + (r.numRelatos === 1 ? 1 : 0), 0);
  
  const baseCriCount = 22;
  const totalCriticos = baseCriCount + relatos.filter(r => r.gravidade === 'Crítica').length;

  const basePropCount = 35;
  const totalPropostas = basePropCount + propostas.length;

  const acoesEmAndamento = 12;
  const comunidadesImpactadas = 9;

  // Sentiment analytics calculations
  const totalWithSentiment = relatos.length;
  const countCriticosSentiment = relatos.filter(r => r.sentimento === 'crítico' || !r.sentimento).length;
  const countNeutrosSentiment = relatos.filter(r => r.sentimento === 'neutro').length;
  const countPositivosSentiment = relatos.filter(r => r.sentimento === 'positivo').length;

  const pctCriticos = totalWithSentiment > 0 ? Math.round((countCriticosSentiment / totalWithSentiment) * 100) : 80;
  const pctNeutros = totalWithSentiment > 0 ? Math.round((countNeutrosSentiment / totalWithSentiment) * 100) : 20;
  const pctPositivos = totalWithSentiment > 0 ? Math.round((countPositivosSentiment / totalWithSentiment) * 100) : 0;

  // Percentage estimations for Kategoris
  const categoriasDistrib = [
    { label: 'Ar', pct: 35, color: 'bg-teal-400' },
    { label: 'Água', pct: 20, color: 'bg-blue-400' },
    { label: 'Ruído', pct: 15, color: 'bg-yellow-400' },
    { label: 'Resíduos', pct: 10, color: 'bg-orange-400' },
    { label: 'Mobilidade', pct: 12, color: 'bg-purple-400' },
    { label: 'Verde urbano', pct: 8, color: 'bg-emerald-400' }
  ];

  const gravidadeDistrib = [
    { label: 'Crítica', pct: 20, color: 'bg-rose-500' },
    { label: 'Alta', pct: 30, color: 'bg-amber-500' },
    { label: 'Média', pct: 35, color: 'bg-yellow-400' },
    { label: 'Baixa', pct: 15, color: 'bg-emerald-400' }
  ];

  const statusAcoes = [
    { label: 'Em análise', pct: 40, count: 15, color: 'bg-slate-400' },
    { label: 'Planejada', pct: 25, count: 9, color: 'bg-indigo-400' },
    { label: 'Em execução', pct: 20, count: 8, color: 'bg-yellow-500' },
    { label: 'Concluída', pct: 15, count: 5, color: 'bg-emerald-400' }
  ];

  const handleExportRankingPDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const addPageFooter = (documentObj: typeof doc, pageNum: number) => {
      documentObj.setFont('helvetica', 'normal');
      documentObj.setFontSize(6.5);
      documentObj.setTextColor(150, 155, 150);
      documentObj.text(
        'Conselho de Governança ESG e Relações Comunitárias. Este relatório possui validade interna para fins de auditoria socioambiental.',
        15,
        287
      );
      documentObj.text(`Página ${pageNum}`, 195, 287, { align: 'right' });
    };

    // ----- PAGE 1 -----
    // Top banner
    doc.setFillColor(27, 67, 50);
    doc.rect(0, 0, 210, 36, 'F');

    // Title text inside banner
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('PRESERVAÇÃO & COMPLIANCE SOCIOAMBIENTAL', 15, 14);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(190, 215, 200);
    doc.text('Relatório Consolidado de Metodologias ESG, Relatos de Impacto e Propostas', 15, 20);
    doc.text(`Data de Emissão: ${new Date().toLocaleString('pt-BR')}`, 15, 25);

    if (currentUser) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(242, 143, 59); // orange accent
      doc.text(`Solicitante Credenciado: ${currentUser.name} (${currentUser.email})`, 15, 31);
    } else {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8.5);
      doc.setTextColor(220, 220, 220);
      doc.text('Acesso de Consulta Livre (Não Autenticado)', 15, 31);
    }

    // Document Title Section
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(27, 67, 50);
    doc.text('1. Diagnóstico e Métricas de Impacto ESG', 15, 48);

    // Decorative underline separator
    doc.setDrawColor(27, 67, 50);
    doc.setLineWidth(0.5);
    doc.line(15, 51, 195, 51);

    // Description text block
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(80, 85, 80);
    const introText = 'Este relatório consolidado apresenta o diagnóstico de integridade ética, responsabilidade corporativa e direitos humanos no entorno industrial. Os dados mostram a estatística das queixas comunitárias, ponderadas de acordo com a vulnerabilidade territorial dos bairros próximos e a intensidade do sentimento interpretado cognitivamente.';
    const splitText = doc.splitTextToSize(introText, 180);
    doc.text(splitText, 15, 56);

    // Dynamic stats summary cards in PDF
    doc.setFillColor(245, 247, 246);
    doc.rect(15, 68, 180, 16, 'F');
    doc.setDrawColor(220, 225, 220);
    doc.setLineWidth(0.2);
    doc.rect(15, 68, 180, 16, 'D');

    // Stats Labels inside card
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 105, 100);
    doc.text('TOTAL RELATOS', 20, 73);
    doc.text('CONFLITOS CRÍTICOS', 65, 73);
    doc.text('PROPOSTAS ATIVAS', 120, 73);
    doc.text('SENTIMENTO CRÍTICO', 158, 73);

    doc.setFontSize(10.5);
    doc.setTextColor(27, 67, 50);
    doc.text(`${totalRelatos}`, 20, 79);
    doc.setTextColor(220, 53, 69); // Rose color for critical
    doc.text(`${totalCriticos}`, 65, 79);
    doc.setTextColor(27, 67, 50);
    doc.text(`${totalPropostas}`, 120, 79);
    doc.setTextColor(220, 53, 69);
    doc.text(`${pctCriticos}%`, 158, 79);

    // Table Section 2: Relatos Recebidos
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(27, 67, 50);
    doc.text('2. Relatos Ativos Registrados pelos Cidadãos', 15, 94);
    doc.setDrawColor(27, 67, 50);
    doc.setLineWidth(0.5);
    doc.line(15, 97, 195, 97);

    // Table Header
    let currentY = 102;
    doc.setFillColor(27, 67, 50);
    doc.rect(15, currentY, 180, 8, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text('Região / Bairro', 17, currentY + 5.5);
    doc.text('Problema Detalhado', 60, currentY + 5.5);
    doc.text('Gravidade', 120, currentY + 5.5);
    doc.text('Sentimento (IA)', 142, currentY + 5.5);
    doc.text('Data', 175, currentY + 5.5);

    currentY += 8;
    const relatoList = [...relatos];

    relatoList.forEach((r, idx) => {
      // Row Background alternating colors
      if (idx % 2 === 0) {
        doc.setFillColor(249, 250, 249);
        doc.rect(15, currentY, 180, 11, 'F');
      }

      // Draw horizontal divider bottom line
      doc.setDrawColor(230, 235, 230);
      doc.setLineWidth(0.15);
      doc.line(15, currentY + 11, 195, currentY + 11);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(40, 45, 40);

      // Bairro
      doc.setFont('helvetica', 'bold');
      const wrappedBairro = doc.splitTextToSize(r.bairro, 42);
      doc.text(wrappedBairro, 17, currentY + 5);
      
      // Problema
      doc.setFont('helvetica', 'normal');
      const probText = r.problema.length > 50 ? r.problema.substring(0, 47) + '...' : r.problema;
      const wrappedDesc = doc.splitTextToSize(probText, 57);
      doc.text(wrappedDesc, 60, currentY + 5);

      // Gravidade
      doc.setFont('helvetica', 'bold');
      if (r.gravidade === 'Crítica' || r.gravidade === 'Alta') {
        doc.setTextColor(220, 53, 69);
      } else {
        doc.setTextColor(242, 143, 59);
      }
      doc.text(r.gravidade, 120, currentY + 6);

      // Sentimento (IA)
      const sent = r.sentimento || 'crítico';
      if (sent === 'crítico') {
        doc.setTextColor(220, 53, 69);
        doc.text('CRÍTICO', 142, currentY + 6);
      } else if (sent === 'positivo') {
        doc.setTextColor(27, 67, 50);
        doc.text('POSITIVO', 142, currentY + 6);
      } else {
        doc.setTextColor(110, 115, 110);
        doc.text('NEUTRO', 142, currentY + 6);
      }

      // Data
      doc.setTextColor(80, 85, 80);
      doc.setFont('helvetica', 'normal');
      doc.text(r.data, 175, currentY + 6);

      currentY += 11;
    });

    addPageFooter(doc, 1);

    // ----- PAGE 2: PROPOSTAS -----
    doc.addPage();
    
    // Top banner Page 2
    doc.setFillColor(27, 67, 50);
    doc.rect(0, 0, 210, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('COMPLIANCE ESG: PORTFÓLIO DE PROPOSTAS E INTERVENÇÕES CO-CRIADAS', 15, 12);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(27, 67, 50);
    doc.text('3. Propostas Socioambientais Ativas para Mitigação', 15, 32);
    doc.setDrawColor(27, 67, 50);
    doc.setLineWidth(0.5);
    doc.line(15, 35, 195, 35);

    let propY = 40;
    doc.setFillColor(27, 67, 50);
    doc.rect(15, propY, 180, 8, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text('Título da Proposta', 17, propY + 5.5);
    doc.text('Tema Relacionado', 75, propY + 5.5);
    doc.text('Viabilidade', 125, propY + 5.5);
    doc.text('Aprox. Custo', 150, propY + 5.5);
    doc.text('Prazo', 172, propY + 5.5);

    propY += 8;
    const propList = [...propostas];

    if (propList.length === 0) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(120, 120, 120);
      doc.text('Nenhuma proposta de mitigação foi submetida até o momento.', 17, propY + 8);
    } else {
      propList.forEach((p, idx) => {
        // Prevent page overflow
        if (propY > 260) {
          addPageFooter(doc, 2);
          doc.addPage();
          propY = 20;

          doc.setFillColor(27, 67, 50);
          doc.rect(15, propY, 180, 8, 'F');
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8);
          doc.setTextColor(255, 255, 255);
          doc.text('Título da Proposta', 17, propY + 5.5);
          doc.text('Tema Relacionado', 75, propY + 5.5);
          doc.text('Viabilidade', 125, propY + 5.5);
          doc.text('Aprox. Custo', 150, propY + 5.5);
          doc.text('Prazo', 172, propY + 5.5);
          propY += 8;
        }

        if (idx % 2 === 0) {
          doc.setFillColor(249, 250, 249);
          doc.rect(15, propY, 180, 12, 'F');
        }

        doc.setDrawColor(230, 235, 230);
        doc.setLineWidth(0.15);
        doc.line(15, propY + 12, 195, propY + 12);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(27, 67, 50);
        const wrappedTitle = doc.splitTextToSize(p.titulo, 55);
        doc.text(wrappedTitle, 17, propY + 5);

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(60, 65, 60);
        const wrappedTema = doc.splitTextToSize(p.problemaRelacionado, 46);
        doc.text(wrappedTema, 75, propY + 5);

        doc.setFont('helvetica', 'bold');
        if (p.viabilidade === 'Alta') {
          doc.setTextColor(27, 67, 50);
        } else if (p.viabilidade === 'Média') {
          doc.setTextColor(242, 143, 59);
        } else {
          doc.setTextColor(220, 53, 69);
        }
        doc.text(p.viabilidade, 125, propY + 7);

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(60, 65, 60);
        doc.text(p.custo, 150, propY + 7);
        doc.text(p.prazo, 172, propY + 7);

        propY += 12;
      });
    }

    addPageFooter(doc, 2);

    // Save
    doc.save('relatorio-consolidado-esg.pdf');
  };

  return (
    <section id="dashboard" className="py-20 bg-[#f5f7f6] border-t border-[#e9ecef] text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Header */}
        <div className="mb-12">
          <span className="text-xs font-bold text-[#f28f3b] tracking-wider uppercase block mb-1">Métricas ESG Avançadas</span>
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-[#1b4332] tracking-tight">
            Dashboard ESG e Justiça Ambiental
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mt-1">
            Transparência e dados estatísticos consolidados. Avaliamos a severidade das queixas territoriais cruzada à vulnerabilidade socioeconômica para orientar o investimento social corporativo.
          </p>
        </div>

        {/* Core numbers - 5 columns or cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mb-12">
          
          {/* Total Reports */}
          <div className="bg-white border border-[#e9ecef] rounded-2.5xl p-5 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 text-[#1b4332]/15">
              <Activity className="h-12 w-12" />
            </div>
            <span className="text-gray-500 text-xs font-semibold block uppercase tracking-wider">Total de Relatos</span>
            <span className="text-3xl md:text-4xl font-sans font-extrabold text-[#1b4332] mt-2 block tracking-tight">
              {totalRelatos}
            </span>
            <span className="text-[10px] text-gray-500 mt-1 block font-medium">Canais unificados ativos</span>
          </div>

          {/* Critical Problems */}
          <div className="bg-white border border-[#e9ecef] rounded-2.5xl p-5 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 text-rose-500/15">
              <ShieldAlert className="h-12 w-12" />
            </div>
            <span className="text-gray-500 text-xs font-semibold block uppercase tracking-wider">Críticos / Alertas</span>
            <span className="text-3xl md:text-4xl font-sans font-extrabold text-rose-600 mt-2 block tracking-tight">
              {totalCriticos}
            </span>
            <span className="text-[10px] text-rose-700 mt-1 block font-medium">Prioridade máxima imediata</span>
          </div>

          {/* Solutions Proposed */}
          <div className="bg-white border border-[#e9ecef] rounded-2.5xl p-5 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 text-[#1b4332]/15">
              <Award className="h-12 w-12" />
            </div>
            <span className="text-gray-500 text-xs font-semibold block uppercase tracking-wider">Soluções Propostas</span>
            <span className="text-3xl md:text-4xl font-sans font-extrabold text-[#1b4332] mt-2 block tracking-tight">
              {totalPropostas}
            </span>
            <span className="text-[10px] text-[#0b3d59] mt-1 block font-medium">Ideias e cocriação social</span>
          </div>

          {/* Actions in progress */}
          <div className="bg-white border border-[#e9ecef] rounded-2.5xl p-5 shadow-xs relative overflow-hidden col-span-1">
            <div className="absolute top-0 right-0 p-3 text-yellow-550/15">
              <TrendingUp className="h-12 w-12 opacity-15" />
            </div>
            <span className="text-gray-500 text-xs font-semibold block uppercase tracking-wider">Ações em Curso</span>
            <span className="text-3xl md:text-4xl font-sans font-extrabold text-[#1b4332] mt-2 block tracking-tight">
              {acoesEmAndamento}
            </span>
            <span className="text-[10px] text-gray-550 mt-1 block font-medium">Sistemas ou obras operantes</span>
          </div>

          {/* Affected Communities */}
          <div className="bg-white border border-[#e9ecef] rounded-2.5xl p-5 shadow-xs relative overflow-hidden col-span-2 md:col-span-1">
            <div className="absolute top-0 right-0 p-3 text-indigo-950/15">
              <Users className="h-12 w-12" />
            </div>
            <span className="text-gray-500 text-xs font-semibold block uppercase tracking-wider">Comunidades</span>
            <span className="text-3xl md:text-4xl font-sans font-extrabold text-[#1b4332] mt-2 block tracking-tight">
              {comunidadesImpactadas}
            </span>
            <span className="text-[10px] text-[#1b4332] mt-1 block font-medium font-semibold">Bairros mapeados adjacentes</span>
          </div>

        </div>

        {/* Dynamic graphics sections using layout structures */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* Categoria Distribution chart */}
          <div className="bg-white border border-[#e9ecef] rounded-3xl p-6 shadow-md">
            <h3 className="font-sans font-bold text-lg text-[#1b4332] mb-6 flex items-center justify-between font-sans">
              <span>Problemas por Categoria</span>
              <span className="text-xs text-[#0b3d59] font-mono font-semibold">Consolidado Geral</span>
            </h3>
            
            <div className="space-y-4.5">
              {categoriasDistrib.map((c) => (
                <div key={c.label} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-650">{c.label}</span>
                    <span className="text-[#1b4332] font-bold">{c.pct}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#f5f7f6] rounded-full overflow-hidden border border-[#e9ecef]/40">
                    <div 
                      className={`h-full ${c.color} rounded-full transition-all duration-1000`} 
                      style={{ width: `${c.pct}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gravity Chart */}
          <div className="bg-white border border-[#e9ecef] rounded-3xl p-6 shadow-md">
            <h3 className="font-sans font-bold text-lg text-[#1b4332] mb-6 flex items-center justify-between font-sans">
              <span>Nível de Gravidade Geral</span>
              <span className="text-xs text-rose-600 font-mono font-semibold">Sensibilidade Crítica</span>
            </h3>

            <div className="space-y-5.5 pt-1 font-sans">
              {gravidadeDistrib.map((g) => (
                <div key={g.label} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-650 font-semibold flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-2 ${g.color}`}></span>
                      {g.label}
                    </span>
                    <span className="text-[#1b4332] font-bold">{g.pct}%</span>
                  </div>
                  <div className="w-full h-3 bg-[#f5f7f6] rounded-full overflow-hidden border border-[#e9ecef]/40">
                    <div 
                      className={`h-full ${g.color} rounded-full transition-all duration-1000`}
                      style={{ width: `${g.pct}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Sentiment Analysis Card */}
          <div className="bg-white border border-[#e9ecef] rounded-3xl p-6 shadow-md">
            <h3 className="font-sans font-bold text-lg text-[#1b4332] mb-6 flex items-center justify-between font-sans">
              <span className="flex items-center gap-1.5 opacity-90">
                <Bot className="h-5 w-5 text-[#f28f3b]" />
                <span>Sentimentos (IA)</span>
              </span>
              <span className="text-[10px] text-[#f28f3b] font-mono font-bold px-2 py-0.5 bg-[#f28f3b]/10 rounded-full flex items-center gap-1 shrink-0">
                <Sparkles className="h-3 w-3 animate-pulse" />
                <span>Cognitivo</span>
              </span>
            </h3>

            <div className="space-y-4 pt-1 font-sans">
              {/* Critical sentiment */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-650 font-semibold flex items-center">
                    <span className="w-2 h-2 bg-rose-500 rounded-full mr-2"></span>
                    Críticos / Negativos
                  </span>
                  <span className="text-[#1b4332] font-bold">{pctCriticos}%</span>
                </div>
                <div className="w-full h-3 bg-[#f5f7f6] rounded-full overflow-hidden border border-[#e9ecef]/40">
                  <div 
                    className="h-full bg-rose-500 rounded-full transition-all duration-1000"
                    style={{ width: `${pctCriticos}%` }}
                  ></div>
                </div>
              </div>

              {/* Neutral sentiment */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-650 font-semibold flex items-center">
                    <span className="w-2 h-2 bg-slate-400 rounded-full mr-2"></span>
                    Neutros / Objetivos
                  </span>
                  <span className="text-[#1b4332] font-bold">{pctNeutros}%</span>
                </div>
                <div className="w-full h-3 bg-[#f5f7f6] rounded-full overflow-hidden border border-[#e9ecef]/40">
                  <div 
                    className="h-full bg-slate-400 rounded-full transition-all duration-1000"
                    style={{ width: `${pctNeutros}%` }}
                  ></div>
                </div>
              </div>

              {/* Positive sentiment */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-650 font-semibold flex items-center">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
                    Positivos / Construtivos
                  </span>
                  <span className="text-[#1b4332] font-bold">{pctPositivos}%</span>
                </div>
                <div className="w-full h-3 bg-[#f5f7f6] rounded-full overflow-hidden border border-[#e9ecef]/40">
                  <div 
                    className="h-full bg-emerald-400 rounded-full transition-all duration-1000"
                    style={{ width: `${pctPositivos}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-gray-500 mt-5 leading-normal italic font-medium">
              Análise cognitiva automática via Gemini AI. Processa semântica e contexto de manifestações comunitárias brasileiras.
            </p>
          </div>

          {/* Actions Status timeline list */}
          <div className="bg-white border border-[#e9ecef] rounded-3xl p-6 shadow-md">
            <h3 className="font-sans font-bold text-lg text-[#1b4332] mb-6 flex items-center justify-between font-sans">
              <span>Status das Ações Mitigatórias</span>
              <span className="text-xs text-[#0b3d59] font-mono font-semibold">Transparência ESG</span>
            </h3>

            <div className="space-y-4">
              {statusAcoes.map((item) => (
                <div key={item.label} className="bg-[#f5f7f6] p-3 rounded-2xl border border-[#e9ecef] flex items-center justify-between shadow-xs">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3.5 h-3.5 rounded-full ${item.color} shrink-0`} />
                    <div>
                      <span className="text-xs font-bold text-gray-800 block">{item.label}</span>
                      <span className="text-[10px] text-gray-500">Fluxo operacional ativo</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-[#1b4332] block">{item.pct}%</span>
                    <span className="text-[10px] text-gray-400">{item.count} propostas</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Priority table matrix */}
        <div className="bg-white border border-[#e9ecef] rounded-3xl p-6 md:p-8 shadow-md overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-[#e9ecef] mb-6 gap-y-3">
            <div>
              <h3 className="font-sans font-bold text-lg text-[#1b4332]">Ranking de Prioridade Socioambiental</h3>
              <p className="text-xs text-gray-600 mt-1">
                Fórmula multifatorial cruzando o total de reclamações territoriais ao índice de vulnerabilidade social do bairro.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="bg-[#1b4332]/8 border border-[#1b4332]/25 px-3 py-1.5 rounded-xl text-[10px] font-mono text-[#1b4332] font-bold tracking-wider">
                MATRIZ DE PONDERAÇÃO ATUALIZADA
              </div>
              {currentUser ? (
                <button
                  onClick={handleExportRankingPDF}
                  className="bg-[#1b4332] hover:bg-[#133024] cursor-pointer text-white px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-xs"
                  id="btn-export-ranking-pdf"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Exportar Relatório PDF</span>
                </button>
              ) : (
                <button
                  disabled
                  title="Acesse sua conta para exportar o ranking ESG oficial"
                  className="bg-gray-100 text-gray-400 border border-gray-200 px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 cursor-not-allowed"
                  id="btn-export-ranking-locked"
                >
                  <Lock className="h-3 w-3" />
                  <span>Exportar PDF (Login necessário)</span>
                </button>
              )}
            </div>
          </div>

          {/* Table container responsive viewport */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-gray-750">
              <thead className="text-[10px] uppercase font-bold text-[#0b3d59] tracking-wider border-b border-gray-150">
                <tr>
                  <th scope="col" className="pb-3 px-1 text-left font-bold text-[#0b3d59]">Região do Entorno</th>
                  <th scope="col" className="pb-3 px-2">Problema Ambiental</th>
                  <th scope="col" className="pb-3 px-2 text-center">Gravidade</th>
                  <th scope="col" className="pb-3 px-2 text-center">Registros Pluviais</th>
                  <th scope="col" className="pb-3 px-2 text-center">Vulnerabilidade Social</th>
                  <th scope="col" className="pb-3 px-2 text-right">Prioridade ESG</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                
                {/* Community 1 */}
                <tr className="hover:bg-gray-50/50">
                  <td className="py-4 px-1 font-bold text-[#1b4332]">Jesuítas (Santa Cruz - RJ)</td>
                  <td className="py-4 px-2">Particulado siderúrgico sedimentável (Fumaça Prateada)</td>
                  <td className="py-4 px-2 text-center">
                    <span className="bg-rose-50 text-rose-600 px-2 py-0.5 rounded-md border border-rose-200 font-bold">Alta</span>
                  </td>
                  <td className="py-4 px-2 text-center text-[#1b4332] font-mono font-bold">142 relatos</td>
                  <td className="py-4 px-2 text-center">Alta Vulnerabilidade</td>
                  <td className="py-4 px-2 text-right">
                    <span className="bg-rose-600 text-white font-extrabold px-3 py-1 rounded-md shadow-xs text-[10px] tracking-wide block sm:inline-block uppercase">Crítica</span>
                  </td>
                </tr>

                {/* Community 2 */}
                <tr className="hover:bg-gray-50/50">
                  <td className="py-4 px-1 font-bold text-[#1b4332]">Santa Cruz dos Navegantes (Guarujá - SP)</td>
                  <td className="py-4 px-2">Assoreamento e óleo combustível estuarino</td>
                  <td className="py-4 px-2 text-center">
                    <span className="bg-rose-50 text-rose-600 px-2 py-0.5 rounded-md border border-rose-200 font-bold">Alta</span>
                  </td>
                  <td className="py-4 px-2 text-center text-[#1b4332] font-mono font-bold">94 relatos</td>
                  <td className="py-4 px-2 text-center">Alta Vulnerabilidade</td>
                  <td className="py-4 px-2 text-right">
                    <span className="bg-rose-600 text-white font-extrabold px-3 py-1 rounded-md shadow-xs text-[10px] tracking-wide block sm:inline-block uppercase">Crítica</span>
                  </td>
                </tr>

                {/* Community 3 */}
                <tr className="hover:bg-gray-50/50">
                  <td className="py-4 px-1 font-bold text-[#1b4332]">Vila Parisi (Cubatão - SP)</td>
                  <td className="py-4 px-2">Ruído industrial contínuo noturno (NBR 10151)</td>
                  <td className="py-4 px-2 text-center">
                    <span className="bg-amber-50 text-amber-600 px-2 py-0.5 rounded-md border border-amber-200 font-bold">Média</span>
                  </td>
                  <td className="py-4 px-2 text-center text-[#1b4332] font-mono font-bold">85 relatos</td>
                  <td className="py-4 px-2 text-center">Média Vulnerabilidade</td>
                  <td className="py-4 px-2 text-right">
                    <span className="bg-amber-500 text-white font-extrabold px-3 py-1 rounded-md shadow-xs text-[10px] tracking-wide block sm:inline-block uppercase">Média</span>
                  </td>
                </tr>

                {/* Community 4 */}
                <tr className="hover:bg-gray-50/50">
                  <td className="py-4 px-1 font-bold text-[#1b4332]">Bairro Veneza (Ipatinga - MG)</td>
                  <td className="py-4 px-2">Ilha de calor urbana e fallout de coque metalúrgico</td>
                  <td className="py-4 px-2 text-center">
                    <span className="bg-[#1b4332]/10 text-[#1b4332] px-2 py-0.5 rounded-md font-bold">Média</span>
                  </td>
                  <td className="py-4 px-2 text-center text-[#1b4332] font-mono font-bold">63  relatos</td>
                  <td className="py-4 px-2 text-center">Média Vulnerabilidade</td>
                  <td className="py-4 px-2 text-right">
                    <span className="bg-[#1b4332] text-white font-bold px-3 py-1 rounded-md shadow-xs text-[10px] tracking-wide block sm:inline-block uppercase">Baixa</span>
                  </td>
                </tr>

                {/* Community 5 */}
                <tr className="hover:bg-gray-50/50">
                  <td className="py-4 px-1 font-bold text-[#1b4332]">Zona Residencial (Candiota - RS)</td>
                  <td className="py-4 px-2">Dispersão de cinzas de carvão e pluma sedimentável</td>
                  <td className="py-4 px-2 text-center">
                    <span className="bg-rose-50 text-rose-600 px-2 py-0.5 rounded-md border border-rose-200 font-bold">Alta</span>
                  </td>
                  <td className="py-4 px-2 text-center text-[#1b4332] font-mono font-bold">41 relatos</td>
                  <td className="py-4 px-2 text-center">Baixa Vulnerabilidade</td>
                  <td className="py-4 px-2 text-right">
                    <span className="bg-[#1b4332] text-white font-bold px-3 py-1 rounded-md shadow-xs text-[10px] tracking-wide block sm:inline-block uppercase">Baixa</span>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

          {/* Interactive hint block */}
          <div className="mt-4 text-center">
            <span className="px-3.5 py-1 rounded-md bg-[#1b4332]/5 border border-[#1b4332]/15 text-[11px] text-[#1b4332]/80 inline-block font-medium">
              Nota: Alterações efetuadas nos formulários superiores impactam as métricas consolidadas acima.
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
