import React, { useEffect, useState, useMemo } from "react";
import { fetchParks } from "../api";
import MapLink from "./MapLink";

const featuredParks = [
  {
    id: "parnaso",
    name: "Parque Nacional da Serra dos Órgãos",
    location: "Teresópolis, Petrópolis, Guapimirim, Magé",
    area: "10.527 hectares",
    created: "1939",
    highlights: "Dedo de Deus, trilhas históricas",
    description:
      "O Parque Nacional da Serra dos Órgãos, criado em 1939, é um dos mais antigos e emblemáticos parques nacionais do Brasil. Com uma área de 10.527 hectares abrangendo os municípios de Teresópolis, Petrópolis, Guapimirim e Magé, o parque protege valiosos remanescentes de Mata Atlântica, além de impressionantes formações rochosas, como o famoso Dedo de Deus. Reconhecido internacionalmente por seu potencial para o montanhismo, o PARNASO também oferece trilhas históricas, mirantes deslumbrantes e é referência em conservação de nascentes e biodiversidade. Sua infraestrutura acolhe visitantes interessados em ecoturismo, educação ambiental e atividades de lazer em contato direto com a natureza.",
    image_url:
      "https://macamp.com.br/guia/wp-content/uploads//arquivos/guia/arquivos/943/imagens/logo1.png",
    map_url: "",
    link: "https://www.icmbio.gov.br/parnaserradosorgaos/"
  },
  {
    id: "petp",
    name: "Parque Estadual dos Três Picos",
    location: "Nova Friburgo, Teresópolis, Cachoeiras de Macacu, Silva Jardim, Guapimirim",
    area: "58.790 hectares",
    created: "2002",
    highlights: "Pico Maior de Friburgo, trilhas e cachoeiras",
    description:
      "O Parque Estadual dos Três Picos, instituído em 2002, representa a maior unidade de conservação estadual do Rio de Janeiro, totalizando 58.790 hectares. Abrange cinco municípios e preserva um dos maiores contínuos de Mata Atlântica do Sudeste brasileiro. O parque se destaca pela vasta biodiversidade, presença de espécies raras e ameaçadas, e por suas belas paisagens de montanhas, como o Pico Maior de Friburgo. O PETP é estratégico para a formação de corredores ecológicos, conectando-se a outras áreas protegidas. Com trilhas, cachoeiras e áreas de lazer, o parque é um destino de excelência para a prática de esportes de natureza, pesquisa científica e atividades de educação ambiental.",
    image_url:
      "https://teretotal.com.br/wp-content/uploads/2012/03/Parque-Estadual-Tres-Picos.jpg",
    map_url: "",
    link: "https://www.inea.rj.gov.br/unidade-de-conservacao/parque-estadual-dos-tres-picos-petp/"
  },
  {
    id: "pnmmt",
    name: "Parque Natural Municipal Montanhas de Teresópolis",
    location: "Teresópolis",
    area: "5.335 hectares",
    created: "2009",
    highlights: "Pedra da Tartaruga, núcleo Santa Rita",
    description:
      "O Parque Natural Municipal Montanhas de Teresópolis, criado em 2009 e ampliado em 2023, abrange cerca de 5.335 hectares dedicados à proteção integral da biodiversidade e dos recursos hídricos do município. A unidade oferece uma variedade de trilhas, mirantes naturais e áreas de lazer, sendo um espaço privilegiado para o ecoturismo e a educação ambiental. Entre seus atrativos, destacam-se a Pedra da Tartaruga e o Núcleo Santa Rita. O PNMMT reforça o compromisso de Teresópolis com a sustentabilidade, promovendo a preservação da fauna, flora e o bem-estar da população por meio do contato harmônico com o meio ambiente.",
    image_url:
      "https://www.teresopolis.rj.gov.br/wp-content/webp-express/webp-images/uploads/2024/02/PNMMT-Logo-01-e1715338815106-1552x2048.png.webp",
    map_url: "",
    link: "https://www.teresopolis.rj.gov.br/pnmmt/"
  }
];

const PARK_FILTER_OPTIONS = [
  { value: "Parque Nacional da Serra dos Órgãos", label: "Parque Nacional da Serra dos Órgãos" },
  { value: "Parque Estadual dos Três Picos", label: "Parque Estadual dos Três Picos" },
  { value: "Parque Natural Municipal Montanhas de Teresópolis", label: "Parque Natural Municipal Montanhas de Teresópolis" },
  { value: "outros", label: "Outros (escrever nome)" }
];

