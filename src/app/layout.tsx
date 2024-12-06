import type { Metadata } from "next";
import "./index.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getServerSession } from "next-auth";
import RootLayoutClient from "@/lib/RootLayoutClient";

export const metadata: Metadata = {
  title: "Jugaadu",
  description: "Experimental Project",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className="bg-teal-950 text-white">
        <RootLayoutClient session={session}>
          <Navbar />
          {children}
          <Footer />
        </RootLayoutClient>
      </body>
    </html>
  );
}
