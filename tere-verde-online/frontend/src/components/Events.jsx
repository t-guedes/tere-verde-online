import React, { useEffect, useState } from "react"
import { fetchEvents } from "../api"
import FilterBar from "./FilterBar"

// Utilitário para formatar data para o padrão brasileiro
function formatDateBR(dateStr) {
  if (!dateStr) return ""
  if (dateStr.includes(" a ")) {
    const [start, end] = dateStr.split(" a ")
    return `${formatDateBR(start)} a ${formatDateBR(end)}`
  }
  if (dateStr.includes(",")) {
    return dateStr.split(",").map(d => formatDateBR(d.trim())).join(", ")
  }
  const [yyyy, mm, dd] = dateStr.split("-")
  if (!dd || !mm || !yyyy) return dateStr
  return `${dd}/${mm}/${yyyy}`
}

// Converte datas tipo 06/07/2025 para 2025-07-06
function normalizeDateForCompare(dateStr) {
  if (!dateStr) return ""
  if (dateStr.includes("/")) {
    const [dd, mm, yyyy] = dateStr.split("/")
    if (dd && mm && yyyy) return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`
  }
  // se já está no formato yyyy-mm-dd
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr
  return dateStr
}

const staticEvents = [
  {
    id: "static-1",
    title: "Dia do Aniversário da Cidade",
    date: "2025-07-06",
    location: "Avenida J. J. de Araújo Regadas (Parque Regadas), Matriz de Santa Teresa",
    description:
      `10h: Desfile cívico na Avenida J. J. de Araújo Regadas (Parque Regadas).
15h: Missa em Ação de Graças na Matriz de Santa Teresa.
Ato cívico e cerimônia ecumênica com autoridades municipais e estaduais.`
  },
  {
    id: "static-2",
    title: "Terê Noturno & Feira de Artesanato",
    date: "2025-07-01 a 2025-07-31",
    location: "Diversos locais",
    description: "Exposições, shows e feira de artesanato durante todo o mês de julho."
  },
  {
    id: "static-3",
    title: "Arraiá, Música, Circo e Camerata Teresópolis",
    date: "2025-07-07, 2025-07-12 a 2025-07-28",
    location: "Diversos locais",
    description: "Arraiá, apresentações circenses e shows especiais com a Camerata Teresópolis."
  },
  {
    id: "static-4",
    title: "Peças de Teatro e Dança",
    date: "2025-07-11 a 2025-07-21",
    location: "Teatros e espaços culturais",
    description: "Espetáculos de teatro, dança, além da posse da Academia Teresopolitana de Letras."
  },
  {
    id: "static-5",
    title: "Festival SESC de Inverno",
    date: "2025-07-11 a 2025-07-21",
    location: "Unidades SESC e espaços parceiros",
    description: "Festival SESC de Inverno com intensa programação cultural, artística e recreativa."
  },
  {
    id: "static-6",
    title: "Festa da Ponkan & Salto Hípico",
    date: "2025-07-11 a 2025-07-21",
    location: "Diversos locais",
    description: "Festa da Ponkan e competições de salto hípico agitam a cidade no mês de julho."
  }
]

// Função para checar se o evento bate com os filtros
function staticEventMatchesFilter(ev, filter) {
  // Título
  if (filter.title && !ev.title.toLowerCase().includes(filter.title.toLowerCase())) {
    return false
  }
  // Data
  if (filter.date) {
    if (!ev.date) return false
    // Suporta intervalos tipo "2025-07-01 a 2025-07-31" ou listas separadas por vírgula
    const date = normalizeDateForCompare(filter.date)
    return ev.date.split(",").some(datePart => {
      datePart = datePart.trim()
      if (datePart.includes(" a ")) {
        const [start, end] = datePart.split(" a ").map(v => v.trim())
        return date >= start && date <= end
      }
      return date === datePart
    })
  }
  return true
}

export default function Events() {
  const [events, setEvents] = useState([])
  const [filter, setFilter] = useState({})
  const [badge, setBadge] = useState(false)

  useEffect(() => {
    fetchEvents(filter).then(res => {
      // Filtros também nos eventos estáticos
      let filteredStatic = staticEvents.filter(ev => staticEventMatchesFilter(ev, filter))
      // Filtra eventos dinâmicos para não duplicar estáticos
      const dynamicEvents = res.data.filter(ev => !staticEvents.some(sev => sev.title === ev.title && sev.date === ev.date))
      // Junta tudo filtrado
      const allEvents = [...filteredStatic, ...dynamicEvents]
      setEvents(allEvents)
      if (allEvents.length > 0 && (!filter.title && !filter.date)) setBadge(true)
      else setBadge(false)
    })
  }, [filter])

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1rem" }}>
      <h1 className="main-title">
        Eventos
        {badge && (
          <span className="badge-novos">
            Novos
          </span>
        )}
      </h1>
      <FilterBar
        onFilter={setFilter}
        fields={[
          { name: "title", label: "Título" },
          { name: "date", label: "Data", type: "date" }
        ]}
      />
      {events.length === 0 ? (
        <p className="no-events">Nenhum evento disponível.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "2.2em",
            marginTop: "2em"
          }}
        >
          {events.map(ev => (
            <div
              key={ev.id}
              className="event-list-item"
              style={
                ev.id === "static-1"
                  ? {
                      background: "linear-gradient(100deg, #e8f5e9 80%, #d8efda 100%)",
                      border: "2px solid #b6e09d",
                      boxShadow: "0 4px 18px #d9e6d088",
                      padding: "2.1em 1.3em 1.5em 1.3em",
                      position: "relative",
                      minHeight: 240
                    }
                  : {
                      borderLeft: "6px solid #b6e09d",
                      background: "linear-gradient(98deg, #f9f8f3 85%, #f2fbe9 100%)",
                      boxShadow: "0 2px 7px #eae7d5a6",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "stretch",
                      minHeight: 240,
                      padding: "1.3em"
                    }
              }
            >
              {ev.id === "static-1" && (
                <div style={{
                  position: "absolute",
                  top: 20,
                  right: 25,
                  fontSize: 32,
                  opacity: 0.18,
                  color: "#43a047"
                }}>
                  <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="4" y="8" width="24" height="20" rx="4" />
                    <path d="M4 12h24" />
                    <rect x="9" y="16" width="4" height="4" rx="1" fill="#43a047" />
                    <rect x="15" y="16" width="4" height="4" rx="1" fill="#43a047" />
                  </svg>
                </div>
              )}
              <div className="event-list-title" style={{ color: ev.id === "static-1" ? "#226232" : "#3a5634", fontWeight: 600, fontSize: ev.id === "static-1" ? "1.17em" : undefined, marginBottom: 5 }}>
                {ev.id === "static-1" && <span role="img" aria-label="estrela" style={{ fontSize: 22, marginRight: 5 }}>🎉</span>}
                {ev.id === "static-1" ? "6 de julho (domingo): Aniversário da Cidade" : ev.title}
              </div>
              <div className="event-list-meta" style={{
                color: ev.id === "static-1" ? "#388e3c" : "#5e6e41",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 7
              }}>
                <span style={{
                  background: ev.id === "static-1" ? "#c8e6c9" : "#e1f6e2",
                  color: ev.id === "static-1" ? "#246b3a" : "#226232",
                  borderRadius: 5,
                  fontSize: "0.97em",
                  padding: "0.1em 0.7em"
                }}>
                  {formatDateBR(ev.date)}
                </span>
                <span aria-hidden="true" style={{ opacity: 0.5 }}>•</span>
                <span>{ev.location}</span>
              </div>
              <div className="event-list-desc" style={{
                color: ev.id === "static-1" ? "#3e5d3a" : "#4b5a30",
                whiteSpace: "pre-line",
                marginTop: 8
              }}>
                {ev.id === "static-1" ? (
                  <ul style={{ margin: 0, paddingLeft: 22 }}>
                    <li><b>10h:</b> Desfile cívico na Avenida J. J. de Araújo Regadas (Parque Regadas)</li>
                    <li><b>15h:</b> Missa em Ação de Graças na Matriz de Santa Teresa</li>
                    <li>Ato cívico e cerimônia ecumênica com autoridades municipais e estaduais</li>
                  </ul>
                ) : (
                  <><strong>Descrição:</strong> {ev.description}</>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}