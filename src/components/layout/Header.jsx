import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { routes } from '../../routes'
import Logo from '../atoms/Logo'
import useStore from '../../store/useStore'

const Header = () => {
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

  return (
    <>
      <header className={`fixed top-0 z-50 w-full h-24 flex items-center px-4 md:px-8 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md h-20 shadow-md border-b border-gray-100' : 'bg-transparent'}`}>
        <div className="w-full flex items-center justify-between">
          
          <Link to="/" className="flex items-center gap-4 group" onClick={() => { window.scrollTo(0, 0); closeMenu(); }}>
            <Logo className="w-14 h-14 md:w-16 md:h-16" />
            <div className="flex flex-col leading-none">
              <span className={`text-xl md:text-2xl font-black uppercase tracking-tighter transition-colors duration-500 ${(isScrolled || isLightPage) ? 'text-black' : 'text-white'}`}>
                Iglesia
              </span>
              <span className={`text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] transition-colors duration-500 ${(isScrolled || isLightPage) ? 'text-gray-500' : 'text-gray-300'}`}>
                Casa del Alfarero
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            <Link to="/" className={`nav-link ${(isScrolled || isLightPage) ? 'text-black hover:text-gray-400' : 'text-white hover:text-gray-900'}`}>Inicio</Link>
            <Link to="/ministerios" className={`nav-link ${(isScrolled || isLightPage) ? 'text-black hover:text-gray-400' : 'text-white hover:text-gray-900'}`}>Ministerios</Link>
            <Link to="/contacto" className={`nav-link ${(isScrolled || isLightPage) ? 'text-black hover:text-gray-400' : 'text-white hover:text-gray-900'}`}>Contacto</Link>
          </nav>

          <button 
            onClick={toggleMenu}
            className={`lg:hidden p-2 transition-colors duration-500 ${(isScrolled || isLightPage) ? 'text-black' : 'text-white'}`}
          >
            <Menu size={36} />
          </button>
        </div>
      </header>

      <div className={`fixed inset-0 z-[60] transition-all duration-700 ease-in-out ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/98 flex flex-col items-center justify-center p-12 text-center">
          <button onClick={closeMenu} className="absolute top-8 right-8 text-white hover:text-gray-400 transition-colors">
            <X size={48} strokeWidth={1} />
          </button>
          <nav className="flex flex-col gap-10">
            {routes.map((route) => (
              <Link 
                key={route.path}
                to={route.path} 
                className="text-5xl font-black text-white uppercase tracking-tighter hover:text-gray-400 transition-colors"
                onClick={closeMenu}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}

export default Header
