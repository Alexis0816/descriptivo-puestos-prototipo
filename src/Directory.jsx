import React, { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronDown, FileDown, FilePlus2, FilterX, Info, Pencil, RotateCcw, Search, X } from 'lucide-react';
import { isActiveDP } from './dpSchema';

const unique = list => [...new Set(list.filter(Boolean))].sort((a, b) => a.localeCompare(b, 'es'));
const statusLabel = doc => doc.estado === 'Completo' ? 'Completo' : 'Faltante';

function FilterSelect({ label, value, options, onChange, placeholder, disabled }) {
  return <label className="field"><span className="field-label">{label}</span><span className="select-wrap"><select value={value} onChange={event => onChange(event.target.value)} disabled={disabled}><option value="">{placeholder}</option>{options.map(option => <option key={option} value={option}>{option}</option>)}</select><ChevronDown size={16}/></span></label>;
}

export default function Directory({ documents, Shell, inactive = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [filters, setFilters] = useState({ gerencia: '', area: '', uo: '', posicion: '' });
  const [query, setQuery] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [downloadNotice, setDownloadNotice] = useState(null);
  const visibleDocuments = useMemo(() => documents.filter(doc => inactive ? !isActiveDP(doc) && statusLabel(doc) === 'Completo' : isActiveDP(doc)), [documents, inactive]);
  const scoped = visibleDocuments.filter(doc => (!filters.gerencia || doc.gerencia === filters.gerencia) && (!filters.area || doc.area === filters.area) && (!filters.uo || doc.uo === filters.uo));
  const normalized = query.trim().toLocaleLowerCase('es');
  const results = visibleDocuments.filter(doc => Object.entries(filters).every(([key, value]) => !value || doc[key] === value)
    && (!selectedStatuses.length || selectedStatuses.includes(statusLabel(doc)))
    && (!normalized || [doc.posicion, doc.tituloPuesto, doc.area, doc.uo, doc.gerencia].some(value => value?.toLocaleLowerCase('es').includes(normalized))));
  const complete = visibleDocuments.filter(doc => statusLabel(doc) === 'Completo').length;
  const missing = visibleDocuments.length - complete;
  const setFilter = (field, value) => setFilters(previous => ({ ...previous, [field]: value,
    ...(field === 'gerencia' ? { area: '', uo: '', posicion: '' } : field === 'area' ? { uo: '', posicion: '' } : field === 'uo' ? { posicion: '' } : {}),
  }));
  const toggleStatus = value => setSelectedStatuses(previous => previous.includes(value) ? previous.filter(status => status !== value) : [...previous, value]);
  const clear = () => { setFilters({ gerencia: '', area: '', uo: '', posicion: '' }); setQuery(''); setSelectedStatuses([]); };

  return <Shell><div className="directory-page">
    <div className="directory-heading"><div><span className="eyebrow">{inactive ? 'HISTÓRICO · SOLO LECTURA' : 'CONSULTA · PUESTOS ACTIVOS'}</span><h1>{inactive ? 'Puestos inactivos' : 'Visualizar descriptivo de puestos'}</h1></div><div className="directory-actions">{inactive ? <Link className="btn btn-outline" to="/consultar"><Search size={17}/> Ver puestos activos</Link> : <Link className="btn btn-primary" to="/crear"><FilePlus2 size={17}/> Registrar DP</Link>}</div></div>
    {location.state?.saved && <div className="menu-save-notice" role="status"><CheckCircle2 size={18}/><span>{location.state.message || 'Descriptivo actualizado en esta demostración.'}</span></div>}
    {downloadNotice && <div className="directory-download-notice" role="status"><Info size={19}/><p><strong>{downloadNotice.posicion || downloadNotice.tituloPuesto}.</strong> En Power Apps, este botón descarga el descriptivo adjunto al registro de SharePoint. En este prototipo se muestra únicamente la explicación de la acción.</p><button type="button" aria-label="Cerrar explicación de descarga" onClick={() => setDownloadNotice(null)}><X size={18}/></button></div>}

    <div className="directory-controls">
      <section className="panel directory-filters"><div className="directory-filter-top"><span>Filtrar por estructura organizativa</span><div><button className="mobile-filter-toggle" type="button" onClick={() => setFiltersOpen(!filtersOpen)}>{filtersOpen ? 'Ocultar' : 'Filtros'} <ChevronDown size={15}/></button><button className="text-button" type="button" onClick={clear}><FilterX size={15}/> Limpiar</button><button className="directory-reset" type="button" onClick={clear} title="Restablecer filtros" aria-label="Restablecer filtros"><RotateCcw size={22}/></button></div></div><div className={`directory-filter-grid ${filtersOpen ? 'filter-grid-open' : ''}`}><FilterSelect label="Gerencia" value={filters.gerencia} options={unique(visibleDocuments.map(doc => doc.gerencia))} onChange={value => setFilter('gerencia', value)} placeholder="Seleccione Gerencia…"/><FilterSelect label="Área" value={filters.area} options={unique(scoped.map(doc => doc.area))} onChange={value => setFilter('area', value)} placeholder="Seleccione Área…" disabled={!filters.gerencia}/><FilterSelect label="Unidad Organizativa (UO)" value={filters.uo} options={unique(scoped.map(doc => doc.uo))} onChange={value => setFilter('uo', value)} placeholder="Seleccione Unidad Organizativa…" disabled={!filters.area}/><FilterSelect label="Posición" value={filters.posicion} options={unique(scoped.map(doc => doc.posicion))} onChange={value => setFilter('posicion', value)} placeholder="Seleccione Posición…" disabled={!filters.uo}/></div></section>

      {!inactive && <aside className="directory-status-panel" aria-label="Filtrar por estado"><label className="directory-status-option"><input type="checkbox" checked={selectedStatuses.includes('Faltante')} onChange={() => toggleStatus('Faltante')}/><strong>{missing}</strong><span>DP's Faltantes</span></label><label className="directory-status-option"><input type="checkbox" checked={selectedStatuses.includes('Completo')} onChange={() => toggleStatus('Completo')}/><strong>{complete}</strong><span>DP's Completos</span></label><div className="directory-position-count"><strong>Posiciones</strong><b>{visibleDocuments.length}</b></div></aside>}

      <div className="search-row directory-search"><Search size={18}/><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Ingrese el nombre de la posición a buscar…" aria-label="Buscar descriptivos por posición"/>{query && <button type="button" aria-label="Borrar búsqueda" onClick={() => setQuery('')}><X size={17}/></button>}</div>
    </div>

    <section className="panel directory-results"><div className="directory-results-header"><h2>{inactive ? 'Puestos inactivos' : 'Resultados'} <span>{results.length}</span></h2><small>{results.length} de {visibleDocuments.length} posiciones</small></div><div className="directory-table"><table><thead><tr><th>GERENCIA</th><th>ÁREA</th><th>UNIDAD ORGANIZATIVA</th><th>POSICIÓN</th><th>ESTADO</th><th>AÑO</th><th>ARCHIVO</th></tr></thead><tbody>{results.map(doc => <tr key={doc.id}><td>{doc.gerencia || '—'}</td><td>{doc.area || '—'}</td><td>{doc.uo || '—'}</td><td>{doc.posicion || doc.tituloPuesto}</td><td><span className={`directory-status-label ${statusLabel(doc) === 'Completo' ? 'directory-complete' : 'directory-missing'}`}>{statusLabel(doc)}</span></td><td>{doc.anio || doc.fecha?.slice(0, 4) || '—'}</td><td><div className="directory-row-actions">{!inactive && <><button type="button" className="directory-file-action" title={statusLabel(doc) === 'Completo' ? 'Descargar descriptivo de SharePoint (explicación)' : 'Registrar DP para este puesto'} aria-label={`${statusLabel(doc) === 'Completo' ? 'Descargar DP' : 'Registrar DP'}: ${doc.posicion}`} onClick={() => statusLabel(doc) === 'Completo' ? setDownloadNotice(doc) : navigate('/crear', { state: { sourcePositionId: doc.id } })}>{statusLabel(doc) === 'Completo' ? <FileDown size={23}/> : <FilePlus2 size={23}/>}</button><button type="button" className="directory-edit-action" title="Actualizar descriptivo mediante un adjunto" aria-label={`Editar ${doc.posicion}`} onClick={() => navigate(`/editar/${doc.id}`)}><Pencil size={20}/></button></>}{inactive && <button type="button" className="directory-file-action" title="Ver descriptivo" aria-label={`Ver ${doc.posicion}`} onClick={() => navigate(`/descriptivo/${doc.id}`)}><Search size={19}/></button>}</div></td></tr>)}</tbody></table>{results.length === 0 && <div className="empty-state"><Search size={25}/><h3>Sin resultados</h3><p>Prueba con otros filtros o busca otra posición.</p><button className="btn btn-outline" onClick={clear}>Limpiar búsqueda</button></div>}</div><div className="directory-results-footer">{inactive ? 'Histórico de descriptivos · Solo lectura' : 'Datos de demostración'}</div></section>
  </div></Shell>;
}
