import { useEffect, useState, useMemo } from "react";
import BRANDS from "./brands.json";
import Input from "./Input";
import "./App.css";

function normalize(s) {
  return (s || "")
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9ığüşöçâîû\s.-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function scoreMatch(query, candidate) {
  const q = normalize(query);
  const c = normalize(candidate);
  if (!q || !c) return 0;
  if (c === q) return 100;
  if (c.startsWith(q)) return 80;
  if (c.includes(q)) return 60;
  const qTokens = q.split(" ");
  const cTokens = new Set(c.split(" "));
  const overlap = qTokens.filter((t) => cTokens.has(t)).length;
  return overlap > 0 ? 40 + overlap * 5 : 0;
}

function useBrandSearch(query) {
  return useMemo(() => {
    const q = normalize(query);
    if (!q) return [];
    return BRANDS.map((item) => ({
      item,
      score: Math.max(scoreMatch(q, item.brand), scoreMatch(q, item.company)),
    }))
      .filter((x) => x.score > 0)
      .sort(
        (a, b) => b.score - a.score || a.item.brand.localeCompare(b.item.brand)
      )
      .slice(0, 8)
      .map((x) => x.item);
  }, [query]);
}
export default function App() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const results = useBrandSearch(query);

  // Modal açma
  const handleSelect = (item) => {
    setSelected(item);
    setModalOpen(true);
  };

  return (
    <div className="app">
      <div className="card">
        <header>
          <h1>Marka → Şirket</h1>
          <p>Tek input. Yaz, öğren. ✨</p>
        </header>

        <div className="input-container">
          <Input
            placeholder="Örn: Lexus, Omo, LC Waikiki, Galaxy…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && results.length > 0 && (
            <div className="suggestions">
              {results.map((r) => (
                <button
                  key={r.brand + r.company}
                  onClick={() => handleSelect(r)}
                >
                  <div className="brand-name">{r.brand}</div>
                  <div className="company-name">{r.company}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer>
          <p>
            Not: Bu demo yerel bir veri kümesi ve basit bir fuzzy arama
            kullanır.
          </p>
          <p>Gerçek kullanımda bir API/DB kaynağına bağlayın.</p>
        </footer>
      </div>

      {/* Modal */}
      {modalOpen && selected && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{selected.brand}</h2>
              <p>{selected.company}</p>
              <p>
                {selected.countryEmoji} - {selected.countryCode}
              </p>
            </div>

            <div className="modal-info">
              <p>Category: {selected.category}</p>
              <p>MCAP Rank: #{selected.mcapRank}</p>
              <p>Employees: {selected.employees}</p>
              <p>Founded: {selected.founded}</p>
              <p>Website: {selected.website}</p>
            </div>

            <button className="modal-close" onClick={() => setModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
