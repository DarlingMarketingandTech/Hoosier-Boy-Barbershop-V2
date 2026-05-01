import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hoosier Boy Barbershop — Classic Cuts. Modern Craft.",
  description:
    "Indianapolis's premier destination for precision haircuts, hot-towel shaves, and the full barber experience. Book your appointment with Hoosier Boy Barbershop today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-[#f0ece4]">
        {children}
      </body>
    </html>
  );
}
