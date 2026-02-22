export default function About() {
  return (
    <div className="page">
      <h1>Hakkında</h1>
      <p className="page-subtitle">markakimin.com.tr — Beta</p>

      <p>
        <strong>Marka Kimin?</strong>, merak ettiğiniz markaların hangi şirkete,
        hangi holdingin çatısı altına ait olduğunu hızlıca öğrenmenizi sağlayan
        bağımsız bir bilgi platformudur.
      </p>

      <h2>Ne Yapıyor?</h2>
      <ul>
        <li>
          Bir marka adı yazın — hangi şirketin ürünü olduğunu anında görün.
        </li>
        <li>
          Şirketler arasındaki sahiplik zincirini görselleştirin (örn. Beko →
          Arçelik → Koç Holding).
        </li>
        <li>
          Bir holding veya şirketin sahip olduğu tüm markaları listeleyin.
        </li>
        <li>
          Markaları ülke, kategori ve sahip şirket bazında keşfedin.
        </li>
      </ul>

      <h2>Neden?</h2>
      <p>
        Günümüzde pek çok ürün, aslında aynı birkaç büyük holding bünyesinde
        üretilmektedir. Bu bilgiye ulaşmak çoğu zaman zordur. Marka Kimin?,
        tüketici farkındalığını artırmak ve şeffaflığı desteklemek amacıyla
        bu bilgiyi herkes için kolayca erişilebilir hale getirmeyi hedefler.
      </p>

      <h2>Veri Kaynağı</h2>
      <p>
        Veriler, kamuya açık kaynaklardan (şirket web siteleri, resmi açıklamalar,
        ticaret sicil kayıtları) derlenerek düzenli aralıklarla güncellenmektedir.
        Hata veya eksik bulduğunuz bilgileri{" "}
        <a href="/contact-us">iletişim sayfasından</a> bizimle paylaşabilirsiniz.
      </p>

      <h2>Geliştirici</h2>
      <p>
        Bu proje, kişisel bir girişim olarak geliştirilmektedir. Geri bildirim,
        katkı ve önerileriniz için{" "}
        <a href="mailto:huseyinavnikadioglu@gmail.com">
          huseyinavnikadioglu@gmail.com
        </a>{" "}
        adresine yazabilirsiniz.
      </p>

      <hr className="page-divider" />
      <p style={{ fontSize: "0.8rem", color: "#555" }}>
        Sürüm: Beta &nbsp;·&nbsp; Son güncelleme: Şubat 2026
      </p>
    </div>
  );
}
