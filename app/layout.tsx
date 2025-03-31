import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@radix-ui/react-tooltip";

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
        <main>
          <TooltipProvider>{children}</TooltipProvider>
        </main>
        <Toaster richColors />
      </body>
    </html>
  );
}
