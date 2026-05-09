import React from 'react'
import { Users, Heart, Shield, Star } from 'lucide-react'

const About = () => {
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
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

        {/* Values Section */}
        <div className="bg-black/50 backdrop-blur-md border-2 border-white/20 p-12 text-white">
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
