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
      title: "Ministerio de Niños",
      description: "Un espacio seguro y divertido donde los más pequeños aprenden sobre los valores de la fe.",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      title: "Jóvenes con Propósito",
      description: "Nuestra comunidad de jóvenes enfocada en el crecimiento personal y el servicio comunitario.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 3,
      title: "Ministerio de Alabanza",
      description: "Expresamos nuestra fe a través de la música y el arte en cada uno de nuestros servicios.",
      image: "https://images.unsplash.com/photo-1514525253361-b83f859b73c0?auto=format&fit=crop&q=80&w=800"
    }
  ]
}))

export default useStore
