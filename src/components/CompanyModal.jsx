import ReactCountryFlag from "react-country-flag";
import BRANDS from "./../brands.json";
import "./CompanyModal.css";

export default function CompanyModal({ company, onClose }) {
  if (!company) return null;

  const ownedBrands = BRANDS.filter((b) => b.company === company.company);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="modal-header">
          <div className="brand-logo">
            <img
              src={company.companyLogo || company.logo}
              alt={company.company}
              loading="lazy"
              onError={(e) => (e.currentTarget.src = "/logo/default-company.svg")}
            />
          </div>

          <div className="brand-header-text">
            <h2>
              {company.company}
              <ReactCountryFlag
                countryCode={company.country}
                svg
                style={{ marginLeft: "8px", verticalAlign: "middle" }}
              />
            </h2>
            {company.founded && (
              <p className="brand-company">
                Kuruluş: {company.founded}
              </p>
            )}
          </div>
        </div>

        <div className="modal-content">
          {company.description && (
            <p className="modal-row">🧾 {company.description}</p>
          )}
          {company.headquarters && (
            <p className="modal-row">🏢 Merkez: {company.headquarters}</p>
          )}
          {company.employees && (
            <p className="modal-row">👥 Çalışan: {company.employees.toLocaleString()}</p>
          )}
          {company.website && (
            <p className="modal-row">
              🌐{" "}
              <a href={company.website} target="_blank" rel="noreferrer">
                {company.website.replace(/^https?:\/\//, "")}
              </a>
            </p>
          )}
        </div>

        {ownedBrands.length > 0 && (
          <>
            <h3 className="section-title">Sahip Olduğu Markalar</h3>
            <div className="owned-brands">
              {ownedBrands.map((brand) => (
                <div key={brand.brand} className="owned-brand-item">
                  <div className="owned-brand-logo">
                    <img
                      src={brand.logo}
                      alt={brand.brand}
                      onError={(e) =>
                        (e.currentTarget.src = "/logo/default-company.svg")
                      }
                    />
                  </div>
                  <p>{brand.brand}</p>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="modal-footer">
          <p>
            <small>
              Veriler son güncelleme: <strong>Kasım 2025</strong>
            </small>
          </p>
        </div>
      </div>
    </div>
  );
}
