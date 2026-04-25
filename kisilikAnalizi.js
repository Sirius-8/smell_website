const CATEGORIES = {
  floral: {
    label: '🌸 Floral',
    color: '#d4689a',
    bgColor: '#fdf0f6',
    typeName: 'Çiçeksi Ruh',
    desc: 'Siz romantik, nazik ve sıcak kalpli birisiniz. Güzelliği her yerde bulur, ilişkilerinize büyük önem verirsiniz. Etrafınızdakileri çiçek gibi büyütür, onlara ilham verirsiniz.',
    insight: 'Tıpkı bir gül bahçesi gibi — her koşulda güzelliğini korur, etrafına ferahlık verirsiniz.',
    perfumes: [
      { isim: 'Rose Velvet', notalar: 'Gül · Şakayık · Misk', renk: '#e8a0b8' },
      { isim: 'Jardin Secret', notalar: 'Yasemin · Bergamot · Sandal', renk: '#d4689a' },
      { isim: 'Petal Dusk', notalar: 'Lilas · Vanilya · Amber', renk: '#c8a0c0' }
    ],
    essencesFemale: [
      { isim: 'Gül', oran: 30, renk: '#e8709a' },
      { isim: 'Yasemin', oran: 20, renk: '#d4a0c0' },
      { isim: 'Manolya', oran: 15, renk: '#f8d0e0' },
      { isim: 'Vanilya', oran: 10, renk: '#f0e0c0' },
      { isim: 'Lavanta', oran: 8, renk: '#a080c0' },
      { isim: 'Bergamot', oran: 7, renk: '#70c060' },
      { isim: 'Misk', oran: 5, renk: '#c890b0' },
      { isim: 'Sandal Ağacı', oran: 5, renk: '#a07850' }
    ],
    essencesMale: [
      { isim: 'Bergamot', oran: 25, renk: '#70c060' },
      { isim: 'Misk', oran: 20, renk: '#c890b0' },
      { isim: 'Sandal Ağacı', oran: 15, renk: '#a07850' },
      { isim: 'Sedir Ağacı', oran: 12, renk: '#52a875' },
      { isim: 'Amber', oran: 10, renk: '#c87840' },
      { isim: 'Vetiver', oran: 8, renk: '#708060' },
      { isim: 'Siyah Biber', oran: 5, renk: '#404040' },
      { isim: 'Hardal', oran: 5, renk: '#d4a040' }
    ]
  },

  fresh: {
    label: '🌿 Fresh',
    color: '#52a875',
    bgColor: '#f0faf4',
    typeName: 'Özgür Ruh',
    desc: 'Doğayla iç içe, enerjik ve özgürlükçü birisiniz. Hayatı tam anlamıyla yaşar, yeni deneyimlere açık olursunuz. Taze bakış açınızla etrafınıza enerji yayarsınız.',
    insight: 'Sabah çiğiyle uyanan bir yaprak gibi — her güne taze ve meraklı başlarsınız.',
    perfumes: [
      { isim: 'Ocean Breeze', notalar: 'Bergamot · Deniz Tuzu · Sedir', renk: '#70c090' },
      { isim: 'Verde Luce', notalar: 'Limon · Nane · Vetiver', renk: '#52a875' },
      { isim: 'Morning Dew', notalar: 'Yeşil Çay · Bambu · Misk', renk: '#90c8a0' }
    ],
    essencesFemale: [
      { isim: 'Bergamot', oran: 30, renk: '#70c060' },
      { isim: 'Lavanta', oran: 18, renk: '#a080c0' },
      { isim: 'Yasemin', oran: 15, renk: '#d4a0c0' },
      { isim: 'Gül', oran: 12, renk: '#e8709a' },
      { isim: 'Manolya', oran: 10, renk: '#f8d0e0' },
      { isim: 'Vanilya', oran: 5, renk: '#f0e0c0' },
      { isim: 'Misk', oran: 5, renk: '#c890b0' },
      { isim: 'Sandal Ağacı', oran: 5, renk: '#a07850' }
    ],
    essencesMale: [
      { isim: 'Bergamot', oran: 30, renk: '#70c060' },
      { isim: 'Vetiver', oran: 20, renk: '#708060' },
      { isim: 'Sedir Ağacı', oran: 15, renk: '#52a875' },
      { isim: 'Misk', oran: 12, renk: '#c890b0' },
      { isim: 'Amber', oran: 8, renk: '#c87840' },
      { isim: 'Siyah Biber', oran: 7, renk: '#404040' },
      { isim: 'Sandal Ağacı', oran: 5, renk: '#a07850' },
      { isim: 'Hardal', oran: 3, renk: '#d4a040' }
    ]
  },

  woody: {
    label: '🖤 Woody',
    color: '#7a5c3a',
    bgColor: '#faf6f0',
    typeName: 'Gizemli Ruh',
    desc: 'Derin, güçlü ve sofistike birisiniz. Kelimelerden çok eylemlerle konuşur, her odaya girdiğinizde fark edilirsiniz. Gizemli yapınız insanları size çeker.',
    insight: 'Eski bir orman gibi — yıllar içinde derinleşmiş, her katmanında yeni bir sır barındırırsınız.',
    perfumes: [
      { isim: 'Dark Oud', notalar: 'Oud · Duman · Amber', renk: '#8a6040' },
      { isim: 'Noir Forêt', notalar: 'Sedir · Vetiver · Deri', renk: '#6a4828' },
      { isim: 'Shadow Wood', notalar: 'Sandal · Kahve · Misk', renk: '#a07850' }
    ],
    essencesFemale: [
      { isim: 'Sandal Ağacı', oran: 28, renk: '#a07850' },
      { isim: 'Misk', oran: 22, renk: '#c890b0' },
      { isim: 'Bergamot', oran: 15, renk: '#70c060' },
      { isim: 'Vanilya', oran: 12, renk: '#f0e0c0' },
      { isim: 'Lavanta', oran: 8, renk: '#a080c0' },
      { isim: 'Yasemin', oran: 7, renk: '#d4a0c0' },
      { isim: 'Gül', oran: 5, renk: '#e8709a' },
      { isim: 'Manolya', oran: 5, renk: '#f8d0e0' }
    ],
    essencesMale: [
      { isim: 'Sedir Ağacı', oran: 30, renk: '#52a875' },
      { isim: 'Sandal Ağacı', oran: 22, renk: '#a07850' },
      { isim: 'Vetiver', oran: 15, renk: '#708060' },
      { isim: 'Siyah Biber', oran: 10, renk: '#404040' },
      { isim: 'Amber', oran: 10, renk: '#c87840' },
      { isim: 'Misk', oran: 8, renk: '#c890b0' },
      { isim: 'Bergamot', oran: 3, renk: '#70c060' },
      { isim: 'Hardal', oran: 2, renk: '#d4a040' }
    ]
  },

  oriental: {
    label: '🕯️ Oriental',
    color: '#c87840',
    bgColor: '#fdf8f0',
    typeName: 'Sıcak Ruh',
    desc: 'Sarmaleyici, huzur verici ve karizmatik birisiniz. İnsanları kendinize çeken bir sıcaklığınız var. Evinizi ve çevrenizi konforlu bir sığınak haline getirirsiniz.',
    insight: 'Amber\'in altın ışığı gibi — içine girdiğiniz her ortamı yumuşatır, sıcaklığınızla doldurursunuz.',
    perfumes: [
      { isim: 'Ambre Soleil', notalar: 'Amber · Vanilya · Sandal', renk: '#e09050' },
      { isim: 'Mystic Spice', notalar: 'Tarçın · Oud · Misk', renk: '#c87840' },
      { isim: 'Golden Hour', notalar: 'Bal · Benzoin · Gül', renk: '#d4a060' }
    ],
    essencesFemale: [
      { isim: 'Vanilya', oran: 30, renk: '#f0e0c0' },
      { isim: 'Sandal Ağacı', oran: 22, renk: '#a07850' },
      { isim: 'Misk', oran: 15, renk: '#c890b0' },
      { isim: 'Gül', oran: 10, renk: '#e8709a' },
      { isim: 'Lavanta', oran: 8, renk: '#a080c0' },
      { isim: 'Yasemin', oran: 7, renk: '#d4a0c0' },
      { isim: 'Bergamot', oran: 5, renk: '#70c060' },
      { isim: 'Manolya', oran: 3, renk: '#f8d0e0' }
    ],
    essencesMale: [
      { isim: 'Amber', oran: 30, renk: '#c87840' },
      { isim: 'Sedir Ağacı', oran: 18, renk: '#52a875' },
      { isim: 'Misk', oran: 15, renk: '#c890b0' },
      { isim: 'Sandal Ağacı', oran: 12, renk: '#a07850' },
      { isim: 'Siyah Biber', oran: 10, renk: '#404040' },
      { isim: 'Hardal', oran: 8, renk: '#d4a040' },
      { isim: 'Vetiver', oran: 5, renk: '#708060' },
      { isim: 'Bergamot', oran: 2, renk: '#70c060' }
    ]
  }
};

