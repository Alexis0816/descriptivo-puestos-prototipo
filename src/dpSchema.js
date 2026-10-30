export const RESULT_COUNT = 9;
export const OBJECTIVE_COUNT = 5;
export const AUTHORITY_COUNT = 5;

// La vigencia del puesto no es el estado de redacción del descriptivo.
// Los registros anteriores a este campo se consideran activos.
export const isActiveDP = dp => dp.activo !== false;

export const formSteps = [
  { title: 'Datos del puesto', detail: 'Ubicación y datos generales' },
  { title: 'Resultados y objetivos', detail: 'Qué hace y para qué' },
  { title: 'Dimensiones y autoridad', detail: 'Alcance y decisiones' },
  { title: 'Organización y contexto', detail: 'Relaciones y entorno' },
  { title: 'Perfil y revisión', detail: 'Requisitos y validación' },
];

export const blankDP = () => ({
  gerencia: '', area: '', uo: '', posicion: '', tituloPuesto: '', activo: true,
  pais: 'Perú', estado: 'Borrador', anio: String(new Date().getFullYear()),
  fecha: new Date().toISOString().slice(0, 10), preparadaPor: '', localizacion: '',
  dependenciaJerarquica: '', dependenciaFuncional: '', proposito: '',
  resultados: Array.from({ length: RESULT_COUNT }, () => ({ accion: '', resultado: '' })),
  objetivos: Array.from({ length: OBJECTIVE_COUNT }, () => ''),
  principalesMagnitudes: '', recursosAsignados: '',
  autoridad: Array.from({ length: AUTHORITY_COUNT }, () => ({ decision: '', recomendacion: '' })),
  gerenciaN1: '', gerenciaN2: '', jefeDirecto: '', posicionDP: '', contexto: '',
  experiencia: '', formacion: '', conocimientos: '', competencias: '',
});

export function normalizeDP(source = {}) {
  const blank = blankDP();
  return {
    ...blank, ...source,
    tituloPuesto: source.tituloPuesto || source.posicion || '',
    resultados: Array.from({ length: RESULT_COUNT }, (_, i) => ({
      accion: source.resultados?.[i]?.accion || (i === 0 ? source.responsabilidades || '' : ''),
      resultado: source.resultados?.[i]?.resultado || '',
    })),
    objetivos: Array.from({ length: OBJECTIVE_COUNT }, (_, i) => source.objetivos?.[i] || ''),
    autoridad: Array.from({ length: AUTHORITY_COUNT }, (_, i) => ({
      decision: source.autoridad?.[i]?.decision || '',
      recomendacion: source.autoridad?.[i]?.recomendacion || '',
    })),
  };
}

const filled = value => Boolean(String(value ?? '').trim());

export function validateStep(dp, step) {
  const missing = [];
  const requireFields = fields => fields.forEach(([key, label]) => { if (!filled(dp[key])) missing.push(label); });
  if (step === 0) requireFields([
    ['gerencia', 'Gerencia'], ['area', 'Área'], ['uo', 'Unidad organizativa'],
    ['posicion', 'Posición'], ['tituloPuesto', 'Título de puesto'],
    ['preparadaPor', 'Preparada por'], ['localizacion', 'Localización'],
    ['dependenciaJerarquica', 'Dependencia jerárquica'],
    ['dependenciaFuncional', 'Dependencia funcional'], ['proposito', 'Propósito'], ['fecha', 'Fecha'],
  ]);
  if (step === 1) {
    dp.resultados.forEach((row, i) => {
      if (!filled(row.accion)) missing.push(`Resultado ${i + 1}: acción`);
      if (!filled(row.resultado)) missing.push(`Resultado ${i + 1}: resultado esperado`);
    });
    dp.objetivos.forEach((value, i) => { if (!filled(value)) missing.push(`Objetivo ${i + 1}`); });
  }
  if (step === 2) {
    requireFields([['principalesMagnitudes', 'Principales magnitudes'], ['recursosAsignados', 'Recursos asignados']]);
    dp.autoridad.forEach((row, i) => {
      if (!filled(row.decision)) missing.push(`Autoridad ${i + 1}: decisión`);
      if (!filled(row.recomendacion)) missing.push(`Autoridad ${i + 1}: recomendación`);
    });
  }
  if (step === 3) requireFields([
    ['gerenciaN1', 'Gerencia N1'], ['gerenciaN2', 'Gerencia N2'],
    ['jefeDirecto', 'Jefe directo'], ['posicionDP', 'Posición DP'], ['contexto', 'Contexto'],
  ]);
  if (step === 4) requireFields([
    ['experiencia', 'Experiencia'], ['formacion', 'Formación académica'],
    ['conocimientos', 'Conocimientos / habilidades técnicas'], ['competencias', 'Competencias'],
  ]);
  return missing;
}

export const missingByStep = dp => formSteps.map((_, i) => validateStep(dp, i));
