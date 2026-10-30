import React from 'react';
import { Link } from 'react-router-dom';

function Logo() {
  return <div className="simple-logo" aria-label="Primax"><svg viewBox="0 0 52 48" aria-hidden="true"><defs><linearGradient id="brandGradient" x1="0" x2="1" y1="1" y2="0"><stop stopColor="#ffad00"/><stop offset="1" stopColor="#f55400"/></linearGradient></defs><path fill="url(#brandGradient)" d="M3 26C11 10 30 5 49 2 35 12 24 25 17 43 12 39 7 33 3 26Z"/><path fill="#fff" d="M25 24 39 12 31 32Z"/><path fill="#ff8200" d="m28 37 8-7 5 15H25Z"/></svg><span>PRIMAX<small>Siempre Más.</small></span></div>;
}

export default function LandingPage() {
  return <div className="simple-landing"><div className="simple-landing-arcs" aria-hidden="true"/><header><Logo/></header><main><div className="simple-landing-copy"><h1>DESCRIPTIVO DE<br/>PUESTO</h1><Link to="/menu">Ingresar</Link></div><img src={`${import.meta.env.BASE_URL}images/hero-person.svg`} alt="Ilustración de una colaboradora con su laptop"/></main><span className="simple-version">V.1.4 · Prototipo</span></div>;
}