let selectedGender = null;
let currentQ = 0;
const totalQ = 8;
const answers = {};

function selectGender(gender, btn) {
  selectedGender = gender;

  document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');

  document.getElementById('quiz-container').style.display = 'block';
  document.getElementById('quiz-container').scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });

  if (gender === 'male') {
    document.getElementById('progress-fill').style.background = 'linear-gradient(90deg, var(--masc), #5090d0)';
    document.getElementById('btn-next').classList.add('masc-btn');
  }

  updateNextBtn();
}

document.querySelectorAll('.option-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const card = this.closest('.question-card');

    card.querySelectorAll('.option-btn').forEach(b => {
      b.classList.remove('selected', 'masc-selected');
    });

    this.classList.add(selectedGender === 'male' ? 'masc-selected' : 'selected');
    answers[currentQ] = this.dataset.scores;

    updateNextBtn();
  });
});

function updateNextBtn() {
  const btn = document.getElementById('btn-next');

  btn.disabled = !(selectedGender && answers[currentQ] !== undefined);
  btn.textContent = currentQ === totalQ - 1 ? 'Sonucu Gör ✦' : 'Devam Et →';
}

function nextQuestion() {
  if (currentQ < totalQ - 1) {
    showQuestion(currentQ + 1);
  } else {
    calculateAndShow();
  }
}

