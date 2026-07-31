import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { routes } from '../../routes'
import Logo from '../atoms/Logo'
import useStore from '../../store/useStore'

function Header() {
  const { isMenuOpen, toggleMenu, closeMenu, isScrolled, setIsScrolled } = useStore()
  const location = useLocation()
  
  const isLightPage = false // Removed /productos as it now has a dark background image

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setIsScrolled])

  // Close menu when route changes
  useEffect(() => {
    closeMenu()
  }, [location, closeMenu])

  return (
    <>
      <header className={`fixed top-0 z-50 w-full h-15 flex items-center px-4 md:px-8 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md h-15 shadow-md border-b border-gray-100' : 'bg-transparent'}`}>
        <div className="w-full flex items-center justify-between">
          
          <Link to="/" className="flex items-center gap-4 group" onClick={() => { window.scrollTo(0, 0); closeMenu(); }}>
            <Logo className="w-14 h-14 mt-2 md:w-16 md:h-16" />
            <div className="flex flex-col leading-none">
              <span className={`text-xl md:text-2xl font-black uppercase tracking-tighter transition-colors duration-500 ${(isScrolled || isLightPage) ? 'text-black' : 'text-white'}`}>
                Iglesia
              </span>
              <span className={`text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] transition-colors duration-500 ${(isScrolled || isLightPage) ? 'text-gray-500' : 'text-gray-300'}`}>
                Casa del Alfarero
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            <Link to="/" className={`nav-link text-[13px] ${(isScrolled || isLightPage) ? 'text-black hover:text-gray-400' : 'text-white hover:text-gray-800'}`}>Inicio</Link>
            <Link to="/sobre-nosotros" className={`nav-link text-[13px] ${(isScrolled || isLightPage) ? 'text-black hover:text-gray-400' : 'text-white hover:text-gray-800'}`}>Sobre Nosotros</Link>
            <Link to="/ministerios" className={`nav-link text-[13px] ${(isScrolled || isLightPage) ? 'text-black hover:text-gray-400' : 'text-white hover:text-gray-800'}`}>Ministerios</Link>
            <Link to="/ubicacion" className={`nav-link text-[13px] ${(isScrolled || isLightPage) ? 'text-black hover:text-gray-400' : 'text-white hover:text-gray-800'}`}>Ubicación</Link>
            <Link to="/calendario" className={`nav-link text-[13px] ${(isScrolled || isLightPage) ? 'text-black hover:text-gray-400' : 'text-white hover:text-gray-800'}`}>Calendario</Link>
            <Link to="/contacto" className={`nav-link text-[13px] ${(isScrolled || isLightPage) ? 'text-black hover:text-gray-400' : 'text-white hover:text-gray-800'}`}>Contacto</Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className={`lg:hidden p-2 transition-colors duration-500 ${(isScrolled || isLightPage) ? 'text-black' : 'text-white'}`}
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Menu (1/4 Width) */}
      <div 
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeMenu}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
      </div>

      <div 
        className={`fixed top-0 right-0 z-50 h-full w-1/4 min-w-[120px] bg-white/60 backdrop-blur-lg shadow-2xl transform transition-transform duration-500 ease-in-out lg:hidden flex flex-col ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full pt-24 px-4">
          <nav className="flex flex-col gap-6">
            <Link 
              to="/" 
              className="text-sm font-black uppercase tracking-widest text-black hover:bg-black hover:text-white transition-all duration-300 p-2 border-b border-black/5"
              onClick={closeMenu}
            >
              Inicio
            </Link>
            <Link 
              to="/sobre-nosotros" 
              className="text-sm font-black uppercase tracking-widest text-black hover:bg-black hover:text-white transition-all duration-300 p-2 border-b border-black/5"
              onClick={closeMenu}
            >
              Sobre Nosotros
            </Link>
            <Link 
              to="/ministerios" 
              className="text-sm font-black uppercase tracking-widest text-black hover:bg-black hover:text-white transition-all duration-300 p-2 border-b border-black/5"
              onClick={closeMenu}
            >
              Ministerios
            </Link>
            <Link 
              to="/calendario" 
              className="text-sm font-black uppercase tracking-widest text-black hover:bg-black hover:text-white transition-all duration-300 p-2 border-b border-black/5"
              onClick={closeMenu}
            >
              Calendario
            </Link>
            <Link 
              to="/contacto" 
              className="text-sm font-black uppercase tracking-widest text-black hover:bg-black hover:text-white transition-all duration-300 p-2 border-b border-black/5"
              onClick={closeMenu}
            >
              Contacto
            </Link>
          </nav>
          
          <div className="mt-auto mb-8 flex flex-col items-center text-center">
            <Logo className="w-10 h-10 grayscale opacity-30 mb-2" />
            <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-gray-400">
              Casa del Alfarero
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
