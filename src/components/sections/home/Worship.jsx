import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

const Worship = () => {
  return (
    <section className="relative h-[80vh] w-full flex items-center justify-start overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=2000" 
          alt="Worship" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
      </div>
      <div className="content-z px-6 md:px-24 reveal">
        <h2 className="text-5xl md:text-8xl font-black text-white mb-8">
          ÚNETE A <br /> LA ADORACIÓN
        </h2>
        <Link to="/contacto" className="btn-primary-door">
          HORARIOS DE SERVICIOS <ChevronRight size={18} />
        </Link>
      </div>
    </section>
  )
}

export default Worship
