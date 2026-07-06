# 📦 Dữ liệu sản phẩm DBlink

Tài liệu này dùng để lưu trữ thông tin sản phẩm thô (raw data) do chủ shop cung cấp. Lập trình viên hoặc AI agent sẽ sử dụng dữ liệu từ đây để cập nhật vào file `mock-products.json` hoặc database Supabase.

---

## Hướng dẫn điền thông tin sản phẩm

Mỗi sản phẩm cần có các thông tin sau:
- **Mã sản phẩm (SKU)**: VD: `DB-MINI-01`
- **Tên sản phẩm**: VD: `Balo Mini Nữ Longchamp Vibes`
- **Giá bán lẻ**: VD: `590.000đ`
- **Giá gốc (chưa giảm)**: VD: `750.000đ`
- **Màu sắc**: Tên màu + Mã Hex màu (nếu biết). VD: Xanh rêu (#6B8F71), Cam đất (#C97B63)
- **Mô tả ngắn**: 1-2 câu giới thiệu sản phẩm.
- **Chi tiết**: Chất liệu, kích thước, hướng dẫn bảo quản.
- **Tên file ảnh tương ứng**: Liệt kê tên các ảnh đã lưu trong thư mục `client/public/images/products/`.

---

## 📝 Danh sách sản phẩm của Shop

*Bro hãy sao chép mẫu dưới đây và điền thông tin sản phẩm thật của shop vào nhé:*

### 1. [MẪU] Balo Da Mềm Minimalist DBlink
- **Mã sản phẩm (SKU)**: `DB-MINI-01`
- **Tên sản phẩm**: Balo Da Mềm Minimalist DBlink
- **Giá bán**: `850.000đ`
- **Giá gốc**: `1.100.000đ`
- **Màu sắc**:
  - Đen Nâu (`#241F1C`)
  - Cam Đất (`#C97B63`)
  - Be Nhẹ (`#F1ECE4`)
- **Mô tả ngắn**: Thiết kế tối giản sang trọng phong cách Charles & Keith, làm từ chất liệu da tổng hợp cao cấp siêu bền mịn.
- **Chi tiết sản phẩm**:
  - *Chất liệu*: Da PU cao cấp chống thấm nước, lót trong bằng vải Polyester mịn.
  - *Kích thước*: 32cm x 26cm x 12cm (Vừa máy tính bảng 11 inch & sổ tay A4).
  - *Bảo quản*: Lau sạch bằng khăn ẩm mềm, tránh tiếp xúc trực tiếp với hóa chất và cồn.
- **Hình ảnh**: (Lưu ảnh trong thư mục `client/public/images/products/`)
  - Ảnh 1 (Studio - chính): `balo-da-mem-studio.jpg`
  - Ảnh 2 (Lifestyle - người mẫu mang): `balo-da-mem-lifestyle.jpg`
  - Ảnh 3 (Cận cảnh chất liệu): `balo-da-mem-detail.jpg`

---
