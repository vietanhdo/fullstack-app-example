# 🎤 Script Phần 1 — Slide 1 → 5

---

## SLIDE 1 — Title (2 min)

> "Xin chào tất cả mọi người! Cảm ơn mọi người đã dành thời gian tham gia buổi webinar hôm nay."

> "Hôm nay mình sẽ nói về một chủ đề mà nếu các bạn đang làm hoặc sẽ làm software developer, thì đây là **kỹ năng bắt buộc phải biết** — CI/CD và DevOps."

> "Nhưng trước khi mọi người sợ mấy từ viết tắt nghe phức tạp, mình muốn nói trước: **mọi thứ hôm nay mình sẽ giải thích bằng ví dụ thực tế**. Không cần background DevOps. Không cần biết Docker. Chỉ cần biết code cơ bản là theo được."

> "Và đặc biệt — mình sẽ demo trên một **project thật** — Beer Explorer — một ứng dụng React + Express mà mình đã build và deploy hoàn toàn tự động. Mọi người sẽ thấy từ lúc mình push code đến lúc app live trên internet — **không cần bất kỳ thao tác thủ công nào**."

> "Nếu bạn là người chưa biết gì về DevOps — sau buổi này bạn sẽ hiểu nó là gì và tại sao quan trọng. Nếu bạn đã biết rồi — mình sẽ show cách AI đang thay đổi cách chúng ta làm DevOps. OK, let's go!"

---

## SLIDE 2 — Agenda (1 min)

> "Đây là lộ trình hôm nay — 5 phần."

> "Phần 1, mình sẽ giải thích DevOps và CI/CD là gì — bằng ngôn ngữ đời thường, có analogy dễ hiểu."

> "Phần 2, đi vào GitHub Actions — tool chính để làm CI/CD. Mình sẽ giải thích từng thành phần: workflow, job, step, runner, secrets."

> "Phần 3, deploy thực tế. Mình sẽ show cách frontend lên Vercel, backend lên Render — toàn bộ tự động."

> "Phần 4, AI. Cái này mới và thú vị. AI giúp mình viết pipeline, debug lỗi, scan bảo mật, và tạo test cases."

> "Cuối cùng, Best Practices và Q&A."

> "Tổng cộng khoảng 80 phút. Mọi người có thể hỏi bất cứ lúc nào nhé."

---

## SLIDE 3 — PHẦN 01: DevOps & CI/CD là gì? (15 min)

### Mở đầu

> "OK, trước khi nhảy vào code, mình muốn mọi người hiểu rõ **tại sao** chúng ta cần CI/CD. Vì nếu không hiểu vấn đề, thì solution sẽ vô nghĩa."

### Vấn đề — Ngày xưa deploy như thế nào?

> "Hãy tưởng tượng — bạn là developer. Bạn vừa code xong một tính năng mới. Bây giờ bạn muốn đưa nó lên server cho user xài. Ngày xưa, quy trình như thế nào?"

> "Bước 1: Copy file bằng FTP lên server. Bước 2: SSH vào server, chạy lệnh restart. Bước 3: Cầu nguyện. Bước 4: Nếu lỗi — rollback bằng cách... copy lại file cũ."

> "Nghe buồn cười nhưng rất nhiều team vẫn làm thế. Và vấn đề là gì? **Mỗi lần deploy là một canh bạc**. Không ai biết code mới có break gì không cho đến khi user bắt đầu kêu."

> "CI/CD sinh ra để giải quyết đúng vấn đề này."

### DevOps — Không phải tool, là văn hóa

> "Đầu tiên, DevOps. Rất nhiều người nghĩ DevOps là một tool, hoặc một job title. Sai."

> "**DevOps là một văn hóa làm việc.** Dev là Developer — người viết code. Ops là Operations — người vận hành server. Trước đây, 2 team này ngồi riêng, ít nói chuyện. Dev code xong quăng qua Ops, nói 'deploy đi'. Ops deploy xong lỗi, nói 'code của mấy ông sai'. Blame game."

> "DevOps nói: **cả hai cùng chịu trách nhiệm** từ lúc viết code đến lúc app chạy production. Không còn 'code của tui chạy trên máy tui' nữa."

**Ví dụ đời thường:**

> "Ví dụ nhé — trong một nhà hàng. Trước đây, đầu bếp nấu xong món, đưa ra quầy, xong việc. Phục vụ mang ra bàn. Nếu khách than đồ ăn nguội — đầu bếp nói 'tại phục vụ mang chậm'. Phục vụ nói 'tại bếp ra trễ'."

> "DevOps giống như khi cả bếp và phục vụ **cùng ngồi lại**, thiết kế quy trình: món nào ra trước, nhiệt độ giữ ra sao, thời gian mang bao lâu. Kết quả? Khách hàng hạnh phúc hơn, ít lỗi hơn."

### CI — Continuous Integration

> "Bây giờ, CI — Continuous Integration. Từ 'Integration' nghe phức tạp, nhưng ý nghĩa rất đơn giản."

> "**CI = Mỗi khi bạn push code, hệ thống TỰ ĐỘNG kiểm tra code của bạn.**"

> "Kiểm tra gì? Cài dependencies có đúng không, code có compile được không, test cases có pass không, có lỗi bảo mật nào không."

**Ví dụ đời thường:**

