import { useState } from "react";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

const faqs = [
  { q: "Temu markası kimin?", a: "Temu, PDD Holdings'e ait, Çin menşeili bir firmadır." },
  { q: "Omo markası kimin?", a: "Omo, Unilever’e aittir." },
  { q: "LC Waikiki markası kimin?", a: "LC Waikiki, Tema Mağazacılık Hizmetleri A.Ş.’ye aittir." },
  // Türkiye'de popüler markalar
  { q: "Turkcell markası kimin?", a: "Turkcell, Türkiye merkezli bir GSM operatörüdür." },
  { q: "Arçelik markası kimin?", a: "Arçelik, Koç Holding’e aittir." },
  { q: "Vestel markası kimin?", a: "Vestel, Zorlu Holding’e aittir." }
];

  return (
    <div className="faq">
      <h2 className="faq-title">Sıkça Sorulan Sorular</h2>
      <div className="faq-list">
        {faqs.map((item, index) => (
          <div key={index} className="faq-item">
            <button
              className="faq-question"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span>{item.q}</span>
              <span className="faq-toggle">{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <div className="faq-answer">{item.a}</div>
            )}
          </div>
        ))}
      </div>

      {/* SEO için JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(f => ({
              "@type": "Question",
              "name": f.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": f.a
              }
            }))
          })
        }}
      />
    </div>
  );
}

export default FAQ;
