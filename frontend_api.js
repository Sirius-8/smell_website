const API_BASE_URL = 'http://localhost:3000/api';

const api = {
  // Esanslar (Ürünler)
  async getEsanslar(kategori) {
    let url = `${API_BASE_URL}/esanslar`;
    if (kategori) url += `?kategori=${kategori}`;
    const response = await fetch(url);
    return response.json();
  },

  // Kampanyalar
  async getKampanyalar() {
    const response = await fetch(`${API_BASE_URL}/kampanyalar`);
    return response.json();
  },

  // Kullanıcı Kayıt
  async register(ad, soyad, eposta, sifre) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ad, soyad, eposta, sifre })
    });
    return response.json();
  },

  // Kullanıcı Giriş
  async login(eposta, sifre) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eposta, sifre })
    });
    return response.json();
  },

  // Ürünler
  async getUrunler(kategori) {
    let url = `${API_BASE_URL}/urunler`;
    if (kategori) url += `?kategori=${kategori}`;
    const response = await fetch(url);
    return response.json();
  },

  // Sepet İşlemleri
  async getSepet(userId) {
    const response = await fetch(`${API_BASE_URL}/sepet/${userId}`);
    return response.json();
  },

  async addToCart(kullaniciId, urunId, adet) {
    const response = await fetch(`${API_BASE_URL}/sepet/ekle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kullaniciId, urunId, adet })
    });
    return response.json();
  },

  async removeFromCart(sepetId) {
    const response = await fetch(`${API_BASE_URL}/sepet/${sepetId}`, {
      method: 'DELETE'
    });
    return response.json();
  },

  async updateCartQuantity(sepetId, adet) {
    const response = await fetch(`${API_BASE_URL}/sepet/${sepetId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adet })
    });
    return response.json();
  },

  // Sipariş İşlemleri
  async createOrder(kullaniciId, toplamTutar, teslimatAdresi) {
    const response = await fetch(`${API_BASE_URL}/siparisler/olustur`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kullaniciId, toplamTutar, teslimatAdresi })
    });
    return response.json();
  },

  // Özel Koku Kaydetme
  async saveCustomScent(kullaniciId, kokuAdi, aciklama, toplamHacim, fiyat) {
    const response = await fetch(`${API_BASE_URL}/kokular/kaydet`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kullaniciId, kokuAdi, aciklama, toplamHacim, fiyat })
    });
    return response.json();
  },

  // Favori İşlemleri
  async getFavorites(userId) {
    const response = await fetch(`${API_BASE_URL}/favoriler/${userId}`);
    return response.json();
  },

  async toggleFavorite(kullaniciId, urunId) {
    const response = await fetch(`${API_BASE_URL}/favoriler/toggle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kullaniciId, urunId })
    });
    return response.json();
  },

  // Ödeme İşlemi
  async createPayment(siparisId, odemeYontemi, odemeTutari) {
    const response = await fetch(`${API_BASE_URL}/odemeler`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ siparisId, odemeYontemi, odemeTutari })
    });
    return response.json();
  }
};

window.essenciaApi = api;
