# 📝 Checklist Công việc dự án DBlink

Bảng tiến độ chi tiết theo từng Phase dựa trên kế hoạch `PLAN.md`. Cập nhật trạng thái liên tục tại đây để theo dõi tiến độ phát triển của cả AI Agent và Dev.

---

## 🛠️ Trạng thái tổng quan
- [ ] **Phase 0 — Chuẩn bị**: Đang thu thập nội dung
- [/] **Phase 1 — Dựng khung kỹ thuật**: Hoàn thành 80% (Chờ thiết lập Supabase)
- [x] **Phase 2 — Giao diện trang chính (Demo)**: Đã hoàn thành bộ khung giao diện tĩnh & tương tác cơ bản
- [ ] **Phase 3 — Giỏ hàng & Thanh toán (Logic thật)**: Đã có logic giỏ hàng cục bộ, chờ tích hợp cổng thanh toán online
- [ ] **Phase 4 — Nội dung & SEO**: Đang chờ nội dung thật
- [ ] **Phase 5 — Kiểm thử & Ra mắt**: Chưa bắt đầu

---

## 📋 Chi tiết checklist công việc

### 📦 Phase 0 — Chuẩn bị (Tuần 1)
- [x] Chốt logo, bảng màu, bộ font chính thức (mục 2 `AGENTS.md`)
- [ ] Chụp/chỉnh ảnh sản phẩm đồng bộ (tỉ lệ 4:5, nền be nhạt `#F8F6F2`)
- [ ] Viết mô tả chi tiết sản phẩm thật vào file [docs/products-data.md](file:///Users/fregd/Documents/code/DBlink/docs/products-data.md)
- [ ] Viết nội dung trang About, chính sách bảo hành/đổi trả/vận chuyển
- [ ] Đăng ký domain, tài khoản Vercel, Supabase
- [ ] Nộp hồ sơ đăng ký cổng thanh toán VNPay/MoMo Sandbox

### 📂 Phase 1 — Dựng khung kỹ thuật (Tuần 2–3)
- [x] Khởi tạo folder `client/` bằng Next.js + TS + Tailwind CSS
- [x] Cấu hình `tailwind.config.ts` và `globals.css` theo Design System của shop
- [x] Tạo file dữ liệu mẫu [mock-products.json](file:///Users/fregd/Documents/code/DBlink/client/src/data/mock-products.json)
- [x] Cấu hình `.gitignore` và `vercel.json` hỗ trợ monorepo
- [x] Khởi tạo Git local và thực hiện Initial Commit đầu tiên
- [ ] Tạo project Supabase, chạy `docs/schema.sql` khởi tạo DB
- [ ] Tạo bucket `product-images` trên Supabase Storage
- [ ] Viết API client kết nối trực tiếp Supabase thay thế dữ liệu Mock
- [ ] Cấu hình biến môi trường (`.env.local` cho client, `.env` cho server)

### 🎨 Phase 2 — Xây dựng giao diện (Tuần 3–5)
- [x] Viết các Component UI dùng chung ([Button](file:///Users/fregd/Documents/code/DBlink/client/src/components/ui/Button.tsx), [Badge](file:///Users/fregd/Documents/code/DBlink/client/src/components/ui/Badge.tsx))
- [x] Dựng Header dính (sticky) có giỏ hàng, tìm kiếm và menu drawer di động
- [x] Dựng Footer đầy đủ cột thông tin chính sách, đăng ký nhận tin
- [x] Dựng Trang chủ đầy đủ Hero, Categories, Best Sellers, Testimonials
- [x] Dựng Trang danh mục sản phẩm có lọc theo màu sắc/giá và sắp xếp
- [x] Dựng Trang chi tiết sản phẩm có ảnh gallery, chấm chọn màu sắc, tăng giảm số lượng, các tab thông tin
- [x] Dựng Trang giới thiệu câu chuyện thương hiệu About
- [x] Dựng Trang Style Journal hiển thị bài viết blog phong cách thời trang
- [x] Dựng Trang Liên hệ có thông tin cửa hàng flagship và Form gửi thư
- [ ] Tối ưu hóa hiệu ứng Mobile Navigation (Drawer kéo trượt mượt mà hơn)
- [ ] Chạy kiểm thử Responsive chi tiết trên các kích thước: 375px, 768px, 1280px, 1440px

### 💳 Phase 3 — Giỏ hàng & Thanh toán (Tuần 5–6)
- [x] Logic giỏ hàng cục bộ `useCart` (thêm, sửa số lượng, xóa, lưu `localStorage`)
- [x] Thiết kế giao diện Trang giỏ hàng hiển thị danh sách, tổng tiền
- [x] Thiết kế Trang thanh toán (Checkout) điền thông tin, chọn phương thức COD/online
- [ ] Viết logic Backend/API xử lý tạo đơn hàng lên DB
- [ ] Tích hợp API cổng thanh toán VNPay (sandbox)
- [ ] Tích hợp API cổng thanh toán MoMo (sandbox)
- [ ] Tích hợp dịch vụ gửi email tự động xác nhận đơn hàng khi thành công

### ✍️ Phase 4 — Nội dung & SEO (Tuần 4–6)
- [ ] Cập nhật toàn bộ thông tin sản phẩm thật của shop từ [products-data.md](file:///Users/fregd/Documents/code/DBlink/docs/products-data.md) vào database
- [ ] Cập nhật bài viết blog thật cho Style Journal (3-5 bài viết chuẩn SEO)
- [ ] Thiết lập Meta tags, Title, Description chi tiết cho từng trang sản phẩm để tối ưu SEO
- [ ] Tạo file `sitemap.xml` và `robots.txt`
- [ ] Nén toàn bộ ảnh sản phẩm sang định dạng `.webp` để tối ưu tải trang dưới 3s

### 🚀 Phase 5 — Kiểm thử & Ra mắt (Tuần 7)
- [ ] Chạy Lighthouse audit đạt điểm số tối thiểu 90+ cho Performance và SEO
- [ ] Kiểm thử đặt hàng COD và Online trên môi trường Production thật
- [ ] Kiểm thử hiển thị trên các thiết bị di động thật (iOS Safari, Android Chrome)
- [ ] Cài đặt Google Analytics 4 và Meta Pixel đo lường chuyển đổi
- [ ] Trỏ domain chính thức, bật HTTPS
- [ ] Công bố chạy chính thức website

---
