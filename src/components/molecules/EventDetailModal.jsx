import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { X, Calendar, Clock, MapPin, DollarSign, CalendarDays } from 'lucide-react'

/**
 * Auxiliar para normalizar el campo `time` si viene como string o como arreglo JSONB [{ day, time }]
 */
const getNormalizedTimes = (timeVal) => {
  if (!timeVal) return []
  if (Array.isArray(timeVal)) return timeVal
  if (typeof timeVal === 'object') return [timeVal]
  if (typeof timeVal === 'string') {
    try {
      const parsed = JSON.parse(timeVal)
      if (Array.isArray(parsed)) return parsed
      if (typeof parsed === 'object') return [parsed]
    } catch {
      return [{ day: 'Horario', time: timeVal }]
    }
  }
  return [{ day: 'Horario', time: String(timeVal) }]
}

/**
 * Modal interactivo de detalles de eventos especiales/espontáneos y campañas (estilo Door Church).
 * Formato de horarios de 24 hs (00:00 - 23:59 hs) con soporte para JSONB { day, time }.
 */
const EventDetailModal = ({ event, isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen || !event) return null

  const {
    title,
    description,
    start_date,
    end_date,
    time,
    location,
    category,
    speaker,
    image,
    price,
    schedule,
    badgeText
  } = event

  const timeList = getNormalizedTimes(time)

  const formatDates = () => {
    if (!start_date) return ''
    const [y, m, d] = start_date.split('-')
    if (end_date && end_date !== start_date) {
      const [, mEnd, dEnd] = end_date.split('-')
      return `${d}/${m} al ${dEnd}/${mEnd}/${y}`
    }
    return `${d}/${m}/${y}`
  }

  // Resumen de tiempo para la tarjeta de metadatos
  const timeSummary = timeList.length === 1 
    ? timeList[0].time 
    : timeList.length > 1 
      ? `${timeList[0].day}: ${timeList[0].time} (Ver más horarios abajo)` 
      : null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose}
      />

      {/* Modal Card Container */}
      <div className="relative w-full max-w-3xl bg-neutral-900 border border-white/20 shadow-2xl overflow-hidden my-auto z-10 transition-all duration-300 text-white">
        
        {/* Header Cover Banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img 
            src={image || "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=1200"} 
            alt={title}
            className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent" />

          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 bg-black/60 hover:bg-white hover:text-black text-white transition-all duration-300 border border-white/20 rounded-full"
            aria-label="Cerrar modal"
          >
            <X size={20} />
          </button>

          {/* Badge & Title in Cover */}
          <div className="absolute bottom-6 left-6 right-6 z-10">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] bg-red-600 text-white px-3 py-1">
                {category || 'CAMPAÑA ESPECIAL'}
              </span>
              {badgeText && (
                <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-white/10 text-white/90 px-3 py-1 border border-white/20 backdrop-blur-sm">
                  {badgeText}
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter text-white leading-none">
              {title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto custom-scrollbar space-y-6">
          
          {/* Event Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-white/5 border border-white/10">
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-red-500 flex-shrink-0" />
              <div>
                <span className="block text-[9px] font-black uppercase tracking-widest text-white/50">Fechas</span>
                <span className="text-sm font-bold uppercase tracking-wider">{formatDates()}</span>
              </div>
            </div>

            {timeSummary && (
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-red-500 flex-shrink-0" />
                <div>
                  <span className="block text-[9px] font-black uppercase tracking-widest text-white/50">Horarios (24 hs)</span>
                  <span className="text-sm font-bold tracking-wider">{timeSummary}</span>
                </div>
              </div>
            )}

            {location && (
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-red-500 flex-shrink-0" />
                <div>
                  <span className="block text-[9px] font-black uppercase tracking-widest text-white/50">Lugar</span>
                  <span className="text-sm font-bold uppercase tracking-wider">{location}</span>
                </div>
              </div>
            )}

            {price && (
              <div className="flex items-center gap-3">
                <DollarSign size={20} className="text-red-500 flex-shrink-0" />
                <div>
                  <span className="block text-[9px] font-black uppercase tracking-widest text-white/50">Entrada / Información</span>
                  <span className="text-sm font-bold uppercase tracking-wider">{price}</span>
                </div>
              </div>
            )}
          </div>

          {/* Speaker / Conferencistas */}
          {speaker && (
            <div className="border-l-2 border-red-600 pl-4 py-1">
              <span className="block text-[10px] font-black uppercase tracking-widest text-red-500 mb-1">
                Invitados Especiales / Orador
              </span>
              <p className="text-base font-bold uppercase tracking-wide text-white">
                {speaker}
              </p>
            </div>
          )}

          {/* Description */}
          {description && (
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-white/60 mb-2">
                Detalles de la Campaña
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                {description}
              </p>
            </div>
          )}

          {/* Horarios por Día (JSONB Array) */}
          {timeList.length > 0 && (
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-white/60 mb-3">
                Horarios por Día (00:00 - 23:59 hs)
              </h3>
              <div className="space-y-2">
                {timeList.map((item, index) => (
                  <div key={index} className="p-3 bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-xs font-black uppercase text-red-500 tracking-wider sm:w-40">
                      {item.day || `Día ${index + 1}`}
                    </span>
                    <span className="text-xs font-bold text-white flex-1">
                      {item.time || item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cronograma Adicional si existiera */}
          {schedule && schedule.length > 0 && (
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-white/60 mb-3">
                Cronograma Adicional de Actividades
              </h3>
              <div className="space-y-2">
                {schedule.map((item, index) => {
                  if (typeof item === 'string') {
                    return (
                      <div key={index} className="p-3 bg-white/5 border border-white/5 text-xs font-bold text-gray-200">
                        {item}
                      </div>
                    )
                  }
                  return (
                    <div key={index} className="p-3 bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-xs font-black uppercase text-red-500 tracking-wider sm:w-36">
                        {item.day || item.date}
                      </span>
                      {item.time && (
                        <span className="text-xs font-bold text-white sm:w-36">
                          {item.time}
                        </span>
                      )}
                      <span className="text-xs font-medium text-gray-300 flex-1">
                        {item.activity || item.title || ''}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to="/calendario"
              onClick={onClose}
              className="text-xs font-black uppercase tracking-widest text-white/70 hover:text-white flex items-center gap-2"
            >
              <CalendarDays size={16} />
              <span>Ver en el Calendario</span>
            </Link>

            <button
              onClick={onClose}
              className="btn-primary-door w-full sm:w-auto"
            >
              ENTENDIDO
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default EventDetailModal
