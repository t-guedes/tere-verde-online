import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { token, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate("/admin/login")
  }

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-link">Home</NavLink>
      <NavLink to="/biodiversidade" className="navbar-link">Biodiversidade</NavLink>
      <NavLink to="/parks" className="navbar-link">Parques</NavLink>
      <NavLink to="/trails" className="navbar-link">Trilhas</NavLink>
      <NavLink to="/cachoeiras" className="navbar-link">Cachoeiras</NavLink>
      <NavLink to="/events" className="navbar-link">Eventos</NavLink>
      {token ? (
        <>
          <NavLink to="/admin/panel" className="navbar-link">Admin</NavLink>
          <button onClick={handleLogout} className="button-cancel navbar-logout">Sair</button>
        </>
      ) : (
        <NavLink to="/admin/login" className="navbar-link">Login</NavLink>
      )}
    </nav>
  )
}