import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, LockKeyhole } from 'lucide-react';

export default function ComingSoon({ Shell, title }) {
  return <Shell><div className="coming-soon"><span className="coming-soon-icon"><LockKeyhole size={27}/></span><span className="eyebrow">PRÓXIMAMENTE</span><h1>{title}</h1><p>Estamos preparando esta sección para su próxima versión en Power Apps. Por ahora puedes crear descriptivos y recorrer la guía.</p><Link to="/menu" className="btn btn-primary"><ArrowLeft size={17}/> Volver al menú</Link></div></Shell>;
}
