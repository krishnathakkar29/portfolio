import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Lenis from "@/components/custom/lenis";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Krishna - Portfolio",
  description:
    "Welcome to my portfolio, where I bring my full-stack web development skills to life. Here are showcased some of my projects , showcasing my expertise in cutting-edge web technologies, scalable architectures, and intuitive user experiences. From crafting  frontends to optimizing backend performance, I am passionate about building seamless, high-performance web applications.",
  keywords: [
    "krishna",
    "krishna thakkar",
    "krishna thakkar portfolio",
    "krishnathakkar29",
    "krishna portfolio",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-black`}>
        <Lenis>
          {children}
          <Toaster
            position="bottom-right"
            expand={true}
            richColors
            theme="dark"
            closeButton
            style={{ marginBottom: "20px" }}
          />
        </Lenis>
      </body>
    </html>
  );
}
