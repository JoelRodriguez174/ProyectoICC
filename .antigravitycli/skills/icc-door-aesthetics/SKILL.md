---
name: icc-door-aesthetics
description: |
  Aplica el diseño visual y estético "Door Church" del proyecto Iglesia Casa del Alfarero (ProyectoICCVM).
  Triggers when:
  - Creando o editando componentes de UI.
  - Diseñando secciones de páginas, botones, animaciones o elementos visuales.
  - Trabajando con tipografía, colores, imágenes y transiciones.
---

# Estilo y Estética "Door Church" (ProyectoICCVM)

Esta guía de habilidades proporciona las directrices y reglas específicas para crear y modificar interfaces en el proyecto **Iglesia Casa del Alfarero**, manteniendo un diseño de alto impacto visual y coherente con la identidad estética elegida.

## 1. Sistema de Colores (Tailwind Config)
Los colores principales del proyecto están definidos en `tailwind.config.js` y deben usarse en toda la aplicación:
- **Fondo Principal:** `bg-bg-main` (`#ffffff`)
- **Texto Principal / Títulos:** `text-primary` o `text-black` (`#000000`)
- **Texto Secundario:** `text-secondary` (`#4b5563`)
- **Acento:** `text-accent` (`#ef4444`)
- **Fondo Secundario:** `bg-bg-secondary` (`#f9fafb`)

Para fondos oscuros en secciones de imagen o Hero:
- Usar texto blanco (`text-white`).
- Colocar siempre una capa de overlay oscuro (`bg-black/60` o gradientes de negro a transparente) para garantizar la legibilidad del texto sobre las imágenes.

## 2. Tipografía y Estilo de Textos
La tipografía del proyecto se caracteriza por ser audaz, limpia y en mayúsculas:
- **Títulos (H1 - H6):** Siempre usar mayúsculas, negrita extrema y tracking ajustado:
  `font-black uppercase tracking-tighter` (o `leading-none` / `leading-tight`).
- **Separadores o subtítulos pequeños:** Usar texto en mayúsculas, tamaño de fuente pequeño, y tracking muy espaciado:
  `text-[10px] font-black uppercase tracking-[0.5em] text-gray-400`.
- **Saltos de línea en títulos (`<br />`):** Es común estructurar los títulos principales dividiéndolos con saltos de línea para darles un aspecto moderno y vertical de estilo póster/editorial.

## 3. Botones Especiales (Estilo "Door")
Existen dos clases personalizadas de botones predefinidas en `src/index.css` que representan el diseño sólido y limpio de la iglesia:
1. **Botón Primario (`.btn-primary-door`):**
   - **Estilo:** Fondo blanco, texto negro, tracking espaciado, fuente ultra-negrita.
   - **Hover:** Transición suave a fondo negro y texto blanco.
   - **Clase Tailwind equivalente:** `bg-white text-black px-6 py-4 font-black uppercase tracking-widest text-xs hover:bg-black hover:text-white transition-all duration-500`
2. **Botón de Contorno (`.btn-outline-door`):**
   - **Estilo:** Borde blanco, texto blanco, tracking espaciado, relleno transparente.
   - **Hover:** Transición suave a fondo blanco y texto negro.
   - **Clase Tailwind equivalente:** `border-2 border-white text-white px-10 py-4 font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all duration-500`

## 4. Animaciones al Hacer Scroll
El proyecto utiliza una animación personalizada basada en `IntersectionObserver` que detecta los elementos visibles:
- **Clase base:** Añadir la clase `reveal` a los contenedores o elementos que desees animar. Esto aplica una opacidad de 0 y un desplazamiento hacia abajo (`translate-y-8`).
- **Clase activa:** El observer en `src/pages/Home.jsx` añadirá automáticamente `reveal-active` cuando el elemento entre en el viewport, restaurando la opacidad a 1 y moviéndolo a su posición original con una transición suave de 1 segundo.

## 5. Tratamiento de Imágenes
- **Imágenes de Fondo:** Usar imágenes de alta calidad (preferiblemente de Unsplash) con `object-cover` y `w-full h-full`.
- **Efecto visual:** Para mantener la estética elegante de alto contraste, se promueve el uso de imágenes monocromáticas o con un overlay oscuro y transiciones suaves al hacer hover sobre tarjetas o elementos interactivos.
