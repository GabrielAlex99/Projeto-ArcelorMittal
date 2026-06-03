import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ShieldAlert, Award, Code, User, Sun, Moon, 
  Home as HomeIcon, Map as MapIcon, AlertTriangle, Lightbulb, 
  LayoutDashboard, Database, Info 
} from 'lucide-react';
import { PlataformaUser } from '../types';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  showCodeViewer: boolean;
  setShowCodeViewer: (show: boolean) => void;
  currentUser: PlataformaUser | null;
  onLogout: () => void;
  onOpenAuth: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Header({ 
  activeSection, 
  setActiveSection, 
  showCodeViewer, 
  setShowCodeViewer,
  currentUser,
  onLogout,
  onOpenAuth,
  isDarkMode,
  onToggleDarkMode
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Início', icon: HomeIcon },
    { id: 'mapa', label: 'Mapeamento', icon: MapIcon },
    { id: 'relatar', label: 'Relatar Urgente 🚨', icon: AlertTriangle, highlight: 'urgent' },
    { id: 'propor', label: 'Propor Solução 💡', icon: Lightbulb, highlight: 'idea' },
    { id: 'dashboard', label: 'Dashboard ESG', icon: LayoutDashboard },
    { id: 'banco', label: 'Soluções', icon: Database },
    currentUser ? { id: 'restrito', label: 'Área Interna', icon: User } : null,
    { id: 'sobre', label: 'Sobre', icon: Info },
  ].filter(Boolean) as { id: string; label: string; icon: any; highlight?: string }[];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setIsOpen(false);
    setShowCodeViewer(false);
    const element = document.getElementById(id);
    if (element) {
      // Offset for fixed header height
      const headerOffset = scrolled ? 74 : 94;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#1b4332]/95 backdrop-blur-md border-b border-[#245c44] shadow-lg py-2 md:py-2.5' 
        : 'bg-[#1b4332]/90 backdrop-blur-sm py-4 md:py-4.5 border-b border-[#245c44]/40'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Platform Name */}
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="bg-gradient-to-br from-[#f28f3b] to-[#e28334] p-2 rounded-xl text-white shadow-md shadow-emerald-950/20">
              <ShieldAlert className="h-5 w-5 md:h-5.5 md:w-5.5" />
            </div>
            <div>
              <span className="font-sans font-bold text-sm md:text-base text-white tracking-tight leading-none block">
                Plataforma Socioambiental
              </span>
              <span className="font-sans text-[10px] md:text-xs text-[#f28f3b] font-medium tracking-wide">
                Escuta, Mapeamento &amp; Soluções ESG
              </span>
            </div>
          </div>
 
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1.5">
            {navItems.map((item) => {
              const IconComp = item.icon;
              let btnClass = "";
              if (item.highlight === 'urgent') {
                btnClass = activeSection === item.id && !showCodeViewer
                  ? 'bg-rose-600 text-white font-extrabold border border-rose-500 shadow-md transform scale-102'
                  : 'bg-rose-500/10 text-rose-200 border border-rose-500/30 hover:bg-rose-600/20 font-bold';
              } else if (item.highlight === 'idea') {
                btnClass = activeSection === item.id && !showCodeViewer
                  ? 'bg-[#f28f3b] text-slate-950 font-extrabold border border-[#e28334] shadow-md transform scale-102'
                  : 'bg-[#f28f3b]/10 text-orange-200 border border-[#f28f3b]/30 hover:bg-[#f28f3b]/20 font-bold';
              } else {
                btnClass = activeSection === item.id && !showCodeViewer
                  ? 'bg-white/10 text-[#f28f3b] border border-white/10 font-bold'
                  : 'text-gray-200 hover:text-white hover:bg-white/5';
              }
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center space-x-1 cursor-pointer ${btnClass}`}
                >
                  {IconComp && <IconComp className={`h-3.5 w-3.5 ${item.highlight === 'urgent' ? 'text-red-400' : item.highlight === 'idea' ? 'text-yellow-400' : 'text-emerald-300'}`} />}
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Academic Area Button */}
            <button
              onClick={() => {
                setShowCodeViewer(!showCodeViewer);
                setIsOpen(false);
                if (!showCodeViewer) {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className={`ml-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase border flex items-center space-x-1 transition-all duration-300 cursor-pointer ${
                showCodeViewer
                  ? 'bg-sky-500 text-slate-950 border-sky-400 font-bold shadow-md'
                  : 'bg-[#0b3d59]/30 text-sky-200 border-[#0b3d59]/55 hover:bg-[#0b3d59]/60'
              }`}
            >
              <Code className="h-3 w-3" />
              <span>Código</span>
            </button>

            {/* Dark Mode Toggle Button */}
            <button
              onClick={onToggleDarkMode}
              className="ml-1.5 p-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10 transition-colors duration-200 cursor-pointer"
              aria-label={isDarkMode ? "Desativar modo escuro" : "Ativar modo escuro"}
              title={isDarkMode ? "Alternar para Modo Claro" : "Alternar para Modo Escuro"}
            >
              {isDarkMode ? <Sun className="h-4 w-4 text-yellow-400" /> : <Moon className="h-4 w-4 text-sky-200" />}
            </button>

            {/* Desktop Auth Section */}
            {currentUser ? (
              <div className="flex items-center space-x-1.5 pl-2 ml-1 border-l border-white/15">
                <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-tight truncate max-w-[70px]" title={currentUser.name}>
                  {currentUser.name.split(' ')[0]}
                </span>
                <button
                  onClick={onLogout}
                  className="px-2 py-1 bg-rose-600/90 hover:bg-rose-700 text-white rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition-all cursor-pointer"
                >
                  Sair
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="ml-1.5 px-3 py-1.5 bg-[#f28f3b] hover:bg-[#de7c2a] text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
              >
                Entrar
              </button>
            )}
          </nav>

          {/* Mobile Right Controls */}
          <div className="flex items-center space-x-2 lg:hidden">
            {/* Dark Mode button on mobile */}
            <button
              onClick={onToggleDarkMode}
              className="p-2.5 rounded-lg bg-white/5 text-emerald-100 hover:text-white transition-colors cursor-pointer"
              aria-label={isDarkMode ? "Desativar modo escuro" : "Ativar modo escuro"}
              title={isDarkMode ? "Alternar para Modo Claro" : "Alternar para Modo Escuro"}
            >
              {isDarkMode ? <Sun className="h-4.5 w-4.5 text-yellow-400" /> : <Moon className="h-4.5 w-4.5 text-sky-200" />}
            </button>

            {/* Academic button icon for mobile */}
            <button
              onClick={() => {
                setShowCodeViewer(!showCodeViewer);
                if (!showCodeViewer) {
                   window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className={`p-2 rounded-lg transition-colors ${
                showCodeViewer
                  ? 'bg-[#f28f3b] text-slate-950'
                  : 'bg-white/5 text-[#f28f3b] border border-white/10'
              }`}
              title="Código Fonte Acadêmico"
            >
              <Code className="h-4.5 w-4.5" />
            </button>

            {/* Mobile Auth Button */}
            {currentUser ? (
              <button
                onClick={() => handleNavClick('restrito')}
                className="p-2 rounded-lg bg-emerald-500/10 text-emerald-200 border border-emerald-500/20"
                title="Sua Área"
              >
                <User className="h-4.5 w-4.5" />
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-2.5 py-1.5 bg-[#f28f3b] text-white font-bold rounded-lg text-xs cursor-pointer"
                title="Entrar"
              >
                Entrar
              </button>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-200 hover:text-white hover:bg-white/5 focus:outline-none transition-all duration-200"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-[#122e22] border-b border-[#245c44] px-4 pt-2.5 pb-6 space-y-2 shadow-inner transition-transform duration-300">
          <div className="flex flex-col space-y-1.5">
            {navItems.map((item) => {
              const IconComp = item.icon;
              let itemClass = "";
              if (item.highlight === 'urgent') {
                itemClass = activeSection === item.id && !showCodeViewer
                  ? 'bg-rose-600 text-white font-extrabold'
                  : 'bg-rose-600/10 text-rose-200 border border-rose-500/20';
              } else if (item.highlight === 'idea') {
                itemClass = activeSection === item.id && !showCodeViewer
                  ? 'bg-[#f28f3b] text-slate-950 font-extrabold'
                  : 'bg-[#f28f3b]/10 text-orange-200 border border-[#f28f3b]/25';
              } else {
                itemClass = activeSection === item.id && !showCodeViewer
                  ? 'bg-white/10 text-[#f28f3b] border-l-4 border-[#f28f3b] font-bold'
                  : 'text-gray-200 hover:text-white hover:bg-white/5';
              }
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2.5 cursor-pointer ${itemClass}`}
                >
                  {IconComp && <IconComp className="h-4 w-4 shrink-0 opacity-90" />}
                  <span>{item.label}</span>
                </button>
              );
            })}
            
            <hr className="border-[#245c44]/60 my-2" />
            
            {/* Mobile Auth options in drawer */}
            {currentUser ? (
              <div className="py-2 px-4 flex items-center justify-between bg-white/5 rounded-xl border border-white/5">
                <span className="text-xs text-emerald-100 font-bold truncate">Logado como: {currentUser.name}</span>
                <button
                  onClick={() => { onLogout(); setIsOpen(false); }}
                  className="px-3 py-1 bg-rose-600 hover:bg-rose-750 text-white font-extrabold rounded-lg text-[11px] uppercase tracking-wider"
                >
                  Sair
                </button>
              </div>
            ) : (
              <button
                onClick={() => { onOpenAuth(); setIsOpen(false); }}
                className="w-full text-center py-2.5 px-4 bg-[#f28f3b] text-white font-bold rounded-lg text-xs tracking-wider uppercase"
              >
                Entrar / Cadastrar Conta
              </button>
            )}

            <hr className="border-[#245c44]/60 my-2" />

            <button
              onClick={() => {
                setShowCodeViewer(!showCodeViewer);
                setIsOpen(false);
                if (!showCodeViewer) {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className={`w-full text-center py-2.5 px-4 rounded-lg text-xs font-bold flex items-center justify-center space-x-2 border transition-all ${
                showCodeViewer
                  ? 'bg-sky-500 text-slate-950 border-sky-400 font-bold'
                  : 'bg-[#0b3d59]/40 text-sky-200 border-[#0b3d59]/60'
              }`}
            >
              <Code className="h-4 w-4" />
              <span>Ver Código Fonte Acadêmico (HTML/CSS/JS)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
