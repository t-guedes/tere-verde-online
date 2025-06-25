import React, { useState } from "react"

export default function WaterfallForm({ initial, onSubmit, onCancel }) {
  const [name, setName] = useState(initial?.name ?? "")
  const [description, setDescription] = useState(initial?.description ?? "")
  const [location, setLocation] = useState(initial?.location ?? "")
  const [height, setHeight] = useState(initial?.height ?? "")
  const [map_url, setMapUrl] = useState(initial?.map_url ?? "")
  const [image_url, setImageUrl] = useState(initial?.image_url ?? "")

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit({
      name,
      description,
      location,
      height,
      map_url,
      image_url: image_url || ""
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
        Altura
        <input
          className="event-input"
          value={height}
          onChange={e => setHeight(e.target.value)}
          placeholder="Altura (metros)"
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
        URL da imagem
        <input
          className="event-input"
          value={image_url}
          onChange={e => setImageUrl(e.target.value)}
          placeholder="URL da imagem (ex: https://...)"
        />
        {/* Preview pequeno, opcional */}
        {image_url && (
          <img
            src={image_url}
            alt="Pré-visualização"
            style={{ maxWidth: 120, marginTop: 8, borderRadius: 4, border: "1px solid #eee" }}
          />
        )}
      </label>
      <div style={{ display: "flex", gap: "1em", marginTop: "1em" }}>
        <button type="submit" className="button-outline">Salvar</button>
        <button type="button" onClick={onCancel} className="button-cancel">Cancelar</button>
      </div>
    </form>
  )
}