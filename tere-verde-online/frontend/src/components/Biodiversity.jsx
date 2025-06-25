import React, { useEffect, useRef, useState, useMemo } from "react";
import { fetchBiodiversity } from "../api";

// Função utilitária para agrupar por campo (ex: parque)
function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const v = item[key] || "Sem Parque";
    acc[v] = acc[v] || [];
    acc[v].push(item);
    return acc;
  }, {});
}

// Card institucional
function BioCard({ bio }) {
  return (
    <div className="bio-card" style={{ display: "flex", gap: "2em", alignItems: "flex-start", margin: "36px 0", flexWrap: "wrap" }}>
      <div className="bio-card-text" style={{ flex: 2, minWidth: 260 }}>
        {bio.description && <p>{bio.description}</p>}
        {bio.mamiferos && bio.mamiferos.length > 0 && (
          <>
            <h3 className="section-subtitle">Mamíferos do Parque</h3>
            <ul className="species-list">
              {bio.mamiferos.map((m, idx) =>
                m && (
                  <li key={idx}>
                    <strong>{m.split("(")[0].trim()}</strong>
                    {m.includes("(") && (
                      <> <em>{m.substring(m.indexOf("("), m.length)}</em></>
                    )}
                  </li>
                )
              )}
            </ul>
          </>
        )}
        {bio.anfibios && bio.anfibios.length > 0 && (
          <>
            <h3 className="section-subtitle">Anfíbios e Répteis</h3>
            <ul className="species-list">
              {bio.anfibios.map((a, idx) =>
                a && (
                  <li key={idx}>
                    <strong>{a.split("(")[0].trim()}</strong>
                    {a.includes("(") && (
                      <> <em>{a.substring(a.indexOf("("), a.length)}</em></>
                    )}
                  </li>
                )
              )}
            </ul>
          </>
        )}
        {bio.aves && bio.aves.length > 0 && (
          <>
            <h3 className="section-subtitle">Paraíso das Aves</h3>
            <ul className="species-list">
              {bio.aves.map((a, idx) =>
                a && (
                  <li key={idx}>
                    <strong>{a.split("(")[0].trim()}</strong>
                    {a.includes("(") && (
                      <> <em>{a.substring(a.indexOf("("), a.length)}</em></>
                    )}
                  </li>
                )
              )}
            </ul>
          </>
        )}
        {bio.conclusao && (
          <div className="conclusion">
             {bio.conclusao}
          </div>
        )}
      </div>
      {bio.image_url && (
        <div className="figure-container" style={{ flex: 1, minWidth: 260, maxWidth: 340 }}>
          <img
            src={bio.image_url}
            alt={bio.species || bio.name || "Espécie cadastrada"}
            className="figure-image"
            style={{ width: "100%", borderRadius: 8, maxHeight: 220, objectFit: "cover", marginBottom: 8 }}
            onError={e => { e.target.style.display = 'none'; }}
          />
          {bio.image_caption &&
            <p className="figure-caption">{bio.image_caption}</p>
          }
        </div>
      )}
    </div>
  );
}

const PARK_FILTER_OPTIONS = [
  { value: "", label: "Todos os parques" },
  { value: "PARNASO", label: "PARNASO" },
  { value: "PNMMT", label: "PNMMT" },
  { value: "PETP", label: "PETP" },
  { value: "outros", label: "Outros (escrever nome)" }
];

