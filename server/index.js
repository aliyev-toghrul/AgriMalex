const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, '..', 'data', 'db.json');

app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.static(path.join(__dirname, '..', 'public')));

function readDb() {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading db.json:', err.message);
    return {};
  }
}

function writeDb(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing db.json:', err.message);
    return false;
  }
}

// Health & Status
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    platform: 'AgriMalex™',
    tagline: 'Healthier Crops | Smarter Decisions | A Sustainable Planet',
    version: '2.0.0',
    deployment: 'Cloudflare Pages / Node.js Engine',
    serverTime: new Date().toISOString(),
    uptimeSeconds: process.uptime()
  });
});

app.get('/api/data', (req, res) => {
  res.json(readDb());
});

// Constant Weather API (Zero User API Key Requirement)
app.get('/api/weather', (req, res) => {
  const city = (req.query.city || 'Nairobi,Kenya').toLowerCase();
  
  if (city.includes('baku')) {
    return res.json({
      location: 'Baku, Azerbaijan',
      coordinates: 'Lat 40.40° N, Lon 49.86° E',
      tempC: 21,
      condition: 'Sunny & Mild Breeze',
      humidity: 58,
      windSpeed: '18 km/h (Khazri)',
      rain24h: '0.0 mm',
      forecast10Day: [
        { day: 'Today', high: 22, low: 15, rain: '0 mm', icon: '☀️' },
        { day: 'Tue', high: 21, low: 14, rain: '0 mm', icon: '🌤' },
        { day: 'Wed', high: 20, low: 13, rain: '1 mm', icon: '⛅' },
        { day: 'Thu', high: 22, low: 15, rain: '0 mm', icon: '☀️' },
        { day: 'Fri', high: 19, low: 12, rain: '2 mm', icon: '🌧' }
      ]
    });
  }

  if (city.includes('eldoret')) {
    return res.json({
      location: 'Eldoret, Kenya',
      coordinates: 'Lat 0.51° N, Lon 35.28° E',
      tempC: 19,
      condition: 'Highland Overcast',
      humidity: 74,
      windSpeed: '9 km/h',
      rain24h: '4.2 mm',
      forecast10Day: [
        { day: 'Today', high: 21, low: 11, rain: '4 mm', icon: '🌧' },
        { day: 'Tue', high: 22, low: 12, rain: '2 mm', icon: '🌦' },
        { day: 'Wed', high: 20, low: 10, rain: '5 mm', icon: '⛈' },
        { day: 'Thu', high: 23, low: 12, rain: '1 mm', icon: '🌤' },
        { day: 'Fri', high: 22, low: 11, rain: '0 mm', icon: '⛅' }
      ]
    });
  }

  // Default: Nairobi, Kenya
  res.json({
    location: 'Nairobi, Kenya',
    coordinates: 'Lat 1.29° S, Lon 36.82° E',
    tempC: 24,
    condition: 'Partly cloudy',
    humidity: 68,
    windSpeed: '12 km/h',
    rain24h: '2.4 mm',
    forecast10Day: [
      { day: 'Today', high: 26, low: 18, rain: '2 mm', icon: '☀️' },
      { day: 'Tue', high: 25, low: 17, rain: '0 mm', icon: '🌤' },
      { day: 'Wed', high: 24, low: 16, rain: '1 mm', icon: '🌧' },
      { day: 'Thu', high: 24, low: 15, rain: '3 mm', icon: '⛈' },
      { day: 'Fri', high: 23, low: 15, rain: '0 mm', icon: '⛅' }
    ]
  });
});

// Constant AI Vision Diagnostics (Zero User API Key Requirement)
app.post('/api/ai/diagnose', (req, res) => {
  const { mode, speciesHint, notes } = req.body;

  if (mode === 'invasive') {
    return res.json({
      platform: 'AgriMalex AI Vision v2.0',
      targetType: 'Invasive Alien Species / Weed',
      candidateName: speciesHint || 'Water Hyacinth (Eichhornia crassipes)',
      scientificName: 'Eichhornia crassipes',
      confidence: 0.94,
      riskLevel: 'Critical',
      spreadVector: 'Waterways, seasonal flooding, irrigation pumps',
      urgentActionWindow: '24-48 Hours',
      diagnostics: [
        'Dense fibrous root system causing severe water deoxygenation.',
        'High seed longevity (viable up to 20 years in aquatic mud).',
        'Imminent risk of pump intake blockage and local fish kill.'
      ],
      immediateContainment: [
        'Deploy floating physical boom 50m upstream of irrigation pump.',
        'Begin mechanical harvester skimming or winching.',
        'Notify regional river basin authority for EDRR mobilization.'
      ],
      recommendedChemicalTreatment: {
        activeIngredient: 'Glyphosate (aquatic-approved formulation) or 2,4-D Amine',
        dosage: '2.5 L/ha with non-ionic surfactant',
        safetyPrecaution: 'PHI: 14 days. Do not spray within 100m of domestic drinking water intake.'
      },
      biologicalAlternative: 'Introduce Neochetina eichhorniae weevils (1000 pairs/ha) in quiescent waters.'
    });
  }

  // Crop Disease Pathology (Plant Doctor)
  res.json({
    platform: 'AgriMalex AI Vision v2.0',
    targetType: 'Crop Pathology Diagnostic',
    cropIdentified: 'Maize (Zea mays)',
    diseaseName: 'Northern Corn Leaf Blight (Exserohilum turcicum)',
    confidence: 0.91,
    severity: 'Moderate (Stage 2/4)',
    symptomsObserved: [
      'Elongated, cigar-shaped grayish-green to tan lesions on lower canopy leaves.',
      'Slight chlorotic halo indicating active fungal sporulation.',
      'High humidity (>85%) microclimate favoring secondary spread.'
    ],
    immediateTreatment: [
      'Apply foliar Azoxystrobin + Difenoconazole (Amistar Top) at 500 mL/ha.',
      'Improve furrow spacing or adjust pivot rate to reduce canopy wetness duration.',
      'Rotate with non-host legumes (Cowpeas or French Beans) next season.'
    ],
    organicAlternatives: [
      'Foliar bio-fungicide Bacillus subtilis (Serenade ASO) at 2.5 L/ha.',
      'Neem oil extract (1.0% v/v) with potassium soap emulsifier.'
    ]
  });
});

