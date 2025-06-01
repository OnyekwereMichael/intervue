import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import CursorBlob from "./components/CursorBlob";

const mona_Sans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexview AI",
  description: "Your AI-powered interview preparation companion",
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      }
    ],
    shortcut: '/favicon.svg',
    apple: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      }
    ],
  },
  manifest: '/site.webmanifest',
  themeColor: '#6366f1',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Nexview AI',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${mona_Sans.className} antialiased pattern`}
      >
        <CursorBlob />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
