import React from 'react'

const Logo = ({ className = "w-16 h-16" }) => (
  <img 
    src="/Captura.PNG" 
    alt="Logo Casa del Alfarero" 
    className={`${className} object-contain mix-blend-multiply`}
  />
)

export default Logo
