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
      <main>
        <section id="Hero">
          <Hero />
        </section>
        <section id="Aboutme">
          <Aboutme />
        </section>
        <section id="Work">
          <Work />
        </section>
        <section id="Contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Home