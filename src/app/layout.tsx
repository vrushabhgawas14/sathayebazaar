import type { Metadata } from "next";
import "./index.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getServerSession } from "next-auth";
import RootLayoutClient from "@/lib/RootLayoutClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://athawda-bazaar.vercel.app"),

  title: {
    default: "Athawda Bazaar",
    template: `%s | Athawda Bazaar`,
  },
  description: "Discover. Rate. Shop - all in one Bazaar!",

  openGraph: {
    title: "Athawda Bazaar",
    description: "Discover. Rate. Shop - all in one Bazaar!",
    images: ["/assets/images/athawdabazaar.png"],
  },

  keywords: [
    "Athawda Bazaar",
    "Athawda Bazaar Sathaye",
    "Athawda Bazaar website",
    "Athawda Bazaar vercel",
    "thawda Bazaar Sathaye College",
    "Vrushabh Gawas",
  ],

  verification: {
    google: "JH2cAfFIcBaQ_rBQ5Yhbzua6sFpwoB0W6fo5RIf5QIQ",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className="bg-red-100 bg-opacity-70 text-slate-900">
        <RootLayoutClient session={session}>
          <Navbar />
          {children}
          <Footer />
        </RootLayoutClient>
      </body>
    </html>
  );
}
