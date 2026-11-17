import React, { useState } from 'react';
import { Check, ClipboardCopy, Info, Lightbulb, ShieldAlert } from 'lucide-react';
import { buildPrompt, promptDefaults, validatePrompt } from './guidePrompt';

const examples = [
  ['Planificar la producción anual y mensual de la planta.', 'Garantizar los volúmenes requeridos de cada producto.'],
  ['Planificar y solicitar la compra de materia prima y material de empaque necesarios para la elaboración de los productos.', 'Asegurar la disponibilidad de los insumos.'],
  ['Coordinar y controlar la ejecución de las diferentes fases del proceso de fabricación.', 'Garantizar los niveles de producción, los estándares de calidad y los costos previstos.'],
  ['Dirigir y controlar el mantenimiento preventivo y correctivo.', 'Garantizar que los equipos de la planta se encuentren en condiciones de funcionamiento.'],
];

const verbGroups = [
  { name: 'Ejecutivos', sub: 'Dirección y estrategia', verbs: ['Dirigir', 'Planear', 'Determinar', 'Establecer', 'Asesorar', 'Autorizar'] },
  { name: 'Mandos medios', sub: 'Gestión y coordinación', verbs: ['Administrar', 'Evaluar', 'Controlar', 'Diseñar', 'Estandarizar', 'Supervisar'] },
  { name: 'Contribuidores individuales', sub: 'Ejecución y análisis', verbs: ['Ejecutar', 'Proporcionar', 'Animar', 'Calcular', 'Informar', 'Revisar'] },
];

function PromptBuilder() {
  const [values, setValues] = useState(promptDefaults);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const update = (key, value) => { setValues(previous => ({ ...previous, [key]: value })); setCopied(false); setError(''); };
  const prompt = buildPrompt(values);
  const copy = async () => {
    const validation = validatePrompt(values);
    if (validation) { setError(validation); return; }
    try { await navigator.clipboard.writeText(prompt); setCopied(true); } catch { setError('No se pudo copiar automáticamente. Selecciona el texto de la vista previa para copiarlo.'); }
  };
  return <div className="guide-extra prompt-extra"><div className="prompt-layout"><div className="prompt-form"><h3>Completa el contexto</h3><div className="prompt-fields">
    <label>Puesto<input value={values.puesto} onChange={e => update('puesto', e.target.value)} placeholder="Ej. Analista de compensaciones"/></label>
    <label>Área<input value={values.area} onChange={e => update('area', e.target.value)} placeholder="Ej. Compensaciones"/></label>
    <label>Sector / rubro<input value={values.sector} onChange={e => update('sector', e.target.value)} placeholder="Ej. energía y retail"/></label>
    <label>Cliente interno <small>opcional</small><input value={values.cliente} onChange={e => update('cliente', e.target.value)} placeholder="Ej. líderes de las áreas"/></label>
    <label className="prompt-wide">Descripción general de la empresa<textarea rows={2} value={values.empresa} onChange={e => update('empresa', e.target.value)} placeholder="Describe el contexto del negocio sin datos confidenciales."/></label>
    <label className="prompt-wide">Funciones principales <small>mínimo 4, una por línea</small><textarea rows={5} value={values.funciones} onChange={e => update('funciones', e.target.value)} placeholder={'Analizar indicadores de compensación\nCoordinar revisiones salariales\nElaborar reportes de gestión\nAsesorar a líderes de área'}/></label>
    <label>Mínimo de palabras de la misión<input type="number" min="1" step="1" value={values.minimo} onChange={e => update('minimo', e.target.value)}/></label>
    <label>Máximo de palabras de la misión<input type="number" min="1" step="1" value={values.maximo} onChange={e => update('maximo', e.target.value)}/></label>
    <label>Responsabilidades<input type="number" min="1" step="1" value={values.cantidad} onChange={e => update('cantidad', e.target.value)}/></label>
    <label>Opciones de respuesta<input type="number" min="1" step="1" value={values.opciones} onChange={e => update('opciones', e.target.value)}/></label>
  </div><button className="btn btn-primary" type="button" onClick={copy}>{copied ? <Check size={16}/> : <ClipboardCopy size={16}/>} {copied ? 'Prompt copiado' : 'Copiar prompt'}</button>{error && <p className="prompt-error" role="alert">{error}</p>}</div><div className="prompt-preview"><span>VISTA PREVIA DEL PROMPT</span><pre tabIndex={0} aria-label="Texto del prompt para copiar">{prompt}</pre></div></div><div className="guide-safety"><ShieldAlert size={18}/><span>Este botón solo copia texto. Revisa los datos y utiliza una herramienta autorizada antes de compartir información.</span></div></div>;
}

