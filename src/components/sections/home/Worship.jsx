import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

function Worship() {
  return (
    <section className="relative min-h-[80vh] py-16 md:py-24 w-full flex items-center justify-start overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=2000" 
          alt="Worship" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>
      </div>
      <div className="content-z px-6 md:px-12 lg:px-24 reveal w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <h2 className="text-5xl md:text-8xl font-black text-white mb-8 leading-none">
              UNITE A <br /> NOSOTROS
            </h2>
            <Link to="/ubicacion" className="btn-primary-door">
              CÓMO LLEGAR <ChevronRight size={18} />
            </Link>
          </div>
          <div className="lg:col-span-5 bg-black/45 backdrop-blur-md border border-white/10 p-8 md:p-12 text-white w-full">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gray-400 mb-8 border-b border-white/10 pb-3">
              Horarios de Servicios
            </h3>
            <ul className="space-y-8">
              <li className="flex justify-between items-end border-b border-white/10 pb-4">
                <span className="font-black text-xl uppercase tracking-wider">Miércoles</span>
                <span className="text-gray-300 text-base font-bold uppercase tracking-widest pb-0.5">7:00 PM</span>
              </li>
              <li className="flex justify-between items-end border-b border-white/10 pb-4">
                <span className="font-black text-xl uppercase tracking-wider">Domingo</span>
                <div className="text-right flex flex-col gap-1">
                  <span className="text-gray-300 text-base font-bold uppercase tracking-widest">11:00 AM</span>
                  <span className="text-gray-300 text-base font-bold uppercase tracking-widest">7:00 PM</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Worship
