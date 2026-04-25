const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const config = require('./config');

const app = express();
const port = 3000;
const dbPath = 'db.json';

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './')));

// Helper functions for JSON DB
const readDB = () => JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

// Helper for Oracle REST Calls
const oracleFetch = async (endpoint, method = 'GET', data = null) => {
  if (config.dbMode !== 'ORACLE' || !config.oracleBaseUrl) return null;
  
  try {
    const response = await axios({
      url: `${config.oracleBaseUrl}${endpoint}`,
      method,
      data,
      auth: {
        username: config.oracleUser,
        password: config.oraclePass
      }
    });
    return response.data.items || response.data;
  } catch (error) {
    console.error(`Oracle Error (${endpoint}):`, error.message);
    return null;
  }
};

// --- ESANSLAR API ---
app.get('/api/esanslar', async (req, res) => {
  if (config.dbMode === 'ORACLE') {
    const data = await oracleFetch('ESANSLAR');
    if (data) return res.json(data);
  }
  
  const db = readDB();
  const category = req.query.kategori;
  let esanslar = db.ESANSLAR;
  if (category) {
    esanslar = esanslar.filter(e => e.KATEGORI.toLowerCase() === category.toLowerCase());
  }
  res.json(esanslar);
});

// --- URUNLER API ---
app.get('/api/urunler', async (req, res) => {
  if (config.dbMode === 'ORACLE') {
    const data = await oracleFetch('URUNLER');
    if (data) return res.json(data);
  }

  const db = readDB();
  const category = req.query.kategori;
  let urunler = db.URUNLER;
  if (category) {
    urunler = urunler.filter(u => u.CINSIYET_KATEGORI.toLowerCase() === category.toLowerCase());
  }
  res.json(urunler);
});

// --- KAMPANYALAR API ---
app.get('/api/kampanyalar', async (req, res) => {
  if (config.dbMode === 'ORACLE') {
    const data = await oracleFetch('KAMPANYALAR');
    if (data) return res.json(data.filter(k => k.AKTIF_MI === 'E'));
  }

  const db = readDB();
  const kampanyalar = db.KAMPANYALAR.filter(k => k.AKTIF_MI === 'E');
  res.json(kampanyalar);
});

// --- KULLANICILAR API ---
app.post('/api/auth/register', async (req, res) => {
  const { ad, soyad, eposta, sifre } = req.body;

  if (config.dbMode === 'ORACLE') {
    const result = await oracleFetch('KULLANICILAR', 'POST', { AD: ad, SOYAD: soyad, EPOSTA: eposta, SIFRE: sifre });
    if (result) return res.json({ success: true });
  }

  const db = readDB();
  if (db.KULLANICILAR.find(u => u.EPOSTA === eposta)) {
    return res.status(400).json({ success: false, message: 'Bu e-posta adresi zaten kullanımda.' });
  }
  const newUser = {
    KULLANICI_ID: db.KULLANICILAR.length + 1,
    AD: ad, SOYAD: soyad, EPOSTA: eposta, SIFRE: sifre, KAYIT_TARIHI: new Date()
  };
  db.KULLANICILAR.push(newUser);
  writeDB(db);
  res.json({ success: true, userId: newUser.KULLANICI_ID });
});

app.post('/api/auth/login', async (req, res) => {
  const { eposta, sifre } = req.body;

  if (config.dbMode === 'ORACLE') {
    const users = await oracleFetch(`KULLANICILAR?q={"EPOSTA":"${eposta}","SIFRE":"${sifre}"}`);
    if (users && users.length > 0) {
      const user = users[0];
      return res.json({ success: true, user: { id: user.KULLANICI_ID, ad: user.AD, soyad: user.SOYAD, eposta: user.EPOSTA } });
    }
  }

  const db = readDB();
  const user = db.KULLANICILAR.find(u => u.EPOSTA === eposta && u.SIFRE === sifre);
  if (user) {
    res.json({ success: true, user: { id: user.KULLANICI_ID, ad: user.AD, soyad: user.SOYAD, eposta: user.EPOSTA } });
  } else {
    res.status(401).json({ success: false, message: 'Geçersiz e-posta veya şifre.' });
  }
});

