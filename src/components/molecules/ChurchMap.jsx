import React from 'react'

const ChurchMap = ({ mapUrl }) => {
  return (
    <div className="lg:col-span-2 h-[600px] border-4 border-black p-2 bg-white">
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Ubicación de la Iglesia"
        className="grayscale hover:grayscale-0 transition-all duration-700"
      ></iframe>
    </div>
  )
}

export default ChurchMap