export default function Parks() {
  const [adminParks, setAdminParks] = useState([]);
  const [filterSelect, setFilterSelect] = useState("");
  const [customFilter, setCustomFilter] = useState("");

  useEffect(() => {
    fetchParks({}).then(res => setAdminParks(res.data || []));
  }, []);

  const allParks = useMemo(() => [
    ...featuredParks,
    ...adminParks
  ], [adminParks]);

  // Filtro atualizado sem FilterBar
  const filteredParks = useMemo(() => {
    let name = "";
    if (filterSelect === "outros") {
      name = customFilter;
    } else if (filterSelect) {
      name = filterSelect;
    }
    if (!name) return allParks;
    return allParks.filter(pk =>
      pk.name.toLowerCase().includes(name.toLowerCase())
    );
  }, [allParks, filterSelect, customFilter]);

  return (
    <div className="biodiversity-container" id="parks-section">
      <style>{`
        #parks-section .park-block {
          display: flex;
          flex-direction: row;
          align-items: stretch;
          justify-content: space-between;
          margin-bottom: 64px;
          gap: 60px;
        }
        #parks-section .park-text-content {
          flex: 2 1 0;
          min-width: 250px;
        }
        #parks-section .main-title {
          text-align: left;
          margin-bottom: 0.3em;
        }
        #parks-section .figure-container {
          background: #fff;
          box-shadow: 0 2px 12px #e7f3ee33;
          border-radius: 14px;
          padding: 20px 18px 10px 18px;
          min-width: 320px;
          max-width: 340px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          /* ocupa toda altura do bloco */
          height: 100%;
          margin-top: 150px;
        }
        #parks-section .figure-image {
          width: 360px;
          height: 150px;
          object-fit: contain;
          border-radius: 8px;
          margin-bottom: 7px;
          background: #fff;
          display: block;
        }
        #parks-section .figure-caption {
          text-align: center;
          font-size: 1em;
          color: #444;
          margin-bottom: 0;
        }
        @media (max-width: 900px) {
          #parks-section .park-block {
            flex-direction: column;
            align-items: stretch;
          }
          #parks-section .figure-container {
            margin: 0 auto 20px auto;
            max-width: 100vw;
            min-width: unset;
            height: auto;
          }
        }
      `}</style>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1rem" }}>
      
        {/* Filtro */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <select
            value={filterSelect}
            onChange={e => {
              setFilterSelect(e.target.value);
              setCustomFilter("");
            }}
            style={{ fontSize: 16, padding: "6px 10px", borderRadius: 7, border: "1px solid #b1d2ad" }}
          >
            <option value="">Todos</option>
            {PARK_FILTER_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {filterSelect === "outros" && (
            <input
              type="text"
              value={customFilter}
              onChange={e => setCustomFilter(e.target.value)}
              placeholder="Digite o nome do parque"
              style={{ fontSize: 16, borderRadius: 7, border: "1px solid #b1d2ad", padding: "6px 10px", width: 260 }}
            />
          )}
        </div>

        {filteredParks.length === 0 ? (
          <p className="no-events">Nenhum parque encontrado.</p>
        ) : (
          filteredParks.map(pk => (
            <React.Fragment key={pk.id}>
              <div className="park-block">
                <div className="park-text-content">
                  <h1 className="main-title">{pk.name}</h1>
                  <div>
                    {pk.created && (
                      <>
                        <b>Criado em:</b> {pk.created}<br />
                      </>
                    )}
                    {pk.area && (
                      <>
                        <b>Área:</b> {pk.area}<br />
                      </>
                    )}
                    {pk.highlights && (
                      <>
                        <b>Destaque:</b> {pk.highlights}<br />
                      </>
                    )}
                  </div>
                  {pk.description && (
                    <div style={{ margin: "12px 0" }}>
                      <b>Descrição:</b><br />
                      {pk.description}
                    </div>
                  )}
                  {pk.map_url && (
                    <div>
                      <MapLink url={pk.map_url} />
                    </div>
                  )}
                </div>
                <div className="figure-container">
                  {pk.image_url && (
                    <img
                      src={pk.image_url}
                      alt={pk.highlights ? `${pk.highlights} - ${pk.name}` : pk.name}
                      className="figure-image"
                    />
                  )}
                  {pk.highlights && (
                    <div className="figure-caption">
                      {pk.highlights} ({pk.name})
                    </div>
                  )}
                </div>
              </div>
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
}