// --- SEPET API ---
app.get('/api/sepet/:userId', async (req, res) => {
  if (config.dbMode === 'ORACLE') {
    const data = await oracleFetch(`SEPET?q={"KULLANICI_ID":${req.params.userId}}`);
    if (data) return res.json(data);
  }
  const db = readDB();
  const userSepet = db.SEPET.filter(s => s.KULLANICI_ID == req.params.userId);
  const detailedSepet = userSepet.map(s => {
    const product = db.URUNLER.find(u => u.URUN_ID == s.URUN_ID);
    return { ...s, product };
  });
  res.json(detailedSepet);
});

app.post('/api/sepet/ekle', async (req, res) => {
  const { kullaniciId, urunId, adet } = req.body;
  if (config.dbMode === 'ORACLE') {
    const result = await oracleFetch('SEPET', 'POST', { KULLANICI_ID: kullaniciId, URUN_ID: urunId, ADET: adet || 1 });
    if (result) return res.json({ success: true });
  }
  const db = readDB();
  const newItem = {
    SEPET_ID: db.SEPET.length + 1,
    KULLANICI_ID: kullaniciId, URUN_ID: urunId, ADET: adet || 1, EKLEME_TARIHI: new Date()
  };
  db.SEPET.push(newItem);
  writeDB(db);
  res.json({ success: true, sepetId: newItem.SEPET_ID });
});

app.delete('/api/sepet/:sepetId', async (req, res) => {
  if (config.dbMode === 'ORACLE') {
    await oracleFetch(`SEPET/${req.params.sepetId}`, 'DELETE');
    return res.json({ success: true });
  }
  const db = readDB();
  const index = db.SEPET.findIndex(s => s.SEPET_ID == req.params.sepetId);
  if (index !== -1) {
    db.SEPET.splice(index, 1);
    writeDB(db);
  }
  res.json({ success: true });
});

app.patch('/api/sepet/:sepetId', async (req, res) => {
  const { adet } = req.body;
  if (config.dbMode === 'ORACLE') {
    await oracleFetch(`SEPET/${req.params.sepetId}`, 'PATCH', { ADET: adet });
    return res.json({ success: true });
  }
  const db = readDB();
  const index = db.SEPET.findIndex(s => s.SEPET_ID == req.params.sepetId);
  if (index !== -1) {
    db.SEPET[index].ADET = adet;
    writeDB(db);
  }
  res.json({ success: true });
});

// --- FAVORILER API ---
app.get('/api/favoriler/:userId', async (req, res) => {
  if (config.dbMode === 'ORACLE') {
    const favs = await oracleFetch(`FAVORILER?q={"KULLANICI_ID":${req.params.userId}}`);
    if (favs) {
       // Ürün detaylarını da çekmek gerekebilir, Oracle tarafında JOIN'li bir view varsa çok daha iyi olur
       return res.json(favs);
    }
  }
  const db = readDB();
  const userFavs = db.FAVORILER.filter(f => f.KULLANICI_ID == req.params.userId);
  const detailedFavs = userFavs.map(f => {
    const product = db.URUNLER.find(u => u.URUN_ID == f.URUN_ID);
    return { ...f, product };
  });
  res.json(detailedFavs);
});

app.post('/api/favoriler/toggle', async (req, res) => {
  const { kullaniciId, urunId } = req.body;
  
  if (config.dbMode === 'ORACLE') {
    // Önce var mı diye kontrol et (Veya Oracle tarafında bir procedure çağrılabilir)
    const existing = await oracleFetch(`FAVORILER?q={"KULLANICI_ID":${kullaniciId},"URUN_ID":${urunId}}`);
    if (existing && existing.length > 0) {
      // Varsa sil
      await oracleFetch(`FAVORILER/${existing[0].FAV_ID}`, 'DELETE');
      return res.json({ success: true, action: 'removed' });
    } else {
      // Yoksa ekle
      await oracleFetch('FAVORILER', 'POST', { KULLANICI_ID: kullaniciId, URUN_ID: urunId });
      return res.json({ success: true, action: 'added' });
    }
  }

  const db = readDB();
  const index = db.FAVORILER.findIndex(f => f.KULLANICI_ID == kullaniciId && f.URUN_ID == urunId);
  if (index === -1) {
    const newFav = { FAV_ID: db.FAVORILER.length + 1, KULLANICI_ID: kullaniciId, URUN_ID: urunId, EKLENME_TARIHI: new Date() };
    db.FAVORILER.push(newFav);
    writeDB(db);
    res.json({ success: true, action: 'added' });
  } else {
    db.FAVORILER.splice(index, 1);
    writeDB(db);
    res.json({ success: true, action: 'removed' });
  }
});

