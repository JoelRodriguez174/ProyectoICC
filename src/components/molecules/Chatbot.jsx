import React, { useState, useEffect, useRef } from 'react'
import { MessageSquare, X, Send, Bot } from 'lucide-react'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, text: "¡Hola! Bienvenido a Casa del Alfarero. ¿En qué puedo ayudarte hoy?", sender: 'bot' }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  // Normalizar texto (quitar acentos y caracteres especiales)
  const normalizeText = (text) => {
    return text.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[?¿!¡,. ]/g, " ")
      .trim()
  }

  const getBotResponse = (userInput) => {
    const text = normalizeText(userInput)
    
    // Diccionario de intenciones y patrones
    const intents = [
      {
        patterns: ['horario', 'hora', 'cuando', 'domingo', 'miercoles', 'viernes', 'servicio', 'reunion', 'culto'],
        response: "Nuestros horarios de reunión son:\n- Domingos: 10:00 AM y 6:00 PM\n- Miércoles: 7:30 PM\n- Jóvenes: Viernes 8:00 PM\n¡Te esperamos con los brazos abiertos!"
      },
      {
        patterns: ['ubicacion', 'donde', 'direccion', 'llegar', 'mapa', 'san luis', 'mercedes', 'lugar', 'calle'],
        response: "Estamos en Villa Mercedes, San Luis, específicamente en la calle 3 de Febrero 660. Puedes ver el mapa en nuestra sección de Contacto."
      },
      {
        patterns: ['ministerio', 'actividad', 'ninos', 'jovenes', 'adultos', 'hacer', 'participar', 'ayudar', 'servir'],
        response: "Tenemos ministerios para todas las edades: Escuela dominical para niños, grupo de jóvenes, alabanza y más. Puedes explorar los detalles en la página de 'Ministerios' o consultarnos directamente en la iglesia."
      },
      {
        patterns: ['contacto', 'telefono', 'celular', 'whatsapp', 'hablar', 'llamar', 'email', 'correo', 'mensaje'],
        response: "Puedes contactarnos por WhatsApp al +54 11 1234-5678 o enviarnos un email a info@casadelalfarero.org. También puedes completar el formulario en la página de contacto."
      },
      {
        patterns: ['hola', 'buen', 'dia', 'tarde', 'noche', 'hey', 'saludos', 'alguien'],
        response: "¡Hola! Qué alegría saludarte. Soy el asistente virtual de Casa del Alfarero. ¿Cómo puedo asistirte hoy?"
      },
      {
        patterns: ['gracias', 'chau', 'adios', 'chau', 'nos vemos', 'bendiciones', 'amen'],
        response: "¡De nada! Que tengas un día bendecido. Si necesitas algo más, aquí estaré."
      }
    ]

    // Buscar coincidencia
    for (const intent of intents) {
      if (intent.patterns.some(pattern => text.includes(pattern))) {
        return intent.response
      }
    }

    return "No estoy seguro de haber entendido bien. ¿Me podrías preguntar sobre los horarios, nuestra ubicación o los ministerios? Estoy para ayudarte."
  }

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim() || isTyping) return

    const userMessage = { id: Date.now(), text: input, sender: 'user' }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Respuesta dinámica con retraso para simular "pensamiento"
    setTimeout(() => {
      const response = getBotResponse(input)
      setMessages(prev => [...prev, { id: Date.now() + 1, text: response, sender: 'bot' }])
      setIsTyping(false)
    }, 1200)
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-110 ${isOpen ? 'bg-black rotate-90 shadow-[0px_0px_20px_rgba(0,0,0,0.3)]' : 'bg-black hover:bg-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'}`}
      >
        {isOpen ? <X size={32} className="text-white" /> : <MessageSquare size={32} className="text-white" />}
      </button>

      {/* Chat Window */}
      <div className={`absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[550px] bg-white border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] flex flex-col transition-all duration-500 transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        
        {/* Header */}
        <div className="bg-black text-white p-6 flex items-center gap-4 border-b-4 border-black">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border-2 border-black">
            <Bot size={28} className="text-black" />
          </div>
          <div>
            <h3 className="font-black uppercase tracking-tighter text-xl leading-none">Canal de Consultas</h3>
            <span className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Respuesta inmediata</span>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#f8f8f8]">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 text-sm font-bold leading-relaxed whitespace-pre-wrap ${msg.sender === 'user' ? 'bg-black text-white rounded-tl-xl rounded-tr-xl rounded-bl-xl' : 'bg-white border-2 border-black text-black rounded-tr-xl rounded-br-xl rounded-bl-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border-2 border-black p-3 rounded-full flex gap-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-2 h-2 bg-black rounded-full animate-bounce [animation-delay:-.5s]"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-4 bg-white border-t-4 border-black flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Haz tu pregunta aquí..."
            className="flex-1 bg-gray-50 border-2 border-black px-4 py-3 text-sm font-bold uppercase tracking-tight focus:outline-none focus:bg-white transition-colors"
          />
          <button 
            type="submit"
            disabled={isTyping}
            className="bg-black text-white px-5 hover:bg-gray-800 transition-colors disabled:bg-gray-400"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  )
}

export default Chatbot
