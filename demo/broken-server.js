// ⚠️ FILE NÀY CÓ LỖI CỐ Ý — DÙNG ĐỂ DEMO CI FAIL
// Copy nội dung này vào backend/server.js để tạo PR demo "CI catches bugs"

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ❌ BUG 1: Syntax Error — thiếu dấu ngoặc đóng
app.get('/api/beers', async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1;  // ← LỖI: thiếu )
  const perPage = Math.min(25, parseInt(req.query.per_page) || 12);
  res.json({ beers: [], page, perPage });
});

// ❌ BUG 2: Security Issue — hardcoded API key (Trivy/CodeQL sẽ flag)
const API_KEY = "sk-1234567890abcdef";  // ← LỖI: hardcoded secret
const DB_PASSWORD = "admin123";         // ← LỖI: hardcoded password

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', apiKey: API_KEY }); // ← LỖI: leak secret qua API
});

app.listen(PORT);
