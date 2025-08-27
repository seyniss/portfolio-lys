import { useState } from 'react'
import './App.css'
import AdminLogin from './pages/AdminLogin'
import AdminPost from './pages/AdminPost'
import Notfound from './pages/Notfound'
import Home from './pages/Home'
import AuthRedirectRoute from './routes/AuthRedirectRoute'
import RequireAuth from './routes/RequireAuth'
import "./styles/main.scss"
import "./styles/_themes.scss"
import "./styles/common.scss"


import { Route, Routes } from 'react-router-dom'

function App() {



  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/admin/login' element={<AdminLogin/>} />
      <Route path='/admin/post' element={<AdminPost/>} />
      <Route path='*' element={<Notfound/>} />
    </Routes>
  )
}

export default App
