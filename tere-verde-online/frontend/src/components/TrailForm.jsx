import React, { useState } from "react"

export default function TrailForm({ initial, onSubmit, onCancel }) {
  const [name, setName] = useState(initial?.name || "")
  const [park, setPark] = useState(initial?.park || "")
  const [difficulty, setDifficulty] = useState(initial?.difficulty || "")
  const [estimated_time, setEstimatedTime] = useState(initial?.estimated_time || "")
  const [description, setDescription] = useState(initial?.description || "")
  const [ideal_for, setIdealFor] = useState(initial?.ideal_for || "")
  const [safety_tips, setSafetyTips] = useState(initial?.safety_tips || "")
  const [map_url, setMapUrl] = useState(initial?.map_url || "")
  const [image_url, setImageUrl] = useState(initial?.image_url || "")

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit({
      name,
      park,
      difficulty,
      estimated_time,
      description,
      ideal_for,
      safety_tips,
      map_url,
      image_url
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
          placeholder="Nome da trilha"
          required
        />
      </label>
      <label className="event-label">
        Parque
        <select
          className="event-input"
          value={park}
          onChange={e => setPark(e.target.value)}
          required
        >
          <option value="">Selecione o parque</option>
          <option value="Parque Nacional da Serra dos Órgãos">Parque Nacional da Serra dos Órgãos</option>
          <option value="Parque Estadual dos Três Picos">Parque Estadual dos Três Picos</option>
          <option value="Parque Natural Municipal Montanhas de Teresópolis">Parque Natural Municipal Montanhas de Teresópolis</option>
        </select>
      </label>
      <label className="event-label">
        Dificuldade
        <select
          className="event-input"
          value={difficulty}
          onChange={e => setDifficulty(e.target.value)}
          required
        >
          <option value="">Selecione</option>
          <option value="Leve">Leve</option>
          <option value="Moderado">Moderado</option>
          <option value="Pesado">Pesado</option>
          <option value="Moderado a pesado">Moderado a pesado</option>
        </select>
      </label>
      <label className="event-label">
        Tempo estimado
        <input
          className="event-input"
          value={estimated_time}
          onChange={e => setEstimatedTime(e.target.value)}
          placeholder="Ex: 1h30 (ida e volta)"
        />
      </label>
      <label className="event-label">
        Características
        <textarea
          className="event-textarea"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Ex: Mirante, mata fechada, passarela, etc."
        />
      </label>
      <label className="event-label">
        Ideal para
        <input
          className="event-input"
          value={ideal_for}
          onChange={e => setIdealFor(e.target.value)}
          placeholder="Ex: Família, contemplação, fotos..."
        />
      </label>
      <label className="event-label">
        Dicas de segurança
        <input
          className="event-input"
          value={safety_tips}
          onChange={e => setSafetyTips(e.target.value)}
          placeholder="Alguma dica de segurança"
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