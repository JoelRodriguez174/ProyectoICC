import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Play, Clock } from 'lucide-react'
import useStore from '../store/useStore'

const MinistryDetail = () => {
  const { slug } = useParams()
  const { ministries } = useStore()
  
  // Find the current ministry
  const ministry = ministries.find((m) => m.slug === slug)

  // Track the current playing video in the main player
  const [activeVideoUrl, setActiveVideoUrl] = useState('')
  const [activeVideoTitle, setActiveVideoTitle] = useState('')

  useEffect(() => {
    if (ministry) {
      setActiveVideoUrl(ministry.featuredVideo)
      setActiveVideoTitle("Video Destacado")
    }
  }, [ministry])

  if (!ministry) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Ministerio no encontrado</h2>
        <Link to="/ministerios" className="btn-outline-door flex items-center gap-3">
          <ArrowLeft size={16} /> VOLVER A MINISTERIOS
        </Link>
      </div>
    )
  }

  // IntersectionObserver for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active')
        }
      })
    }, observerOptions)

    const revealElements = document.querySelectorAll('.reveal')
    revealElements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [ministry, activeVideoUrl])

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-bg-main">
      {/* Background Cover Image with Dark Overlay */}
      <div className="fixed inset-0 z-0">
        <img 
          src={ministry.image} 
          alt={ministry.title} 
          className="w-full h-full object-cover grayscale brightness-[0.3]"
        />
        <div className="absolute inset-0 bg-black/80"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex-1 pt-32 pb-24 px-4 md:px-12 max-w-6xl mx-auto w-full text-white">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link to="/ministerios" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors duration-300">
            <ArrowLeft size={14} /> Volver a Ministerios
          </Link>
        </div>

        {/* Title and Description */}
        <div className="mb-12 reveal">
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
            {ministry.title}
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-medium max-w-3xl leading-relaxed">
            {ministry.description}
          </p>
        </div>

        {/* Main Video Section */}
        <div className="mb-16 reveal">
          <div className="bg-black border-2 border-white/10 shadow-2xl p-2 rounded-sm">
            <div className="relative aspect-video w-full overflow-hidden bg-zinc-950 border border-white/5">
              {activeVideoUrl && (
                <iframe
                  src={activeVideoUrl}
                  title={ministry.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              )}
            </div>
            <div className="py-4 px-3 flex justify-between items-center bg-zinc-900 border-t border-white/5">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Reproduciendo ahora</span>
                <h3 className="text-sm md:text-base font-bold uppercase tracking-tight text-white mt-1">
                  {activeVideoTitle}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Video Gallery Section */}
        {ministry.galleryVideos && ministry.galleryVideos.length > 0 && (
          <div className="reveal">
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-widest mb-8 border-b border-white/10 pb-4">
              Videos Relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {ministry.galleryVideos.map((video) => {
                const isActive = activeVideoUrl === video.videoUrl
                return (
                  <div 
                    key={video.id}
                    onClick={() => {
                      setActiveVideoUrl(video.videoUrl)
                      setActiveVideoTitle(video.title)
                      window.scrollTo({ top: 350, behavior: 'smooth' })
                    }}
                    className={`group cursor-pointer bg-zinc-900/60 hover:bg-zinc-900 border-2 transition-all p-4 flex gap-4 ${isActive ? 'border-white' : 'border-white/10'}`}
                  >
                    <div className="relative w-1/3 aspect-[16/10] overflow-hidden bg-black flex-shrink-0">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                        <div className="p-2 bg-white/10 backdrop-blur-sm rounded-full text-white border border-white/20">
                          <Play size={14} className="fill-white" />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="text-sm font-bold uppercase tracking-tight leading-snug line-clamp-2 text-white group-hover:text-gray-200 transition-colors">
                          {video.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                        <Clock size={10} /> {video.duration}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default MinistryDetail
