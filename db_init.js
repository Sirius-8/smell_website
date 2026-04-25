const fs = require('fs');

const dbPath = 'db.json';

const initialData = {
  ESANSLAR: [
    { ESANS_ID: 1, ESANS_AD: 'Midnight Rose', KATEGORI: 'Kadın', ACIKLAMA: 'Zengin gül ve amber notaları', RENK_KODU: '#800080', BIRIM_FIYAT: 450.00, STOK_MIKTARI: 100, OLUSTURMA_TARIHI: new Date() },
    { ESANS_ID: 2, ESANS_AD: 'Deep Ocean', KATEGORI: 'Erkek', ACIKLAMA: 'Ferah deniz ve odunsu notalar', RENK_KODU: '#000080', BIRIM_FIYAT: 420.00, STOK_MIKTARI: 80, OLUSTURMA_TARIHI: new Date() },
    { ESANS_ID: 3, ESANS_AD: 'Bergamot Dream', KATEGORI: 'Unisex', ACIKLAMA: 'Narenciye ve ferahlatıcı etki', RENK_KODU: '#00FF00', BIRIM_FIYAT: 380.00, STOK_MIKTARI: 50, OLUSTURMA_TARIHI: new Date() }
  ],
  KAMPANYALAR: [
    { KAMPANYA_ID: 1, KAMPANYA_AD: 'Anneler Günü', ACIKLAMA: 'Tüm kadın parfümlerinde 1 alana 1 bedava', INDIRIM_ORANI: 50, BASLANGIC_TARIHI: new Date(), BITIS_TARIHI: null, AKTIF_MI: 'E' }
  ],
  KULLANICILAR: [],
  ODEME: [],
  URUNLER: [
    { URUN_ID: 1, URUN_AD: 'Noir Wood', ACİK_LAMA: 'Sedir %40 · Amber %35 · Misk %25', FIYAT: 2000.00, CINSIYET_KATEGORI: 'Erkek', KOKU_PROFILI: 'Odunsu', RESIM_URL: 'pop1-canvas', OLUSTURMA_TARIHI: new Date() },
    { URUN_ID: 2, URUN_AD: 'Spicy Amber', ACİK_LAMA: 'Amber %50 · Biber %30 · Vetiver %20', FIYAT: 3990.00, CINSIYET_KATEGORI: 'Erkek', KOKU_PROFILI: 'Baharatlı', RESIM_URL: 'pop2-canvas', OLUSTURMA_TARIHI: new Date() },
    { URUN_ID: 3, URUN_AD: 'Ocean Vetiver', ACİK_LAMA: 'Vetiver %45 · Bergamot %35 · Misk %20', FIYAT: 2650.00, CINSIYET_KATEGORI: 'Erkek', KOKU_PROFILI: 'Ferah', RESIM_URL: 'pop3-canvas', OLUSTURMA_TARIHI: new Date() },
    { URUN_ID: 4, URUN_AD: 'Royal Sandal', ACİK_LAMA: 'Sandal %50 · Amber %30 · Sedir %20', FIYAT: 2989.00, CINSIYET_KATEGORI: 'Erkek', KOKU_PROFILI: 'Klasik', RESIM_URL: 'pop4-canvas', OLUSTURMA_TARIHI: new Date() },
    { URUN_ID: 5, URUN_AD: 'Romantic Rose', ACİK_LAMA: 'Gül %40 · Yasemin %35 · Vanilya %25', FIYAT: 2990.00, CINSIYET_KATEGORI: 'Kadın', KOKU_PROFILI: 'Çiçeksi', RESIM_URL: 'pop1-canvas', OLUSTURMA_TARIHI: new Date() },
    { URUN_ID: 6, URUN_AD: 'Fresh Morning', ACİK_LAMA: 'Bergamot %50 · Manolya %30 · Misk %20', FIYAT: 3400.00, CINSIYET_KATEGORI: 'Kadın', KOKU_PROFILI: 'Ferah', RESIM_URL: 'pop2-canvas', OLUSTURMA_TARIHI: new Date() },
    { URUN_ID: 7, URUN_AD: 'Lavender Dream', ACİK_LAMA: 'Lavanta %45 · Bergamot %35 · Misk %20', FIYAT: 2000.00, CINSIYET_KATEGORI: 'Kadın', KOKU_PROFILI: 'Çiçeksi', RESIM_URL: 'pop3-canvas', OLUSTURMA_TARIHI: new Date() },
    { URUN_ID: 8, URUN_AD: 'Sweet Vanilla', ACİK_LAMA: 'Vanilya %50 · Gül %30 · Sandal %20', FIYAT: 2999.00, CINSIYET_KATEGORI: 'Kadın', KOKU_PROFILI: 'Tatlı', RESIM_URL: 'pop4-canvas', OLUSTURMA_TARIHI: new Date() }
  ],
  OLUSTURULAN_KOKULAR: [],
  SEPET: [],
  SIPARISLER: [],
  SIPARIS_DURUMU: [],
  FAVORILER: []
};

if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
  console.log('Veritabanı (JSON) başarıyla oluşturuldu.');
} else {
  console.log('Veritabanı zaten mevcut.');
}
