import React, { useState } from "react";

// Função auxiliar para campos de array dinâmico
function ListInput({ label, value = [""], onChange }) {
  const handleChange = (i, newVal) => {
    const copy = [...value];
    copy[i] = newVal;
    onChange(copy);
  };
  const handleAdd = () => onChange([...value, ""]);
  const handleRemove = idx => onChange(value.filter((_, i) => i !== idx));

  return (
    <div style={{ marginBottom: 14 }}>
      <label className="event-label" style={{ fontWeight: 600 }}>{label}</label>
      {value.map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
          <input
            className="event-input"
            value={item}
            onChange={e => handleChange(i, e.target.value)}
            style={{ flex: 1, marginRight: 6 }}
            placeholder={`${label} ${i + 1}`}
          />
          {value.length > 1 && (
            <button type="button" className="button-cancel" style={{ fontSize: 18, lineHeight: 1, padding: "0 8px" }} onClick={() => handleRemove(i)}>
              ×
            </button>
          )}
        </div>
      ))}
      <button type="button" className="button-outline" style={{ marginTop: 2, fontSize: 13, padding: "1px 12px" }} onClick={handleAdd}>
        + Adicionar {label.slice(0, -1)}
      </button>
    </div>
  );
}

const PARQUE_OPTIONS = [
  { value: "parnaso", label: "PARNASO" },
  { value: "pnmmt", label: "PNMMT" },
  { value: "petp", label: "PETP" },
  { value: "outros", label: "Outros (digite o nome)" }
];

export default function BiodiversityForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(
    initial || {
      parque: "",
      parqueOutro: "",
      descricao: "",
      imagem: "",
      mamiferos: [""],
      anfibios: [""],
      aves: [""],
      conclusao: ""
    }
  );

  const isOutro = form.parque === "outros";

  const handleChange = e =>
    setForm(f => ({
      ...f,
      [e.target.name]: e.target.value,
      ...(e.target.name === "parque" && e.target.value !== "outros" ? { parqueOutro: "" } : {})
    }));

  const handleListChange = (field, val) =>
    setForm(f => ({ ...f, [field]: val }));

  const handleSubmit = e => {
    e.preventDefault();
    const finalParque = isOutro ? form.parqueOutro : form.parque;
    onSubmit({ ...form, parque: finalParque });
  };

  return (
    <form
      className="event-form"
      style={{
        maxWidth: 470,
        margin: "0 auto 2em auto",
        background: "rgba(255,255,255,0.88)",
        border: "1.7px solid #c8e6c9",
        borderRadius: 13,
        boxShadow: "0 4px 18px #d9e6d0b6",
        padding: "2em 1.4em 1em 1.4em"
      }}
      onSubmit={handleSubmit}
    >
      <label className="event-label">
        Parque
        <select
          className="event-input"
          name="parque"
          value={form.parque}
          onChange={handleChange}
          required
          style={{ marginBottom: isOutro ? 4 : 12 }}
        >
          <option value="" disabled>Escolha o parque</option>
          {PARQUE_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {isOutro && (
          <input
            className="event-input"
            name="parqueOutro"
            value={form.parqueOutro}
            onChange={handleChange}
            required
            placeholder="Digite o nome do parque"
            style={{ marginBottom: 12, marginTop: 8 }}
          />
        )}
      </label>

      <label className="event-label">
        Descrição
        <textarea
          className="event-input"
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
          rows={3}
          placeholder="Descrição geral"
          style={{ marginBottom: 12, resize: "vertical" }}
        />
      </label>

      <label className="event-label">
        URL da imagem
        <input
          className="event-input"
          name="imagem"
          value={form.imagem}
          onChange={handleChange}
          placeholder="Link da imagem"
          style={{ marginBottom: 12 }}
        />
      </label>

      <ListInput
        label="Mamíferos"
        value={form.mamiferos}
        onChange={v => handleListChange("mamiferos", v)}
      />
      <ListInput
        label="Anfíbios"
        value={form.anfibios}
        onChange={v => handleListChange("anfibios", v)}
      />
      <ListInput
        label="Aves"
        value={form.aves}
        onChange={v => handleListChange("aves", v)}
      />

      <label className="event-label">
        Conclusão / Observações
        <textarea
          className="event-input"
          name="conclusao"
          value={form.conclusao}
          onChange={handleChange}
          rows={2}
          placeholder="Observações finais"
          style={{ marginBottom: 12, resize: "vertical" }}
        />
      </label>

      <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 16 }}>
        <button type="button" className="button-cancel" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="button-outline">
          Salvar
        </button>
      </div>
    </form>
  );
}