import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronDown, Lightbulb } from 'lucide-react';
import { guideSections } from './data';
import GuideExtras from './GuideExtras.jsx';

const lessons = guideSections.flatMap((section, sectionIndex) =>
  section.lessons.map(lesson => ({ ...lesson, section: section.title, sectionIndex }))
);

export default function GuidePage({ Shell }) {
  const [current, setCurrent] = useState(0);
  const bodyRef = useRef(null);
  const lesson = lessons[current];
  const section = guideSections[lesson.sectionIndex];
  const sectionStart = lessons.findIndex(item => item.sectionIndex === lesson.sectionIndex);
  const selectLesson = index => {
    setCurrent(index);
    bodyRef.current?.scrollTo({ top: 0 });
  };

  return <Shell><div className="guide-workspace">
    <header className="guide-workspace-heading"><div><span className="eyebrow">CENTRO DE AYUDA</span><h1>Guía de descriptivos</h1><p>Aprende a tu ritmo, sin salir de tu espacio de trabajo.</p></div></header>

    <div className="panel guide-workspace-panel"><div className="guide-workspace-nav"><nav className="guide-section-tabs" aria-label="Secciones de la guía">{guideSections.map((item, index) => <button type="button" key={item.title} className={lesson.sectionIndex === index ? 'guide-section-active' : ''} onClick={() => selectLesson(lessons.findIndex(entry => entry.sectionIndex === index))}>{item.title}</button>)}</nav><span className="guide-nav-divider"/><label className="guide-lesson-select"><span>Lección</span><span className="select-wrap"><select value={current} onChange={e => selectLesson(Number(e.target.value))} aria-label="Ir a la lección de esta sección">{section.lessons.map((item, index) => <option key={item.title} value={sectionStart + index}>{String(sectionStart + index + 1).padStart(2, '0')} · {item.title}</option>)}</select><ChevronDown size={15}/></span></label></div>

    <div className="guide-workspace-body" ref={bodyRef}><div className="guide-workspace-content"><div className="guide-meta"><span>{lesson.section}</span><span className="meta-dot"/> {lesson.duration} de lectura <span className="meta-dot"/> Lección {current + 1} de {lessons.length}</div><h2>{lesson.title}<span>.</span></h2><p className="guide-subtitle">{lesson.subtitle}</p><p className="guide-intro">{lesson.text}</p>
      {lesson.kind ? <GuideExtras key={lesson.title} kind={lesson.kind}/> : <div className="guide-highlight"><span><Lightbulb size={23}/></span><div><strong>Una idea para empezar</strong><p>Conoce la intención de este paso y aplica las recomendaciones a tu propio descriptivo.</p></div></div>}
      <div className="guide-tips"><div className="guide-tips-title"><span><CheckCircle2 size={20}/></span><h3>Qué debes recordar</h3></div>{lesson.bullets.map((bullet, index) => <div className="guide-tip" key={bullet}><span>{String(index + 1).padStart(2, '0')}</span><p>{bullet}</p></div>)}</div>
    </div></div>

    <footer className="guide-workspace-footer"><button type="button" className="btn btn-outline" onClick={() => selectLesson(Math.max(0, current - 1))} disabled={current === 0}><ArrowLeft size={17}/> Anterior</button><span>{String(current + 1).padStart(2, '0')} <b>/ {String(lessons.length).padStart(2, '0')}</b></span><button type="button" className="btn btn-primary" onClick={() => selectLesson(Math.min(lessons.length - 1, current + 1))} disabled={current === lessons.length - 1}>Siguiente <ArrowRight size={17}/></button></footer></div>
  </div></Shell>;
}
