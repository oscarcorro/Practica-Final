"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/comunes/Sidebar";
import Header from "@/components/comunes/Header";
import "./styles/globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  //excluir layout en las páginas de OnBoarding
  const isAuthPage = ["/onBoarding"].includes(pathname);

  return (
    <html lang="en">
      <body className="flex h-screen overflow-hidden">
        {isAuthPage ? (
          <>{children}</>
        ) : (
          <>
            <Sidebar />
            <div className="contenedor-principal w-full flex flex-col h-full">
              <Header />
              <main className="flex-grow">{children}</main>
            </div>
          </>
        )}
      </body>
    </html>
  );
}
