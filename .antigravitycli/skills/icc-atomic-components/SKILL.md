---
name: icc-atomic-components
description: |
  Guía la estructura de componentes atómicos, nomenclatura y responsividad de ProyectoICCVM.
  Triggers when:
  - Creando nuevos componentes o reorganizando existentes.
  - Creando layouts, secciones de página, moléculas o átomos.
  - Diseñando la responsividad y accesibilidad de los componentes en React.
---

# Estructura Atómica de Componentes (ProyectoICCVM)

Este documento detalla las convenciones para organizar y escribir componentes de React dentro de la estructura de carpetas de **Iglesia Casa del Alfarero**.

## 1. Organización de Componentes (`src/components/`)
Seguimos una metodología inspirada en Diseño Atómico para organizar la interfaz:
* **`atoms/` (Átomos):** Los componentes más pequeños e indivisibles. No tienen dependencias de otros componentes de la aplicación.
  - *Ejemplos:* `Logo.jsx`, `ScrollToTop.jsx`, botones personalizados individuales.
* **`molecules/` (Moléculas):** Combinaciones de dos o más átomos para crear un componente funcional simple.
  - *Ejemplos:* `Chatbot.jsx`, `ChurchMap.jsx`, `InfoCard.jsx`.
* **`organisms/` (Organismos):** Componentes más complejos compuestos de moléculas y átomos que forman secciones funcionales de la UI.
* **`layout/` (Diseños globales):** Elementos que definen la estructura general de la página en la que se renderizan las vistas.
  - *Ejemplos:* `Header.jsx`, `Footer.jsx`.
* **`sections/` (Secciones de página):** Componentes de sección de gran tamaño, estructurados generalmente por página.
  - *Ejemplos:* `src/components/sections/home/Hero.jsx`, `Vision.jsx`, `Worship.jsx`, `CommunityGroups.jsx`, `NewHere.jsx`.

## 2. Convenciones de Código
- **Componentes Funcionales:** Siempre definir componentes utilizando la sintaxis de funciones flecha (`const MiComponente = () => { ... }`).
- **Exportaciones:** Usar preferiblemente la exportación por defecto (`export default MiComponente`) al final del archivo para componentes principales de sección, o exportaciones nombradas (`export const MiComponente ...`) cuando corresponda.
- **Tipado y Props:** Documentar claramente el propósito de las props si el componente es complejo mediante comentarios JSDoc, ya que es un proyecto en JavaScript (React sin TypeScript).
- **Consistencia de Iconos:** Usar únicamente la librería `lucide-react` para mantener consistencia visual en toda la aplicación.

## 3. Diseño Responsivo (Mobile-First)
- Diseñar siempre pensando en dispositivos móviles primero.
- Utilizar los prefijos responsivos de Tailwind (`sm:`, `md:`, `lg:`, `xl:`) para adaptar los layouts.
- *Ejemplo de rejilla responsiva en secciones:*
  ```jsx
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
     {/* Elementos */}
  </div>
  ```
- *Ejemplo de tipografía responsiva:*
  ```jsx
  <h2 className="text-3xl md:text-6xl font-black text-black">
     TÍTULO RESPONSIVO
  </h2>
  ```
- Asegurar que los espaciados amplios (`py-32`, `px-6 md:px-24`) mantengan el diseño editorial limpio tanto en pantallas móviles como de escritorio.
