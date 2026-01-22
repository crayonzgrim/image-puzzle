import { Providers } from "@/app/components/Providers";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Image Puzzle - 이미지 퍼즐 맞추기 게임",
    template: "%s | Image Puzzle",
  },
  description:
    "이미지를 그리드 카드로 덮고 하나씩 열어가며 정답을 맞추는 퍼즐 게임입니다. 친구들과 함께 이미지 퀴즈를 즐겨보세요! A fun puzzle game where you reveal hidden images by flipping cards and guess the answer.",
  keywords: [
    "이미지 퍼즐",
    "퍼즐 게임",
    "이미지 퀴즈",
    "카드 게임",
    "image puzzle",
    "puzzle game",
    "image quiz",
    "card flip game",
    "guessing game",
  ],
  authors: [{ name: "Image Puzzle Team" }],
  creator: "Image Puzzle",
  publisher: "Image Puzzle",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    alternateLocale: "en_US",
    title: "Image Puzzle - 이미지 퍼즐 맞추기 게임",
    description:
      "이미지를 그리드 카드로 덮고 하나씩 열어가며 정답을 맞추는 퍼즐 게임입니다.",
    siteName: "Image Puzzle",
    images: [
      {
        url: "/image-puzzle.png",
        width: 512,
        height: 512,
        alt: "Image Puzzle Game Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Puzzle - 이미지 퍼즐 맞추기 게임",
    description:
      "이미지를 그리드 카드로 덮고 하나씩 열어가며 정답을 맞추는 퍼즐 게임입니다.",
    images: ["/image-puzzle.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Image Puzzle",
  },
  formatDetection: {
    telephone: false,
  },
  category: "games",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Image Puzzle",
  alternateName: "이미지 퍼즐",
  description:
    "이미지를 그리드 카드로 덮고 하나씩 열어가며 정답을 맞추는 퍼즐 게임",
  applicationCategory: "GameApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "KRW",
  },
  inLanguage: ["ko", "en"],
  image: "/image-puzzle.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
