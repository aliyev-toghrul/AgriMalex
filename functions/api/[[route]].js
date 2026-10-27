// Cloudflare Pages Function - Edge API for agrimalex.pages.dev
export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const path = url.pathname;

  // Set standard CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Status endpoint
  if (path.endsWith('/status')) {
    return new Response(JSON.stringify({
      status: 'online',
      platform: 'AgriMalex™',
      edgeRuntime: 'Cloudflare Pages Functions',
      deployment: 'agrimalex.pages.dev',
      version: '2.0.0',
      timestamp: new Date().toISOString()
    }), { headers: corsHeaders });
  }

  // Constant Integrated Weather Endpoint
  if (path.endsWith('/weather')) {
    const city = url.searchParams.get('city') || 'Nairobi,Kenya';
    let weatherData = {
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
    };

    if (city.toLowerCase().includes('baku')) {
      weatherData = {
        location: 'Baku, Azerbaijan',
        coordinates: 'Lat 40.40° N, Lon 49.86° E',
        tempC: 21,
        condition: 'Sunny & Clear',
        humidity: 58,
        windSpeed: '18 km/h',
        rain24h: '0.0 mm',
        forecast10Day: [
          { day: 'Today', high: 22, low: 15, rain: '0 mm', icon: '☀️' },
          { day: 'Tue', high: 21, low: 14, rain: '0 mm', icon: '🌤' },
          { day: 'Wed', high: 20, low: 13, rain: '1 mm', icon: '⛅' }
        ]
      };
    }

    return new Response(JSON.stringify(weatherData), { headers: corsHeaders });
  }

  // Constant Integrated AI Diagnostic Endpoint
  if (path.endsWith('/ai/diagnose')) {
    let body = {};
    try { body = await request.json(); } catch (e) {}

    const { mode, speciesHint } = body;
    let result = {};

    if (mode === 'invasive') {
      result = {
        platform: 'AgriMalex Cloudflare AI Engine',
        targetType: 'Invasive Alien Species / Weed',
        candidateName: speciesHint || 'Water Hyacinth (Eichhornia crassipes)',
        scientificName: 'Eichhornia crassipes',
        confidence: 0.94,
        riskLevel: 'Critical',
        spreadVector: 'Waterways, seasonal flooding, irrigation pumps',
        urgentActionWindow: '24-48 Hours',
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
      };
    } else {
      result = {
        platform: 'AgriMalex Cloudflare AI Engine',
        targetType: 'Crop Pathology Diagnostic',
        cropIdentified: 'Maize (Zea mays)',
        diseaseName: 'Northern Corn Leaf Blight (Exserohilum turcicum)',
        confidence: 0.91,
        severity: 'Moderate (Stage 2/4)',
        immediateTreatment: [
          'Apply foliar Azoxystrobin + Difenoconazole (Amistar Top) at 500 mL/ha.',
          'Improve furrow spacing to reduce canopy wetness duration.',
          'Rotate with non-host legumes next season.'
        ],
        organicAlternatives: [
          'Foliar bio-fungicide Bacillus subtilis (Serenade ASO) at 2.5 L/ha.',
          'Neem oil extract (1.0% v/v) with potassium soap emulsifier.'
        ]
      };
    }

    return new Response(JSON.stringify(result), { headers: corsHeaders });
  }

  // Fallback
  return new Response(JSON.stringify({ message: 'AgriMalex Cloudflare Pages API active' }), { headers: corsHeaders });
}