> "Tưởng tượng nhà máy sản xuất iPhone. Mỗi linh kiện được lắp vào, **ngay lập tức** qua trạm kiểm tra chất lượng. Camera có chụp được không? Màn hình có sáng không? Pin có charge không? Nếu linh kiện nào lỗi → phát hiện **ngay**, không phải đợi đến khi đóng hộp giao cho khách rồi khách gọi kêu."

> "CI cũng vậy. Mỗi dòng code push lên → hệ thống test ngay → biết lỗi **trong 2 phút** thay vì phát hiện sau 2 tuần khi deploy."

**Ví dụ trong project thật:**

> "Trong project Beer Explorer của mình — mỗi khi mở Pull Request, GitHub Actions tự động chạy 3 việc: **test React frontend**, **check syntax backend**, và **scan bảo mật bằng Trivy**. Nếu bất kỳ cái nào fail → PR bị block, không merge được. Đảm bảo code xấu không bao giờ vào production."

### CD — Continuous Deployment

> "CD — Continuous Deployment. Đây là bước tiếp theo."

> "**CD = Khi CI pass (code đã được kiểm tra), hệ thống TỰ ĐỘNG deploy code lên server.**"

> "Không cần SSH. Không cần copy file. Không cần cầu nguyện. Push code → test pass → app live. Xong."

**Ví dụ đời thường:**

> "Quay lại nhà máy iPhone. CI là khâu kiểm tra chất lượng. CD là khâu **đóng gói + giao hàng**. Khi linh kiện pass QC → máy tự động đóng hộp, dán nhãn, chuyển lên xe tải, ship đến Apple Store. Toàn bộ tự động, không cần nhân viên bê từng cái hộp."

**Ví dụ trong project:**

> "Trong project của mình: push code vào branch `master` → CI chạy test → pass → frontend TỰ ĐỘNG deploy lên Vercel, backend TỰ ĐỘNG deploy lên Render. Trong 2-3 phút, app mới đã live. Mình không cần làm bất kỳ gì ngoài commit code."

### Flow tổng quát

> "Vậy nhìn tổng thể: **Code → Push → Test → Build → Deploy → Monitor**. Đây là vòng lặp liên tục — mỗi ngày có thể deploy 10 lần, 50 lần. Netflix deploy **hàng nghìn lần mỗi ngày** nhờ CI/CD."

> "Và điều tuyệt vời là: setup một lần, chạy mãi mãi. Mình sẽ show cách setup ngay bây giờ."

---

## SLIDE 4 — PHẦN 02: GitHub Actions — Anatomy (12 min)

### Mở đầu

> "OK, giờ vào phần chính. GitHub Actions — đây là **tool miễn phí** mà GitHub cung cấp để làm CI/CD. Không cần cài server riêng. Không cần Jenkins. Mọi thứ nằm ngay trong repo GitHub."

> "Mình sẽ giải thích 6 khái niệm. Nghe thì nhiều, nhưng mình sẽ dùng analogy để mọi người dễ nhớ."

### Analogy tổng thể — Nhà hàng tự động

> "Mình sẽ dùng analogy nhà hàng để giải thích toàn bộ. Tưởng tượng bạn mở một nhà hàng **hoàn toàn tự động** — không có đầu bếp, không có phục vụ, khách bước vào → order → robot nấu → robot mang ra."

### Workflow

> "**Workflow** = **thực đơn** của nhà hàng. Một file YAML nằm trong folder `.github/workflows/`. Mỗi file YAML là một workflow."

> "Ví dụ: thực đơn sáng (workflow CI cho PR), thực đơn tối (workflow CD cho deploy). Mỗi thực đơn có các món riêng."

> "Trong project mình có 2 workflows: `ci-pr-gate.yml` chạy khi mở PR, và `deploy.yml` chạy khi push master."

### Trigger

> "**Trigger** = **cách khách order**. Order bằng QR code (push code), order qua app (pull request), order tự động lúc 12h trưa (schedule), hoặc gọi điện đặt trước (workflow_dispatch)."

> "Trong YAML: `on: push` nghĩa là 'chạy workflow này khi có code được push lên'. `on: pull_request` nghĩa là 'chạy khi mở PR'."

> "Trigger phổ biến nhất: `push` và `pull_request`."

### Job

> "**Job** = **một món ăn** trong thực đơn. Mỗi workflow có nhiều job."

> "Điểm quan trọng: các job mặc định chạy **song song** — giống như trong bếp, anh đầu bếp A làm appetizer, anh B làm main course, anh C làm dessert — cùng lúc. Nhanh hơn rất nhiều so với 1 người làm tuần tự."

> "Trong project: CI workflow có 3 job chạy song song — test frontend, check backend, scan security. Thay vì mất 3 phút (1+1+1), chỉ mất 1 phút (job lâu nhất)."

> "Nhưng khi cần thứ tự — ví dụ phải test trước rồi mới deploy — dùng `needs:`. Giống như nói 'dessert chỉ mang ra SAU KHI main course xong'."

### Step

> "**Step** = **một bước nấu** trong mỗi món. Ví dụ: Bước 1 rửa rau. Bước 2 cắt thịt. Bước 3 xào. Bước 4 bày ra đĩa."

> "Trong YAML, step có 2 loại: `uses:` là dùng recipe có sẵn (action từ marketplace — giống mua sốt đóng chai). `run:` là tự nấu (chạy shell command)."

