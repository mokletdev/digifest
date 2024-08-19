import { ReactNode } from "react";
import Footer from "./_components/footer";
import Navbar from "./_components/navbar";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-[1169px] px-5">
        {/* Invisible div to block out navbar's behind */}
        <div className="h-[84px]"></div>
        {children}
        <Footer />
      </main>
    </>
  );
}
