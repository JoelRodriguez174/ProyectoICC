import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

const Hero = () => {
  return (
    <section className="section-hero">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&q=80&w=2000" 
          alt="Iglesia Casa del Alfarero" 
          className="w-full h-full object-cover"
        />
        <div className="overlay bg-black/60"></div>
      </div>
      
      <div className="content-z text-center px-6 reveal">
        <h1 className="text-5xl md:text-8xl font-black text-white leading-none mb-8">
          BIENVENIDO <br /> A <br /> CASA DEL ALFARERO
        </h1>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-px h-16 bg-white/50"></div>
      </div>
    </section>
  )
}

export default Hero