> "Nếu bất kỳ step nào fail — cả job dừng lại. Giống như đang nấu mà phát hiện thịt hư → dừng, không tiếp tục."

### Runner

> "**Runner** = **cái bếp** nơi nấu ăn. GitHub cho mượn bếp miễn phí — `ubuntu-latest` (bếp Linux), `windows-latest` (bếp Windows), `macos-latest` (bếp Mac)."

> "Mỗi job chạy trên một runner riêng — một cái bếp sạch, trống, mới toanh. Không có gì còn sót lại từ lần nấu trước. Đảm bảo kết quả luôn nhất quán."

> "Free tier: 2,000 phút/tháng cho private repo. Public repo = **không giới hạn**. Quá đủ cho project sinh viên và startup."

### Action

> "**Action** = **recipe có sẵn** từ marketplace. Thay vì tự viết 10 dòng script để clone code, bạn dùng `actions/checkout@v4` — 1 dòng. Thay vì tự cài Node.js, bạn dùng `actions/setup-node@v4`."

> "GitHub Marketplace có **hàng ngàn action** cho mọi thứ: deploy, test, lint, send notification, scan security. Tiết kiệm rất nhiều thời gian."

### Secrets

> "Cuối cùng, **Secrets** = **két sắt** trong nhà hàng. Nơi cất giữ recipe bí mật, mã PIN, chìa khóa kho."

> "Trong CI/CD, bạn cần lưu API key, token, password. KHÔNG BAO GIỜ viết trực tiếp trong code — ai clone repo sẽ thấy hết."

> "GitHub Secrets giải quyết: lưu giá trị được mã hóa, chỉ pipeline mới truy cập được. Trong logs, GitHub tự động mask thành `***`. Cực kỳ an toàn."

> "Project mình có 4 secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` (deploy frontend), và `RENDER_HOOK` (deploy backend)."

**Ví dụ thực tế — ATM:**

> "Giống như bạn rút tiền ATM. Mã PIN của bạn không hiển thị trên màn hình. Không in trên hóa đơn. Chỉ bạn và ngân hàng biết. Secrets trong GitHub Actions cũng vậy — chỉ pipeline biết, không ai khác thấy được."

### Tóm tắt bằng analogy

> "Vậy tóm lại nhé: **Workflow** = thực đơn. **Trigger** = cách order. **Job** = món ăn (chạy song song). **Step** = bước nấu. **Runner** = cái bếp. **Action** = recipe có sẵn. **Secrets** = két sắt. Nhớ analogy này là nhớ hết."

---

## SLIDE 5 — DEMO 1: File Workflow Thực Tế (10 min)

### Mở đầu

> "Lý thuyết xong rồi. Bây giờ mình mở code thật — để mọi người thấy những khái niệm khi nãy trông như thế nào trong thực tế."

### Demo file ci-pr-gate.yml

> "Đây là file workflow CI — chạy mỗi khi ai đó mở Pull Request vào branch master."

```yaml
name: 🛡️ PR Quality & Security Gate     ← Tên workflow (hiện trên GitHub UI)

on:
  pull_request:                          ← TRIGGER: chạy khi mở PR
    branches: [ "master" ]               ← chỉ PR vào master
```

> "Dòng đầu tiên `name:` — đặt tên dễ hiểu. Khi mở GitHub Actions tab, bạn sẽ thấy tên này."

> "Dòng `on: pull_request` — đây là **Trigger**. Mình nói: 'GitHub ơi, mỗi khi ai mở PR vào master, hãy chạy workflow này'. Chỉ master thôi — không chạy cho các branch khác."

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

> "Phần `concurrency` rất hay. Tưởng tượng bạn push code, pipeline bắt đầu chạy. Rồi 30 giây sau bạn nhận ra quên sửa gì đó, push lần nữa. Không có `concurrency`, cả 2 pipeline cùng chạy, tốn tài nguyên. Với `cancel-in-progress: true`, pipeline cũ tự động huỷ, chỉ chạy pipeline mới nhất. Tiết kiệm thời gian và tiền."

### Demo 3 jobs

> "Giờ nhìn vào 3 jobs — chạy SONG SONG:"

> "**Job 1: Frontend Test.** Cài Node.js 20, `npm ci` (install dependencies), rồi `npm test` với biến `CI: true`. Biến `CI: true` nói cho React biết: chạy test xong thì **dừng lại**, không chờ input từ người dùng."

> "**Job 2: Backend Check.** Cài Node.js, `npm ci`, rồi `node --check server.js`. Lệnh `--check` không chạy server — chỉ **kiểm tra cú pháp**. Nếu có syntax error → fail ngay."

> "**Job 3: Security Scan.** Dùng **Trivy** — một tool mã nguồn mở, scan toàn bộ folder tìm **lỗ hổng bảo mật** trong dependencies. `severity: CRITICAL,HIGH` = chỉ quan tâm lỗi nghiêm trọng. `exit-code: 1` = nếu tìm thấy lỗi → **block PR**, không cho merge."

> "Ba cái này chạy cùng lúc. Kết quả? Feedback trong 1-2 phút. Nếu cả 3 pass → PR có dấu ✅ xanh. Nếu bất kỳ cái nào fail → ❌ đỏ, không merge được."

**Ví dụ thực tế:**

