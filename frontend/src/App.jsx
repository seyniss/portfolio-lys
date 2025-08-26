import { useState } from 'react'
import './App.css'
import AdminLogin from './pages/AdminLogin'
import AdminPost from './pages/AdminPost'
import Notfound from './pages/Notfound'
import Home from './pages/Home'


import { Route, Routes } from 'react-router-dom'

function App() {



  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/admin' element={<AdminLogin/>} />
      <Route path='/admin/post' element={<AdminPost/>} />
      <Route path='*' element={<Notfound/>} />
    </Routes>
  )
}

export default App
