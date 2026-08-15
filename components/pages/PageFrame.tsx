import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export function PageFrame({ children, showFooterLinks = false }: Readonly<{ children: React.ReactNode; showFooterLinks?: boolean }>) {
  return (
    <>
      <Navbar />
      <div className="page-enter">{children}</div>
      <Footer showLinks={showFooterLinks} />
    </>
  );
}