> "Giống như kiểm tra sức khỏe định kỳ. Bạn đi khám — bác sĩ cho xét nghiệm máu, đo huyết áp, chụp X-quang — cùng lúc. Không cần làm tuần tự. Kết quả nhanh hơn. Nếu bất kỳ chỉ số nào bất thường → bác sĩ nói 'dừng, cần kiểm tra thêm' trước khi bạn ra về."

### Demo file deploy.yml

> "File thứ hai — deploy. Chạy khi push code vào master."

```yaml
on:
  push:
    branches: [master]         ← Push vào master
  workflow_dispatch:           ← HOẶC trigger manual từ UI
```

> "`workflow_dispatch` là bonus — cho phép mình vào GitHub, bấm nút 'Run workflow' bất kỳ lúc nào. Rất hữu ích khi cần redeploy mà không cần push code mới."

```yaml
jobs:
  ci:                          ← Job 1: Test trước
    name: Validate and Test Codebase

  deploy-frontend:
    needs: ci                  ← Job 2: Chỉ chạy SAU KHI ci pass
    if: github.ref == 'refs/heads/master' && github.event_name != 'pull_request'

  deploy-backend:
    needs: ci                  ← Job 3: Cũng chờ ci
    if: ...
```

> "Chú ý `needs: ci` — đây là **dependency chain**. Deploy chỉ chạy SAU KHI job CI pass. Nếu CI fail → deploy KHÔNG chạy. An toàn tuyệt đối."

> "`if:` thêm một lớp bảo vệ nữa: chỉ deploy khi đúng là branch master VÀ không phải PR. Tại sao? Vì khi mở PR cũng trigger `push` event — nhưng mình không muốn deploy code chưa review."

### Demo trên GitHub UI

> "OK, giờ mình mở GitHub để show trực quan."

> *(Mở GitHub → tab Actions → show workflow runs)*

> "Đây là danh sách các lần pipeline chạy. Mỗi dòng là một lần — có commit message, thời gian, trạng thái ✅ hoặc ❌."

> *(Click vào 1 run → show job graph)*

> "Nhìn biểu đồ này — 3 job CI chạy song song, rồi 2 job deploy chạy sau. Giống flowchart mình vẽ trên slide."

> *(Expand 1 step → show logs)*

> "Mỗi step có log chi tiết. Nếu lỗi — bạn expand ra đọc, biết chính xác dòng nào fail. Và phần sau mình sẽ show cách dùng AI để đọc log này nhanh hơn."


---
---
---


# 🎤 Script Phần 2 — Slide 6 → 10

---

## SLIDE 6 — PHẦN 03: Kiến trúc Deploy Vercel + Render (10 min)

### Mở đầu

> "Phần trước mình đã show CI — hệ thống tự động test code. Giờ đến phần CD — tự động **deploy**. Code test pass rồi — giờ đưa lên internet cho user xài."

> "Câu hỏi đầu tiên: deploy lên đâu? Có hàng trăm nền tảng: AWS, Azure, GCP, DigitalOcean... Nhưng hôm nay mình dùng combo **Vercel + Render** — và mình sẽ giải thích tại sao."

### Tại sao Vercel cho Frontend?

> "Vercel được tạo bởi đội ngũ đằng sau **Next.js** — framework React phổ biến nhất. Nó tối ưu cho frontend."

> "Điều đặc biệt của Vercel: **Edge CDN toàn cầu**. Nghĩa là khi user ở Việt Nam truy cập app, Vercel phục vụ từ server gần Việt Nam nhất. User ở Mỹ? Server gần Mỹ. Kết quả: app load **cực nhanh** ở mọi nơi."

**Ví dụ đời thường:**

> "Giống như chuỗi cà phê Highlands. Thay vì chỉ có 1 quán ở Quận 1, họ mở khắp Sài Gòn. Bạn ở đâu cũng có quán gần nhà. Vercel CDN hoạt động giống vậy — nội dung được copy đến hàng trăm 'quán' trên toàn thế giới."

### Tại sao Render cho Backend?

> "Render thì đơn giản nhất cho backend Node.js. Connect GitHub repo, chọn branch, Render lo hết: build, deploy, SSL, monitoring."

> "Free tier: 750 giờ/tháng — quá đủ cho project sinh viên hoặc side project. Có một hạn chế: **cold start** — nếu app không có traffic trong 15 phút, Render tắt server. Lần truy cập sau mất 30 giây khởi động lại. Nhưng đối với demo và project học tập, không thành vấn đề."

### Flow tổng thể

> "Nhìn diagram trên slide: Developer push code → GitHub nhận → trigger Actions → CI pipeline chạy test → pass → hai luồng deploy song song: Vercel nhận frontend, Render nhận backend."

> "Toàn bộ tự động. Mình push code, đi pha ly cà phê, quay lại app đã live."

### Setup Steps

> "Setup chỉ cần làm **một lần**:"

> "**Bước 1 — Vercel:** Vào vercel.com, connect GitHub repo, Vercel tự detect 'à, đây là React app', tự biết cách build. Rồi tạo token, paste vào GitHub Secrets. Cần 3 secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`."

> "**Bước 2 — Render:** Vào render.com, tạo Web Service, connect GitHub repo, config root directory là `backend`, start command là `node server.js`. Rồi vào Settings → Deploy Hooks → tạo hook → copy URL. Paste URL vào GitHub Secrets dưới tên `RENDER_HOOK`."

