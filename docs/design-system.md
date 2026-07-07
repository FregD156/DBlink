# 🎨 DBlink Design System

Tài liệu này đặc tả chi tiết các Design Token và phong cách thiết kế của thương hiệu Balo nữ DBlink, tuân thủ nghiêm ngặt theo mục 2 và 2.7 của `AGENTS.md`.

---

## 1. BẢNG TOKEN THIẾT KẾ (BRAINSTORM)

### 1.1. Bảng màu (Color Palette)
Màu sắc được thiết kế hướng tới sự ấm áp, cao cấp và có chiều sâu thời trang.

```css
--color-bg-primary: #FAF8F5;      /* Nền chính - trắng ngà ấm */
--color-bg-secondary: #EFE6DC;    /* Nền phụ - be cát ấm */
--color-text-primary: #221C18;    /* Chữ chính - đen nâu đất */
--color-text-secondary: #6B625B;  /* Chữ phụ - xám tro ấm */
--color-accent: #C24E3A;          /* Nhấn chính - đỏ gạch/rust có sức nặng thời trang */
--color-accent-alt: #3F4B3B;      /* Nhấn phụ - xanh rêu đậm tương phản có chủ đích */
--color-border: #E3DDD3;          /* Màu viền - be nhạt tinh tế */
```

### 1.2. Typography
*   **Tiêu đề lớn / Tên bộ sưu tập (Heading Font):** `'Fraunces', serif` (Một Serif hiện đại với nét vát góc cạnh sắc sảo, cá tính mạnh mẽ hơn Playfair Display truyền thống).
*   **Nội dung / Nút bấm (Body Font):** `'Be Vietnam Pro', sans-serif` (Sạch sẽ, dễ đọc, hỗ trợ 100% tiếng Việt có dấu).
*   **Type Scale:**
    *   Hero Title: `54px - 64px` / font-weight 700 / line-height 1.1
    *   Section Title (H2): `32px` / font-weight 600
    *   Product Name: `16px` / font-weight 500
    *   Body text: `14px - 15px` / line-height 1.6
    *   Labels / Tags: `10px` / font-weight 600 / letter-spacing 0.1em / uppercase

### 1.3. Spacing & Border Radius (Bo góc)
*   Hệ spacing theo bội số của **8px**.
*   **Border-radius (Bo góc):** Đồng nhất ở mức **`4px`** cho mọi nút bấm, thẻ input và cả card ảnh sản phẩm. Sự vuông vắn nhẹ (4px) này tạo ra vẻ ngoài góc cạnh, hơi hướng tạp chí thời trang (editorial) sang trọng hơn là bo góc 12px kiểu app e-commerce thông thường.
*   **Container tối đa:** `1280px` (padding ngang 24px trên Desktop, 16px trên Mobile).

### 1.4. Signature Element (Dấu ấn độc đáo)
*   **Lưới bất đối xứng (Asymmetrical Lookbook Grid):** Phần trình bày lookbook/bộ sưu tập trên trang chủ sẽ xếp xen kẽ các khối ảnh lớn nhỏ bất đối xứng cùng các dòng slogan typography lớn tràn màn hình để tạo ấn tượng mạnh về thị giác.
*   **Nút chuyển đổi tinh tế:** Nút "Mua ngay tại Shopee" xuất hiện nổi bật với hiệu ứng hover đổi màu sang xanh rêu đậm (`--color-accent-alt`) rất cuốn hút.

---

## 2. BẢN TỰ PHẢN BIỆN (SELF-REFLEXION)

Đối chiếu bảng token trên với 3 "khuôn mẫu AI" bị cấm tại mục 2.1 của `AGENTS.md`:

1.  *Khuôn mẫu 1: Nền be/cream ấm + serif tương phản cao + accent cam đất (terracotta).*
    *   **Phản biện:** Chúng tôi đã thay đổi hoàn toàn accent cam đất thường thấy bằng màu **đỏ gạch/đỏ gỉ sắt (#C24E3A)** trầm và sâu hơn. Đồng thời đưa thêm tông màu **xanh rêu đậm (#3F4B3B)** làm accent phụ để tạo độ tương phản lạnh-ấm thú vị, thoát ly hoàn toàn khỏi bảng màu be-cam đất rập khuôn.
2.  *Khuôn mẫu 2: Nền đen tuyệt đối + 1 màu neon/acid.*
    *   **Phản biện:** Hoàn toàn không vi phạm. Tông nền chủ đạo là ngọc ngà ấm (#FAF8F5) vô cùng nhẹ nhàng, thanh lịch.
3.  *Khuôn mẫu 3: Layout kiểu "báo giấy" kẻ mảnh, bo góc = 0, cột dày đặc.*
    *   **Phản biện:** Mặc dù hướng tới phong cách biên tập thời trang, chúng tôi vẫn giữ độ bo góc mềm mại ở mức **`4px`** để tăng tính thân thiện, trẻ trung và giữ các khoảng trống (white-space) rộng rãi (bội số 8px) chứ không chia cột dày đặc như newspaper.

---
