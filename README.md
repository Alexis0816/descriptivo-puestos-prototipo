# Descriptivo de Puestos · Prototipo

Prototipo navegable de la experiencia propuesta para el aplicativo de descriptivos de puesto de Primax. Construido con **React, componentes reutilizables, Tailwind CSS y Vite**.

## Iniciar

```bash
npm install
npm run dev
```

Abre la dirección local que muestre Vite (por defecto `http://localhost:5173`). `npm run build` compila con la base de GitHub Pages; `npm run dev` conserva la raíz local.

## Recorrido

- **Inicio → Menú:** inicio claro basado en el aplicativo original y cuatro accesos principales sin información redundante.
- **Consultar:** busca descriptivos activos por gerencia, área, unidad organizativa, posición y texto. Descargar muestra una explicación de la descarga desde SharePoint en Power Apps. El ícono de añadir abre Registrar DP con el puesto precargado y el lápiz abre la actualización mediante un adjunto.
- **Historial:** consulta únicamente descriptivos completos de registros inactivos de demostración, en modo de solo lectura.
- **Registrar DP:** cinco etapas: datos generales; nueve resultados principales y cinco objetivos; dimensiones y cinco decisiones/recomendaciones; organización y contexto; perfil y revisión. Finalizar exige todos los campos y muestra los pendientes por sección. El botón «Descargar formato DP» es solo una vista previa: aún no descarga archivos. Si se accede desde un puesto faltante, se completa ese mismo registro de demostración.
- **Editar:** datos principales (gerencia, área, unidad organizativa y posición) y carga de un nuevo adjunto mediante selección o arrastre. Actualizar se habilita al completar los datos y seleccionar un archivo no vacío. La actualización simula un DP completo y guarda únicamente los metadatos del archivo; no conserva su contenido ni lo envía a aprobación.
- **Guía:** siete capítulos y 27 lecciones con teoría, pasos, ejemplos, búsqueda de lecciones y navegación Anterior/Siguiente. Reserva 17 espacios visuales con ilustraciones ampliables que se pueden sustituir por capturas reales. Incluye las pautas del PDF y un constructor de prompt con validación de contexto, cuatro funciones y cantidades. **Solo copia texto**; no hace llamadas a servicios de IA.

El encabezado compacto permanece fijo y permite volver al menú; no hay barra lateral duplicada. El contenido del formulario y de la guía se desplaza dentro de su panel, y la tabla de resultados tiene desplazamiento propio. En pantallas pequeñas el listado pasa a tarjetas y los filtros se pueden desplegar. El acceso a la guía está en el menú principal.

## Alcance de esta versión

Usa **datos de demostración** y guarda altas/ediciones en `localStorage` del navegador. Las consultas y la edición operan sobre esos datos locales; no hay conexión con Power Apps, Power Automate, SharePoint ni SQL. La identidad «Usuario de demostración» y el rol Administrador son ejemplos visuales, **no autenticación ni control de acceso**. La ilustración y el isotipo son aproximaciones dibujadas en SVG, no activos corporativos oficiales.

Los pendientes funcionales y de integración se mantienen en [PENDIENTES.md](PENDIENTES.md): formatos de adjuntos, identificación del DP por puesto/posición/colaborador y la próxima implementación de Historial en Power Apps.

La implementación manual de Historial en Power Apps está descrita, propiedad por propiedad, en [IMPLEMENTACION_HISTORIAL_POWERAPPS.md](IMPLEMENTACION_HISTORIAL_POWERAPPS.md). La guía incluye la carga compartida, filtros históricos, contadores y descarga por ID; debe validarse en Power Apps antes de publicar.

La decisión vigente de [Historial documental](docs/DECISION_HISTORIAL.md) limita esa vista a completos. La [maqueta nativa de Guía en Power Apps](docs/GUIA_DP_POWERAPPS.md) incluye el árbol de controles, las propiedades de Tab List y galerías, la ampliación de imágenes y el constructor de prompt. El [contenido editorial completo](docs/GUIA_DP_CONTENIDO.md) está separado del [plan de capturas](docs/GUIA_DP_CAPTURAS.md), que nunca se muestra al usuario. Los archivos Power Fx están en `powerapps/` y los diagramas SVG en `public/guide/`.

Para regenerar las colecciones y el contenido de la guía tras editar `src/guideContent.js`, ejecuta `node tools/build-guide-docs.mjs`. Las fórmulas están preparadas para revisión, pero no se han ejecutado ni publicado en el entorno Power Apps.

El PDF de referencia y `graphify-out/` permanecen en el equipo y **no se publican**. Para publicar ejecuta `npm run deploy` (compila mediante `predeploy` y sube `dist/` a `gh-pages`). Luego configura **Settings → Pages → Deploy from a branch → gh-pages → /(root)**. Las rutas emplean `#/` para que los enlaces internos funcionen en GitHub Pages.