> "**Bước 3 — GitHub Secrets:** Vào repo → Settings → Secrets and Variables → Actions → thêm 4 secrets. Giá trị được mã hóa, không ai thấy sau khi lưu."

**Ví dụ đời thường:**

> "Giống như bạn đăng ký dịch vụ giao hàng cho shop online. Lần đầu phải setup: đăng ký tài khoản, nhập địa chỉ kho, paste API key. Sau đó? Mỗi khi có đơn hàng mới → hệ thống tự giao. Bạn không cần gọi shipper mỗi lần."

---

## SLIDE 7 — DEMO 2: Full Pipeline End-to-End (10 min)

### Mở đầu

> "Giờ mình show code deploy thực tế, rồi demo live."

### Walk through deploy code

> "Backend deploy — mọi người đoán cần bao nhiêu dòng code? 10 dòng? 20 dòng?"

```yaml
- name: Invoke Render Build Hook
  run: |
    curl --fail --request POST "${{ secrets.RENDER_HOOK }}"
```

> "**Một dòng.** Một dòng `curl`. Gửi POST request đến Render. Render nhận → tự pull code mới nhất từ GitHub → tự build → tự deploy. Xong."

> "`--fail` nghĩa là: nếu Render trả về lỗi, step này fail, pipeline dừng lại. Không lặng lẽ bỏ qua."

> "Tại sao đơn giản vậy? Vì Render đã connect với GitHub repo rồi. Mình chỉ cần **nói 'đi deploy đi'**, Render lo hết phần còn lại."

> "Frontend deploy thì dài hơn một chút:"

```yaml
- run: npm install --global vercel@latest          # Cài Vercel CLI
- run: vercel pull --yes --environment=production   # Pull config
- run: vercel deploy --prod                         # Build + Deploy
```

> "3 steps: cài Vercel CLI, pull config project, rồi deploy. Vercel CLI tự build React app, tự upload lên Edge CDN, tự cấp SSL. Mình không cần config nginx, không cần setup HTTPS."

### Demo live app

> "OK, giờ mình mở app trên browser."

> *(Mở live app URL)*

> "Đây là **Beer Explorer** — app thật, đang chạy production. Frontend trên Vercel, backend trên Render."

> "Mình thử search 'lager'... *(search)* Kết quả trả về ngay. Click vào card... *(click)* Modal hiện chi tiết bia — tên, ABV, food pairing."

> *(Mở DevTools → Network tab)*

> "Nhìn Network tab — khi mình search, browser gửi request đến **Render backend** (URL khác domain với frontend). Backend call Punk API bên ngoài, format data, trả về. Frontend hiển thị. Đây là kiến trúc **BFF — Backend For Frontend**."

> "Và toàn bộ app này — từ code trên laptop đến live trên internet — chỉ cần `git push`. Không SSH, không FTP, không manual deploy."

### (Optional) Live deploy

> "Nếu mọi người muốn, mình có thể demo live: sửa 1 dòng code, commit, push — rồi cùng xem pipeline chạy realtime trên GitHub."

---

## SLIDE 8 — PHẦN 04: AI-Enhanced CI/CD (15 min)

### Mở đầu

> "Phần cuối cùng trước Q&A — và mình nghĩ đây là phần **thú vị và thực tế nhất**."

> "AI đang thay đổi mọi ngành nghề, và DevOps không ngoại lệ. Nhưng mình muốn nói rõ một điều trước:"

> "**AI giúp bạn nhanh hơn, nhưng không thay thế bạn.** AI sinh YAML cho bạn, nhưng nếu bạn không hiểu YAML đó làm gì, bạn không biết nó đúng hay sai. Giống như GPS chỉ đường — rất tiện, nhưng nếu GPS nói 'rẽ phải vào sông', bạn phải đủ hiểu biết để biết đó là sai."

> "Đó là lý do mình dạy phần 1, 2, 3 trước — để mọi người CÓ NỀN TẢNG. Giờ AI là công cụ **tăng tốc** dựa trên nền tảng đó."

### 4.1 — Sinh YAML tự động

> "Use case đầu tiên: bạn mới bắt đầu, chưa bao giờ viết GitHub Actions workflow. Thay vì đọc documentation 2 giờ, bạn hỏi AI."

> "Mình sẽ demo prompt thực tế:"

```
Viết GitHub Actions workflow cho Node.js monorepo với:
- frontend/ là React, backend/ là Express
- CI: test frontend, check syntax backend, Trivy security scan
- CD: deploy FE lên Vercel, BE lên Render qua deploy hook
- Chỉ deploy khi push vào master, cache npm
```

> *(Paste prompt vào AI tool → show output)*

> "Nhìn nè — AI generate ra file YAML hoàn chỉnh. Có trigger, jobs, steps, secrets. Và nếu so sánh với file YAML thật trong project mình — **80-90% giống nhau**."

> "Phần còn lại 10-20%? Ví dụ: AI có thể quên `concurrency`, hoặc dùng action version cũ. Đó là lúc kiến thức của BẠN phát huy — bạn review, hiểu từng dòng, rồi tinh chỉnh."

**Ví dụ đời thường:**

> "Giống như nhờ AI viết CV. AI cho bạn template 80% tốt. Nhưng BẠN phải review, thêm kinh nghiệm thật, sửa chi tiết sai. Người không hiểu CV thì dùng AI viết CV cũng ra kết quả tệ. Người hiểu CV thì dùng AI tăng tốc 5 lần."

