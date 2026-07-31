import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getEventsForDate } from '../utils/calendarEvents'

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
]

const DAYS_OF_WEEK = ["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB", "DOM"]

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const startDay = new Date(year, month, 1).getDay()
  const prevDaysOffset = startDay === 0 ? 6 : startDay - 1
  const totalDays = new Date(year, month + 1, 0).getDate()
  const prevTotalDays = new Date(year, month, 0).getDate()

  const gridItems = []

  for (let i = prevDaysOffset - 1; i >= 0; i--) {
    const day = prevTotalDays - i
    const prevMonthIndex = month === 0 ? 11 : month - 1
    const prevYear = month === 0 ? year - 1 : year
    gridItems.push({
      day,
      isCurrentMonth: false,
      date: new Date(prevYear, prevMonthIndex, day),
      events: getEventsForDate(prevYear, prevMonthIndex, day)
    })
  }

  for (let d = 1; d <= totalDays; d++) {
    gridItems.push({
      day: d,
      isCurrentMonth: true,
      date: new Date(year, month, d),
      events: getEventsForDate(year, month, d)
    })
  }

  const remainingCells = 42 - gridItems.length
  for (let n = 1; n <= remainingCells; n++) {
    const nextMonthIndex = month === 11 ? 0 : month + 1
    const nextYear = month === 11 ? year + 1 : year
    gridItems.push({
      day: n,
      isCurrentMonth: false,
      date: new Date(nextYear, nextMonthIndex, n),
      events: getEventsForDate(nextYear, nextMonthIndex, n)
    })
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      
      <div className="fixed inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&q=80&w=2000"
          alt="Iglesia Casa del Alfarero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/85"></div>
      </div>

      <div className="relative z-10 flex-1 px-4 md:px-12 pt-32 pb-24 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16 reveal-active">
          <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter mb-4">Calendario</h1>
          <p className="text-white/60 text-lg md:text-xl font-medium max-w-2xl mx-auto uppercase tracking-widest">
            Nuestras reuniones y actividades
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center bg-white/5 backdrop-blur-md p-6 mb-8 gap-4">
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

        <div className="bg-white/5 backdrop-blur-md p-4 md:p-8 text-white w-full shadow-2xl">
          <div className="grid grid-cols-7 text-center pb-4 mb-4">
            {DAYS_OF_WEEK.map((day) => (
              <div key={day} className="text-xs font-black tracking-[0.2em] text-white/60">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2 md:gap-3">
            {gridItems.map((item, index) => {
              const dayEvents = item.events
              
              return (
                <div
                  key={index}
                  className={`
                    relative p-2 md:p-3 flex flex-col justify-between transition-all duration-300 min-h-[75px] md:min-h-[140px]
                    ${item.isCurrentMonth 
                      ? 'bg-white/5 hover:bg-white/10' 
                      : 'opacity-15 bg-transparent'
                    }
                  `}
                >
                  <div className="flex justify-between items-center w-full">
                    {
                      <span className="text-xs md:text-sm font-black text-white/80">
                        {item.day}
                      </span>
                    }
                  </div>

                  {/* Events list overlaying the day */}
                  <div className="flex flex-col gap-1.5 mt-2 w-full overflow-hidden">
                    {item.isCurrentMonth && dayEvents.map((ev, evIdx) => (
                      <div 
                        key={evIdx}
                        className={`
                          text-[7px] md:text-[10px] font-black uppercase tracking-wider px-2 py-1 leading-tight w-full truncate text-left
                          ${ev.category === 'servicio' ? ' text-white'
                            : ev.category === 'evangelizmo' ? ' text-white'
                            : 'bg-pink-600 text-white'
                          }
                        `}
                        title={`${ev.time} - ${ev.title}`}
                      >
                        <span className="block text-[6px] md:text-[8px] opacity-80 font-bold">{ev.time}</span>
                        <span className="block truncate font-black">{ev.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calendar
