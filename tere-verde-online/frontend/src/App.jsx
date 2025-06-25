import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Events from './components/Events'
import Trails from './components/Trails'
import Parks from './components/Parks'
import Waterfalls from './components/Waterfalls'     
import Biodiversity from './components/Biodiversity'  
import AdminLogin from './components/AdminLogin'
import AdminPanel from './components/AdminPanel'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/trails" element={<Trails />} />
          <Route path="/parks" element={<Parks />} />
          <Route path="/cachoeiras" element={<Waterfalls />} />       
          <Route path="/biodiversidade" element={<Biodiversity />} />  
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/panel" element={<AdminPanel />} />
        </Routes>
      </main>
    </>
  )
}