### 4.2 — Debug CI log bằng AI

> "Use case thứ hai — và đây là cái mình dùng NHIỀU NHẤT."

> "Tưởng tượng: pipeline fail. Bạn mở log — 500 dòng output, toàn text kỹ thuật, error message dài 3 đoạn. Đọc từ trên xuống dưới mất 30 phút. Và có khi đọc xong vẫn không hiểu."

> "Với AI: copy error log → paste → hỏi 'lỗi gì, fix sao?' → AI trả lời trong 10 giây."

> *(Show ví dụ error log)*

```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR! Found: react@18.3.1
npm ERR! Could not resolve dependency:
npm ERR! peer react@"^17.0.0" required by some-old-package@1.0.0
```

> "Log này nói gì? Đọc kỹ thì hiểu — nhưng tốn thời gian. Paste vào AI:"

> "`AI trả lời: 'Package some-old-package yêu cầu React 17, nhưng project dùng React 18. Fix: chạy npm install --legacy-peer-deps hoặc upgrade package.'`"

> "10 giây. Thay vì 30 phút Google, đọc Stack Overflow, thử 5 cách."

**Ví dụ đời thường:**

> "Giống như đi khám bệnh. Bạn có triệu chứng đau đầu, mệt mỏi, khó thở. Tự chẩn đoán? Mất thời gian, có thể sai. Đưa triệu chứng cho bác sĩ (AI)? 'Có thể là thiếu sắt, nên xét nghiệm máu'. Nhanh, chính xác, có hướng xử lý."

### 4.3 — AI Security Scan

> "Use case thứ ba: bảo mật."

> "Trong project mình dùng **Trivy** — scan toàn bộ dependencies tìm lỗ hổng bảo mật đã biết (CVE)."

> "Khi Trivy báo: 'Package express có CVE-2024-XXXXX, severity HIGH' — bạn hỏi: cái này ảnh hưởng gì? Có nguy hiểm thật không? Fix sao?"

> "AI đọc CVE database, giải thích: 'CVE này cho phép attacker gửi request đặc biệt gây crash server. Ảnh hưởng version < 4.21.2. Fix: upgrade lên 4.21.2'. Rõ ràng, actionable."

> "Ngoài ra, GitHub có **CodeQL** tích hợp sẵn — scan code tìm SQL injection, XSS. Và **Dependabot** — tự tạo PR upgrade package có lỗi. AI không chỉ phát hiện mà còn **tự fix**."

**Ví dụ đời thường:**

> "Giống như camera an ninh thông minh trong nhà. Camera không chỉ quay — mà **nhận diện**: 'Đây là người lạ, không phải thành viên gia đình'. Thay vì bạn phải ngồi xem 24/7, camera AI làm thay. Trivy + CodeQL + Dependabot = camera an ninh cho code."

### 4.4 — AI sinh Test Cases

> "Use case cuối: viết test."

> "Thú thật — viết test là phần ít developer nào thích. Nhưng nó cực kỳ quan trọng cho CI. Không có test → CI vô nghĩa."

> "AI giúp gì? Bạn đưa function → AI generate test cases cover các tình huống: happy path, edge case, error case."

> *(Show prompt)*

```
Viết unit test cho endpoint GET /api/beers:
- Happy path: trả về list beers
- Pagination: page=2, per_page=5  
- API down → fallback data
- per_page > 25 → cap at 25
```

> "AI generate test xong — bạn review, chạy thử. Nếu pass → commit. Nếu fail → có thể test sai, hoặc code có bug mà bạn chưa biết. Win-win."

> "Quan trọng: AI giúp bạn viết test **nhanh hơn**, không phải viết test **thay bạn**. Bạn vẫn cần review test có đúng logic không."

---

## SLIDE 9 — PHẦN 05: Best Practices & Example Repos (5 min)

### 4 Best Practices

> "Trước khi Q&A, mình chia sẻ 4 best practices — những sai lầm mình từng mắc phải."

**🔐 Secrets hygiene:**

> "Rule số 1: **KHÔNG BAO GIỜ** hardcode API key, password, token trong code. Mình từng thấy sinh viên push `.env` file lên GitHub. Có bot quét GitHub 24/7, tìm API key bị lộ, xài tài nguyên cloud của bạn. Hoá đơn AWS $5,000 qua đêm — chuyện thật."

> "Luôn dùng GitHub Secrets. Thêm `.env` vào `.gitignore`. Không có ngoại lệ."

**✅ Test trước, deploy sau:**

> "Không có test = không nên có CD tự động. Tại sao? Vì CD deploy code mới lên production **tự động**. Nếu code mới có bug mà không ai test → bug lên production → user bị ảnh hưởng."

> "CI phải pass 100% trước khi deploy. Đây là **safety net** — lưới an toàn."

**⚡ Cache dependencies:**

> "Mỗi lần pipeline chạy, step `npm ci` tải lại toàn bộ dependencies. Mất 30-60 giây. Nếu dùng cache — lần sau chỉ mất 5 giây. Nhanh hơn 60%."

> "Trong project mình: `cache: 'npm'` trong `setup-node` action. 1 dòng config = tiết kiệm rất nhiều thời gian."

**🌿 Branch strategy:**

