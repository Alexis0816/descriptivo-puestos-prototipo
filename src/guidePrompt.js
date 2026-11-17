export const promptDefaults = {
  puesto: '', area: '', sector: '', empresa: '', cliente: '', funciones: '',
  minimo: '25', maximo: '35', cantidad: '9', opciones: '1',
};

const positiveInteger = value => /^\d+$/.test(String(value)) && Number.isSafeInteger(Number(value)) && Number(value) > 0;

export function validatePrompt(values) {
  if (['puesto', 'area', 'sector', 'empresa'].some(key => !values[key]?.trim())) return 'Completa puesto, área, sector y descripción general de la empresa.';
  if (values.funciones.split(/\r?\n/).filter(line => line.trim()).length < 4) return 'Enumera al menos cuatro funciones reales, una por línea.';
  if (['minimo', 'maximo', 'cantidad', 'opciones'].some(key => !positiveInteger(values[key]))) return 'Usa números enteros mayores que cero para las palabras, responsabilidades y opciones.';
  if (Number(values.minimo) > Number(values.maximo)) return 'El mínimo de palabras no puede ser mayor que el máximo.';
  return '';
}

export function buildPrompt(values) {
  const field = (key, label) => values[key]?.trim() || `[${label}]`;
  return `Actúa como especialista en descripción de puestos y desarrolla la tarea con un enfoque serio y profesional.

Contexto: necesito describir el puesto de ${field('puesto', 'puesto')}, en el área de ${field('area', 'área')}, dentro de una empresa del sector ${field('sector', 'sector')}. Descripción general: ${field('empresa', 'descripción general de la empresa')}.${values.cliente.trim() ? ` El cliente interno de sus funciones es ${values.cliente.trim()}.` : ''}

Principales funciones reales del puesto:
${field('funciones', 'al menos cuatro funciones, una por línea')}

Considera estas definiciones:
- Acción + función: qué hace el puesto y dónde o sobre qué actúa.
- Resultado final esperado: para qué se realiza la acción; el producto o contribución que debe obtenerse.

Entrega primero la misión del puesto en una sola oración de entre ${field('minimo', 'mínimo')} y ${field('maximo', 'máximo')} palabras.
Después presenta exactamente ${field('cantidad', 'cantidad')} responsabilidades, ordenadas por importancia, en una tabla de dos columnas:
1. Acción + función: qué hace y dónde actúa, con contexto y detalle.
2. Resultado final esperado: para qué lo hace.

Aplica las pautas de redacción del material Hay Group. Usa verbos de acción en infinitivo, lenguaje claro y profesional y evita repetir ideas entre la misión y las responsabilidades. No inventes funciones ni atribuciones que no se desprendan del contexto.
Proporciona ${field('opciones', 'cantidad de opciones')} ${Number(values.opciones) === 1 ? 'opción' : 'opciones'} de respuesta.
Si falta información necesaria o quedan campos entre corchetes, señala qué falta antes de redactar el resultado.`;
}
