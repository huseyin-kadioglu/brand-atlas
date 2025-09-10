import FAQ from "../Faq";

import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <>
      <footer>
        <p>
          🚧 Site şu anda bakım aşamasındadır. Kullanım sırasında küçük hatalar
          olabilir.
        </p>
        <nav className="footer-links">
          <Link to="/">Anasayfa</Link>
          <Link to="/about-us">Hakkında</Link>
          <Link to="/privacy">Gizlilik Politikası</Link>
          <Link to="/terms">Kullanım Şartları</Link>
          <Link to="/contact-us">İletişim</Link>
          <Link to="/faq">FAQ</Link>
        </nav>
      </footer>
    </>
  );
};
