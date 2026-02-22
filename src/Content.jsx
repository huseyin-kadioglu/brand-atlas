import { useState, useMemo, useEffect, lazy, Suspense } from "react";
import Input from "./Input";
import DevBadge from "./components/DevBadge";
import useBrandsData, { normalize } from "./hooks/useBrandsData";

const BrandModal = lazy(() => import("./components/BrandModal"));
const CompanyModal = lazy(() => import("./components/CompanyModal"));

const AVATAR_COLORS = ["#3b82f6","#8b5cf6","#ec4899","#f97316","#10b981","#14b8a6","#f59e0b","#6366f1"];
function avatarBg(name) {
  return AVATAR_COLORS[(name || "?").charCodeAt(0) % AVATAR_COLORS.length];
}
function SuggAvatar({ src, name }) {
  const [err, setErr] = useState(false);
  if (src && !err) {
    return (
      <img
        src={src}
        alt={name}
        className="sugg-logo"
        onError={() => setErr(true)}
      />
    );
  }
  return (
    <div className="sugg-avatar" style={{ background: avatarBg(name) }}>
      {(name || "?")[0].toUpperCase()}
    </div>
  );
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

function useBrandSearch(query, brands) {
  return useMemo(() => {
    const q = normalize(query);
    if (!q) return [];
    return brands
      .map((item) => ({
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
  }, [query, brands]);
}

export default function Content() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [company, setCompany] = useState(null);

  const debouncedQuery = useDebounce(query);
  const { brands, loading, error } = useBrandsData();
  const results = useBrandSearch(debouncedQuery, brands);

  const handleSelect = (item) => {
    setSelected(item);
    setCompany(null);
    setQuery(item.brand);
  };

  if (loading)
    return (
      <div className="card">
        <p>Veriler yükleniyor...</p>
      </div>
    );

  return (
    <div className="card">
      <header>
        <h1>
          Marka → Şirket <span className="beta-tag">BETA</span>
        </h1>
        <p>Yaz, öğren✨</p>
      </header>

      <div className="input-container">
        <Input
          placeholder="Örn: Whatsapp, Amazon, Apple"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

    {debouncedQuery && results.length > 0 && (
  <div className="suggestions">
    {results.map((r) => (
      <button key={r.brand + r.company} onClick={() => handleSelect(r)}>
        <div className="brand-info">
          <SuggAvatar src={r.logo} name={r.brand} />
          <div className="brand-name">{r.brand}</div>
        </div>
        <div className="company-details">
          <div className="company-name">{r.company}</div>
          <SuggAvatar src={r.companyLogo} name={r.company} />
        </div>
      </button>
    ))}
  </div>
)}
      </div>

      {error && (
        <p style={{ textAlign: "center", color: "#c07000", fontSize: "0.78rem", marginTop: "0.5rem" }}>
          Canlı veriye ulaşılamadı, yerel veri gösteriliyor.
        </p>
      )}
      <p style={{ textAlign: "center", color: "#777", fontSize: "0.8rem", marginTop: "0.5rem" }}>
        Yeni markalar eklenmeye devam ediyor. Hatalar olabilir 🙂
      </p>

      <Suspense fallback={null}>
        {selected && (
          <BrandModal
            selected={selected}
            brands={brands} /* <-- BURASI EKLENDİ: Tüm listeyi prop olarak gönderiyoruz */
            onClose={() => setSelected(null)}
            onCompanyOpen={(companyData) => {
              setSelected(null);
              setCompany(companyData);
            }}
          />
        )}
      </Suspense>

      <Suspense fallback={null}>
        {company && (
          <CompanyModal
            company={company}
            brands={brands}
            onClose={() => setCompany(null)}
            onBrandOpen={(brand) => {
              setCompany(null);
              setSelected(brand);
            }}
          />
        )}
      </Suspense>

      <DevBadge />
    </div>
  );
}