import React from 'react'
import { ChevronRight } from 'lucide-react'

const NewHere = () => {
  return (
    <section className="bg-black pt-40 pb-6 px-6 text-center reveal">
      <h2 className="text-5xl md:text-8xl font-black text-white mb-12">¿ERES NUEVO?</h2>
      <p className="text-white/40 font-bold uppercase tracking-[0.4em] mb-12">Queremos conocerte y acompañarte</p>
      <div className="flex justify-center">
        <button className="btn-primary-door">
          ESTOY INTERESADO <ChevronRight size={18} />
        </button>
      </div>
    </section>
  )
}

export default NewHere
