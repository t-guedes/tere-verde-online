import React from "react"
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <div className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Terê Verde Online</h1>
          <div className="hero-subtitle">
            Descubra a beleza natural de Teresópolis
          </div>
        </div>
      </div>

      <div className="features">
        <div className="feature-card">
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path d="M16 26C9 18 16 6 16 6s7 12 0 20z" strokeLinejoin="round" />
          </svg>
          <div className="feature-title">Biodiversidade</div>
          <div className="feature-desc">
            Conheça a rica fauna e flora das áreas protegidas da região
          </div>
          <button className="button-outline" onClick={() => navigate('/biodiversidade')}>
            Saiba mais
          </button>
        </div>
        <div className="feature-card">
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path d="M8 26c0-3.5 2.5-6 6-6s6 2.5 6 6" strokeLinecap="round" />
          </svg>
          <div className="feature-title">Trilhas</div>
          <div className="feature-desc">
            Explore trilhas cênicas de diferentes níveis de dificuldade e duração
          </div>
          <button className="button-outline" onClick={() => navigate('/trails')}>
            Saiba mais
          </button>
        </div>
        <div className="feature-card">
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path d="M16 6v20M10 18c0-4 4-6 6-6s6 2 6 6" strokeLinecap="round" />
          </svg>
          <div className="feature-title">Cachoeiras</div>
          <div className="feature-desc">
            Visite impressionantes quedas d’água em meio à natureza exuberante
          </div>
          <button className="button-outline" onClick={() => navigate('/cachoeiras')}>
            Saiba mais
          </button>
        </div>

        <div className="feature-card">
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <rect x="4" y="8" width="24" height="18" rx="2" />
            <path d="M4 12h24" />
          </svg>
          <div className="feature-title">Eventos</div>
          <div className="feature-desc">
            Fique por dentro dos eventos e atividades, ecoturismo que acontecem
          </div>
          <button className="button-outline" onClick={() => navigate('/events')}>
            Eventos
          </button>
        </div>
      </div>

      <div className="section">
        <div className="section-content">
          <div className="section-text">
            <div className="section-title" style={{ marginTop: "1.4rem" }}>Parque Nacional da Serra dos Órgãos</div>
            <div className="section-desc">
              Explore altas montanhas, vales e trilhas com paisagens panorâmicas da Serra dos Órgãos. 
            </div>
            <div className="section-title" style={{ marginTop: "1.4rem" }}>
              Parque Natural Municipal Montanhas de Teresópolis
            </div>
            <div className="section-desc">
              Combine paisagens naturais, trilhas e áreas de ecoturismo para experiências inesquecíveis.
            </div>
            <div className="section-title" style={{ marginTop: "1.4rem" }}>Parque Estadual dos Três Picos</div>
            <div className="section-desc">
              Explore trilhas desafiadoras, picos imponentes e uma rica biodiversidade na maior área protegida do Rio de Janeiro. 
            </div>
            <button className="button-outline" onClick={() => navigate('/parks')}>Saiba mais sobre os parques</button>
          </div>
          <div className="section-image">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Bandeira_de_Teresopolis.svg/1280px-Bandeira_de_Teresopolis.svg.png"
              alt="Teresópolis"
            />
          </div>
        </div>
      </div>
      <footer>
        © Unifeso, 2025
      </footer>
    </>
  )
}