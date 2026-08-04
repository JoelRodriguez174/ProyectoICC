import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, Clock, ArrowRight } from 'lucide-react'
import useStore from '../store/useStore'
import { MONTHS, DAYS_OF_WEEK, generateGridItems, getUpcomingSpecialEvents, formatEventDate } from '../utils/calendarHelpers'
import EventDetailModal from '../components/molecules/EventDetailModal'

const formatTimeDisplay = (timeVal) => {
  if (!timeVal) return ''
  if (typeof timeVal === 'string') return timeVal
  if (Array.isArray(timeVal) && timeVal.length > 0) {
    return timeVal.map(t => (t.day ? `${t.day}: ${t.time}` : t.time || '')).join(', ')
  }
  return ''
}

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { events, fetchEvents, isLoadingEvents } = useStore()

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const handleOpenEventModal = (ev) => {
    setSelectedEvent(ev)
    setIsModalOpen(true)
  }

  const gridItems = generateGridItems(year, month, events)
  const upcomingEvents = getUpcomingSpecialEvents(events, 4)

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      
      <div className="fixed inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&q=80&w=2000"
          alt="Iglesia Casa del Alfarero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/90"></div>
      </div>

      <div className="relative z-10 flex-1 px-4 md:px-12 pt-32 pb-24 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16 reveal-active">
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-4">Calendario</h1>
          <p className="text-white/60 text-lg md:text-xl font-medium max-w-2xl mx-auto uppercase tracking-widest">
            Nuestras reuniones y actividades especiales
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Columna Principal del Calendario */}
          <div className="lg:col-span-2 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-center bg-white/5 backdrop-blur-md p-6 mb-6 gap-4 border border-white/5">
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-white">
                {MONTHS[month]} <span className="text-white/40">{year}</span>
              </h2>
              <div className="flex items-center gap-4">
                <button 
                  onClick={handlePrevMonth}
                  className="p-2 text-white/80 hover:text-black hover:bg-white transition-all duration-300 rounded-full bg-white/5"
                  aria-label="Mes anterior"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={() => setCurrentDate(new Date())}
                  className="px-4 py-2 text-xs font-black uppercase tracking-widest hover:text-black hover:bg-white transition-all duration-300 text-white bg-white/5"
                >
                  Mes Actual
                </button>
                <button 
                  onClick={handleNextMonth}
                  className="p-2 text-white/80 hover:text-black hover:bg-white transition-all duration-300 rounded-full bg-white/5"
                  aria-label="Mes siguiente"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-4 md:p-6 text-white w-full border border-white/5 shadow-2xl">
              <div className="grid grid-cols-7 text-center pb-4 mb-4 border-b border-white/5">
                {DAYS_OF_WEEK.map((day) => (
                  <div key={day} className="text-[10px] font-black tracking-[0.2em] text-white/60">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1.5 md:gap-2.5">
                {gridItems.map((item, index) => {
                  const dayEvents = item.events
                  
                  return (
                    <div
                      key={index}
                      className={`
                        relative p-1.5 md:p-2.5 flex flex-col justify-between transition-all duration-300 min-h-[85px] md:min-h-[130px]
                        ${item.isCurrentMonth 
                          ? 'bg-white/5' 
                          : 'opacity-20 bg-transparent'
                        }
                        border border-white/5
                      `}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className="text-[10px] md:text-xs font-black text-white/80">
                          {item.day}
                        </span>
                      </div>

                      <div className="flex flex-col gap-1 mt-1.5 w-full overflow-hidden">
                        {dayEvents.map((ev, evIdx) => {
                          let catClass = 'border-l-2 border-white pl-1.5 text-white'
                          if (ev.category === 'campaña' || ev.category === 'retiro') {
                            catClass = 'text-white px-1.5 py-0.5 font-bold border-l-2 border-red-500 bg-red-600/20' 
                          } else if (ev.category === 'especial') {
                            catClass = 'text-white px-1.5 py-0.5 font-bold border-l-2 border-yellow-500 bg-yellow-500/10'
                          }

                          const formattedTime = formatTimeDisplay(ev.time)

                          return (
                            <button 
                              key={evIdx}
                              onClick={() => handleOpenEventModal(ev)}
                              className={`
                                text-[7px] md:text-[9px] font-black uppercase tracking-wider leading-tight w-full truncate text-left
                                hover:brightness-125 transition-all cursor-pointer ${catClass}
                              `}
                              title={`${formattedTime} - ${ev.title}`}
                            >
                              <span className="block text-[6px] md:text-[8px] opacity-80 font-semibold truncate">{formattedTime}</span>
                              <span className="block truncate">{ev.title}</span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="bg-white/5 backdrop-blur-md p-6 border border-white/5 text-white">
              <h3 className="text-lg font-black tracking-widest uppercase mb-6 pb-3 border-b border-white/10 flex items-center gap-2">
                <CalendarIcon size={18} className="text-red-500" />
                <span>Eventos Especiales</span>
              </h3>

              {isLoadingEvents ? (
                <div className="py-12 text-center text-white/60 text-xs font-bold uppercase tracking-widest animate-pulse">
                  Cargando eventos...
                </div>
              ) : upcomingEvents.length === 0 ? (
                <div className="py-12 text-center text-white/40 text-xs font-bold uppercase tracking-widest">
                  No hay eventos próximos programados
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  {upcomingEvents.map((ev) => {
                    const formattedTime = formatTimeDisplay(ev.time)

                    return (
                      <div 
                        key={ev.id}
                        onClick={() => handleOpenEventModal(ev)}
                        className="group relative bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 p-5 transition-all duration-500 hover:-translate-y-0.5 cursor-pointer"
                      >
                        <div className="absolute top-4 right-4">
                          <span className={`text-[8px] font-black uppercase tracking-widest px-2.5 py-1 
                            ${ev.category === 'campaña' || ev.category === 'retiro' ? 'bg-red-600 text-white'
                              : 'bg-yellow-500 text-black'
                            }`}
                          >
                            {ev.category || 'ESPECIAL'}
                          </span>
                        </div>

                        {/* Fecha formateada de alto impacto */}
                        <div className="flex items-baseline gap-1.5 mb-3">
                          <span className="text-3xl font-black tracking-tighter leading-none text-white">
                            {ev.start_date ? ev.start_date.split('-')[2] : '16'}
                          </span>
                          <span className="text-xs font-black tracking-[0.2em] text-white/50">
                            {formatEventDate(ev.start_date).split(' ')[1] || 'OCT'} -
                          </span>
                          <span className="text-3xl font-black tracking-tighter leading-none text-white">
                            {ev.end_date ? ev.end_date.split('-')[2] : '18'}
                          </span>
                          <span className="text-xs font-black tracking-[0.2em] text-white/50">
                            {formatEventDate(ev.end_date).split(' ')[1] || 'OCT'}
                          </span>
                        </div>

                        {/* Título y descripción */}
                        <h4 className="text-base font-black uppercase tracking-wide mb-2 leading-tight group-hover:text-red-400 transition-colors">
                          {ev.title}
                        </h4>
                        
                        {ev.description && (
                          <p className="text-xs text-white/70 leading-relaxed font-normal mb-4 line-clamp-2">
                            {ev.description}
                          </p>
                        )}

                        {/* Detalles: Hora, Lugar y CTA */}
                        <div className="flex flex-wrap items-center justify-between gap-y-2 pt-3 border-t border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/70">
                          {formattedTime && (
                            <div className="flex items-center gap-1 max-w-[60%] truncate">
                              <Clock size={12} className="text-red-500 flex-shrink-0" />
                              <span className="truncate">{formattedTime}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1 text-white group-hover:translate-x-1 transition-transform ml-auto">
                            <span className="text-[9px] font-black text-red-400">VER DETALLES DEL EVENTO</span>
                            <ArrowRight size={12} className="text-red-400" />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal interactivo para ver detalles */}
      <EventDetailModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedEvent(null)
        }}
      />
    </div>
  )
}

export default Calendar