// --- SIPARISLER API ---
app.post('/api/siparisler/olustur', async (req, res) => {
  const { kullaniciId, toplamTutar, teslimatAdresi } = req.body;

  if (config.dbMode === 'ORACLE') {
    const result = await oracleFetch('SIPARISLER', 'POST', { KULLANICI_ID: kullaniciId, TOPLAM_TUTAR: toplamTutar, TESLIMAT_ADRESI: teslimatAdresi, SIPARIS_DURUMU: 'ONAY BEKLIYOR' });
    if (result) return res.json({ success: true });
  }

  const db = readDB();
  const newOrder = {
    SIPARIS_ID: db.SIPARISLER.length + 1,
    KULLANICI_ID: kullaniciId, SIPARIS_TARIHI: new Date(), TOPLAM_TUTAR: toplamTutar, TESLIMAT_ADRESI: teslimatAdresi, SIPARIS_DURUMU: 'ONAY BEKLIYOR'
  };
  db.SIPARISLER.push(newOrder);
  db.SIPARIS_DURUMU.push({
    DURUM_ID: db.SIPARIS_DURUMU.length + 1, SIPARIS_ID: newOrder.SIPARIS_ID, DURUM_METNI: 'ONAY BEKLIYOR', ACIKLAMA: 'Siparişiniz alındı ve onay bekliyor.', GUNCELLEME_TARIHI: new Date()
  });
  writeDB(db);
  res.json({ success: true, siparisId: newOrder.SIPARIS_ID });
});

// --- OLUSTURULAN KOKULAR API ---
app.post('/api/kokular/kaydet', async (req, res) => {
  const { kullaniciId, kokuAdi, aciklama, toplamHacim, fiyat } = req.body;

  if (config.dbMode === 'ORACLE') {
    const result = await oracleFetch('OLUSTURULAN_KOKULAR', 'POST', { KULLANICI_ID: kullaniciId, KOKU_ADI: kokuAdi, ACIKLAMA: aciklama, TOPLAM_HACIM: toplamHacim, TAHMINI_FIYAT: fiyat });
    if (result) return res.json({ success: true });
  }

  const db = readDB();
  const newScent = {
    KOKU_ID: db.OLUSTURULAN_KOKULAR.length + 1,
    KULLANICI_ID: kullaniciId, KOKU_ADI: kokuAdi, ACIKLAMA: aciklama, TOPLAM_HACIM: toplamHacim, TAHMINI_FIYAT: fiyat, OLUSTURMA_TARIHI: new Date()
  };
  db.OLUSTURULAN_KOKULAR.push(newScent);
  writeDB(db);
  res.json({ success: true, kokuId: newScent.KOKU_ID });
});

// --- ODEME API ---
app.post('/api/odemeler', async (req, res) => {
  const { siparisId, odemeYontemi, odemeTutari } = req.body;

  if (config.dbMode === 'ORACLE') {
    const result = await oracleFetch('ODEME', 'POST', { SIPARIS_ID: siparisId, ODEME_YONTEMI: odemeYontemi, ODEME_TUTARI: odemeTutari, ODEME_DURUMU: 'TAMAMLANDI' });
    if (result) return res.json({ success: true });
  }

  const db = readDB();
  const newPayment = {
    ODEME_ID: db.ODEME.length + 1,
    SIPARIS_ID: siparisId, ODEME_TARIHI: new Date(), ODEME_YONTEMI: odemeYontemi, ODEME_TUTARI: odemeTutari, ODEME_DURUMU: 'TAMAMLANDI'
  };
  db.ODEME.push(newPayment);
  writeDB(db);
  res.json({ success: true, odemeId: newPayment.ODEME_ID });
});

app.listen(port, () => {
  console.log(`Essencia sunucusu http://localhost:${port} adresinde çalışıyor.`);
});
