import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/atoms/ScrollToTop'

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          {routes.map((route) => (
            <Route 
              key={route.path} 
              path={route.path} 
              element={route.element} 
            />
          ))}
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router basename="/ProyectoICC/">
      <AppContent />
    </Router>
  )
}

export default App
