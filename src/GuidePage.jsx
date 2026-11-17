import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, ChevronRight, Expand, Info, Search, X } from 'lucide-react';
import { guideLessons, guideScreenshots, guideSections } from './guideContent';
import GuideExtras from './GuideExtras.jsx';
import GuideVisual from './GuideVisual.jsx';

const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es');

function LessonImage({ item }) {
  const [expanded, setExpanded] = useState(false);
  const dialogRef = useRef(null);
  const image = guideScreenshots[item.id];
  useEffect(() => {
    const dialog = dialogRef.current;
    if (expanded && !dialog.open) dialog.showModal();
    else if (!expanded && dialog.open) dialog.close();
  }, [expanded]);
  const visual = image ? <img src={`${import.meta.env.BASE_URL}${image.replace(/^\/+/, '')}`} alt={item.caption}/> : <GuideVisual variant={item.variant}/>;
  return <><figure className="guide-lesson-image"><div className="guide-image-preview">{visual}</div><figcaption><span>{item.caption}</span><button type="button" onClick={() => setExpanded(true)} aria-label={`Ampliar: ${item.caption}`}><Expand size={15}/> Ampliar</button></figcaption></figure><dialog ref={dialogRef} className="guide-image-dialog" onClose={() => setExpanded(false)} onClick={event => { if (event.target === event.currentTarget) setExpanded(false); }} aria-label={item.caption}><header><strong>{item.caption}</strong><button type="button" onClick={() => setExpanded(false)} aria-label="Cerrar imagen"><X size={21}/></button></header><div>{visual}</div></dialog></>;
}

