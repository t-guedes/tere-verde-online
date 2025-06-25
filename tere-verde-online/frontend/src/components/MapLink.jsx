import React from "react"

export default function MapLink({ url }) {
  if (!url) return null

  // Só mostra o link para mapas que NÃO são embed
  let label = url.includes("google") ? "Google Maps" : "Ver no mapa"
  return (
    <span style={{ marginLeft: 8, verticalAlign: "middle" }}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="map-link"
        style={{ fontSize: "0.9em" }}
      >
        {label} <span role="img" aria-label="mapa">🗺️</span>
      </a>
    </span>
  )
}