import React from 'react';
import { Archive, ArrowRight, BookOpen, Check, ChevronDown, FileDown, FilePlus2, FileText, Paperclip, Pencil, Search } from 'lucide-react';

const choices = ['Gerencia Corp. de Recursos Humanos', 'Compensaciones', 'Compensaciones', 'Analista de compensaciones'];
function Fields() {
  return <div className="guide-visual-fields">{['Gerencia', 'Área', 'Unidad Organizativa', 'Posición'].map((label, i) => <div key={label}><small>{label}</small><span>{choices[i]}<ChevronDown size={13}/></span></div>)}</div>;
}
function Results({ history = false }) {
  return <><div className="guide-visual-search"><Search size={13}/> {history ? 'Buscar descriptivo histórico' : 'Buscar por nombre de la posición'}</div><div className="guide-visual-table"><div><b>Posición</b><b>{history ? 'Año' : 'Estado'}</b><b>Archivo</b></div>{['Analista de compensaciones', 'Jefe de compensaciones', 'Practicante preprofesional'].slice(0, history ? 2 : 3).map((name, i) => <div key={name}><span>{name}</span><span>{history ? String(2024 - i) : i === 2 ? 'Faltante' : 'Completo'}</span><span>{history || i < 2 ? <FileDown size={17}/> : <FilePlus2 size={17}/>} {!history && <Pencil size={15}/>}</span></div>)}</div></>;
}
export default function GuideVisual({ variant }) {
  return <div className={`guide-visual guide-visual-${variant}`} aria-hidden="true"><div className="guide-visual-bar"><strong>PRIMAX</strong><i/><span>{variant === 'history' ? 'HISTORIAL DE DESCRIPTIVOS' : 'DESCRIPTIVO DE PUESTOS'}</span></div><div className="guide-visual-surface">
    {variant === 'menu' && <><h4>¿Qué necesitas hacer?</h4><div className="guide-visual-menu">{[[FilePlus2, 'Registrar DP'], [Search, 'Consultar'], [Archive, 'Historial'], [BookOpen, 'Guía']].map(([Icon, label]) => <div key={label}><Icon size={25}/><strong>{label}</strong><ArrowRight size={16}/></div>)}</div></>}
    {['structure', 'form', 'directory', 'history', 'upload'].includes(variant) && <Fields/>}
    {variant === 'structure' && <div className="guide-visual-sequence">Gerencia <ArrowRight size={14}/> Área <ArrowRight size={14}/> UO <ArrowRight size={14}/> Posición</div>}
    {variant === 'form' && <div className="guide-visual-form"><small>Descripción del puesto</small><div><span>Misión y propósito</span><p>Analizar la información del área para facilitar el seguimiento de sus resultados.</p></div><div><span>Contexto y requisitos</span><p>Describe las relaciones, el alcance y los conocimientos necesarios.</p></div></div>}
    {['directory', 'history'].includes(variant) && <Results history={variant === 'history'}/>}
    {variant === 'upload' && <div className="guide-visual-upload"><Paperclip size={25}/><strong>Nuevo descriptivo de puesto</strong><span>Seleccionar archivo</span><small>Revisa el documento antes de enviarlo.</small></div>}
    {variant === 'results' && <div className="guide-visual-results"><h4>Principales responsabilidades</h4><div><b>Acción + función</b><b>Resultado final esperado</b></div>{[['Analizar los indicadores del área', 'Facilitar el seguimiento de resultados'], ['Coordinar la preparación de reportes', 'Disponer de información consistente'], ['Revisar los datos del proceso', 'Contribuir a la calidad de la información']].map(([action, result]) => <div key={action}><span>{action}</span><span>{result}</span></div>)}</div>}
    {variant === 'actions' && <div className="guide-visual-actions">{[[FileDown, 'Descargar', 'Recupera el DP disponible'], [FilePlus2, 'Registrar DP', 'Abre el formulario del puesto'], [Pencil, 'Actualizar', 'Adjunta una nueva versión']].map(([Icon, title, text]) => <div key={title}><Icon size={30}/><strong>{title}</strong><span>{text}</span></div>)}</div>}
    {variant === 'approval' && <div className="guide-visual-flow">{[[FileText, 'Preparar', 'Completa y revisa'], [ArrowRight, 'Enviar', 'Inicia la solicitud'], [Check, 'Revisar', 'Atiende la aprobación'], [FileDown, 'Consultar', 'Comprueba el resultado']].map(([Icon, title, text], i) => <div key={title}><span>{i + 1}</span><Icon size={24}/><strong>{title}</strong><small>{text}</small></div>)}</div>}
    {variant === 'transition' && <div className="guide-visual-transition"><div><Search size={27}/><strong>Consultar</strong><span>Combinación activa</span><small>DP completo disponible</small></div><ArrowRight size={28}/><div><Archive size={27}/><strong>Historial</strong><span>Fuera del catálogo activo</span><small>DP completo conservado</small></div><p>La vista cambia después de actualizar la información.</p></div>}
  </div></div>;
}
