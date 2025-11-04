import { useState, useMemo, useEffect, lazy, Suspense } from "react";
import Input from "./Input";
import BRANDS_RAW from "./brands.json";
import DevBadge from "./components/DevBadge";

const BrandModal = lazy(() => import("./components/BrandModal"));
const CompanyModal = lazy(() => import("./components/CompanyModal"));

function normalize(s) {
  return (s || "")
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9ığüşöçâîû\s.-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function scoreMatch(query, candidate) {
  const q = query;
  const c = candidate;
  if (!q || !c) return 0;
  if (c === q) return 100;
  if (c.startsWith(q)) return 80;
  if (c.includes(q)) return 60;
  const qTokens = q.split(" ");
  const cTokens = new Set(c.split(" "));
  const overlap = qTokens.filter((t) => cTokens.has(t)).length;
  return overlap > 0 ? 40 + overlap * 5 : 0;
}

function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
}

// --- Veriyi normalize ederek bir kez hazırlıyoruz ---
const NORMALIZED_BRANDS = BRANDS_RAW.map((b) => ({
  ...b,
  _normBrand: normalize(b.brand),
  _normCompany: normalize(b.company),
}));

function useBrandSearch(query) {
  return useMemo(() => {
    const q = normalize(query);
    if (!q) return [];
    return NORMALIZED_BRANDS.map((item) => ({
      item,
      score: Math.max(
        scoreMatch(q, item._normBrand),
        scoreMatch(q, item._normCompany)
      ),
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
  const [company, setCompany] = useState(null);

  const debouncedQuery = useDebounce(query);
  const results = useBrandSearch(debouncedQuery);

  const handleSelect = (item) => {
    setSelected(item);
    setCompanyModalOpen(false); // olası çakışmayı önler
    setTimeout(() => setModalOpen(true), 0); // render sonrası açılmasını sağlar
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
        {debouncedQuery && results.length > 0 && (
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
      <Suspense fallback={null}>
        {selected && (
          <BrandModal
            selected={selected}
            onClose={() => setSelected(null)}
            onCompanyOpen={(companyData) => {
              setSelected(null);
              setCompany(companyData);
            }}
          />
        )}
      </Suspense>

      {/* Şirket Modal */}
      <Suspense fallback={null}>
        {company && (
          <CompanyModal company={company} onClose={() => setCompany(null)} />
        )}
      </Suspense>
      <DevBadge />
    </div>
  );
}
