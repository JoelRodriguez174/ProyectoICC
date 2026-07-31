import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Play, Clock } from 'lucide-react'
import useStore from '../store/useStore'

const MinistryDetail = () => {
  const { slug } = useParams()
  const { ministries, fetchMinistries, isLoadingMinistries } = useStore()
  const [hasLoaded, setHasLoaded] = useState(ministries.length > 0)
  
  useEffect(() => {
    const load = async () => {
      await fetchMinistries()
      setHasLoaded(true)
    }
    load()
  }, [fetchMinistries])

  const ministry = ministries.find((m) => m.slug === slug)

  const [activeVideoUrl, setActiveVideoUrl] = useState('')
  const [activeVideoTitle, setActiveVideoTitle] = useState('')

  const allVideos = ministry ? [
    {
      id: 'featured',
      title: `Video Destacado - ${ministry.title}`,
      videoUrl: ministry.featuredVideo,
      duration: "Principal",
      thumbnail: ministry.image,
      isFeatured: true
    },
    ...(ministry.galleryVideos || [])
  ] : []

  useEffect(() => {
    if (ministry) {
      setActiveVideoUrl(ministry.featuredVideo)
      setActiveVideoTitle(`Video Destacado - ${ministry.title}`)
    }
  }, [ministry])

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

  if (isLoadingMinistries || !hasLoaded) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white p-6">
        <div className="animate-pulse text-sm font-black uppercase tracking-widest text-gray-400">
          Cargando ministerio...
        </div>
      </div>
    )
  }

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

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-bg-main">
      <div className="fixed inset-0 z-0">
        <img 
          src={ministry.image} 
          alt={ministry.title} 
          className="w-full h-full object-cover grayscale brightness-[0.3]"
        />
        <div className="absolute inset-0 bg-black/80"></div>
      </div>

      <div className="relative z-10 flex-1 pt-32 pb-24 px-4 md:px-12 max-w-6xl mx-auto w-full text-white">
        <div className="mb-8">
          <Link to="/ministerios" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors duration-300">
            <ArrowLeft size={14} /> Volver a Ministerios
          </Link>
        </div>

        <div className="mb-12 reveal">
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
            {ministry.title}
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-medium max-w-3xl leading-relaxed">
            {ministry.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-16 reveal">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-black border-2 border-white/10 shadow-2xl p-2 rounded-sm">
              <div className="relative aspect-video w-full overflow-hidden bg-zinc-950 border border-white/5">
                {activeVideoUrl && (
                  <iframe
                    src={activeVideoUrl}
                    title={activeVideoTitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  ></iframe>
                )}
              </div>
              <div className="py-4 px-4 flex flex-wrap justify-between items-center bg-zinc-900 border-t border-white/5 gap-4">
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                    {activeVideoUrl === ministry.featuredVideo ? 'Video Destacado' : 'Reproduciendo ahora'}
                  </span>
                  <h3 className="text-sm md:text-base font-bold uppercase tracking-tight text-white mt-1 truncate">
                    {activeVideoTitle}
                  </h3>
                </div>
                {activeVideoUrl !== ministry.featuredVideo && (
                  <button
                    onClick={() => {
                      setActiveVideoUrl(ministry.featuredVideo)
                      setActiveVideoTitle(`Video Destacado - ${ministry.title}`)
                    }}
                    className="px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-white text-black hover:bg-black hover:text-white border border-white transition-all duration-300 rounded-sm flex-shrink-0"
                  >
                    Volver al destacado
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="bg-zinc-950/40 border border-white/10 p-4 rounded-sm flex flex-col w-full">
            <h2 className="text-sm font-black uppercase tracking-widest mb-4 border-b border-white/10 pb-2 text-white">
              Lista de Videos
            </h2>
            <div className="flex flex-col gap-3 overflow-y-auto scrollbar-dark pr-1 max-h-[350px] lg:max-h-[420px]">
              {allVideos.map((video) => {
                const isActive = activeVideoUrl === video.videoUrl
                return (
                  <div 
                    key={video.id}
                    onClick={() => {
                      setActiveVideoUrl(video.videoUrl)
                      setActiveVideoTitle(video.title)
                      // Smooth scroll back to player on small screens where stack is vertical
                      if (window.innerWidth < 1024) {
                        window.scrollTo({ top: 350, behavior: 'smooth' })
                      }
                    }}
                    className={`group cursor-pointer bg-zinc-900/40 hover:bg-zinc-900 border transition-all p-3 flex gap-3 ${
                      isActive ? 'border-white bg-zinc-900/80 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)]' : 'border-white/10 hover:border-white/40'
                    }`}
                  >
                    <div className="relative w-24 aspect-[16/10] overflow-hidden bg-black flex-shrink-0">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className={`w-full h-full object-cover group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ${
                          isActive ? 'grayscale-0' : 'grayscale'
                        }`}
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                        <div className="p-1 bg-white/10 backdrop-blur-sm rounded-full text-white border border-white/20">
                          <Play size={10} className="fill-white" />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between flex-1 min-w-0">
                      <h3 className={`text-[11px] font-bold uppercase tracking-tight leading-snug line-clamp-2 transition-colors ${
                        isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                      }`}>
                        {video.title}
                      </h3>
                      <div className="flex items-center gap-1 text-[8px] text-gray-400 font-bold uppercase tracking-wider mt-1">
                        <Clock size={8} /> {video.duration}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default MinistryDetail
