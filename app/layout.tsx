import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { registerLicense } from "@syncfusion/ej2-base";

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
      <body>
        <main>{children}</main>
        <Toaster richColors />
      </body>
    </html>
  );
}
