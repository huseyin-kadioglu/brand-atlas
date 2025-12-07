import { useMemo } from "react";
import ReactCountryFlag from "react-country-flag";
import "./BrandModal.css";

export default function BrandModal({ selected, brands, onClose, onCompanyOpen }) {
  if (!selected) return null;

  // Zinciri Hesaplayan Mantık
  const ownershipChain = useMemo(() => {
    if (!brands || brands.length === 0) return [selected];

    const chain = [selected];
    let current = selected;
    let safety = 0; // Sonsuz döngü koruması

    // Max 6 seviye yukarı çıkar
    while (current && current.company && safety < 6) {
      const parentName = current.company;

      // Mevcut markanın Company ismini, tüm listedeki Brand isimlerinde ara
      // Normalizasyon yaparak eşleştirme (büyük/küçük harf, boşluk vb.)
      const parentObj = brands.find(
        (b) => 
          b._normBrand === current._normCompany || // Content.js'de _normCompany yapmıştık, onu kullanabiliriz
          b.brand.toLowerCase().trim() === parentName.toLowerCase().trim()
      );

      // Eğer üst şirket bulunduysa ve kendisi değilse zincire ekle
      if (parentObj && parentObj.brand !== current.brand) {
        chain.push(parentObj);
        current = parentObj;
      } else {
        // Eğer veritabanında üst şirket "Brand" olarak kayıtlı değilse döngü biter.
        // Ama zincirin son halkası olarak sadece ismini biliyoruzdur.
        break;
      }
      safety++;
    }
    return chain;
  }, [selected, brands]);

  const ultimateOwner = ownershipChain[ownershipChain.length - 1];

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
            {/* Eğer zincirde birden fazla eleman varsa 'Üretici' yerine 'Bağlı Olduğu' yazabiliriz */}
            <p className="brand-company">
              {ownershipChain.length > 1 ? "Üst Kuruluş: " : "Üretici: "}
              <span
                className="company-link"
                onClick={() => onCompanyOpen(ultimateOwner.company ? ultimateOwner : selected)} 
              >
                {selected.company}
              </span>
            </p>
          </div>
        </div>

        {/* --- YENİ BÖLÜM: SAHİPLİK ZİNCİRİ GÖRSELİ --- */}
        {ownershipChain.length > 1 && (
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
                      <img 
                        src={item.logo} 
                        alt={item.brand} 
                        onError={(e) => (e.currentTarget.src = "/logo/default-company.svg")}
                      />
                      <div className="chain-info">
                        <span className="chain-name">{item.brand}</span>
                        {isLast && <span className="ultimate-tag">NİHAİ SAHİP</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {/* --------------------------------------------- */}

        <div className="modal-content">
          {selected.description && (
            <p className="modal-row">🧾 {selected.description}</p>
          )}
          {selected.category && (
            <p className="modal-row">📂 Kategori: {selected.category}</p>
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