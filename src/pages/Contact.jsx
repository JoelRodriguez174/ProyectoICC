import React from 'react'
import { MapPin, Phone, Clock, Mail, Send, MessageCircleMore } from 'lucide-react'
import InfoCard from '../components/molecules/InfoCard'
import ChurchMap from '../components/molecules/ChurchMap'

const Contact = () => {

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
      <div className="relative z-10 flex-1 pt-32 pb-24 px-4 md:px-12 max-w-7xl mx-auto w-full">
        {/* Title Section */}
        <div className="text-center mb-16 reveal-active">
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-4">Conéctate</h1>
          <p className="text-white/60 text-lg md:text-xl font-medium max-w-2xl mx-auto uppercase tracking-widest">
            Estamos a un mensaje de distancia.
          </p>
        </div>

        <div className="flex justify-center mb-24">
          {/* Contact Form */}
          <div className="bg-white border-2 border-black p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] w-full max-w-2xl">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">Envíanos un mensaje</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-2">Nombre Completo</label>
                <input
                  type="text"
                  className="w-full border-2 border-black p-4 font-bold focus:outline-none focus:bg-gray-50 transition-colors"
                  placeholder="Tu nombre..."
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-2">Correo Electrónico</label>
                <input
                  type="email"
                  className="w-full border-2 border-black p-4 font-bold focus:outline-none focus:bg-gray-50 transition-colors"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-2">Mensaje o Petición de Oración</label>
                <textarea
                  rows="4"
                  className="w-full border-2 border-black p-4 font-bold focus:outline-none focus:bg-gray-50 transition-colors resize-none"
                  placeholder="¿En qué podemos ayudarte?"
                ></textarea>
              </div>
              <button className="btn-primary-door w-full justify-center py-6 text-sm">
                ENVIAR MENSAJE <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
