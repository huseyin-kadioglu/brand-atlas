import { useState, useEffect } from "react";
import Papa from "papaparse";
import localBrands from "../data/localBrands";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/18BH8LXuxivmk-IRyu_-S-CRVHWMqGcKjnodM8Jc1JTE/gviz/tq?tqx=out:csv";

export function normalize(s) {
  return (s || "")
    .toString()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s.-]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function processRows(rows) {
  return rows
    .filter((b) => b.brand && b.company)
    .map((b) => ({
      ...b,
      mcapRank: Number(b.mcapRank) || null,
      employees: Number(b.employees) || null,
      founded: Number(b.founded) || null,
      _normBrand: normalize(b.brand),
      _normCompany: normalize(b.company),
    }));
}

export default function useBrandsData() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(SHEET_URL)
      .then((res) => res.text())
      .then((csvText) => {
        const sheetRows = Papa.parse(csvText, { header: true }).data;
        const sheetProcessed = processRows(sheetRows);

        // Yerel verilerden sheet'te olmayan markaları ekle
        const sheetBrandNames = new Set(
          sheetProcessed.map((b) => normalize(b.brand))
        );
        const localOnly = processRows(localBrands).filter(
          (b) => !sheetBrandNames.has(b._normBrand)
        );

        setBrands([...sheetProcessed, ...localOnly]);
      })
      .catch((err) => {
        console.error("Veri çekilirken hata:", err);
        // Sheet alınamazsa sadece yerel verilerle devam et
        setBrands(processRows(localBrands));
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { brands, loading, error };
}
