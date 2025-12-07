import { useState, useMemo, useEffect, lazy, Suspense } from "react";
import Input from "./Input";
import DevBadge from "./components/DevBadge";
import Papa from "papaparse";

const BrandModal = lazy(() => import("./components/BrandModal"));
const CompanyModal = lazy(() => import("./components/CompanyModal"));

// Normalize fonksiyonunu export edelim veya modal içinde tekrar tanımlayalım. 
// Şimdilik burada dursun, aşağıda logic içinde kullanacağız.
function normalize(s) {
  return (s || "")
    .toString()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s.-]/gu, "")
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

function useBrandsData() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const SHEET_URL =
      "https://docs.google.com/spreadsheets/d/18BH8LXuxivmk-IRyu_-S-CRVHWMqGcKjnodM8Jc1JTE/gviz/tq?tqx=out:csv";

    fetch(SHEET_URL)
      .then((res) => res.text())
      .then((csvText) => {
        const parsed = Papa.parse(csvText, { header: true }).data;
        const normalized = parsed
          .filter((b) => b.brand && b.company)
          .map((b) => ({
            ...b,
            mcapRank: Number(b.mcapRank) || null,
            employees: Number(b.employees) || null,
            founded: Number(b.founded) || null,
            _normBrand: normalize(b.brand),
            _normCompany: normalize(b.company),
          }));
        setBrands(normalized);
      })
      .catch((err) => {
        console.error("Veri çekilirken hata:", err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { brands, loading, error };
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

  if (error)
    return (
      <div className="card">
        <p>Veri alınamadı 😞</p>
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
        
        {/* SOL TARAF: Marka Adı */}
        <div className="brand-info">
          <div className="brand-name">{r.brand}</div>
        </div>

        {/* SAĞ TARAF: Şirket Adı ve Logosu */}
        <div className="company-details">
          <div className="company-name">{r.company}</div>
          
          {/* Şirket Logosunu (r.companyLogom) ekle */}
          {r.companyLogo && (
            <img 
              src={r.companyLogo} // Logo dosya yolu (Örn: /logo/volkswagen.svg)
              alt={`${r.company} Logo`}
              className="company-logo-small" // Boyutlandırma için CSS sınıfı
            />
          )}
        </div>
      </button>
    ))}
  </div>
)}
      </div>

      <p style={{ textAlign: "center", color: "#777", fontSize: "0.8rem", marginTop: "1rem" }}>
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
          />
        )}
      </Suspense>

      <DevBadge />
    </div>
  );
}