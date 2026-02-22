import { useMemo, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import "./BrandModal.css";

/* Harf avatarı için deterministik renk */
const AVATAR_COLORS = [
  "#3b82f6", "#8b5cf6", "#ec4899", "#f97316",
  "#10b981", "#14b8a6", "#f59e0b", "#6366f1",
];
function avatarColor(name) {
  const code = (name || "?").charCodeAt(0);
  return AVATAR_COLORS[code % AVATAR_COLORS.length];
}

function BrandLogo({ src, name, size = "lg" }) {
  const [error, setError] = useState(false);
  const cls =
    size === "lg" ? "logo-avatar" : size === "sm" ? "logo-avatar-sm" : "logo-avatar-xs";

  const imgStyle =
    size === "lg"
      ? { width: 60, height: 60, objectFit: "contain", borderRadius: 12, background: "#fff", padding: 6, border: "1px solid rgba(255,255,255,0.1)", display: "block", flexShrink: 0 }
      : size === "sm"
      ? { width: 40, height: 40, objectFit: "contain", borderRadius: 8, background: "#fff", padding: 4, border: "1px solid rgba(255,255,255,0.1)", flexShrink: 0 }
      : { width: 20, height: 20, objectFit: "contain", borderRadius: 4, background: "#fff", padding: 1, flexShrink: 0 };

  if (src && !error) {
    return (
      <img
        src={src}
        alt={name}
        style={imgStyle}
        onError={() => setError(true)}
        loading="lazy"
      />
    );
  }
  return (
    <div className={cls} style={{ background: avatarColor(name) }}>
      {(name || "?")[0].toUpperCase()}
    </div>
  );
}

export { BrandLogo, avatarColor };

export default function BrandModal({ selected, brands, onClose, onCompanyOpen }) {
  if (!selected) return null;

  const ownershipChain = useMemo(() => {
    if (!brands || brands.length === 0) return [selected];
    const chain = [selected];
    let current = selected;
    let safety = 0;
    while (current && current.company && safety < 6) {
      const parentName = current.company;
      const parentObj = brands.find(
        (b) =>
          b._normBrand === current._normCompany ||
          b.brand.toLowerCase().trim() === parentName.toLowerCase().trim()
      );
      if (parentObj && parentObj.brand !== current.brand) {
        chain.push(parentObj);
        current = parentObj;
      } else {
        break;
      }
      safety++;
    }
    return chain;
  }, [selected, brands]);

  const ultimateOwner = ownershipChain[ownershipChain.length - 1];
  const hasChain = ownershipChain.length > 1;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        {/* Header */}
        <div className="modal-header">
          <div className="brand-logo">
            <BrandLogo src={selected.logo} name={selected.brand} size="lg" />
          </div>
          <div className="brand-header-text">
            <h2>
              {selected.brand}
              {(selected.countryCode || selected.country) && (
                <ReactCountryFlag
                  countryCode={selected.countryCode || selected.country}
                  svg
                  style={{ fontSize: "1rem", verticalAlign: "middle" }}
                />
              )}
            </h2>
            <p className="brand-company">
              {hasChain ? "Üst Kuruluş: " : "Üretici: "}
              <span
                className="company-link"
                onClick={() => onCompanyOpen(hasChain ? ultimateOwner : selected)}
              >
                {selected.company}
              </span>
            </p>
          </div>
        </div>

        {/* Chip bilgiler */}
        {(selected.category || selected.website || selected.founded) && (
          <div className="modal-chips">
            {selected.category && (
              <span className="modal-chip modal-chip-category">
                {selected.category}
              </span>
            )}
            {selected.founded && (
              <span className="modal-chip">📅 {selected.founded}</span>
            )}
            {selected.website && (
              <span className="modal-chip">
                🌐{" "}
                <a href={selected.website} target="_blank" rel="noreferrer">
                  {selected.website.replace(/^https?:\/\/(www\.)?/, "")}
                </a>
              </span>
            )}
          </div>
        )}

        {/* Açıklama */}
        {selected.description && (
          <div className="modal-desc">{selected.description}</div>
        )}

        {/* Notlar */}
        {selected.notlar && (
          <div className="modal-note">
            <span className="modal-note-icon">📌</span>
            {selected.notlar}
          </div>
        )}

        {/* Sahiplik Zinciri */}
        {hasChain && (
          <div className="chain-container">
            <h4 className="chain-title">Sahiplik Hiyerarşisi</h4>
            <div className="chain-list">
              {ownershipChain.map((item, index) => {
                const isLast = index === ownershipChain.length - 1;
                return (
                  <div key={index} className="chain-item">
                    {index > 0 && <div className="chain-arrow">↳</div>}
                    <div
                      className={`chain-box ${isLast ? "ultimate-owner" : ""}`}
                      onClick={() => onCompanyOpen(item)}
                    >
                      <BrandLogo src={item.logo} name={item.brand} size="xs" />
                      <div className="chain-info">
                        <span className="chain-name">{item.brand}</span>
                        {isLast && (
                          <span className="ultimate-tag">NİHAİ SAHİP</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
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