export default function GuidePage({ Shell }) {
  const [currentId, setCurrentId] = useState(guideLessons[0].id);
  const [query, setQuery] = useState('');
  const bodyRef = useRef(null);
  const tabsRef = useRef([]);
  const current = guideLessons.findIndex(item => item.id === currentId);
  const lesson = guideLessons[current];
  const section = guideSections[lesson.sectionIndex];
  const normalizedQuery = normalize(query.trim());
  const indexLessons = normalizedQuery ? guideLessons.filter(item => normalize(`${item.title} ${item.subtitle} ${item.text} ${item.section}`).includes(normalizedQuery)) : guideLessons.filter(item => item.sectionId === section.id);
  const selectLesson = id => { setCurrentId(id); bodyRef.current?.scrollTo({ top: 0 }); };
  const selectSection = index => { setQuery(''); selectLesson(guideSections[index].lessons[0].id); };
  const moveTab = (event, index) => {
    const directions = { ArrowRight: (index + 1) % guideSections.length, ArrowLeft: (index + guideSections.length - 1) % guideSections.length, Home: 0, End: guideSections.length - 1 };
    if (!(event.key in directions)) return;
    event.preventDefault();
    const next = directions[event.key];
    selectSection(next);
    tabsRef.current[next]?.focus();
  };
  return <Shell><div className="guide-workspace">
    <header className="guide-workspace-heading"><div><span className="eyebrow">CENTRO DE AYUDA</span><h1>Guía de descriptivos de puesto</h1><p>Comprende el proceso, sigue los pasos y prepara un descriptivo claro.</p></div><span className="guide-total"><BookOpen size={16}/>{guideSections.length} capítulos · {guideLessons.length} lecciones</span></header>
    <div className="panel guide-workspace-panel">
      <nav className="guide-section-tabs" role="tablist" aria-label="Capítulos de la guía">{guideSections.map((item, index) => <button ref={element => { tabsRef.current[index] = element; }} type="button" role="tab" id={`guide-tab-${item.id}`} aria-selected={section.id === item.id} aria-controls="guide-content" tabIndex={section.id === item.id ? 0 : -1} key={item.id} className={section.id === item.id ? 'guide-section-active' : ''} onClick={() => selectSection(index)} onKeyDown={event => moveTab(event, index)}><span>{String(index + 1).padStart(2, '0')}</span>{item.title}</button>)}</nav>
      <label className="guide-chapter-select">Capítulo<select value={lesson.sectionIndex} onChange={event => selectSection(Number(event.target.value))}>{guideSections.map((item, index) => <option value={index} key={item.id}>{index + 1}. {item.title}</option>)}</select></label>
      <div className="guide-reading-layout">
        <aside className="guide-chapter-index"><label className="guide-search"><Search size={16}/><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Buscar en la guía" aria-label="Buscar lecciones en toda la guía"/>{query && <button type="button" aria-label="Limpiar búsqueda de lecciones" onClick={() => setQuery('')}><X size={15}/></button>}</label><div className="guide-index-heading"><small>{normalizedQuery ? 'RESULTADOS DE BÚSQUEDA' : `CAPÍTULO ${lesson.sectionIndex + 1}`}</small><h2>{normalizedQuery ? `${indexLessons.length} lecciones` : section.title}</h2><p>{normalizedQuery ? 'Selecciona una lección para abrirla.' : section.description}</p></div><nav className="guide-subchapter-list" aria-label="Subcapítulos">{indexLessons.map(item => <button key={item.id} type="button" aria-current={item.id === currentId ? 'page' : undefined} onClick={() => selectLesson(item.id)}><span>{String(item.lessonIndex + 1).padStart(2, '0')}</span><span>{normalizedQuery && <small>{item.section}</small>}<strong>{item.title}</strong></span><ChevronRight size={15}/></button>)}{indexLessons.length === 0 && <p className="guide-index-empty" role="status">No hay lecciones con ese texto. Prueba con registrar, archivo, historial o prompt.</p>}</nav></aside>
        <div className="guide-workspace-body" ref={bodyRef} id="guide-content" role="tabpanel" aria-labelledby={`guide-tab-${section.id}`} tabIndex={0}>
          <article className="guide-workspace-content"><div className="guide-meta"><span>{section.title}</span><span className="meta-dot"/>{lesson.duration} de lectura<span className="meta-dot"/>Lección {lesson.lessonIndex + 1} de {section.lessons.length}</div><h2>{lesson.title}</h2><p className="guide-subtitle">{lesson.subtitle}</p><p className="guide-intro">{lesson.text}</p>
            {lesson.paragraphs.map(text => <p className="guide-paragraph" key={text}>{text}</p>)}
            {lesson.media && <LessonImage key={lesson.media.id} item={lesson.media}/>}
            {lesson.steps.length > 0 && <section className="guide-procedure"><h3>Paso a paso</h3><ol>{lesson.steps.map((item, index) => <li key={item.title}><span>{String(index + 1).padStart(2, '0')}</span><div><h4>{item.title}</h4><p>{item.text}</p></div></li>)}</ol></section>}
            {lesson.kind && lesson.kind !== 'prompt' && <GuideExtras key={lesson.id} kind={lesson.kind}/>}
            <div hidden={lesson.kind !== 'prompt'}><GuideExtras kind="prompt"/></div>
            {lesson.callout && <aside className="guide-callout"><Info size={21}/><div><strong>{lesson.callout.title}</strong><p>{lesson.callout.text}</p></div></aside>}
            <section className="guide-tips"><div className="guide-tips-title"><span><CheckCircle2 size={20}/></span><h3>Antes de continuar</h3></div>{lesson.bullets.map(bullet => <div className="guide-tip" key={bullet}><CheckCircle2 size={15}/><p>{bullet}</p></div>)}</section>
          </article>
        </div>
      </div>
      <footer className="guide-workspace-footer"><button type="button" className="btn btn-outline" onClick={() => selectLesson(guideLessons[current - 1].id)} disabled={current === 0}><ArrowLeft size={17}/> Anterior</button><span>{String(current + 1).padStart(2, '0')} <b>/ {String(guideLessons.length).padStart(2, '0')}</b></span><button type="button" className="btn btn-primary" onClick={() => selectLesson(guideLessons[current + 1].id)} disabled={current === guideLessons.length - 1}>Siguiente <ArrowRight size={17}/></button></footer>
    </div>
  </div></Shell>;
}
