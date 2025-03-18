import Lenis from "@/components/custom/lenis";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const space = Space_Grotesk({ subsets: ["latin"] });

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${space.className} bg-black`}>
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
