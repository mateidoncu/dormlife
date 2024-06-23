'use client';

import { usePathname } from 'next/navigation';
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Toast from "@/components/Toast/Toast";
import { NextAuthProvider } from "@/components/AuthProvider/AuthProvider";
import { useSession } from "next-auth/react";
import LoadingSpinner from './loading'; // Ensure correct path

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthProvider>
      <ClientContent>{children}</ClientContent>
    </NextAuthProvider>
  );
}

function ClientContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideHeaderFooter = pathname === "/login" || pathname === "/signup";
  const { status } = useSession();

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Toast />
      <main className="font-normal">
        {!hideHeaderFooter && <Header />}
        {children}
        {!hideHeaderFooter && <Footer />}
      </main>
    </>
  );
}
