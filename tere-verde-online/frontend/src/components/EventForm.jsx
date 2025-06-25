import React, { useState } from "react"

export default function EventForm({ initial, onSubmit, onCancel, error, success }) {
  const [title, setTitle] = useState(initial?.title || "")
  const [description, setDescription] = useState(initial?.description || "")
  const [date, setDate] = useState(initial?.date || "")
  const [location, setLocation] = useState(initial?.location || "")
  const [available, setAvailable] = useState(initial?.available ?? true)

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit({ title, description, date, location, available })
  }

  return (
    <form onSubmit={handleSubmit} className="event-form">
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <label className="event-label">
        Título
        <input
          className="event-input"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Título"
          required
        />
      </label>
      <label className="event-label">
        Data
        <input
          className="event-input"
          value={date}
          onChange={e => setDate(e.target.value)}
          placeholder="Data"
          type="date"
        />
      </label>
      <label className="event-label">
        Local
        <input
          className="event-input"
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder="Local"
        />
      </label>
      <label className="event-label">
        Descrição
        <textarea
          className="event-textarea"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Descrição"
        />
      </label>
      <label className="event-checkbox-label">
        <input
          type="checkbox"
          checked={available}
          onChange={e => setAvailable(e.target.checked)}
          className="event-checkbox"
        />
        Disponível
      </label>
      <div style={{ display: "flex", gap: "1em", marginTop: "1em" }}>
        <button type="submit" className="button-outline">Salvar</button>
        <button
          type="button"
          onClick={onCancel}
          className="button-cancel"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}