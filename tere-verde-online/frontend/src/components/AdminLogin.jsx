import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { adminLogin } from "../api"
import { useAuth } from "../context/AuthContext"

export default function AdminLogin() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    adminLogin(username, password)
      .then(res => {
        login(res.data.access_token)
        navigate("/admin/panel")
      })
      .catch(() => setError("Usuário ou senha inválidos"))
  }

  return (
    <section className="admin-login-section">
      <h2 className="section-title" style={{ textAlign: "center" }}>Login do Administrador</h2>
      <form onSubmit={handleSubmit} className="event-form" style={{ maxWidth: 340, margin: "0 auto" }}>
        {error && <div className="error-message">{error}</div>}
        <label className="event-label">
          Usuário
          <input
            className="event-input"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Usuário"
            autoFocus
            autoComplete="username"
          />
        </label>
        <label className="event-label">
          Senha
          <input
            className="event-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            placeholder="Senha"
            autoComplete="current-password"
          />
        </label>
        <button type="submit" className="button-outline" style={{ width: "100%" }}>
          Entrar
        </button>
      </form>
    </section>
  )
}