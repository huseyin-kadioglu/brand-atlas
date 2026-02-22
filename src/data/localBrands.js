/**
 * Google Sheet'e henüz eklenmemiş veya tamamlayıcı yerel veri.
 * Sheet verisiyle birleştirilir; aynı marka adı sheet'te varsa sheet önceliklidir.
 *
 * Alan açıklamaları:
 *   brand       : marka adı
 *   company     : bağlı olduğu şirket / holding
 *   countryCode : ISO 2-harf ülke kodu (TR, US, IL …)
 *   category    : sektör
 *   logo        : /logo/<dosya>.svg  (public klasörü)
 *   companyLogo : üst şirketin logosu
 *   notlar      : açıklama notu (özellikle İsrail bağlantısı için)
 *   founded     : kuruluş yılı
 *   employees   : çalışan sayısı
 *   website     : web sitesi
 */

const localBrands = [

  /* ═══════════════════════════════════════════════════════
     HOLDİNGLER
  ═══════════════════════════════════════════════════════ */
  { brand: "Koç Holding",    company: "Koç Ailesi",    countryCode: "TR", category: "Holding", logo: "/logo/kocholding.svg",    website: "https://www.koc.com.tr",           founded: 1926, employees: 100000 },
  { brand: "Sabancı Holding",company: "Sabancı Ailesi",countryCode: "TR", category: "Holding", logo: "/logo/sabanci.svg",        website: "https://www.sabanci.com",          founded: 1967, employees: 60000  },
  { brand: "Yıldız Holding", company: "Ülker Ailesi",  countryCode: "TR", category: "Holding",                                   website: "https://www.yildizholding.com.tr", founded: 1944 },
  { brand: "Zorlu Holding",  company: "Zorlu Ailesi",  countryCode: "TR", category: "Holding", logo: "/logo/zorluholding.svg",   website: "https://www.zorlu.com.tr",         founded: 1953 },
  { brand: "Doğuş Holding",  company: "Doğuş Ailesi",  countryCode: "TR", category: "Holding",                                   website: "https://www.dogusgrubu.com.tr",    founded: 1951 },
  { brand: "Yaşar Holding",  company: "Yaşar Ailesi",  countryCode: "TR", category: "Holding",                                   website: "https://www.yasar.com.tr",         founded: 1945 },
  { brand: "Akkök Holding",  company: "Akkök Ailesi",  countryCode: "TR", category: "Holding",                                   website: "https://www.akkok.com.tr",         founded: 1971 },
  { brand: "Eczacıbaşı Holding", company: "Eczacıbaşı Ailesi", countryCode: "TR", category: "Holding", logo: "/logo/eczacibasiholding.svg", website: "https://www.eczacibasi.com.tr", founded: 1942 },

  /* ═══════════════════════════════════════════════════════
     TEKNOLOJİ & ELEKTRONİK
  ═══════════════════════════════════════════════════════ */
  { brand: "Arçelik",    company: "Koç Holding",   countryCode: "TR", category: "Elektronik", companyLogo: "/logo/kocholding.svg",  website: "https://www.arcelik.com.tr",  founded: 1955, employees: 40000 },
  { brand: "Beko",       company: "Arçelik",        countryCode: "TR", category: "Elektronik",                                       website: "https://www.beko.com.tr" },
  { brand: "Grundig",    company: "Arçelik",        countryCode: "DE", category: "Elektronik" },
  { brand: "Altus",      company: "Arçelik",        countryCode: "TR", category: "Elektronik" },
  { brand: "Blomberg",   company: "Arçelik",        countryCode: "TR", category: "Elektronik" },
  { brand: "Vestel",     company: "Zorlu Holding",  countryCode: "TR", category: "Elektronik", companyLogo: "/logo/zorluholding.svg", website: "https://www.vestel.com.tr",   founded: 1984, employees: 15000 },
  { brand: "Regal",      company: "Vestel",         countryCode: "TR", category: "Elektronik" },
  { brand: "Dijitsu",    company: "Vestel",         countryCode: "TR", category: "Elektronik" },
  { brand: "Telefunken", company: "Vestel",         countryCode: "DE", category: "Elektronik", notlar: "Alman menşeli marka, Vestel tarafından kullanım hakkı alınmıştır." },

  /* ═══════════════════════════════════════════════════════
     TELEKOMÜNİKASYON
  ═══════════════════════════════════════════════════════ */
  { brand: "Turkcell",     company: "Turkcell",      countryCode: "TR", category: "Telekomünikasyon", logo: "/logo/turkcell.svg",    website: "https://www.turkcell.com.tr",  founded: 1994, employees: 12000 },
  { brand: "Türk Telekom", company: "Türk Telekom",  countryCode: "TR", category: "Telekomünikasyon", logo: "/logo/turktelekom.svg", website: "https://www.turktelekom.com.tr",founded: 1995, employees: 35000 },
  { brand: "Vodafone TR",  company: "Vodafone Group",countryCode: "GB", category: "Telekomünikasyon",                                website: "https://www.vodafone.com.tr" },
  { brand: "Fizy",         company: "Turkcell",      countryCode: "TR", category: "Dijital Medya",    companyLogo: "/logo/turkcell.svg", website: "https://www.fizy.com",     founded: 2014 },

  /* ═══════════════════════════════════════════════════════
     GİYİM & MODA
  ═══════════════════════════════════════════════════════ */
  { brand: "LC Waikiki",   company: "LC Waikiki",    countryCode: "TR", category: "Giyim", website: "https://www.lcwaikiki.com",   founded: 1988, employees: 50000 },
  { brand: "Mavi",         company: "Mavi",          countryCode: "TR", category: "Giyim", website: "https://www.mavi.com",        founded: 1991, employees: 5000  },
  { brand: "Koton",        company: "Koton",         countryCode: "TR", category: "Giyim", website: "https://www.koton.com",       founded: 1988, employees: 12000 },
  { brand: "DeFacto",      company: "DeFacto",       countryCode: "TR", category: "Giyim", website: "https://www.defacto.com.tr",  founded: 2006, employees: 10000 },
  { brand: "İpekyol",      company: "İpekyol",       countryCode: "TR", category: "Giyim", website: "https://www.ipekyol.com.tr",  founded: 1987 },
  { brand: "Network",      company: "İpekyol",       countryCode: "TR", category: "Giyim" },
  { brand: "Vakko",        company: "Vakko",         countryCode: "TR", category: "Giyim", website: "https://www.vakko.com",       founded: 1934 },
  { brand: "Beymen",       company: "Akkök Holding", countryCode: "TR", category: "Giyim", website: "https://www.beymen.com",      founded: 1971 },
  { brand: "Sarar",        company: "Sarar",         countryCode: "TR", category: "Giyim", website: "https://www.sarar.com",       founded: 1944 },
  { brand: "Zara",         company: "Inditex",       countryCode: "ES", category: "Giyim", logo: "/logo/inditex.svg",              website: "https://www.zara.com", founded: 1975 },
  { brand: "Bershka",      company: "Inditex",       countryCode: "ES", category: "Giyim", companyLogo: "/logo/inditex.svg" },
  { brand: "Pull&Bear",    company: "Inditex",       countryCode: "ES", category: "Giyim", logo: "/logo/pullbear.svg", companyLogo: "/logo/inditex.svg" },
  { brand: "Massimo Dutti",company: "Inditex",       countryCode: "ES", category: "Giyim", logo: "/logo/massimodutti.svg", companyLogo: "/logo/inditex.svg" },
  { brand: "Oysho",        company: "Inditex",       countryCode: "ES", category: "Giyim", logo: "/logo/oysho.svg", companyLogo: "/logo/inditex.svg" },
  { brand: "Stradivarius", company: "Inditex",       countryCode: "ES", category: "Giyim", logo: "/logo/stradivarius.svg", companyLogo: "/logo/inditex.svg" },
  { brand: "Lefties",      company: "Inditex",       countryCode: "ES", category: "Giyim", logo: "/logo/lefties.svg", companyLogo: "/logo/inditex.svg" },
  { brand: "Nike",         company: "Nike",          countryCode: "US", category: "Giyim", website: "https://www.nike.com",        founded: 1964, employees: 79000 },
  { brand: "Adidas",       company: "Adidas",        countryCode: "DE", category: "Giyim", logo: "/logo/adidas.svg",               website: "https://www.adidas.com", founded: 1949, employees: 59000 },
  { brand: "Puma",         company: "Puma",          countryCode: "DE", category: "Giyim", logo: "/logo/puma.svg",                 website: "https://www.puma.com",   founded: 1948 },
  { brand: "Vans",         company: "VF Corporation",countryCode: "US", category: "Giyim", logo: "/logo/vans.svg",                 website: "https://www.vans.com" },
  { brand: "Lacoste",      company: "Lacoste",       countryCode: "FR", category: "Giyim", logo: "/logo/lacoste.svg",              website: "https://www.lacoste.com", founded: 1933 },
  { brand: "Calvin Klein", company: "PVH Corp",      countryCode: "US", category: "Giyim", logo: "/logo/calvinklein.svg" },
  { brand: "Diesel",       company: "OTB Group",     countryCode: "IT", category: "Giyim", logo: "/logo/diesel.svg",               website: "https://www.diesel.com", founded: 1978 },
  { brand: "Burberry",     company: "Burberry Group",countryCode: "GB", category: "Giyim", logo: "/logo/burberry.svg",             website: "https://www.burberry.com" },

  /* ═══════════════════════════════════════════════════════
     GIDA & İÇECEK
  ═══════════════════════════════════════════════════════ */
  { brand: "Ülker",        company: "Yıldız Holding",  countryCode: "TR", category: "Gıda",    website: "https://www.ulker.com.tr",      founded: 1944, employees: 20000 },
  { brand: "Godiva",       company: "Yıldız Holding",  countryCode: "BE", category: "Gıda",    website: "https://www.godiva.com",         founded: 1926 },
  { brand: "McVitie's",    company: "Yıldız Holding",  countryCode: "GB", category: "Gıda" },
  { brand: "ETi",          company: "ETi Bolu Çikolata",countryCode:"TR", category: "Gıda",    website: "https://www.etiboluciko.com.tr", founded: 1962, employees: 6000 },
  { brand: "Torku",        company: "Konya Şeker",     countryCode: "TR", category: "Gıda",    website: "https://www.torku.com.tr",       founded: 2010 },
  { brand: "Şölen",        company: "Şölen Çikolata",  countryCode: "TR", category: "Gıda",    website: "https://www.solen.com.tr",       founded: 1989, employees: 3000 },
  { brand: "Pınar",        company: "Yaşar Holding",   countryCode: "TR", category: "Gıda",    website: "https://www.pinar.com.tr",       founded: 1976, employees: 5000 },
  { brand: "SEK",          company: "Yaşar Holding",   countryCode: "TR", category: "Gıda" },
  { brand: "Dimes",        company: "Dimes",           countryCode: "TR", category: "İçecek",  website: "https://www.dimes.com.tr",       founded: 1958 },
  { brand: "Tat",          company: "Koç Holding",     countryCode: "TR", category: "Gıda",    companyLogo: "/logo/kocholding.svg",       website: "https://www.tatgida.com.tr",  founded: 1967 },
  { brand: "Sütaş",        company: "Sütaş",           countryCode: "TR", category: "Gıda",    website: "https://www.sutas.com.tr",       founded: 1985, employees: 7000 },
  { brand: "İçim",         company: "Sütaş",           countryCode: "TR", category: "Gıda" },
  { brand: "Banvit",       company: "BRF SA",           countryCode: "BR", category: "Gıda",    website: "https://www.banvit.com",         founded: 1968 },
  { brand: "Beypazarı",    company: "Beypazarı",       countryCode: "TR", category: "İçecek",  website: "https://www.beypazari.com.tr",   founded: 1904 },
  { brand: "Uludağ",       company: "Uludağ İçecek",   countryCode: "TR", category: "İçecek",  website: "https://www.uludag.com.tr",      founded: 1930 },
  { brand: "Doğadan",      company: "Doğadan",         countryCode: "TR", category: "İçecek",  website: "https://www.dogadan.com",        founded: 1984 },
  { brand: "Çaykur",       company: "Çaykur",          countryCode: "TR", category: "İçecek",  website: "https://www.caykur.gov.tr",      founded: 1971 },
  { brand: "McDonald's",   company: "McDonald's Corp", countryCode: "US", category: "Fast Food",logo: "/logo/mcdonalds.svg",              website: "https://www.mcdonalds.com.tr", founded: 1940, employees: 2000000 },
  { brand: "Burger King",  company: "Restaurant Brands International", countryCode: "US", category: "Fast Food", logo: "/logo/burgerking.svg", website: "https://www.burgerking.com.tr", founded: 1953 },
  { brand: "KFC",          company: "Yum! Brands",     countryCode: "US", category: "Fast Food",                                           website: "https://www.kfc.com",    founded: 1952 },
  { brand: "Domino's",     company: "Domino's Pizza",  countryCode: "US", category: "Fast Food",                                           website: "https://www.dominos.com.tr", founded: 1960 },
  { brand: "Subway",       company: "Subway",          countryCode: "US", category: "Fast Food",                                           website: "https://www.subway.com",  founded: 1965 },
  { brand: "Starbucks",    company: "Starbucks Corp",  countryCode: "US", category: "Kahve & Cafe", logo: "/logo/starbucks.svg",           website: "https://www.starbucks.com.tr", founded: 1971, employees: 400000 },
  { brand: "Kahve Dünyası",company: "Kahve Dünyası",   countryCode: "TR", category: "Kahve & Cafe",                                        website: "https://www.kahvedunyasi.com", founded: 2004 },
  { brand: "Coca-Cola",    company: "The Coca-Cola Company", countryCode: "US", category: "İçecek", logo: "/logo/cocacola.svg",            website: "https://www.coca-cola.com", founded: 1886 },
  { brand: "Fanta",        company: "The Coca-Cola Company", countryCode: "US", category: "İçecek", logo: "/logo/fanta.svg",              companyLogo: "/logo/cocacola.svg" },
  { brand: "Sprite",       company: "The Coca-Cola Company", countryCode: "US", category: "İçecek", logo: "/logo/sprite.svg",             companyLogo: "/logo/cocacola.svg" },
  { brand: "Schweppes",    company: "The Coca-Cola Company", countryCode: "US", category: "İçecek", logo: "/logo/schweppes.svg",          companyLogo: "/logo/cocacola.svg" },
  { brand: "Powerade",     company: "The Coca-Cola Company", countryCode: "US", category: "İçecek", logo: "/logo/powerade.svg",           companyLogo: "/logo/cocacola.svg" },

  /* ═══════════════════════════════════════════════════════
     MARKET & PERAKENDE
  ═══════════════════════════════════════════════════════ */
  { brand: "BİM",          company: "BİM Birleşik Mağazalar",  countryCode: "TR", category: "Süpermarket", website: "https://www.bim.com.tr",          founded: 1995, employees: 65000 },
  { brand: "A101",         company: "A101 Yeni Mağazacılık",   countryCode: "TR", category: "Süpermarket", website: "https://www.a101.com.tr",         founded: 2008, employees: 30000 },
  { brand: "Migros",       company: "Migros Ticaret",          countryCode: "TR", category: "Süpermarket", website: "https://www.migros.com.tr",        founded: 1954, employees: 25000 },
  { brand: "CarrefourSA",  company: "Carrefour SA",            countryCode: "FR", category: "Süpermarket", website: "https://www.carrefoursa.com",     founded: 1993 },
  { brand: "ŞOK",          company: "Yıldız Holding",          countryCode: "TR", category: "Süpermarket", website: "https://www.sokmarket.com.tr",     founded: 2011, employees: 30000 },
  { brand: "Teknosa",      company: "Sabancı Holding",         countryCode: "TR", category: "Perakende",   companyLogo: "/logo/sabanci.svg",            website: "https://www.teknosa.com", founded: 2000 },
  { brand: "MediaMarkt TR",company: "MediaMarkt Saturn",       countryCode: "DE", category: "Perakende",   website: "https://www.mediamarkt.com.tr" },
  { brand: "IKEA",         company: "Inter IKEA Group",        countryCode: "SE", category: "Ev & Yaşam",  website: "https://www.ikea.com.tr",          founded: 1943, employees: 220000 },
  { brand: "Gratis",       company: "Gratis",                  countryCode: "TR", category: "Kozmetik",    website: "https://www.gratis.com",           founded: 2000 },
  { brand: "Watsons TR",   company: "A.S. Watson Group",       countryCode: "HK", category: "Kozmetik",    website: "https://www.watsons.com.tr" },

  /* ═══════════════════════════════════════════════════════
     BANKACILIK & FİNANS
  ═══════════════════════════════════════════════════════ */
  { brand: "Ziraat Bankası", company: "Türkiye Cumhuriyeti", countryCode: "TR", category: "Bankacılık", website: "https://www.ziraatbank.com.tr", founded: 1863, employees: 30000 },
  { brand: "Halkbank",       company: "Türkiye Cumhuriyeti", countryCode: "TR", category: "Bankacılık", website: "https://www.halkbank.com.tr",   founded: 1938, employees: 20000 },
  { brand: "VakıfBank",      company: "Türkiye Cumhuriyeti", countryCode: "TR", category: "Bankacılık", website: "https://www.vakifbank.com.tr",  founded: 1954, employees: 22000 },
  { brand: "İş Bankası",     company: "İş Bankası",          countryCode: "TR", category: "Bankacılık", website: "https://www.isbank.com.tr",     founded: 1924, employees: 25000 },
  { brand: "Garanti BBVA",   company: "BBVA",                countryCode: "ES", category: "Bankacılık", website: "https://www.garantibbva.com.tr",founded: 1946, employees: 18000 },
  { brand: "Akbank",         company: "Sabancı Holding",     countryCode: "TR", category: "Bankacılık", companyLogo: "/logo/sabanci.svg", website: "https://www.akbank.com", founded: 1948, employees: 14000 },
  { brand: "Yapı Kredi",     company: "Koç Holding",         countryCode: "TR", category: "Bankacılık", companyLogo: "/logo/kocholding.svg", website: "https://www.yapikredi.com.tr", founded: 1944, employees: 15000 },
  { brand: "Denizbank",      company: "Emirates NBD",        countryCode: "AE", category: "Bankacılık", website: "https://www.denizbank.com",     founded: 1938, employees: 12000 },
  { brand: "QNB Finansbank", company: "QNB Group",           countryCode: "QA", category: "Bankacılık", website: "https://www.qnbfinansbank.com", founded: 1987, employees: 10000 },
  { brand: "TEB",            company: "BNP Paribas",         countryCode: "FR", category: "Bankacılık", website: "https://www.teb.com.tr",        founded: 1927 },
  { brand: "ING Bank TR",    company: "ING Group",           countryCode: "NL", category: "Bankacılık", website: "https://www.ing.com.tr" },

  /* ═══════════════════════════════════════════════════════
     OTOMOTİV
  ═══════════════════════════════════════════════════════ */
  { brand: "TOGG",         company: "TOGG",              countryCode: "TR", category: "Otomotiv",  website: "https://www.togg.com.tr",          founded: 2018, employees: 3000  },
  { brand: "Tofaş",        company: "Koç Holding",       countryCode: "TR", category: "Otomotiv",  companyLogo: "/logo/kocholding.svg",          website: "https://www.tofas.com.tr",    founded: 1968, employees: 14000 },
  { brand: "Ford Otosan",  company: "Koç Holding",       countryCode: "TR", category: "Otomotiv",  companyLogo: "/logo/kocholding.svg",          website: "https://www.fordotosan.com.tr",founded: 1959, employees: 10000 },
  { brand: "Oyak Renault", company: "OYAK",              countryCode: "TR", category: "Otomotiv",  website: "https://www.oyakrenault.com.tr",    founded: 1969, employees: 10000 },
  { brand: "Temsa",        company: "Sabancı Holding",   countryCode: "TR", category: "Otomotiv",  companyLogo: "/logo/sabanci.svg",             website: "https://www.temsa.com",       founded: 1968, employees: 4000  },
  { brand: "BMW",          company: "BMW Group",         countryCode: "DE", category: "Otomotiv",  logo: "/logo/bmw.svg",                        website: "https://www.bmw.com.tr",      founded: 1916 },
  { brand: "Mercedes-Benz",company: "Mercedes-Benz Group",countryCode:"DE", category: "Otomotiv", logo: "/logo/mercedes.svg",                   website: "https://www.mercedes-benz.com.tr", founded: 1926 },
  { brand: "Toyota",       company: "Toyota Motor Corp", countryCode: "JP", category: "Otomotiv",  logo: "/logo/toyota.svg",                     website: "https://www.toyota.com.tr",   founded: 1937 },
  { brand: "Honda",        company: "Honda Motor Co",    countryCode: "JP", category: "Otomotiv",  logo: "/logo/honda.svg",                      website: "https://www.honda.com.tr",    founded: 1948 },
  { brand: "Volkswagen",   company: "Volkswagen Group",  countryCode: "DE", category: "Otomotiv",  logo: "/logo/volkswagen.svg",                 website: "https://www.volkswagen.com.tr", founded: 1937 },
  { brand: "Hyundai",      company: "Hyundai Motor Group",countryCode:"KR", category: "Otomotiv", logo: "/logo/hyundai.svg",                     website: "https://www.hyundai.com.tr",  founded: 1967 },
  { brand: "Audi",         company: "Volkswagen Group",  countryCode: "DE", category: "Otomotiv",  logo: "/logo/audi.svg",  companyLogo: "/logo/volkswagen.svg", website: "https://www.audi.com.tr", founded: 1909 },
  { brand: "Skoda",        company: "Volkswagen Group",  countryCode: "CZ", category: "Otomotiv",  logo: "/logo/skoda.svg", companyLogo: "/logo/volkswagen.svg" },
  { brand: "SEAT",         company: "Volkswagen Group",  countryCode: "ES", category: "Otomotiv",  logo: "/logo/seat.svg",  companyLogo: "/logo/volkswagen.svg" },
  { brand: "Porsche",      company: "Volkswagen Group",  countryCode: "DE", category: "Otomotiv",  logo: "/logo/porsche.svg", companyLogo: "/logo/volkswagen.svg", founded: 1931 },
  { brand: "Tesla",        company: "Tesla",             countryCode: "US", category: "Otomotiv",  logo: "/logo/tesla.svg",                      website: "https://www.tesla.com",       founded: 2003 },
  { brand: "Renault",      company: "Renault Group",     countryCode: "FR", category: "Otomotiv",  logo: "/logo/renault.svg",                    website: "https://www.renault.com.tr",  founded: 1899 },

  /* ═══════════════════════════════════════════════════════
     E-TİCARET & TEKNOLOJİ
  ═══════════════════════════════════════════════════════ */
  { brand: "Trendyol",     company: "Alibaba Group",    countryCode: "CN", category: "E-Ticaret",       website: "https://www.trendyol.com",    founded: 2010, employees: 10000 },
  { brand: "Hepsiburada",  company: "Hepsiburada",      countryCode: "TR", category: "E-Ticaret",       website: "https://www.hepsiburada.com", founded: 2000, employees: 6000  },
  { brand: "Getir",        company: "Getir",            countryCode: "TR", category: "E-Ticaret",       website: "https://getir.com",           founded: 2015, employees: 15000 },
  { brand: "Sahibinden",   company: "Sahibinden",       countryCode: "TR", category: "İlan Platformu",  website: "https://www.sahibinden.com",  founded: 1999 },
  { brand: "Yemeksepeti",  company: "Delivery Hero",    countryCode: "DE", category: "Yemek Teslimatı", website: "https://www.yemeksepeti.com", founded: 2000 },
  { brand: "n11",          company: "Doğuş Holding",    countryCode: "TR", category: "E-Ticaret",       website: "https://www.n11.com",         founded: 2012 },
  { brand: "Amazon",       company: "Amazon.com",       countryCode: "US", category: "E-Ticaret",       logo: "/logo/amazon.svg",               website: "https://www.amazon.com.tr", founded: 1994, employees: 1500000 },
  { brand: "Google",       company: "Alphabet",         countryCode: "US", category: "Teknoloji",       logo: "/logo/google.svg",               website: "https://www.google.com",    founded: 1998, employees: 180000 },
  { brand: "YouTube",      company: "Alphabet",         countryCode: "US", category: "Dijital Medya",   logo: "/logo/youtube.svg", companyLogo: "/logo/google.svg", founded: 2005 },
  { brand: "Instagram",    company: "Meta",             countryCode: "US", category: "Sosyal Medya",    logo: "/logo/instagram.svg", companyLogo: "/logo/meta.svg", founded: 2010 },
  { brand: "WhatsApp",     company: "Meta",             countryCode: "US", category: "Mesajlaşma",      logo: "/logo/whatsapp.svg",  companyLogo: "/logo/meta.svg", founded: 2009 },
  { brand: "Meta",         company: "Meta Platforms",   countryCode: "US", category: "Teknoloji",       logo: "/logo/meta.svg",                 website: "https://www.meta.com",      founded: 2004, employees: 86000 },
  { brand: "TikTok",       company: "ByteDance",        countryCode: "CN", category: "Sosyal Medya",    logo: "/logo/tiktok.svg",               website: "https://www.tiktok.com",    founded: 2016 },
  { brand: "Microsoft",    company: "Microsoft Corp",   countryCode: "US", category: "Teknoloji",       logo: "/logo/microsoft.svg",            website: "https://www.microsoft.com", founded: 1975, employees: 220000 },
  { brand: "Netflix",      company: "Netflix",          countryCode: "US", category: "Dijital Medya",   logo: "/logo/netflix.svg",              website: "https://www.netflix.com",   founded: 1997, employees: 13000  },
  { brand: "Peak Games",   company: "Zynga",            countryCode: "US", category: "Oyun",                                                    website: "https://www.peakgames.net", founded: 2010, notlar: "Türkiye merkezli oyun şirketi; 2020'de Zynga (ABD) tarafından 1,8 milyar dolara satın alınmıştır." },

  /* ═══════════════════════════════════════════════════════
     HAVAYOLU
  ═══════════════════════════════════════════════════════ */
  { brand: "Türk Hava Yolları", company: "Türk Hava Yolları", countryCode: "TR", category: "Havacılık", logo: "/logo/thy.svg",  website: "https://www.turkishairlines.com", founded: 1933, employees: 75000 },
  { brand: "Pegasus",           company: "Esas Holding",      countryCode: "TR", category: "Havacılık",                         website: "https://www.flypgs.com",          founded: 1990, employees: 5000  },
  { brand: "AnadoluJet",        company: "Türk Hava Yolları", countryCode: "TR", category: "Havacılık", companyLogo: "/logo/thy.svg", website: "https://www.anadolujet.com", founded: 2008 },
  { brand: "SunExpress",        company: "Türk Hava Yolları", countryCode: "TR", category: "Havacılık", companyLogo: "/logo/thy.svg", website: "https://www.sunexpress.com",  founded: 1989 },

  /* ═══════════════════════════════════════════════════════
     ENERJİ
  ═══════════════════════════════════════════════════════ */
  { brand: "Aygaz",  company: "Koç Holding",    countryCode: "TR", category: "Enerji", companyLogo: "/logo/kocholding.svg", website: "https://www.aygaz.com.tr", founded: 1961, employees: 4000 },
  { brand: "Opet",   company: "Koç Holding",    countryCode: "TR", category: "Enerji", logo: "/logo/opet.svg", companyLogo: "/logo/kocholding.svg", website: "https://www.opet.com.tr", founded: 1991 },
  { brand: "Shell TR",company: "Shell",         countryCode: "GB", category: "Enerji", logo: "/logo/shell.svg", website: "https://www.shell.com.tr" },
  { brand: "Enerjisa",company: "Sabancı Holding",countryCode:"TR", category: "Enerji", companyLogo: "/logo/sabanci.svg", website: "https://www.enerjisa.com.tr", founded: 1996 },
  { brand: "Tüpraş", company: "Koç Holding",    countryCode: "TR", category: "Enerji", logo: "/logo/tupras.svg", companyLogo: "/logo/kocholding.svg", website: "https://www.tupras.com.tr", founded: 1983, employees: 5000 },
  { brand: "Petkim",  company: "SOCAR",          countryCode: "AZ", category: "Enerji", logo: "/logo/petkim.svg", website: "https://www.petkim.com.tr", founded: 1965, notlar: "Azerbaycan devlet enerji şirketi SOCAR'a aittir." },

  /* ═══════════════════════════════════════════════════════
     SAĞLIK, İLAÇ & KOZMETİK
  ═══════════════════════════════════════════════════════ */
  { brand: "Eczacıbaşı",  company: "Eczacıbaşı Holding", countryCode: "TR", category: "Sağlık",  logo: "/logo/eczacibasiholding.svg", website: "https://www.eczacibasi.com.tr", founded: 1942, employees: 12000 },
  { brand: "Vitra",       company: "Eczacıbaşı Holding", countryCode: "TR", category: "Yapı & Tasarım", companyLogo: "/logo/eczacibasiholding.svg", website: "https://www.vitra.com.tr" },
  { brand: "Abdi İbrahim",company: "Abdi İbrahim",       countryCode: "TR", category: "İlaç",    website: "https://www.abdiibrahim.com.tr", founded: 1912, employees: 4000 },
  { brand: "Flormar",     company: "Yıldız Holding",     countryCode: "TR", category: "Kozmetik", notlar: "Yıldız Holding bünyesinde Türk kozmetik markası." },

  /* ═══════════════════════════════════════════════════════
     KARGO & LOJİSTİK
  ═══════════════════════════════════════════════════════ */
  { brand: "Yurtiçi Kargo", company: "CJ Logistics",   countryCode: "KR", category: "Lojistik", website: "https://www.yurticikargo.com", founded: 1982, notlar: "Güney Koreli CJ Logistics şirketine aittir." },
  { brand: "Aras Kargo",    company: "Aras Holding",   countryCode: "TR", category: "Lojistik", website: "https://www.araskargo.com.tr", founded: 1979 },
  { brand: "MNG Kargo",     company: "MNG Holding",    countryCode: "TR", category: "Lojistik", website: "https://www.mngkargo.com.tr",  founded: 1999 },
  { brand: "PTT",           company: "Türkiye Cumhuriyeti", countryCode: "TR", category: "Lojistik", website: "https://www.ptt.gov.tr", founded: 1840 },
  { brand: "DHL TR",        company: "Deutsche Post DHL",   countryCode: "DE", category: "Lojistik", website: "https://www.dhl.com.tr" },
  { brand: "UPS TR",        company: "United Parcel Service",countryCode:"US", category: "Lojistik", website: "https://www.ups.com" },

  /* ═══════════════════════════════════════════════════════
     MEDYA
  ═══════════════════════════════════════════════════════ */
  { brand: "Sabah",    company: "Kalyon Holding",    countryCode: "TR", category: "Medya",        website: "https://www.sabah.com.tr",    founded: 1985 },
  { brand: "Hürriyet", company: "Demirören Holding", countryCode: "TR", category: "Medya",        website: "https://www.hurriyet.com.tr", founded: 1948 },
  { brand: "Milliyet", company: "Demirören Holding", countryCode: "TR", category: "Medya",        website: "https://www.milliyet.com.tr", founded: 1950 },
  { brand: "CNN Türk", company: "Demirören Holding", countryCode: "TR", category: "Medya",        website: "https://www.cnnturk.com" },
  { brand: "TRT",      company: "Türkiye Cumhuriyeti",countryCode:"TR", category: "Medya",        website: "https://www.trt.net.tr",      founded: 1964 },
  { brand: "BluTV",    company: "BluTV",             countryCode: "TR", category: "Dijital Medya",website: "https://www.blutv.com",       founded: 2016 },
  { brand: "Spotify",  company: "Spotify AB",        countryCode: "SE", category: "Dijital Medya",website: "https://www.spotify.com",     founded: 2006, employees: 9800 },

  /* ═══════════════════════════════════════════════════════
     İSRAİL BAĞLANTILI MARKALAR
     countryCode: "IL"  →  /israil sayfasında listelenir
  ═══════════════════════════════════════════════════════ */
  {
    brand: "Waze",
    company: "Google (Alphabet)",
    countryCode: "IL",
    category: "Teknoloji",
    website: "https://www.waze.com",
    founded: 2006,
    notlar: "İsrail'de kurulmuş navigasyon uygulaması. 2013 yılında Google tarafından yaklaşık 1,1 milyar dolara satın alınmıştır. Merkezi Tel Aviv'dedir.",
  },
  {
    brand: "Check Point",
    company: "Check Point Software Technologies",
    countryCode: "IL",
    category: "Siber Güvenlik",
    website: "https://www.checkpoint.com",
    founded: 1993,
    employees: 6000,
    notlar: "İsrail merkezli siber güvenlik şirketi. Tel Aviv'de kurulmuştur; güvenlik duvarı ve ağ güvenliği alanında dünya lideri firmalardan biridir.",
  },
  {
    brand: "CyberArk",
    company: "CyberArk Software",
    countryCode: "IL",
    category: "Siber Güvenlik",
    website: "https://www.cyberark.com",
    founded: 1999,
    employees: 8000,
    notlar: "İsrail menşeli kimlik güvenliği şirketi. Tel Aviv'de kurulmuş olup ayrıcalıklı erişim yönetimi (PAM) alanında lider konumdadır.",
  },
  {
    brand: "Mobileye",
    company: "Intel",
    countryCode: "IL",
    category: "Teknoloji",
    website: "https://www.mobileye.com",
    founded: 1999,
    employees: 4000,
    notlar: "İsrail'de kurulmuş sürücü destek sistemleri ve otonom sürüş teknolojileri şirketi. 2017'de Intel tarafından 15,3 milyar dolara satın alınmıştır.",
  },
  {
    brand: "Wix",
    company: "Wix.com",
    countryCode: "IL",
    category: "Teknoloji",
    website: "https://www.wix.com",
    founded: 2006,
    employees: 6400,
    notlar: "Tel Aviv merkezli web sitesi oluşturma platformu. Dünyada 200 milyondan fazla kullanıcısı bulunmaktadır.",
  },
  {
    brand: "Monday.com",
    company: "monday.com Ltd.",
    countryCode: "IL",
    category: "Teknoloji",
    website: "https://www.monday.com",
    founded: 2012,
    employees: 2000,
    notlar: "Tel Aviv merkezli proje yönetimi ve iş birliği platformu. NASDAQ'da işlem görmektedir.",
  },
  {
    brand: "Fiverr",
    company: "Fiverr International",
    countryCode: "IL",
    category: "Teknoloji",
    website: "https://www.fiverr.com",
    founded: 2010,
    employees: 700,
    notlar: "Tel Aviv merkezli global freelance çalışma pazaryeri. NYSE'de işlem görmektedir.",
  },
  {
    brand: "NICE Systems",
    company: "NICE Ltd.",
    countryCode: "IL",
    category: "Teknoloji",
    website: "https://www.nice.com",
    founded: 1986,
    employees: 8000,
    notlar: "İsrail menşeli yazılım şirketi. Müşteri deneyimi, iletişim merkezi ve finansal uyumluluk yazılımları üretmektedir.",
  },
  {
    brand: "Amdocs",
    company: "Amdocs",
    countryCode: "IL",
    category: "Teknoloji",
    website: "https://www.amdocs.com",
    founded: 1982,
    employees: 30000,
    notlar: "İsrail kökenli telekomünikasyon yazılımı ve hizmetleri şirketi. NASDAQ'da işlem görmektedir.",
  },
  {
    brand: "Keter",
    company: "Keter Group",
    countryCode: "IL",
    category: "Ev & Yaşam",
    website: "https://www.keter.com",
    founded: 1948,
    employees: 5000,
    notlar: "İsrail menşeli plastik ev ürünleri ve bahçe mobilyaları şirketi. Türkiye dahil 100'den fazla ülkede satış yapmaktadır.",
  },
  {
    brand: "Given Imaging (PillCam)",
    company: "Medtronic",
    countryCode: "IL",
    category: "Tıbbi Teknoloji",
    website: "https://www.medtronic.com",
    founded: 1998,
    notlar: "İsrail'de geliştirilmiş kapsül kamera teknolojisi (PillCam). 2014'te Medtronic tarafından satın alınmıştır.",
  },
  {
    brand: "Orbia (Mexichem)",
    company: "Orbia",
    countryCode: "IL",
    category: "Kimya",
    notlar: "Orbia'nın Netafim birimi İsrail kökenlidir. Damla sulama sistemleri alanında İsrail'de 1965'te kurulmuştur.",
  },

  /* ═══════════════════════════════════════════════════════
     ELEKTRONİK & TEKNOLOJİ — KÜRESEL
  ═══════════════════════════════════════════════════════ */
  { brand: "Apple",       company: "Apple Inc.",       countryCode: "US", category: "Elektronik", logo: "/logo/apple.svg",    website: "https://www.apple.com",    founded: 1976, employees: 164000 },
  { brand: "iPhone",      company: "Apple Inc.",       countryCode: "US", category: "Elektronik", companyLogo: "/logo/apple.svg" },
  { brand: "iPad",        company: "Apple Inc.",       countryCode: "US", category: "Elektronik", companyLogo: "/logo/apple.svg" },
  { brand: "MacBook",     company: "Apple Inc.",       countryCode: "US", category: "Elektronik", companyLogo: "/logo/apple.svg" },
  { brand: "Samsung",     company: "Samsung Group",    countryCode: "KR", category: "Elektronik", logo: "/logo/samsung.svg",  website: "https://www.samsung.com/tr", founded: 1938, employees: 270000 },
  { brand: "LG",          company: "LG Electronics",   countryCode: "KR", category: "Elektronik", logo: "/logo/lg.svg",       website: "https://www.lg.com/tr",      founded: 1958, employees: 74000 },
  { brand: "Sony",        company: "Sony Group",       countryCode: "JP", category: "Elektronik", logo: "/logo/sony.svg",     website: "https://www.sony.com.tr",    founded: 1946, employees: 108000 },
  { brand: "Xiaomi",      company: "Xiaomi Corp.",     countryCode: "CN", category: "Elektronik", logo: "/logo/xiaomi.svg",   website: "https://www.mi.com/tr",      founded: 2010, employees: 35000 },
  { brand: "Huawei",      company: "Huawei",           countryCode: "CN", category: "Elektronik", logo: "/logo/huawei.svg",   website: "https://www.huawei.com/tr",  founded: 1987, employees: 207000 },
  { brand: "HP",          company: "HP Inc.",          countryCode: "US", category: "Elektronik", logo: "/logo/hp.svg",       website: "https://www.hp.com/tr-tr",   founded: 1939, employees: 58000 },
  { brand: "Dell",        company: "Dell Technologies",countryCode: "US", category: "Elektronik",                             website: "https://www.dell.com/tr-tr", founded: 1984, employees: 120000 },
  { brand: "Lenovo",      company: "Lenovo Group",     countryCode: "CN", category: "Elektronik", logo: "/logo/lenovo.svg",   website: "https://www.lenovo.com/tr",  founded: 1984, employees: 77000 },
  { brand: "Asus",        company: "ASUSTeK",          countryCode: "TW", category: "Elektronik", logo: "/logo/asus.svg",     website: "https://www.asus.com/tr",    founded: 1989 },
  { brand: "Philips",     company: "Koninklijke Philips", countryCode: "NL", category: "Elektronik", logo: "/logo/philips.svg", website: "https://www.philips.com.tr", founded: 1891, employees: 74000 },
  { brand: "Panasonic",   company: "Panasonic Holdings",  countryCode: "JP", category: "Elektronik", logo: "/logo/panasonic.svg", website: "https://www.panasonic.com/tr", founded: 1918 },
  { brand: "PlayStation", company: "Sony Group",       countryCode: "JP", category: "Oyun",       companyLogo: "/logo/sony.svg",  website: "https://www.playstation.com", founded: 1994 },
  { brand: "Xbox",        company: "Microsoft Corp",   countryCode: "US", category: "Oyun",       companyLogo: "/logo/microsoft.svg", founded: 2001 },
  { brand: "Dyson",       company: "Dyson Ltd.",       countryCode: "GB", category: "Elektronik",                             website: "https://www.dyson.com.tr",   founded: 1991, employees: 14000 },

  /* ═══════════════════════════════════════════════════════
     PEPSİCO MARKALARI
  ═══════════════════════════════════════════════════════ */
  { brand: "Pepsi",       company: "PepsiCo",  countryCode: "US", category: "İçecek",  logo: "/logo/pepsi.svg",   website: "https://www.pepsi.com",    founded: 1893 },
  { brand: "7UP",         company: "PepsiCo",  countryCode: "US", category: "İçecek",  logo: "/logo/7up.svg",     companyLogo: "/logo/pepsi.svg" },
  { brand: "Mirinda",     company: "PepsiCo",  countryCode: "US", category: "İçecek",  companyLogo: "/logo/pepsi.svg" },
  { brand: "Lay's",       company: "PepsiCo",  countryCode: "US", category: "Gıda",    logo: "/logo/lays.svg",    companyLogo: "/logo/pepsi.svg",      founded: 1932 },
  { brand: "Doritos",     company: "PepsiCo",  countryCode: "US", category: "Gıda",    logo: "/logo/doritos.svg", companyLogo: "/logo/pepsi.svg" },
  { brand: "Cheetos",     company: "PepsiCo",  countryCode: "US", category: "Gıda",    companyLogo: "/logo/pepsi.svg" },
  { brand: "Quaker",      company: "PepsiCo",  countryCode: "US", category: "Gıda",    companyLogo: "/logo/pepsi.svg",      founded: 1877 },
  { brand: "Mountain Dew",company: "PepsiCo",  countryCode: "US", category: "İçecek",  companyLogo: "/logo/pepsi.svg" },
  { brand: "Red Bull",    company: "Red Bull GmbH", countryCode: "AT", category: "İçecek",  logo: "/logo/redbull.svg", website: "https://www.redbull.com",  founded: 1984, employees: 13000 },

  /* ═══════════════════════════════════════════════════════
     NESTLÉ MARKALARI
  ═══════════════════════════════════════════════════════ */
  { brand: "Nestlé",      company: "Nestlé S.A.",     countryCode: "CH", category: "Gıda",    logo: "/logo/nestle.svg",  website: "https://www.nestle.com.tr", founded: 1866, employees: 275000 },
  { brand: "Nescafé",     company: "Nestlé S.A.",     countryCode: "CH", category: "İçecek",  companyLogo: "/logo/nestle.svg" },
  { brand: "Nespresso",   company: "Nestlé S.A.",     countryCode: "CH", category: "Kahve & Cafe", companyLogo: "/logo/nestle.svg", founded: 1986 },
  { brand: "Kit Kat",     company: "Nestlé S.A.",     countryCode: "CH", category: "Gıda",    companyLogo: "/logo/nestle.svg" },
  { brand: "Maggi",       company: "Nestlé S.A.",     countryCode: "CH", category: "Gıda",    companyLogo: "/logo/nestle.svg" },
  { brand: "Milo",        company: "Nestlé S.A.",     countryCode: "CH", category: "İçecek",  companyLogo: "/logo/nestle.svg" },

  /* ═══════════════════════════════════════════════════════
     UNİLEVER MARKALARI
  ═══════════════════════════════════════════════════════ */
  { brand: "Unilever",    company: "Unilever PLC",    countryCode: "GB", category: "Gıda",           logo: "/logo/unilever.svg", website: "https://www.unilever.com.tr", founded: 1929, employees: 127000 },
  { brand: "Dove",        company: "Unilever PLC",    countryCode: "GB", category: "Kozmetik",        companyLogo: "/logo/unilever.svg" },
  { brand: "Axe",         company: "Unilever PLC",    countryCode: "GB", category: "Kozmetik",        companyLogo: "/logo/unilever.svg" },
  { brand: "Lipton",      company: "Unilever PLC",    countryCode: "GB", category: "İçecek",          companyLogo: "/logo/unilever.svg" },
  { brand: "Knorr",       company: "Unilever PLC",    countryCode: "GB", category: "Gıda",            companyLogo: "/logo/unilever.svg" },
  { brand: "Algida",      company: "Unilever PLC",    countryCode: "GB", category: "Gıda",            companyLogo: "/logo/unilever.svg" },
  { brand: "Domestos",    company: "Unilever PLC",    countryCode: "GB", category: "Kozmetik",        companyLogo: "/logo/unilever.svg" },
  { brand: "Rexona",      company: "Unilever PLC",    countryCode: "GB", category: "Kozmetik",        companyLogo: "/logo/unilever.svg" },
  { brand: "Clear",       company: "Unilever PLC",    countryCode: "GB", category: "Kozmetik",        companyLogo: "/logo/unilever.svg" },

  /* ═══════════════════════════════════════════════════════
     PROCTER & GAMBLE MARKALARI
  ═══════════════════════════════════════════════════════ */
  { brand: "Gillette",         company: "Procter & Gamble", countryCode: "US", category: "Kozmetik",   logo: "/logo/gillette.svg",  website: "https://www.gillette.com.tr", founded: 1901 },
  { brand: "Head & Shoulders", company: "Procter & Gamble", countryCode: "US", category: "Kozmetik",   companyLogo: "/logo/pg.svg" },
  { brand: "Pantene",          company: "Procter & Gamble", countryCode: "US", category: "Kozmetik",   companyLogo: "/logo/pg.svg" },
  { brand: "Ariel",            company: "Procter & Gamble", countryCode: "US", category: "Kozmetik",   companyLogo: "/logo/pg.svg" },
  { brand: "Pampers",          company: "Procter & Gamble", countryCode: "US", category: "Kozmetik",   companyLogo: "/logo/pg.svg" },
  { brand: "Fairy",            company: "Procter & Gamble", countryCode: "US", category: "Kozmetik",   companyLogo: "/logo/pg.svg" },
  { brand: "Oral-B",           company: "Procter & Gamble", countryCode: "US", category: "Sağlık",     companyLogo: "/logo/pg.svg" },

  /* ═══════════════════════════════════════════════════════
     HENKEL MARKALARI
  ═══════════════════════════════════════════════════════ */
  { brand: "Persil",     company: "Henkel AG",  countryCode: "DE", category: "Kozmetik", logo: "/logo/persil.svg"   },
  { brand: "Pritt",      company: "Henkel AG",  countryCode: "DE", category: "Kozmetik"  },
  { brand: "Bref",       company: "Henkel AG",  countryCode: "DE", category: "Kozmetik"  },
  { brand: "Schwarzkopf",company: "Henkel AG",  countryCode: "DE", category: "Kozmetik", logo: "/logo/schwarzkopf.svg" },

  /* ═══════════════════════════════════════════════════════
     MODA & PERAKENDE — KÜRESEL
  ═══════════════════════════════════════════════════════ */
  { brand: "H&M",         company: "H & M Hennes & Mauritz", countryCode: "SE", category: "Giyim", logo: "/logo/hm.svg",     website: "https://www2.hm.com/tr_tr", founded: 1947, employees: 160000 },
  { brand: "MANGO",       company: "MANGO",                  countryCode: "ES", category: "Moda",  logo: "/logo/mango.svg",  website: "https://www.mango.com/tr",  founded: 1984 },
  { brand: "Tommy Hilfiger", company: "PVH Corp",            countryCode: "US", category: "Moda",  logo: "/logo/tommyhilfiger.svg" },
  { brand: "Levi's",      company: "Levi Strauss & Co.",     countryCode: "US", category: "Giyim",                           website: "https://www.levi.com/TR",   founded: 1853 },
  { brand: "GAP",         company: "Gap Inc.",               countryCode: "US", category: "Giyim", logo: "/logo/gap.svg",    website: "https://www.gap.com",        founded: 1969 },
  { brand: "Under Armour",company: "Under Armour",           countryCode: "US", category: "Giyim", logo: "/logo/underarmour.svg", website: "https://www.underarmour.com", founded: 1996 },
  { brand: "New Balance", company: "New Balance",            countryCode: "US", category: "Giyim", logo: "/logo/newbalance.svg",  website: "https://www.newbalance.com.tr", founded: 1906 },
  { brand: "Reebok",      company: "Authentic Brands Group", countryCode: "US", category: "Giyim", logo: "/logo/reebok.svg",      website: "https://www.reebok.com.tr",  founded: 1958 },
  { brand: "Skechers",    company: "Skechers USA",           countryCode: "US", category: "Giyim", logo: "/logo/skechers.svg",    website: "https://www.skechers.com.tr",founded: 1992 },
  { brand: "Decathlon",   company: "Decathlon S.A.",         countryCode: "FR", category: "Perakende", logo: "/logo/decathlon.svg", website: "https://www.decathlon.com.tr", founded: 1976, employees: 90000 },
  { brand: "Marks & Spencer TR", company: "Marks and Spencer", countryCode: "GB", category: "Giyim", website: "https://www.marksandspencer.com.tr", founded: 1884 },
  { brand: "Penti",       company: "Penti",                  countryCode: "TR", category: "Giyim",  website: "https://www.penti.com",   founded: 1950, employees: 5000 },
  { brand: "Kiğılı",      company: "Kiğılı",                 countryCode: "TR", category: "Giyim",  website: "https://www.kigili.com",  founded: 1954 },
  { brand: "Flo",         company: "FLO Mağazacılık",        countryCode: "TR", category: "Giyim",  website: "https://www.flo.com.tr",  founded: 2009, employees: 7000 },
  { brand: "Aldo",        company: "Aldo Group",             countryCode: "CA", category: "Giyim",  website: "https://www.aldoshoes.com", founded: 1972 },
  { brand: "Pierre Cardin TR", company: "Pierre Cardin",     countryCode: "FR", category: "Moda",   website: "https://www.pierrecardin.com.tr" },
  { brand: "Guess",       company: "Guess?, Inc.",           countryCode: "US", category: "Moda",   logo: "/logo/guess.svg",  website: "https://www.guess.com", founded: 1981 },
  { brand: "Emporio Armani TR", company: "Giorgio Armani",   countryCode: "IT", category: "Moda",   website: "https://www.armani.com",  founded: 1975 },

  /* ═══════════════════════════════════════════════════════
     FAST FOOD — EK MARKALAR
  ═══════════════════════════════════════════════════════ */
  { brand: "Pizza Hut",   company: "Yum! Brands",                     countryCode: "US", category: "Fast Food", logo: "/logo/pizzahut.svg",  website: "https://www.pizzahut.com.tr", founded: 1958 },
  { brand: "Taco Bell",   company: "Yum! Brands",                     countryCode: "US", category: "Fast Food",                               website: "https://www.tacobell.com",    founded: 1962 },
  { brand: "Popeyes",     company: "Restaurant Brands International", countryCode: "US", category: "Fast Food",                               website: "https://www.popeyes.com",     founded: 1972 },
  { brand: "Tim Hortons", company: "Restaurant Brands International", countryCode: "CA", category: "Kahve & Cafe",                            website: "https://www.timhortons.com",  founded: 1964 },
  { brand: "Five Guys",   company: "Five Guys",                       countryCode: "US", category: "Fast Food",                               website: "https://www.fiveguys.com",    founded: 1986 },
  { brand: "Sbarro",      company: "Sbarro LLC",                      countryCode: "US", category: "Fast Food",                               website: "https://www.sbarro.com",      founded: 1956 },
  { brand: "Gloria Jean's",company: "Retail Food Group",              countryCode: "AU", category: "Kahve & Cafe",                            website: "https://www.gloriajeans.com", founded: 1979 },
  { brand: "Costa Coffee", company: "The Coca-Cola Company",          countryCode: "GB", category: "Kahve & Cafe", companyLogo: "/logo/cocacola.svg", website: "https://www.costa.co.uk", founded: 1971, notlar: "İngiliz menşeli kahve zinciri; 2019'da Coca-Cola tarafından 5,1 milyar dolara satın alınmıştır." },
  { brand: "Cinnabon",    company: "Focus Brands",                    countryCode: "US", category: "Kahve & Cafe",                            website: "https://www.cinnabon.com",    founded: 1985 },

  /* ═══════════════════════════════════════════════════════
     BANKACILIK & FİNANS — EK MARKALAR
  ═══════════════════════════════════════════════════════ */
  { brand: "HSBC TR",        company: "HSBC Holdings",        countryCode: "GB", category: "Bankacılık", website: "https://www.hsbc.com.tr",          founded: 1865, employees: 220000 },
  { brand: "Albaraka Türk",  company: "Albaraka Banking Group",countryCode:"BH", category: "Bankacılık", website: "https://www.albarakaturk.com.tr",   founded: 1985 },
  { brand: "Kuveyt Türk",    company: "Kuwait Finance House",  countryCode: "KW", category: "Bankacılık", website: "https://www.kuveytturk.com.tr",     founded: 1989, employees: 6000  },
  { brand: "Ziraat Katılım", company: "Türkiye Cumhuriyeti",  countryCode: "TR", category: "Bankacılık", website: "https://www.ziraatkatilim.com.tr",   founded: 2015 },
  { brand: "Vakıf Katılım",  company: "Türkiye Cumhuriyeti",  countryCode: "TR", category: "Bankacılık", website: "https://www.vakifkatilim.com.tr",    founded: 2016 },
  { brand: "Visa",           company: "Visa Inc.",             countryCode: "US", category: "Finans",     logo: "/logo/visa.svg",    website: "https://www.visa.com.tr",  founded: 1958, employees: 26500 },
  { brand: "Mastercard",     company: "Mastercard Inc.",       countryCode: "US", category: "Finans",     logo: "/logo/mastercard.svg", website: "https://www.mastercard.com.tr", founded: 1966, employees: 29000 },
  { brand: "PayPal",         company: "PayPal Holdings",       countryCode: "US", category: "Finans",     logo: "/logo/paypal.svg",  website: "https://www.paypal.com",   founded: 1998, employees: 27200 },
  { brand: "American Express",company: "American Express",     countryCode: "US", category: "Finans",     logo: "/logo/amex.svg",    website: "https://www.americanexpress.com", founded: 1850 },

  /* ═══════════════════════════════════════════════════════
     SİGORTA
  ═══════════════════════════════════════════════════════ */
  { brand: "Allianz TR",          company: "Allianz SE",            countryCode: "DE", category: "Finans", website: "https://www.allianz.com.tr",         founded: 1890, employees: 150000 },
  { brand: "AXA Sigorta TR",      company: "AXA SA",                countryCode: "FR", category: "Finans", website: "https://www.axa.com.tr",             founded: 1817 },
  { brand: "Anadolu Sigorta",     company: "İş Bankası",            countryCode: "TR", category: "Finans", website: "https://www.anadolusigorta.com.tr",  founded: 1925 },
  { brand: "Mapfre Sigorta TR",   company: "Mapfre S.A.",           countryCode: "ES", category: "Finans", website: "https://www.mapfre.com.tr",           founded: 1933 },
  { brand: "Garanti BBVA Sigorta",company: "BBVA",                  countryCode: "ES", category: "Finans", website: "https://www.garantisigorta.com.tr",   founded: 1992 },
  { brand: "Türkiye Sigorta",     company: "Türkiye Cumhuriyeti",   countryCode: "TR", category: "Finans", website: "https://www.turkiyesigorta.com.tr",   founded: 2020 },

  /* ═══════════════════════════════════════════════════════
     OTOMOTİV — EK MARKALAR
  ═══════════════════════════════════════════════════════ */
  { brand: "Fiat",       company: "Stellantis",   countryCode: "IT", category: "Otomotiv", logo: "/logo/fiat.svg",     website: "https://www.fiat.com.tr",       founded: 1899 },
  { brand: "Opel",       company: "Stellantis",   countryCode: "DE", category: "Otomotiv", logo: "/logo/opel.svg",     website: "https://www.opel.com.tr",       founded: 1862 },
  { brand: "Peugeot",    company: "Stellantis",   countryCode: "FR", category: "Otomotiv", logo: "/logo/peugeot.svg",  website: "https://www.peugeot.com.tr",    founded: 1896 },
  { brand: "Citroën",    company: "Stellantis",   countryCode: "FR", category: "Otomotiv", logo: "/logo/citroen.svg",  website: "https://www.citroen.com.tr",    founded: 1919 },
  { brand: "Alfa Romeo", company: "Stellantis",   countryCode: "IT", category: "Otomotiv", logo: "/logo/alfaromeo.svg",                                          founded: 1910 },
  { brand: "Jeep",       company: "Stellantis",   countryCode: "US", category: "Otomotiv", logo: "/logo/jeep.svg",                                               founded: 1941 },
  { brand: "Kia",        company: "Hyundai Motor Group", countryCode: "KR", category: "Otomotiv", logo: "/logo/kia.svg", website: "https://www.kia.com/tr",     founded: 1944 },
  { brand: "Ford",       company: "Ford Motor Co",countryCode: "US", category: "Otomotiv", logo: "/logo/ford.svg",     website: "https://www.ford.com.tr",       founded: 1903, employees: 177000 },
  { brand: "Nissan",     company: "Renault-Nissan-Mitsubishi Alliance", countryCode: "JP", category: "Otomotiv", logo: "/logo/nissan.svg", website: "https://www.nissan.com.tr", founded: 1933 },
  { brand: "Suzuki",     company: "Suzuki Motor Corp", countryCode: "JP", category: "Otomotiv", logo: "/logo/suzuki.svg", website: "https://www.suzuki.com.tr",  founded: 1909 },
  { brand: "Volvo Cars", company: "Geely Holding",    countryCode: "SE", category: "Otomotiv", logo: "/logo/volvo.svg",  website: "https://www.volvocars.com/tr", founded: 1927 },
  { brand: "Land Rover", company: "Tata Motors",      countryCode: "GB", category: "Otomotiv", logo: "/logo/landrover.svg", website: "https://www.landrover.com.tr", founded: 1948 },
  { brand: "Jaguar",     company: "Tata Motors",      countryCode: "GB", category: "Otomotiv",                              website: "https://www.jaguar.com",      founded: 1922 },
  { brand: "Mitsubishi", company: "Renault-Nissan-Mitsubishi Alliance", countryCode: "JP", category: "Otomotiv", logo: "/logo/mitsubishi.svg", founded: 1917 },

  /* ═══════════════════════════════════════════════════════
     TURİZM & OTELCİLİK
  ═══════════════════════════════════════════════════════ */
  { brand: "Hilton TR",    company: "Hilton Worldwide",     countryCode: "US", category: "Perakende", website: "https://www.hilton.com/tr",             founded: 1919, employees: 430000 },
  { brand: "Marriott TR",  company: "Marriott International",countryCode:"US", category: "Perakende", website: "https://www.marriott.com",              founded: 1927, employees: 380000 },
  { brand: "Sheraton TR",  company: "Marriott International",countryCode:"US", category: "Perakende", website: "https://www.marriott.com/sheraton",     founded: 1937 },
  { brand: "Accor TR",     company: "Accor S.A.",           countryCode: "FR", category: "Perakende", website: "https://www.accor.com",                 founded: 1967, employees: 300000 },
  { brand: "Novotel TR",   company: "Accor S.A.",           countryCode: "FR", category: "Perakende", website: "https://www.novotel.com" },
  { brand: "ETS Tur",      company: "ETS Tur",              countryCode: "TR", category: "Perakende", website: "https://www.etsglobal.com",             founded: 1987 },
  { brand: "Jolly Tur",    company: "Jolly Tur",            countryCode: "TR", category: "Perakende", website: "https://www.jolly.com.tr",              founded: 1973 },

  /* ═══════════════════════════════════════════════════════
     YAPI & İNŞAAT
  ═══════════════════════════════════════════════════════ */
  { brand: "Limak Holding", company: "Limak Holding",    countryCode: "TR", category: "İnşaat",   website: "https://www.limak.com.tr",   founded: 1976 },
  { brand: "Rönesans",      company: "Rönesans Holding", countryCode: "TR", category: "İnşaat",   website: "https://www.ronesans.com",   founded: 1993 },
  { brand: "Kalyon",        company: "Kalyon Holding",   countryCode: "TR", category: "İnşaat",   website: "https://www.kalyonholding.com", founded: 1972 },
  { brand: "Insaat.com TR", company: "Türkiye Cumhuriyeti", countryCode: "TR", category: "İnşaat" },
  { brand: "Çimsa",         company: "Sabancı Holding",  countryCode: "TR", category: "İnşaat",   companyLogo: "/logo/sabanci.svg", website: "https://www.cimsa.com.tr", founded: 1972 },
  { brand: "Çimko",         company: "Yaşar Holding",    countryCode: "TR", category: "İnşaat",   website: "https://www.cimko.com.tr", founded: 1969 },

  /* ═══════════════════════════════════════════════════════
     YAZILIM & BULUT HİZMETLERİ
  ═══════════════════════════════════════════════════════ */
  { brand: "Zoom",       company: "Zoom Video Communications", countryCode: "US", category: "Teknoloji",   logo: "/logo/zoom.svg",    website: "https://www.zoom.us",   founded: 2011, employees: 7400  },
  { brand: "Slack",      company: "Salesforce",                countryCode: "US", category: "Teknoloji",   logo: "/logo/slack.svg",   website: "https://www.slack.com", founded: 2013 },
  { brand: "Dropbox",    company: "Dropbox Inc.",              countryCode: "US", category: "Teknoloji",   logo: "/logo/dropbox.svg", website: "https://www.dropbox.com", founded: 2007, employees: 3000 },
  { brand: "Jira",       company: "Atlassian",                 countryCode: "AU", category: "Teknoloji",   logo: "/logo/jira.svg",    website: "https://www.atlassian.com", founded: 2002 },
  { brand: "GitHub",     company: "Microsoft Corp",            countryCode: "US", category: "Teknoloji",   logo: "/logo/github.svg",  companyLogo: "/logo/microsoft.svg", website: "https://www.github.com", founded: 2008 },
  { brand: "LinkedIn",   company: "Microsoft Corp",            countryCode: "US", category: "Sosyal Medya",logo: "/logo/linkedin.svg",companyLogo: "/logo/microsoft.svg", website: "https://www.linkedin.com", founded: 2003 },
  { brand: "Twitter/X",  company: "X Corp",                   countryCode: "US", category: "Sosyal Medya",logo: "/logo/x.svg",       website: "https://www.x.com",      founded: 2006 },
  { brand: "Snapchat",   company: "Snap Inc.",                 countryCode: "US", category: "Sosyal Medya",logo: "/logo/snapchat.svg",website: "https://www.snapchat.com", founded: 2011 },
  { brand: "Pinterest",  company: "Pinterest Inc.",            countryCode: "US", category: "Sosyal Medya",logo: "/logo/pinterest.svg",website: "https://www.pinterest.com", founded: 2010 },
  { brand: "Twitch",     company: "Amazon.com",                countryCode: "US", category: "Dijital Medya",companyLogo: "/logo/amazon.svg", website: "https://www.twitch.tv", founded: 2011 },
  { brand: "Disney+",    company: "The Walt Disney Company",   countryCode: "US", category: "Dijital Medya",logo: "/logo/disneyplus.svg", website: "https://www.disneyplus.com", founded: 2019 },
  { brand: "Prime Video",company: "Amazon.com",                countryCode: "US", category: "Dijital Medya",companyLogo: "/logo/amazon.svg", website: "https://www.primevideo.com", founded: 2006 },
  { brand: "Efsane TR",  company: "Trendyol",                  countryCode: "CN", category: "E-Ticaret" },
  { brand: "Uber TR",    company: "Uber Technologies",         countryCode: "US", category: "Teknoloji",   logo: "/logo/uber.svg",    website: "https://www.uber.com/tr",  founded: 2009, employees: 32000 },
  { brand: "Airbnb TR",  company: "Airbnb Inc.",               countryCode: "US", category: "Perakende",   logo: "/logo/airbnb.svg",  website: "https://www.airbnb.com.tr",founded: 2008, employees: 6900  },
  { brand: "Booking.com",company: "Booking Holdings",          countryCode: "NL", category: "Perakende",   logo: "/logo/booking.svg", website: "https://www.booking.com", founded: 1996, employees: 25000 },

  /* ═══════════════════════════════════════════════════════
     İSRAİL BAĞLANTILI — EK MARKALAR
  ═══════════════════════════════════════════════════════ */
  {
    brand: "eToro",
    company: "eToro Group Ltd.",
    countryCode: "IL",
    category: "Finans",
    website: "https://www.etoro.com",
    founded: 2007,
    employees: 1600,
    notlar: "Tel Aviv merkezli sosyal yatırım platformu. Hisse senedi, kripto para ve diğer varlıkların alım satımına aracılık eder. Kullanıcıların başarılı yatırımcıları taklit etmesine olanak tanır.",
  },
  {
    brand: "Payoneer",
    company: "Payoneer Inc.",
    countryCode: "IL",
    category: "Finans",
    website: "https://www.payoneer.com",
    founded: 2005,
    employees: 2100,
    notlar: "İsrail kökenli dijital ödeme platformu. Serbest çalışanlar ve küresel e-ticaret şirketleri tarafından yaygın biçimde kullanılmaktadır.",
  },
  {
    brand: "Taboola",
    company: "Taboola.com Ltd.",
    countryCode: "IL",
    category: "Teknoloji",
    website: "https://www.taboola.com",
    founded: 2007,
    employees: 2000,
    notlar: "Tel Aviv merkezli içerik keşif ve yerel reklam platformu. Habersitelerinin 'Bunları da beğenebilirsiniz' bölümlerinde yaygın kullanılan bir İsrail şirketidir.",
  },
  {
    brand: "AppsFlyer",
    company: "AppsFlyer Ltd.",
    countryCode: "IL",
    category: "Teknoloji",
    website: "https://www.appsflyer.com",
    founded: 2011,
    employees: 1500,
    notlar: "Tel Aviv merkezli mobil pazarlama analitiği şirketi. Uygulama yüklemelerini ve kampanya performansını ölçmekte kullanılır.",
  },
  {
    brand: "Varonis",
    company: "Varonis Systems",
    countryCode: "IL",
    category: "Siber Güvenlik",
    website: "https://www.varonis.com",
    founded: 2005,
    employees: 2000,
    notlar: "İsrail menşeli veri güvenliği şirketi. Kurumsal veri erişim analitiği ve tehdit tespiti alanında faaliyet göstermektedir. NASDAQ'da işlem görmektedir.",
  },
  {
    brand: "Radware",
    company: "Radware Ltd.",
    countryCode: "IL",
    category: "Siber Güvenlik",
    website: "https://www.radware.com",
    founded: 1997,
    employees: 1100,
    notlar: "İsrail merkezli ağ güvenliği ve uygulama dağıtım çözümleri şirketi. DDoS koruma ve yük dengeleme alanlarında faaliyet göstermektedir.",
  },
  {
    brand: "SolarEdge",
    company: "SolarEdge Technologies",
    countryCode: "IL",
    category: "Enerji",
    website: "https://www.solaredge.com",
    founded: 2006,
    employees: 5000,
    notlar: "İsrail merkezli güneş enerjisi optimize edici ve invertör üreticisi. NASDAQ'da işlem görmekte olup dünya genelinde milyonlarca güneş paneli sistemiyle kullanılmaktadır.",
  },
  {
    brand: "Playtika",
    company: "Playtika Holding",
    countryCode: "IL",
    category: "Oyun",
    website: "https://www.playtika.com",
    founded: 2010,
    employees: 4000,
    notlar: "İsrail merkezli mobil oyun şirketi. Slotomania, World Series of Poker gibi sosyal casino oyunlarıyla tanınmaktadır. NASDAQ'da işlem görmektedir.",
  },
  {
    brand: "IronSource",
    company: "Unity Technologies",
    countryCode: "IL",
    category: "Teknoloji",
    website: "https://www.unity.com",
    founded: 2010,
    employees: 1700,
    notlar: "Tel Aviv merkezli oyun ve uygulama büyüme platformu. 2022'de Unity Technologies tarafından 4,4 milyar dolara satın alınmıştır.",
  },
  {
    brand: "WalkMe",
    company: "SAP SE",
    countryCode: "IL",
    category: "Teknoloji",
    website: "https://www.walkme.com",
    founded: 2011,
    employees: 1000,
    notlar: "Tel Aviv merkezli dijital benimseme platformu. 2024'te SAP tarafından yaklaşık 1,5 milyar dolara satın alınmıştır.",
  },
  {
    brand: "Imperva",
    company: "Thales Group",
    countryCode: "IL",
    category: "Siber Güvenlik",
    website: "https://www.imperva.com",
    founded: 2002,
    employees: 1500,
    notlar: "İsrail kökenli siber güvenlik şirketi. Web uygulama güvenlik duvarı (WAF) ve veri güvenliği alanında lider konumdadır. 2023'te Thales Group tarafından satın alınmıştır.",
  },

  /* ═══════════════════════════════════════════════════════
     HOLDİNGLER — EK MARKALAR
  ═══════════════════════════════════════════════════════ */
  { brand: "Borusan Holding",   company: "Borusan Holding",  countryCode: "TR", category: "Holding", website: "https://www.borusan.com",          founded: 1944, employees: 15000 },
  { brand: "Anadolu Grubu",     company: "Anadolu Grubu",    countryCode: "TR", category: "Holding", website: "https://www.anadolugrubu.com.tr",  founded: 1950, employees: 24000 },
  { brand: "Doğan Holding",     company: "Doğan Ailesi",     countryCode: "TR", category: "Holding", website: "https://www.doganholding.com.tr",  founded: 1959 },
  { brand: "Alarko Holding",    company: "Alarko Holding",   countryCode: "TR", category: "Holding", website: "https://www.alarko.com.tr",        founded: 1954 },
  { brand: "OYAK",              company: "OYAK",             countryCode: "TR", category: "Holding", website: "https://www.oyak.com.tr",          founded: 1961, employees: 80000 },
  { brand: "Boydak Holding",    company: "Boydak Ailesi",    countryCode: "TR", category: "Holding", website: "https://www.boydak.com.tr",        founded: 1957 },
  { brand: "Demirören Holding", company: "Demirören Ailesi", countryCode: "TR", category: "Holding", website: "https://www.demirorenholding.com", founded: 1975 },
  { brand: "Çalık Holding",     company: "Çalık Ailesi",     countryCode: "TR", category: "Holding", website: "https://www.calik.com",            founded: 1981 },
  { brand: "Cengiz Holding",    company: "Cengiz Ailesi",    countryCode: "TR", category: "Holding", website: "https://www.cengiz.com.tr",        founded: 1980 },
  { brand: "Kalyon Holding",    company: "Kalyon Ailesi",    countryCode: "TR", category: "Holding", website: "https://www.kalyonholding.com",    founded: 1972 },
  { brand: "Esas Holding",      company: "Esas Holding",     countryCode: "TR", category: "Holding", website: "https://www.esasholding.com",      founded: 1998 },
  { brand: "Kalekim / Kale Grubu", company: "Kale Grubu",   countryCode: "TR", category: "Holding", website: "https://www.kalegrp.com",          founded: 1948 },

  /* ═══════════════════════════════════════════════════════
     MARKET & PERAKENDE — EK MARKALAR
  ═══════════════════════════════════════════════════════ */
  { brand: "Metro Türkiye", company: "Metro AG",              countryCode: "DE", category: "Süpermarket", website: "https://www.metro.com.tr",          founded: 1997 },
  { brand: "Lidl TR",       company: "Lidl Stiftung & Co.",   countryCode: "DE", category: "Süpermarket", website: "https://www.lidl.com.tr",            founded: 1930, employees: 300000 },
  { brand: "Koçtaş",        company: "Koç Holding",           countryCode: "TR", category: "Perakende",   companyLogo: "/logo/kocholding.svg",           website: "https://www.koctas.com.tr",  founded: 1993 },
  { brand: "Bauhaus TR",    company: "Bauhaus GmbH",          countryCode: "DE", category: "Perakende",   website: "https://www.bauhaus.com.tr",         founded: 1960 },
  { brand: "Boyner",        company: "Boyner Grup",           countryCode: "TR", category: "Perakende",   website: "https://www.boyner.com.tr",          founded: 1934, employees: 8000 },
  { brand: "Macro Center",  company: "Doğuş Holding",         countryCode: "TR", category: "Süpermarket", website: "https://www.macrocenter.com.tr",     founded: 2005 },
  { brand: "Bizim Toptan",  company: "BİM",                   countryCode: "TR", category: "Süpermarket", website: "https://www.bizimtoptan.com.tr",     founded: 2007 },
  { brand: "English Home",  company: "English Home",          countryCode: "TR", category: "Ev & Yaşam",  website: "https://www.englishhome.com",        founded: 2001 },
  { brand: "Madame Coco",   company: "Madame Coco",           countryCode: "TR", category: "Ev & Yaşam",  website: "https://www.madamecoco.com",         founded: 2010 },
  { brand: "İstikbal",      company: "Boydak Holding",        countryCode: "TR", category: "Ev & Yaşam",  website: "https://www.istikbal.com.tr",        founded: 1957 },
  { brand: "Bellona",       company: "Boydak Holding",        countryCode: "TR", category: "Ev & Yaşam",  website: "https://www.bellona.com.tr",         founded: 1980 },
  { brand: "Yataş",         company: "Yataş Holding",         countryCode: "TR", category: "Ev & Yaşam",  website: "https://www.yatas.com.tr",           founded: 1976 },
  { brand: "Çiçeksepeti",   company: "Çiçeksepeti",           countryCode: "TR", category: "E-Ticaret",   website: "https://www.ciceksepeti.com",        founded: 2006 },
  { brand: "D&R",           company: "Doğan Holding",         countryCode: "TR", category: "Perakende",   website: "https://www.dr.com.tr",              founded: 1956 },
  { brand: "Sportmaster TR",company: "Sportmaster Group",     countryCode: "RU", category: "Perakende",   website: "https://www.sportmaster.com.tr" },
  { brand: "LC Waikiki Mağazaları", company: "LC Waikiki",   countryCode: "TR", category: "Perakende",   website: "https://www.lcwaikiki.com" },
  { brand: "Paşabahçe",     company: "Şişecam",               countryCode: "TR", category: "Ev & Yaşam",  website: "https://www.pasabahce.com",          founded: 1935 },
  { brand: "Şişecam",       company: "Şişecam",               countryCode: "TR", category: "Yapı & Tasarım", website: "https://www.sisecam.com.tr",      founded: 1935, employees: 22000 },

  /* ═══════════════════════════════════════════════════════
     BANKACILIK & FİNANS — EK MARKALAR
  ═══════════════════════════════════════════════════════ */
  { brand: "Şekerbank",      company: "Şekerbank",            countryCode: "TR", category: "Bankacılık", website: "https://www.sekerbank.com.tr",     founded: 1953 },
  { brand: "TSKB",           company: "İş Bankası",           countryCode: "TR", category: "Bankacılık", website: "https://www.tskb.com.tr",          founded: 1950 },
  { brand: "Fibabanka",      company: "Fiba Group",           countryCode: "TR", category: "Bankacılık", website: "https://www.fibabanka.com.tr",     founded: 1984 },
  { brand: "Odea Bank",      company: "Bank Audi SAL",        countryCode: "LB", category: "Bankacılık", website: "https://www.odeabank.com.tr",      founded: 2012 },
  { brand: "Türk Eximbank",  company: "Türkiye Cumhuriyeti",  countryCode: "TR", category: "Bankacılık", website: "https://www.eximbank.gov.tr",      founded: 1987 },
  { brand: "Burgan Bank TR", company: "Burgan Bank",          countryCode: "KW", category: "Bankacılık", website: "https://www.burgan.com.tr",        founded: 2012 },
  { brand: "Alternatif Bank",company: "Commercial Bank Qatar",countryCode: "QA", category: "Bankacılık", website: "https://www.alternatifbank.com.tr",founded: 1992 },
  { brand: "Halk Sigorta",   company: "Halkbank",             countryCode: "TR", category: "Finans",     website: "https://www.halksigorta.com.tr",   founded: 1990 },
  { brand: "Ziraat Sigorta", company: "Türkiye Cumhuriyeti",  countryCode: "TR", category: "Finans",     website: "https://www.ziraatsigorta.com.tr", founded: 2013 },
  { brand: "Milli Reasürans",company: "İş Bankası",           countryCode: "TR", category: "Finans",     website: "https://www.millire.com",          founded: 1929 },
  { brand: "Ray Sigorta",    company: "İş Bankası",           countryCode: "TR", category: "Finans",     website: "https://www.raysigorta.com.tr",    founded: 1958 },

  /* ═══════════════════════════════════════════════════════
     HAVAYOLU — EK MARKALAR
  ═══════════════════════════════════════════════════════ */
  { brand: "Corendon Airlines", company: "Corendon Group",              countryCode: "TR", category: "Havacılık", website: "https://www.corendon-airlines.com", founded: 2004 },
  { brand: "Turkish Cargo",     company: "Türk Hava Yolları",           countryCode: "TR", category: "Lojistik",  companyLogo: "/logo/thy.svg",                website: "https://www.turkishcargo.com.tr", founded: 2002 },
  { brand: "Lufthansa TR",      company: "Lufthansa Group",             countryCode: "DE", category: "Havacılık", website: "https://www.lufthansa.com/tr/tr",   founded: 1953, employees: 105000 },
  { brand: "Emirates TR",       company: "Emirates Group",              countryCode: "AE", category: "Havacılık", logo: "/logo/emirates.svg",                   website: "https://www.emirates.com/tr",      founded: 1985, employees: 100000 },
  { brand: "Qatar Airways TR",  company: "Qatar Airways",               countryCode: "QA", category: "Havacılık", website: "https://www.qatarairways.com/tr-tr", founded: 1993, employees: 50000 },
  { brand: "British Airways TR",company: "International Airlines Group",countryCode: "GB", category: "Havacılık", website: "https://www.britishairways.com",     founded: 1974 },
  { brand: "Air France TR",     company: "Air France-KLM",              countryCode: "FR", category: "Havacılık", website: "https://www.airfrance.com.tr",       founded: 1933 },
  { brand: "KLM TR",            company: "Air France-KLM",              countryCode: "NL", category: "Havacılık", website: "https://www.klm.com/tr",             founded: 1919, employees: 33000 },
  { brand: "Flydubai TR",       company: "flydubai",                    countryCode: "AE", category: "Havacılık", website: "https://www.flydubai.com/tr",        founded: 2008 },
  { brand: "EasyJet TR",        company: "easyJet plc",                 countryCode: "GB", category: "Havacılık", website: "https://www.easyjet.com",            founded: 1995, employees: 15000 },

  /* ═══════════════════════════════════════════════════════
     ENERJİ — EK MARKALAR
  ═══════════════════════════════════════════════════════ */
  { brand: "Aksa Enerji",      company: "Kazancı Holding",     countryCode: "TR", category: "Enerji", website: "https://www.aksaenerji.com.tr",  founded: 1997, employees: 4500 },
  { brand: "Aksa Doğalgaz",    company: "Kazancı Holding",     countryCode: "TR", category: "Enerji", website: "https://www.aksadogalgaz.com.tr",founded: 2009 },
  { brand: "BP TR",            company: "BP plc",              countryCode: "GB", category: "Enerji", logo: "/logo/bp.svg",                      website: "https://www.bp.com/tr",         founded: 1908, employees: 90000 },
  { brand: "TotalEnergies TR", company: "TotalEnergies SE",    countryCode: "FR", category: "Enerji", website: "https://totalenergies.com/tr",   founded: 1924, employees: 100000 },
  { brand: "BOTAŞ",            company: "Türkiye Cumhuriyeti", countryCode: "TR", category: "Enerji", website: "https://www.botas.gov.tr",       founded: 1974 },
  { brand: "İGDAŞ",            company: "İstanbul Büyükşehir Belediyesi", countryCode: "TR", category: "Enerji", website: "https://www.igdas.com.tr", founded: 1988 },
  { brand: "TEDAŞ",            company: "Türkiye Cumhuriyeti", countryCode: "TR", category: "Enerji", website: "https://www.tedas.gov.tr",       founded: 1970 },
  { brand: "Borusan EnBW",     company: "Borusan Holding",     countryCode: "TR", category: "Enerji", website: "https://www.borusanenbw.com.tr", founded: 2008 },
  { brand: "Aydem Enerji",     company: "Kolin Grubu",         countryCode: "TR", category: "Enerji", website: "https://www.aydem.com.tr",       founded: 2013 },
  { brand: "Enerjisa Üretim",  company: "E.ON SE",             countryCode: "DE", category: "Enerji", website: "https://www.enerjisauretim.com.tr", founded: 2013 },
  { brand: "TPAO",             company: "Türkiye Cumhuriyeti", countryCode: "TR", category: "Enerji", website: "https://www.tpao.gov.tr",        founded: 1954 },

  /* ═══════════════════════════════════════════════════════
     GIDA & İÇECEK — EK MARKALAR
  ═══════════════════════════════════════════════════════ */

  /* Anadolu Efes Grubu */
  { brand: "Anadolu Efes",  company: "Anadolu Grubu", countryCode: "TR", category: "İçecek", website: "https://www.anadoluefes.com",  founded: 1969, employees: 14000 },
  { brand: "Efes Pilsener", company: "Anadolu Efes",  countryCode: "TR", category: "İçecek", website: "https://www.efes.com.tr" },
  { brand: "Bomonti",       company: "Anadolu Efes",  countryCode: "TR", category: "İçecek", notlar: "Türkiye'nin ilk bira markalarından biri; Anadolu Efes bünyesinde üretilmektedir." },
  { brand: "Tuborg TR",     company: "Anadolu Efes",  countryCode: "DK", category: "İçecek", notlar: "Carlsberg Grubu'nun Danimarkalı markası; Türkiye'de Anadolu Efes tarafından lisans sözleşmesiyle üretilmektedir." },

  /* Mey İçki — Diageo */
  { brand: "Yeni Rakı",     company: "Mey İçki (Diageo)", countryCode: "TR", category: "İçecek", website: "https://www.meyickileri.com.tr", founded: 2004, notlar: "Türkiye'nin en yaygın rakı markası. Mey İçki 2011'de İngiliz içki devi Diageo tarafından satın alınmıştır." },
  { brand: "Tekirdağ Rakı", company: "Mey İçki (Diageo)", countryCode: "TR", category: "İçecek", notlar: "Mey İçki bünyesindeki premium rakı markası; Diageo'ya aittir." },
  { brand: "Kulüp Rakı",    company: "Mey İçki (Diageo)", countryCode: "TR", category: "İçecek", notlar: "Mey İçki bünyesindeki ekonomi segmenti rakı markası; Diageo'ya aittir." },

  /* Ferrero Grubu */
  { brand: "Ferrero TR",  company: "Ferrero Group", countryCode: "IT", category: "Gıda", website: "https://www.ferrero.com", founded: 1942, employees: 47000 },
  { brand: "Nutella",     company: "Ferrero Group", countryCode: "IT", category: "Gıda", companyLogo: "/logo/ferrero.svg" },
  { brand: "Kinder",      company: "Ferrero Group", countryCode: "IT", category: "Gıda", companyLogo: "/logo/ferrero.svg" },
  { brand: "Tic Tac",     company: "Ferrero Group", countryCode: "IT", category: "Gıda", companyLogo: "/logo/ferrero.svg" },
  { brand: "Raffaello",   company: "Ferrero Group", countryCode: "IT", category: "Gıda", companyLogo: "/logo/ferrero.svg" },
  { brand: "Rocher",      company: "Ferrero Group", countryCode: "IT", category: "Gıda", companyLogo: "/logo/ferrero.svg" },

  /* Mars Grubu */
  { brand: "Mars TR",    company: "Mars Inc.", countryCode: "US", category: "Gıda", website: "https://www.mars.com", founded: 1911, employees: 140000 },
  { brand: "Snickers",   company: "Mars Inc.", countryCode: "US", category: "Gıda", companyLogo: "/logo/mars.svg" },
  { brand: "Twix",       company: "Mars Inc.", countryCode: "US", category: "Gıda", companyLogo: "/logo/mars.svg" },
  { brand: "M&M's",      company: "Mars Inc.", countryCode: "US", category: "Gıda", companyLogo: "/logo/mars.svg" },
  { brand: "Bounty",     company: "Mars Inc.", countryCode: "US", category: "Gıda", companyLogo: "/logo/mars.svg" },
  { brand: "Milky Way",  company: "Mars Inc.", countryCode: "US", category: "Gıda", companyLogo: "/logo/mars.svg" },
  { brand: "Skittles",   company: "Mars Inc.", countryCode: "US", category: "Gıda", companyLogo: "/logo/mars.svg" },
  { brand: "Orbit",      company: "Mars Inc.", countryCode: "US", category: "Gıda", companyLogo: "/logo/mars.svg" },

  /* Mondelēz Grubu */
  { brand: "Mondelēz TR", company: "Mondelēz International", countryCode: "US", category: "Gıda", website: "https://www.mondelezinternational.com", founded: 2012, employees: 79000 },
  { brand: "Oreo",        company: "Mondelēz International", countryCode: "US", category: "Gıda", companyLogo: "/logo/mondelez.svg" },
  { brand: "Milka",       company: "Mondelēz International", countryCode: "DE", category: "Gıda", companyLogo: "/logo/mondelez.svg" },
  { brand: "Cadbury",     company: "Mondelēz International", countryCode: "GB", category: "Gıda", companyLogo: "/logo/mondelez.svg" },
  { brand: "Toblerone",   company: "Mondelēz International", countryCode: "CH", category: "Gıda", companyLogo: "/logo/mondelez.svg" },
  { brand: "Halls",       company: "Mondelēz International", countryCode: "US", category: "Gıda", companyLogo: "/logo/mondelez.svg" },
  { brand: "Trident",     company: "Mondelēz International", countryCode: "US", category: "Gıda", companyLogo: "/logo/mondelez.svg" },
  { brand: "BelVita",     company: "Mondelēz International", countryCode: "US", category: "Gıda", companyLogo: "/logo/mondelez.svg" },

  /* Danone */
  { brand: "Danone TR",  company: "Danone S.A.", countryCode: "FR", category: "Gıda", website: "https://www.danone.com",  founded: 1919, employees: 100000 },
  { brand: "Activia",    company: "Danone S.A.", countryCode: "FR", category: "Gıda", companyLogo: "/logo/danone.svg" },
  { brand: "Actimel",    company: "Danone S.A.", countryCode: "FR", category: "Gıda", companyLogo: "/logo/danone.svg" },
  { brand: "Aptamil",    company: "Danone S.A.", countryCode: "DE", category: "Gıda", companyLogo: "/logo/danone.svg" },

  /* Heineken */
  { brand: "Heineken TR", company: "Heineken N.V.", countryCode: "NL", category: "İçecek", logo: "/logo/heineken.svg", website: "https://www.heineken.com/tr", founded: 1873, employees: 85000 },
  { brand: "Amstel TR",   company: "Heineken N.V.", countryCode: "NL", category: "İçecek", companyLogo: "/logo/heineken.svg" },

  /* Diğer küresel gıda markaları */
  { brand: "Kellogg's TR",  company: "Kellanova",      countryCode: "US", category: "Gıda", website: "https://www.kelloggs.com.tr",     founded: 1906, employees: 31000 },
  { brand: "Haribo TR",     company: "Haribo GmbH",    countryCode: "DE", category: "Gıda", website: "https://www.haribo.com",          founded: 1920, employees: 7000  },
  { brand: "Dr. Oetker TR", company: "Dr. Oetker",     countryCode: "DE", category: "Gıda", website: "https://www.oetker.com.tr",       founded: 1891, employees: 32000 },
  { brand: "Barilla TR",    company: "Barilla Group",   countryCode: "IT", category: "Gıda", website: "https://www.barilla.com",         founded: 1877, employees: 9000  },
  { brand: "Pringles",      company: "Kellanova",       countryCode: "US", category: "Gıda", companyLogo: "/logo/kelloggs.svg" },
  { brand: "Monster Energy",company: "The Coca-Cola Company", countryCode: "US", category: "İçecek", companyLogo: "/logo/cocacola.svg", website: "https://www.monsterenergy.com", founded: 2002 },
  { brand: "Cappy",         company: "The Coca-Cola Company", countryCode: "TR", category: "İçecek", companyLogo: "/logo/cocacola.svg", notlar: "Türkiye kökenli meyve suyu markası; Coca-Cola şirketi tarafından satın alınmış ve küresel ölçeğe taşınmıştır." },

  /* Türk gıda markaları */
  { brand: "Komili",    company: "Unilever PLC",      countryCode: "TR", category: "Gıda",   website: "https://www.komili.com",           founded: 1896, notlar: "Türkiye'nin köklü zeytinyağı markası; Unilever tarafından satın alınmıştır." },
  { brand: "Tamek",     company: "Koç Holding",       countryCode: "TR", category: "Gıda",   companyLogo: "/logo/kocholding.svg",          website: "https://www.tamek.com.tr",  founded: 1954 },
  { brand: "Nuh'un Ankara Makarnası", company: "Nuh'un Ankara", countryCode: "TR", category: "Gıda", website: "https://www.nuhunankara.com.tr", founded: 1950 },
  { brand: "Doğuş Çay", company: "Doğuş Holding",    countryCode: "TR", category: "İçecek", website: "https://www.doguscay.com.tr",       founded: 2000 },
  { brand: "Yörsan",    company: "Yörsan",            countryCode: "TR", category: "Gıda",   website: "https://www.yorsan.com.tr",         founded: 1967 },
  { brand: "Namet",     company: "Namet Gıda",        countryCode: "TR", category: "Gıda",   website: "https://www.namet.com.tr",          founded: 1945 },
  { brand: "Fersan",    company: "Fersan",            countryCode: "TR", category: "Gıda",   website: "https://www.fersan.com.tr",         founded: 1961 },
  { brand: "Patos",     company: "Eti Bolu",          countryCode: "TR", category: "Gıda",   website: "https://www.etiboluciko.com.tr" },
  { brand: "Mini",      company: "Eti Bolu",          countryCode: "TR", category: "Gıda" },
  { brand: "Yudum",     company: "Yıldız Holding",    countryCode: "TR", category: "Gıda",   website: "https://www.yudum.com.tr",          founded: 1975 },
  { brand: "Kristal",   company: "Yıldız Holding",    countryCode: "TR", category: "Gıda",   website: "https://www.kristal.com.tr",        founded: 1960 },

  /* ═══════════════════════════════════════════════════════
     HOLDİNGLER — EK MARKALAR 2
  ═══════════════════════════════════════════════════════ */
  { brand: "Hayat Holding",    company: "Hayat Holding",    countryCode: "TR", category: "Holding", website: "https://www.hayatholding.com",    founded: 1937, employees: 8000  },
  { brand: "Tekfen Holding",   company: "Tekfen Holding",   countryCode: "TR", category: "Holding", website: "https://www.tekfen.com.tr",       founded: 1956, employees: 15000 },
  { brand: "Kibar Holding",    company: "Kibar Ailesi",     countryCode: "TR", category: "Holding", website: "https://www.kibarholding.com",    founded: 1948 },
  { brand: "Sanko Holding",    company: "Sanko Holding",    countryCode: "TR", category: "Holding", website: "https://www.sanko.com.tr",        founded: 1966, employees: 20000 },
  { brand: "Nurol Holding",    company: "Nurol Holding",    countryCode: "TR", category: "Holding", website: "https://www.nurolholding.com",    founded: 1972 },
  { brand: "Çelikler Holding", company: "Çelikler Holding", countryCode: "TR", category: "Holding", website: "https://www.celiklerholding.com", founded: 1968 },
  { brand: "Tosyalı Holding",  company: "Tosyalı Ailesi",   countryCode: "TR", category: "Holding", website: "https://www.tosyaliholding.com",  founded: 1982, employees: 10000 },
  { brand: "İçdaş",            company: "İçdaş",            countryCode: "TR", category: "Holding", website: "https://www.icdas.com.tr",        founded: 1970, employees: 5000  },
  { brand: "Limak Holding",    company: "Limak Holding",    countryCode: "TR", category: "Holding", website: "https://www.limak.com.tr",        founded: 1976 },
  { brand: "Global Yatırım Holding", company: "Global Yatırım Holding", countryCode: "TR", category: "Holding", website: "https://www.globalyatirimholding.com", founded: 1990 },

  /* ═══════════════════════════════════════════════════════
     MARKET & PERAKENDE — EK MARKALAR 2
  ═══════════════════════════════════════════════════════ */
  { brand: "Sephora TR",    company: "LVMH",              countryCode: "FR", category: "Kozmetik",   logo: "/logo/sephora.svg", website: "https://www.sephora.com.tr",   founded: 1969, employees: 46000 },
  { brand: "Rossmann TR",   company: "Rossmann GmbH",     countryCode: "DE", category: "Kozmetik",   website: "https://www.rossmann.com.tr",   founded: 1972, employees: 56000 },
  { brand: "Intersport TR", company: "Intersport Group",  countryCode: "CH", category: "Perakende",   website: "https://www.intersport.com.tr", founded: 1968 },
  { brand: "Özdilek",       company: "Özdilek Holding",   countryCode: "TR", category: "Perakende",   website: "https://www.ozdilek.com.tr",    founded: 1952 },
  { brand: "Kiler Market",  company: "Kiler Holding",     countryCode: "TR", category: "Süpermarket", website: "https://www.kiler.com.tr",      founded: 1992 },
  { brand: "Seç Market",    company: "Seç Market",        countryCode: "TR", category: "Süpermarket", website: "https://www.secmarket.com.tr",  founded: 2005 },
  { brand: "Hakmar",        company: "Hakmar",            countryCode: "TR", category: "Süpermarket", website: "https://www.hakmar.com.tr",     founded: 1982 },
  { brand: "Uyum Market",   company: "Uyum Market",       countryCode: "TR", category: "Süpermarket", website: "https://www.uyummarket.com.tr", founded: 2003 },
  { brand: "Migros Jet",    company: "Migros Ticaret",    countryCode: "TR", category: "Süpermarket", website: "https://www.migroskuryem.com.tr" },
  { brand: "Hepsijet",      company: "Hepsiburada",       countryCode: "TR", category: "Lojistik",    website: "https://www.hepsiburada.com",   founded: 2019 },
  { brand: "Tarım Kredi Market", company: "Tarım Kredi Kooperatifleri", countryCode: "TR", category: "Süpermarket", website: "https://www.tarimkredi.org.tr", founded: 1863 },
  { brand: "HomeWork",      company: "HomeWork",          countryCode: "TR", category: "Ev & Yaşam",  website: "https://www.homework.com.tr",   founded: 2009 },
  { brand: "Kocataş",       company: "Kocataş Holding",   countryCode: "TR", category: "Ev & Yaşam",  website: "https://www.kocatas.com.tr" },

  /* LVMH Grubu — lüks markalar */
  { brand: "Louis Vuitton TR",  company: "LVMH",          countryCode: "FR", category: "Moda",        website: "https://www.louisvuitton.com",  founded: 1854 },
  { brand: "Dior TR",           company: "LVMH",          countryCode: "FR", category: "Moda",        website: "https://www.dior.com",          founded: 1946 },
  { brand: "Bulgari TR",        company: "LVMH",          countryCode: "IT", category: "Moda",        website: "https://www.bulgari.com",       founded: 1884 },
  { brand: "Givenchy TR",       company: "LVMH",          countryCode: "FR", category: "Moda",        website: "https://www.givenchy.com",      founded: 1952 },
  { brand: "TAG Heuer TR",      company: "LVMH",          countryCode: "CH", category: "Moda",        website: "https://www.tagheuer.com",      founded: 1860 },

  /* Kering Grubu — lüks markalar */
  { brand: "Gucci TR",          company: "Kering S.A.",   countryCode: "IT", category: "Moda",        website: "https://www.gucci.com",         founded: 1921 },
  { brand: "Saint Laurent TR",  company: "Kering S.A.",   countryCode: "FR", category: "Moda",        website: "https://www.ysl.com",           founded: 1961 },
  { brand: "Balenciaga TR",     company: "Kering S.A.",   countryCode: "FR", category: "Moda",        website: "https://www.balenciaga.com",    founded: 1917 },
  { brand: "Bottega Veneta TR", company: "Kering S.A.",   countryCode: "IT", category: "Moda",        website: "https://www.bottegaveneta.com", founded: 1966 },

  /* ═══════════════════════════════════════════════════════
     BANKACILIK & FİNANS — EK MARKALAR 2
  ═══════════════════════════════════════════════════════ */
  { brand: "Türkiye Finans",  company: "Saudi National Bank",  countryCode: "SA", category: "Bankacılık", website: "https://www.turkiyefinans.com.tr", founded: 2005, employees: 4000 },
  { brand: "Odeabank",        company: "Bank Audi SAL",        countryCode: "LB", category: "Bankacılık", website: "https://www.odeabank.com.tr",     founded: 2012 },
  { brand: "Papara",          company: "Papara A.Ş.",          countryCode: "TR", category: "Finans",     website: "https://www.papara.com",         founded: 2016, employees: 1500 },
  { brand: "İyzico",          company: "PayU Group (Naspers)", countryCode: "TR", category: "Finans",     website: "https://www.iyzico.com",         founded: 2013, notlar: "Türk ödeme altyapısı şirketi; Hollanda merkezli Naspers (PayU) tarafından satın alınmıştır." },
  { brand: "BTCTurk",         company: "BTCTurk A.Ş.",         countryCode: "TR", category: "Finans",     website: "https://www.btcturk.com",        founded: 2013, employees: 400  },
  { brand: "Paribu",          company: "Paribu A.Ş.",          countryCode: "TR", category: "Finans",     website: "https://www.paribu.com",         founded: 2017, employees: 500  },
  { brand: "Sipay",           company: "Sipay Elektronik Para",countryCode: "TR", category: "Finans",     website: "https://www.sipay.com.tr",       founded: 2019 },
  { brand: "Param",           company: "Param Finansal Hizmetler", countryCode: "TR", category: "Finans", website: "https://www.param.com.tr",      founded: 2020 },
  { brand: "İş Yatırım",      company: "İş Bankası",           countryCode: "TR", category: "Finans",     website: "https://www.isyatirim.com.tr",   founded: 1996 },
  { brand: "Yapı Kredi Yatırım", company: "Koç Holding",       countryCode: "TR", category: "Finans",     companyLogo: "/logo/kocholding.svg",       website: "https://www.ykyatirim.com.tr", founded: 1991 },
  { brand: "Garanti BBVA Yatırım", company: "BBVA",            countryCode: "ES", category: "Finans",     website: "https://www.garantibbvayatirim.com.tr", founded: 1990 },

  /* ═══════════════════════════════════════════════════════
     HAVAYOLU — EK MARKALAR 2
  ═══════════════════════════════════════════════════════ */
  { brand: "Wizz Air TR",      company: "Wizz Air Holdings",  countryCode: "HU", category: "Havacılık", website: "https://www.wizzair.com",        founded: 2003, employees: 7000 },
  { brand: "Air Arabia TR",    company: "Air Arabia",         countryCode: "AE", category: "Havacılık", website: "https://www.airarabia.com",       founded: 2003 },
  { brand: "Ryanair TR",       company: "Ryanair DAC",        countryCode: "IE", category: "Havacılık", website: "https://www.ryanair.com",         founded: 1984, employees: 21000 },
  { brand: "Turkish Technic",  company: "Türk Hava Yolları", countryCode: "TR", category: "Teknoloji",  companyLogo: "/logo/thy.svg",               website: "https://www.turkishtechnic.com", founded: 2006 },
  { brand: "Atlas Global",     company: "Atlas Global",       countryCode: "TR", category: "Havacılık", website: "https://www.atlasglb.com",        founded: 2001, notlar: "Türk charter havayolu; 2020 yılında iflas ederek faaliyetlerine son vermiştir." },
  { brand: "Tailwind Airlines",company: "Tailwind Airlines",  countryCode: "TR", category: "Havacılık", website: "https://www.tailwindair.com",     founded: 2015 },
  { brand: "ULS Airlines Cargo",company: "ULS Airlines",     countryCode: "TR", category: "Lojistik",   website: "https://www.ulsairlines.com",     founded: 2007 },

  /* ═══════════════════════════════════════════════════════
     ENERJİ — EK MARKALAR 2
  ═══════════════════════════════════════════════════════ */
  { brand: "Zorlu Enerji",     company: "Zorlu Holding",    countryCode: "TR", category: "Enerji", companyLogo: "/logo/zorluholding.svg",  website: "https://www.zorluenerji.com.tr",    founded: 1993, employees: 3000 },
  { brand: "Çalık Enerji",     company: "Çalık Holding",    countryCode: "TR", category: "Enerji", website: "https://www.calikenerji.com",                                                founded: 1999 },
  { brand: "Sanko Enerji",     company: "Sanko Holding",    countryCode: "TR", category: "Enerji", website: "https://www.sankoenerji.com.tr",                                             founded: 2007 },
  { brand: "Enel TR",          company: "Enel S.p.A.",      countryCode: "IT", category: "Enerji", website: "https://www.enel.com",             founded: 1962, employees: 65000 },
  { brand: "Enerya",           company: "Sabancı Holding",  countryCode: "TR", category: "Enerji", companyLogo: "/logo/sabanci.svg",             website: "https://www.enerya.com.tr",       founded: 2014 },
  { brand: "Ngen Enerji",      company: "Global Yatırım Holding", countryCode: "TR", category: "Enerji", website: "https://www.ngen.com.tr",    founded: 2017 },
  { brand: "Limak Enerji",     company: "Limak Holding",    countryCode: "TR", category: "Enerji", website: "https://www.limakenerji.com",                                                founded: 2011 },
  { brand: "Kolin Enerji",     company: "Kolin Grubu",      countryCode: "TR", category: "Enerji", website: "https://www.kolinenerji.com",                                                founded: 2006 },
  { brand: "Naturelgaz",       company: "Naturelgaz",       countryCode: "TR", category: "Enerji", website: "https://www.naturelgaz.com.tr",                                             founded: 2003 },
  { brand: "Brent Doğalgaz",   company: "Brent Enerji",     countryCode: "TR", category: "Enerji", website: "https://www.brentenerji.com.tr" },
  { brand: "EWE TR",           company: "EWE AG",           countryCode: "DE", category: "Enerji", website: "https://www.ewe.com.tr",                                                     founded: 1929 },

  /* ═══════════════════════════════════════════════════════
     GIDA & İÇECEK — EK MARKALAR 2
  ═══════════════════════════════════════════════════════ */

  /* Su markaları */
  { brand: "Sırma",       company: "Sırma Su A.Ş.",   countryCode: "TR", category: "İçecek", website: "https://www.sirma.com.tr",    founded: 1997 },
  { brand: "Erikli",      company: "Nestlé S.A.",      countryCode: "CH", category: "İçecek", companyLogo: "/logo/nestle.svg",        website: "https://www.erikli.com.tr",   founded: 1997, notlar: "Türk kaynak suyu markası; Nestlé tarafından satın alınmıştır." },
  { brand: "Hayat Su",    company: "Hayat Holding",    countryCode: "TR", category: "İçecek", website: "https://www.hayatsu.com.tr",  founded: 2000 },
  { brand: "Damla Su",    company: "Damla Su",         countryCode: "TR", category: "İçecek", website: "https://www.damla.com.tr",    founded: 1997 },
  { brand: "Pınar Su",    company: "Yaşar Holding",    countryCode: "TR", category: "İçecek", website: "https://www.pinar.com.tr",    founded: 1985 },
  { brand: "Çamlıca",     company: "Çamlıca İçecek",  countryCode: "TR", category: "İçecek", website: "https://www.camlicar.com.tr", founded: 1993 },

  /* Şarap & Alkol — Türk markaları */
  { brand: "Kavaklıdere",     company: "Kavaklıdere Şaraplıkları", countryCode: "TR", category: "İçecek", website: "https://www.kavaklidere.com",  founded: 1929 },
  { brand: "Doluca",          company: "Doluca",                   countryCode: "TR", category: "İçecek", website: "https://www.doluca.com",        founded: 1926 },
  { brand: "Tikveşli",        company: "Mey İçki (Diageo)",        countryCode: "TR", category: "İçecek", website: "https://www.tikvesli.com.tr",   founded: 1925, notlar: "Türkiye'nin köklü şarap markalarından biri; Mey İçki (Diageo) bünyesindedir." },
  { brand: "Kayra",           company: "Mey İçki (Diageo)",        countryCode: "TR", category: "İçecek", notlar: "Mey İçki bünyesindeki premium şarap markası; Diageo'ya aittir." },
  { brand: "Vinkara",         company: "Vinkara Bağcılık",         countryCode: "TR", category: "İçecek", website: "https://www.vinkara.com",        founded: 2005 },
  { brand: "Pamukkale",       company: "Pamukkale Şarap",          countryCode: "TR", category: "İçecek", website: "https://www.pamukkalesarap.com", founded: 1962 },

  /* Kahve & sıcak içecek */
  { brand: "Jacobs TR",       company: "JDE Peet's",      countryCode: "NL", category: "İçecek",     website: "https://www.jacobscoffee.com",  founded: 1895, employees: 22000 },
  { brand: "Lavazza TR",      company: "Lavazza Group",   countryCode: "IT", category: "Kahve & Cafe",website: "https://www.lavazza.com.tr",    founded: 1895, employees: 5000  },
  { brand: "Tchibo TR",       company: "Tchibo GmbH",     countryCode: "DE", category: "Kahve & Cafe",website: "https://www.tchibo.com.tr",     founded: 1949, employees: 12000 },
  { brand: "Selamlique",      company: "Selamlique",      countryCode: "TR", category: "Kahve & Cafe",website: "https://www.selamlique.com",    founded: 2011 },
  { brand: "Arçelik Kahve",   company: "Koç Holding",     countryCode: "TR", category: "Kahve & Cafe", companyLogo: "/logo/kocholding.svg" },

  /* Çikolata & şekerleme */
  { brand: "Lindt TR",        company: "Lindt & Sprüngli",countryCode: "CH", category: "Gıda",    website: "https://www.lindt.com.tr",   founded: 1845, employees: 15000 },
  { brand: "Toffy's",         company: "ETi Bolu",         countryCode: "TR", category: "Gıda" },
  { brand: "Albeni",          company: "Ülker / Yıldız",  countryCode: "TR", category: "Gıda" },
  { brand: "Dankek",          company: "Yıldız Holding",  countryCode: "TR", category: "Gıda",    website: "https://www.dankek.com.tr", founded: 1990 },
  { brand: "Çizmeci",         company: "Çizmeci",          countryCode: "TR", category: "Gıda",    website: "https://www.cizmeci.com.tr",founded: 1970 },

  /* Mars — ev hayvanı ve diğer ürünler */
  { brand: "Pedigree",    company: "Mars Inc.", countryCode: "US", category: "Gıda",  companyLogo: "/logo/mars.svg" },
  { brand: "Whiskas",     company: "Mars Inc.", countryCode: "US", category: "Gıda",  companyLogo: "/logo/mars.svg" },
  { brand: "Sheba",       company: "Mars Inc.", countryCode: "US", category: "Gıda",  companyLogo: "/logo/mars.svg" },
  { brand: "Uncle Ben's", company: "Mars Inc.", countryCode: "US", category: "Gıda",  companyLogo: "/logo/mars.svg" },
  { brand: "Dolmio",      company: "Mars Inc.", countryCode: "AU", category: "Gıda",  companyLogo: "/logo/mars.svg" },

  /* Nestlé — hayvan maması ve diğer */
  { brand: "Purina",    company: "Nestlé S.A.", countryCode: "US", category: "Gıda", companyLogo: "/logo/nestle.svg" },
  { brand: "Felix",     company: "Nestlé S.A.", countryCode: "CH", category: "Gıda", companyLogo: "/logo/nestle.svg" },
  { brand: "Friskies",  company: "Nestlé S.A.", countryCode: "US", category: "Gıda", companyLogo: "/logo/nestle.svg" },

  /* İlaç & Sağlık */
  { brand: "Bayer TR",       company: "Bayer AG",       countryCode: "DE", category: "İlaç",  website: "https://www.bayer.com.tr",      founded: 1863, employees: 100000 },
  { brand: "Novartis TR",    company: "Novartis AG",    countryCode: "CH", category: "İlaç",  website: "https://www.novartis.com.tr",   founded: 1996, employees: 108000 },
  { brand: "Pfizer TR",      company: "Pfizer Inc.",    countryCode: "US", category: "İlaç",  website: "https://www.pfizer.com.tr",     founded: 1849, employees: 83000  },
  { brand: "Sanofi TR",      company: "Sanofi S.A.",    countryCode: "FR", category: "İlaç",  website: "https://www.sanofi.com.tr",     founded: 1973, employees: 91000  },
  { brand: "Roche TR",       company: "Roche AG",       countryCode: "CH", category: "İlaç",  website: "https://www.roche.com.tr",      founded: 1896, employees: 100000 },
  { brand: "AstraZeneca TR", company: "AstraZeneca PLC",countryCode: "GB", category: "İlaç",  website: "https://www.astrazeneca.com.tr",founded: 1999, employees: 83000  },
  { brand: "Sandoz TR",      company: "Sandoz AG",      countryCode: "CH", category: "İlaç",  website: "https://www.sandoz.com.tr",     founded: 1886 },
  { brand: "Deva Holding",   company: "Deva Holding",   countryCode: "TR", category: "İlaç",  website: "https://www.deva.com.tr",       founded: 1958, employees: 4000  },
  { brand: "Sanovel",        company: "Sanovel İlaç",   countryCode: "TR", category: "İlaç",  website: "https://www.sanovel.com.tr",    founded: 1968 },
  { brand: "İE Ulagay",      company: "İE Ulagay",      countryCode: "TR", category: "İlaç",  website: "https://www.ieulagay.com.tr",   founded: 1948 },

  /* Makarna, tahıl & temel gıda */
  { brand: "Piyale",          company: "Piyale A.Ş.",     countryCode: "TR", category: "Gıda",  website: "https://www.piyale.com.tr",     founded: 1939 },
  { brand: "Filiz Makarna",   company: "Yıldız Holding",  countryCode: "TR", category: "Gıda",  website: "https://www.filizmakarna.com.tr",founded: 1977 },
  { brand: "Sunar",           company: "Yıldız Holding",  countryCode: "TR", category: "Gıda",  website: "https://www.sunar.com.tr",       founded: 1980 },
  { brand: "Barilla TR",      company: "Barilla Group",   countryCode: "IT", category: "Gıda",  website: "https://www.barilla.com",        founded: 1877, employees: 9000 },
  { brand: "Pringles",        company: "Kellanova",        countryCode: "US", category: "Gıda",  website: "https://www.pringles.com",       founded: 1968 },
  { brand: "Biscolata",       company: "Şölen Çikolata",  countryCode: "TR", category: "Gıda",  website: "https://www.biscolata.com",      founded: 2001 },
  { brand: "Tukaş",           company: "Koç Holding",     countryCode: "TR", category: "Gıda",  companyLogo: "/logo/kocholding.svg",       website: "https://www.tukas.com.tr",   founded: 1960 },
  { brand: "Superfresh",      company: "Yıldız Holding",  countryCode: "TR", category: "Gıda",  website: "https://www.superfresh.com.tr",  founded: 1998 },
  { brand: "Algida Carte D'Or",company: "Unilever PLC",   countryCode: "FR", category: "Gıda",  companyLogo: "/logo/unilever.svg" },
];

export default localBrands;