// Farms CRUD
app.get('/api/farms', (req, res) => {
  const db = readDb();
  res.json(db.farms || []);
});

app.post('/api/farms', (req, res) => {
  const db = readDb();
  const newFarm = {
    id: 'farm-' + Date.now(),
    status: 'Active',
    cropCondition: 85,
    soilMoisture: 30,
    activePlots: 1,
    ...req.body
  };
  db.farms = db.farms || [];
  db.farms.unshift(newFarm);
  writeDb(db);
  res.status(201).json(newFarm);
});

// Observations CRUD
app.get('/api/observations', (req, res) => {
  const db = readDb();
  res.json(db.observations || []);
});

app.post('/api/observations', (req, res) => {
  const db = readDb();
  const obs = {
    id: 'OBS-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000),
    submittedAt: new Date().toISOString(),
    status: 'Pending',
    evidence: ['field_photo.jpg'],
    ...req.body
  };
  db.observations = db.observations || [];
  db.observations.unshift(obs);

  if (obs.riskLevel === 'Critical' || obs.riskLevel === 'High') {
    db.alerts = db.alerts || [];
    db.alerts.unshift({
      id: 'ALT-' + Date.now(),
      severity: obs.riskLevel === 'Critical' ? 'critical' : 'warning',
      title: `${obs.riskLevel.toUpperCase()} • New ${obs.speciesName} Sighting`,
      description: `Reported at ${obs.location} (${obs.extentHa || '1'} ha). Verification queued.`,
      timestamp: 'Just now'
    });
  }

  writeDb(db);
  res.status(201).json(obs);
});

// Treatments
app.post('/api/treatments', (req, res) => {
  const db = readDb();
  const trt = {
    id: 'TRT-' + Math.floor(100 + Math.random() * 900),
    date: new Date().toISOString().split('T')[0],
    outcome: 'Contained',
    ...req.body
  };
  db.treatments = db.treatments || [];
  db.treatments.unshift(trt);

  // Auto record in Finance
  if (trt.costUsd && Number(trt.costUsd) > 0) {
    db.finance = db.finance || [];
    db.finance.unshift({
      id: 'FIN-' + Date.now(),
      date: trt.date,
      type: 'Expense',
      category: 'Weed & Invasive Control',
      description: `Treatment: ${trt.species} at ${trt.site} (${trt.method})`,
      amount: Number(trt.costUsd)
    });
  }

  writeDb(db);
  res.status(201).json(trt);
});

// Harvests
app.post('/api/harvests', (req, res) => {
  const db = readDb();
  const h = {
    id: 'H-' + new Date().getFullYear() + '-' + Math.floor(100 + Math.random() * 900),
    date: new Date().toISOString().split('T')[0],
    ...req.body
  };
  db.harvests = db.harvests || [];
  db.harvests.unshift(h);

  if (h.totalValueUsd && Number(h.totalValueUsd) > 0) {
    db.finance = db.finance || [];
    db.finance.unshift({
      id: 'FIN-' + Date.now(),
      date: h.date,
      type: 'Income',
      category: 'Produce Sales',
      description: `Harvest revenue: ${h.quantityTonnes}T ${h.crop} (${h.grade})`,
      amount: Number(h.totalValueUsd)
    });
  }

  writeDb(db);
  res.status(201).json(h);
});

// Finance
app.post('/api/finance', (req, res) => {
  const db = readDb();
  const f = {
    id: 'FIN-' + Date.now(),
    date: new Date().toISOString().split('T')[0],
    ...req.body
  };
  db.finance = db.finance || [];
  db.finance.unshift(f);
  writeDb(db);
  res.status(201).json(f);
});

// Subscription (50% Newcomer Discount = $5/mo)
app.post('/api/subscription/upgrade', (req, res) => {
  const db = readDb();
  const { plan } = req.body;
  db.system = db.system || {};
  db.system.subscription = {
    plan: plan || 'AgriMalex Pro Enterprise',
    monthlyBasePrice: 10,
    discountPercent: 50,
    currentPrice: 5,
    billingCycle: 'monthly',
    status: 'Active Premium (50% Newcomer Offer)',
    upgradedAt: new Date().toISOString(),
    receiptNumber: 'SUB-AM-' + Math.random().toString(36).substring(2, 9).toUpperCase()
  };
  writeDb(db);
  res.json({
    success: true,
    message: 'Upgraded to AgriMalex Pro with 50% Newcomer Discount ($5.00/mo)',
    subscription: db.system.subscription
  });
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`AgriMalex™ Production Server running on port ${PORT}`);
  console.log(`URL: http://localhost:${PORT}`);
  console.log(`Target: Cloudflare Pages (agrimalex.pages.dev)`);
  console.log(`APIs: Constant Weather & AI Diagnostics Integrated (Zero user key needed)`);
  console.log(`=======================================================`);
});
