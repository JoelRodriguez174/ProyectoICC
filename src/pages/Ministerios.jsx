import React from 'react'
import MinistryCard from '../components/molecules/MinistryCard'
import useStore from '../store/useStore'

const Ministerios = () => {
  const { ministries } = useStore()

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      {/* Fixed Background Image */}
      <div className="fixed inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&q=80&w=2000" 
          alt="Iglesia Casa del Alfarero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 pt-32 pb-24 px-6 max-w-7xl mx-auto w-full">
        {/* Title Section */}
        <div className="mb-20 text-center reveal-active">
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-6 leading-none">
            Nuestros <br className="md:hidden" /> Ministerios
          </h1>
          <p className="text-white/60 text-lg md:text-xl font-medium max-w-2xl mx-auto uppercase tracking-widest leading-relaxed">
            Descubre las diferentes áreas donde puedes conectar, servir y crecer junto a nuestra comunidad.
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {ministries.map((m) => (
            <MinistryCard 
              key={m.id}
              title={m.title}
              description={m.description}
              image={m.image}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Ministerios
