# PLAN.md — Kế hoạch xây dựng website Shop Balo Nữ (Showcase & Thương hiệu)

## 1. Tổng quan dự án

| Hạng mục | Chi tiết |
|---|---|
| Mục đích web | Trưng bày sản phẩm mới/thịnh hành + thông tin thương hiệu. KHÔNG bán hàng trực tiếp trên web |
| Kênh bán hàng | Đã có sẵn (Shopee + các kênh khác) — web chỉ dẫn link ra |
| Ưu tiên số 1 | **Chất lượng giao diện** — chuyên nghiệp, có điểm nhấn riêng, không rập khuôn |
| Phân khúc giá | 500.000đ – 1.500.000đ |
| Phong cách | Trẻ trung nhưng cao cấp |
| Nền tảng | Next.js + Tailwind CSS + Framer Motion, Supabase (chỉ đọc dữ liệu sản phẩm) |
| Hosting | Vercel |
| Thời gian dự kiến | 4–6 tuần (rút ngắn đáng kể vì bỏ giỏ hàng/thanh toán) |
| Tài liệu liên quan | `AGENTS.md` (quy tắc thiết kế/code), `TODO.md` (checklist chi tiết) |

**Thay đổi lớn so với kế hoạch trước**: bỏ hoàn toàn Phase giỏ hàng/thanh toán, backend đơn hàng. Dồn thời gian tiết kiệm được vào giai đoạn thiết kế (brainstorm, tinh chỉnh, tự phản biện) để giao diện thực sự nổi bật.

**Chỉ số thành công (KPI) sau ra mắt**:
- Thời gian ở lại trang trung bình > 1.5 phút (đo mức độ hấp dẫn thị giác).
- Tỷ lệ click vào nút "Mua ngay tại [Kênh]" — đây là chỉ số chuyển đổi chính thay cho tỷ lệ chốt đơn.
- Điểm Lighthouse Performance/SEO ≥ 90 dù nhiều ảnh/animation.
- Được chia sẻ trên mạng xã hội nhờ hình ảnh/thiết kế đẹp (đo qua lượt truy cập từ social).

---

## 2. Timeline tổng thể

| Tuần | Giai đoạn | Trọng tâm |
|---|---|---|
| 1 | Phase 0 | Chuẩn bị nội dung, ảnh, tài khoản |
| 1–2 | Phase 1 | Brainstorm & chốt hệ thống thiết kế (design token, signature element) |
| 2–3 | Phase 2 | Dựng khung kỹ thuật + kết nối Supabase |
| 2–4 | Phase 3 | Xây dựng giao diện các trang chính |
| 4 | Phase 4 | Tinh chỉnh chuyển động, chi tiết thị giác, tự phản biện |
| 5 | Phase 5 | Nội dung, SEO, Open Graph |
| 6 | Phase 6 | Kiểm thử & ra mắt |
| 6+ | Phase 7 | Hậu ra mắt, cập nhật sản phẩm mới định kỳ |

---

## 3. Chi tiết từng giai đoạn

### Phase 0 — Chuẩn bị (Tuần 1)
- [ ] Chụp/chỉnh ảnh sản phẩm chất lượng cao — đây là web showcase nên **ảnh là yếu tố sống còn**, ưu tiên đầu tư hơn cả code.
- [ ] Thu thập link các kênh bán hiện có (Shopee, Facebook, Zalo, TikTok Shop...) — mỗi sản phẩm nên có link kênh bán tương ứng, không chỉ link chung.
- [ ] Viết nội dung "Về chúng tôi" — câu chuyện thật, tránh sáo rỗng.
- [ ] Đăng ký domain, Vercel, Supabase.

**Deliverable**: bộ ảnh chất lượng cao + danh sách link kênh bán + nội dung thương hiệu.

---

### Phase 1 — Brainstorm & chốt hệ thống thiết kế (Tuần 1–2)
**Đây là giai đoạn quan trọng nhất, không được bỏ qua hay làm vội.**