> "`main` hoặc `master` = production. Không ai push trực tiếp vào main. Luôn tạo feature branch → code → mở PR → review → CI pass → merge. Main luôn ổn định."

### Example Repos

> "3 repo để mọi người tham khảo: repo đầu — CI/CD + Vercel đầy đủ workflow mẫu. Repo hai — cấu trúc monorepo React + Express chuẩn. Repo ba — ví dụ đơn giản nhất để bắt đầu."

### CV Tip

> "Và tip cuối cùng — dành cho các bạn sinh viên. Nếu bạn setup được CI/CD cho project, hãy viết vào CV: **'Thiết lập CI/CD pipeline tự động với GitHub Actions, deploy lên Vercel/Render'**."

> "Tại sao? Vì hầu hết sinh viên chỉ biết code. Bạn biết code VÀ deploy tự động = bạn nổi bật hơn 90% ứng viên cùng level. HR và interviewer rất ấn tượng khi thấy CI/CD trong CV của junior."

---

## SLIDE 10 — Q&A (10 min)

### Closing

> "OK, chúng ta đã đi qua toàn bộ hành trình!"

> "Tóm lại 4 điểm chính:"

> "Một — **DevOps là văn hóa**, CI/CD là vòng lặp tự động hóa. Không phải tool — là cách làm việc."

> "Hai — **GitHub Actions** cho phép bạn viết pipeline bằng YAML: workflow → job → step. Miễn phí. Nằm ngay trong GitHub."

> "Ba — **Deploy**: Frontend lên Vercel với Edge CDN. Backend lên Render với Deploy Hook — 1 dòng `curl`."

> "Bốn — **AI** giúp sinh YAML, debug logs, scan bảo mật, và viết test. Nhanh hơn. Nhưng bạn vẫn cần hiểu nền tảng."

> "Cảm ơn mọi người đã lắng nghe! Resources có trên slide cuối. Bây giờ mình sẵn sàng cho câu hỏi."

### Câu hỏi thường gặp (chuẩn bị sẵn)

**Q: CI/CD có khó setup không?**
> "Với GitHub Actions + Vercel + Render — setup lần đầu mất khoảng 1-2 giờ. Sau đó chạy mãi mãi. ROI cực cao."

**Q: Free tier có đủ không?**
> "Cho project sinh viên và side project — thừa. GitHub Actions: 2,000 phút/tháng. Render: 750 giờ/tháng. Vercel: unlimited cho hobby plan."

**Q: Nếu deploy fail thì sao?**
> "Pipeline dừng, app cũ vẫn chạy. Không có gì bị break. Bạn fix code, push lại, pipeline chạy lại. Đó là vẻ đẹp của CI/CD — fail sớm, fail an toàn."


---
---
---


# 🎯 Demo Guide — Cheat Sheet cho buổi Present

> Tài liệu này tóm tắt **chính xác** anh cần làm gì ở mỗi phần demo.
> Hiện tại anh đang ở nhánh `master`.

---

## 📌 Trạng thái hiện tại

| Branch | Nội dung | Pipeline |
|--------|----------|----------|
| `master` ← **anh đang ở đây** | Beer Explorer app hoàn chỉnh, code đúng | ✅ CI pass, deploy thành công |
| `demo/broken-code` | `backend/server.js` bị syntax error + hardcoded secrets | ❌ CI sẽ FAIL |

| URL | Mục đích |
|-----|----------|
| `https://fullstack-app-example-1.onrender.com/` | Backend status dashboard |
| `https://fullstack-app-example-1.onrender.com/api/health` | Health check JSON |
| `https://fullstack-app-example-1.onrender.com/api/beers` | Beer API |
| Frontend Vercel URL (check Vercel dashboard) | Beer Explorer UI |

---

## 🎬 DEMO 1 — Show app đang chạy (Slide 7)

> **Không cần switch branch.** Ở `master` là OK.

### Bước thao tác:
1. Mở **Render URL** → `https://fullstack-app-example-1.onrender.com/`
   - Show status dashboard: uptime, ngày giờ VN, endpoints, pipeline flow
2. Mở **Vercel URL** → frontend Beer Explorer
   - Search `"lager"` → show kết quả
   - Click 1 card → modal detail (tên, ABV, food pairing)
   - Click pagination Next/Prev
3. **F12 → Network tab** → search lại → show request gọi từ Vercel đến Render
4. Mở `/api/health` → show JSON response

### Nói gì:
> "App đang live. Frontend trên Vercel CDN, backend trên Render. Toàn bộ deploy tự động bằng CI/CD."

---

## 🎬 DEMO 2 — Show Workflow Files (Slide 5)

> **Không cần switch branch.** Ở VS Code mở files.

### Bước thao tác:
1. Mở `.github/workflows/ci-pr-gate.yml` → highlight 3 jobs chạy song song
2. Mở `.github/workflows/deploy.yml` → highlight `needs: ci` + `if:` condition
3. Mở **GitHub → Actions tab** → show workflow runs gần nhất
4. Click vào 1 run → show diagram jobs → expand 1 step → show logs

### Nói gì:
> "3 job CI chạy song song: test frontend, check backend, scan security. Deploy chỉ chạy SAU KHI CI pass VÀ CHỈ trên master."

---

## 🎬 DEMO 3 — PR Scan / CI Fail (Slide 5) ⭐ QUAN TRỌNG

