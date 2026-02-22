import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <>
      <footer>
        <nav className="footer-links">
          <Link to="/">Anasayfa</Link>
          <Link to="/kategoriler">Sektörler</Link>
          <Link to="/israil">İsrail Markaları</Link>
          <Link to="/about-us">Hakkında</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/contact-us">İletişim</Link>
          <Link to="/privacy">Gizlilik</Link>
          <Link to="/terms">Şartlar</Link>
        </nav>
      </footer>
    </>
  );
};
