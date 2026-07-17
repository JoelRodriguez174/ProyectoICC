import React, { useState, useEffect } from 'react'
import { Users, Heart, Shield, MapPin } from 'lucide-react'
import { churchLocations } from '../utils/churchLocations'

const About = () => {
  // Default selection is the headquarters (Villa Mercedes)
  const [selectedChurch, setSelectedChurch] = useState(churchLocations[0])

  // Setup scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active')
        }
      })
    }, observerOptions)

    const revealElements = document.querySelectorAll('.reveal')
    revealElements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      {/* Fixed Background Image */}
      <div className="fixed inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&q=80&w=2000"
          alt="Sobre Nosotros"
          className="w-full h-full object-cover grayscale brightness-50"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 pt-32 pb-24 px-4 md:px-12 max-w-7xl mx-auto w-full">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-4">Sobre Nosotros</h1>
          <p className="text-white/60 text-lg md:text-xl font-medium max-w-2xl mx-auto uppercase tracking-widest">
            Nuestra historia, nuestra misión y nuestra familia.
          </p>
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24 reveal">
          <div className="bg-white border-2 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-6 flex items-center gap-3">
              Nuestra Misión
            </h2>
            <p className="font-bold text-lg leading-relaxed mb-4">
              Existimos para glorificar a Dios haciendo discípulos de Jesucristo que vivan y compartan el Evangelio en Villa Mercedes y más allá.
            </p>
            <p className="text-black/70 font-medium">
              Creemos en una iglesia vibrante, bíblica y comprometida con la transformación de vidas a través del amor de Dios.
            </p>
          </div>

          <div className="bg-white border-2 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-6 flex items-center gap-3">
              Nuestra Familia
            </h2>
            <p className="font-bold text-lg leading-relaxed mb-4">
              Iglesia Casa del Alfarero es más que una organización; es una comunidad de creyentes que se apoyan mutuamente.
            </p>
            <p className="text-black/70 font-medium">
              Aquí encontrarás un lugar para pertenecer, crecer espiritualmente y servir a los demás con tus talentos.
            </p>
          </div>
        </div>

        {/* Dynamic Churches Section (Replacing the mapamundi) */}
        <div className="bg-black/60 border-2 border-white/10 p-6 md:p-12 backdrop-blur-md text-white mb-24 reveal">
          <div className="mb-10">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Presencia Global</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mt-2 leading-none">
              Nuestras Iglesias
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* List of Churches (1/3 Width) */}
            <div className="flex flex-col gap-3">
              {churchLocations.map((church) => {
                const isSelected = selectedChurch.id === church.id
                return (
                  <button
                    key={church.id}
                    onClick={() => setSelectedChurch(church)}
                    className={`text-left px-5 py-4 font-black uppercase tracking-widest text-[11px] border-2 transition-all duration-300 ${
                      isSelected 
                        ? 'bg-white text-black border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)]' 
                        : 'bg-transparent text-white border-white/20 hover:border-white/60'
                    }`}
                  >
                    {church.city}
                  </button>
                )
              })}
            </div>

            {/* Selected Church Detail panel (2/3 Width) */}
            <div className="lg:col-span-2 bg-zinc-950/40 border border-white/10 p-6 md:p-8 flex flex-col md:flex-row gap-8 shadow-2xl">
              
              {/* Church City Image */}
              <div className="w-full md:w-1/2 aspect-[4/3] md:aspect-[3/4] overflow-hidden border border-white/10 relative group">
                <img 
                  src={selectedChurch.image} 
                  alt={selectedChurch.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Church Description Card */}
              <div className="w-full md:w-1/2 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-tight mb-2">
                    {selectedChurch.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 mb-6">
                    <MapPin size={14} className="text-red-500" />
                    <span>{selectedChurch.address}</span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed font-medium">
                    {selectedChurch.details}
                  </p>
                </div>
                
                {/* Modern Footer tag */}
                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-end">
                  <span className="text-[9px] font-bold text-white uppercase bg-red-600 px-2 py-0.5 tracking-wider">
                    {selectedChurch.id === 'devoto' ? 'Sede Central' : 'Misión'}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-black/50 backdrop-blur-md border-2 border-white/20 p-12 text-white reveal">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-12 text-center">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="flex justify-center mb-6 text-white">
                <Heart size={48} />
              </div>
              <h3 className="text-xl font-black uppercase mb-4">Amor Genuino</h3>
              <p className="text-white/60 font-medium">Reflejamos el amor de Cristo en cada acción y relación.</p>
            </div>
            <div>
              <div className="flex justify-center mb-6 text-white">
                <Shield size={48} />
              </div>
              <h3 className="text-xl font-black uppercase mb-4">Integridad Bíblica</h3>
              <p className="text-white/60 font-medium">La Palabra de Dios es nuestra guía absoluta y fundamento.</p>
            </div>
            <div>
              <div className="flex justify-center mb-6 text-white">
                <Users size={48} />
              </div>
              <h3 className="text-xl font-black uppercase mb-4">Comunidad</h3>
              <p className="text-white/60 font-medium">Crecemos mejor cuando estamos conectados y unidos.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
