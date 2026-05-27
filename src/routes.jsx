import React from 'react'
import Home from './pages/Home'
import Ministerios from './pages/Ministerios'
import Contact from './pages/Contact'
import About from './pages/About'
import { Ubication } from './pages/Ubication'
import MinistryDetail from './pages/MinistryDetail'

export const routes = [
  {
    path: '/',
    element: <Home />,
    label: 'Inicio'
  },
  {
    path: '/sobre-nosotros',
    element: <About />,
    label: 'Sobre Nosotros'
  },
  {
    path: '/ministerios',
    element: <Ministerios />,
    label: 'Ministerios'
  },
  {
    path: '/contacto',
    element: <Contact />,
    label: 'Contacto'
  },
  {
    path: '/ubicacion',
    element: <Ubication />,
    label: 'Ubicacion'
  },
  {
    path: '/ministerios/:slug',
    element: <MinistryDetail />,
    label: 'Detalle de Ministerio',
    hidden: true
  }
]

