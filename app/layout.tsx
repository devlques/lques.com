import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "lques.com - Software developer",
  description: "Personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-black to-gray-800`}
      >
        <div className="h-screen flex flex-col justify-between">
        <div className="bg-transparent basis-1/12">
          <Header/>
        </div>
        <div className="basis-10/12 ">
            {children}
        </div>
        <div className="bg-transparent basis-1/12 p-4">
          <Footer/>
        </div>
        </div>
      </body>
    </html>
  );
}
