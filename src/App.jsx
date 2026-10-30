import React, { useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { archivedExamples, initialDocuments } from './data';
import DPForm from './DPForm.jsx';
import LandingPage from './LandingPage.jsx';
import MenuPage from './MenuPage.jsx';
import GuidePage from './GuidePage.jsx';
import ComingSoon from './ComingSoon.jsx';

const STORAGE_KEY = 'primax-dp-prototipo-v1';

function Brand({ light = false, tagline = true }) {
  return <span className={`brand inline-flex items-center ${light ? 'brand-light' : ''}`} aria-label="Primax">
    <svg className="brand-symbol" viewBox="0 0 52 48" aria-hidden="true"><defs><linearGradient id="flame" x1="0" x2="1" y1="1" y2="0"><stop stopColor="#ffb600"/><stop offset="1" stopColor="#ff5100"/></linearGradient></defs><path fill="url(#flame)" d="M3 26C11 10 30 5 49 2 35 12 24 25 17 43 12 39 7 33 3 26Z"/><path fill="white" d="M25 24 39 12 31 32Z"/><path fill="#ff8200" d="m28 37 8-7 5 15H25Z"/></svg>
    <span className="brand-type">PRIMAX{tagline && <small>Siempre más.</small>}</span>
  </span>;
}

function Shell({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const goBack = () => {
    if (location.pathname === '/menu') return navigate('/');
    if (location.key === 'default') return navigate('/menu');
    navigate(-1);
  };
  return <div className="app-shell"><div className="shell-main">
    <header className="topbar"><div className="topbar-left"><Link to="/menu" className="topbar-brand" aria-label="Volver al menú"><Brand tagline={false}/></Link><span className="topbar-divider"/><span className="topbar-title">DESCRIPTIVO DE PUESTOS</span></div><div className="topbar-right"><button type="button" className="topbar-back" onClick={goBack} aria-label="Volver" title="Volver"><ChevronLeft size={19}/></button></div></header>
    <main className="main-content">{children}</main>
  </div></div>;
}

export default function App() {
  const [documents, setDocuments] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!Array.isArray(saved)) return initialDocuments;
      return [...saved, ...archivedExamples.filter(example => !saved.some(item => item.id === example.id))];
    } catch { return initialDocuments; }
  });
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(documents)); }, [documents]);
  const onSave = document => setDocuments(prev => prev.some(d => d.id === document.id) ? prev.map(d => d.id === document.id ? document : d) : [document, ...prev]);
  return <Routes>
    <Route path="/" element={<LandingPage/>}/>
    <Route path="/menu" element={<MenuPage Shell={Shell}/>}/>
    <Route path="/consultar" element={<ComingSoon Shell={Shell} title="Consultar descriptivos"/>}/>
    <Route path="/inactivos" element={<ComingSoon Shell={Shell} title="Historial de descriptivos"/>}/>
    <Route path="/guia" element={<GuidePage Shell={Shell}/>}/>
    <Route path="/crear" element={<DPForm documents={documents} onSave={onSave} Shell={Shell}/>}/>
    <Route path="/editar/:id" element={<ComingSoon Shell={Shell} title="Editar descriptivos"/>}/>
    <Route path="/descriptivo/:id" element={<ComingSoon Shell={Shell} title="Consultar descriptivos"/>}/>
    <Route path="*" element={<LandingPage/>}/>
  </Routes>;
}
