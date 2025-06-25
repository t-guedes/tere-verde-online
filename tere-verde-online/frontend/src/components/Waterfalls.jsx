import React, { useEffect, useState, useMemo } from "react";
import FilterBar from "./FilterBar";
import MapLink from "./MapLink";

// Destaque fixo
const featuredWaterfall = {
  id: 0,
  name: "Cachoeira dos Frades",
  location: "Teresópolis",
  height: "Aprox. 10 metros",
  description:
    "A Cachoeira dos Frades, um dos cartões postais de Teresópolis, possui uma linda queda de aproximadamente 10 metros de altura...",
  image_url:
    "https://hotelfazendajecava.com.br/wp-content/uploads/2024/04/Cachoeira_dos_Frades_HDR_1-455d4894-2880w-1.jpeg",
  map_url:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.380134008079!2d-42.80378932470645!3d-22.339271079658626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x983746ca7737dd%3A0x6241f52b8aae6321!2sCachoeira%20dos%20Frades!5e0!3m2!1spt-BR!2sbr!4v1750286217607!5m2!1spt-BR!2sbr"
};

export default function Waterfalls() {
  const [dbWaterfalls, setDbWaterfalls] = useState([]);
  const [filters, setFilters] = useState({});

  // Carrega do banco
  useEffect(() => {
    import("../api")
      .then(({ fetchWaterfalls }) => fetchWaterfalls({}))
      .then(res => setDbWaterfalls(res.data || []));
  }, []);

  // Sempre monta a lista unificada antes do filtro
  const allWaterfalls = useMemo(
    () => [featuredWaterfall, ...dbWaterfalls],
    [dbWaterfalls]
  );

  // Aplica filtro sobre a lista unificada
  const filteredWaterfalls = useMemo(() => {
    return allWaterfalls.filter(wf => {
      const nameFilter = filters.name
        ? wf.name.toLowerCase().includes(filters.name.toLowerCase())
        : true;
      const heightFilter = filters.height
        ? (wf.height || "")
          .toLowerCase()
          .includes(filters.height.toLowerCase())
        : true;
      return nameFilter && heightFilter;
    });
  }, [filters, allWaterfalls]);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1rem" }}>
      <h1 className="main-title">Cachoeiras</h1>
      <FilterBar
        onFilter={setFilters}
        fields={[
          { name: "name", label: "Nome" },
          { name: "height", label: "Altura" }
        ]}
      />
      {filteredWaterfalls.length === 0 ? (
        <p className="no-events">Nenhuma cachoeira encontrada.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "2.2em",
            marginTop: "2em"
          }}
        >
          {filteredWaterfalls.map(wf => {
            const isEmbed =
              wf.map_url &&
              wf.map_url.startsWith("https://www.google.com/maps/embed");
            return (
              <div
                key={wf.id}
                className="trail-list-item"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  background: "rgba(255, 255, 255, 0.68)",
                  border: "1.7px solid #c8e6c9",
                  borderRadius: 13,
                  boxShadow: "0 4px 18px #d9e6d0b6",
                  padding: "1.3em",
                  minHeight: 420
                }}
              >
                {wf.image_url ? (
                  <img
                    src={wf.image_url}
                    alt={wf.name}
                    style={{
                      width: "100%",
                      height: 180,
                      objectFit: "cover",
                      borderRadius: 10,
                      border: "1.5px solid #b6e09d",
                      boxShadow: "0 2px 10px #b6e09d22",
                      background: "#f8fef7",
                      marginBottom: "1em"
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: 180,
                      borderRadius: 10,
                      background: "#f3f3f3",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#bbb",
                      border: "1px solid #eee",
                      fontStyle: "italic",
                      marginBottom: "1em"
                    }}
                  >
                    Sem imagem
                  </div>
                )}
                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <div className="trail-list-title" style={{ marginBottom: 8 }}>
                    {wf.name}
                    {wf.map_url && !isEmbed && <MapLink url={wf.map_url} />}
                  </div>
                  <div className="trail-list-meta" style={{ marginBottom: 8 }}>
                    {wf.location && (
                      <>
                        <strong>Localização:</strong> {wf.location}
                        <br />
                      </>
                    )}
                    {wf.height && (
                      <>
                        <strong>Altura:</strong> {wf.height}
                        <br />
                      </>
                    )}
                  </div>
                  <div className="trail-list-desc" style={{ marginBottom: 8 }}>
                    <strong>Características:</strong> {wf.description}
                  </div>
                  {isEmbed && (
                    <div style={{ marginTop: "auto" }}>
                      <iframe
                        src={wf.map_url}
                        width="100%"
                        height="155"
                        style={{
                          border: 0,
                          borderRadius: "12px",
                          boxShadow: "0 2px 8px #b6e09d3a",
                          marginTop: "1em"
                        }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Mapa da cachoeira ${wf.name}`}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}