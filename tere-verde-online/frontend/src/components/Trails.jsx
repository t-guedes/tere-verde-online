import React, { useEffect, useState, useMemo } from "react";
import Select from "react-select";
import MapLink from "./MapLink";
import trilhaSuspensaImg from '../assets/trilha-suspensa.jpg';
import cartaoPostalImg from '../assets/cartao-postal.jpeg';
import pedraDoSinoImg from '../assets/pedra-do-sino.jpg';
import pedraDaTartarugaImg from '../assets/pedra-da-tartaruga.jpg';

// Trilhas de destaque fixas
const featuredTrails = [
  {
    id: 0,
    name: "Trilha Suspensa",
    park: "Parque Nacional da Serra dos Órgãos",
    difficulty: "Leve",
    estimated_time: "20 a 30 min (ida e volta)",
    description: "Passarelas elevadas sobre a floresta. Acessível para crianças, idosos e pessoas com mobilidade reduzida. Placas educativas sobre flora e fauna.",
    safety_tips: "",
    ideal_for: "Educação ambiental, passeio em família",
    image_url: trilhaSuspensaImg,
    map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3687.399111182171!2d-43.001112600000006!3d-22.45163149999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x99b39eaf18d56d%3A0x634a788a75a54c38!2sTrilha%20Suspensa!5e0!3m2!1spt-BR!2sbr!4v1750196079405!5m2!1spt-BR!2sbr"
  },
  {
    id: 1,
    name: "Trilha Cartão Postal",
    park: "Parque Nacional da Serra dos Órgãos",
    difficulty: "Moderado",
    estimated_time: "1h30 (ida e volta)",
    description: "Mirante com vista deslumbrante do Dedo de Deus. Percurso bem sinalizado com trechos de mata fechada.",
    safety_tips: "",
    ideal_for: "Fotos, contemplação e caminhadas leves",
    image_url: cartaoPostalImg,
    map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3687.2565223886413!2d-42.99332512470299!3d-22.456992579574134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x99b355903ab05b%3A0x1351408e06b75ae2!2sTrilha%20Cart%C3%A3o%20Postal!5e0!3m2!1spt-BR!2sbr!4v1750197305534!5m2!1spt-BR!2sbr"
  },
  {
    id: 2,
    name: "Trilha da Pedra do Sino",
    park: "Parque Nacional da Serra dos Órgãos",
    difficulty: "Pesado",
    estimated_time: "5 a 7h (ida – 11,1 km só de subida)",
    description: "Pico mais alto do parque (2.275m). Pernoite possível no abrigo de montanha. Vista panorâmica da Baía de Guanabara em dias claros.",
    safety_tips: "",
    ideal_for: "Montanhistas, trilheiros experientes",
    image_url: pedraDoSinoImg,
    map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29494.810675173412!2d-43.07532162454029!3d-22.472220292024932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x99ae7ee09be239%3A0xc680333e9f5d646a!2sPedra%20do%20Sino!5e0!3m2!1spt-BR!2sbr!4v1750198137749!5m2!1spt-BR!2sbr"
  },
  {
    id: 3,
    name: "Trilha da Pedra da Tartaruga",
    park: "Parque Natural Municipal Montanhas de Teresópolis (PNMMT)",
    difficulty: "Moderado",
    estimated_time: "1h (ida)",
    description: "Mirante com vista 360º da região serrana. Um dos cartões-postais do parque.",
    safety_tips: "",
    ideal_for: "",
    image_url: pedraDaTartarugaImg,
    map_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d297146.5212758072!2d-43.11297381015546!3d-22.538541940604652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x984dae6d1e488f%3A0x235ce210eeb02c18!2sPedra%20da%20Tartaruga%20-%20Parque%20Municipal%20Montanhas%20de%20Teresópolis!5e0!3m2!1spt-BR!2sbr!4v1750199494732!5m2!1spt-BR!2sbr"
  }
];

// Opções de filtro para React-Select
const PARK_OPTIONS = [
  { value: "", label: "Parque" },
  { value: "Parque Nacional da Serra dos Órgãos", label: "Parque Nacional da Serra dos Órgãos" },
  { value: "Parque Estadual dos Três Picos", label: "Parque Estadual dos Três Picos" },
  { value: "Parque Natural Municipal Montanhas de Teresópolis (PNMMT)", label: "Parque Natural Municipal Montanhas de Teresópolis (PNMMT)" }
];

const DIFFICULTY_OPTIONS = [
  { value: "", label: "Dificuldade" },
  { value: "Leve", label: "Leve" },
  { value: "Moderado", label: "Moderado" },
  { value: "Pesado", label: "Pesado" },
  { value: "Moderado a pesado", label: "Moderado a pesado" }
];

