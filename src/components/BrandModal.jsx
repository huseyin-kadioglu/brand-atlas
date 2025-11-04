import ReactCountryFlag from "react-country-flag";
import "./BrandModal.css";

export default function BrandModal({ selected, onClose, onCompanyOpen }) {
  if (!selected) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="modal-header">
          <div className="brand-logo">
            <img
              src={selected.logo}
              alt={selected.brand}
              loading="lazy"
              onError={(e) => (e.currentTarget.src = "/logo/default-company.svg")}
            />
          </div>

          <div className="brand-header-text">
            <h2>
              {selected.brand}
              <ReactCountryFlag
                countryCode={selected.country}
                svg
                style={{ marginLeft: "8px", verticalAlign: "middle" }}
              />
            </h2>
            <p className="brand-company">
              Üretici:{" "}
              <span
                className="company-link"
                onClick={() => onCompanyOpen(selected)}
              >
                {selected.company}
              </span>
            </p>
          </div>
        </div>

        <div className="modal-content">
          {selected.description && (
            <p className="modal-row">🧾 {selected.description}</p>
          )}
          {selected.category && (
            <p className="modal-row">📂 Kategori: {selected.category}</p>
          )}
          {selected.parent && (
            <p className="modal-row">🏢 Ana şirket: {selected.parent}</p>
          )}
          {selected.website && (
            <p className="modal-row">
              🌐{" "}
              <a href={selected.website} target="_blank" rel="noreferrer">
                {selected.website.replace(/^https?:\/\//, "")}
              </a>
            </p>
          )}
        </div>

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
