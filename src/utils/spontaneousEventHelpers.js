/**
 * Funciones auxiliares para filtrar eventos especiales o campañas provenientes exclusivamente de la BD de Supabase.
 */

export const getSpontaneousEvent = (events = []) => {
  if (!events || events.length === 0) return null

  const today = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  const todayStr = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`

  // Obtener todos los eventos/campañas de la BD activos desde hoy en adelante
  const maxLimit = new Date()
    maxLimit.setDate(today.getDate() + 7) // Límite de 30 días hacia el futuro
    const maxLimitStr = maxLimit.toISOString().split('T')[0]

    // Filtrar eventos activos entre HOY y los PRÓXIMOS 30 DÍAS
    const activeEvents = events.filter(e => {
      const endDate = e.end_date || e.start_date
      return endDate >= todayStr && e.start_date <= maxLimitStr
    })

  if (activeEvents.length === 0) return null

  // Ordenar para tomar el evento especial o campaña más próximo
  activeEvents.sort((a, b) => new Date(a.start_date) - new Date(b.start_date))

  const event = activeEvents[0]
  const isToday = event.start_date <= todayStr && (event.end_date ? event.end_date >= todayStr : event.start_date === todayStr)

  let badgeText = '¡EVENTO ESPECIAL!'
  if (isToday) {
    badgeText = '¡HOY EN VIVO!'
  } else if (event.category) {
    badgeText = `¡${event.category.toUpperCase()} PRÓXIMA!`
  }

  return {
    ...event,
    isToday,
    badgeText
  }
}