const selectStyles = {
  control: (base, state) => ({
    ...base,
    borderRadius: 7,
    minHeight: 36,
    fontSize: 16,
    border: "1px solid #b6e09d", // borda verde
    backgroundColor: "#fafcfb",
    boxShadow: state.isFocused ? "0 0 0 1px #c8e6c9" : "none", // sombra leve verde
    "&:hover": { borderColor: "#a3d18f" }, // verde escuro ao passar o mouse
    outline: "none", // remove o azul do foco do navegador
  }),
  menu: (base) => ({ ...base, borderRadius: 7 }),
  option: (base, state) => ({
    ...base,
    background: state.isFocused ? "#e3f3df" : "#fff",
    color: "#27311d",
  }),
  singleValue: (base) => ({ ...base, color: "#27311d" }),
  placeholder: (base) => ({ ...base, color: "#5e6e41" }),
};


export default function Trails() {
  const [dbTrails, setDbTrails] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [parkFilter, setParkFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");

  useEffect(() => {
    import("../api")
      .then(({ fetchTrails }) => fetchTrails({}))
      .then(res => setDbTrails(res.data || []));
  }, []);

  const allTrails = useMemo(() => [...featuredTrails, ...dbTrails], [dbTrails]);

  const filteredTrails = useMemo(() => {
    return allTrails.filter(tr => {
      return (
        (!nameFilter || tr.name.toLowerCase().includes(nameFilter.toLowerCase())) &&
        (!parkFilter || tr.park === parkFilter) &&
        (!difficultyFilter || tr.difficulty === difficultyFilter)
      );
    });
  }, [allTrails, nameFilter, parkFilter, difficultyFilter]);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1rem" }}>
      <h1 className="main-title">Trilhas</h1>

      {/* Filtros React-Select e input */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Nome da trilha"
          value={nameFilter}
          onChange={e => setNameFilter(e.target.value)}
          style={{ flex: "1 1 150px", minWidth: 120, padding: "6px 10px", fontSize: 16, borderRadius: 7, border: "1px solid #b1d2ad" }}
        />
        <div style={{ flex: "1 1 200px", minWidth: 120 }}>
          <Select
            options={PARK_OPTIONS}
            value={PARK_OPTIONS.find(opt => opt.value === parkFilter)}
            onChange={opt => setParkFilter(opt.value)}
            styles={selectStyles}
            placeholder="Parque"
            isSearchable={false}
          />
        </div>
        <div style={{ flex: "1 1 150px", minWidth: 120 }}>
          <Select
            options={DIFFICULTY_OPTIONS}
            value={DIFFICULTY_OPTIONS.find(opt => opt.value === difficultyFilter)}
            onChange={opt => setDifficultyFilter(opt.value)}
            styles={selectStyles}
            placeholder="Dificuldade"
            isSearchable={false}
          />
        </div>
      </div>

      {/* Lista de Trilhas */}
      {filteredTrails.length === 0 ? (
        <p className="no-events">Nenhuma trilha encontrada.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "2.2em" }}>
          {filteredTrails.map(tr => {
            const isEmbed = tr.map_url && tr.map_url.startsWith("https://www.google.com/maps/embed");
            const key = `${tr.id}-${tr.name}-${tr.park}`;
            return (
              <div
                key={key}
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
                {tr.image_url ? (
                  <img
                    src={tr.image_url}
                    alt={tr.name}
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
                  <div style={{
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
                  }}>Sem imagem</div>
                )}
                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <div className="trail-list-title" style={{ marginBottom: 8 }}>
                    {tr.name}
                    {tr.map_url && !isEmbed && <MapLink url={tr.map_url} />}
                  </div>
                  <div className="trail-list-meta" style={{ marginBottom: 8 }}>
                    <strong>Parque:</strong> {tr.park} <br />
                    <strong>Dificuldade:</strong> {tr.difficulty} <br />
                    <strong>Tempo estimado:</strong> {tr.estimated_time}
                  </div>
                  <div className="trail-list-desc" style={{ marginBottom: 8 }}>
                    <strong>Características:</strong> {tr.description}
                  </div>
                  {tr.ideal_for && (
                    <div className="trail-list-ideal" style={{ marginBottom: 8 }}>
                      <strong>Ideal para:</strong> {tr.ideal_for}
                    </div>
                  )}
                  {tr.safety_tips && (
                    <div className="trail-list-tips" style={{ marginBottom: 8 }}>
                      <i>Dicas: {tr.safety_tips}</i>
                    </div>
                  )}
                  {isEmbed && (
                    <iframe
                      src={tr.map_url}
                      width="100%"
                      height="155"
                      style={{ border: 0, borderRadius: "12px", boxShadow: "0 2px 8px #b6e09d3a", marginTop: "1em" }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Mapa da trilha ${tr.name}`}
                    />
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
