import type { Metadata } from "next";
import { ContactComposerSection } from "@/components/home/ContactComposerSection";
import { PageFrame } from "@/components/pages/PageFrame";

export const metadata: Metadata = {
  title: "Contact | Taher Hussain",
  description:
    "Contact Taher Hussain for technical partnerships, digital systems work, media workflows, and creative technology collaboration.",
};

export default function ContactPage() {
  return (
    <PageFrame>
      <main className="min-h-screen bg-[#060606] pt-20">
        <ContactComposerSection />
      </main>
    </PageFrame>
  );
}