export default function Biodiversity() {
  const [biodiversity, setBiodiversity] = useState([]);
  const [filterSelect, setFilterSelect] = useState("");
  const [customFilter, setCustomFilter] = useState("");
  const topRef = useRef(null);
  const parnasoRef = useRef(null);
  const pnmmtRef = useRef(null);
  const petpRef = useRef(null);
  const outrosRef = useRef(null);

  useEffect(() => {
    fetchBiodiversity().then(res => setBiodiversity(res.data));
  }, []);

  // Agrupa registros do backend por parque (campo 'name')
  const especiesPorParque = groupBy(biodiversity, "name");

  // Filtro para parques
  const filterValue = filterSelect === "outros" ? customFilter : filterSelect;

  const especiesFiltradas = useMemo(() => {
    if (!filterValue) return especiesPorParque;
    const filtro = filterValue.toLowerCase();
    return Object.fromEntries(
      Object.entries(especiesPorParque)
        .filter(([parque]) => parque.toLowerCase().includes(filtro))
    );
  }, [especiesPorParque, filterValue]);

  // Scroll automático ao trocar filtro
  useEffect(() => {
    if (filterSelect === "PARNASO" && parnasoRef.current) {
      parnasoRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (filterSelect === "PNMMT" && pnmmtRef.current) {
      pnmmtRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (filterSelect === "PETP" && petpRef.current) {
      petpRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (filterSelect === "outros" && customFilter && outrosRef.current) {
      // Faz scroll para o bloco do parque digitado (primeira ocorrência)
      outrosRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [filterSelect, customFilter]);

  const handleSelect = (e) => {
    setFilterSelect(e.target.value);
    setCustomFilter("");
  };

  const handleCustomFilterChange = (e) => {
    setCustomFilter(e.target.value);
    // Comportamento instantâneo: scroll será disparado pelo useEffect
  };

  const handleBackToTop = () => {
    if (topRef.current) topRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // Obtém o nome do parque filtrado para scroll em "outros"
  const firstFilteredParque =
    filterSelect === "outros" && customFilter
      ? Object.keys(especiesFiltradas)[0] || ""
      : "";

  return (
    <div className="biodiversity-container">
      <div ref={topRef} />

      <div style={{ margin: "18px 0 30px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <select
            value={filterSelect}
            onChange={handleSelect}
            style={{
              fontSize: "1em",
              padding: "6px 18px",
              borderRadius: 7,
              border: "1px solid #c1d0c7",
              color: "#33685d",
              background: "#fafcfb",
              fontWeight: 500,
              boxShadow: "0 1.5px 8px #e7f3ee44",
              outline: "none",
              transition: "border 0.18s, box-shadow 0.18s",
              minWidth: 180,
            }}
          >
            {PARK_FILTER_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {filterSelect === "outros" && (
            <input
              type="text"
              value={customFilter}
              onChange={handleCustomFilterChange}
              placeholder="Digite o nome do parque"
              style={{
                fontSize: 16,
                borderRadius: 7,
                border: "1px solid #b1d2ad",
                padding: "6px 10px",
                width: 260
              }}
            />
          )}
        </div>
      </div>

      {/* BLOCO PARNASO */}
      <div ref={parnasoRef}>
        <h1 className="main-title">Conheça a Biodiversidade do PARNASO</h1>
        <div className="content-section" style={{ display: "flex", gap: "2em" }}>
          <div className="text-column">
            <p>
              O Parque Nacional da Serra dos Órgãos, criado em 1939, protege áreas de Mata Atlântica que abrigam uma diversidade impressionante de espécies vegetais e animais. Localizado nos municípios de Teresópolis, Petrópolis, Magé e Guapimirim, o parque é um verdadeiro santuário ecológico, com formações rochosas imponentes, como o Dedo de Deus, e uma vasta rede de trilhas, rios e florestas que garantem o abrigo de diversas espécies da fauna e flora brasileiras.
            </p>
            <p>
              Além de sua importância ambiental, o parque promove atividades de educação ambiental, pesquisa científica e ecoturismo, reforçando a conexão entre pessoas e natureza. Abaixo, conheça alguns dos representantes da fauna encontrados nesta unidade de conservação:
            </p>
            <h3 className="section-subtitle">Mamíferos do Parque</h3>
            <ul className="species-list">
              <li><strong>Macaco-prego</strong> (<em>Sapajus nigritus</em>)</li>
              <li><strong>Gato-maracajá</strong> (<em>Leopardus wiedii</em>)</li>
              <li><strong>Preguiça-de-três-dedos</strong> (<em>Bradypus variegatus</em>)</li>
              <li><strong>Tamanduá-mirim</strong> (<em>Tamandua tetradactyla</em>)</li>
              <li><strong>Irara</strong> (<em>Eira barbara</em>)</li>
            </ul>
            <h3 className="section-subtitle">Anfíbios e Répteis</h3>
            <ul className="species-list">
              <li><strong>Perereca-da-folhagem</strong> (<em>Phasmahyla cochranae</em>)</li>
              <li><strong>Salamandra-de-cauda-vermelha</strong> (<em>Bolitoglossa paraensis</em>)</li>
              <li><strong>Jararaca</strong> (<em>Bothrops jararaca</em>)</li>
              <li><strong>Lagarto-preguiça</strong> (<em>Enyalius perditus</em>)</li>
              <li><strong>Cobra-cipó</strong> (<em>Oxybelis fulgidus</em>)</li>
            </ul>
            <h3 className="section-subtitle">Paraíso das Aves</h3>
            <ul className="species-list">
              <li><strong>Gavião-pato</strong> (<em>Spizaetus melanoleucus</em>)</li>
              <li><strong>Sabiá-laranjeira</strong> (<em>Turdus rufiventris</em>)</li>
              <li><strong>Gralha-azul</strong> (<em>Cyanocorax caeruleus</em>)</li>
              <li><strong>Tiê-sangue</strong> (<em>Ramphocelus bresilius</em>)</li>
              <li><strong>Beija-flor-de-fronte-violeta</strong> (<em>Thalurania glaucopis</em>)</li>
            </ul>
            <p className="conclusion">
              O <strong>Parque Nacional da Serra dos Órgãos</strong> é muito mais que uma área protegida — é um espaço vivo de biodiversidade e um patrimônio natural que pertence a todos nós. Preservá-lo é garantir que futuras gerações também possam admirar a riqueza da nossa fauna e flora.
            </p>
          </div>
          <div className="image-column">
            <div className="figure-container">
              <img src="https://viagemeturismo.abril.com.br/wp-content/uploads/2024/07/dedo-de-deus-teresopolis-mirante-do-soberbo.jpg?quality=70&strip=info&w=1280&h=720&crop=1"
                   alt="Dedo de Deus" className="figure-image" />
              <p className="figure-caption">Dedo de Deus, símbolo do parque</p>
            </div>
            <div className="figure-container">
              <img src="https://live.staticflickr.com/3877/14360296142_7b2d7772b0_b.jpg"
                   alt="Macaco-prego no PARNASO" className="figure-image" />
              <p className="figure-caption">Macaco-prego, fauna típica</p>
            </div>
            <div className="figure-container">
              <img src="https://cdn.download.ams.birds.cornell.edu/api/v1/asset/243986271/480"
                   alt="Gavião-pato no PARNASO" className="figure-image" />
              <p className="figure-caption">Gavião-pato, ave emblemática</p>
            </div>
          </div>
        </div>
        <div style={{margin: "36px 0 16px 0", textAlign: "center"}}>
          <button
            onClick={handleBackToTop}
            style={{
              background: "#f1f5f3",
              color: "#207c4d",
              border: "1px solid #c1d0c7",
              borderRadius: 6,
              padding: "7px 18px",
              fontWeight: 500,
              fontSize: "1em",
              cursor: "pointer",
              boxShadow: "0 1px 6px #e6efeb44"
            }}
          >
            ↑ Escolher outro parque
          </button>
        </div>
      </div>

      {/* BLOCO PNMMT */}
      <div ref={pnmmtRef}>
        <h1 className="main-title">Conheça a Biodiversidade do PNMMT</h1>
        <div className="content-section" style={{ display: "flex", gap: "2em" }}>
          <div className="text-column">
            <p>
              A Mata Atlântica, uma das florestas mais biodiversas do mundo, estende-se ao longo da costa do Brasil, abrigando uma grande variedade de espécies vegetais e animais, muitas das quais são endêmicas. Considerada como um <strong>hotspot da biodiversidade</strong>, o bioma é uma das florestas tropicais com maior diversidade de espécies e também uma das mais ameaçadas do planeta. Apesar de sua importância, a Mata Atlântica enfrenta sérias ameaças devido à ação humana, como desmatamento, fragmentação e degradação dos ecossistemas.
            </p>
            <p>
              Nesse contexto, os municípios desempenham um <strong>papel crucial</strong> na preservação desse bioma, especialmente na proteção da fauna. A criação de <strong>unidades de conservação municipais</strong> é uma estratégia eficaz para proteger habitats naturais e promover a coexistência harmoniosa entre comunidades humanas e animais silvestres. Ao estabelecer áreas protegidas, os municípios contribuem diretamente para a conservação de espécies ameaçadas, preservando corredores ecológicos e conectando fragmentos florestais.
            </p>
            <h3 className="section-subtitle">Mamíferos do Parque</h3>
            <ul className="species-list">
              <li><strong>Sagui-da-serra</strong> (<em>Callithrix aurita</em>)</li>
              <li><strong>Tatu-galinha</strong> (<em>Dasypus novemcinctus</em>)</li>
              <li><strong>Cachorro-do-mato</strong> (<em>Cerdocyon thous</em>)</li>
              <li><strong>Gato-do-mato-pequeno</strong> (<em>Leopardus guttulus</em>)</li>
              <li><strong>Suçuarana</strong> (<em>Puma concolor</em>)</li>
            </ul>
            <h3 className="section-subtitle">Anfíbios e Répteis</h3>
            <ul className="species-list">
              <li><strong>Rã-de-corredeira</strong> (<em>Hylodes phyllodes</em>)</li>
              <li><strong>Cágado pescoço-de-cobra</strong> (<em>Hydromedusa tectifera</em>)</li>
            </ul>
            <h3 className="section-subtitle">Paraíso das Aves</h3>
            <ul className="species-list">
              <li><strong>Tucano-de-bico-preto</strong> (<em>Ramphastos vitellinus</em>)</li>
              <li><strong>Saudade</strong> (<em>Lipaugus ater</em>)</li>
              <li><strong>Araponga</strong> (<em>Procnias nudicollis</em>)</li>
              <li><strong>Tangará</strong> (<em>Chiroxiphia caudata</em>)</li>
            </ul>
            <p className="conclusion">
              O <strong>Parque Natural Municipal Montanhas de Teresópolis</strong> é mais que uma unidade de conservação - é um convite para conexão com a natureza, reforçando a importância da preservação desses ecossistemas para as futuras gerações.
            </p>
          </div>
          <div className="image-column">
            <div className="figure-container">
              <img src="https://www.teresopolis.rj.gov.br/wp-content/uploads/2024/05/IMG_5432-2048x1365.jpg"
                   alt="Vista da Mata Atlântica no PNMMT" className="figure-image" />
              <p className="figure-caption">Panorama da floresta</p>
            </div>
            <div className="figure-container">
              <img src="https://www.teresopolis.rj.gov.br/wp-content/uploads/2024/05/WhatsApp-Image-2023-06-29-at-10.03.50.jpeg"
                   alt="Fauna do PNMMT" className="figure-image" />
              <p className="figure-caption">Espécies de mamíferos</p>
            </div>
            <div className="figure-container">
              <img src="https://www.teresopolis.rj.gov.br/wp-content/uploads/2024/05/montanhas-Aracari-Banana-Pteroglossus-bailloni-2048x1365.jpg"
                   alt="Aves do PNMMT" className="figure-image" />
              <p className="figure-caption">Avifauna diversificada</p>
            </div>
          </div>
        </div>
        <div style={{margin: "36px 0 16px 0", textAlign: "center"}}>
          <button
            onClick={handleBackToTop}
            style={{
              background: "#f1f5f3",
              color: "#207c4d",
              border: "1px solid #c1d0c7",
              borderRadius: 6,
              padding: "7px 18px",
              fontWeight: 500,
              fontSize: "1em",
              cursor: "pointer",
              boxShadow: "0 1px 6px #e6efeb44"
            }}
          >
            ↑ Escolher outro parque
          </button>
        </div>
      </div>

      {/* BLOCO PETP */}
      <div ref={petpRef}>
        <h1 className="main-title">Conheça a Biodiversidade do PETP</h1>
        <div className="content-section" style={{ display: "flex", gap: "2em" }}>
          <div className="text-column">
            <p>
              O Parque Estadual dos Três Picos (PETP), criado em 2002 e ampliado em 2009, é a maior unidade de conservação de proteção integral do estado do Rio de Janeiro, com cerca de 65 mil hectares. Localizado entre os municípios de Teresópolis, Nova Friburgo, Cachoeiras de Macacu, Silva Jardim e Guapimirim, o parque protege os maiores remanescentes de Mata Atlântica contínua do estado.
            </p>
            <p>
              Essa vasta área abriga uma impressionante biodiversidade, com centenas de espécies de fauna e flora, muitas delas ameaçadas de extinção ou endêmicas da região. O relevo acidentado, com altitudes que vão de 100 a 2.366 metros, favorece a presença de diferentes ecossistemas, como florestas de encosta, matas de altitude e campos rupestres. O parque é fundamental para a conservação da biodiversidade fluminense, atuando também como um importante reservatório de água para diversas bacias hidrográficas.
            </p>
            <h3 className="section-subtitle">Mamíferos do Parque</h3>
            <ul className="species-list">
              <li><strong>Suçuarana</strong> (<em>Puma concolor</em>)</li>
              <li><strong>Jaguatirica</strong> (<em>Leopardus pardalis</em>)</li>
              <li><strong>Gato-maracajá</strong> (<em>Leopardus wiedii</em>)</li>
              <li><strong>Tatu-galinha</strong> (<em>Dasypus novemcinctus</em>)</li>
              <li><strong>Cachorro-do-mato</strong> (<em>Cerdocyon thous</em>)</li>
              <li><strong>Cutia</strong> (<em>Dasyprocta leporina</em>)</li>
              <li><strong>Ouriço-caixeiro</strong> (<em>Coendou prehensilis</em>)</li>
              <li><strong>Muriqui</strong> (<em>Brachyteles arachnoides</em>)</li>
            </ul>
            <h3 className="section-subtitle">Anfíbios e Répteis</h3>
            <ul className="species-list">
              <li><strong>Perereca-de-folhagem</strong> (<em>Phasmahyla spp.</em>)</li>
              <li><strong>Rã-de-corredeira</strong> (<em>Hylodes spp.</em>)</li>
              <li><strong>Jararaca</strong> (<em>Bothrops jararaca</em>)</li>
              <li><strong>Lagarto-preguiça</strong> (<em>Enyalius perditus</em>)</li>
              <li><strong>Cobra-cipó</strong> (<em>Oxybelis fulgidus</em>)</li>
              <li><strong>Cágado pescoço-de-cobra</strong> (<em>Hydromedusa tectifera</em>)</li>
            </ul>
            <h3 className="section-subtitle">Paraíso das Aves</h3>
            <ul className="species-list">
              <li><strong>Saudade-de-asa-cinza</strong> (<em>Lipaugus conditus</em>)</li>
              <li><strong>Araponga</strong> (<em>Procnias nudicollis</em>)</li>
              <li><strong>Gavião-pega-macaco</strong> (<em>Spizaetus tyrannus</em>)</li>
              <li><strong>Tangará</strong> (<em>Chiroxiphia caudata</em>)</li>
              <li><strong>Tiê-sangue</strong> (<em>Ramphocelus bresilius</em>)</li>
              <li><strong>Beija-flor-de-fronte-violeta</strong> (<em>Thalurania glaucopis</em>)</li>
            </ul>
            <p className="conclusion">
              O <strong>Parque Estadual dos Três Picos</strong> é mais que uma unidade de conservação — é um verdadeiro refúgio de vida silvestre, responsável por manter vivos os corredores ecológicos da Serra do Mar. A preservação deste território é essencial para o equilíbrio dos ecossistemas e para garantir que futuras gerações possam admirar e aprender com a riqueza natural da Mata Atlântica.
            </p>
          </div>
          <div className="image-column">
            <div className="figure-container">
              <img src="https://123ecos.com.br/wp-content/uploads/2024/12/do-Parque-Estadual-dos-Tres-Picos-1-1.jpg"
                   alt="Três Picos" className="figure-image" />
              <p className="figure-caption">Parque Estadual dos Três Picos</p>
            </div>
            <div className="figure-container">
              <img src="https://curiosidadeanimalbrasil.wordpress.com/wp-content/uploads/2016/03/muriqui-do-sul_robson-hack.jpg"
                   alt="Muriqui no PETP" className="figure-image" />
              <p className="figure-caption">Muriqui, maior primata das Américas</p>
            </div>
            <div className="figure-container">
              <img src="https://amoaves.com.br/wp-content/uploads/2021/04/26082020-TANGARA-1SOI-07-26AG2020.jpg"
                   alt="Tangará no PETP" className="figure-image" />
              <p className="figure-caption">Tangará, ave símbolo da Mata Atlântica</p>
            </div>
          </div>
        </div>
        <div style={{margin: "36px 0 16px 0", textAlign: "center"}}>
          <button
            onClick={handleBackToTop}
            style={{
              background: "#f1f5f3",
              color: "#207c4d",
              border: "1px solid #c1d0c7",
              borderRadius: 6,
              padding: "7px 18px",
              fontWeight: 500,
              fontSize: "1em",
              cursor: "pointer",
              boxShadow: "0 1px 6px #e6efeb44"
            }}
          >
            ↑ Escolher outro parque
          </button>
        </div>
      </div>

      {/* LISTA DOS DADOS DO BACKEND*/}
      <div style={{ padding: "32px 0" }}>
        {Object.entries(especiesFiltradas).map(([parque, especies], idx) => {
          // Se for filtro "outros", coloca ref no primeiro bloco encontrado
          const refProp =
            filterSelect === "outros" && customFilter && parque === firstFilteredParque
              ? { ref: outrosRef }
              : {};
          return (
            <div key={parque} {...refProp} style={{ marginBottom: 48 }}>
              <h1 className="main-title" style={{ fontSize: "2em", marginBottom: 16 }}>{parque}</h1>
              <div className="content-section" style={{ display: "flex", flexWrap: "wrap", gap: "2.5em" }}>
                {especies.length === 0 && (
                  <p style={{ color: "#888" }}>Nenhum registro cadastrado.</p>
                )}
                {especies.map(bio => (
                  <BioCard key={bio.id} bio={bio} />
                ))}
              </div>
            </div>
          );
        })}
        <div style={{margin: "36px 0 16px 0", textAlign: "center"}}>
          <button
            onClick={handleBackToTop}
            style={{
              background: "#f1f5f3",
              color: "#207c4d",
              border: "1px solid #c1d0c7",
              borderRadius: 6,
              padding: "7px 18px",
              fontWeight: 500,
              fontSize: "1em",
              cursor: "pointer",
              boxShadow: "0 1px 6px #e6efeb44"
            }}
          >
            ↑ Escolher outro parque
          </button>
        </div>
      </div>
    </div>
  );
}