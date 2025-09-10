import { useState, useMemo } from "react";
import BRANDS from "./brands.json";
import Input from "./Input";
import ReactCountryFlag from "react-country-flag";

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

export default function Content() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [companyModalOpen, setCompanyModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const results = useBrandSearch(query);

  const handleSelect = (item) => {
    setSelected(item);
    setModalOpen(true);
  };

  return (
    <div className="card">
      <header>
        <h1>
          Marka → Şirket <span className="beta-tag">BETA</span>
        </h1>
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
              <button key={r.brand + r.company} onClick={() => handleSelect(r)}>
                <div className="brand-name">{r.brand}</div>
                <div className="company-name">{r.company}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Marka Modal */}
      {modalOpen && selected && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <div className="modal-logo modal-logo-lg">
                <img
                  src={selected.logo}
                  alt={selected.brand}
                  onError={(e) =>
                    (e.currentTarget.src = "/logo/default-company.svg")
                  }
                />
              </div>
              <div className="modal-title">
                <h2>
                  <ReactCountryFlag
                    countryCode={selected.country}
                    svg
                    style={{ marginRight: "5px" }}
                  />
                  {selected.brand}
                </h2>
                <p>
                  Owned by{" "}
                  <span
                    className="company-link"
                    onClick={() => {
                      setCompanyModalOpen(true);
                      setSelectedCompany(selected);
                      setModalOpen(false);
                    }}
                  >
                    {selected.company}
                  </span>
                </p>
              </div>
            </div>

            <div className="modal-info">
              <p>📂 Category: {selected.category}</p>
            </div>

            <button className="modal-close" onClick={() => setModalOpen(false)}>
              ×
            </button>
          </div>
        </div>
      )}

      {/* Şirket Modal */}
      {companyModalOpen && selectedCompany && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-header">
              <div className="modal-logo modal-logo-lg">
                <img
                  src={selectedCompany.companyLogo || selectedCompany.logo}
                  alt={selectedCompany.company}
                  loading="lazy"
                  onError={(e) =>
                    (e.currentTarget.src = "/logo/default-company.svg")
                  }
                />
              </div>
              <div className="modal-title">
                <h2>
                  <ReactCountryFlag
                    countryCode={selectedCompany.country}
                    svg
                    style={{ marginRight: "5px" }}
                  />
                  {selectedCompany.company}
                </h2>
              </div>
            </div>

            <div className="modal-info">
              <p>📂 Category: {selectedCompany.category}</p>
            </div>

            <h3 className="section-title">Owned Brands</h3>
            <div className="owned-brands">
              {BRANDS.filter((b) => b.company === selectedCompany.company).map(
                (brand) => (
                  <div key={brand.brand} className="owned-brand-item">
                    <div className="owned-brand-logo">
                      <img
                        src={brand.logo}
                        alt={brand.brand}
                        loading="lazy"
                        onError={(e) =>
                          (e.currentTarget.src = "/logo/default-company.svg")
                        }
                      />
                    </div>
                    <p>{brand.brand}</p>
                  </div>
                )
              )}
            </div>

            <button
              className="modal-close"
              onClick={() => setCompanyModalOpen(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
