---
name: icc-state-and-routing
description: |
  Instrucciones para gestionar el estado global con Zustand (src/store/useStore.js) y las rutas de React Router DOM v6 en ProyectoICCVM.
  Triggers when:
  - Agregando o modificando estados globales de la aplicación.
  - Creando nuevas páginas o agregando rutas en `src/routes.jsx`.
  - Manipulando navegación o enlaces en componentes.
---

# Gestión de Estado y Enrutamiento (ProyectoICCVM)

Esta guía detalla las mejores prácticas y convenciones del proyecto para manejar el flujo de datos y la navegación.

## 1. Gestión de Estado con Zustand
El proyecto utiliza Zustand como manejador de estado global centralizado en `src/store/useStore.js`.

### Cuándo usar el Estado Global:
- Estados de navegación compartidos entre componentes hermanos (por ejemplo, si el menú móvil `isMenuOpen` está abierto, o si la página se ha deslizado hacia abajo `isScrolled` para cambiar la apariencia del Header).
- Datos globales estáticos o dinámicos que se consumen en múltiples páginas (como la lista de ministerios, eventos o información de contacto).

### Ejemplo de Consumo de Estado en un Componente:
```jsx
import useStore from '../store/useStore'

const Header = () => {
  const isMenuOpen = useStore((state) => state.isMenuOpen)
  const toggleMenu = useStore((state) => state.toggleMenu)

  return (
    <button onClick={toggleMenu}>
      {isMenuOpen ? 'Cerrar' : 'Menú'}
    </button>
  )
}
```

### Cuándo usar Estado Local (`useState`):
- Lógicas puramente locales de interacción del UI de un solo componente que no afectan al resto de la aplicación (por ejemplo, abrir un modal de formulario de contacto local, o el texto ingresado en un campo de entrada local).

---

## 2. Configuración de Enrutamiento (`src/routes.jsx`)
Las rutas de la aplicación están centralizadas en `src/routes.jsx` y exportan un arreglo de objetos de ruta:

```javascript
export const routes = [
  {
    path: '/',
    element: <Home />,
    label: 'Inicio'
  },
  ...
]
```

### Reglas para Crear Nuevas Páginas y Rutas:
1. Crea el componente de la página dentro de `src/pages/` (por ejemplo, `src/pages/NuevaPagina.jsx`).
2. Importa la página en `src/routes.jsx` y agrégala al arreglo `routes` especificando:
   - `path`: La ruta URL relativa (ej. `/nueva-pagina`).
   - `element`: El componente de React (ej. `<NuevaPagina />`).
   - `label`: El nombre legible para los menús de navegación (ej. `'Nueva Página'`).
3. El `Header` y otros menús iterarán sobre este arreglo de rutas automáticamente para renderizar los enlaces.

### Basename en el Enrutador
El enrutador está configurado con un `basename` en `src/App.jsx`:
```jsx
<Router basename="/ProyectoICC">
  <AppContent />
</Router>
```
**Importante:**
- Al utilizar el componente `<Link to="..." />` de `react-router-dom`, proporciona rutas relativas normales sin incluir `/ProyectoICC`. React Router gestionará automáticamente el prefijo de la subcarpeta.
- Asegúrate de que las rutas relativas no comiencen con el basename manual para evitar duplicaciones como `/ProyectoICC/ProyectoICC/ubicacion`.
