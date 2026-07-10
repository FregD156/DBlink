import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/showcase/SmoothScroll";
import { Watermark } from "@/components/showcase/Watermark";
import { SITE_NAME, SITE_SLOGAN } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | ${SITE_SLOGAN}`,
    template: `%s | ${SITE_NAME}`
  },
  description: "Website trưng bày sản phẩm thương hiệu Balo nữ DBlink. Phong cách tối giản sang trọng, trẻ trung và thời thượng.",
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
      <body className="flex flex-col min-h-screen bg-bg-primary text-text-primary antialiased relative">
        <SmoothScroll />
        
        {/* Background Watermark Logo Icon (Parallax Scroll) */}
        <Watermark />

        {/* Film Grain Texture overlay toàn trang */}
        <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.025] bg-grain" />

        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
