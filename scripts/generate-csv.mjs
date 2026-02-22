/**
 * localBrands.js → Google Sheets CSV
 * Çalıştır: node scripts/generate-csv.mjs
 * Çıktı: scripts/local-brands-export.csv
 */

import { writeFileSync } from "fs";
const COUNTRY_NAMES = {
  TR: "Türkiye", GB: "İngiltere", US: "Amerika", DE: "Almanya",
  FR: "Fransa",  NL: "Hollanda",  ES: "İspanya", IT: "İtalya",
  CH: "İsviçre", JP: "Japonya",   CN: "Çin",     KR: "Güney Kore",
  BR: "Brezilya",AE: "BAE",       QA: "Katar",   IL: "İsrail",
  SE: "İsveç",   DK: "Danimarka", FI: "Finlandiya", BE: "Belçika",
  HK: "Hong Kong", AZ: "Azerbaycan", CZ: "Çekya",
};

const COUNTRY_EMOJI = {
  TR:"🇹🇷", GB:"🇬🇧", US:"🇺🇸", DE:"🇩🇪", FR:"🇫🇷", NL:"🇳🇱",
  ES:"🇪🇸", IT:"🇮🇹", CH:"🇨🇭", JP:"🇯🇵", CN:"🇨🇳", KR:"🇰🇷",
  BR:"🇧🇷", AE:"🇦🇪", QA:"🇶🇦", IL:"🇮🇱", SE:"🇸🇪", DK:"🇩🇰",
  FI:"🇫🇮", BE:"🇧🇪", HK:"🇭🇰", AZ:"🇦🇿", CZ:"🇨🇿",
};

// localBrands.js verisini düz require ile çek
// (ES module uyumsuzluğu için eval ile parse ediyoruz)
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = readFileSync(join(__dirname, "../src/data/localBrands.js"), "utf8");

// JS değişken tanımını JSON'a çevir (basit eval)
const match = src.match(/const localBrands = (\[[\s\S]*?\]);\s*\nexport default/);
if (!match) {
  console.error("❌ localBrands array bulunamadı.");
  process.exit(1);
}

let localBrands;
try {
  localBrands = eval(match[1]);
} catch (e) {
  console.error("❌ Parse hatası:", e.message);
  process.exit(1);
}

const HEADERS = [
  "brand","company","uretici","notlar","country","countryCode",
  "countryEmoji","category","logo","companyLogo","mcapRank",
  "employees","founded","website"
];

function cell(val) {
  if (val === null || val === undefined) return "";
  const s = String(val);
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

const rows = localBrands.map((b) => {
  const code = b.countryCode || "";
  return [
    b.brand,
    b.company,
    b.company,
    b.notlar || "",
    COUNTRY_NAMES[code] || code,
    code,
    COUNTRY_EMOJI[code] || "",
    b.category || "",
    b.logo || "",
    b.companyLogo || "",
    "",
    b.employees || "",
    b.founded || "",
    b.website || "",
  ].map(cell).join(",");
});

const csv = [HEADERS.join(","), ...rows].join("\n");
const outPath = join(__dirname, "local-brands-export.csv");
writeFileSync(outPath, "\uFEFF" + csv, "utf8"); // BOM → Excel Türkçe uyumu

console.log(`✅ ${rows.length} satır → scripts/local-brands-export.csv`);
console.log("📋 Google Sheets → Dosya → İçe Aktar → CSV");
console.log("   veya son satırdan sonra yapıştır (header satırını atlayarak).");
