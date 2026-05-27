import { create } from 'zustand'

const useStore = create((set) => ({
  // Mobile Menu State
  isMenuOpen: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),

  // Scroll State
  isScrolled: false,
  setIsScrolled: (val) => set({ isScrolled: val }),

  // Ministry Data (Can be expanded)
  ministries: [
    {
      id: 1,
      slug: "reunion-jovenes",
      title: "Reunión de Jóvenes",
      description: "Un espacio dinámico para adolescentes y jóvenes, donde compartimos música, charlas sobre la vida y la fe, y creamos conexiones reales.",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800",
      featuredVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ", // RickRoll or placeholder template embed
      galleryVideos: [
        {
          id: 101,
          title: "Resumen del Campamento de Jóvenes 2025",
          videoUrl: "https://www.youtube.com/embed/9BqN8Z2-y8g",
          duration: "3:45",
          thumbnail: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=400"
        },
        {
          id: 102,
          title: "Charla: Encontrando tu Identidad",
          videoUrl: "https://www.youtube.com/embed/H26X15tVigM",
          duration: "12:10",
          thumbnail: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=400"
        }
      ]
    },
    {
      id: 2,
      slug: "testimonios",
      title: "Testimonios",
      description: "Historias reales de fe, restauración y esperanza de personas de nuestra comunidad cuyas vidas fueron transformadas por el amor de Dios.",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800",
      featuredVideo: "https://www.youtube.com/embed/Xq4M7e20kU0",
      galleryVideos: [
        {
          id: 201,
          title: "Historia de Restauración: Familia Gómez",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          duration: "5:20",
          thumbnail: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=400"
        },
        {
          id: 202,
          title: "De la Adicción a la Libertad: Relato de Lucas",
          videoUrl: "https://www.youtube.com/embed/H26X15tVigM",
          duration: "8:15",
          thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
        }
      ]
    },
    {
      id: 3,
      slug: "eventos-especiales",
      title: "Eventos especiales",
      description: "Revive los momentos más importantes de nuestras conferencias, conciertos de alabanza y celebraciones anuales.",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
      featuredVideo: "https://www.youtube.com/embed/2_YyN4Kz9h4",
      galleryVideos: [
        {
          id: 301,
          title: "Resumen de la Conferencia de Fe 2025",
          videoUrl: "https://www.youtube.com/embed/9BqN8Z2-y8g",
          duration: "6:30",
          thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=400"
        },
        {
          id: 302,
          title: "Concierto de Adoración en Vivo",
          videoUrl: "https://www.youtube.com/embed/zP6o4zV_4oQ",
          duration: "15:40",
          thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=400"
        }
      ]
    }
  ]
}))

export default useStore

