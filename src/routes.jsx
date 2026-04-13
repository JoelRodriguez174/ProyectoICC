import React from 'react'
import Home from './pages/Home'
import Ministerios from './pages/Ministerios'
import Contact from './pages/Contact'

export const routes = [
  {
    path: '/',
    element: <Home />,
    label: 'Inicio'
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
  }
]