- [ ] Brainstorm bảng token: 4-6 màu (mã hex), 2+ font, layout concept, 1 signature element (theo quy trình mục 2.7 trong `AGENTS.md`).
- [ ] Tự phản biện: so với 3 "khuôn mẫu AI" phổ biến (nền cream+serif+cam đất / nền đen+neon / báo giấy) — điều chỉnh nếu trùng.
- [ ] Vẽ wireframe (có thể bằng ASCII hoặc Figma) cho trang chủ, trang sản phẩm, trang bộ sưu tập.
- [ ] Chốt 1 khoảnh khắc chuyển động chính (page-load hoặc scroll-reveal) sẽ là điểm nhấn của site.
- [ ] Duyệt bảng thiết kế trước khi chuyển sang code (dừng ở bước prototype, có thể làm 1 mockup HTML trước khi code chính thức).

**Deliverable**: bảng design token đã chốt + wireframe các trang chính + 1 mockup thử nghiệm.
**Tiêu chí hoàn thành**: nhìn vào mockup, không ai nhầm đây là 1 trong 3 khuôn mẫu AI phổ biến hoặc 1 shop balo khác.

---

### Phase 2 — Dựng khung kỹ thuật (Tuần 2–3)
- [ ] Khởi tạo `client/` (Next.js + TypeScript + Tailwind + Framer Motion).
- [ ] Cấu hình `tailwind.config.ts` theo đúng token đã chốt ở Phase 1.
- [ ] Tạo project Supabase, chạy `docs/schema.sql` (bản rút gọn — chỉ bảng `products`, `collections`, không cần `orders`).
- [ ] Nhập dữ liệu sản phẩm mẫu qua Supabase Table Editor hoặc `mock-products.json` để dev trước khi có dữ liệu thật.
- [ ] Deploy bản khung lên Vercel sớm để test pipeline.

**Deliverable**: site chạy được trên domain thật, hiển thị được dữ liệu sản phẩm mẫu (chưa cần đẹp).

---

### Phase 3 — Xây dựng giao diện các trang chính (Tuần 2–4)
- [ ] Component gốc: `Button`, `Card`, `Badge`, `BuyNowButton` (nút dẫn ra kênh bán).
- [ ] Layout chung: `Header`, `Footer`.
- [ ] Trang chủ: hero (thesis-driven, không dùng công thức số liệu lớn mặc định), sản phẩm mới/thịnh hành, câu chuyện thương hiệu rút gọn.
- [ ] Trang `/collections` và `/collections/[slug]`: trưng bày sản phẩm theo bộ sưu tập.
- [ ] Trang `/products/[slug]`: ảnh lớn, mô tả, nút "Mua ngay tại [Kênh]" nổi bật.
- [ ] Trang `/about`: câu chuyện thương hiệu đầy đủ.
- [ ] Trang `/contact`: thông tin liên hệ + toàn bộ link kênh bán.
- [ ] (Tuỳ chọn) Trang `/lookbook`: bộ ảnh editorial kể chuyện phong cách.
- [ ] Test responsive 375px / 768px / 1280px / 1440px.

**Deliverable**: toàn bộ trang hiển thị nội dung thật, đúng design token.

---

### Phase 4 — Tinh chỉnh chuyển động & tự phản biện (Tuần 4)
- [ ] Cài đặt khoảnh khắc chuyển động chính đã chốt ở Phase 1 (page-load sequence hoặc scroll-reveal).
- [ ] Hover micro-interactions cho card sản phẩm.
- [ ] Chụp screenshot toàn bộ trang, tự phản biện: có chi tiết nào thừa cần bỏ bớt không (nguyên tắc "bỏ bớt 1 món trang sức trước khi ra khỏi nhà").
- [ ] Kiểm tra `prefers-reduced-motion` được tôn trọng.

