import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { token, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  function handleLogout() {
    logout()
    navigate("/admin/login")
    setOpen(false)
  }

  function handleLinkClick() {
    setOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink to="/" className="navbar-link" onClick={handleLinkClick}>
          Terê Verde
        </NavLink>
      </div>
      <button
        className={`navbar-hamburger${open ? ' open' : ''}`}
        onClick={() => setOpen(!open)}
        aria-label="Abrir menu"
      >
        <span />
        <span />
        <span />
      </button>
      <div className={`navbar-links${open ? ' open' : ''}`}>
        <NavLink to="/biodiversidade" className="navbar-link" onClick={handleLinkClick}>Biodiversidade</NavLink>
        <NavLink to="/parks" className="navbar-link" onClick={handleLinkClick}>Parques</NavLink>
        <NavLink to="/trails" className="navbar-link" onClick={handleLinkClick}>Trilhas</NavLink>
        <NavLink to="/cachoeiras" className="navbar-link" onClick={handleLinkClick}>Cachoeiras</NavLink>
        <NavLink to="/events" className="navbar-link" onClick={handleLinkClick}>Eventos</NavLink>
        {token ? (
          <>
            <NavLink to="/admin/panel" className="navbar-link" onClick={handleLinkClick}>Admin</NavLink>
            <button onClick={handleLogout} className="button-cancel navbar-logout">Sair</button>
          </>
        ) : (
          <NavLink to="/admin/login" className="navbar-link" onClick={handleLinkClick}>Login</NavLink>
        )}
      </div>
    </nav>
  )
}