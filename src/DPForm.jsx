import React, { useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Check, CheckCircle2, ChevronDown, ClipboardList, Download, FileCheck2, FileText, Info, Layers3, ShieldCheck, Sparkles } from 'lucide-react';
import { catalog } from './data';
import { blankDP, formSteps, isActiveDP, missingByStep, normalizeDP, OBJECTIVE_COUNT } from './dpSchema';

const unique = values => [...new Set(values.filter(Boolean))];

function Field({ label, value, onChange, placeholder, multiline = false, type = 'text', hint }) {
  return <label className="field"><span className="field-label">{label}</span>{multiline
    ? <textarea rows={3} value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder}/>
    : <input type={type} value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder}/>
  }{hint && <small className="field-hint">{hint}</small>}</label>;
}

function Select({ label, value, onChange, options, placeholder, disabled }) {
  return <label className="field"><span className="field-label">{label}</span><span className="select-wrap"><select value={value} onChange={e => onChange(e.target.value)} disabled={disabled}><option value="">{placeholder}</option>{options.map(option => <option key={option} value={option}>{option}</option>)}</select><ChevronDown size={17}/></span></label>;
}

function SectionTitle({ number, title, description, count }) {
  return <div className="dp-section-title"><span className="dp-section-number">{number}</span><div><h3>{title}{count && <span className="dp-count">{count}</span>}</h3>{description && <p>{description}</p>}</div></div>;
}

function FieldGroup({ title, children, className = '' }) {
  return <div className={`dp-field-group ${className}`}><h4>{title}</h4><div className="dp-input-grid">{children}</div></div>;
}

function PairRows({ title, description, labels, rows, fields, onChange }) {
  return <section className="dp-pair-section"><SectionTitle number={title === 'Principales resultados' ? '01' : '02'} title={title} count={`${rows.length} registros`} description={description}/>
    <div className="dp-pair-list"><div className="dp-pair-head"><span>N.º</span><span>{labels[0]}</span><span>{labels[1]}</span></div>
      {rows.map((row, index) => <div className="dp-pair-row" key={index}><span className="dp-pair-index">{String(index + 1).padStart(2, '0')}</span><label><span className="dp-mobile-label">{labels[0]}</span><textarea rows={2} value={row[fields[0]]} onChange={e => onChange(index, fields[0], e.target.value)} placeholder={title === 'Principales resultados' ? 'Ej. Planificar y coordinar…' : 'Ej. Aprobar el presupuesto…'} aria-label={`${labels[0]} ${index + 1}`}/></label><label><span className="dp-mobile-label">{labels[1]}</span><textarea rows={2} value={row[fields[1]]} onChange={e => onChange(index, fields[1], e.target.value)} placeholder={title === 'Principales resultados' ? 'Ej. Asegurar el cumplimiento…' : 'Ej. Proponer mejoras…'} aria-label={`${labels[1]} ${index + 1}`}/></label></div>)}
    </div>
  </section>;
}

