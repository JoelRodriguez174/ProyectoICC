export function getEventsForDate(year, month, day) {
  const date = new Date(year, month, day)
  const dayOfWeek = date.getDay()
  const events = []

  // Servicios de Dom y Mie
  if (dayOfWeek === 3) { 
    events.push({
      id: `wed-${year}-${month}-${day}`,
      title: "Servicio General",
      time: "8:00 PM",
      category: "servicio",
    })
  }
  if (dayOfWeek === 6) { 
    events.push({
      id: `sat-${year}-${month}-${day}`,
      title: "Evangelizmo",
      time: "8:00 PM",
      category: "evangelizmo",
    })
  }
  if (dayOfWeek === 0) { 
    events.push({
      id: `sun-morn-${year}-${month}-${day}`,
      title: "Servicio General",
      time: "11:00 AM",
      category: "servicio",
    })
    events.push({
      id: `sun-eve-${year}-${month}-${day}`,
      title: "Servicio General",
      time: "7:00 PM",
      category: "servicio",
    })
  }
  return events
}
