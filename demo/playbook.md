# 🎬 Demo Playbook — Hướng dẫn thao tác từng bước

---

## 📋 TRƯỚC BUỔI PRESENT (Setup 1 lần)

### Tabs cần mở sẵn

| Tab | URL / Action |
|-----|-------------|
| 1 | GitHub repo → tab **Code** |
| 2 | GitHub repo → tab **Actions** |
| 3 | GitHub repo → **Settings → Secrets** |
| 4 | **Vercel Dashboard** (login sẵn) |
| 5 | **Render Dashboard** (login sẵn) |
| 6 | **Live App** (URL frontend trên Vercel) |
| 7 | **ChatGPT / Gemini** (login sẵn) |
| 8 | **VS Code** mở project |

### Files cần mở sẵn trong VS Code
- `.github/workflows/ci-pr-gate.yml`
- `.github/workflows/deploy.yml`
- `backend/server.js`
- `frontend/src/App.test.js`
- `demo/prompts.md` (để copy prompt nhanh)
- `demo/broken-server.js` (để switch demo)

### Git branch chuẩn bị

```bash
# Đảm bảo master sạch
git checkout master
git pull

# Tạo branch demo sẵn (để tạo PR)
git checkout -b demo/add-feature
git checkout master
```

---

## 🎬 DEMO 1 — Walk Through Workflow Files (Slide 5)

### Bước 1: Show ci-pr-gate.yml
1. Mở VS Code → file `.github/workflows/ci-pr-gate.yml`
2. Highlight từng phần:
   - **Line 1-9**: Tên, trigger, concurrency
   - **Line 11-30**: Job frontend-test (chỉ ra `CI: true`, `working-directory`)
   - **Line 32-48**: Job backend-check (chỉ ra `node --check`)
   - **Line 50-62**: Job security-scan (chỉ ra `exit-code: '1'`)
3. **Nói:** "3 job chạy song song. Bất kỳ cái nào fail → PR bị block."

### Bước 2: Show deploy.yml
1. Mở file `.github/workflows/deploy.yml`
2. Highlight:
   - **Line 2-7**: Triggers (push, PR, workflow_dispatch)
   - **Line 37-38**: `needs: ci` + `if:` condition
   - **Line 70-72**: Render deploy hook = 1 dòng `curl`
3. **Nói:** "Deploy chỉ chạy SAU KHI CI pass, và CHỈ trên master."

### Bước 3: Show GitHub Actions UI
1. Mở tab GitHub → **Actions**
2. Click vào workflow run gần nhất
3. Show biểu đồ job (parallel vs sequential)
4. Expand 1 step → show logs
5. **Nói:** "Đây là log thực tế. Mỗi step có timestamp, output rõ ràng."

---

## 🎬 DEMO 2 — Show Deployed App (Slide 7)

### Bước 1: Show live app
1. Mở tab **Live App** (Vercel URL)
2. **Thao tác demo:**
   - Xem danh sách bia (grid layout)
   - Click **Search**, gõ `"lager"` → submit → show filtered results
   - Click **Clear** → quay về trang chủ
   - Click vào 1 card bia → modal detail mở ra
   - Đóng modal
   - Click **Next →** → pagination page 2
3. **Nói:** "App đang live trên internet. Frontend ở Vercel, backend ở Render."

### Bước 2: Show Network tab
1. **F12** → DevTools → tab **Network**
2. Bấm search `"stout"` lại
3. Chỉ ra request `search?q=stout` → show:
   - Request URL = Render backend domain
   - Response JSON = `{ beers: [...], fromFallback: false }`
4. **Nói:** "Frontend gọi API từ backend trên Render. Data từ Punk API bên ngoài."

### Bước 3: Show health endpoint
1. Mở tab mới → gõ `https://<render-url>/api/health`
2. Show JSON response: `{ status: "ok", uptime: ..., service: "Tiger Tribe BFF" }`
3. **Nói:** "Health endpoint — dùng cho monitoring, kiểm tra backend còn sống."

### Bước 4: Show dashboards
1. Mở **Vercel Dashboard** → show deployment list, build time
2. Mở **Render Dashboard** → show service status, logs

---

## 🎬 DEMO 3 — Live Code Change + Pipeline (Optional, Slide 7)

> ⏱️ Chỉ demo nếu đủ thời gian và internet ổn

