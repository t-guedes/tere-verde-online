import React, { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import {
  fetchEvents, createEvent, updateEvent, deleteEvent,
  fetchTrails, createTrail, updateTrail, deleteTrail,
  fetchParks, createPark, updatePark, deletePark,
  fetchBiodiversity, createBiodiversity, updateBiodiversity, deleteBiodiversity,
  fetchWaterfalls, createWaterfall, updateWaterfall, deleteWaterfall,
  fetchAdmins, createAdmin, deleteAdmin, changeAdminPassword
} from "../api"
import EventForm from "./EventForm"
import TrailForm from "./TrailForm"
import ParkForm from "./ParkForm"
import BiodiversityForm from "./BiodiversityForm"
import WaterfallForm from "./WaterfallForm"

export default function AdminPanel() {
  const { token, logout } = useAuth()
  const [tab, setTab] = useState("eventos")

  // Eventos
  const [events, setEvents] = useState([])
  const [editingEvent, setEditingEvent] = useState(null)
  const [eventFormOpen, setEventFormOpen] = useState(false)

  // Trilhas
  const [trails, setTrails] = useState([])
  const [editingTrail, setEditingTrail] = useState(null)
  const [trailFormOpen, setTrailFormOpen] = useState(false)

  // Parques
  const [parks, setParks] = useState([])
  const [editingPark, setEditingPark] = useState(null)
  const [parkFormOpen, setParkFormOpen] = useState(false)

  // Biodiversidade
  const [biodiversity, setBiodiversity] = useState([])
  const [editingBiodiversity, setEditingBiodiversity] = useState(null)
  const [biodiversityFormOpen, setBiodiversityFormOpen] = useState(false)

  // Cachoeiras
  const [waterfalls, setWaterfalls] = useState([])
  const [editingWaterfall, setEditingWaterfall] = useState(null)
  const [waterfallFormOpen, setWaterfallFormOpen] = useState(false)

  // Admins
  const [admins, setAdmins] = useState([])
  const [newAdmin, setNewAdmin] = useState({ username: "", password: "" })
  const [showCreateAdmin, setShowCreateAdmin] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [selectedUser, setSelectedUser] = useState("")
  const [msg, setMsg] = useState("")

  // Função para tratar erros protegidos por token
  const handleProtectedError = (err) => {
    if (err?.response?.status === 401) {
      alert("Sua sessão expirou. Faça login novamente.");
      logout();
    } else {
      setMsg("Erro: " + (err.response?.data?.detail || err.message));
    }
  };

  // Loaders
  const loadEvents = () => fetchEvents().then(res => setEvents(res.data)).catch(handleProtectedError)
  const loadTrails = () => fetchTrails().then(res => setTrails(res.data)).catch(handleProtectedError)
  const loadParks = () => fetchParks().then(res => setParks(res.data)).catch(handleProtectedError)
  const loadBiodiversity = () => fetchBiodiversity().then(res => setBiodiversity(res.data)).catch(handleProtectedError)
  const loadWaterfalls = () => fetchWaterfalls().then(res => setWaterfalls(res.data)).catch(handleProtectedError)
  const loadAdmins = () => {
    if (token) fetchAdmins(token).then(res => setAdmins(res.data)).catch(handleProtectedError)
  }

  useEffect(() => {
    loadEvents();
    loadTrails();
    loadParks();
    loadBiodiversity();
    loadWaterfalls();
    loadAdmins();
    // eslint-disable-next-line
  }, [token])

  // Event handlers
  const handleCreateEvent = () => { setEventFormOpen(true); setEditingEvent(null) }
  const handleEditEvent = ev => { setEventFormOpen(true); setEditingEvent(ev) }
  const handleDeleteEvent = id => {
    if (window.confirm("Excluir este evento?")) deleteEvent(id, token).then(loadEvents).catch(handleProtectedError)
  }
  const handleEventForm = data => {
    if (editingEvent)
      updateEvent(editingEvent.id, data, token).then(() => { setEventFormOpen(false); loadEvents() }).catch(handleProtectedError)
    else
      createEvent(data, token).then(() => { setEventFormOpen(false); loadEvents() }).catch(handleProtectedError)
  }

  // Trail handlers
  const handleCreateTrail = () => { setTrailFormOpen(true); setEditingTrail(null) }
  const handleEditTrail = tr => { setTrailFormOpen(true); setEditingTrail(tr) }
  const handleDeleteTrail = id => {
    if (window.confirm("Excluir esta trilha?")) deleteTrail(id, token).then(loadTrails).catch(handleProtectedError)
  }
  const handleTrailForm = data => {
    if (editingTrail)
      updateTrail(editingTrail.id, data, token).then(() => { setTrailFormOpen(false); loadTrails() }).catch(handleProtectedError)
    else
      createTrail(data, token).then(() => { setTrailFormOpen(false); loadTrails() }).catch(handleProtectedError)
  }

  // Park handlers
  const handleCreatePark = () => { setParkFormOpen(true); setEditingPark(null) }
  const handleEditPark = pk => { setParkFormOpen(true); setEditingPark(pk) }
  const handleDeletePark = id => {
    if (window.confirm("Excluir este parque?")) deletePark(id, token).then(loadParks).catch(handleProtectedError)
  }
  const handleParkForm = data => {
    if (editingPark)
      updatePark(editingPark.id, data, token).then(() => { setParkFormOpen(false); loadParks() }).catch(handleProtectedError)
    else
      createPark(data, token).then(() => { setParkFormOpen(false); loadParks() }).catch(handleProtectedError)
  }

  // Biodiversity handlers
  const handleCreateBiodiversity = () => { setBiodiversityFormOpen(true); setEditingBiodiversity(null) }
  const handleEditBiodiversity = bio => { setBiodiversityFormOpen(true); setEditingBiodiversity(bio) }
  const handleDeleteBiodiversity = id => {
    if (window.confirm("Excluir este registro de biodiversidade?")) deleteBiodiversity(id, token).then(loadBiodiversity).catch(handleProtectedError)
  }
  const handleBiodiversityForm = data => {
    const payload = {
      name: data.parque,
      description: data.descricao,
      image_url: data.imagem,
      mamiferos: (data.mamiferos || []).filter(s => s),
      anfibios: (data.anfibios || []).filter(s => s),
      aves: (data.aves || []).filter(s => s),
      conclusao: data.conclusao,
      parque: data.parque,
      location: "",
      species: "",
      map_url: ""
    };
    if (editingBiodiversity)
      updateBiodiversity(editingBiodiversity.id, payload, token)
        .then(() => { setBiodiversityFormOpen(false); loadBiodiversity() })
        .catch(handleProtectedError)
    else
      createBiodiversity(payload, token)
        .then(() => { setBiodiversityFormOpen(false); loadBiodiversity() })
        .catch(handleProtectedError)
  }

  // Waterfall handlers
  const handleCreateWaterfall = () => { setWaterfallFormOpen(true); setEditingWaterfall(null) }
  const handleEditWaterfall = w => { setWaterfallFormOpen(true); setEditingWaterfall(w) }
  const handleDeleteWaterfall = id => {
    if (window.confirm("Excluir esta cachoeira?")) deleteWaterfall(id, token).then(loadWaterfalls).catch(handleProtectedError)
  }
  const handleWaterfallForm = data => {
    if (editingWaterfall)
      updateWaterfall(editingWaterfall.id, data, token).then(() => { setWaterfallFormOpen(false); loadWaterfalls() }).catch(handleProtectedError)
    else
      createWaterfall(data, token).then(() => { setWaterfallFormOpen(false); loadWaterfalls() }).catch(handleProtectedError)
  }

  // Admin handlers
  const handleCreateAdmin = e => {
    e.preventDefault()
    createAdmin(newAdmin, token)
      .then(() => { setNewAdmin({ username: "", password: "" }); setShowCreateAdmin(false); loadAdmins(); setMsg("Admin criado!") })
      .catch(handleProtectedError)
  }
  const handleDeleteAdmin = id => {
    if (window.confirm("Excluir este admin?")) deleteAdmin(id, token).then(() => { loadAdmins(); setMsg("Admin excluído!") }).catch(handleProtectedError)
  }
  const handleChangePassword = e => {
    e.preventDefault()
    if (!selectedUser) {
      setMsg("Selecione o usuário antes de alterar a senha.")
      return
    }
    changeAdminPassword({ username: selectedUser, new_password: newPassword }, token)
      .then(() => { setNewPassword(""); setMsg("Senha alterada!"); })
      .catch(handleProtectedError)
  }

  return (
    <section className="admin-panel-section">
      <h2 className="section-title" style={{ textAlign: "center" }}>Painel Administrativo</h2>
      <div className="tab-bar">
        <button onClick={() => setTab("eventos")} className={`button-outline ${tab === "eventos" ? "tab-active" : "tab-inactive"}`} >Eventos</button>
        <button onClick={() => setTab("trilhas")} className={`button-outline ${tab === "trilhas" ? "tab-active" : "tab-inactive"}`}>Trilhas</button>
        <button onClick={() => setTab("parques")} className={`button-outline ${tab === "parques" ? "tab-active" : "tab-inactive"}`}>Parques</button>
        <button onClick={() => setTab("biodiversidade")} className={`button-outline ${tab === "biodiversidade" ? "tab-active" : "tab-inactive"}`}>Biodiversidade</button>
        <button onClick={() => setTab("cachoeiras")} className={`button-outline ${tab === "cachoeiras" ? "tab-active" : "tab-inactive"}`}>Cachoeiras</button>
        <button onClick={() => setTab("admins")} className={`button-outline ${tab === "admins" ? "tab-active" : "tab-inactive"}`}>Admins</button>
      </div>
      {msg && <p className="success-message" style={{ textAlign: "center" }}>{msg}</p>}

      {/* Eventos */}
      {tab === "eventos" && (
        <div>
          <button className="button-outline" onClick={handleCreateEvent}>Novo Evento</button>
          {eventFormOpen && <EventForm initial={editingEvent} onSubmit={handleEventForm} onCancel={() => setEventFormOpen(false)} />}
          <ul className="admin-list">
            {events.map(ev => (
              <li key={ev.id} className="admin-list-item">
                <b>{ev.title}</b> {ev.date} - {ev.location} {ev.available ? "" : "(Indisponível)"}
                <div className="admin-list-actions">
                  <button className="button-outline" onClick={() => handleEditEvent(ev)}>Editar</button>
                  <button className="button-cancel" onClick={() => handleDeleteEvent(ev.id)}>Excluir</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Trilhas */}
      {tab === "trilhas" && (
        <div>
          <button className="button-outline" onClick={handleCreateTrail}>Nova Trilha</button>
          {trailFormOpen && <TrailForm initial={editingTrail} onSubmit={handleTrailForm} onCancel={() => setTrailFormOpen(false)} />}
          <ul className="admin-list">
            {trails.map(tr => (
              <li key={tr.id} className="admin-list-item">
                <b>{tr.name}</b> ({tr.difficulty})
                <div className="admin-list-actions">
                  <button className="button-outline" onClick={() => handleEditTrail(tr)}>Editar</button>
                  <button className="button-cancel" onClick={() => handleDeleteTrail(tr.id)}>Excluir</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Parques */}
      {tab === "parques" && (
        <div>
          <button className="button-outline" onClick={handleCreatePark}>Novo Parque</button>
          {parkFormOpen && <ParkForm initial={editingPark} onSubmit={handleParkForm} onCancel={() => setParkFormOpen(false)} />}
          <ul className="admin-list">
            {parks.map(pk => (
              <li key={pk.id} className="admin-list-item">
                <b>{pk.name}</b>
                <div className="admin-list-actions">
                  <button className="button-outline" onClick={() => handleEditPark(pk)}>Editar</button>
                  <button className="button-cancel" onClick={() => handleDeletePark(pk.id)}>Excluir</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Biodiversidade */}
      {tab === "biodiversidade" && (
        <div>
          <button className="button-outline" onClick={handleCreateBiodiversity}>Nova Biodiversidade</button>
          {biodiversityFormOpen &&
            <BiodiversityForm
              initial={editingBiodiversity ? {
                parque: editingBiodiversity.name,
                descricao: editingBiodiversity.description,
                imagem: editingBiodiversity.image_url,
                mamiferos: (editingBiodiversity.mamiferos && editingBiodiversity.mamiferos.length > 0) ? editingBiodiversity.mamiferos : [""],
                anfibios: (editingBiodiversity.anfibios && editingBiodiversity.anfibios.length > 0) ? editingBiodiversity.anfibios : [""],
                aves: (editingBiodiversity.aves && editingBiodiversity.aves.length > 0) ? editingBiodiversity.aves : [""],
                conclusao: editingBiodiversity.conclusao || "",
              } : undefined}
              onSubmit={handleBiodiversityForm}
              onCancel={() => setBiodiversityFormOpen(false)}
            />
          }
          <ul className="admin-list">
            {biodiversity.map(bio => (
              <li key={bio.id} className="admin-list-item">
                <b>{bio.name}</b> {bio.species}
                <div className="admin-list-actions">
                  <button className="button-outline" onClick={() => handleEditBiodiversity(bio)}>Editar</button>
                  <button className="button-cancel" onClick={() => handleDeleteBiodiversity(bio.id)}>Excluir</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Cachoeiras */}
      {tab === "cachoeiras" && (
        <div>
          <button className="button-outline" onClick={handleCreateWaterfall}>Nova Cachoeira</button>
          {waterfallFormOpen && <WaterfallForm initial={editingWaterfall} onSubmit={handleWaterfallForm} onCancel={() => setWaterfallFormOpen(false)} />}
          <ul className="admin-list">
            {waterfalls.map(w => (
              <li key={w.id} className="admin-list-item">
                <b>{w.name}</b> {w.height}
                <div className="admin-list-actions">
                  <button className="button-outline" onClick={() => handleEditWaterfall(w)}>Editar</button>
                  <button className="button-cancel" onClick={() => handleDeleteWaterfall(w.id)}>Excluir</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Admins */}
      {tab === "admins" && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* <h3 className="main-title" style={{ marginTop: "1.5em", textAlign: "center" }}>Admins</h3> */}
          <div style={{
            display: "flex",
            gap: "40px",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: "2em",
            width: "100%"
          }}>
            {/* Card Lista de Admins */}
            <div style={{
              minWidth: 260,
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 2px 8px #0001",
              padding: "24px 24px 12px 24px"
            }}>
              <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
                <h4 className="section-title" style={{ margin: "0 0 16px 0", textAlign: "center" }}>Usuários</h4>
                {admins.map(adm => (
                  <li key={adm.id} style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 12,
                    borderBottom: "1px solid #eee",
                    paddingBottom: 8
                  }}>
                    <span style={{ fontWeight: 500 }}>{adm.username}</span>
                    <button
                      className="button-cancel"
                      style={{
                        marginLeft: 16,
                        padding: "4px 12px",
                        background: "#ffe5e5",
                        color: "#b22",
                        borderRadius: 8,
                        border: "1px solid #fbb",
                        fontSize: 14
                      }}
                      onClick={() => handleDeleteAdmin(adm.id)}
                    >Excluir</button>
                  </li>
                ))}
              </ul>
              <button
                className="button-outline"
                style={{ marginTop: 18, width: "100%" }}
                onClick={() => setShowCreateAdmin(!showCreateAdmin)}
              >
                {showCreateAdmin ? "Cancelar" : "Novo Usuário"}
              </button>
              {showCreateAdmin && (
                <form
                  className="event-form"
                  style={{ marginTop: 12 }}
                  onSubmit={handleCreateAdmin}
                >
                  <label className="event-label" style={{ fontWeight: 500 }}>
                    Novo usuário
                    <input
                      className="event-input"
                      placeholder="Novo usuário"
                      value={newAdmin.username}
                      onChange={e => setNewAdmin({ ...newAdmin, username: e.target.value })}
                      required
                      style={{ marginTop: 4, marginBottom: 16, background: "#eef6ff" }}
                    />
                  </label>
                  <label className="event-label" style={{ fontWeight: 500 }}>
                    Senha
                    <input
                      className="event-input"
                      placeholder="Senha"
                      type="password"
                      value={newAdmin.password}
                      onChange={e => setNewAdmin({ ...newAdmin, password: e.target.value })}
                      required
                      style={{ marginTop: 4, marginBottom: 16, background: "#eef6ff" }}
                    />
                  </label>
                  <button type="submit" className="button-outline" style={{ width: "100%" }}>Criar Admin</button>
                </form>
              )}
            </div>

            {/* Card Alterar senha */}
            <div style={{
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 2px 8px #0001",
              maxWidth: 320,
              padding: 24,
              marginTop: 0,
              minWidth: 260
            }}>
              <h4 className="section-title" style={{ margin: "0 0 16px 0", textAlign: "center" }}>Alterar senha</h4>
              <form className="event-form" style={{ margin: "0" }} onSubmit={handleChangePassword}>
                <label className="event-label" style={{ fontWeight: 500 }}>
                  Selecione o usuário
                  <select
                    style={{ marginTop: 4, marginBottom: 16, width: "100%", padding: 6, borderRadius: 6, background: "#eef6ff" }}
                    value={selectedUser}
                    onChange={e => setSelectedUser(e.target.value)}
                    required
                  >
                    <option value="">Selecione...</option>
                    {admins.map(adm => (
                      <option key={adm.id} value={adm.username}>{adm.username}</option>
                    ))}
                  </select>
                </label>
                <label className="event-label" style={{ fontWeight: 500 }}>
                  Nova senha
                  <input
                    className="event-input"
                    placeholder="Nova senha"
                    type="password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    required
                    style={{ marginTop: 4, marginBottom: 16, background: "#eef6ff" }}
                  />
                </label>
                <button type="submit" className="button-outline" style={{ width: "100%" }}>Alterar Senha</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}