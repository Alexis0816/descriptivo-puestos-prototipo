export const catalog = [
  { gerencia: 'Gerencia Corp. de Recursos Humanos', area: 'Gerencia Corporativo de Compensaciones', uo: 'Compensaciones', posicion: 'Jefe Corp. de Compensaciones' },
  { gerencia: 'Gerencia Corp. de Recursos Humanos', area: 'Gerencia Corporativo de Compensaciones', uo: 'Compensaciones', posicion: 'Practicante Pre-Profesional' },
  { gerencia: 'Gerencia Corp. de Recursos Humanos', area: 'Gerencia de Talento y Cultura', uo: 'Desarrollo Organizacional', posicion: 'Analista de Desarrollo Organizacional' },
  { gerencia: 'Country Manager Perú', area: 'Gerencia de Operación Directa Perú', uo: 'Operación Directa', posicion: 'Gerente de Operación Directa' },
  { gerencia: 'Country Manager Perú', area: 'Gerencia de Network & Assets', uo: 'Network & Assets', posicion: 'Gerente de Network & Assets' },
  { gerencia: 'Gerencia Corp. de Estrategia y Nuevos Negocios', area: 'Gerencia de Estrategia & Transformación', uo: 'Estrategia & Transformación', posicion: 'Gerente Corp. de Estrategia' },
  { gerencia: 'Country Manager Perú', area: 'Gerencia de Industrias', uo: 'Industrias', posicion: 'Gerente de Industrias' },
];

export const archivedExamples = [
  { id: 'demo-inactivo-1', ...catalog[4], pais: 'Perú', activo: false, estado: 'Completo', anio: '2023', fecha: '2023-09-15', preparadaPor: 'Equipo de Operaciones', localizacion: 'Lima, Perú', proposito: 'Versión histórica de la posición antes de la actualización de la estructura organizativa.' },
  { id: 'demo-inactivo-2', ...catalog[6], pais: 'Perú', activo: false, estado: 'Completo', anio: '2022', fecha: '2022-11-08', preparadaPor: 'Equipo de Industrias', localizacion: 'Lima, Perú', proposito: 'Descriptivo histórico conservado para consulta.' },
];

export const initialDocuments = [
  { id: 1, ...catalog[0], pais: 'Perú', estado: 'Completo', anio: '2025', fecha: '2025-03-12', preparadaPor: 'Equipo de Personas (demo)', localizacion: 'Lima, Perú', dependenciaJerarquica: 'Gerencia Corp. de Recursos Humanos', dependenciaFuncional: 'Dirección de Personas', proposito: 'Liderar la estrategia de compensaciones, asegurando equidad interna y competitividad externa para atraer y retener talento.', experiencia: '5 años en compensaciones y gestión de talento.' },
  { id: 2, ...catalog[1], pais: 'Perú', estado: 'Completo', anio: '2025', fecha: '2025-05-22', preparadaPor: 'Equipo de Personas (demo)', localizacion: 'Lima, Perú', dependenciaJerarquica: 'Jefatura de Compensaciones', dependenciaFuncional: 'Gerencia de Compensaciones', proposito: 'Apoyar en la administración de información de puestos y análisis de compensaciones.' },
  { id: 3, ...catalog[2], pais: 'Perú', estado: 'Borrador', anio: '2026', fecha: '2026-02-10', preparadaPor: 'Equipo de Personas', localizacion: 'Lima, Perú', proposito: 'Impulsar proyectos de desarrollo organizacional y experiencia del colaborador.' },
  { id: 4, ...catalog[3], pais: 'Perú', estado: 'Completo', anio: '2025', fecha: '2025-06-08', preparadaPor: 'Equipo de Operaciones', localizacion: 'Lima, Perú', proposito: 'Dirigir las operaciones de la red de estaciones de servicio.' },
  { id: 5, ...catalog[4], pais: 'Perú', estado: 'Completo', anio: '2024', fecha: '2024-11-18', preparadaPor: 'Equipo de Operaciones', localizacion: 'Lima, Perú', proposito: 'Gestionar los activos y el desarrollo de la red de estaciones.' },
  { id: 6, ...catalog[5], pais: 'Perú', estado: 'Borrador', anio: '2026', fecha: '2026-07-02', preparadaPor: 'Equipo de Estrategia', localizacion: 'Lima, Perú', proposito: 'Definir e implementar iniciativas estratégicas para el crecimiento del negocio.' },
  { id: 7, ...catalog[6], pais: 'Perú', estado: 'Completo', anio: '2025', fecha: '2025-09-15', preparadaPor: 'Equipo de Industrias', localizacion: 'Lima, Perú', proposito: 'Liderar la gestión comercial del segmento industrial.' },
  ...archivedExamples,
];

export { guideSections } from './guideContent';
