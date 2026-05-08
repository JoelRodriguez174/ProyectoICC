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
      <header className={`fixed top-0 z-50 w-full h-15 flex items-center px-4 md:px-8 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md h-15 shadow-md border-b border-gray-100' : 'bg-transparent'}`}>
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
            <Link to="/" className={`nav-link text-[13px] ${(isScrolled || isLightPage) ? 'text-black hover:text-gray-400' : 'text-white hover:text-gray-900'}`}>Inicio</Link>
            <Link to="/ministerios" className={`nav-link text-[13px] ${(isScrolled || isLightPage) ? 'text-black hover:text-gray-400' : 'text-white hover:text-gray-900'}`}>Ministerios</Link>
            <Link to="/contacto" className={`nav-link text-[13px] ${(isScrolled || isLightPage) ? 'text-black hover:text-gray-400' : 'text-white hover:text-gray-900'}`}>Contacto</Link>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header