> **Đây là phần demo CI bắt bug.** Anh KHÔNG cần switch branch.

### Bước thao tác:

**Cách 1: Tạo PR từ GitHub UI (nhanh nhất)**

1. Mở GitHub → repo → click **"Compare & pull request"** 
   - Hoặc: **Pull requests** → **New pull request**
   - Base: `master` ← Compare: `demo/broken-code`
2. Title: `feat: update beer API endpoint`
3. Click **Create pull request**
4. ⏳ Đợi ~1-2 phút → CI tự chạy
5. Show cho audience:
   - ❌ `backend-check` job FAIL → click vào → show log:
     ```
     SyntaxError: missing ) after argument list
     ```
   - ❌ `security-scan` job có thể FAIL (hardcoded secrets)
   - PR hiển thị ❌ → **merge button bị block**

### Nói gì:
> "Mình vừa tạo PR với code có lỗi. CI phát hiện ngay: syntax error ở backend. Code lỗi KHÔNG BAO GIỜ vào production. Đây là quality gate."

### Cleanup sau demo:
- **Close PR** (click Close pull request, KHÔNG merge)
- Không cần xóa branch — để dùng lại nếu cần

---

## 🎬 DEMO 4 — Live Deploy (Slide 7, Optional)

> **Ở `master`.** Sửa code nhỏ → push → show pipeline chạy.

### Bước thao tác:

```bash
# 1. Sửa nhỏ trong VS Code — ví dụ thêm emoji vào header
# Mở frontend/src/App.js, tìm dòng:
#   <h1>Beer Explorer</h1>
# Sửa thành:
#   <h1>🍺 Beer Explorer</h1>

# 2. Commit và push
git add frontend/src/App.js
git commit -m "feat: add beer emoji to header"
git push origin master

# 3. Mở GitHub → Actions → show pipeline đang chạy
# 4. Đợi ~2 phút → refresh Vercel URL → emoji xuất hiện
```

### Revert sau demo:
```bash
# Sửa lại về "Beer Explorer" (bỏ emoji)
# Hoặc: git revert HEAD --no-edit && git push origin master
```

### Nói gì:
> "Từ sửa 1 dòng code đến app live trên internet = 2 phút. Zero manual steps."

---

## 🎬 DEMO 5 — AI-Enhanced DevOps (Slide 8)

> **Không cần switch branch.** Mở AI tool + file `demo/prompts.md`.

### Bước thao tác:

| Demo | Mở file | Copy prompt | Paste vào |
|------|---------|-------------|-----------|
| Sinh YAML | `demo/prompts.md` → **PROMPT 1** | Copy toàn bộ | ChatGPT/Gemini |
| Debug CI log | `demo/prompts.md` → **PROMPT 2** hoặc **3** | Copy | ChatGPT/Gemini |
| Security scan | `demo/prompts.md` → **PROMPT 4** | Copy | ChatGPT/Gemini |
| Sinh test cases | `demo/prompts.md` → **PROMPT 5** | Copy | ChatGPT/Gemini |

### Flow cho mỗi demo AI:
1. Mở `demo/prompts.md` trong VS Code
2. Copy prompt tương ứng
3. Paste vào ChatGPT/Gemini → Enter
4. Show output cho audience
5. So sánh với code thật trong project (nếu có)

### Nói gì:
> "AI generate 80-90% chính xác. Nhưng BẠN vẫn cần review. AI là GPS — tiện, nhưng nếu nói rẽ vào sông, bạn phải biết đó là sai."

---

## 🎬 Show GitHub Secrets (Slide 6)

1. GitHub → repo → **Settings** → **Secrets and variables** → **Actions**
2. Show 4 secrets đang mask: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `RENDER_HOOK`
3. **Nói:** "Giá trị bị mã hóa. Không ai thấy. Chỉ pipeline truy cập khi chạy."

---

## ⚡ Quick Commands Reference

```bash
# Kiểm tra đang ở branch nào
git branch

# Về master (nếu lỡ switch)
git checkout master

# Chạy app local
npm start

# Test frontend
cd frontend && CI=true npx react-scripts test --watchAll=false

# Check backend syntax
node --check backend/server.js
```

---

## 🚨 Troubleshooting nhanh

| Vấn đề | Fix |
|--------|-----|
| Render hiện "Cannot GET /" | Render chưa deploy xong, đợi 2 phút refresh |
| App load chậm | Render free tier cold start ~30s, đợi hoặc truy cập trước buổi present 5 phút |
| Vercel build fail | Check Vercel dashboard → xem log → có thể env var chưa set |
| CI chạy quá lâu | Bình thường mất ~1-2 phút, nếu lâu hơn có thể GitHub Actions đang queue |
| PR không trigger CI | Kiểm tra `ci-pr-gate.yml` trigger đúng branch `master` |

---

## 📋 Checklist trước buổi present

- [ ] Mở Render URL trước 5 phút (warm up cold start)
- [ ] Verify Vercel frontend đang live
- [ ] Login sẵn GitHub, Vercel dashboard, Render dashboard
- [ ] Login sẵn ChatGPT/Gemini
- [ ] Mở VS Code với các file workflow + `demo/prompts.md`
- [ ] Verify `demo/broken-code` branch vẫn còn trên GitHub
- [ ] Internet ổn định


---
---
---


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