### Bước 1: Tạo code change nhỏ
```bash
# Trong VS Code, mở frontend/src/App.js
# Sửa line 67: thêm emoji
# TỪ:
<h1>Beer Explorer</h1>
# THÀNH:
<h1>🍺 Beer Explorer</h1>
```

### Bước 2: Commit & Push
```bash
git add frontend/src/App.js
git commit -m "feat: add beer emoji to header"
git push origin master
```

### Bước 3: Show pipeline
1. Mở GitHub → Actions → thấy workflow mới trigger
2. Show CI job running → pass
3. Show deploy jobs trigger
4. Đợi ~2 phút → refresh live app → emoji xuất hiện
5. **Nói:** "Từ sửa code đến app live = 2 phút. Zero manual steps."

### Bước 4: Revert (sau demo)
```bash
# Sửa lại về "Beer Explorer" (không emoji)
git add frontend/src/App.js
git commit -m "revert: remove emoji from header"
git push origin master
```

---

## 🎬 DEMO 4 — PR Gate: CI Catches Bug (Slide 5, Optional)

> Demo tạo PR với code lỗi → CI block merge

### Bước 1: Tạo branch với code lỗi
```bash
git checkout -b demo/broken-code

# Copy broken server vào (có syntax error)
cp demo/broken-server.js backend/server.js

git add backend/server.js
git commit -m "feat: update beer API endpoint"
git push origin demo/broken-code
```

### Bước 2: Tạo Pull Request
1. Mở GitHub → sẽ thấy banner "Compare & pull request"
2. Tạo PR: title = "Update beer API"
3. **Nói:** "Mình vừa push code có lỗi. Xem CI phản ứng thế nào."

### Bước 3: Show CI fail
1. Đợi ~1 phút → CI jobs chạy
2. `backend-check` job → ❌ FAIL (syntax error)
3. Show error log: `SyntaxError: missing ) after argument list`
4. PR hiển thị ❌ → **không merge được**
5. **Nói:** "CI phát hiện syntax error ngay. Code lỗi không bao giờ vào production."

### Bước 4: Cleanup
```bash
git checkout master
git branch -D demo/broken-code
git push origin --delete demo/broken-code
# Close PR trên GitHub
```

---

## 🎬 DEMO 5 — AI-Enhanced DevOps (Slide 8)

### Demo 5.1: Sinh YAML
1. Mở **ChatGPT/Gemini**
2. Mở file `demo/prompts.md` → copy **PROMPT 1**
3. Paste vào AI → enter
4. Đợi output YAML
5. Mở VS Code → show file `ci-pr-gate.yml` bên cạnh → so sánh
6. **Nói:** "AI generate ~80-90% chính xác. So sánh: cấu trúc giống, nhưng thiếu vài chi tiết mình cần tinh chỉnh."

### Demo 5.2: Debug CI Log
1. Copy **PROMPT 2** hoặc **PROMPT 3** từ `demo/prompts.md`
2. Paste vào AI
3. Show AI response — root cause + fix suggestion
4. **Nói:** "10 giây để hiểu lỗi. Thay vì 30 phút đọc Stack Overflow."

### Demo 5.3: Security Scan
1. Copy **PROMPT 4** từ `demo/prompts.md`
2. Paste → show AI analysis
3. **Nói:** "AI đọc CVE database, giải thích bằng tiếng người, và cho lệnh fix cụ thể."

### Demo 5.4: Sinh Test
1. Copy **PROMPT 5** từ `demo/prompts.md`
2. Paste → show generated test code
3. (Optional) Copy test code vào project, chạy thử
4. **Nói:** "AI generate test có nghĩa. Review + chạy = tăng coverage nhanh."

---

## 🎬 SHOW GitHub Secrets (Slide 6)

1. Mở GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Show danh sách secrets:
   - `VERCEL_TOKEN` — giá trị bị mask ***
   - `VERCEL_ORG_ID` — mask
   - `VERCEL_PROJECT_ID` — mask
   - `RENDER_HOOK` — mask
3. **Nói:** "4 secrets. Giá trị không ai thấy được. Chỉ pipeline truy cập khi chạy."

---

## ⚡ Quick Reference: Commands

```bash
# Chạy app local
npm start                         # Cả frontend + backend

# Test frontend
cd frontend && CI=true npx react-scripts test --watchAll=false

# Check backend syntax
node --check backend/server.js

# Check backend health (khi server đang chạy)
curl http://localhost:5000/api/health
```
