import React from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Youtube } from 'lucide-react'
import Logo from '../atoms/Logo'

function Footer() {
  return (
    <footer className="bg-black text-white pb-24 px-6 relative z-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-8 pt-12">
        <Link 
          to="/" 
          className="flex items-center gap-4 group justify-center" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          
          <div className="flex flex-col leading-none text-left">
            <span className="text-xl text-center md:text-2xl font-black uppercase tracking-tighter text-white transition-colors duration-300 group-hover:text-gray-300">
              Iglesia
            </span>
            <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400 transition-colors duration-300 group-hover:text-gray-200">
              Casa del Alfarero
            </span>
          </div>
        </Link>

        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          <Link to="/ubicacion" className="nav-link !text-[12px] md:!text-sm text-white/70 hover:text-white">Ubicación</Link>
          <Link to="/ministerios" className="nav-link !text-[12px] md:!text-sm text-white/70 hover:text-white">Ministerios</Link>
          <Link to="/sobre-nosotros" className="nav-link !text-[12px] md:!text-sm text-white/70 hover:text-white">Sobre Nosotros</Link>
          <Link to="/calendario" className="nav-link !text-[12px] md:!text-sm text-white/70 hover:text-white">Calendario</Link>
          <Link to="/contacto" className="nav-link !text-[12px] md:!text-sm text-white/70 hover:text-white">Contacto</Link>
        </div>

        <div className="flex items-center gap-6 mt-2">
          <a 
            href="https://www.instagram.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-black hover:bg-white hover:border-white transition-all duration-300 group"
            aria-label="Instagram"
          >
            <Instagram size={20} className="transition-transform duration-300 group-hover:scale-110" />
          </a>
          <a 
            href="https://www.youtube.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-black hover:bg-white hover:border-white transition-all duration-300 group"
            aria-label="YouTube"
          >
            <Youtube size={20} className="transition-transform duration-300 group-hover:scale-110" />
          </a>
        </div>

        <p className="text-white/60 text-xs md:text-xs font-bold uppercase tracking-[0.3em] mt-4">
          3 de febrero 660, Villa Mercedes, San Luis, Argentina
        </p>
        <p className="text-white/60 text-xs md:text-xs font-bold uppercase tracking-[0.3em]">
          (2657) 51-2384 • iglesiaICC@gmail.com
        </p>
      </div>
    </footer>
  )
}

export default Footer
