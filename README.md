# 🎒 Shop Balo Nữ — Website Showcase & Thương hiệu

Website trưng bày sản phẩm mới/thịnh hành và thông tin thương hiệu. **Không xử lý giỏ hàng/thanh toán** — khách được dẫn sang các kênh bán hàng có sẵn (Shopee, Facebook, Zalo, TikTok Shop...) để mua.

> 📌 Tài liệu liên quan: `AGENTS.md` (quy tắc thiết kế & code, đặc biệt mục nguyên tắc thiết kế nổi bật), `PLAN.md` (kế hoạch triển khai), `TODO.md` (checklist chi tiết).

---

## 1. Giới thiệu

- **Loại dự án**: Website showcase thương hiệu (brand/lookbook site), không phải e-commerce đầy đủ.
- **Mục đích chính**: (1) Trưng bày sản phẩm mới/thịnh hành đẹp mắt, chuyên nghiệp. (2) Truyền tải thông tin thương hiệu để tạo niềm tin trước khi khách qua kênh bán mua hàng.
- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion (animation).
- **Database**: Supabase (Postgres) — chỉ dùng để lưu và đọc dữ liệu sản phẩm/bộ sưu tập, không có bảng đơn hàng.
- **Backend riêng (`server/`)**: không bắt buộc — Next.js có thể gọi Supabase trực tiếp. `server/` chỉ giữ lại nếu sau này cần trang quản trị nội bộ.
- **Hosting**: Vercel.

---

## 2. Cấu trúc thư mục

```
balo-shop-project/
├── AGENTS.md          # Quy tắc thiết kế & code — đọc kỹ mục "Nguyên tắc thiết kế nổi bật"
├── PLAN.md             # Kế hoạch triển khai theo giai đoạn
├── TODO.md             # Checklist việc cần làm
├── README.md           # Tài liệu này
├── vercel.json          # Cấu hình deploy Vercel
├── docs/
│   └── schema.sql       # Schema Supabase (products, collections, store_info)
├── client/              # Frontend Next.js — trọng tâm dự án
│   └── src/
│       ├── app/          # Trang chủ, /collections, /products/[slug], /about, /contact, /lookbook
│       └── components/
│           ├── showcase/ # Hero, FeaturedProducts, BuyNowButton, BrandStory — component đặc thù showcase
│           ├── product/  # ProductCard, ProductGallery, ProductFilter
│           ├── layout/   # Header, Footer
│           └── ui/        # Button, Card, Badge, Input
└── server/              # Backend Express (KHÔNG bắt buộc — xem AGENTS.md mục 5)
```

---

## 3. Yêu cầu môi trường (Prerequisites)

- Node.js ≥ 18.x
- npm ≥ 9.x
- Tài khoản [Supabase](https://supabase.com) — chỉ cần Database + Storage, không cần bật Auth
- Tài khoản Vercel

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
cp .env.example .env.local
npm run dev
```
Mặc định chạy tại: `http://localhost:3000`

### 4.3. Thiết lập Supabase
1. Tạo project mới tại [supabase.com](https://supabase.com).
2. Vào **SQL Editor**, chạy toàn bộ nội dung file `docs/schema.sql` để tạo bảng `products`, `collections`, `store_info` + bật Row Level Security (chỉ cho đọc công khai).
3. Vào **Storage**, tạo bucket `product-images` (public).
4. Nhập thử vài sản phẩm qua **Table Editor** để có dữ liệu test.
5. Lấy `Project URL` và `anon public key`, dán vào `client/.env.local`.

### 4.4. Backend (`server/`) — chỉ cần nếu làm trang quản trị nội bộ sau này
```bash
cd server
npm install
cp .env.example .env
npm run dev
```
> Mặc định KHÔNG cần chạy bước này — Next.js gọi thẳng Supabase qua `client/src/lib/supabase.ts`.

---

## 5. Biến môi trường

### `client/.env.local`
| Biến | Mô tả |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL của Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon/public key — an toàn vì đã có RLS chỉ cho đọc |

### `server/.env` (chỉ cần nếu dùng `server/`)
| Biến | Mô tả |
|---|---|
| `PORT` | Cổng chạy server (mặc định 5000) |
| `SUPABASE_URL` | Project URL của Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key — **bí mật tuyệt đối**, chỉ dùng để ghi/sửa dữ liệu từ trang quản trị |

⚠️ Không commit `.env`/`.env.local` lên Git — đã có trong `.gitignore`.

---

## 6. Script có sẵn

### Frontend (`client/package.json`)
| Lệnh | Chức năng |
|---|---|
| `npm run dev` | Chạy môi trường phát triển |
| `npm run build` | Build production |
| `npm run start` | Chạy bản đã build |
| `npm run lint` | Kiểm tra lỗi code style |

---

## 7. Deploy

### Database → Supabase
Không cần tự deploy, chỉ cần project production đã chạy `docs/schema.sql` và bật RLS.

### Frontend → Vercel
1. Push code lên GitHub.
2. Vercel → New Project → **Root Directory: `client`**.
3. Khai báo `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` trong Environment Variables.
4. Deploy.

---

## 8. Quy tắc đóng góp code (Contributing)

- **Đọc kỹ `AGENTS.md` mục "Nguyên tắc thiết kế nổi bật" trước khi code giao diện** — đây là trọng tâm của dự án này.
- Không code giao diện mới trước khi đã brainstorm + tự phản biện bảng token thiết kế (xem AGENTS.md mục 2.7).
- Đặt tên nhánh Git: `feature/ten-tinh-nang`, `fix/ten-loi`.
- Commit message ngắn gọn, mô tả đúng thay đổi.
- Trước khi merge: chạy `npm run lint`, test responsive tối thiểu mobile (375px) và desktop (1280px), kiểm tra animation không bị giật/lag.

---

## 9. Trạng thái dự án

Theo dõi tiến độ chi tiết tại `TODO.md`. Giai đoạn hiện tại và mốc thời gian xem tại `PLAN.md`.

---

## 10. Liên hệ

- Chủ dự án: *(điền tên/email/SĐT của bạn)*
- Repo: *(điền link GitHub repo)*