export default function GuideExtras({ kind }) {
  if (kind === 'method') return <div className="guide-extra"><div className="method-formula"><span><strong>¿QUÉ?</strong><small>Acción en infinitivo</small></span><b>+</b><span><strong>¿DÓNDE O EN QUÉ?</strong><small>Proceso o ámbito</small></span><b>+</b><span><strong>¿PARA QUÉ?</strong><small>Resultado esperado</small></span></div><div className="method-example"><Lightbulb size={20}/><div><strong>Ejemplo</strong><p>“<b>Planificar</b> la producción anual de la planta <b>para garantizar</b> los volúmenes requeridos de cada producto.”</p></div></div></div>;
  if (kind === 'verbs') return <div className="guide-extra verb-grid">{verbGroups.map(group => <div className="verb-card" key={group.name}><small>{group.sub}</small><h3>{group.name}</h3><div>{group.verbs.map(verb => <span key={verb}>{verb}</span>)}</div></div>)}</div>;
  if (kind === 'example') return <div className="guide-extra"><div className="example-title"><span>CASO DE REFERENCIA</span><h3>Gerente de planta</h3><p>Ejemplo de acción y resultado final, ordenados por importancia.</p></div><div className="example-table"><div className="example-table-head"><span>IMPORTANCIA</span><span>ACCIÓN · ¿QUÉ HACE Y DÓNDE?</span><span>RESULTADO · ¿PARA QUÉ?</span></div>{examples.map(([action, result], index) => <div className="example-table-row" key={action}><span>{String(index + 1).padStart(2, '0')}</span><p>{action}</p><p>{result}</p></div>)}</div></div>;
  if (kind === 'prompt') return <PromptBuilder/>;
  if (kind === 'promptStructure') return <div className="guide-extra prompt-structure"><h3>De la solicitud al formato de respuesta</h3>{[['1','Tarea','Redacta la misión y las principales responsabilidades.'],['2','Contexto','Indica puesto, área, sector, empresa y funciones reales.'],['3','Ejemplo','Aporta una referencia genérica de acción y resultado.'],['4','Rol','Solicita el enfoque de un especialista en descripción de puestos.'],['5','Formato','Pide una misión en una oración y una tabla con dos columnas.'],['6','Tono','Utiliza lenguaje claro, profesional y ajustado al contexto.']].map(([n,title,description]) => <div key={title}><span>{n}</span><strong>{title}</strong><small>{description}</small></div>)}</div>;
  if (kind === 'safeAI') return <div className="guide-extra"><div className="safe-ai-card"><ShieldAlert size={27}/><div><h3>Antes de copiar un prompt</h3><p>Quita los nombres, cifras, planes estratégicos y cualquier información confidencial. Usa descripciones genéricas si la herramienta externa no está aprobada para información corporativa.</p></div></div><div className="prompt-structure"><h3>La estructura que mejora el resultado</h3>{[['1','Tarea','Define qué necesitas que entregue.'],['2','Contexto','Explica el sector y el objetivo.'],['3','Ejemplo','Muestra una referencia del formato deseado.'],['4','Rol','Indica el perfil de quien debe redactar.'],['5','Formato','Pide misión y tabla de responsabilidades.'],['6','Tono','Exige claridad y profesionalismo.']].map(([n,title,description]) => <div key={title}><span>{n}</span><strong>{title}</strong><small>{description}</small></div>)}</div><div className="guide-safety"><Info size={18}/><span>La plantilla solo genera texto para copiar. Este prototipo no envía datos a ChatGPT, Copilot, Gemini ni a otros servicios.</span></div></div>;
  return null;
}
