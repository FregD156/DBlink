import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/hooks/useCart";
import { SITE_NAME, SITE_SLOGAN } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | ${SITE_SLOGAN}`,
    template: `%s | ${SITE_NAME}`
  },
  description: "Thương hiệu balo nữ tối giản sang trọng, trẻ trung. Khám phá các mẫu balo da cao cấp, balo canvas năng động thời thượng nhất.",
  keywords: ["balo nữ", "balo da", "balo thời trang", "balo đi học", "balo công sở", "balo DBlink", "DBlink"],
  authors: [{ name: "DBlink Team" }],
  metadataBase: new URL("https://dblink.vn"),
  openGraph: {
    title: `${SITE_NAME} | ${SITE_SLOGAN}`,
    description: "Thương hiệu balo nữ tối giản sang trọng, trẻ trung.",
    url: "https://dblink.vn",
    siteName: SITE_NAME,
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="flex flex-col min-h-screen bg-bg-primary text-text-primary antialiased">
        <CartProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
