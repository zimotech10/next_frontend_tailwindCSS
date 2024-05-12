import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";
import { ConnectWallet } from "@/components/ConnectWallet";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lampapuy NFT Marketplace",
  description: "NFT Marketplace on Solana Blockchain.",
  icons: {
    icon: ["/lampapuy-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConnectWallet>
          <Navbar />
          <Sidebar />
          {children}
          <Footer />
        </ConnectWallet>
      </body>
    </html>
  );
}
