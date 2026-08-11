import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export function PageFrame({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <div className="page-enter">{children}</div>
      <Footer />
    </>
  );
}
