import { getSpontaneousEvent } from './spontaneousEventHelpers'

/**
 * Convierte cualquier valor del campo time (string o arreglo JSONB [{day, time}]) a texto legible
 */
const formatTimeDisplay = (timeVal) => {
  if (!timeVal) return ''
  if (typeof timeVal === 'string') return timeVal
  if (Array.isArray(timeVal) && timeVal.length > 0) {
    return timeVal.map(t => (t.day ? `${t.day} ${t.time}` : t.time || '')).join(' | ')
  }
  return ''
}

/**
 * Determina si hay un anuncio activo para eventos importantes (hoy o próximos)
 * @param {Array} events - Lista de eventos desde el estado global o la base de datos
 * @returns {Object|null} Objeto con la información del anuncio ({ type, text, event }) o null si no hay evento relevante
 */
export const getActiveAnnouncement = (events = []) => {
  const today = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  const todayStr = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`

  // Si hay eventos en BD, buscar eventos de hoy
  if (events && events.length > 0) {
    const eventToday = events.find(e => {
      if (e.end_date) {
        return todayStr >= e.start_date && todayStr <= e.end_date
      }
      return e.start_date === todayStr
    })

    if (eventToday) {
      const isMultiDay = eventToday.end_date && eventToday.start_date !== eventToday.end_date
      const timeText = formatTimeDisplay(eventToday.time)
      return {
        type: 'today',
        text: isMultiDay 
          ? `¡ACTIVO HOY! ${eventToday.title} ${timeText ? '- ' + timeText : ''} en ${eventToday.location || 'Templo Central'}`
          : `¡HOY! ${eventToday.title} ${timeText ? '- ' + timeText : ''} en ${eventToday.location || 'Templo Central'}`,
        event: eventToday
      }
    }
  }

  // De lo contrario, obtener el evento destacado/espontáneo activo (como Campañas)
  const spontaneousEvent = getSpontaneousEvent(events)
  if (spontaneousEvent) {
    const dateParts = spontaneousEvent.start_date.split('-')
    const formattedDate = `${dateParts[2]}/${dateParts[1]}`
    return {
      type: spontaneousEvent.isToday ? 'today' : 'upcoming',
      text: spontaneousEvent.isToday
        ? `¡HOY! ${spontaneousEvent.title} • MÁS INFORMACIÓN`
        : `¡PRÓXIMAMENTE! ${spontaneousEvent.title} (${formattedDate}) • MÁS INFORMACIÓN`,
      event: spontaneousEvent
    }
  }

  return null
}
