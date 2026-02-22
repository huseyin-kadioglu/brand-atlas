import { useState, useMemo, lazy, Suspense } from "react";
import useBrandsData from "../hooks/useBrandsData";
import { BrandLogo } from "./BrandModal";
import "./CategoryBrands.css";

const BrandModal = lazy(() => import("./BrandModal"));
const CompanyModal = lazy(() => import("./CompanyModal"));

const CATEGORY_ICONS = {
  "Elektronik": "🖥️",
  "Telekomünikasyon": "📡",
  "Giyim": "👕",
  "Moda": "👗",
  "Gıda": "🍽️",
  "İçecek": "🥤",
  "Fast Food": "🍔",
  "Kahve & Cafe": "☕",
  "Süpermarket": "🛒",
  "Perakende": "🏪",
  "Bankacılık": "🏦",
  "Finans": "💳",
  "Otomotiv": "🚗",
  "E-Ticaret": "📦",
  "Teknoloji": "💻",
  "Sosyal Medya": "📱",
  "Dijital Medya": "🎬",
  "Mesajlaşma": "💬",
  "İlan Platformu": "📋",
  "Yemek Teslimatı": "🛵",
  "Havacılık": "✈️",
  "Enerji": "⚡",
  "Lojistik": "🚚",
  "Medya": "📰",
  "Sağlık": "💊",
  "İlaç": "🧬",
  "Kozmetik": "💄",
  "Yapı & Tasarım": "🏗️",
  "İnşaat": "🧱",
  "Ev & Yaşam": "🏠",
  "Holding": "🏢",
  "Siber Güvenlik": "🔒",
  "Oyun": "🎮",
  "Tıbbi Teknoloji": "🩺",
  "Kimya": "⚗️",
};

function getCategoryIcon(cat) {
  if (!cat) return "📌";
  for (const [key, icon] of Object.entries(CATEGORY_ICONS)) {
    if (cat.toLowerCase().includes(key.toLowerCase())) return icon;
  }
  return "📌";
}

export default function CategoryBrands() {
  const { brands, loading } = useBrandsData();
  const [activeCategory, setActiveCategory] = useState(null);
  const [selected, setSelected] = useState(null);
  const [company, setCompany] = useState(null);

  // Kategorileri ve marka sayılarını çıkar
  const categories = useMemo(() => {
    const map = {};
    brands.forEach((b) => {
      const cat = b.category || "Diğer";
      if (!map[cat]) map[cat] = 0;
      map[cat]++;
    });
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));
  }, [brands]);

  // Seçili kategorinin markaları
  const categoryBrands = useMemo(() => {
    if (!activeCategory) return [];
    return brands
      .filter((b) => (b.category || "Diğer") === activeCategory)
      .sort((a, b) => a.brand.localeCompare(b.brand, "tr"));
  }, [activeCategory, brands]);

  if (loading)
    return (
      <div className="cat-loading">
        <p>Veriler yükleniyor...</p>
      </div>
    );

  return (
    <div className="cat-page">
      <header className="cat-header">
        <h1>Sektörler</h1>
        <p className="cat-subtitle">
          {categories.length} sektör · {brands.length} marka
        </p>
      </header>

      {!activeCategory ? (
        /* Kategori Grid */
        <div className="cat-grid">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className="cat-card"
              onClick={() => setActiveCategory(cat.name)}
            >
              <span className="cat-icon">{getCategoryIcon(cat.name)}</span>
              <span className="cat-name">{cat.name}</span>
              <span className="cat-count">{cat.count}</span>
            </button>
          ))}
        </div>
      ) : (
        /* Seçili Kategori Markaları */
        <div className="cat-brands-view">
          <div className="cat-back-bar">
            <button
              className="cat-back-btn"
              onClick={() => setActiveCategory(null)}
            >
              ← Tüm Sektörler
            </button>
            <h2>
              {getCategoryIcon(activeCategory)} {activeCategory}
              <span className="cat-brands-count">{categoryBrands.length} marka</span>
            </h2>
          </div>

          <div className="cat-brands-grid">
            {categoryBrands.map((brand) => (
              <div
                key={brand.brand + brand.company}
                className="cat-brand-card"
                onClick={() => setSelected(brand)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setSelected(brand)}
              >
                <BrandLogo src={brand.logo} name={brand.brand} size="sm" />
                <div className="cat-brand-info">
                  <span className="cat-brand-name">{brand.brand}</span>
                  <span className="cat-brand-company">{brand.company}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Suspense fallback={null}>
        {selected && (
          <BrandModal
            selected={selected}
            brands={brands}
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
    </div>
  );
}
