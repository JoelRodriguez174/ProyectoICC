import React from 'react'

const InfoCard = ({ title, icon: Icon, children }) => {
  return (
    <div className="border-2 border-black p-8 group shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-6 flex items-center gap-2">
        {Icon && <Icon size={16} />} {title}
      </h3>
      <div className="text-secondary text-lg leading-relaxed font-medium">
        {children}
      </div>
    </div>
  )
}

export default InfoCard
