import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fin Chat",
  description: "A AI application to visualize your financial data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
