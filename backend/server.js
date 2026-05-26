const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ─── Public Beer API ──────────────────────────────────────────────────────────
// Punk API v2 (api.punkapi.com) đã bị shutdown tháng 5/2024.
// Community rebuild v3: https://github.com/alxiw/punkapi
const PUNK_API_V3 = 'https://punkapi-alxiw.amvera.io/v3';

// ─── [Architecture: Reliability] Dynamic Data Enrichment Pool ─────────────────
// Tập hợp ảnh độ phân giải cao từ Unsplash để làm giàu dữ liệu động.
const PREMIUM_ASSETS = [
  "https://images.unsplash.com/photo-1614315584288-6927a7c732cb?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1566914565651-705b072e9a26?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1614316310271-97b7b320d33e?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618885472179-5e474019f2a9?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1575037614876-c385cb8148fb?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1657223257357-19069d3000dc?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1563514995964-f17e07675549?q=80&w=400&auto=format&fit=crop"
];

// ─── Fallback data (dùng khi external API down) ───────────────────────────────
const FALLBACK_BEERS = [
  { id:1,  name:'Buzz',             tagline:'A Real Bitter Experience.',          description:'A light, crisp and bitter IPA brewed with English and American hops.',              image:'https://images.punkapi.com/v2/keg.png', abv:4.5, ibu:60,  firstBrewed:'09/2007', foodPairing:['Spicy chicken tikka masala','Grilled chicken quesadilla'] },
  { id:2,  name:'Trashy Blonde',    tagline:'You Know You Shouldn\'t.',           description:'A titillating, neurotic, peroxide punk of a Pale Ale.',                             image:'https://images.punkapi.com/v2/2.png',   abv:4.1, ibu:41.5,firstBrewed:'04/2008', foodPairing:['Fresh crab with hollandaise sauce'] },
  { id:3,  name:'Berliner Weisse',  tagline:'Have it Your Way.',                  description:'A delicate, crisp, low ABV wheat beer.',                                            image:'https://images.punkapi.com/v2/keg.png', abv:3.6, ibu:8,   firstBrewed:'2010',    foodPairing:['Steamed mussels','Light salads'] },
  { id:4,  name:'Paradox Islay',    tagline:'Sit Back. Relax.',                   description:'Rich and complex whisky cask aged imperial stout.',                                  image:'https://images.punkapi.com/v2/4.png',   abv:10,  ibu:65,  firstBrewed:'2008',    foodPairing:['Blue cheese','Beef carpaccio'] },
  { id:5,  name:'Avery Brown Dredge',tagline:'Keeping it Monk.',                  description:'An ingredient driven, canonical American Barleywine.',                              image:'https://images.punkapi.com/v2/5.png',   abv:7.4, ibu:42,  firstBrewed:'2011',    foodPairing:['Rich chocolate cake'] },
  { id:6,  name:'Electric India',   tagline:'Vibrant Refreshing Saison.',         description:'A monsoon-inspired collaboration brew with American Saison yeast.',                 image:'https://images.punkapi.com/v2/6.png',   abv:5.2, ibu:38,  firstBrewed:'2012',    foodPairing:['Goats cheese salad'] },
  { id:7,  name:'AB:12',            tagline:'Sit Back. Relax. Repeat.',           description:'A secondary fermentation imperial stout.',                                           image:'https://images.punkapi.com/v2/7.png',   abv:11.2,ibu:35,  firstBrewed:'2012',    foodPairing:['Aged parmesan'] },
  { id:8,  name:'Fake Lager',       tagline:'Bohemian Pilsner.',                  description:'A delicate, crisp lager brewed for those who prefer craft.',                        image:'https://images.punkapi.com/v2/8.png',   abv:4.7, ibu:34,  firstBrewed:'2013',    foodPairing:['Soft pretzels','Beer battered fish'] },
  { id:9,  name:'AB:07',            tagline:'Whisky Cask Aged.',                  description:'Aged in Speyside whisky casks – a rich, warming imperial stout.',                   image:'https://images.punkapi.com/v2/9.png',   abv:12.5,ibu:60,  firstBrewed:'2007',    foodPairing:['Steak and ale pie'] },
  { id:10, name:'Bramling X',       tagline:'Single Hop Bramling Cross.',         description:'A hop-forward golden ale showcasing a classic English hop variety.',                image:'https://images.punkapi.com/v2/10.png',  abv:7.5, ibu:75,  firstBrewed:'2009',    foodPairing:['Jerk chicken'] },
  { id:11, name:'Misspent Youth',   tagline:'Milk & Honey.',                      description:'A comforting, oaty milk stout.',                                                     image:'https://images.punkapi.com/v2/11.png',  abv:7.3, ibu:30,  firstBrewed:'2013',    foodPairing:['Chocolate mousse'] },
  { id:12, name:'Arcade Nation',    tagline:'Seasonal Excursion.',                description:'Thick, rich, imperial stout with lashings of coffee and vanilla.',                  image:'https://images.punkapi.com/v2/12.png',  abv:12.2,ibu:70,  firstBrewed:'2016',    foodPairing:['Dark chocolate','Espresso tiramisu'] },
];