function prevQuestion() {
  if (currentQ > 0) {
    showQuestion(currentQ - 1);
  }
}

function showQuestion(index) {
  document.querySelectorAll('.question-card').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.question-card')[index].classList.add('active');

  currentQ = index;

  document.getElementById('progress-fill').style.width = (index / totalQ * 100) + '%';
  document.getElementById('progress-text').textContent = (index + 1) + ' / ' + totalQ;
  document.getElementById('btn-back').style.display = index > 0 ? 'block' : 'none';

  updateNextBtn();
}

function calculateAndShow() {
  const scores = {
    floral: 0,
    fresh: 0,
    woody: 0,
    oriental: 0
  };

  const keys = ['floral', 'fresh', 'woody', 'oriental'];

  Object.values(answers).forEach(scoreStr => {
    scoreStr.split(',').forEach((val, i) => {
      scores[keys[i]] += parseInt(val);
    });
  });

  const winner = keys.reduce((a, b) => scores[a] >= scores[b] ? a : b);
  const cat = CATEGORIES[winner];
  const total = Object.values(scores).reduce((a, b) => a + b, 0);

  document.getElementById('quiz-container').style.display = 'none';

  const rs = document.getElementById('result-screen');
  rs.style.display = 'block';
  rs.scrollIntoView({ behavior: 'smooth' });

  document.getElementById('result-card-header').style.background =
    `linear-gradient(135deg, ${cat.bgColor} 0%, #faf8f5 100%)`;

  const badge = document.getElementById('category-badge');
  badge.textContent = cat.label;
  badge.style.background = cat.bgColor;
  badge.style.color = cat.color;
  badge.style.border = `1px solid ${cat.color}50`;

  document.getElementById('result-type-name').textContent = cat.typeName;
  document.getElementById('result-type-desc').textContent = cat.desc;
  document.getElementById('ai-insight-text').textContent = cat.insight;

  const catNames = {
    floral: '🌸 Floral',
    fresh: '🌿 Fresh',
    woody: '🖤 Woody',
    oriental: '🕯️ Oriental'
  };

  const catColors = {
    floral: '#d4689a',
    fresh: '#52a875',
    woody: '#7a5c3a',
    oriental: '#c87840'
  };

  document.getElementById('score-bars').innerHTML = keys.map(k => `
    <div class="score-row">
      <span class="score-label">${catNames[k]}</span>
      <div class="score-track">
        <div class="score-fill" style="width:${Math.round(scores[k] / total * 100)}%;background:${catColors[k]};"></div>
      </div>
      <span class="score-num">${scores[k]}</span>
    </div>
  `).join('');

  document.getElementById('perfume-list').innerHTML = cat.perfumes.map(p => `
    <div class="perf-card">
      <svg width="64" height="80" viewBox="0 0 64 80" style="margin-bottom:10px;">
        <rect x="28" y="6" width="8" height="5" rx="2" fill="${p.renk}" opacity="0.9"/>
        <path d="M32 13 L38.2 26.1 L52.6 28.1 L42.2 38.3 L44.7 52.6 L32 45.8 L19.3 52.6 L21.8 38.3 L11.4 28.1 L25.8 26.1 Z"
              fill="${p.renk}" opacity="0.2" stroke="${p.renk}" stroke-width="1.8" stroke-linejoin="round"/>
        <path d="M32 19 L36.2 28 L46 29.4 L38.9 36.4 L40.6 46.1 L32 41.5 L23.4 46.1 L25.1 36.4 L18 29.4 L27.8 28 Z"
              fill="${p.renk}" opacity="0.12"/>
      </svg>
      <div class="perf-name">${p.isim}</div>
      <div class="perf-notes">${p.notalar}</div>
    </div>
  `).join('');

  const genderEssences = selectedGender === 'male' ? cat.essencesMale : cat.essencesFemale;

  document.getElementById('essence-breakdown').innerHTML = genderEssences.map(e => `
    <div class="essence-row-result">
      <div class="ess-dot" style="background:${e.renk}"></div>
      <span class="ess-name">${e.isim}</span>
      <div class="ess-bar-track">
        <div class="ess-bar-fill" style="width:${e.oran}%;background:${e.renk};"></div>
      </div>
      <span class="ess-pct">%${e.oran}</span>
    </div>
  `).join('');
}

function resetQuiz() {
  currentQ = 0;

  Object.keys(answers).forEach(k => delete answers[k]);

  selectedGender = null;

  document.querySelectorAll('.option-btn').forEach(b => {
    b.classList.remove('selected', 'masc-selected');
  });

  document.querySelectorAll('.gender-btn').forEach(b => {
    b.classList.remove('selected');
  });

  document.getElementById('result-screen').style.display = 'none';
  document.getElementById('quiz-container').style.display = 'none';
  document.getElementById('btn-next').classList.remove('masc-btn');
  document.getElementById('progress-fill').style.background = 'linear-gradient(90deg, var(--fem), var(--gold))';

  showQuestion(0);

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

function goToAtelier() {
  if (selectedGender === 'female') {
    window.location.href = 'kadin.html';
  } else if (selectedGender === 'male') {
    window.location.href = 'erkekparfum.html';
  } else {
    window.location.href = 'index.html';
  }
}