**Deliverable**: giao diện hoàn chỉnh, có điểm nhấn rõ ràng, không thừa chi tiết.

---

### Phase 5 — Nội dung & SEO (Tuần 5)
- [ ] Meta title/description riêng cho từng trang sản phẩm/bộ sưu tập.
- [ ] Open Graph image đẹp riêng (quan trọng vì web showcase hay được chia sẻ).
- [ ] `sitemap.xml`, `robots.txt`.
- [ ] Kiểm tra tối ưu ảnh (WebP, lazy-load) — cân bằng giữa ảnh đẹp và tốc độ tải.

**Deliverable**: site sẵn sàng được Google index, chia sẻ social đẹp.

---

### Phase 6 — Kiểm thử & Ra mắt (Tuần 6)
- [ ] Chạy lại checklist `AGENTS.md` mục 8.
- [ ] Test trên thiết bị thật (iOS Safari, Android Chrome).
- [ ] Test toàn bộ nút "Mua ngay tại [Kênh]" trỏ đúng link, mở tab mới.
- [ ] Gắn Google Analytics 4 + Meta Pixel để đo lượt click ra kênh bán.
- [ ] Trỏ domain chính thức.

**Deliverable**: website chính thức hoạt động, đo được lượt dẫn khách sang kênh bán.

---

### Phase 7 — Hậu ra mắt (liên tục)
- [ ] Quy trình cập nhật sản phẩm mới định kỳ (qua Supabase Table Editor hoặc trang admin nếu làm sau).
- [ ] Theo dõi trang nào giữ chân khách lâu nhất, tối ưu thêm.
- [ ] Cân nhắc thêm `/lookbook` nếu chưa làm ở Phase 3, hoặc mở rộng thêm bộ sưu tập theo mùa.

---

## 4. Thứ tự ưu tiên nếu cần rút ngắn thời gian

1. **Bắt buộc**: Phase 1 (thiết kế) — đây là giá trị cốt lõi của dự án, không được cắt giảm.
2. **Bắt buộc**: Trang chủ + trang sản phẩm + nút dẫn kênh bán (Phase 3 rút gọn).
3. **Có thể làm sau**: `/lookbook`, animation phức tạp ở Phase 4, trang admin nội bộ.

---

## 5. Nguồn lực cần thiết

| Vai trò | Công việc chính | Bắt buộc? |
|---|---|---|
| Frontend dev / Designer | Brainstorm thiết kế + xây `client/` | Có — vai trò quan trọng nhất dự án này |
| Người chụp ảnh sản phẩm | Ảnh chất lượng cao, đồng bộ | Có — quan trọng ngang thiết kế |
| Người viết nội dung | Câu chuyện thương hiệu, mô tả sản phẩm | Có |
| ~~Backend dev~~ | Không bắt buộc vì không có đơn hàng/thanh toán | Không |

---

## 6. Rủi ro cần lưu ý

| Rủi ro | Cách giảm thiểu |
|---|---|
| Giao diện rơi vào khuôn mẫu "AI-generated" phổ biến | Bắt buộc chạy bước tự phản biện ở Phase 1 trước khi code |
| Ảnh sản phẩm chất lượng thấp làm hỏng cả thiết kế đẹp | Đầu tư chụp ảnh chuyên nghiệp ngay từ Phase 0, không dùng ảnh chụp vội |
| Lạm dụng animation khiến site nặng/chậm | Chỉ giữ 1 khoảnh khắc chuyển động chính đã chốt ở Phase 1, cắt bớt hiệu ứng thừa ở Phase 4 |
| Link kênh bán bị sai/lỗi thời khi sản phẩm hết hàng trên Shopee | Có quy trình kiểm tra định kỳ link kênh bán còn hoạt động không |
| Cấu hình sai Row Level Security (RLS) trên Supabase | Bật RLS ngay từ đầu, chỉ cho SELECT công khai với bảng sản phẩm |