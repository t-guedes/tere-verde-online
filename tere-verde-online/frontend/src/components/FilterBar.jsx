import React, { useState } from "react"

export default function FilterBar({ onFilter, fields }) {
  const [filters, setFilters] = useState({})

  // Chama filtro toda vez que digita ou apaga
  const handleChange = e => {
    const newFilters = { ...filters, [e.target.name]: e.target.value }
    setFilters(newFilters)
    onFilter(newFilters)
  }

  return (
    <form
      className="filter-bar"
      style={{ display: "flex", gap: "1em", alignItems: "center" }}
      onSubmit={e => e.preventDefault()} // Evita submit recarregar a página
    >
      {fields.map(field => (
        <span key={field.name}>
          {field.type === "select" ? (
            <select
              name={field.name}
              value={filters[field.name] || ""}
              onChange={handleChange}
              className="event-input"
            >
              {field.options.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              name={field.name}
              type={field.type || "text"}
              placeholder={field.label}
              value={filters[field.name] || ""}
              onChange={handleChange}
              className="event-input"
            />
          )}
        </span>
      ))}
      {/* <button type="submit" className="button-outline">Filtrar</button> */}
    </form>
  )
}