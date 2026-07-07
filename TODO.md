# 📝 Checklist Công việc dự án DBlink (Showcase & Thương hiệu)

Bảng tiến độ chi tiết theo từng Phase dựa trên kế hoạch `PLAN.md` mới (đã rút gọn, tập trung vào trải nghiệm thị giác và điều hướng kênh bán hàng).

---

## 🛠️ Trạng thái tổng quan
- [ ] **Phase 0 — Chuẩn bị**: Đang thu thập nội dung hình ảnh thật
- [x] **Phase 1 — Brainstorm & Hệ thống thiết kế**: Đã chốt bảng token, font Fraunces & đỏ gạch, bo góc 4px
- [/] **Phase 2 — Dựng khung kỹ thuật**: Đã xong cấu trúc NextJS và Git local (Chờ Supabase)
- [x] **Phase 3 — Giao diện trang chính (Showcase Demo)**: Đã hoàn thiện toàn bộ các trang với màu sắc/typography mới và nút dẫn Shopee/Zalo
- [ ] **Phase 4 — Tinh chỉnh chuyển động**: Chưa bắt đầu (Sử dụng Framer Motion)
- [ ] **Phase 5 — Nội dung & SEO**: Đang chờ bài viết và mô tả sản phẩm thật
- [ ] **Phase 6 — Kiểm thử & Ra mắt**: Chưa bắt đầu

---

## 📋 Chi tiết checklist công việc

### 📦 Phase 0 — Chuẩn bị (Tuần 1)
- [ ] Chụp và chỉnh sửa ảnh sản phẩm chất lượng cao (yếu tố sống còn của web showcase)
- [ ] Thu thập link kênh bán hàng tương ứng cho từng sản phẩm (Shopee, Facebook, Zalo...)
- [ ] Viết nội dung câu chuyện thương hiệu thật cho trang About và docs/products-data.md
- [ ] Đăng ký domain, Vercel, Supabase

### 🎨 Phase 1 — Brainstorm & Hệ thống thiết kế (Tuần 1–2)
- [x] Brainstorm bảng design token: Đỏ gạch (#C24E3A) phối Xanh rêu (#3F4B3B), nền trắng ngà (#FAF8F5)
- [x] Chốt font chữ: Fraunces (Heading Serif) & Be Vietnam Pro (Body Sans-serif)
- [x] Chốt bo góc nghiêm ngặt ở mức **`4px`** cho phong cách editorial thanh lịch
- [x] Xác định signature element: Thiết kế lookbook lưới bất đối xứng (asymmetrical grid)
- [x] Viết tài liệu [docs/design-system.md](file:///Users/fregd/Documents/code/DBlink/docs/design-system.md) tự phản biện tránh 3 khuôn mẫu AI

### 📂 Phase 2 — Dựng khung kỹ thuật (Tuần 2–3)
- [x] Khởi tạo folder `client/` bằng Next.js + TS + Tailwind CSS
- [x] Cấu hình tailwind và globals.css theo bảng màu mới
- [x] Tạo file dữ liệu mẫu mới chứa `buyLinks` liên kết ngoài
- [x] Khởi tạo Git local và đồng bộ commit
- [ ] Tạo project Supabase, chạy `docs/schema.sql` (bản rút gọn chỉ lưu sản phẩm/bộ sưu tập)
- [ ] Tạo bucket `product-images` trên Supabase Storage
- [ ] Viết API client kết nối trực tiếp Supabase thay thế dữ liệu Mock
- [ ] Deploy thử bản khung lên Vercel

### 🖼️ Phase 3 — Xây dựng giao diện Showcase (Tuần 2–4)
- [x] Viết các Component UI dùng chung ([Button](file:///Users/fregd/Documents/code/DBlink/client/src/components/ui/Button.tsx), [Badge](file:///Users/fregd/Documents/code/DBlink/client/src/components/ui/Badge.tsx))
- [x] Dựng Header dính (sticky) tối giản, có nút ghé Shopee Store trực tiếp
- [x] Dựng Footer đầy đủ thông tin liên hệ các kênh bán hàng (Shopee, Facebook, Zalo)
- [x] Dựng Trang chủ với Hero Section lớn cuốn hút, Asymmetrical Grid danh mục và Slogan lớn
- [x] Dựng Trang danh mục sản phẩm có lọc theo màu sắc/giá và sắp xếp
- [x] Dựng Trang chi tiết sản phẩm có ảnh gallery lớn và cụm nút "Mua ngay tại Shopee/Messenger/Zalo"
- [x] Dựng Trang giới thiệu câu chuyện thương hiệu About
- [x] Dựng Trang Style Journal hiển thị blog phong cách thời trang
- [x] Dựng Trang Liên hệ có thông tin chi nhánh và link kết nối trực tiếp
- [ ] Chạy kiểm thử Responsive chi tiết trên các kích thước: 375px, 768px, 1280px, 1440px

### 🌀 Phase 4 — Tinh chỉnh chuyển động (Tuần 4)
- [ ] Cài đặt Framer Motion cho các hiệu ứng page transition và scroll-reveal
- [ ] Thêm micro-interactions khi hover sản phẩm (chuyển ảnh, zoom nhẹ)
- [ ] Kiểm tra và tối ưu tính năng giảm chuyển động `prefers-reduced-motion`

### ✍️ Phase 5 — Nội dung & SEO (Tuần 5)
- [ ] Nhập thông tin sản phẩm thật của shop từ [products-data.md](file:///Users/fregd/Documents/code/DBlink/docs/products-data.md) vào database
- [ ] Thiết lập Meta tags, Title, Description chi tiết cho từng trang sản phẩm để tối ưu SEO
- [ ] Thiết lập Open Graph image đẹp cho từng trang sản phẩm phục vụ share social
- [ ] Tạo file `sitemap.xml` và `robots.txt`

### 🚀 Phase 6 — Kiểm thử & Ra mắt (Tuần 6)
- [ ] Test toàn bộ nút dẫn link ngoài trỏ đúng kênh bán, mở tab mới
- [ ] Đo lường tốc độ load trang dưới 3s
- [ ] Cài đặt Google Analytics 4 và Meta Pixel đo lường lượt click dẫn sang Shopee
- [ ] Trỏ domain chính thức và HTTPS
