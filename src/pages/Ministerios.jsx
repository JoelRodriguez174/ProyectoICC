import React, { useEffect } from 'react'
import MinistryCard from '../components/molecules/MinistryCard'
import useStore from '../store/useStore'

// Skeleton card to show during dynamic loading
const MinistrySkeleton = () => (
  <div className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
    <div className="aspect-[16/9] bg-gray-200 animate-pulse mb-6 border border-black/5"></div>
    <div className="h-6 bg-gray-200 animate-pulse w-3/4 mb-3"></div>
    <div className="space-y-2 mb-6">
      <div className="h-4 bg-gray-200 animate-pulse w-full"></div>
      <div className="h-4 bg-gray-200 animate-pulse w-5/6"></div>
    </div>
    <div className="h-4 bg-gray-200 animate-pulse w-1/4"></div>
  </div>
)

const Ministerios = () => {
  const { ministries, fetchMinistries, isLoadingMinistries } = useStore()

  useEffect(() => {
    fetchMinistries()
  }, [fetchMinistries])

  // Grid dinámico
  const getGridClasses = () => {
    if (isLoadingMinistries) {
      return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
    }
    if (ministries.length === 1) {
      return "grid grid-cols-1 max-w-xl mx-auto gap-12"
    }
    if (ministries.length === 2) {
      return "grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-12"
    }
    return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <div className="fixed inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&q=80&w=2000" 
          alt="Iglesia Casa del Alfarero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75"></div>
      </div>

      <div className="relative z-10 flex-1 pt-32 pb-24 px-6 max-w-7xl mx-auto w-full">
        <div className="mb-20 text-center reveal-active">
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-6 leading-none">
            Nuestros <br className="md:hidden" /> Ministerios
          </h1>
          <p className="text-white/60 text-lg md:text-xl font-medium max-w-2xl mx-auto uppercase tracking-widest leading-relaxed">
            Descubre las diferentes áreas donde puedes conectar, servir y crecer junto a nuestra comunidad.
          </p>
        </div>

        <div className={getGridClasses()}>
          {isLoadingMinistries ? (
            Array.from({ length: 3 }).map((_, i) => <MinistrySkeleton key={i} />)
          ) : ministries.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-xl mx-auto text-black">
              <p className="font-black uppercase tracking-widest text-lg mb-2">No se encontraron ministerios</p>
              <p className="text-secondary text-sm">Vuelve a intentarlo más tarde o ponte en contacto con nosotros.</p>
            </div>
          ) : (
            ministries.map((m) => (
              <MinistryCard 
                key={m.id}
                slug={m.slug}
                title={m.title}
                description={m.description}
                image={m.image}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Ministerios
