export default function Contact() {
  return (
    <div className="page">
      <h1>İletişim</h1>
      <p className="page-subtitle">
        Sorularınız, önerileriniz veya hata bildirimleriniz için aşağıdaki
        kanaldan bize ulaşabilirsiniz.
      </p>

      <div className="contact-card">
        <p>
          <strong>E-posta</strong>
        </p>
        <p>
          <a href="mailto:huseyinavnikadioglu@gmail.com">
            huseyinavnikadioglu@gmail.com
          </a>
        </p>
      </div>

      <h2>Ne için yazabilirsiniz?</h2>
      <ul>
        <li>Yanlış veya eksik marka / şirket bilgisi bildirimi</li>
        <li>Yeni marka veya şirket ekleme talebi</li>
        <li>Teknik sorun bildirimi</li>
        <li>İş birliği ve öneri</li>
      </ul>

      <p>
        E-postalara genellikle birkaç gün içinde dönülmektedir.
      </p>
    </div>
  );
}