// ─── Format helper (Data Sanitization) ────────────────────────────────────────
function formatBeer(b) {
  let imgUrl = b.image_url ?? b.image ?? null;

  // [Reliability] Đánh chặn link chết từ API cộng đồng.
  // Áp dụng Deterministic Hashing để load ảnh động theo ID của bia.
  if (!imgUrl || imgUrl.includes('images.punkapi.com')) {
    // Nhân 17 (số nguyên tố) để tạo độ phân tán hash
    const hashId = b.id ? (b.id * 17) % PREMIUM_ASSETS.length : 0;
    imgUrl = PREMIUM_ASSETS[hashId];
  }

  return {
    id:          b.id,
    name:        b.name,
    tagline:     b.tagline,
    description: b.description,
    image:       imgUrl,
    abv:         b.abv   ?? 0,
    ibu:         b.ibu   ?? null,
    firstBrewed: b.first_brewed ?? b.firstBrewed ?? 'N/A',
    foodPairing: b.food_pairing ?? b.foodPairing ?? [],
  };
}

// ─── Generic fetch wrapper với fallback ──────────────────────────────────────
async function fetchPunkV3(path, fallbackFn) {
  try {
    const res = await fetch(`${PUNK_API_V3}${path}`, {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(5000), // timeout 5s
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    return { data: await res.json(), fromFallback: false };
  } catch (err) {
    console.warn(`[BFF] Punk API v3 failed (${err.message}), using fallback data.`);
    return { data: fallbackFn(), fromFallback: true };
  }
}

// ─── GET / — Status Dashboard ────────────────────────────────────────────────
app.get('/', (req, res) => {
  const uptimeSec = process.uptime();
  const hours = Math.floor(uptimeSec / 3600);
  const mins  = Math.floor((uptimeSec % 3600) / 60);
  const secs  = Math.floor(uptimeSec % 60);
  const uptime = `${hours}h ${mins}m ${secs}s`;

  const now = new Date();
  const dateStr = now.toLocaleDateString('vi-VN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    timeZone: 'Asia/Ho_Chi_Minh'
  });
  const timeStr = now.toLocaleTimeString('vi-VN', {
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    timeZone: 'Asia/Ho_Chi_Minh'
  });

  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tiger Tribe BFF — Status</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', sans-serif;
      background: #0a0e17;
      color: #e0e6f0;
      min-height: 100vh;
      display: flex; align-items: center; justify-content: center;
    }
    .container {
      max-width: 720px; width: 90%;
      background: linear-gradient(145deg, #111827, #0d1321);
      border: 1px solid #1e293b;
      border-radius: 20px;
      padding: 48px 40px;
      box-shadow: 0 0 60px rgba(34, 211, 138, 0.06), 0 0 120px rgba(34, 211, 138, 0.03);
    }
    .status-row {
      display: flex; align-items: center; gap: 12px;
      margin-bottom: 8px;
    }
    .pulse {
      width: 12px; height: 12px;
      background: #22d38a; border-radius: 50%;
      animation: pulse 2s infinite;
      box-shadow: 0 0 8px #22d38a;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: .6; transform: scale(1.3); }
    }
    .status-text { font-size: 14px; font-weight: 600; color: #22d38a; text-transform: uppercase; letter-spacing: 2px; }
    h1 {
      font-size: 32px; font-weight: 900;
      background: linear-gradient(135deg, #22d38a, #3b82f6);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      margin: 4px 0 4px;
    }
    .subtitle { color: #64748b; font-size: 14px; margin-bottom: 32px; }
    .badge { display: inline-block; background: #1e293b; color: #22d38a; padding: 3px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; letter-spacing: 1px; }

    .info-grid {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 16px; margin-bottom: 32px;
    }
    .info-card {
      background: #0f172a; border: 1px solid #1e293b;
      border-radius: 12px; padding: 20px;
    }
    .info-card .label { font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 6px; }
    .info-card .value { font-size: 20px; font-weight: 700; color: #f1f5f9; }
    .info-card .value.green { color: #22d38a; }
    .info-card .value.blue { color: #3b82f6; }

    .section-title { font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px; }

    .endpoints { margin-bottom: 32px; }
    .endpoint {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 16px; margin-bottom: 6px;
      background: #0f172a; border: 1px solid #1e293b;
      border-radius: 10px; font-size: 13px;
      transition: border-color .2s;
    }
    .endpoint:hover { border-color: #22d38a; }
    .method { font-weight: 700; color: #22d38a; min-width: 36px; }
    .path { color: #94a3b8; font-family: 'SF Mono', 'Fira Code', monospace; }
    .desc { color: #475569; margin-left: auto; font-size: 12px; }

    .pipeline {
      background: #0f172a; border: 1px solid #1e293b;
      border-radius: 12px; padding: 20px; margin-bottom: 32px;
    }
    .pipeline-steps {
      display: flex; align-items: center; gap: 0; flex-wrap: wrap;
      justify-content: center;
    }
    .step {
      display: flex; align-items: center; gap: 8px;
      padding: 8px 14px;
      background: #111827; border: 1px solid #1e293b;
      border-radius: 8px; font-size: 12px; font-weight: 600;
      white-space: nowrap;
    }
    .step .icon { font-size: 16px; }
    .arrow { color: #22d38a; font-size: 18px; margin: 0 4px; }

    .footer {
      text-align: center; color: #334155; font-size: 12px;
      padding-top: 20px; border-top: 1px solid #1e293b;
    }
    .footer a { color: #3b82f6; text-decoration: none; }
    .footer a:hover { text-decoration: underline; }

    @media (max-width: 600px) {
      .info-grid { grid-template-columns: 1fr; }
      .pipeline-steps { flex-direction: column; }
      .arrow { transform: rotate(90deg); }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="status-row">
      <div class="pulse"></div>
      <span class="status-text">Operational</span>
      <span class="badge">BFF</span>
    </div>
    <h1>🍺 Tiger Tribe BFF</h1>
    <p class="subtitle">Backend-for-Frontend · HEINEKEN × Tiger Tribe · Ho Chi Minh City</p>

    <div class="info-grid">
      <div class="info-card">
        <div class="label">Server Uptime</div>
        <div class="value green">${uptime}</div>
      </div>
      <div class="info-card">
        <div class="label">Node.js</div>
        <div class="value">${process.version}</div>
      </div>
      <div class="info-card">
        <div class="label">📅 Ngày</div>
        <div class="value blue" style="font-size:15px">${dateStr}</div>
      </div>
      <div class="info-card">
        <div class="label">🕐 Giờ VN</div>
        <div class="value green">${timeStr}</div>
      </div>
    </div>

    <div class="endpoints">
      <div class="section-title">📡 API Endpoints</div>
      <div class="endpoint">
        <span class="method">GET</span>
        <span class="path">/api/health</span>
        <span class="desc">Health check</span>
      </div>
      <div class="endpoint">
        <span class="method">GET</span>
        <span class="path">/api/beers</span>
        <span class="desc">List beers (paginated)</span>
      </div>
      <div class="endpoint">
        <span class="method">GET</span>
        <span class="path">/api/beers/search?q=</span>
        <span class="desc">Search beers</span>
      </div>
      <div class="endpoint">
        <span class="method">GET</span>
        <span class="path">/api/beers/:id</span>
        <span class="desc">Beer detail</span>
      </div>
    </div>

    <div class="pipeline">
      <div class="section-title">⚙️ CI/CD Pipeline</div>
      <div class="pipeline-steps">
        <div class="step"><span class="icon">📝</span> Code Push</div>
        <span class="arrow">→</span>
        <div class="step"><span class="icon">🧪</span> CI Test</div>
        <span class="arrow">→</span>
        <div class="step"><span class="icon">🔒</span> Security</div>
        <span class="arrow">→</span>
        <div class="step"><span class="icon">🚀</span> Deploy</div>
        <span class="arrow">→</span>
        <div class="step"><span class="icon">🌐</span> Live</div>
      </div>
    </div>

    <div class="footer">
      Powered by <a href="https://expressjs.com">Express.js</a> · Deployed on <a href="https://render.com">Render</a> · 
      CI/CD via <a href="https://github.com/features/actions">GitHub Actions</a>
    </div>
  </div>
</body>
</html>`);
});

// ─── GET /api/health ──────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'Tiger Tribe BFF',
  });
});

// ─── GET /api/beers ───────────────────────────────────────────────────────────
app.get('/api/beers', async (req, res) => {
  const page    = Math.max(1, parseInt(req.query.page)     || 1);
  const perPage = Math.min(25, parseInt(req.query.per_page) || 12);

  const { data, fromFallback } = await fetchPunkV3(
    `/beers?page=${page}&per_page=${perPage}`,
    () => FALLBACK_BEERS.slice((page - 1) * perPage, page * perPage)
  );

  const beers = Array.isArray(data) ? data.map(formatBeer) : [];
  res.json({ beers, page, perPage, fromFallback });
});

// ─── GET /api/beers/search?q=lager ───────────────────────────────────────────
app.get('/api/beers/search', async (req, res) => {
  const q = (req.query.q || '').trim();
  if (!q) return res.status(400).json({ error: 'Missing query param: q' });

  const { data, fromFallback } = await fetchPunkV3(
    `/beers?beer_name=${encodeURIComponent(q)}`,
    () => FALLBACK_BEERS.filter(b =>
      b.name.toLowerCase().includes(q.toLowerCase()) ||
      b.tagline.toLowerCase().includes(q.toLowerCase())
    )
  );

  const beers = Array.isArray(data) ? data.map(formatBeer) : [];
  res.json({ beers, query: q, fromFallback });
});

// ─── GET /api/beers/:id ───────────────────────────────────────────────────────
app.get('/api/beers/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid beer ID' });

  const { data, fromFallback } = await fetchPunkV3(
    `/beers/${id}`,
    () => FALLBACK_BEERS.filter(b => b.id === id)
  );

  const list  = Array.isArray(data) ? data : [data];
  const found = list[0];
  if (!found) return res.status(404).json({ error: 'Beer not found' });

  res.json({ ...formatBeer(found), fromFallback });
});

// ─── Server start (only when run directly, not when imported for tests) ──────
if (require.main === module) {
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Tiger Tribe BFF] Listening on port ${PORT}`);
    console.log(`[Tiger Tribe BFF] Primary API : ${PUNK_API_V3}`);
    console.log(`[Tiger Tribe BFF] Fallback    : ${FALLBACK_BEERS.length} beers (local)`);
  });

  // [Reliability] Graceful Shutdown
  ['SIGINT', 'SIGTERM'].forEach(sig =>
    process.on(sig, () => {
      console.log(`\n[${sig}] Shutting down...`);
      server.close(() => { console.log('Closed.'); process.exit(0); });
    })
  );
}

module.exports = app;