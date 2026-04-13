import React from 'react'
import { MapPin, Phone, Clock, Mail, MessageCircle, Send } from 'lucide-react'
import InfoCard from '../components/molecules/InfoCard'
import ChurchMap from '../components/molecules/ChurchMap'

const Contact = () => {
  const mapUrl = "https://maps.google.com/maps?q=3%20de%20febrero%20660,%20Villa%20Mercedes,%20San%20Luis&t=&z=17&ie=UTF8&iwloc=&output=embed"

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
        <div className="text-center mb-16 reveal-active">
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-4">Conéctate</h1>
          <p className="text-white/60 text-lg md:text-xl font-medium max-w-2xl mx-auto uppercase tracking-widest">
            Estamos a un mensaje de distancia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-24">

          {/* Contact Form */}
          <div className="bg-white border-2 border-black p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
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

          {/* Quick Actions & Info */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <a href="https://wa.me/541112345678" target="_blank" rel="noreferrer" className="bg-green-500 text-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center gap-4 hover:translate-y-[-4px] transition-all">
                <MessageCircle size={40} strokeWidth={2.5} />
                <span className="font-black uppercase tracking-widest text-sm">WhatsApp</span>
              </a>
              <a href="tel:+541112345678" className="bg-black text-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center gap-4 hover:translate-y-[-4px] transition-all">
                <Phone size={40} strokeWidth={2.5} />
                <span className="font-black uppercase tracking-widest text-sm">Llámanos</span>
              </a>
            </div>

            <InfoCard title="Ubicación" icon={MapPin}>
              3 de febrero 660 <br />
              Villa Mercedes, San Luis <br />
              Argentina
            </InfoCard>

            <InfoCard title="Horarios" icon={Clock}>
              <ul className="space-y-2">
                <li className="flex justify-between items-center border-b border-black/10 pb-1">
                  <span className="font-bold text-sm uppercase">Miércoles</span>
                  <span className="text-secondary text-sm">7:00 PM</span>
                </li>
                <li className="flex justify-between items-center border-b border-black/10 pb-1">
                  <span className="font-bold text-sm uppercase">Domingo</span>
                  <span className="text-secondary text-sm">11:00 AM & 7:00 PM</span>
                </li>
              </ul>
            </InfoCard>
          </div>
        </div>

        {/* Map Section */}
        <div className="reveal-active">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-white/20"></div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Cómo llegar</h2>
            <div className="h-px flex-1 bg-white/20"></div>
          </div>
          <ChurchMap mapUrl={mapUrl} />
        </div>
      </div>
    </div>
  )
}

export default Contact
