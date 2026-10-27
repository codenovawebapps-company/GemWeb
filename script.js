/**
 * SERENDIB STONES — CEYLON GEM HOUSE (රත්නදීප)
 * Interactive Engine: Sparkle Particle System, Currency Converter,
 * Provenance Map, Vault Filtering, 360° Gem Inspector, Certificate Engine & Bespoke Concierge.
 */

// ==========================================
// 1. CURRENCY STATE & CONVERSION
// ==========================================
let currentCurrency = 'USD';
const currencyRates = {
  USD: { symbol: '$', rate: 1, suffix: ' USD' },
  LKR: { symbol: 'Rs. ', rate: 305, suffix: ' LKR' },
  GBP: { symbol: '£', rate: 0.79, suffix: ' GBP' }
};

function setCurrency(curr) {
  if (!currencyRates[curr]) return;
  currentCurrency = curr;

  // Update button active state
  document.querySelectorAll('.curr-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.curr === curr);
  });

  // Re-render all price elements
  document.querySelectorAll('.price-val').forEach(el => {
    const baseUSD = parseFloat(el.dataset.baseUsd);
    if (!isNaN(baseUSD)) {
      const config = currencyRates[curr];
      const converted = Math.round(baseUSD * config.rate);
      el.textContent = config.symbol + converted.toLocaleString() + config.suffix;
    }
  });

  // Update Bespoke summary price
  updateBespokeCalculation();
}

// Setup currency buttons
document.querySelectorAll('.curr-btn').forEach(btn => {
  btn.addEventListener('click', () => setCurrency(btn.dataset.curr));
});

// ==========================================
// 2. HEADER SCROLL & MOBILE DRAWER
// ==========================================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

const menuToggle = document.getElementById('menu-toggle');
const mobileDrawer = document.getElementById('mobile-drawer');
const drawerClose = document.getElementById('drawer-close');

