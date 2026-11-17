// Contenido editorial de la guía. Las instrucciones de capturas están en docs/.
const step = (title, text) => ({ title, text });
const media = (id, variant, caption) => ({ id, variant, caption });
const lesson = (id, title, subtitle, text, options = {}) => ({ id, title, subtitle, text, duration: '3 min', paragraphs: [], steps: [], bullets: [], ...options });

export const guideSections = [
  { id: 'inicio', title: 'Inicio', description: 'Conoce el descriptivo y el recorrido de la aplicación.', lessons: [
    lesson('inicio-proposito', '¿Para qué sirve un descriptivo?', 'Un punto de referencia para comprender el puesto', 'El descriptivo explica la razón de ser del puesto, sus principales responsabilidades, el alcance de sus decisiones y los requisitos para desempeñarlo.', {
      paragraphs: ['Escribe sobre el trabajo que debe realizarse y su contribución a la organización. Una descripción útil permite que alguien ajeno al área comprenda qué se espera del puesto.', 'El contenido debe corresponder a las funciones y relaciones reales. La información se revisa antes de iniciar el proceso de aprobación.'],
      bullets: ['Distingue el propósito general de las actividades específicas.', 'Relaciona responsabilidades con resultados esperados.', 'Revisa el contenido cuando cambien las funciones o la estructura.'],
      kind: 'method',
    }),
    lesson('inicio-menu', 'Encuentra el recorrido que necesitas', 'Registrar, Consultar, Historial y Guía', 'El menú reúne los accesos principales. Elige el recorrido según quieras redactar un descriptivo, recuperar un archivo vigente o consultar uno histórico.', {
      steps: [step('Registrar DP', 'Inicia el formulario para redactar el contenido del descriptivo y enviarlo a revisión.'), step('Consultar descriptivos', 'Busca una combinación activa, descarga su DP disponible, registra el faltante o actualiza mediante un adjunto.'), step('Historial', 'Recupera descriptivos completos de combinaciones que ya no aparecen en el catálogo activo.'), step('Guía', 'Consulta instrucciones y ejemplos sin modificar un descriptivo.')],
      media: media('inicio-menu', 'menu', 'Accesos principales del aplicativo.'),
      bullets: ['Usa Registrar para redactar un nuevo DP.', 'Usa el lápiz de Consultar para actualizar mediante un archivo.', 'Historial permite consultar documentos conservados.'],
    }),
    lesson('inicio-estados', 'Entiende los estados', 'Vigencia del puesto y disponibilidad del documento', 'Un puesto puede estar activo y todavía no tener un descriptivo completo. La vigencia de la combinación y el estado del documento responden a criterios diferentes.', {
      steps: [step('Puesto activo', 'La combinación de Gerencia, Área, Unidad Organizativa y Posición está en el catálogo activo.'), step('Completo o Faltante', 'El registro está clasificado según la disponibilidad del descriptivo. Comprueba el archivo si la clasificación no coincide con lo que puedes descargar.'), step('Descriptivo histórico', 'Existe un DP completo asociado a una combinación que ya no aparece en el catálogo activo.')],
      callout: { title: 'La combinación completa importa', text: 'Dos puestos con el mismo nombre pueden pertenecer a gerencias, áreas o unidades diferentes. Confirma los cuatro datos antes de trabajar con un documento.' },
      bullets: ['Un faltante activo también aparece en Consultar.', 'Historial contiene documentos completos.', 'El envío a aprobación y la disponibilidad final del documento son momentos distintos.'],
    }),
  ] },
  { id: 'registrar', title: 'Registrar', description: 'Completa el descriptivo y comprende su envío a revisión.', lessons: [
    lesson('registrar-estructura', 'Selecciona la estructura organizativa', 'Empieza por ubicar correctamente el puesto', 'En Registrar DP, selecciona Gerencia, Área, Unidad Organizativa y Posición en ese orden. Cada selección acota las opciones siguientes.', {
      steps: [step('Elige Gerencia', 'Ubica la gerencia responsable de la posición.'), step('Selecciona Área y UO', 'Confirma las unidades a las que pertenece el puesto; no te guíes únicamente por nombres parecidos.'), step('Selecciona Posición', 'Comprueba que el nombre corresponda al puesto que vas a describir.'), step('Revisa antes de continuar', 'Si cambias una selección superior, vuelve a elegir los campos dependientes.')],
      media: media('registrar-estructura', 'structure', 'Selección de la combinación organizativa del puesto.'),
      bullets: ['Revisa los cuatro datos como un conjunto.', 'Si llegas desde el ícono de añadir, comprueba los datos precargados.', 'Continúa solo cuando la combinación sea la correcta.'],
    }),
    lesson('registrar-generales', 'Completa los datos generales y la misión', 'Identidad, relaciones y razón de ser', 'Registra el título del puesto, la información de elaboración, su localización y las dependencias solicitadas. Después redacta la misión o propósito.', {
      steps: [step('Identifica el documento', 'Completa el título, la fecha y los datos de preparación que solicita el formulario.'), step('Describe las relaciones', 'Indica la dependencia jerárquica y funcional según la estructura real.'), step('Redacta el propósito', 'Explica en una oración qué contribución principal debe lograr el puesto.'), step('Comprueba la coherencia', 'La misión debe coincidir con el alcance que desarrollarás en las responsabilidades.')],
      media: media('registrar-generales', 'form', 'Datos generales y propósito del descriptivo.'),
      bullets: ['Usa un verbo en infinitivo.', 'Expresa el resultado principal del puesto.', 'Evita convertir la misión en una lista de tareas.'],
    }),
    lesson('registrar-resultados', 'Desarrolla responsabilidades y objetivos', 'Qué hace el puesto y qué resultado produce', 'Para cada responsabilidad, relaciona una acción con el ámbito en que se realiza y el resultado final esperado. Organiza el contenido por importancia.', {
      steps: [step('Enumera las responsabilidades principales', 'Describe actividades sustantivas del puesto; reúne las que persigan un mismo resultado.'), step('Escribe la acción y su ámbito', 'Utiliza un verbo en infinitivo y precisa sobre qué proceso, recurso o actividad actúa.'), step('Indica el resultado esperado', 'Explica para qué se realiza la acción. Evita repetir la misma actividad con otras palabras.'), step('Completa los objetivos solicitados', 'Verifica que sean coherentes con las responsabilidades y con los resultados que se esperan del puesto.')],
      media: media('registrar-resultados', 'results', 'Relación entre acción y resultado esperado.'),
      bullets: ['Ordena las responsabilidades por importancia.', 'Evita ideas duplicadas.', 'Adapta el número de responsabilidades a los campos del formulario.'],
    }),
    lesson('registrar-alcance', 'Define dimensiones y autoridad', 'Recursos, decisiones y recomendaciones', 'Las dimensiones dan contexto al alcance del puesto. La autoridad distingue qué puede decidir y qué debe proponer o recomendar a otra instancia.', {
      steps: [step('Describe las dimensiones', 'Indica las magnitudes y recursos pertinentes que solicita el formulario, utilizando información autorizada y verificable.'), step('Identifica decisiones', 'Especifica las decisiones que el puesto puede tomar dentro de su responsabilidad.'), step('Identifica recomendaciones', 'Registra las propuestas que requieren evaluación o autorización de otra instancia.'), step('Contrasta el alcance', 'Comprueba que las decisiones y los recursos correspondan a las funciones descritas.')],
      media: media('registrar-alcance', 'form', 'Campos para describir el alcance y la autoridad.'),
      bullets: ['Distingue decidir de recomendar.', 'Evita atribuir facultades que el puesto no tiene.', 'Verifica la vigencia de los datos de alcance.'],
    }),
    lesson('registrar-perfil', 'Completa organización, contexto y perfil', 'Relaciones de trabajo y requisitos del puesto', 'Describe cómo se relaciona el puesto con la organización, las condiciones relevantes de su entorno y los requisitos necesarios para desempeñarlo.', {
      steps: [step('Ubica las relaciones de reporte', 'Completa las gerencias, jefatura y demás relaciones solicitadas.'), step('Explica el contexto', 'Describe problemas habituales, coordinación y contactos relevantes para las responsabilidades.'), step('Define experiencia y formación', 'Indica requisitos relacionados con el trabajo que debe realizarse.'), step('Añade conocimientos y competencias', 'Selecciona los que contribuyen al cumplimiento de las funciones; evita listas genéricas sin relación con el puesto.')],
      media: media('registrar-perfil', 'form', 'Organización, contexto y requisitos del puesto.'),
      bullets: ['Mantén consistencia con la misión y responsabilidades.', 'Diferencia requisitos del puesto de características de su ocupante.', 'Revisa las relaciones antes de enviar.'],
    }),
    lesson('registrar-envio', 'Revisa y envía a aprobación', 'Completar el formulario es el inicio del proceso de revisión', 'Antes de pulsar Enviar, revisa el contenido completo y los campos requeridos. El envío inicia el flujo configurado para generar el documento y tramitar sus aprobaciones.', {
      steps: [step('Revisa todos los apartados', 'Confirma estructura, misión, responsabilidades, alcance y perfil.'), step('Corrige pendientes', 'Completa los campos requeridos y las observaciones que muestre el formulario.'), step('Pulsa Enviar', 'Espera la confirmación del envío y evita repetir la acción mientras se procesa.'), step('Distingue envío de aprobación', 'La recepción de la solicitud no significa que el documento haya sido aprobado.'), step('Comprueba el resultado', 'Una vez concluido el proceso, revisa la disponibilidad del DP en Consultar. Si hay observaciones, atiéndelas según las indicaciones recibidas.')],
      media: media('registrar-envio', 'approval', 'Recorrido del documento desde el envío hasta su disponibilidad.'),
      callout: { title: 'Aprobaciones', text: 'Los responsables y las etapas corresponden al flujo configurado. Revisa las notificaciones recibidas para conocer la acción que te corresponde.' },
      bullets: ['Revisa antes de enviar.', 'Conserva la confirmación o referencia de la solicitud.', 'Comprueba el documento final cuando termine el proceso.'],
    }),
  ] },
  { id: 'redaccion', title: 'Redacción', description: 'Aplica las pautas de acción, ámbito y resultado.', lessons: [
    lesson('redaccion-formula', 'Qué, dónde y para qué', 'Una responsabilidad con acción y resultado', 'La pauta de redacción combina la acción que realiza el puesto, el ámbito sobre el que actúa y la finalidad que debe lograr. Esa relación da contexto y evita frases vagas.', {
      kind: 'method',
      steps: [step('Qué', 'Comienza con un verbo que describa la acción del puesto.'), step('Dónde o en qué', 'Identifica el proceso, recurso, producto o actividad sobre el que actúa.'), step('Para qué', 'Expresa el resultado final esperado como consecuencia de la acción.')],
      bullets: ['Acción + función explica qué hace y dónde actúa.', 'El resultado explica para qué se realiza la acción.', 'Comprueba que la finalidad aporte información distinta de la actividad.'],
    }),
    lesson('redaccion-verbos', 'Elige verbos acordes al alcance', 'Verbos de acción en infinitivo', 'El material de referencia organiza ejemplos para ejecutivos, mandos medios y contribuidores individuales. Elige el verbo que describa la responsabilidad real del puesto.', {
      kind: 'verbs',
      paragraphs: ['No utilices un verbo de dirección para una actividad de ejecución si el puesto no tiene ese alcance. Un mismo documento puede necesitar verbos diferentes según cada responsabilidad.'],
      bullets: ['Escribe los verbos en infinitivo.', 'Relaciona el verbo con una función concreta.', 'Revisa que el verbo no exagere ni reduzca la responsabilidad.'],
    }),
    lesson('redaccion-ejemplo', 'Ejemplo: gerente de planta', 'Observa la diferencia entre actividad y resultado', 'El ejemplo del material de referencia muestra cuatro responsabilidades: producción, insumos, fabricación y mantenimiento. Cada acción se vincula con un resultado final esperado.', {
      kind: 'example', duration: '4 min',
      paragraphs: ['Úsalo para comprender la estructura de redacción. Adapta el contenido a las funciones reales del puesto que estás describiendo; las responsabilidades del ejemplo no se copian de forma automática.'],
      bullets: ['Reconoce el verbo de cada acción.', 'Identifica el ámbito de actuación.', 'Comprueba cómo el resultado explica la finalidad.'],
    }),
    lesson('redaccion-calidad', 'Revisa claridad y consistencia', 'Una última lectura desde fuera del área', 'Lee el documento como si no conocieras el puesto. Cada apartado debe ayudarte a comprender su contribución sin depender de explicaciones adicionales.', {
      steps: [step('Elimina repeticiones', 'Reúne responsabilidades que describan la misma contribución.'), step('Sustituye frases vagas', 'Precisa el ámbito de expresiones como apoyar, gestionar o coordinar.'), step('Contrasta misión y resultados', 'Comprueba que las responsabilidades contribuyan a la razón de ser del puesto.'), step('Verifica hechos y alcance', 'Valida relaciones, recursos y atribuciones con información real.')],
      callout: { title: 'Ejemplo de mejora', text: 'En lugar de “gestionar reportes”, especifica “elaborar y analizar los reportes de gestión del área para facilitar el seguimiento de resultados”. Confirma que esa función corresponda al puesto.' },
      bullets: ['Usa lenguaje claro y profesional.', 'Evita siglas sin explicación.', 'Revisa el contenido sugerido por IA antes de incorporarlo.'],
    }),
  ] },
  { id: 'consultar', title: 'Consultar', description: 'Encuentra puestos activos y recupera sus documentos.', lessons: [
    lesson('consultar-filtros', 'Busca por estructura organizativa', 'Cuatro campos que identifican la combinación', 'Consultar muestra las combinaciones del catálogo activo. Puedes acotar la lista con Gerencia, Área, Unidad Organizativa y Posición.', {
      steps: [step('Selecciona Gerencia', 'Comienza por la unidad responsable del puesto.'), step('Completa Área y UO', 'Las opciones disponibles dependen de las selecciones anteriores.'), step('Elige Posición si lo necesitas', 'Puedes consultar una combinación concreta o mantener varias posiciones de la estructura seleccionada.'), step('Limpia para comenzar otra búsqueda', 'Restablece los filtros cuando quieras cambiar de ámbito.')],
      media: media('consultar-filtros', 'directory', 'Filtros de estructura y tabla de puestos activos.'),
      bullets: ['Confirma los cuatro campos de la fila.', 'Un mismo nombre puede existir en estructuras diferentes.', 'Cambiar un filtro superior restablece los inferiores.'],
    }),
    lesson('consultar-estados', 'Combina búsqueda, estados y contadores', 'Entiende qué representa cada cantidad', 'El buscador por posición se aplica junto con los filtros de estructura. Los selectores permiten mostrar completos o faltantes sin perder las cantidades disponibles de cada estado.', {
      steps: [step('Escribe parte del nombre', 'La búsqueda acota las posiciones dentro del ámbito seleccionado.'), step('Selecciona un estado', 'Marca Completos o Faltantes para filtrar la tabla. El otro selector queda deshabilitado hasta desmarcarlo.'), step('Interpreta los contadores', 'Las cantidades de cada estado siguen la estructura y el texto. El total de resultados refleja además el estado seleccionado.'), step('Restablece la consulta', 'Desmarca el estado o utiliza Limpiar para recuperar el conjunto correspondiente.')],
      media: media('consultar-estados', 'directory', 'Búsqueda y disponibilidad por estado del descriptivo.'),
      bullets: ['Completo y Faltante describen el documento.', 'Los contadores de ambos estados no deben reducirse a cero por seleccionar el opuesto.', 'Las cantidades cambian cuando se actualizan las fuentes o los filtros.'],
    }),
    lesson('consultar-acciones', 'Descarga o registra un descriptivo', 'Reconoce el ícono que corresponde a cada fila', 'La acción principal cambia según el estado del DP. La flecha de descarga permite recuperar el archivo disponible; la hoja con el signo más abre Registrar DP.', {
      steps: [step('Revisa la fila', 'Confirma la estructura y la posición antes de elegir un archivo.'), step('Descarga un completo', 'Pulsa la flecha para recuperar el adjunto asociado al registro.'), step('Registra un faltante', 'Pulsa la hoja con el signo más y comprueba los datos precargados en Registrar DP.'), step('Usa el lápiz para actualizar', 'Si necesitas reemplazar el DP mediante un archivo, abre la vista de actualización.')],
      media: media('consultar-acciones', 'actions', 'Acciones de descargar, registrar y actualizar.'),
      bullets: ['Descargar recupera el archivo almacenado.', 'La hoja con más abre el formulario de registro.', 'El lápiz abre la actualización mediante adjunto.'],
    }),
    lesson('consultar-comprobaciones', 'Comprueba el archivo y la combinación', 'Qué revisar cuando algo no coincide', 'Si el documento no se abre o no corresponde a lo esperado, identifica primero la posición y la fila seleccionada. El archivo debe corresponder al registro consultado.', {
      steps: [step('Comprueba los datos de la fila', 'Revisa Gerencia, Área, UO y Posición.'), step('Revisa el archivo descargado', 'Comprueba su nombre y si se abre en la aplicación correspondiente.'), step('Comunica una inconsistencia', 'Si el estado indica Completo y no hay archivo disponible, informa la posición y la referencia del registro.'), step('Evita reemplazos sin revisión', 'Antes de actualizar, confirma cuál es la versión correcta del descriptivo.')],
      bullets: ['Tener el mismo nombre de puesto no garantiza que sea la misma combinación.', 'Cambiar una extensión no convierte el contenido de un archivo.', 'Consulta al responsable si existen varios documentos y no puedes identificar el correcto.'],
    }),
  ] },
  { id: 'actualizar', title: 'Actualizar', description: 'Sustituye el descriptivo mediante un nuevo archivo.', lessons: [
    lesson('actualizar-datos', 'Abre la actualización desde el lápiz', 'Datos principales del documento que vas a reemplazar', 'En Consultar, localiza el puesto y pulsa el lápiz. La pantalla presenta los datos principales y el espacio para adjuntar la nueva versión del descriptivo.', {
      steps: [step('Identifica el puesto en Consultar', 'Utiliza los filtros para evitar seleccionar una combinación distinta.'), step('Pulsa el lápiz', 'Abre la vista de actualización del registro seleccionado.'), step('Revisa los datos principales', 'Confirma Gerencia, Área, UO y Posición antes de adjuntar el documento.')],
      media: media('actualizar-datos', 'upload', 'Datos principales y espacio para el nuevo adjunto.'),
      bullets: ['Actualizar mediante un archivo es un recorrido diferente de redactar en Registrar DP.', 'Verifica siempre la combinación precargada.', 'Conserva una copia identificable de la versión que vas a enviar.'],
    }),
    lesson('actualizar-adjunto', 'Adjunta la nueva versión', 'Selecciona o arrastra el archivo', 'Carga el documento que contiene el nuevo descriptivo. Antes de seleccionarlo, ábrelo en tu equipo y comprueba que el contenido y el nombre sean correctos.', {
      steps: [step('Prepara el archivo', 'Comprueba que corresponde al puesto y que puede abrirse correctamente.'), step('Adjunta la nueva versión', 'Selecciona el archivo desde tu equipo o arrástralo al área de adjuntos si tu reproductor lo permite.'), step('Revisa la selección', 'Comprueba el nombre mostrado. Si elegiste otro archivo, retíralo y selecciona el correcto.'), step('Completa los requisitos', 'Revisa los avisos del formulario antes de enviar la actualización.')],
      media: media('actualizar-adjunto', 'upload', 'Selección del archivo que contiene el nuevo descriptivo.'),
      bullets: ['El archivo debe corresponder al puesto seleccionado.', 'Conserva su formato real; renombrar no convierte el documento.', 'Sigue las restricciones que indique el formulario.'],
    }),
    lesson('actualizar-envio', 'Envía y comprueba la actualización', 'Confirmación de envío y revisión posterior', 'Al actualizar se inicia el flujo configurado para tramitar la nueva versión. Un aviso de carga o envío no equivale por sí solo a la aprobación final.', {
      steps: [step('Envía una sola vez', 'Utiliza Actualizar o el botón de envío disponible cuando se completen los requisitos.'), step('Espera la confirmación', 'Evita repetir el envío mientras se procesa.'), step('Atiende la revisión', 'Consulta las notificaciones y responde a las observaciones que correspondan.'), step('Comprueba el documento disponible', 'Cuando termine el proceso, vuelve a Consultar y verifica la versión que puedes recuperar.')],
      media: media('actualizar-envio', 'approval', 'Envío, revisión y disponibilidad de la nueva versión.'),
      bullets: ['Distingue archivo enviado de documento aprobado.', 'Verifica el resultado antes de dar por concluida la actualización.', 'Si hay un error, conserva la referencia de la solicitud.'],
    }),
  ] },
  { id: 'historial', title: 'Historial', description: 'Recupera descriptivos completos fuera del catálogo activo.', lessons: [
    lesson('historial-alcance', 'Qué encontrarás en Historial', 'Documentos conservados para consulta', 'Historial muestra descriptivos completos asociados a combinaciones que ya no aparecen en el catálogo activo. Su propósito es recuperar documentos anteriores.', {
      paragraphs: ['Los registros marcados como Faltante se conservan en la fuente, pero no forman parte de esta consulta documental.', 'Cada registro conserva su identidad. Si existen varios registros con la misma combinación, revisa cuál corresponde al documento que necesitas.'],
      media: media('historial-alcance', 'history', 'Consulta de descriptivos históricos disponibles.'),
      bullets: ['Historial contiene DP completos.', 'Puedes consultar y descargar los documentos conservados.', 'Esta vista no se utiliza para registrar ni actualizar descriptivos.'],
    }),
    lesson('historial-busqueda', 'Filtra y descarga un histórico', 'La misma estructura para encontrar documentos anteriores', 'Busca con Gerencia, Área, UO y Posición. Las opciones corresponden a los registros históricos disponibles, por lo que pueden diferir de las de Consultar.', {
      steps: [step('Acota la estructura', 'Selecciona Gerencia, Área y UO del registro histórico que necesitas.'), step('Busca la posición', 'Elige el puesto o escribe parte del nombre en el buscador.'), step('Revisa los resultados', 'Comprueba la combinación y el año disponible para identificar el documento.'), step('Descarga el descriptivo', 'Pulsa la flecha del registro correspondiente. Limpia los filtros para una nueva consulta.')],
      media: media('historial-busqueda', 'history', 'Filtros y descarga de un descriptivo histórico.'),
      bullets: ['El buscador se combina con los filtros.', 'El contador refleja los documentos del resultado.', 'Las opciones históricas proceden de sus propios registros.'],
    }),
    lesson('historial-transicion', 'Cuándo aparece un DP en Historial', 'La actualización del catálogo determina su ubicación', 'Si una combinación deja de aparecer en el catálogo activo y conserva un DP completo, el documento aparecerá en Historial después de actualizar la información de la aplicación.', {
      steps: [step('Mientras la combinación está activa', 'El puesto se consulta desde Consultar.'), step('Cuando deja de aparecer en activos', 'Su DP completo se conserva y queda disponible en Historial tras actualizar las fuentes.'), step('Si otra persona mantiene la combinación', 'Un cese individual no implica que el puesto deje de estar activo.'), step('Si la estructura cambió de nombre', 'Verifica la correspondencia antes de concluir que el puesto dejó de estar vigente.')],
      media: media('historial-transicion', 'transition', 'Disponibilidad del DP según la vigencia de su combinación.'),
      callout: { title: 'Información actualizada', text: 'La consulta refleja la última carga disponible. Limpiar filtros cambia la búsqueda, pero no actualiza el catálogo por sí solo.' },
      bullets: ['Se conserva el documento; no necesitas trasladarlo manualmente.', 'El criterio actual utiliza la combinación completa.', 'La ausencia del catálogo puede requerir revisar cambios de estructura.'],
    }),
  ] },
  { id: 'prompt', title: 'Prompt', description: 'Prepara contexto, genera instrucciones y revisa el borrador.', lessons: [
    lesson('prompt-estructura', 'Las seis partes de un buen prompt', 'Tarea, contexto, ejemplo, rol, formato y tono', 'El material de referencia propone explicar qué necesitas, en qué contexto y cómo debe entregarse la respuesta. Una solicitud precisa reduce ambigüedades y facilita revisar el resultado.', {
      kind: 'promptStructure',
      steps: [step('Define la tarea', 'Solicita la misión y las principales responsabilidades del puesto.'), step('Añade contexto y una referencia', 'Explica el sector, el área y las funciones reales. Puedes aportar un ejemplo genérico del formato esperado.'), step('Indica rol, formato y tono', 'Solicita el enfoque de un especialista, una misión y una tabla de responsabilidades, con lenguaje claro y profesional.')],
      bullets: ['Completa los datos antes de solicitar una respuesta.', 'Usa referencias relacionadas con el puesto.', 'Pide que se señale la información pendiente en lugar de inventarla.'],
    }),
    lesson('prompt-constructor', 'Prepara tu prompt', 'Completa el contexto y copia las instrucciones', 'Personaliza el puesto, el área, el sector y una descripción general de la empresa. Añade al menos cuatro funciones reales e indica el cliente interno cuando ayude a precisar la contribución.', {
      kind: 'prompt', duration: '5 min',
      paragraphs: ['Ajusta la extensión de la misión, la cantidad de responsabilidades y el número de opciones. La misión se solicita en una oración y las responsabilidades en dos columnas: acción + función y resultado final esperado.'],
      bullets: ['El botón copia texto; no envía la información a una herramienta de IA.', 'Ajusta las cantidades a lo que necesitas registrar.', 'Utiliza una herramienta autorizada para el tipo de información que vas a compartir.'],
    }),
    lesson('prompt-revision', 'Revisa y adapta la respuesta', 'Un borrador útil necesita validación', 'La respuesta de una herramienta de IA es un punto de partida. Comprueba que represente las funciones reales y que no añada responsabilidades, recursos o facultades que el puesto no tiene.', {
      steps: [step('Comprueba la misión', 'Debe ser una oración, ajustarse a la extensión solicitada y expresar la contribución principal.'), step('Comprueba la tabla', 'Verifica el número de responsabilidades y las dos columnas solicitadas.'), step('Revisa verbos y contexto', 'Los verbos deben estar en infinitivo y cada acción debe indicar dónde actúa el puesto.'), step('Contrasta con la realidad', 'Corrige información inventada, repeticiones y resultados poco claros.'), step('Incorpora el contenido revisado', 'Adapta el texto a los campos de Registrar DP y vuelve a revisar antes del envío.')],
      media: media('prompt-revision', 'results', 'Revisión de la misión y la tabla de responsabilidades.'),
      bullets: ['No copies automáticamente una respuesta completa.', 'Conserva las funciones verificadas.', 'La revisión y aprobación del DP siguen siendo necesarias.'],
    }),
    lesson('prompt-cuidado', 'Comparte solo información autorizada', 'Cuida los datos al utilizar herramientas externas', 'El PDF advierte sobre incluir información sensible, nombres específicos y detalles confidenciales del puesto o de la empresa en versiones gratuitas de herramientas de IA.', {
      kind: 'safeAI',
      paragraphs: ['Utiliza descripciones generales y ejemplos sin datos identificables cuando el contexto lo permita. Sigue las indicaciones internas para elegir la herramienta y el tipo de información que puedes utilizar.'],
      bullets: ['Revisa el prompt antes de copiarlo.', 'Evita datos personales y detalles confidenciales.', 'Si tienes dudas sobre la información, consulta al responsable antes de compartirla.'],
    }),
  ] },
];

export const guideLessons = guideSections.flatMap((section, sectionIndex) =>
  section.lessons.map((entry, lessonIndex) => ({ ...entry, section: section.title, sectionId: section.id, sectionIndex, lessonIndex }))
);

// Completar con rutas de medios reales cuando estén disponibles. No cambia el contenido editorial.
export const guideScreenshots = {};
