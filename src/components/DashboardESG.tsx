import React from 'react';
import { Relato, Proposta, PlataformaUser } from '../types';
import { Activity, ShieldAlert, Award, TrendingUp, Users, CheckCircle, Download, Lock } from 'lucide-react';
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

    // Color definitions
    const primaryGreen = [27, 67, 50]; // #1b4332
    const lightBg = [245, 247, 246]; // #f5f7f6
    const borderGray = [233, 236, 239]; // #e9ecef

    // Top banner
    doc.setFillColor(27, 67, 50);
    doc.rect(0, 0, 210, 36, 'F');

    // Title text inside banner
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.text('PRESERVAÇÃO & COMPLIANCE SOCIOAMBIENTAL', 15, 14);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(190, 215, 200);
    doc.text('Relatório Consolidado de Impacto ESG e Prioridade Comunitária', 15, 20);
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
    doc.setFontSize(13);
    doc.setTextColor(27, 67, 50);
    doc.text('Ranking de Prioridade Socioambiental', 15, 48);

    // Decorative underline separator
    doc.setDrawColor(27, 67, 50);
    doc.setLineWidth(0.75);
    doc.line(15, 51, 195, 51);

    // Description text block
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(80, 85, 80);
    const introText = 'Este relatório apresenta a matriz de ponderação socioambiental calculada com base na gravidade dos incidentes indicados e a densidade populacional em áreas de alta vulnerabilidade. Os dados são utilizados para auditorias de integridade ética, responsabilidade corporativa ESG e direcionamento de recursos emergenciais para justiça climática territorial.';
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
    doc.setFontSize(8);
    doc.setTextColor(100, 105, 100);
    doc.text('TOTAL RELATOS', 20, 73);
    doc.text('PROBLEMAS CRÍTICOS', 70, 73);
    doc.text('OPERAÇÕES ATIVAS', 125, 73);
    doc.text('COMUNIDADES', 165, 73);

    doc.setFontSize(10.5);
    doc.setTextColor(27, 67, 50);
    doc.text(`${totalRelatos}`, 20, 79);
    doc.setTextColor(220, 53, 69); // Rose color for critical
    doc.text(`${totalCriticos}`, 70, 79);
    doc.setTextColor(27, 67, 50);
    doc.text(`${acoesEmAndamento}`, 125, 79);
    doc.text(`${comunidadesImpactadas}`, 165, 79);

    // Table Header
    let currentY = 92;
    doc.setFillColor(27, 67, 50);
    doc.rect(15, currentY, 180, 8, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text('Comunidade / Região', 17, currentY + 5.5);
    doc.text('Problema Territorial Detectado', 60, currentY + 5.5);
    doc.text('Gravidade', 115, currentY + 5.5);
    doc.text('Registros', 135, currentY + 5.5);
    doc.text('Vulnerabilidade', 152, currentY + 5.5);
    doc.text('Prioridade ESG', 178, currentY + 5.5);

    // Data rows
    const items = [
      { nome: 'Jesuítas (Santa Cruz - RJ)', prob: 'Particulado siderúrgico sedimentável (Fumaça)', grav: 'Alta', reg: '142 relatos', vul: 'Alta Vuln.', pr: 'Crítica' },
      { nome: 'Santa Cruz Navegantes (SP)', prob: 'Assoreamento e combustível estuarino', grav: 'Alta', reg: '94 relatos', vul: 'Alta Vuln.', pr: 'Crítica' },
      { nome: 'Vila Parisi (Cubatão - SP)', prob: 'Ruído industrial contínuo noturno (NBR 10151)', grav: 'Média', reg: '85 relatos', vul: 'Média Vuln.', pr: 'Média' },
      { nome: 'Bairro Veneza (Ipatinga - MG)', prob: 'Ilha de calor urbana e fallout de coque', grav: 'Média', reg: '63 relatos', vul: 'Média Vuln.', pr: 'Baixa' },
      { nome: 'Zona Res. (Candiota - RS)', prob: 'Dispersão de cinzas de carvão mineral', grav: 'Alta', reg: '41 relatos', vul: 'Baixa Vuln.', pr: 'Baixa' }
    ];

    currentY += 8;
    items.forEach((item, idx) => {
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

      // Text positions
      doc.setFont('helvetica', 'bold');
      doc.text(item.nome, 17, currentY + 7);
      
      doc.setFont('helvetica', 'normal');
      const wrappedDesc = doc.splitTextToSize(item.prob, 52);
      doc.text(wrappedDesc, 60, currentY + 5.5);

      doc.text(item.grav, 115, currentY + 7);
      doc.text(item.reg, 135, currentY + 7);
      doc.text(item.vul, 152, currentY + 7);

      // Apply prioridade color styling
      if (item.pr === 'Crítica') {
        doc.setTextColor(220, 53, 69);
        doc.setFont('helvetica', 'bold');
      } else if (item.pr === 'Média') {
        doc.setTextColor(242, 143, 59);
        doc.setFont('helvetica', 'bold');
      } else {
        doc.setTextColor(27, 67, 50);
        doc.setFont('helvetica', 'bold');
      }
      doc.text(item.pr, 178, currentY + 7);

      currentY += 11;
    });

    // Legal / Compliance stamp
    currentY += 12;
    doc.setFillColor(245, 247, 246);
    doc.rect(15, currentY, 180, 14, 'F');
    doc.setDrawColor(27, 67, 50);
    doc.setLineWidth(0.3);
    doc.line(15, currentY, 15, currentY + 14); // Left green border line

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(27, 67, 50);
    doc.text('PRODUTO DE DUE DILIGENCE DE CONFORIDADE E TRANSPARÊNCIA', 18, currentY + 4.5);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(110, 115, 110);
    doc.text('Conselho de Governança ESG e Relações Comunitárias. Este relatório possui validade interna para fins de auditoria socioambiental.', 18, currentY + 9);

    // Save
    doc.save('ranking-de-prioridade-esg.pdf');
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Categoria Distribution chart */}
          <div className="bg-white border border-[#e9ecef] rounded-3xl p-6 shadow-md">
            <h3 className="font-sans font-bold text-lg text-[#1b4332] mb-6 flex items-center justify-between">
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
            <h3 className="font-sans font-bold text-lg text-[#1b4332] mb-6 flex items-center justify-between">
              <span>Nível de Gravidade Geral</span>
              <span className="text-xs text-rose-600 font-mono font-semibold">Sensibilidade Crítica</span>
            </h3>

            <div className="space-y-5.5 pt-1">
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

          {/* Actions Status timeline list */}
          <div className="bg-white border border-[#e9ecef] rounded-3xl p-6 shadow-md">
            <h3 className="font-sans font-bold text-lg text-[#1b4332] mb-6 flex items-center justify-between">
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
                  <span>Exportar PDF</span>
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
