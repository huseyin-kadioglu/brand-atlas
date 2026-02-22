import { useState, useMemo, lazy, Suspense } from "react";
import ReactCountryFlag from "react-country-flag";
import useBrandsData from "../hooks/useBrandsData";
import { BrandLogo } from "./BrandModal";
import "./IsraelBrands.css";

const BrandModal = lazy(() => import("./BrandModal"));
const CompanyModal = lazy(() => import("./CompanyModal"));

function isIsraeliRelated(b) {
  if (b.countryCode === "IL" || b.country === "IL") return true;
  const note = (b.notlar || "").toLowerCase();
  return note.includes("israil") || note.includes("israel");
}

export default function IsraelBrands() {
  const { brands, loading } = useBrandsData();
  const [selected, setSelected] = useState(null);
  const [company, setCompany] = useState(null);

  const israelBrands = useMemo(
    () => brands.filter(isIsraeliRelated),
    [brands]
  );

  const groupedByCompany = useMemo(() => {
    const map = {};
    israelBrands.forEach((brand) => {
      const key = brand.company;
      if (!map[key]) map[key] = { companyData: brand, brands: [] };
      map[key].brands.push(brand);
    });
    return Object.values(map).sort((a, b) =>
      a.companyData.company.localeCompare(b.companyData.company)
    );
  }, [israelBrands]);

  if (loading)
    return (
      <div className="israel-loading">
        <p>Veriler yükleniyor...</p>
      </div>
    );

  return (
    <div className="israel-page">
      <header className="israel-header">
        <div className="israel-flag-title">
          <ReactCountryFlag
            countryCode="IL"
            svg
            style={{ fontSize: "2rem", verticalAlign: "middle" }}
          />
          <h1>İsrail Bağlantılı Markalar</h1>
        </div>
        <p className="israel-subtitle">
          İsrail menşeli veya İsrail sermayeli şirketlere ait markalar
        </p>
        {israelBrands.length > 0 && (
          <div className="israel-stats">
            <span>{israelBrands.length} marka</span>
            <span className="israel-stats-sep">•</span>
            <span>{groupedByCompany.length} şirket</span>
          </div>
        )}
      </header>

      {groupedByCompany.length === 0 ? (
        <div className="israel-empty">
          <ReactCountryFlag countryCode="IL" svg style={{ fontSize: "3rem" }} />
          <p>Henüz İsrail bağlantılı marka verisi eklenmemiş.</p>
          <p>
            <code>countryCode=IL</code> veya <code>notlar</code> alanına
            &quot;İsrail&quot; yazarak veri ekleyebilirsiniz.
          </p>
        </div>
      ) : (
        <div className="israel-companies">
          {groupedByCompany.map((group) => (
            <div key={group.companyData.company} className="israel-company-card">
              {/* Şirket başlığı */}
              <div
                className="israel-company-header"
                onClick={() => setCompany(group.companyData)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" && setCompany(group.companyData)
                }
              >
                <BrandLogo
                  src={group.companyData.companyLogo || group.companyData.logo}
                  name={group.companyData.company}
                  size="sm"
                />
                <div className="israel-company-info">
                  <h2>{group.companyData.company}</h2>
                  <ReactCountryFlag
                    countryCode={
                      group.companyData.countryCode ||
                      group.companyData.country ||
                      "IL"
                    }
                    svg
                    style={{ marginLeft: "6px", verticalAlign: "middle" }}
                  />
                </div>
                <span className="israel-company-count">
                  {group.brands.length} marka
                </span>
              </div>

              {/* Markalar */}
              <div className="israel-brands-grid">
                {group.brands.map((brand) => (
                  <div
                    key={brand.brand}
                    className="israel-brand-item"
                    onClick={() => setSelected(brand)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && setSelected(brand)}
                    title={brand.notlar || brand.brand}
                  >
                    <BrandLogo src={brand.logo} name={brand.brand} size="sm" />
                    <span>{brand.brand}</span>
                    {brand.notlar && (
                      <span className="israel-brand-note-dot" aria-hidden="true" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
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
