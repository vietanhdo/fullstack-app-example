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