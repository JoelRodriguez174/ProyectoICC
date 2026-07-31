export function getEventsForDate(year, month, day) {
  const date = new Date(year, month, day)
  const dayOfWeek = date.getDay() // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const events = []

  // Weekly services
  if (dayOfWeek === 3) { // Wednesday
    events.push({
      id: `wed-${year}-${month}-${day}`,
      title: "Servicio General",
      time: "8:00 PM",
      category: "servicio",
    })
  }
  if (dayOfWeek === 6) { // Saturday
    events.push({
      id: `sat-${year}-${month}-${day}`,
      title: "Evangelizmo",
      time: "8:00 PM",
      category: "evangelizmo",
    })
  }
  if (dayOfWeek === 0) { // Sunday
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
