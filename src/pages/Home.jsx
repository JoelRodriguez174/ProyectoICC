import React, { useEffect } from 'react'
import Hero from '../components/sections/home/Hero'
import Vision from '../components/sections/home/Vision'
import Worship from '../components/sections/home/Worship'
import CommunityGroups from '../components/sections/home/CommunityGroups'
import NewHere from '../components/sections/home/NewHere'

const Home = () => {
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
  }, [])

  return (
    <div className="w-full">
      <Hero />
      <Vision />
      <Worship />
      <CommunityGroups />
      <NewHere />
    </div>
  )
}

export default Home
