# 🎒 Shop Balo Nữ — Website E-commerce

Website thương mại điện tử bán balo nữ, phân khúc giá 500.000đ – 1.500.000đ, phong cách **"trẻ trung nhưng cao cấp"**.

> 📌 Tài liệu liên quan: `AGENTS.md` (quy tắc thiết kế & code), `PLAN.md` (kế hoạch triển khai theo giai đoạn), `TODO.md` (checklist chi tiết).

---

## 1. Giới thiệu

- **Loại dự án**: E-commerce (bán hàng trực tuyến)
- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express (tuỳ chọn — có thể gọi Supabase thẳng từ Next.js mà không cần server riêng)
- **Database**: **Supabase (Postgres)** — bao gồm Database + Auth + Storage
- **Thanh toán**: VNPay, MoMo, COD
- **Hosting**: Vercel (frontend), Supabase Cloud (database/storage/auth), Render/Railway (chỉ nếu vẫn giữ `server/` riêng)

---

## 2. Cấu trúc thư mục

```
balo-shop-project/
├── AGENTS.md          # Quy tắc thiết kế & code cho AI agent/dev
├── PLAN.md             # Kế hoạch triển khai theo giai đoạn
├── TODO.md             # Checklist việc cần làm
├── README.md           # Tài liệu này
├── vercel.json          # Cấu hình deploy Vercel
├── client/              # Frontend Next.js
└── server/              # Backend Express (tuỳ chọn)
```

Xem chi tiết đầy đủ cây thư mục trong `client/src` và `server/src` tại tài liệu `cau-truc-thu-muc-du-an.md` (nếu có) hoặc duyệt trực tiếp thư mục.

---

## 3. Yêu cầu môi trường (Prerequisites)

- Node.js ≥ 18.x
- npm ≥ 9.x (hoặc yarn/pnpm nếu quen dùng)
- Tài khoản [Supabase](https://supabase.com) (miễn phí ở mức khởi đầu) — tạo project mới, lấy `Project URL`, `anon key`, `service_role key`
- Tài khoản Vercel (deploy frontend)
- Tài khoản VNPay/MoMo sandbox (test thanh toán)

---

## 4. Cài đặt & Chạy local

### 4.1. Clone dự án
```bash
git clone <repo-url>
cd balo-shop-project
```

### 4.2. Frontend (client)
```bash
cd client
npm install
cp .env.example .env.local   # điền các biến môi trường cần thiết
npm run dev
```
Mặc định chạy tại: `http://localhost:3000`

### 4.3. Thiết lập Supabase
1. Tạo project mới tại [supabase.com](https://supabase.com).
2. Vào **SQL Editor**, chạy toàn bộ nội dung file `docs/schema.sql` để tạo bảng `products`, `orders`, `order_items`, `profiles` + bật Row Level Security.
3. Vào **Storage**, tạo bucket `product-images` (public) để lưu ảnh sản phẩm.
4. Lấy `Project URL`, `anon public key` (dán vào `client/.env.local`) và `service_role key` (dán vào `server/.env`, **tuyệt đối không lộ ra frontend**).

### 4.4. Backend (server) — nếu dùng
```bash
cd server
npm install
cp .env.example .env         # điền SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, v.v.
npm run dev
```
Mặc định chạy tại: `http://localhost:5000`

> Nếu không dùng `server/` riêng, có thể gọi Supabase thẳng từ Next.js (Server Components/Route Handlers) qua `@supabase/supabase-js` với `anon key`, bỏ qua bước 4.4.

---

## 5. Biến môi trường (Environment Variables)

### `client/.env.local`
| Biến | Mô tả |
|---|---|
| `NEXT_PUBLIC_API_URL` | Địa chỉ API backend (nếu vẫn dùng `server/` riêng) |
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL của Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon/public key — an toàn để lộ ra client vì đã có RLS bảo vệ |
| `NEXT_PUBLIC_VNPAY_MERCHANT_ID` | Mã merchant VNPay (public) |

### `server/.env`
| Biến | Mô tả |
|---|---|
| `PORT` | Cổng chạy server (mặc định 5000) |
| `SUPABASE_URL` | Project URL của Supabase (giống bên client) |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key — **bí mật tuyệt đối**, chỉ dùng ở backend, bỏ qua RLS |
| `VNPAY_SECRET` | Khoá bí mật cổng VNPay |
| `MOMO_SECRET` | Khoá bí mật cổng MoMo |

⚠️ Không commit file `.env` / `.env.local` thật lên Git — đã có trong `.gitignore`.
⚠️ **Không bao giờ** dùng `SUPABASE_SERVICE_ROLE_KEY` ở phía client/frontend — key này bỏ qua toàn bộ Row Level Security.

---

## 6. Script có sẵn

### Frontend (`client/package.json`)
| Lệnh | Chức năng |
|---|---|
| `npm run dev` | Chạy môi trường phát triển |
| `npm run build` | Build production |
| `npm run start` | Chạy bản đã build |
| `npm run lint` | Kiểm tra lỗi code style |

### Backend (`server/package.json`)
| Lệnh | Chức năng |
|---|---|
| `npm run dev` | Chạy server với nodemon (tự reload khi sửa code) |
| `npm run start` | Chạy server production |

---

## 7. Deploy

### Database → Supabase
Supabase là dịch vụ cloud, không cần tự deploy — chỉ cần:
1. Project Supabase ở môi trường production đã chạy schema (`docs/schema.sql`).
2. Bật RLS và kiểm tra lại các policy trước khi ra mắt (mục 8 trong `docs/schema.sql`).
3. Bật backup tự động (Supabase Dashboard > Database > Backups) — gói free có backup giới hạn, cân nhắc nâng cấp gói Pro trước khi ra mắt chính thức nếu cần backup point-in-time.

### Frontend → Vercel
1. Push code lên GitHub.
2. Vào Vercel → New Project → chọn repo → **Root Directory: `client`**.
3. Khai báo các biến môi trường ở mục 5 trong phần Environment Variables của Vercel.
4. Deploy — Vercel tự build và cấp domain `*.vercel.app`, có thể gắn domain riêng sau.

### Backend → Render/Railway
1. Tạo Web Service mới, trỏ **Root Directory: `server`**.
2. Build command: `npm install`, Start command: `npm run start`.
3. Khai báo biến môi trường tương tự `.env`.
4. Sau khi có URL backend, cập nhật lại `NEXT_PUBLIC_API_URL` bên Vercel và redeploy frontend.

> Chi tiết lý do vì sao tách hosting frontend/backend như vậy, xem `PLAN.md` mục Phase 1 và ghi chú về Vercel trong tài liệu cấu trúc thư mục.

---

## 8. Quy tắc đóng góp code (Contributing)

- Đọc kỹ `AGENTS.md` trước khi code — mọi màu sắc, font, spacing, component đều phải theo đúng design system đã định nghĩa, không tự ý thêm màu/font mới.
- Đặt tên nhánh Git theo dạng: `feature/ten-tinh-nang`, `fix/ten-loi`.
- Commit message ngắn gọn, mô tả đúng thay đổi (VD: `feat: thêm trang chi tiết sản phẩm`).
- Trước khi merge: chạy `npm run lint`, test responsive tối thiểu ở mobile (375px) và desktop (1280px).

---

## 9. Trạng thái dự án

Theo dõi tiến độ chi tiết tại `TODO.md`. Giai đoạn hiện tại và mốc thời gian xem tại `PLAN.md`.

---

## 10. Liên hệ

- Chủ dự án: FregD nguyentduy156@gmail.com
- Repo: *(điền link GitHub repo)*