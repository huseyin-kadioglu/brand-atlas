import { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { BrandLogo, avatarColor } from "./BrandModal";
import "./BrandModal.css";
import "./CompanyModal.css";

function OwnedBrandCard({ brand, onClick }) {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="owned-brand-card" onClick={() => onClick(brand)}>
      {brand.logo && !imgError ? (
        <img
          src={brand.logo}
          alt={brand.brand}
          onError={() => setImgError(true)}
          loading="lazy"
        />
      ) : (
        <div
          className="ob-avatar"
          style={{ background: avatarColor(brand.brand) }}
        >
          {brand.brand[0].toUpperCase()}
        </div>
      )}
      <span className="ob-name" title={brand.brand}>
        {brand.brand}
      </span>
    </div>
  );
}

export default function CompanyModal({ company, brands, onClose, onBrandOpen }) {
  if (!company) return null;

  const ownedBrands = (brands || []).filter(
    (b) => b.company === company.company
  );

  const handleBrandClick = (brand) => {
    if (onBrandOpen) {
      onBrandOpen(brand);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal modal-company"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>×</button>

        {/* Header */}
        <div className="modal-header">
          <div className="brand-logo">
            <BrandLogo
              src={company.companyLogo || company.logo}
              name={company.company}
              size="lg"
            />
          </div>
          <div className="brand-header-text">
            <h2>
              {company.company}
              {(company.countryCode || company.country) && (
                <ReactCountryFlag
                  countryCode={company.countryCode || company.country}
                  svg
                  style={{ fontSize: "1rem", verticalAlign: "middle" }}
                />
              )}
            </h2>
            {ownedBrands.length > 0 && (
              <p className="brand-company">
                {ownedBrands.length} marka
              </p>
            )}
          </div>
        </div>

        {/* Stats */}
        {(company.founded || company.employees || company.website || company.headquarters) && (
          <div className="company-stats">
            {company.founded && (
              <span className="company-stat">📅 {company.founded}</span>
            )}
            {company.employees && (
              <span className="company-stat">
                👥 {Number(company.employees).toLocaleString("tr-TR")}
              </span>
            )}
            {company.headquarters && (
              <span className="company-stat">🏢 {company.headquarters}</span>
            )}
            {company.website && (
              <span className="company-stat">
                🌐{" "}
                <a href={company.website} target="_blank" rel="noreferrer">
                  {company.website.replace(/^https?:\/\/(www\.)?/, "")}
                </a>
              </span>
            )}
          </div>
        )}

        {/* Açıklama */}
        {company.description && (
          <div className="company-desc">{company.description}</div>
        )}

        {/* Markalar */}
        {ownedBrands.length > 0 && (
          <div className="owned-section">
            <p className="owned-section-title">
              Sahip Olduğu Markalar ({ownedBrands.length})
            </p>
            <div className="owned-brands-grid">
              {ownedBrands.map((brand) => (
                <OwnedBrandCard
                  key={brand.brand}
                  brand={brand}
                  onClick={handleBrandClick}
                />
              ))}
            </div>
          </div>
        )}

        <div className="modal-footer">
          <small>Veriler son güncelleme: <strong>Şubat 2026</strong></small>
        </div>
      </div>
    </div>
  );
}
