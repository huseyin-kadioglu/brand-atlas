import "./App.css";
import Content from "./Content";
import About from "./components/About";
import { Footer } from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfUse from "./components/TermsOfUse";
import Contact from "./components/Contact";
import FAQ from "./Faq";

// Statik sayfalar

export default function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
        <Footer />
      </>
    </Router>
  );
}
