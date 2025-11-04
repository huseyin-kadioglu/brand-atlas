import ReactCountryFlag from "react-country-flag";
import BRANDS from "./../brands.json";

export default function CompanyModal({ company, onClose }) {
  if (!company) return null;
  const ownedBrands = BRANDS.filter(
    (b) => b.company === company.company
  );

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <div className="modal-logo modal-logo-lg">
            <img
              src={company.companyLogo || company.logo}
              alt={company.company}
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
                countryCode={company.country}
                svg
                style={{ marginRight: "5px" }}
              />
              {company.company}
            </h2>
          </div>
        </div>

        <div className="modal-info">
          <p>📂 Category: {company.category}</p>
        </div>

        <h3 className="section-title">Owned Brands</h3>
        <div className="owned-brands">
          {ownedBrands.map((brand) => (
            <div key={brand.brand} className="owned-brand-item">
              <div className="owned-brand-logo">
                <img
                  src={brand.logo}
                  alt={brand.brand}
                  loading="lazy"
                  decoding="async"
                  onError={(e) =>
                    (e.currentTarget.src = "/logo/default-company.svg")
                  }
                />
              </div>
              <p>{brand.brand}</p>
            </div>
          ))}
        </div>

        <button className="modal-close" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
}
