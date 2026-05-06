import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../atoms/Logo'

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-12 pb-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-12">
        <Logo className="w-24 h-24" />
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          <Link to="/ubicacion" className="nav-link text-white/60 hover:text-white">Ubicación</Link>
          <Link to="/ministerios" className="nav-link text-white/60 hover:text-white">Ministerios</Link>
          <Link to="/contacto" className="nav-link text-white/60 hover:text-white">Sobre Nosotros</Link>
        </div>
        <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.3em]">
          3 de febrero 660, Villa Mercedes, San Luis
        </p>
      </div>
    </footer>
  )
}

export default Footer
