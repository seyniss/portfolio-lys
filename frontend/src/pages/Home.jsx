import React from 'react'
import Aboutme from '../components/Aboutme'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Nav from '../components/Nav'
import Work from '../components/Work'

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Work />
      <Contact />
      <Aboutme />
      <Nav />
      <Footer />
    </div>
  )
}

export default Home