import React from 'react'
import { ChevronRight } from 'lucide-react'

const MinistryCard = ({ title, description, image }) => {
  return (
    <div className="group cursor-pointer bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1">
      <div className="aspect-[16/9] overflow-hidden bg-gray-100 mb-6 border border-black/5">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-3 transition-colors">
        {title}
      </h3>
      <p className="text-secondary text-sm leading-relaxed mb-6 font-medium">
        {description}
      </p>
      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest group-hover:gap-4 transition-all">
        Saber más <ChevronRight size={14} />
      </div>
    </div>
  )
}

export default MinistryCard
