import React from 'react'
import ChurchMap from '../components/molecules/ChurchMap'
import InfoCard from '../components/molecules/InfoCard'
import { Clock, MapPin } from 'lucide-react'

export const Ubication = () => {
    const mapUrl = "https://maps.google.com/maps?q=3%20de%20febrero%20660,%20Villa%20Mercedes,%20San%20Luis&t=&z=17&ie=UTF8&iwloc=&output=embed"

    return (
        <div className="relative min-h-screen w-full flex flex-col">
            {/* Background Overlay */}
            <div className="fixed inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1515162305285-0293e4767cc2?auto=format&fit=crop&q=80&w=2000"
                    alt="Iglesia Casa del Alfarero"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/75"></div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex-1 px-4 md:px-12 pt-32 pb-24 max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mb-24">
                    <InfoCard title="Ubicación" icon={MapPin}>
                        3 de febrero 660 <br />
                        Villa Mercedes, San Luis <br />
                        Argentina
                    </InfoCard>

                    <InfoCard title="Horarios" icon={Clock}>
                        <ul className="space-y-10">
                            <li className="flex justify-between items-center border-b border-black/10 pb-1">
                                <span className="font-bold text-sm uppercase">Miércoles</span>
                                <span className="text-secondary text-sm">7:00 PM</span>
                            </li>
                            <li className="flex justify-between items-center border-b border-black/10 pb-1">
                                <span className="font-bold text-sm uppercase">Domingo</span>
                                <span className="text-secondary text-sm">11:00 AM & 7:00 PM</span>
                            </li>
                        </ul>
                    </InfoCard>
                </div>

                {/* Map Section */}
                <div className="reveal-active">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px flex-1 bg-white/20"></div>
                        <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Cómo llegar</h2>
                        <div className="h-px flex-1 bg-white/20"></div>
                    </div>
                    <ChurchMap mapUrl={mapUrl} />
                </div>
            </div>
        </div>
    )
}
