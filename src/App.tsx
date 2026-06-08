import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import ImpactMap from './components/ImpactMap';
import ReportForm from './components/ReportForm';
import SolutionForm from './components/SolutionForm';
import DashboardESG from './components/DashboardESG';
import SolutionBank from './components/SolutionBank';
import MyRestrictedArea from './components/MyRestrictedArea';
import AboutSection from './components/AboutSection';
import CommunityPains from './components/CommunityPains';
import OnboardingTour from './components/OnboardingTour';
import CodeViewer from './components/CodeViewer';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import AccessibilityMenu from './components/AccessibilityMenu';
import PitchPresentation from './components/PitchPresentation';
import { ArrowUp } from 'lucide-react';

import { Relato, Proposta, SolucaoPadrao, PlataformaUser } from './types';
import { initialRelatos, initialPropostas, solucoesPadrao } from './data/initialData';

export default function App() {
  // relatos & propostas core arrays
  const [relatos, setRelatos] = useState<Relato[]>(initialRelatos);
  const [propostas, setPropostas] = useState<Proposta[]>(initialPropostas);
  const [activeSection, setActiveSection] = useState('home');
  const [showCodeViewer, setShowCodeViewer] = useState(false);

  // Accessibility States
  const [contrastMode, setContrastMode] = useState<'normal' | 'high-contrast' | 'grayscale'>('normal');
  const [fontSizeScale, setFontSizeScale] = useState(1.0);
  const [underlineLinks, setUnderlineLinks] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [readingGuide, setReadingGuide] = useState(false);
  const [speechSynthesisEnabled, setSpeechSynthesisEnabled] = useState(false);

  // Dark Mode & Back to Top States
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('esg_plataforma_dark_mode');
      return saved === 'true';
    } catch {
      return false;
    }
  });
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.add('dark-mode-root');
        document.body.classList.add('dark-mode-root');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.remove('dark-mode-root');
        document.body.classList.remove('dark-mode-root');
      }
    } catch (error) {
      console.error("Dark mode transition failed:", error);
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScrollButton = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScrollButton);
    return () => window.removeEventListener('scroll', handleScrollButton);
  }, []);

  const handleToggleDarkMode = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      localStorage.setItem('esg_plataforma_dark_mode', String(next));
      return next;
    });
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Authentication State
  const [currentUser, setCurrentUser] = useState<PlataformaUser | null>(() => {
    try {
      const active = localStorage.getItem('esg_plataforma_active_user');
      return active ? JSON.parse(active) : null;
    } catch {
      return null;
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Combine default catalog solutions and user proposals into one derived list
  const todasSolucoes = useMemo(() => {
    const userSols: SolucaoPadrao[] = propostas.map((novaProposta) => ({
      id: novaProposta.id,
      titulo: novaProposta.titulo,
      problemaRelacionado: novaProposta.problemaRelacionado,
      descricao: novaProposta.descricao,
      impactoEsperado: novaProposta.impacto,
      complexidade: novaProposta.viabilidade === 'Alta' ? 'Baixa' : novaProposta.viabilidade === 'Média' ? 'Média' : 'Alta',
      categoria: 'Gerais',
      userEmail: novaProposta.userEmail // Keep ties intact
    }));
    return [...userSols, ...solucoesPadrao];
  }, [propostas]);

  // Auth Handlers
  const handleLoginSuccess = (user: PlataformaUser) => {
    setCurrentUser(user);
    localStorage.setItem('esg_plataforma_active_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('esg_plataforma_active_user');
    // If they were browsing their restricted profile, gently scroll back to home section
    if (activeSection === 'restrito') {
      setActiveSection('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handler to add newly reported issue from form
  const handleAddRelato = (novoRelato: Relato) => {
    const itemWithAuth: Relato = {
      ...novoRelato,
      userEmail: currentUser ? currentUser.email : undefined
    };
    setRelatos((prev) => [itemWithAuth, ...prev]);
  };

  // Handler to add newly proposed solution from form
  const handleAddProposta = async (novaProposta: Proposta) => {
    const itemWithAuth: Proposta = {
      ...novaProposta,
      userEmail: currentUser ? currentUser.email : undefined
    };
    setPropostas((prev) => [itemWithAuth, ...prev]);

    // Real full-stack email trigger for proposal submission
    try {
      const resp = await fetch('/api/enviar-email-esg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tipo: 'Proposta',
          data: itemWithAuth
        })
      });
      if (resp.ok) {
        const result = await resp.json();
        console.log('Proposal notification email sent successfully to coordinator:', result);
      }
    } catch (err) {
      console.error('Failed to dispatch proposal notification email:', err);
    }
  };

  // CRUD modifications for Relato in active session
  const handleUpdateRelato = (updated: Relato) => {
    setRelatos((prev) => prev.map(r => r.id === updated.id ? updated : r));
  };

  const handleDeleteRelato = (id: string) => {
    setRelatos((prev) => prev.filter(r => r.id !== id));
  };

  // CRUD modifications for Proposta in active session
  const handleUpdateProposta = (updated: Proposta) => {
    setPropostas((prev) => prev.map(p => p.id === updated.id ? updated : p));
  };

  const handleDeleteProposta = (id: string) => {
    setPropostas((prev) => prev.filter(p => p.id !== id));
  };

  // Scroll to top when active section changes to make section swaps crisp
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [activeSection]);

  const rootClasses = [
    "min-h-screen transition-all duration-300",
    contrastMode === 'high-contrast' ? "high-contrast-root bg-slate-950 text-yellow-300" : (isDarkMode ? "dark dark-mode-root bg-[#080d0a] text-slate-100" : "bg-[#f5f7f6] text-[#2d3436]"),
    contrastMode === 'grayscale' ? "grayscale-root" : "relative",
    underlineLinks ? "underline-links-root" : "",
    dyslexiaFont ? "dyslexia-font-root" : ""
  ].filter(Boolean).join(" ");

  const rootStyle = {
    fontSize: `${fontSizeScale}rem`
  };

  return (
    <div className={rootClasses} style={rootStyle} id="root-viewport">
      
      {/* Accessibility Style Overrides */}
      <style>{`
        ${contrastMode === 'high-contrast' ? `
          .high-contrast-root, 
          .high-contrast-root * {
            background-color: #0c0f0d !important;
            color: #ffff00 !important;
            border-color: #ffff00 !important;
            box-shadow: none !important;
            text-shadow: none !important;
          }
          .high-contrast-root a,
          .high-contrast-root a *,
          .high-contrast-root button,
          .high-contrast-root button * {
            background-color: #000000 !important;
            color: #00ffff !important;
            border: 2px solid #ffff00 !important;
            text-decoration: underline !important;
          }
          .high-contrast-root input,
          .high-contrast-root select,
          .high-contrast-root textarea {
            background-color: #000000 !important;
            color: #ffffff !important;
            border: 2px solid #ffff00 !important;
          }
          .high-contrast-root select option {
            background-color: #0c0f0d !important;
            color: #ffff00 !important;
          }
          .high-contrast-root svg,
          .high-contrast-root svg * {
            stroke: #ffff00 !important;
            fill: none !important;
          }
        ` : ''}
        ${isDarkMode && contrastMode !== 'high-contrast' ? `
          /* Main structural dark style overrides */
          .dark-mode-root {
            background-color: #080d0a !important;
            color: #f1f5f9 !important;
          }
          .dark-mode-root main {
            background-color: #080d0a !important;
          }
          .dark-mode-root select,
          .dark-mode-root input,
          .dark-mode-root textarea {
            background-color: #111a14 !important;
            color: #e2e8f0 !important;
            border-color: #24352a !important;
          }
          /* Card backgrounds */
          .dark-mode-root .bg-white,
          .dark-mode-root .bg-slate-50,
          .dark-mode-root .bg-gray-50,
          .dark-mode-root .bg-\\[\\#f5f7f6\\],
          .dark-mode-root .bg-emerald-50\\/40,
          .dark-mode-root [class*="bg-white"],
          .dark-mode-root [class*="bg-slate-50"],
          .dark-mode-root [class*="bg-gray-50"],
          .dark-mode-root [class*="bg-\\\\[\\\\#f5f7f6\\\\]"],
          .dark-mode-root [class*="bg-\\\\[\\\\#eef2f0\\\\]"] {
            background-color: #0e1712 !important;
            background-image: none !important;
            color: #e2e8f0 !important;
          }
          /* Clear gradient backgrounds in dark mode and apply deep dark slate bg */
          .dark-mode-root [class*="bg-gradient-to"] {
            background-image: none !important;
            background-color: #080d0a !important;
          }
          /* Target text overrides */
          .dark-mode-root .text-gray-950,
          .dark-mode-root .text-gray-900,
          .dark-mode-root .text-slate-900,
          .dark-mode-root .text-gray-800,
          .dark-mode-root .text-slate-800,
          .dark-mode-root .text-gray-700,
          .dark-mode-root .text-slate-700,
          .dark-mode-root [class*="text-\\\\[\\\\#1b4332\\\\]"],
          .dark-mode-root [class*="text-\\\\[\\\\#0b3d59\\\\]"],
          .dark-mode-root [class*="text-\\\\[\\\\#2d3436\\\\]"],
          .dark-mode-root [class*="text-gray-950"],
          .dark-mode-root [class*="text-gray-900"],
          .dark-mode-root [class*="text-slate-900"],
          .dark-mode-root [class*="text-gray-850"],
          .dark-mode-root [class*="text-gray-800"],
          .dark-mode-root [class*="text-slate-800"],
          .dark-mode-root [class*="text-gray-700"],
          .dark-mode-root [class*="text-slate-700"] {
            color: #f1f5f9 !important;
          }
          .dark-mode-root .text-gray-650,
          .dark-mode-root .text-slate-650,
          .dark-mode-root .text-slate-600,
          .dark-mode-root .text-gray-600,
          .dark-mode-root [class*="text-gray-600"],
          .dark-mode-root [class*="text-slate-600"],
          .dark-mode-root [class*="text-gray-500"],
          .dark-mode-root [class*="text-slate-500"] {
            color: #cbd5e1 !important;
          }
          .dark-mode-root .text-gray-500,
          .dark-mode-root .text-slate-500,
          .dark-mode-root .text-gray-400,
          .dark-mode-root [class*="text-gray-400"],
          .dark-mode-root [class*="text-slate-400"] {
            color: #94a3b8 !important;
          }
          /* Custom borders */
          .dark-mode-root .border-gray-150,
          .dark-mode-root .border-gray-200,
          .dark-mode-root .border-gray-300,
          .dark-mode-root .border-slate-200,
          .dark-mode-root .border-emerald-100,
          .dark-mode-root .border-\\\\[\\\\#e9ecef\\\\] {
            border-color: #1b2a21 !important;
          }
          /* Special section headers and widgets */
          .dark-mode-root section,
          .dark-mode-root div[id="home"],
          .dark-mode-root div[id="mapa"],
          .dark-mode-root div[id="relatar"],
          .dark-mode-root div[id="propor"],
          .dark-mode-root div[id="dashboard"],
          .dark-mode-root div[id="banco"],
          .dark-mode-root div[id="restrito"],
          .dark-mode-root div[id="sobre"] {
            background-color: #080d0a !important;
            border-color: #1b2a21 !important;
          }
          .dark-mode-root .border-t {
            border-color: #1b2a21 !important;
          }
          /* Table items active */
          .dark-mode-root .divide-y > * {
            border-color: #1b2a21 !important;
          }
          .dark-mode-root h1,
          .dark-mode-root h2,
          .dark-mode-root h3,
          .dark-mode-root h4 {
            color: #ffffff !important;
          }
          .dark-mode-root .bg-emerald-50,
          .dark-mode-root .bg-teal-50 {
            background-color: rgba(16, 185, 129, 0.12) !important;
            color: #34d399 !important;
          }
          .dark-mode-root .bg-blue-50 {
            background-color: rgba(56, 189, 248, 0.12) !important;
            color: #38bdf8 !important;
          }
          .dark-mode-root .bg-amber-50,
          .dark-mode-root .bg-orange-50 {
            background-color: rgba(245, 158, 11, 0.12) !important;
            color: #fbbf24 !important;
          }
          .dark-mode-root .bg-\\\\[\\\\#1b4332\\\\]\\\\/5 {
            background-color: rgba(52, 211, 153, 0.06) !important;
          }
          .dark-mode-root .bg-\\\\[\\\\#0b3d59\\\\]\\\\/5 {
            background-color: rgba(56, 189, 248, 0.06) !important;
          }
          .dark-mode-root p,
          .dark-mode-root blockquote,
          .dark-mode-root cite,
          .dark-mode-root span:not([class*="bg-[#f28f3b]"]):not([class*="bg-[#1b4332]"]) {
            color: #cbd5e1 !important;
          }
          .dark-mode-root .shadow-lg,
          .dark-mode-root .shadow-md,
          .dark-mode-root .shadow-xl,
          .dark-mode-root .shadow-xs {
            box-shadow: 0 4px 20px -2px rgba(0,0,0,0.5) !important;
          }
        ` : ''}
        ${contrastMode === 'grayscale' ? `
          .grayscale-root {
            filter: grayscale(100%) !important;
          }
        ` : ''}
        ${underlineLinks ? `
          .underline-links-root a,
          .underline-links-root button,
          .underline-links-root [role="button"] {
            text-decoration: underline !important;
          }
        ` : ''}
        ${dyslexiaFont ? `
          .dyslexia-font-root,
          .dyslexia-font-root * {
            font-family: Arial, Helvetica, sans-serif !important;
            letter-spacing: 0.05em !important;
            word-spacing: 0.12em !important;
            line-height: 1.85 !important;
          }
        ` : ''}
      `}</style>
      
      {/* Dynamic Header */}
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        showCodeViewer={showCodeViewer}
        setShowCodeViewer={setShowCodeViewer}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      {/* Code Viewer Mode Toggle Area */}
      {showCodeViewer && (
        <div className="pt-28 pb-4 animate-fade-in bg-[#1b4332] text-white">
          <CodeViewer />
        </div>
      )}

      {/* Main Structural Page Flow - Separate Standalone Views instead of Infinite Scrolling Stack */}
      <main className={`relative min-h-[65vh] ${activeSection !== 'home' ? 'pt-16 lg:pt-20' : ''}`}>
        
        {/* Render only active topic as a separate screen/view */}
        {activeSection === 'home' && <Home onNavigate={setActiveSection} />}
        
        {activeSection === 'mapa' && <ImpactMap relatos={relatos} />}
        
        {activeSection === 'relatar' && <ReportForm onAddRelato={handleAddRelato} />}
        
        {activeSection === 'propor' && <SolutionForm onAddProposta={handleAddProposta} />}
        
        {activeSection === 'dores' && <CommunityPains />}
        
        {activeSection === 'dashboard' && <DashboardESG relatos={relatos} propostas={propostas} currentUser={currentUser} />}
        
        {activeSection === 'banco' && <SolutionBank solucoes={todasSolucoes} />}
        
        {activeSection === 'restrito' && (
          <MyRestrictedArea
            currentUser={currentUser}
            relatos={relatos}
            propostas={propostas}
            onUpdateRelato={handleUpdateRelato}
            onDeleteRelato={handleDeleteRelato}
            onUpdateProposta={handleUpdateProposta}
            onDeleteProposta={handleDeleteProposta}
          />
        )}
        
        {activeSection === 'sobre' && <AboutSection />}
        
        {activeSection === 'pitch' && <PitchPresentation />}

      </main>

      {/* Dynamic Footer */}
      <Footer />

      {/* Accessibility Helper floating options menu */}
      <AccessibilityMenu 
        onContrastChange={setContrastMode}
        onFontSizeChange={setFontSizeScale}
        onUnderlineLinksChange={setUnderlineLinks}
        onDyslexiaFontChange={setDyslexiaFont}
        onReadingGuideChange={setReadingGuide}
        onSpeechSynthesisChange={setSpeechSynthesisEnabled}
        onNavigate={setActiveSection}
      />

      {/* Authentication Popup Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={handleScrollToTop}
          className="fixed right-6 bottom-6 z-55 p-3.5 bg-[#f28f3b] hover:bg-[#de7c2a] text-slate-950 hover:text-white rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center border-2 border-white/20 active:scale-95 cursor-pointer"
          aria-label="Voltar para o topo"
          title="Voltar para o topo"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      {/* Onboarding Interactive walkthrough Tour */}
      <OnboardingTour activeSection={activeSection} onNavigate={setActiveSection} />

    </div>
  );
}
