import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, FileText, Pencil, Printer } from 'lucide-react';
import { isActiveDP, normalizeDP } from './dpSchema';

function InfoSection({ title, number, fields }) {
  return <section className="panel detail-section"><div className="detail-section-title"><span>{number}</span><h2>{title}</h2></div><dl>{fields.map(([label, value]) => <div key={label} className={String(value || '').length > 110 ? 'detail-wide' : ''}><dt>{label}</dt><dd>{value || 'No especificado'}</dd></div>)}</dl></section>;
}

function PairSection({ title, number, rows, labels }) {
  return <section className="panel detail-section"><div className="detail-section-title"><span>{number}</span><h2>{title}</h2></div><div className="detail-pairs">{rows.map((row, index) => <div key={index} className="detail-pair"><span className="dp-pair-index">{String(index + 1).padStart(2, '0')}</span><div><small>{labels[0]}</small><p>{row[0] || 'No especificado'}</p></div><div><small>{labels[1]}</small><p>{row[1] || 'No especificado'}</p></div></div>)}</div></section>;
}

export default function DPDetail({ documents, Shell }) {
  const { id } = useParams();
  const record = documents.find(item => String(item.id) === id);
  if (!record) return <Shell><div className="panel missing-doc"><h2>Descriptivo no encontrado</h2><Link to="/menu" className="btn btn-primary">Volver al menú</Link></div></Shell>;
  const dp = normalizeDP(record);
  const active = isActiveDP(dp);
  return <Shell><div className="page-heading"><div><span className="eyebrow">{active ? 'DOCUMENTO DEL PUESTO' : 'PUESTO INACTIVO · HISTÓRICO'}</span><h1>{dp.tituloPuesto || dp.posicion}</h1><p>{dp.area} · {dp.uo}</p></div><div className="page-actions"><Link className="btn btn-outline" to={active ? '/consultar' : '/inactivos'}><ArrowLeft size={17}/> Volver</Link><button className="btn btn-outline" onClick={() => window.print()}><Printer size={17}/> Imprimir / PDF</button>{active && <Link className="btn btn-primary" to={`/editar/${id}`}><Pencil size={17}/> Editar</Link>}</div></div>
    <div className="detail-layout"><div className="detail-main">
      <InfoSection title="Datos generales" number="01" fields={[
        ['Gerencia', dp.gerencia], ['Área', dp.area], ['Unidad organizativa', dp.uo],
        ['Posición', dp.posicion], ['Título de puesto', dp.tituloPuesto], ['Preparada por', dp.preparadaPor],
        ['Localización', dp.localizacion], ['Fecha', dp.fecha], ['Dependencia jerárquica', dp.dependenciaJerarquica],
        ['Dependencia funcional', dp.dependenciaFuncional], ['Propósito del puesto', dp.proposito],
      ]}/>
      <PairSection title="Principales resultados" number="02" rows={dp.resultados.map(row => [row.accion, row.resultado])} labels={['Acción · ¿Qué hace?', 'Resultado final · ¿Para qué lo hace?']}/>
      <InfoSection title="Objetivos y resultados esperados" number="03" fields={dp.objetivos.map((value, i) => [`Objetivo ${i + 1}`, value])}/>
      <InfoSection title="Dimensiones" number="04" fields={[["Principales magnitudes", dp.principalesMagnitudes], ['Recursos asignados', dp.recursosAsignados]]}/>
      <PairSection title="Autoridad" number="05" rows={dp.autoridad.map(row => [row.decision, row.recomendacion])} labels={['Decisión', 'Recomendación']}/>
      <InfoSection title="Organización y contexto" number="06" fields={[
        ['Gerencia N1', dp.gerenciaN1], ['Gerencia N2', dp.gerenciaN2], ['Jefe directo', dp.jefeDirecto],
        ['Posición DP', dp.posicionDP], ['Contexto', dp.contexto],
      ]}/>
      <InfoSection title="Experiencia y competencias" number="07" fields={[
        ['Experiencia', dp.experiencia], ['Formación académica', dp.formacion],
        ['Conocimientos / habilidades técnicas', dp.conocimientos], ['Competencias', dp.competencias],
      ]}/>
    </div><aside className="detail-aside"><div className="panel detail-summary"><span className="eyebrow">RESUMEN</span><div className="detail-large-icon"><FileText size={28}/></div><h3>{dp.posicion}</h3><span className={`status status-${active ? 'complete' : 'inactive'}`}><span/>{active ? 'Puesto activo' : 'Puesto inactivo'}</span><span className={`status status-${dp.estado === 'Completo' ? 'complete' : 'draft'}`}><span/>{dp.estado}</span><hr/><div><span>País</span><strong>{dp.pais}</strong></div><div><span>Año</span><strong>{dp.anio}</strong></div><div><span>Última actualización</span><strong>{dp.fecha}</strong></div></div></aside></div>
  </Shell>;
}
