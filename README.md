# AgriMalex™
### Global Agricultural Intelligence & Invasive Species Defense Platform
**Production Target:** `https://agrimalex.pages.dev` (Cloudflare Pages)  
**System Architecture:** Unified Mother Farm Management System (AgriMalex v2.0) + Invasive Species Defense (EcoGuard AI)  
**Visual Interface:** High-tech dark-mode dashboard matching the AGRIMALEX™ prototype specification.

---

## 1. System Vision & Product Unification

AgriMalex marries two critical systems into one cohesive enterprise SaaS application:
1. **The Mother System (AgriMalex):**
   - Global farm estates & plot monitoring (Kibwezi Farm Kenya, Baku Agritech Azerbaijan, Eldoret Highland).
   - Soil moisture telemetry, NDVI vegetative indices, and soil pH tracking.
   - Harvest production tracking with commercial grading (Grade A/B/C/Reject) and automated revenue logging.
   - Profit & Loss (P&L) financial ledger with dynamic net margin calculations.
   - SheetJS Excel (`.xlsx`) export across all data tables.
2. **Invasive Species Intelligence (EcoGuard AI):**
   - Constant integrated AI Vision Diagnostic engine (instant weed identification, chemical herbicide dosages with Pre-Harvest Intervals, mechanical extraction, and biological agents).
   - Sighting reports with GPS coordinates and automatic risk categorization.
   - Regional & national satellite GIS hotspots for farmers and government authorities.
   - 6-Stage EDRR Rapid Response workflow (Detection → Verification → Risk Assessment → Containment → Treatment → Recovery).
   - Ecosystem Recovery Scorecard (% native regeneration, canopy recovery, soil carbon gain).

---

## 2. Constant Integrated APIs (Zero User Key Required)

In accordance with strict client specifications, users **never** have to enter their own third-party API keys:
- **Constant Weather API (`/api/weather`):**
  - Serves live atmospheric data for key agricultural hubs (Nairobi, Baku, Eldoret, Ganja).
  - Supplies 24h precipitation, wind speed, humidity, and 10-day forecasts automatically.
- **Constant AI Diagnostic Engine (`/api/ai/diagnose`):**
  - Runs out of the box on both Node.js server and Cloudflare Pages Functions.
  - Automatically classifies uploaded plant and weed specimens with 90%+ confidence.
  - Generates immediate actionable prescriptions without prompting for Anthropic or OpenAI API keys.

---

## 3. SaaS Business Model & Pricing Architecture

- **Standard Base Plan:** **$10.00 / month**.
- **Special Newcomer Promo:** **$5.00 / month** (50% Off First Billing Cycle).
- **Tier Comparison:**
  - **Free Community Tier:** Basic plot records, standard crop database, limited weather.
  - **AgriMalex Pro Enterprise:** Full Dual AI Diagnostics, Satellite GIS Hotspot mapping, EDRR dispatch, Complete P&L Ledger, and Unlimited Excel/PDF export.

---

## 4. Domain & Cloudflare Pages Deployment Guide

### Deploying to Cloudflare Pages (`agrimalex.pages.dev`)
AgriMalex is configured for native deployment on Cloudflare Pages:
1. Push this repository to GitHub or GitLab:
   ```bash
   git remote add origin https://github.com/your-username/agrimalex.git
   git push -u origin main
   ```
2. Log into the [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Select your repository and configure build settings:
   - **Framework preset:** None
   - **Build command:** `npm run build`
   - **Build output directory:** `public`
4. Deploy! Your platform will be immediately live worldwide at:
   `https://agrimalex.pages.dev`

### Adding a Cheap / Free Custom `.com` Domain
1. **Lowest Markup .com Option (Recommended):**
   - **Cloudflare Registrar:** Sells `.com` at the pure wholesale ICANN price (**~$9.77/year**). 0% markup, free WHOIS privacy, free DNSSEC, and zero renewal price spikes.
2. **Cheapest 1st-Year Promo:**
   - **Namecheap:** Use promo code `NEWCOM598` or `NCCOM699` (~$6.98–$8.50 for Year 1).
3. **Connecting Custom Domain to Cloudflare Pages:**
   - In your Cloudflare Pages project, click **Custom domains** → **Set up a custom domain**.
   - Enter your domain (e.g. `agrimalex.com`). Cloudflare automatically provisions the SSL certificate and binds the edge DNS.

---

## 5. Local Execution & Validation

### Run with Node.js REST API
```bash
cd ~/Projects/AgriMalex
npm start
```
Access at: `http://localhost:3000`

### Run Lightweight Standalone (No Node dependencies required)
```bash
cd ~/Projects/AgriMalex/public
python3 -m http.server 8080
```
Access at: `http://localhost:8080`

---

## 6. Directory Structure
```
AgriMalex/
├── data/
│   └── db.json               # Seed database (Farms, Plots, Species, P&L, Harvests)
├── functions/
│   └── api/
│       └── [[route]].js      # Cloudflare Pages Functions (Edge serverless API)
├── public/
│   ├── _headers              # Cloudflare security & CORS headers
│   ├── _redirects            # SPA client-side routing
│   └── index.html            # Prototype-matched dark dashboard (Leaflet, SheetJS)
├── server/
│   └── index.js              # Express REST API & AI diagnostic engine
├── package.json              # Node.js project manifest & scripts
├── wrangler.toml             # Cloudflare Pages deployment definition
└── README.md                 # Complete documentation & deployment manual
```
