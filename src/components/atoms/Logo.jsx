import React from 'react'

function Logo({ className = "w-16 h-16" }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}Captura.PNG`}
      alt="Logo Casa del Alfarero"
      className={`${className} object-contain mix-blend-multiply`}
    />
  )
}

export default Logo