export default function DPForm({ documents, onSave, edit = false, Shell }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const existing = edit ? documents.find(doc => String(doc.id) === id) : undefined;
  const [form, setForm] = useState(() => normalizeDP(existing || blankDP()));
  const [step, setStep] = useState(0);
  const [alert, setAlert] = useState('');
  const bodyRef = useRef(null);
  if (edit && !existing) return <Shell><div className="panel missing-doc"><h2>Descriptivo no encontrado</h2><Link to="/consultar" className="btn btn-primary">Volver a consultar</Link></div></Shell>;
  if (edit && !isActiveDP(existing)) return <Shell><div className="panel missing-doc"><h2>Este puesto está inactivo</h2><p>Su descriptivo histórico está disponible solo para consulta.</p><Link to={`/descriptivo/${id}`} className="btn btn-primary">Ver descriptivo</Link></div></Shell>;

  const change = (key, value) => setForm(previous => ({ ...previous, [key]: value,
    ...(key === 'gerencia' ? { area: '', uo: '', posicion: '' } : key === 'area' ? { uo: '', posicion: '' } : key === 'uo' ? { posicion: '' } : {}),
  }));
  const changeRow = (key, index, field, value) => setForm(previous => ({ ...previous,
    [key]: previous[key].map((row, i) => i === index ? { ...row, [field]: value } : row),
  }));
  const changeObjective = (index, value) => setForm(previous => ({ ...previous,
    objetivos: previous.objetivos.map((objective, i) => i === index ? value : objective),
  }));
  const goTo = index => { setStep(index); setAlert(''); bodyRef.current?.scrollTo({ top: 0 }); };
  const save = estado => {
    const saved = { ...form, id: existing?.id ?? Date.now(), estado,
      anio: form.fecha?.slice(0, 4) || String(new Date().getFullYear()),
      // Keep the original flat value available to the existing directory data shape.
      responsabilidades: form.resultados.map(row => row.accion).filter(Boolean).join('\n'),
    };
    onSave(saved);
    navigate('/menu', { state: { saved: true, estado } });
  };
  const finish = () => {
    const missing = missingByStep(form);
    const total = missing.reduce((sum, fields) => sum + fields.length, 0);
    if (total) { setAlert(`Faltan ${total} campos por completar. Revisa las secciones indicadas abajo antes de finalizar.`); return; }
    save('Completo');
  };

  const scoped = catalog.filter(item => (!form.gerencia || item.gerencia === form.gerencia) && (!form.area || item.area === form.area) && (!form.uo || item.uo === form.uo));
  const missing = missingByStep(form);
  const completed = missing.filter(group => group.length === 0).length;
  const stepIcons = [ClipboardList, FileText, Layers3, ShieldCheck, FileCheck2];
  const Icon = stepIcons[step];

  return <Shell>
    <div className="page-heading dp-form-heading"><div><span className="eyebrow">{edit ? 'ACTUALIZAR DESCRIPTIVO' : 'NUEVO DESCRIPTIVO'}</span><h1>{edit ? 'Editar descriptivo' : 'Crear un descriptivo'}</h1><p>Completa la información de la posición, paso a paso.</p></div><span className="dp-download-wrap"><button type="button" className="btn dp-download" aria-disabled="true" aria-describedby="dp-download-hint" title="Disponible para descarga próximamente en Power Apps"><Download size={17}/> Descargar formato DP <span>Próximamente</span></button><span id="dp-download-hint" className="dp-download-tooltip" role="tooltip">En Power Apps podrás descargar el formato de descriptivo de puesto.</span></span></div>
    <div className="dp-wizard"><div className="panel dp-wizard-main"><div className="dp-wizard-top"><div className="dp-wizard-top-label"><span className="eyebrow">PASO {String(step + 1).padStart(2, '0')} DE {String(formSteps.length).padStart(2, '0')}</span><span>{completed} de {formSteps.length} secciones completas</span></div><span className="dp-wizard-percentage">{Math.round((step + 1) / formSteps.length * 100)}% del recorrido</span></div><nav className="dp-horizontal-steps" aria-label="Pasos del descriptivo">{formSteps.map((item, i) => <button type="button" key={item.title} aria-label={`Paso ${i + 1}: ${item.title}`} aria-current={i === step ? 'step' : undefined} className={`dp-horizontal-step ${i === step ? 'dp-horizontal-step-active' : ''} ${missing[i].length === 0 ? 'dp-horizontal-step-done' : ''}`} onClick={() => goTo(i)}><span className="dp-horizontal-step-icon">{missing[i].length === 0 ? <Check size={15}/> : String(i + 1).padStart(2, '0')}</span><span className="dp-horizontal-step-copy"><strong>{item.title}</strong><small>{item.detail}</small></span></button>)}</nav><div className="dp-wizard-progress"><div style={{ width: `${(step + 1) / formSteps.length * 100}%` }}/></div>
    <div className="dp-wizard-body" ref={bodyRef}><div className="dp-step-heading"><span className="dp-heading-icon"><Icon size={24}/></span><div><h2>{formSteps[step].title}</h2><p>{['Empecemos por la identidad y ubicación del puesto.', 'Describe sus acciones, resultados y objetivos más importantes.', 'Dimensiona los recursos y define el nivel de autonomía.', 'Ubica las relaciones de reporte y el entorno de trabajo.', 'Define los requisitos y verifica que todo esté listo.'][step]}</p></div></div>
    {alert && <div role="alert" className="dp-alert"><Info size={18}/><span>{alert}</span><button type="button" onClick={() => setAlert('')} aria-label="Cerrar aviso">×</button></div>}

    {step === 0 && <><FieldGroup title="ESTRUCTURA ORGANIZATIVA"><Select label="Gerencia" value={form.gerencia} onChange={v => change('gerencia', v)} options={unique(catalog.map(item => item.gerencia))} placeholder="Selecciona la gerencia"/><Select label="Área" value={form.area} onChange={v => change('area', v)} options={unique(scoped.map(item => item.area))} placeholder="Selecciona el área" disabled={!form.gerencia}/><Select label="Unidad organizativa (UO)" value={form.uo} onChange={v => change('uo', v)} options={unique(scoped.map(item => item.uo))} placeholder="Selecciona la unidad" disabled={!form.area}/><Select label="Posición" value={form.posicion} onChange={v => change('posicion', v)} options={unique(scoped.map(item => item.posicion))} placeholder="Selecciona la posición" disabled={!form.uo}/></FieldGroup><FieldGroup title="DATOS GENERALES"><Field label="Título de puesto" value={form.tituloPuesto} onChange={v => change('tituloPuesto', v)} placeholder="Título que aparecerá en el documento"/><Field label="Preparada por" value={form.preparadaPor} onChange={v => change('preparadaPor', v)} placeholder="Nombre de quien lo elabora"/><Field label="Localización" value={form.localizacion} onChange={v => change('localizacion', v)} placeholder="Ej. Lima, Perú"/><Field label="Fecha" type="date" value={form.fecha} onChange={v => change('fecha', v)}/><Field label="Dependencia jerárquica" value={form.dependenciaJerarquica} onChange={v => change('dependenciaJerarquica', v)} placeholder="¿A qué puesto reporta?"/><Field label="Dependencia funcional" value={form.dependenciaFuncional} onChange={v => change('dependenciaFuncional', v)} placeholder="¿Con qué área se relaciona?"/><div className="dp-full"><Field label="Propósito del puesto" value={form.proposito} onChange={v => change('proposito', v)} multiline placeholder="Explica por qué existe el puesto y qué impacto genera…" hint="Comienza con un verbo de acción y enfócate en el resultado."/></div></FieldGroup></>}

    {step === 1 && <><div className="dp-writing-tip"><BookOpen size={18}/><span><strong>Una fórmula útil:</strong> ¿Qué hace? + ¿Dónde o en qué actúa? + ¿Para qué? Usa verbos en infinitivo.</span></div><PairRows title="Principales resultados" description="Por cada acción, describe el resultado final esperado. Ordena del más importante al menos importante." labels={['Acción · ¿Qué hace?', 'Resultado final · ¿Para qué lo hace?']} fields={['accion', 'resultado']} rows={form.resultados} onChange={(i, field, value) => changeRow('resultados', i, field, value)}/><section className="dp-objectives"><SectionTitle number="02" title="Objetivos y resultados esperados" count={`${OBJECTIVE_COUNT} objetivos`} description="Resume los compromisos principales del puesto en frases concretas."/><div className="dp-objective-list">{form.objetivos.map((objective, i) => <label className="dp-objective-row" key={i}><span className="dp-pair-index">{String(i + 1).padStart(2, '0')}</span><input value={objective} onChange={e => changeObjective(i, e.target.value)} placeholder={`Objetivo ${i + 1} · Ej. Mejorar la eficiencia del proceso…`} aria-label={`Objetivo ${i + 1}`}/></label>)}</div></section></>}

    {step === 2 && <><FieldGroup title="DIMENSIONES" className="dp-dimensions"><div className="dp-full"><Field multiline label="Principales magnitudes" value={form.principalesMagnitudes} onChange={v => change('principalesMagnitudes', v)} placeholder="Presupuesto, volumen de operación, indicadores o alcance del puesto…"/></div><div className="dp-full"><Field multiline label="Recursos asignados" value={form.recursosAsignados} onChange={v => change('recursosAsignados', v)} placeholder="Equipos, personas, herramientas o recursos bajo su responsabilidad…"/></div></FieldGroup><PairRows title="Autoridad" description="Distingue las decisiones que toma el puesto de las recomendaciones que propone." labels={['Decisión', 'Recomendación']} fields={['decision', 'recomendacion']} rows={form.autoridad} onChange={(i, field, value) => changeRow('autoridad', i, field, value)}/></>}

    {step === 3 && <><FieldGroup title="ORGANIZACIÓN"><Field label="Gerencia N1" value={form.gerenciaN1} onChange={v => change('gerenciaN1', v)} placeholder="Gerencia de primer nivel"/><Field label="Gerencia N2" value={form.gerenciaN2} onChange={v => change('gerenciaN2', v)} placeholder="Gerencia de segundo nivel"/><Field label="Jefe directo" value={form.jefeDirecto} onChange={v => change('jefeDirecto', v)} placeholder="Posición a la que reporta"/><Field label="Posición DP" value={form.posicionDP} onChange={v => change('posicionDP', v)} placeholder="Posición en el descriptivo"/></FieldGroup><FieldGroup title="CONTEXTO"><div className="dp-full"><Field label="Entorno del puesto" multiline value={form.contexto} onChange={v => change('contexto', v)} placeholder="Describe aspectos relevantes del entorno, problemas, participación en comités y contactos internos o externos…"/></div></FieldGroup></>}

    {step === 4 && <><FieldGroup title="REQUISITOS DEL PUESTO" className="dp-profile-fields"><div className="dp-full"><Field multiline label="Experiencia" value={form.experiencia} onChange={v => change('experiencia', v)} placeholder="Años, tipos de funciones o sectores relevantes…"/></div><div className="dp-full"><Field multiline label="Formación académica" value={form.formacion} onChange={v => change('formacion', v)} placeholder="Estudios y especializaciones requeridos…"/></div><div className="dp-full"><Field multiline label="Conocimientos / habilidades técnicas" value={form.conocimientos} onChange={v => change('conocimientos', v)} placeholder="Herramientas, metodologías e idiomas…"/></div><div className="dp-full"><Field multiline label="Competencias" value={form.competencias} onChange={v => change('competencias', v)} placeholder="Habilidades y comportamientos para tener éxito en la posición…"/></div></FieldGroup><div className="dp-review"><div className="dp-review-head"><CheckCircle2 size={22}/><div><h3>Revisión final</h3><p>Completa todas las secciones antes de marcar el descriptivo como completo.</p></div></div><div className="dp-review-list">{formSteps.map((item, i) => <button type="button" key={item.title} onClick={() => goTo(i)} className={missing[i].length === 0 ? 'dp-review-done' : 'dp-review-pending'}><span>{missing[i].length === 0 ? <Check size={15}/> : String(i + 1).padStart(2, '0')}</span><strong>{item.title}</strong><small>{missing[i].length === 0 ? 'Completa' : `${missing[i].length} ${missing[i].length === 1 ? 'campo pendiente' : 'campos pendientes'}`}</small><ArrowRight size={16}/></button>)}</div>{missing.every(group => group.length === 0) && <div className="dp-review-success"><CheckCircle2 size={18}/> Toda la información está lista para finalizar.</div>}</div></>}
    </div><div className="dp-wizard-footer"><div>{step > 0 && <button type="button" className="btn btn-outline" onClick={() => goTo(step - 1)}><ArrowLeft size={17}/> Anterior</button>}</div><div>{step < formSteps.length - 1 ? <button type="button" className="btn btn-primary" onClick={() => goTo(step + 1)}>Continuar <ArrowRight size={17}/></button> : <button type="button" className="btn btn-primary" onClick={finish}>Finalizar descriptivo <Check size={17}/></button>}</div></div>
    </div></div>
  </Shell>;
}