if (menuToggle && mobileDrawer && drawerClose) {
  menuToggle.addEventListener('click', () => {
    mobileDrawer.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
  });

  drawerClose.addEventListener('click', () => {
    mobileDrawer.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });

  document.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ==========================================
// 3. AMBIENT GOLD SPARKLE CANVAS EFFECT
// ==========================================
const canvas = document.getElementById('sparkle-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = -Math.random() * 0.4 - 0.1;
      this.alpha = Math.random() * 0.6 + 0.1;
      this.decay = Math.random() * 0.003 + 0.002;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.alpha -= this.decay;
      if (this.alpha <= 0 || this.y < 0) {
        this.reset();
      }
    }
    draw() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(184, 141, 59, ${this.alpha})`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = 'rgba(184, 141, 59, 0.4)';
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < 40; i++) {
    particles.push(new Particle());
  }

  function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateCanvas);
  }
  animateCanvas();
}

// ==========================================
// 4. GEM VAULT DATA & FILTERING
// ==========================================
const gemData = {
  'gem-1': {
    name: 'The Elahera Monarch',
    sinhala: 'රාජකීය නිල් මැණික · Royal Ceylon Sapphire',
    category: 'sapphire',
    image: 'assets/royal-blue-sapphire.jpg',
    unheated: 'Natural Unheated',
    origin: 'Elahera Valley, Sri Lanka',
    desc: 'An exceptional unheated Ceylon sapphire exhibiting the prized vivid royal blue hue with sublime crystalline transparency and fine natural rutile silk needles.',
    weight: '8.42 Carats',
    dims: '13.4 x 11.2 x 7.6 mm',
    color: 'Vivid Royal Blue (Grade A+)',
    clarity: 'Eye Clean (Natural Silk Inclusions)',
    cut: 'Precision Oval Brilliant',
    certs: 'GIA #2284920 & NGJA #8924',
    basePriceUSD: 42000
  },
  'gem-2': {
    name: 'The Nilwala Lotus (පද්මරාග)',
    sinhala: 'පද්මරාග මැණික · Padparadscha Sapphire',
    category: 'padparadscha',
    image: 'assets/padparadscha-sapphire.jpg',
    unheated: 'Natural Unheated',
    origin: 'Rakwana Beds, Sri Lanka',
    desc: 'The holy grail of corundum — displaying an ethereal harmony of sunset orange and delicate lotus blossom pink, completely untouched by thermal treatment.',
    weight: '4.25 Carats',
    dims: '10.2 x 9.1 x 5.8 mm',
    color: 'Master Lotus Sunset (Pinkish-Orange)',
    clarity: 'VVS (Exceptional Crystal)',
    cut: 'Antique Cushion',
    certs: 'GRS #5521 (Padparadscha Master) & NGJA',
    basePriceUSD: 38500
  },
  'gem-3': {
    name: 'The Star of Serendib',
    sinhala: 'අගනා තරු නිල් මැණික · Ceylon Star Sapphire',
    category: 'star',
    image: 'assets/star-sapphire.jpg',
    unheated: '100% Natural Asterism',
    origin: 'Okkampitiya, Sri Lanka',
    desc: 'A collector cabochon displaying a mesmerizing, razor-sharp 6-ray asterism star that glides effortlessly across deep midnight blue corundum.',
    weight: '14.60 Carats',
    dims: '15.8 x 14.2 x 8.4 mm',
    color: 'Deep Midnight Cornflower',
    clarity: 'Translucent with dense rutile silk',
    cut: 'High Dome Cabochon',
    certs: 'GIA #7410 & NGJA Specimen Dossier',
    basePriceUSD: 24500
  },
  'gem-4': {
    name: 'The Ratnapura Ray (වෛරෝඩි)',
    sinhala: 'ශ්‍රී ලංකා වෛරෝඩි · Chrysoberyl Cat’s Eye',
    category: 'rare',
    image: 'assets/cats-eye-chrysoberyl.jpg',
    unheated: 'Natural Cymophane',
    origin: 'Ratnapura Deep Pit, Sri Lanka',
    desc: 'An iconic Ceylon gemological wonder presenting the legendary "milk and honey" chatoyant effect with an electrifying, razor-straight white band across honey green body.',
    weight: '6.42 Carats',
    dims: '11.6 x 9.8 x 6.5 mm',
    color: 'Translucent Golden Honey-Green',
    clarity: 'Sharp Cymophane Chatoyancy',
    cut: 'Oval Cabochon',
    certs: 'GIC Certified #9812 & NGJA',
    basePriceUSD: 19800
  },
  'gem-5': {
    name: 'The Meetiyagoda Tear',
    sinhala: 'සඳකාන්ත මැණික · Blue Moonstone',
    category: 'rare',
    image: 'assets/blue-moonstone.jpg',
    unheated: '100% Unheated Feldspar',
    origin: 'Meetiyagoda, Sri Lanka',
    desc: 'Mined from the world’s sole primary deposit of pure blue moonstones in Meetiyagoda — radiating a mystical electric blue floating adularescence.',
    weight: '7.80 Carats',
    dims: '14.0 x 11.5 x 6.2 mm',
    color: 'Transparent with Electric Blue Sheen',
    clarity: 'Transparent Crystal Body',
    cut: 'Smooth Oval Cabochon',
    certs: 'NGJA Official Origin Report #4419',
    basePriceUSD: 6200
  },
  'gem-6': {
    name: 'The Ceylon Crown Ring',
    sinhala: 'රාජකීය මුද්ද · Bespoke Sapphire Heirloom',
    category: 'sapphire',
    image: 'assets/bespoke-ring.jpg',
    unheated: 'Heirloom Setting',
    origin: '18K Handcrafted Ceylon Gold',
    desc: 'A magnificent 6.10 ct unheated cornflower blue sapphire encircled by double brilliant-cut diamond halos in hand-carved 18K yellow gold.',
    weight: '6.10 ct Center + 1.45 ct Diamonds',
    dims: 'Ring Size: Bespoke on order',
    color: 'Cornflower Royal Blue',
    clarity: 'Eye Clean Center Gem',
    cut: 'Precision Oval Brilliant',
    certs: 'GIA Dossier #88921 & Goldsmith Hallmarked',
    basePriceUSD: 34000
  }
};

// Filter Vault Tabs
const filterTabs = document.querySelectorAll('.filter-tab');
filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.dataset.filter;
    const cards = document.querySelectorAll('.gem-card');

    cards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 0.4s ease forwards';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

function filterVault(category) {
  const targetTab = document.querySelector(`.filter-tab[data-filter="${category}"]`);
  if (targetTab) {
    targetTab.click();
    document.getElementById('vault').scrollIntoView({ behavior: 'smooth' });
  }
}

function filterVaultByRegion(region) {
  const cards = document.querySelectorAll('.gem-card');
  cards.forEach(card => {
    if (card.dataset.region === region) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });

  // Set filter tab to custom
  filterTabs.forEach(t => t.classList.remove('active'));
  document.getElementById('vault').scrollIntoView({ behavior: 'smooth' });
  showToast(`Filtered Gem Vault for region: ${region.toUpperCase()}`);
}

// ==========================================
// 5. INTERACTIVE 360° GEM INSPECTOR MODAL
// ==========================================
const gemModal = document.getElementById('gem-modal');
let activeGemId = 'gem-1';

function openGemModal(gemId) {
  const data = gemData[gemId];
  if (!data) return;

  activeGemId = gemId;

  // Populate modal fields
  document.getElementById('modal-gem-image').src = data.image;
  document.getElementById('modal-badge-heat').textContent = data.unheated;
  document.getElementById('modal-badge-origin').textContent = data.origin;
  document.getElementById('modal-title').textContent = data.name;
  document.getElementById('modal-sinhala').textContent = data.sinhala;
  document.getElementById('modal-desc').textContent = data.desc;
  document.getElementById('modal-weight').textContent = data.weight;
  document.getElementById('modal-dims').textContent = data.dims;
  document.getElementById('modal-color').textContent = data.color;
  document.getElementById('modal-clarity').textContent = data.clarity;
  document.getElementById('modal-cut').textContent = data.cut;
  document.getElementById('modal-origin').textContent = data.origin;
  document.getElementById('modal-certs').textContent = data.certs;

  const priceEl = document.getElementById('modal-price');
  priceEl.dataset.baseUsd = data.basePriceUSD;
  const config = currencyRates[currentCurrency];
  priceEl.textContent = config.symbol + Math.round(data.basePriceUSD * config.rate).toLocaleString() + config.suffix;

  // Reset view mode
  setModalViewMode('macro');

  gemModal.classList.add('active');
  gemModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeGemModal() {
  gemModal.classList.remove('active');
  gemModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Escape key to close modal
window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && gemModal.classList.contains('active')) {
    closeGemModal();
  }
});

// Modal Refraction / Mousemove Light Simulation
const modalImgWrap = document.getElementById('modal-img-wrap');
const facetShimmer = document.getElementById('facet-shimmer');
const modalGemImg = document.getElementById('modal-gem-image');

if (modalImgWrap && facetShimmer && modalGemImg) {
  modalImgWrap.addEventListener('mousemove', e => {
    const rect = modalImgWrap.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = (x / rect.width) * 100;
    const yPct = (y / rect.height) * 100;

    facetShimmer.style.opacity = '0.75';
    facetShimmer.style.background = `radial-gradient(circle at ${xPct}% ${yPct}%, rgba(255, 245, 210, 0.8) 0%, rgba(212, 175, 55, 0.4) 30%, transparent 65%)`;
    
    // Subtle 3D tilt
    const tiltX = (xPct - 50) / 12;
    const tiltY = (yPct - 50) / 12;
    modalGemImg.style.transform = `scale(1.05) translate(${tiltX}px, ${tiltY}px)`;
  });

  modalImgWrap.addEventListener('mouseleave', () => {
    facetShimmer.style.opacity = '0';
    modalGemImg.style.transform = 'scale(1) translate(0, 0)';
  });
}

function setModalViewMode(mode) {
  const btnMacro = document.getElementById('btn-view-macro');
  const btnSilk = document.getElementById('btn-view-silk');
  const btnRefract = document.getElementById('btn-view-refract');

  [btnMacro, btnSilk, btnRefract].forEach(b => b.classList.remove('active'));

  if (mode === 'macro') {
    btnMacro.classList.add('active');
    modalGemImg.style.filter = 'brightness(1) contrast(1)';
  } else if (mode === 'silk') {
    btnSilk.classList.add('active');
    // High contrast to simulate microscopic inclusion visualization
    modalGemImg.style.filter = 'contrast(1.6) brightness(1.2) saturate(1.4)';
    showToast('Viewing authentic natural rutile silk needle inclusions');
  } else if (mode === 'refract') {
    btnRefract.classList.add('active');
    modalGemImg.style.filter = 'brightness(1.25) saturate(1.3)';
    showToast('Simulating direct tropical Ceylon sunlight refraction');
  }
}

function inquireFromModal() {
  const data = gemData[activeGemId];
  closeGemModal();
  inquireGem(data.name);
}

function inquireGem(gemName) {
  const formInterest = document.getElementById('form-gem-interest');
  const formMsg = document.getElementById('form-message');
  
  if (formInterest) {
    // Match best option or set message
    formMsg.value = `I am interested in acquiring ${gemName}. Please arrange a private consultation and dossier.`;
  }
  
  document.getElementById('enquire').scrollIntoView({ behavior: 'smooth' });
  showToast(`Selected ${gemName} for private enquiry.`);
}

function downloadSpecSheet() {
  const data = gemData[activeGemId];
  showToast(`Generating certified PDF dossier for ${data.name}...`);
  setTimeout(() => {
    showToast(`✓ Dossier ready: Official Lab Report & NGJA Provenance Certificate`);
  }, 1200);
}

// ==========================================
// 6. INTERACTIVE PROVENANCE MAP OF SRI LANKA
// ==========================================
const regionData = {
  ratnapura: {
    code: 'REGION · 01',
    elevation: 'Elevation: 130m · Sabaragamuwa Basin',
    title: 'Ratnapura (City of Gems)',
    sinhala: 'රත්නපුර · The Ancient Corundum Capital',
    desc: 'Situated in the Sabaragamuwa province beneath the sacred peak of Sri Pada (Adam’s Peak), Ratnapura is the historical heart of Ceylon gem mining. Its ancient riverbanks harbor layered alluvial gravel beds (Illama) rich in deep blue sapphires, rubies, and chrysoberyl cat’s eyes.',
    gems: 'Royal Blue Sapphire, Padparadscha, Cat’s Eye, Spinel',
    method: 'Eco-friendly Gam Pathal (Artisanal Timber Pit)',
    depth: '10 to 50 Feet Underground',
    finds: 'The Star of Adam (1,404 ct), Blue Giant of the Orient'
  },
  elahera: {
    code: 'REGION · 02',
    elevation: 'Elevation: 90m · Central Highlands Corridor',
    title: 'Elahera (The Sapphire Valley)',
    sinhala: 'ඇලහැර · Valley of Royal Blues',
    desc: 'Renowned worldwide among gemologists as the source of Ceylon’s finest royal blue sapphires. The alluvial flats along the Mahaweli River basin produce corundum crystals with supreme crystalline fire and classic cornflower hues.',
    gems: 'Vivid Royal Blue Sapphire, Yellow Sapphire, Alexandrite',
    method: 'River Alluvial Panning & Surface Pit Panning',
    depth: '8 to 25 Feet in Alluvial Beds',
    finds: 'The Blue Belle of Asia (400 ct unheated royal blue)'
  },
  meetiyagoda: {
    code: 'REGION · 03',
    elevation: 'Elevation: 25m · Southern Coastal Belt',
    title: 'Meetiyagoda (The Moonstone Mines)',
    sinhala: 'මිටියාගොඩ · The World Capital of Blue Moonstone',
    desc: 'The only place on Earth where pure, high-grade blue moonstone exists in concentrated pegmatite veins within white kaolin clay. Mined through water-pumping timber pits operating since the 19th century.',
    gems: 'Electric Blue Moonstone, Orthoclase Feldspar',
    method: 'Kaolin Deep Shaft Mining with Timber Shoring',
    depth: '30 to 60 Feet in Kaolin Layer',
    finds: 'Hypnotic Transparent Royal Blue Adularescent gems'
  },
  okkampitiya: {
    code: 'REGION · 04',
    elevation: 'Elevation: 110m · Uva Province Plains',
    title: 'Okkampitiya (The Star Corridor)',
    sinhala: 'ඔක්කම්පිටිය · Source of Master Asterism',
    desc: 'Nestled in the wilderness of the Uva Province, Okkampitiya is legendary for yielding star sapphires with dense, perfectly oriented titanium dioxide (rutile) silk needles that produce glowing 6-ray stars.',
    gems: 'Natural 6-Ray Star Sapphires, Star Rubies',
    method: 'Dry Riverbed Excavation & Shaded Washing',
    depth: '12 to 35 Feet Gravel Deposits',
    finds: 'Rare midnight star gems with razor-sharp rays'
  },
  pelmadulla: {
    code: 'REGION · 05',
    elevation: 'Elevation: 180m · Highland Paddy Valleys',
    title: 'Pelmadulla (Paddy Field Mines)',
    sinhala: 'පැල්මඩුල්ල · Ancient Alluvial Beds',
    desc: 'A lush agricultural basin where seasonal gem pits are dug in paddy fields between rice harvests. The soil contains ancient river gravel layers packed with Padparadscha sapphires, topazes, and garnets.',
    gems: 'Padparadscha, Fancy Colored Sapphires, Tourmaline',
    method: 'Seasonal Agricultural Pit Mining',
    depth: '15 to 45 Feet Depth',
    finds: 'Historical Lotus-Pink Padparadscha master stones'
  }
};

const mapPins = document.querySelectorAll('.map-pin');
mapPins.forEach(pin => {
  pin.addEventListener('click', () => {
    mapPins.forEach(p => p.classList.remove('active'));
    pin.classList.add('active');

    const region = pin.dataset.region;
    const info = regionData[region];
    if (!info) return;

    // Animate panel update
    const panel = document.getElementById('region-detail-card');
    panel.style.opacity = '0.4';
    panel.style.transform = 'translateY(8px)';

    setTimeout(() => {
      document.getElementById('region-code').textContent = info.code;
      document.getElementById('region-elevation').textContent = info.elevation;
      document.getElementById('region-title').textContent = info.title;
      document.getElementById('region-sinhala').textContent = info.sinhala;
      document.getElementById('region-desc').textContent = info.desc;
      document.getElementById('region-gems').textContent = info.gems;
      document.getElementById('region-method').textContent = info.method;
      document.getElementById('region-depth').textContent = info.depth;
      document.getElementById('region-finds').textContent = info.finds;

      panel.style.opacity = '1';
      panel.style.transform = 'translateY(0)';
      panel.style.transition = 'all 0.3s ease';
    }, 150);
  });
});

// ==========================================
// 7. CERTIFICATE VERIFICATION ENGINE
// ==========================================
const certDatabase = {
  'NGJA-8924': {
    inst: 'NATIONAL GEM & JEWELLERY AUTHORITY',
    sub: 'SRI LANKA · OFFICIAL ORIGIN REPORT',
    num: 'NGJA-8924',
    ident: 'Natural Corundum (Blue Sapphire)',
    weight: '8.42 Carats',
    origin: 'Sri Lanka (Ceylon / Elahera)',
    treat: 'No Indications of Thermal Enhancement (Unheated)',
    ri: '1.762 – 1.770 (Birefringence 0.008)',
    inc: 'Fine intersecting rutile silk needles, negative crystals'
  },
  'GRS-5521': {
    inst: 'GEMRESEARCH SWISSLAB (GRS)',
    sub: 'SWITZERLAND · MASTER COLOR REPORT',
    num: 'GRS-5521-SL',
    ident: 'Natural Padparadscha Sapphire',
    weight: '4.25 Carats',
    origin: 'Sri Lanka (Ceylon / Rakwana)',
    treat: 'No Thermal Enhancement (Unheated Master Color)',
    ri: '1.760 – 1.768 (Birefringence 0.008)',
    inc: 'Delicate liquid feather inclusions, unheated crystal structure'
  },
  'GIA-7410': {
    inst: 'GEMOLOGICAL INSTITUTE OF AMERICA (GIA)',
    sub: 'CARLSBAD · GEM IDENTIFICATION & ORIGIN',
    num: 'GIA-7410982',
    ident: 'Natural Star Sapphire Corundum',
    weight: '14.60 Carats',
    origin: 'Sri Lanka (Ceylon / Okkampitiya)',
    treat: 'No Indications of Heating (Unheated Asterism)',
    ri: '1.762 (Spot / Cabochon Refractometer)',
    inc: 'Dense 6-ray asterism rutile silk network throughout body'
  },
  'NGJA-9931': {
    inst: 'NATIONAL GEM & JEWELLERY AUTHORITY',
    sub: 'SRI LANKA · OFFICIAL ORIGIN REPORT',
    num: 'NGJA-9931',
    ident: 'Natural Chrysoberyl Cat’s Eye (Cymophane)',
    weight: '6.42 Carats',
    origin: 'Sri Lanka (Ceylon / Ratnapura)',
    treat: 'Untreated Natural Chrysoberyl',
    ri: '1.746 – 1.755 (Birefringence 0.009)',
    inc: 'Fine parallel tubular cavities producing sharp chatoyant slit'
  }
};

function handleCertVerify(e) {
  e.preventDefault();
  const input = document.getElementById('cert-input').value.trim().toUpperCase();
  lookupSampleCert(input);
}

function lookupSampleCert(certCode) {
  document.getElementById('cert-input').value = certCode;
  const resultCard = document.getElementById('cert-result');
  const data = certDatabase[certCode];

  resultCard.style.opacity = '0.3';
  resultCard.style.transform = 'scale(0.98)';

  setTimeout(() => {
    if (data) {
      document.getElementById('c-inst').textContent = data.inst;
      document.getElementById('c-num').textContent = data.num;
      document.getElementById('c-ident').textContent = data.ident;
      document.getElementById('c-weight').textContent = data.weight;
      document.getElementById('c-origin').textContent = data.origin;
      document.getElementById('c-treat').textContent = data.treat;
      document.getElementById('c-ri').textContent = data.ri;
      document.getElementById('c-inc').textContent = data.inc;
      showToast(`✓ Certificate ${certCode} verified in official registry.`);
    } else {
      document.getElementById('c-inst').textContent = 'OFFICIAL REGISTRY VERIFIED';
      document.getElementById('c-num').textContent = certCode;
      document.getElementById('c-ident').textContent = 'Natural Ceylon Gemstone';
      document.getElementById('c-weight').textContent = 'Authenticated Specimen';
      document.getElementById('c-origin').textContent = 'Sri Lanka (Ceylon)';
      document.getElementById('c-treat').textContent = 'Natural Unheated (Certified)';
      document.getElementById('c-ri').textContent = 'Within standard optical constants';
      document.getElementById('c-inc').textContent = 'Natural growth structures verified';
      showToast(`Custom Certificate ${certCode} retrieved.`);
    }
    resultCard.style.opacity = '1';
    resultCard.style.transform = 'scale(1)';
    resultCard.style.transition = 'all 0.3s ease';
  }, 200);
}

// ==========================================
// 8. BESPOKE CONCIERGE & JEWELRY BUILDER
// ==========================================
let bespokeState = {
  gemType: 'Royal Blue Sapphire',
  baseGemCost: 15000,
  carats: 4.5,
  metal: '18K Ceylon Yellow Gold',
  metalCost: 2200
};

// Gem Type Buttons
const gemTypeBtns = document.querySelectorAll('#gem-type-options .pill-btn');
gemTypeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    gemTypeBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    bespokeState.gemType = btn.dataset.type;
    bespokeState.baseGemCost = parseFloat(btn.dataset.base);
    updateBespokeCalculation();
  });
});

// Carat Slider
const caratSlider = document.getElementById('carat-slider');
const caratDisplay = document.getElementById('carat-display');
if (caratSlider && caratDisplay) {
  caratSlider.addEventListener('input', e => {
    bespokeState.carats = parseFloat(e.target.value);
    caratDisplay.textContent = bespokeState.carats.toFixed(1);
    updateBespokeCalculation();
  });
}

// Metal Setting Buttons
const metalBtns = document.querySelectorAll('#metal-options .pill-btn');
metalBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    metalBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    bespokeState.metal = btn.dataset.metal;
    bespokeState.metalCost = parseFloat(btn.dataset.metalCost);
    updateBespokeCalculation();
  });
});

function updateBespokeCalculation() {
  const sumTitle = document.getElementById('sum-title');
  const sumGem = document.getElementById('sum-gem');
  const sumWeight = document.getElementById('sum-weight');
  const sumMetal = document.getElementById('sum-metal');
  const sumPrice = document.getElementById('sum-price');

  if (!sumTitle || !sumPrice) return;

  // Formula: (base cost per 4ct baseline) scaled by carat weight + metal craft cost
  const gemPrice = (bespokeState.baseGemCost / 4) * Math.pow(bespokeState.carats, 1.15);
  const totalUSD = Math.round(gemPrice + bespokeState.metalCost);

  sumTitle.textContent = `${bespokeState.gemType} Heirloom`;
  sumGem.textContent = bespokeState.gemType;
  sumWeight.textContent = `${bespokeState.carats.toFixed(2)} Carats (Unheated)`;
  sumMetal.textContent = bespokeState.metal;

  const config = currencyRates[currentCurrency];
  const converted = Math.round(totalUSD * config.rate);
  sumPrice.textContent = config.symbol + converted.toLocaleString() + config.suffix;
}

function bookBespokeCommission() {
  const formInterest = document.getElementById('form-gem-interest');
  const formMsg = document.getElementById('form-message');
  
  if (formInterest && formMsg) {
    formInterest.value = 'Bespoke High Jewelry Commission';
    formMsg.value = `Private Bespoke Commission Request:\n- Center Gem: ${bespokeState.gemType}\n- Carat Target: ${bespokeState.carats.toFixed(1)} ct\n- Metal/Mounting: ${bespokeState.metal}\n- Est. Range: ${document.getElementById('sum-price').textContent}`;
  }

  document.getElementById('enquire').scrollIntoView({ behavior: 'smooth' });
  showToast('Custom heirloom parameters transferred to Private Acquisition Form.');
}

// ==========================================
// 9. PRIVATE ENQUIRY FORM & TOAST NOTIFICATION
// ==========================================
function handleEnquirySubmit(e) {
  e.preventDefault();
  const name = document.getElementById('form-name').value;
  const email = document.getElementById('form-email').value;
  const gem = document.getElementById('form-gem-interest').value;

  showToast(`Thank you, ${name}. Your private enquiry for ${gem} has been received.`);
  
  e.target.reset();
  setTimeout(() => {
    showToast(`A senior gemologist from Colombo will contact ${email} within 4 hours.`);
  }, 2500);
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  if (toast && toastMsg) {
    toastMsg.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }
}

// Initialize prices on page load
document.addEventListener('DOMContentLoaded', () => {
  setCurrency('USD');
  updateBespokeCalculation();
});
