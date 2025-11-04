import ReactCountryFlag from "react-country-flag";

export default function BrandModal({ selected, onClose, onCompanyOpen }) {
  if (!selected) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <div className="modal-logo modal-logo-lg">
            <img
              src={selected.logo}
              alt={selected.brand}
              loading="lazy"
              decoding="async"
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
                onClick={() => onCompanyOpen(selected)}
              >
                {selected.company}
              </span>
            </p>
          </div>
        </div>

        <div className="modal-info">
          <p>📂 Category: {selected.category}</p>
        </div>

        <button className="modal-close" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
}
