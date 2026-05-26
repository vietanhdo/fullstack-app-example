# 🤖 AI Demo Prompts — Copy & Paste Ready

Tất cả prompt bên dưới đã sẵn sàng paste vào ChatGPT / Gemini / Copilot.

---

## PROMPT 1 — Sinh YAML Workflow

```
Viết GitHub Actions workflow cho Node.js fullstack monorepo với cấu trúc:
- frontend/ là React (Create React App)
- backend/ là Express.js

Yêu cầu CI:
- Chạy unit test frontend (npm test với CI=true)
- Check syntax backend (node --check server.js)
- Scan bảo mật bằng Trivy (chỉ CRITICAL và HIGH, fail pipeline nếu tìm thấy)
- 3 job CI chạy song song
- Cache npm dependencies

Yêu cầu CD:
- Deploy frontend lên Vercel bằng Vercel CLI
- Deploy backend lên Render bằng Deploy Hook (curl POST)
- CD chỉ chạy khi push vào master VÀ CI pass
- Dùng GitHub Secrets cho: VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID, RENDER_HOOK

Thêm concurrency setting để cancel run cũ khi có push mới.
```

---

## PROMPT 2 — Debug CI Log

```
GitHub Actions CI pipeline của mình bị fail. Đây là error log:

npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR! 
npm ERR! While resolving: frontend@0.1.0
npm ERR! Found: react@18.3.1
npm ERR! node_modules/react
npm ERR!   react@"^18.3.1" from the root project
npm ERR! 
npm ERR! Could not resolve dependency:
npm ERR! peer react@"^17.0.0" required by some-old-package@1.0.0

Giúp mình:
1. Root cause là gì?
2. Cách fix nhanh nhất?
3. Cách fix đúng nhất (long-term)?
4. Làm sao ngăn lỗi này xảy ra lần nữa?
```

---

## PROMPT 3 — Debug CI Log (Test Fail)

```
Frontend test của mình fail trong GitHub Actions CI. Đây là log:

FAIL src/App.test.js
  ✕ renders Beer Explorer heading (45 ms)

  ● renders Beer Explorer heading

    TestingLibraryElementError: Unable to find an element with the text: /learn react/i. 
    This could be because the text is broken up by multiple elements.

    <body>
      <div>
        <div class="App">
          <header class="app-header">
            <h1>Beer Explorer</h1>
          </header>
        </div>
      </div>
    </body>

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total

Giúp mình phân tích: tại sao fail, fix như thế nào?
```

---

## PROMPT 4 — Security Scan Analysis

```
Trivy scan report cho Node.js project:

┌──────────────────┬────────────────┬──────────┬───────────────────────────────┬───────────────┐
│     Library      │ Vulnerability  │ Severity │         Title                 │ Fixed Version │
├──────────────────┼────────────────┼──────────┼───────────────────────────────┼───────────────┤
│ express          │ CVE-2024-29041 │ HIGH     │ URL Rewriting Vulnerability   │ 4.19.2        │
│ cookie           │ CVE-2024-47764 │ HIGH     │ Cookie parsing vulnerability  │ 0.7.0         │
│ path-to-regexp   │ CVE-2024-45296 │ HIGH     │ ReDoS vulnerability           │ 6.3.0         │
└──────────────────┴────────────────┴──────────┴───────────────────────────────┴───────────────┘

Giúp mình:
1. Mỗi CVE ảnh hưởng gì, ai có thể exploit?
2. Severity thực tế trong context của project này (Express backend cho beer catalog app)?
3. Lệnh cụ thể để fix từng CVE?
4. Nếu chưa fix được ngay, có workaround tạm thời nào không?
```

---

## PROMPT 5 — Sinh Test Cases

```
Viết unit test cho Express.js API endpoint sau bằng Jest + Supertest:

// GET /api/beers
app.get('/api/beers', async (req, res) => {
  const page    = Math.max(1, parseInt(req.query.page) || 1);
  const perPage = Math.min(25, parseInt(req.query.per_page) || 12);
  // fetch from external API with fallback to local data
  const beers = [...]; // array of beer objects
  res.json({ beers, page, perPage, fromFallback });
});

// GET /api/beers/search?q=lager
app.get('/api/beers/search', async (req, res) => {
  const q = (req.query.q || '').trim();
  if (!q) return res.status(400).json({ error: 'Missing query param: q' });
  const beers = [...]; // filtered results
  res.json({ beers, query: q, fromFallback });
});

// GET /api/health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() });
});

Cover các cases:
1. GET /api/beers — happy path, returns beer array
2. GET /api/beers?page=2&per_page=5 — custom pagination
3. GET /api/beers?per_page=100 — per_page capped at 25
4. GET /api/beers/search?q=lager — search returns results
5. GET /api/beers/search (no query) — returns 400 error
6. GET /api/health — returns status ok with uptime
```
