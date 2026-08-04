import { getEventsForDate } from './calendarEvents'

export const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
]

export const DAYS_OF_WEEK = ["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB", "DOM"]

export const getCombinedEvents = (y, m, d, dbEvents = []) => {
  const recurrent = getEventsForDate(y, m, d)
  const pad = (n) => String(n).padStart(2, '0')
  const dateStr = `${y}-${pad(m + 1)}-${pad(d)}`

  const dbEventsFiltered = dbEvents.filter((e) => {
    if (e.end_date) {
      // Si tiene fecha de finalización, se muestra en todos los días del rango
      return dateStr >= e.start_date && dateStr <= e.end_date
    }
    // Si no tiene fecha de finalización, es un evento de un solo día
    return e.start_date === dateStr
  })
  
  // Si hay eventos especiales programados en la BD para hoy,
  // suplantan por completo a los servicios recurrentes estándar de ese día
  if (dbEventsFiltered.length > 0) {
    return dbEventsFiltered
  }
  
  return recurrent
}

/**
 * Genera el calendario
 */
export const generateGridItems = (year, month, dbEvents = []) => {
  const startDay = new Date(year, month, 1).getDay()
  const prevDaysOffset = startDay === 0 ? 6 : startDay - 1
  const totalDays = new Date(year, month + 1, 0).getDate()
  const prevTotalDays = new Date(year, month, 0).getDate()

  const gridItems = []

  // Días del mes anterior
  for (let i = prevDaysOffset - 1; i >= 0; i--) {
    const day = prevTotalDays - i
    const prevMonthIndex = month === 0 ? 11 : month - 1
    const prevYear = month === 0 ? year - 1 : year
    const dDate = new Date(prevYear, prevMonthIndex, day)
    gridItems.push({
      day,
      isCurrentMonth: false,
      date: dDate,
      events: getCombinedEvents(prevYear, prevMonthIndex, day, dbEvents)
    })
  }

  // Días del mes actual
  for (let d = 1; d <= totalDays; d++) {
    const dDate = new Date(year, month, d)
    gridItems.push({
      day: d,
      isCurrentMonth: true,
      date: dDate,
      events: getCombinedEvents(year, month, d, dbEvents)
    })
  }

  // Calculo de los dias del proximo mes
  const remainingCells = 42 - gridItems.length
  for (let n = 1; n <= remainingCells; n++) {
    const nextMonthIndex = month === 11 ? 0 : month + 1
    const nextYear = month === 11 ? year + 1 : year
    const dDate = new Date(nextYear, nextMonthIndex, n)
    gridItems.push({
      day: n,
      isCurrentMonth: false,
      date: dDate,
      events: getCombinedEvents(nextYear, nextMonthIndex, n, dbEvents)
    })
  }

  return gridItems
}

/**
 * Filtra y ordena los eventos que empiezan desde hoy provenientes de la BD.
 */
export const getUpcomingSpecialEvents = (dbEvents = [], limit = 4) => {
  if (!dbEvents || dbEvents.length === 0) return []

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return dbEvents
    .filter(e => {
      const eventDate = new Date(e.start_date + 'T00:00:00')
      return eventDate >= today
    })
    .sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
    .slice(0, limit)
}

/**
 * Formatea la fecha
 */
export const formatEventDate = (dateStr) => {
  if (!dateStr) return ''
  const dateObj = new Date(dateStr + 'T00:00:00')
  const options = { day: 'numeric', month: 'short' }
  return dateObj.toLocaleDateString('es-ES', options).toUpperCase()
}
