import type { Metadata } from "next";

import { DM_Sans } from "next/font/google";
import "./globals.css";

import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";


export const metadata: Metadata = {
  title: "Vendor",
  description: "Join others and make money With Vendor",
};

const dmSans = DM_Sans({
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.className} antialiased`}
      >
        <TRPCReactProvider>
          <Toaster/>
          {children}
        </TRPCReactProvider>

      </body>
    </html>
  );
}
