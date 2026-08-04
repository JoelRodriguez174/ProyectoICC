import React, { useState, useEffect } from 'react'
import { Calendar, ArrowRight } from 'lucide-react'
import useStore from '../../../store/useStore'
import { getSpontaneousEvent } from '../../../utils/spontaneousEventHelpers'
import EventDetailModal from '../../molecules/EventDetailModal'

/**
 * Sección de Evento Destacado / Espontáneo (Estilo Door Church Hero Banner).
 * Muestra la imagen de fondo full-bleed configurable, la fecha, el título,
 * el botón "VER MÁS DETALLES" y la imagen del Pastor y su esposa alineada a la derecha.
 *
 * @param {Object} props
 * @param {string} [props.customBgImage] - URL personalizada para la imagen de fondo de la sección
 * @param {string} [props.customPastorImage] - URL personalizada para la foto del Pastor y su esposa
 */
const SpontaneousEventSection = ({ customBgImage, customPastorImage }) => {
  const { events, fetchEvents } = useStore()
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  const spontaneousEvent = getSpontaneousEvent(events)

  if (!spontaneousEvent) {
    return null
  }

  const {
    title,
    start_date,
    end_date,
    category,
    isToday,
    badgeText,
    speaker,
    speaker_title,
    image,
    bg_image,
    pastor_image
  } = spontaneousEvent

  // Selección de imágenes (Prioridad: Props personalizadas > Campos de la BD/evento > Imágenes por defecto)
  const bgImageUrl = customBgImage || bg_image || image || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1920"
  const pastorImageUrl = customPastorImage || pastor_image || "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=800"

  // Formatear la fecha para exhibir en mayúsculas estilo Door Church (ej. 16 AL 18 DE OCTUBRE)
  const formatDates = () => {
    if (!start_date) return ''
    const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC']
    const [y, m, d] = start_date.split('-')
    const monthName = months[parseInt(m, 10) - 1] || ''

    if (end_date && end_date !== start_date) {
      const [, mEnd, dEnd] = end_date.split('-')
      const monthEndName = months[parseInt(mEnd, 10) - 1] || ''
      if (m === mEnd) {
        return `${parseInt(d, 10)} AL ${parseInt(dEnd, 10)} DE ${monthName}`
      }
      return `${parseInt(d, 10)} ${monthName} AL ${parseInt(dEnd, 10)} ${monthEndName}`
    }
    return `${parseInt(d, 10)} DE ${monthName} ${y}`
  }

  return (
    <>
      <section className="relative w-full min-h-[500px] md:min-h-[580px] flex items-center justify-center py-20 px-6 md:px-12 border-y border-white/10 overflow-hidden reveal">
        {/* Background Full-Bleed Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={bgImageUrl} 
            alt={title}
            className="w-full h-full object-cover grayscale opacity-30 scale-105 transition-transform duration-1000 hover:scale-100"
          />
          {/* Dark Overlay Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/60" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Glow Accent Effect */}
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-red-600/10 rounded-full blur-3xl pointer-events-none z-0" />

        {/* Content Container (Grid Layout: Left Text & Right Pastor Photo) */}
        <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Columna Izquierda: Información Principal & Acciones */}
          <div className="lg:col-span-8 flex flex-col items-start text-left">
            {/* Fecha Destacada */}
            <div className="flex items-center gap-2 text-xs md:text-sm font-black uppercase tracking-[0.4em] text-red-500 mb-3">
              <Calendar size={16} />
              <span>{formatDates()}</span>
            </div>

            {/* Título Principal */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white mb-8 leading-none drop-shadow-2xl">
              {title}
            </h2>

            {/* Botón "VER MÁS DETALLES" (Estilo Door Church) */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-primary-door px-10 py-4 flex items-center gap-3 text-xs tracking-[0.25em] group shadow-2xl"
            >
              <span>VER MÁS DETALLES</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>

          </div>

          {/* Columna Derecha: Foto del Pastor y su esposa */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
            <div className="relative group w-64 sm:w-72 lg:w-80 h-80 sm:h-96 border-2 border-white/20 hover:border-white/50 transition-all duration-500 shadow-2xl bg-neutral-900/60 overflow-hidden">
              {/* Imagen del Pastor y su esposa */}
              <img 
                src={pastorImageUrl} 
                alt={speaker || "Pastor y su Esposa"} 
                className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              
              {/* Dark Overlay Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

              {/* Pie de foto del Pastor y Esposa */}
              <div className="absolute bottom-4 left-4 right-4 text-left z-10">
                <span className="block text-[9px] font-black uppercase tracking-[0.25em] text-red-400 mb-0.5">
                  {speaker_title || 'INVITADOS ESPECIALES'}
                </span>
                <span className="block text-sm sm:text-base font-black uppercase tracking-tight text-white leading-tight">
                  {speaker || 'Pastor & Esposa'}
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Modal Interactivo de Detalles */}
      <EventDetailModal
        event={spontaneousEvent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

export default SpontaneousEventSection
