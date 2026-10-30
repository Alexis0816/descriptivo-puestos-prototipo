import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Archive, ArrowRight, BookOpen, CheckCircle2, FilePlus2, LockKeyhole, Search } from 'lucide-react';

export default function MenuPage({ Shell }) {
  const location = useLocation();
  const actions = [
    { to: '/crear', number: '01', label: 'CREAR', title: 'Crear descriptivo', description: 'Registra un nuevo puesto paso a paso.', Icon: FilePlus2 },
    { to: '/consultar', number: '02', label: 'PUESTOS ACTIVOS', title: 'Consultar descriptivos', description: 'Busca y actualiza puestos activos.', Icon: Search, blocked: true },
    { to: '/inactivos', number: '03', label: 'HISTÓRICO', title: 'Puestos inactivos', description: 'Consulta descriptivos de puestos que ya no están activos.', Icon: Archive, blocked: true },
    { to: '/guia', number: '04', label: 'APRENDER', title: 'Guía', description: 'Aprende a redactar cada sección del DP.', Icon: BookOpen },
  ];

  return <Shell><div className="compact-menu">
    <div className="compact-menu-intro"><div><span className="eyebrow">MENÚ PRINCIPAL</span><h1>Descriptivo de puestos</h1></div></div>
    {location.state?.saved && <div className="menu-save-notice" role="status"><CheckCircle2 size={19}/><span>{location.state.estado === 'Borrador' ? 'Borrador guardado en esta demostración.' : 'Descriptivo guardado en esta demostración.'} La consulta estará disponible próximamente.</span></div>}
    <div className="compact-menu-actions">{actions.map(({ to, number, label, title, description, Icon, blocked }) => {
      const content = <><span className="compact-action-icon"><Icon size={24}/></span><span className="compact-action-copy"><small>{number} / {label}</small><strong>{title}</strong><span>{description}</span></span>{blocked ? <span className="compact-action-badge"><LockKeyhole size={13}/> Próximamente</span> : <ArrowRight className="compact-action-arrow" size={19}/>}</>;
      return blocked
        ? <div key={to} className="compact-action compact-action-disabled" aria-disabled="true">{content}</div>
        : <Link key={to} to={to} className="compact-action">{content}</Link>;
    })}</div>
    <div className="compact-menu-identity"><span className="compact-avatar">UD</span><span><small>IDENTIDAD · DEMO</small><strong>Usuario de demostración</strong></span><span className="compact-role"><small>ROL · DEMO</small><strong>Administrador</strong></span></div>
  </div></Shell>;
}
