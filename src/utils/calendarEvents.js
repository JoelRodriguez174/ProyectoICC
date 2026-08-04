export function getEventsForDate(year, month, day) {
  const date = new Date(year, month, day)
  const dayOfWeek = date.getDay()
  const events = []

  // Servicios de Miércoles, Sábado y Domingo (formato de 24 hs: 00:00 - 23:59 hs)
  if (dayOfWeek === 3) { 
    events.push({
      id: `wed-${year}-${month}-${day}`,
      title: "Servicio General",
      time: "20:00 hs",
      category: "servicio",
    })
  }
  if (dayOfWeek === 6) { 
    events.push({
      id: `sat-${year}-${month}-${day}`,
      title: "Evangelismo",
      time: "20:00 hs",
      category: "evangelizmo",
    })
  }
  if (dayOfWeek === 0) { 
    events.push({
      id: `sun-morn-${year}-${month}-${day}`,
      title: "Servicio General",
      time: "11:00 hs",
      category: "servicio",
    })
    events.push({
      id: `sun-eve-${year}-${month}-${day}`,
      title: "Servicio General",
      time: "19:00 hs",
      category: "servicio",
    })
  }
  return events
}
