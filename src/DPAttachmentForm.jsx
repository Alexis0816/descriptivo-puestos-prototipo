import React, { useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ChevronDown, FileText, Paperclip, UploadCloud, X } from 'lucide-react';
import { catalog } from './data';
import { isActiveDP } from './dpSchema';
import './dp-attachment.css';

const fields = [
  ['gerencia', 'Gerencia'], ['area', 'Área'],
  ['uo', 'Unidad Organizativa (UO)'], ['posicion', 'Posición'],
];
const unique = values => [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, 'es'));

export default function DPAttachmentForm({ documents, onSave, Shell }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const record = documents.find(doc => String(doc.id) === id);
  const [position, setPosition] = useState(() => Object.fromEntries(fields.map(([key]) => [key, record?.[key] || ''])));
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  if (!record || !isActiveDP(record)) return <Shell><div className="panel missing-doc"><h2>{record ? 'Este puesto está inactivo' : 'Puesto no encontrado'}</h2><p>{record ? 'Los registros históricos están disponibles solo para consulta.' : 'Vuelve a Consultar para seleccionar un puesto.'}</p><Link className="btn btn-primary" to={record ? '/inactivos' : '/consultar'}>Volver</Link></div></Shell>;

  const positions = [...catalog, ...documents.filter(isActiveDP)];
  const change = (index, value) => setPosition(previous => ({ ...previous, [fields[index][0]]: value,
    ...Object.fromEntries(fields.slice(index + 1).map(([key]) => [key, ''])),
  }));
  const chooseFile = files => {
    if (files.length !== 1) { setError('Selecciona un solo archivo para actualizar el descriptivo.'); return; }
    if (!files[0].size) { setError('El archivo está vacío. Selecciona otro archivo.'); return; }
    setFile(files[0]);
    setError('');
    if (inputRef.current) inputRef.current.value = '';
  };
  const removeFile = () => { setFile(null); setError(''); if (inputRef.current) inputRef.current.value = ''; };
  const ready = fields.every(([key]) => position[key]) && Boolean(file);
  const update = event => {
    event.preventDefault();
    if (!ready) return;
    const today = new Date().toISOString().slice(0, 10);
    onSave({ ...record, ...position, tituloPuesto: position.posicion, estado: 'Completo', fecha: today, anio: today.slice(0, 4),
      adjunto: { nombre: file.name, tipo: file.type, tamano: file.size },
    });
    navigate('/consultar', { state: { saved: true, message: 'Actualización simulada. El archivo no se ha enviado a SharePoint.' } });
  };

  return <Shell><div className="attachment-page">
    <div className="page-heading attachment-heading"><div><span className="eyebrow">ACTUALIZAR DESCRIPTIVO</span><h1>Editar descriptivo</h1><p>Selecciona el puesto y adjunta la nueva versión de su descriptivo.</p></div><Link to="/consultar" className="btn btn-outline"><ArrowLeft size={17}/> Volver a Consultar</Link></div>
    <form className="panel attachment-form" onSubmit={update}>
      <div className="attachment-body">
        <section aria-labelledby="position-heading"><h2 className="attachment-section-title" id="position-heading">Datos principales</h2><div className="attachment-position-grid">
          {fields.map(([key, label], index) => {
            const options = unique(positions.filter(item => fields.slice(0, index).every(([parent]) => item[parent] === position[parent])).map(item => item[key]));
            return <label className="field" key={key}><span className="field-label">{label}</span><span className="select-wrap"><select required value={position[key]} disabled={index > 0 && !position[fields[index - 1][0]]} onChange={event => change(index, event.target.value)}><option value="">Selecciona {label.toLocaleLowerCase('es')}</option>{options.map(option => <option key={option} value={option}>{option}</option>)}</select><ChevronDown size={18}/></span></label>;
          })}
        </div></section>
        <section className="attachment-section" aria-labelledby="attachment-heading"><h2 className="attachment-section-title" id="attachment-heading">Adjunto</h2><p id="attachment-help">Aquí debes subir el archivo que contiene el nuevo descriptivo de puesto.</p>
          <div className={`attachment-dropzone ${dragging ? 'attachment-dragging' : ''}`} onDragOver={event => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={event => { event.preventDefault(); setDragging(false); chooseFile(event.dataTransfer.files); }}>
            <input ref={inputRef} id="replacement-file" type="file" className="attachment-file-input" aria-label="Adjuntar nuevo descriptivo" aria-describedby="attachment-help attachment-feedback" onChange={event => { if (event.target.files.length) chooseFile(event.target.files); }}/>
            {file ? <div className="attachment-selected"><span className="attachment-file-icon"><FileText size={25}/></span><div><strong>{file.name}</strong><small>{new Intl.NumberFormat('es', { maximumFractionDigits: 1 }).format(file.size / 1024)} KB · Archivo seleccionado</small></div><button type="button" className="attachment-remove" aria-label="Quitar archivo adjunto" onClick={removeFile}><X size={18}/></button></div>
              : <><UploadCloud size={31} aria-hidden="true"/><strong>Arrastra aquí el nuevo descriptivo</strong><span>o selecciona un archivo de tu equipo</span></>}
            <button type="button" className="btn btn-outline attachment-browse" onClick={() => inputRef.current?.click()}><Paperclip size={16}/>{file ? 'Cambiar archivo' : 'Adjuntar un archivo'}</button>
          </div>
          <p id="attachment-feedback" className={error ? 'attachment-error' : 'attachment-hint'} role={error ? 'alert' : 'status'}>{error || (file ? 'Archivo listo para simular la actualización.' : 'Falta el adjunto. Selecciona un archivo para habilitar Actualizar.')}</p>
        </section>
      </div>
      <div className="attachment-footer"><p>Demostración: el archivo no se enviará a SharePoint ni se iniciará una aprobación.</p><div><Link to="/consultar" className="btn btn-outline">Cancelar</Link><button type="submit" className="btn btn-primary" disabled={!ready}>Actualizar</button></div></div>
    </form>
  </div></Shell>;
}
