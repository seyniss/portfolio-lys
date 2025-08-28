import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import "./Header.scss"
import { useTheme } from '../context/ThemeContext'

const Header = () => {
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handelScroll = () => {

      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    handelScroll()

    window.addEventListener('scroll',handelScroll)

  }, [])

  return (
    <header className={`${scrolled ? 'scroll' : ''}`}>
      <div className="inner">
        <h4>LOGO</h4>
        <div className="right-wrap">

          <Nav />
          <button className='btn' onClick={toggleTheme}>{theme}</button>
        </div>
      </div>
    </header>
  )
}

export default Header