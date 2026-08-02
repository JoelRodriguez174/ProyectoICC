import { create } from 'zustand'
import { supabase } from '../utils/supabase'

const useStore = create((set, get) => ({
  // Menu Hamburguesa para el celu
  isMenuOpen: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),

  // Scroll State
  isScrolled: false,
  setIsScrolled: (val) => set({ isScrolled: val }),

  // Ministries State
  ministries: [],
  isLoadingMinistries: false,
  ministriesError: null,

  // Events State
  events: [],
  isLoadingEvents: false,
  eventsError: null,

  // Fetcheo de los ministerios desde Supabase
  fetchMinistries: async () => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    if (!supabaseUrl) {
      console.log('Error del servidor')
      return
    }

    set({ isLoadingMinistries: true, ministriesError: null })
    try {
      const { data, error } = await supabase
        .from('ministries')
        .select(`
          *,
          galleryVideos: ministry_gallery_videos(*)
        `)

      if (error) throw error

      if (data && data.length > 0) {
        const mappedMinistries = data.map((m) => ({
          id: m.id,
          slug: m.slug,
          title: m.title,
          description: m.description,
          image: m.image,
          featuredVideo: m.featured_video,
          galleryVideos: (m.galleryVideos || []).map((v) => ({
            id: v.id,
            title: v.title,
            videoUrl: v.video_url,
            duration: v.duration,
            thumbnail: v.thumbnail
          }))
        }))
        set({ ministries: mappedMinistries })
      }
    } catch (err) {
      console.error('Error fetching ministries from Supabase:', err)
      set({ ministriesError: err.message })
    } finally {
      set({ isLoadingMinistries: false })
    }
  },

  // Fetcheo de los eventos del calendario desde Supabase
  fetchEvents: async () => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    if (!supabaseUrl) {
      console.warn('VITE_SUPABASE_URL no está configurado.')
      set({ events: [] })
      return
    }

    set({ isLoadingEvents: true, eventsError: null })
    try {
      const { data, error } = await supabase
        .from('calendar_events')
        .select('*')
        .order('start_date', { ascending: true })

      if (error) throw error

      set({ events: data || [] })
    } catch (err) {
      console.error('Error fetching calendar events from Supabase:', err)
      set({ eventsError: err.message, events: [] })
    } finally {
      set({ isLoadingEvents: false })
    }
  }
}))

export default useStore
