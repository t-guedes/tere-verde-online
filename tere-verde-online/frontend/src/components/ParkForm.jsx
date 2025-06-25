import React, { useState } from "react"

export default function ParkForm({ initial, onSubmit, onCancel }) {
  const [name, setName] = useState(initial?.name || "")
  const [description, setDescription] = useState(initial?.description || "")
  const [location, setLocation] = useState(initial?.location || "")
  const [map_url, setMapUrl] = useState(initial?.map_url || "")
  const [image_url, setImageUrl] = useState(initial?.image_url || "")
  const [created, setCreated] = useState(initial?.created || "")
  const [area, setArea] = useState(initial?.area || "")
  const [highlights, setHighlights] = useState(initial?.highlights || "")

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit({
      name,
      description,
      location,
      map_url,
      image_url,
      created,
      area,
      highlights,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <label className="event-label">
        Nome
        <input
          className="event-input"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Nome"
          required
        />
      </label>
      <label className="event-label">
        Localização
        <input
          className="event-input"
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder="Localização"
        />
      </label>
      <label className="event-label">
        Criado em
        <input
          className="event-input"
          value={created}
          onChange={e => setCreated(e.target.value)}
          placeholder="Ano de criação"
        />
      </label>
      <label className="event-label">
        Área
        <input
          className="event-input"
          value={area}
          onChange={e => setArea(e.target.value)}
          placeholder="Área (ex: 10.527 hectares)"
        />
      </label>
      <label className="event-label">
        Destaque
        <input
          className="event-input"
          value={highlights}
          onChange={e => setHighlights(e.target.value)}
          placeholder="Pontos de destaque"
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
      <label className="event-label">
        URL do mapa
        <input
          className="event-input"
          value={map_url}
          onChange={e => setMapUrl(e.target.value)}
          placeholder="URL do mapa"
        />
      </label>
      <label className="event-label">
        Foto (URL da imagem)
        <input
          className="event-input"
          value={image_url}
          onChange={e => setImageUrl(e.target.value)}
          placeholder="URL da imagem"
        />
      </label>
      <div style={{ display: "flex", gap: "1em", marginTop: "1em" }}>
        <button type="submit" className="button-outline">Salvar</button>
        <button type="button" onClick={onCancel} className="button-cancel">Cancelar</button>
      </div>
    </form>
  )
}