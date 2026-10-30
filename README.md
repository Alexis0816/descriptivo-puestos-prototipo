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
- **Consultar e Historial:** visibles pero bloqueados por ahora. Sus rutas muestran «Próximamente».
- **Crear / Editar:** cinco etapas: datos generales; nueve resultados principales y cinco objetivos; dimensiones y cinco decisiones/recomendaciones; organización y contexto; perfil y revisión. Finalizar exige todos los campos y muestra los pendientes por sección. El botón «Descargar formato DP» es solo una vista previa: aún no descarga archivos. Se guarda siempre como descriptivo completo.
- **Guía:** navegación compacta por secciones y lecciones, con lectura dentro del panel. Incluye fórmula «qué + dónde + para qué», verbos por nivel, ejemplos y plantilla de prompt. La plantilla de prompt **solo copia texto**; no hace llamadas a servicios de IA.

El encabezado compacto permanece fijo y permite volver al menú; no hay barra lateral duplicada. El contenido del formulario y de la guía se desplaza dentro de su panel, y la tabla de resultados tiene desplazamiento propio. En pantallas pequeñas el listado pasa a tarjetas y los filtros se pueden desplegar. El acceso a la guía está en el menú principal.

## Alcance de esta versión

Usa **datos de demostración** y guarda altas/ediciones en `localStorage` del navegador. Al guardar vuelve al menú con una confirmación, porque las consultas están bloqueadas temporalmente. La identidad «Usuario de demostración» y el rol Administrador son ejemplos visuales, **no autenticación ni control de acceso**. No hay conexión con Power Apps, Power Automate, SharePoint ni SQL. La ilustración y el isotipo son aproximaciones dibujadas en SVG, no activos corporativos oficiales.

El PDF de referencia y `graphify-out/` permanecen en el equipo y **no se publican**. Para publicar ejecuta `npm run deploy` (compila mediante `predeploy` y sube `dist/` a `gh-pages`). Luego configura **Settings → Pages → Deploy from a branch → gh-pages → /(root)**. Las rutas emplean `#/` para que los enlaces internos funcionen en GitHub Pages.
