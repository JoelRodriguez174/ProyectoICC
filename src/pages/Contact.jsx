import React, { useState } from 'react';
import { MapPin, Phone, Clock, Mail, Send, MessageCircleMore, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import InfoCard from '../components/molecules/InfoCard';
import ChurchMap from '../components/molecules/ChurchMap';
import onSubmit from '../utils/submitMail';

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

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
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-8">Envianos tu petición</h2>

            {submitStatus === 'success' && (
              <div className="mb-8 p-4 bg-green-50 border-2 border-green-600 text-green-700 flex items-center gap-3 font-bold uppercase tracking-tight">
                <CheckCircle2 size={24} />
                ¡Petición enviado con éxito!
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-8 p-4 bg-red-50 border-2 border-red-600 text-red-700 flex items-center gap-3 font-bold uppercase tracking-tight">
                <AlertCircle size={24} />
                Hubo un error al enviar tu petición. Por favor, inténtalo de nuevo.
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-2">Nombre Completo</label>
                <input
                  type="text"
                  {...register("name", { required: "El nombre es obligatorio" })}
                  className={`w-full border-2 border-black p-4 font-bold focus:outline-none focus:bg-gray-50 transition-colors ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="Tu nombre..."
                />
                {errors.name && <p className="text-red-500 text-xs mt-1 font-bold">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-2">Correo Electrónico</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "El correo es obligatorio",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Correo electrónico inválido"
                    }
                  })}
                  className={`w-full border-2 border-black p-4 font-bold focus:outline-none focus:bg-gray-50 transition-colors ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="tu@email.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1 font-bold">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-2">Petición de Oración</label>
                <textarea
                  rows="4"
                  {...register("message", { required: "El mensaje es obligatorio" })}
                  className={`w-full border-2 border-black p-4 font-bold focus:outline-none focus:bg-gray-50 transition-colors resize-none ${errors.message ? 'border-red-500' : ''}`}
                  placeholder="¿Cuál es tu necesidad?"
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-1 font-bold">{errors.message.message}</p>}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary-door w-full justify-center py-6 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>ENVIANDO... <Loader2 size={20} className="animate-spin" /></>
                ) : (
                  <>ENVIAR PETICIÓN <Send size={20} /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact;
