import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { routes } from '../../routes'
import Logo from '../atoms/Logo'
import useStore from '../../store/useStore'

function Header() {
  const { isMenuOpen, toggleMenu, closeMenu, isScrolled, setIsScrolled, events, fetchEvents } = useStore()
  const location = useLocation()
  
  const isLightPage = false // Removed /productos as it now has a dark background image

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

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

  // Determinar si hay un anuncio activo para eventos importantes (hoy o en los próximos 3 días)
  const getActiveAnnouncement = () => {
    if (!events || events.length === 0) return null

    const today = new Date()
    const pad = (n) => String(n).padStart(2, '0')
    const todayStr = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`

    // 1. Buscar evento programado para hoy (o activo hoy si dura varios días)
    const eventToday = events.find(e => {
      if (e.end_date) {
        return todayStr >= e.start_date && todayStr <= e.end_date
      }
      return e.start_date === todayStr
    })
    
    if (eventToday) {
      const isMultiDay = eventToday.end_date && eventToday.start_date !== eventToday.end_date
      return {
        type: 'today',
        text: isMultiDay 
          ? `¡ACTIVO HOY! ${eventToday.title} - ${eventToday.time} en ${eventToday.location || 'Templo Central'}`
          : `¡HOY! ${eventToday.title} - ${eventToday.time} en ${eventToday.location || 'Templo Central'}`,
        event: eventToday
      }
    }

    // 2. Buscar evento más cercano en los próximos 3 días
    const threeDaysFromNow = new Date()
    threeDaysFromNow.setDate(today.getDate() + 3)
    const threeDaysStr = `${threeDaysFromNow.getFullYear()}-${pad(threeDaysFromNow.getMonth() + 1)}-${pad(threeDaysFromNow.getDate())}`

    const nextEvents = events
      .filter(e => {
        return e.start_date > todayStr && e.start_date <= threeDaysStr
      })
      .sort((a, b) => new Date(a.start_date) - new Date(b.start_date))

    if (nextEvents.length > 0) {
      const nextEv = nextEvents[0]
      const dateParts = nextEv.start_date.split('-')
      const formattedDate = `${dateParts[2]}/${dateParts[1]}`
      return {
        type: 'upcoming',
        text: `PRÓXIMO EVENTO (${formattedDate}): ${nextEv.title} a las ${nextEv.time}`,
        event: nextEv
      }
    }

    return null
  }

  const announcement = getActiveAnnouncement()

  return (
    <>
      <header className={`fixed top-0 z-50 w-full flex flex-col transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100' : 'bg-transparent'}`}>
        
        {/* Banner de Anuncios Especiales */}
        {announcement && (
          <div className="w-full bg-black text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] py-2 px-4 flex items-center justify-center gap-2 border-b border-white/10 transition-all duration-300">
            <span className={`w-1.5 h-1.5 rounded-full ${announcement.type === 'today' ? 'bg-red-500 animate-ping' : 'bg-white/50'}`} />
            <span className="truncate">{announcement.text}</span>
            <Link 
              to="/calendario" 
              className="underline hover:text-white/80 transition-colors ml-2 flex-shrink-0 text-[8px] font-bold tracking-widest"
            >
              Ver Detalles
            </Link>
          </div>
        )}

        <div className="w-full h-15 flex items-center justify-between px-4 md:px-8">
          
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
