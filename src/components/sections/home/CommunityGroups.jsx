import React from 'react'
import { ChevronRight } from 'lucide-react'

const CommunityGroups = () => {
  return (
    <section className="py-32 px-6 bg-gray-50">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        
        <div className="reveal">
          <div className="aspect-[4/3] overflow-hidden bg-black mb-8">
            <img 
              src="https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&q=80&w=1000" 
              alt="Grupos Pequeños" 
              className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
            />
          </div>
          <h3 className="text-3xl font-black mb-4">GRUPOS PEQUEÑOS</h3>
          <p className="text-gray-500 font-medium mb-8 max-w-md">
            La vida se vive mejor juntos. Encuentra un groupo donde puedas crecer y compartir tu camino.
          </p>
          <button className="btn-primary-door !bg-black !text-white hover:!bg-gray-800">
            ENCONTRAR GRUPO <ChevronRight size={18} />
          </button>
        </div>

        <div className="reveal" style={{ transitionDelay: '200ms' }}>
          <div className="aspect-[4/3] overflow-hidden bg-black mb-8">
            <img 
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1000" 
              alt="Jóvenes" 
              className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-700"
            />
          </div>
          <h3 className="text-3xl font-black mb-4">Reuniones de Jovenes</h3>
          <p className="text-gray-500 font-medium mb-8 max-w-md">
            Reuniones especiales orientada para jovenes con comida y juegos.
          </p>
          <button className="btn-primary-door !bg-black !text-white hover:!bg-gray-800">
            VER MÁS <ChevronRight size={18} />
          </button>
        </div>

      </div>
    </section>
  )
}

export default CommunityGroups
