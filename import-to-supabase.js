/**
 * Script đồng bộ dữ liệu sản phẩm từ mock-products.json lên Supabase
 * Hướng dẫn sử dụng:
 * 1. Đảm bảo đã chạy SQL DDL phía dưới trong SQL Editor của Supabase để tạo bảng.
 * 2. Điền thông tin NEXT_PUBLIC_SUPABASE_URL và NEXT_PUBLIC_SUPABASE_ANON_KEY vào file client/.env.local
 * 3. Chạy lệnh: node import-to-supabase.js
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'client', '.env.local') });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('\x1b[31m%s\x1b[0m', 'Lỗi: Chưa tìm thấy NEXT_PUBLIC_SUPABASE_URL hoặc NEXT_PUBLIC_SUPABASE_ANON_KEY trong tệp client/.env.local!');
  console.log('Vui lòng mở file client/.env.local và điền thông tin kết nối Supabase của bạn trước khi chạy script.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);
const productsPath = path.join(__dirname, 'client', 'src', 'data', 'mock-products.json');

async function importData() {
  try {
    if (!fs.existsSync(productsPath)) {
      console.error('Không tìm thấy file mock-products.json tại đường dẫn:', productsPath);
      return;
    }

    const rawData = fs.readFileSync(productsPath, 'utf8');
    const products = JSON.parse(rawData);

    console.log(`Đang chuẩn bị đẩy ${products.length} sản phẩm lên Supabase...`);

    // Chuẩn bị dữ liệu để insert/upsert
    // Lưu ý: Các trường Array và Object (images, colors, details, buyLinks) 
    // sẽ được lưu trực tiếp dưới dạng JSON trong Postgres (Supabase tự động stringify/parse).
    const records = products.map(p => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      category: p.category,
      price: p.price,
      originalPrice: p.originalPrice,
      description: p.description,
      images: p.images,
      colors: p.colors,
      details: p.details,
      buyLinks: p.buyLinks,
      isNew: p.isNew || false,
      isBestSeller: p.isBestSeller || false
    }));

    // Thực hiện upsert dữ liệu (nếu trùng ID sẽ tự cập nhật đè lên)
    const { data, error } = await supabase
      .from('products')
      .upsert(records, { onConflict: 'id' });

    if (error) {
      if (error.code === '42P01') {
        console.error('\x1b[31m%s\x1b[0m', 'Lỗi: Bảng "products" chưa tồn tại trên Supabase!');
        console.log('\nHướng dẫn: Vui lòng vào trang quản trị Supabase > SQL Editor và chạy đoạn mã SQL sau để tạo bảng:\n');
        console.log(`
--------------------------------------------------
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  originalPrice NUMERIC NOT NULL,
  description TEXT,
  images JSONB NOT NULL,
  colors JSONB NOT NULL,
  details JSONB NOT NULL,
  buyLinks JSONB NOT NULL,
  isNew BOOLEAN DEFAULT false,
  isBestSeller BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cho phép đọc công khai dữ liệu
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON products FOR SELECT USING (true);
--------------------------------------------------
        `);
      } else {
        throw error;
      }
    } else {
      console.log('\x1b[32m%s\x1b[0m', `Chúc mừng! Đã đồng bộ thành công ${products.length} sản phẩm lên Supabase.`);
    }

  } catch (err) {
    console.error('Đã xảy ra lỗi trong quá trình import:', err.message);
  }
}

importData();
