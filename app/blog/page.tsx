import type { Metadata } from "next";
import { InnerPage } from "@/components/pages/InnerPage";
import { PageFrame } from "@/components/pages/PageFrame";

export const metadata: Metadata = {
  title: "Blog | Taher Hussain",
  description:
    "Notes and essays from Taher Hussain on AI workflows, digital systems, media pipelines, and creative technology.",
};

export default function BlogPage() {
  return (
    <PageFrame>
      <InnerPage
        eyebrow="05 / Blog"
        title="Signals from the systems behind the work."
        summary="A writing space for technical notes, workflow observations, and field reports from the overlap of AI, media, web architecture, and business operations."
        stats={[
          { label: "Format", value: "Notes / Essays / Case files" },
          { label: "Focus", value: "AI, systems, media, operations" },
          { label: "Status", value: "Editorial index in progress" },
        ]}
        primaryItems={[
          {
            title: "Architecting Meaningful Signals",
            description:
              "How AI changes creative workflows when used as a system, not a shortcut. The useful shift is a clearer relationship between intent, material, and review.",
            meta: "AI / Workflow Architecture",
          },
          {
            title: "Digital Systems Need Operating Memory",
            description:
              "A note on why platforms, automations, and content workflows become stronger when decisions are recorded as part of the system.",
            meta: "Documentation / Systems",
          },
          {
            title: "Media Pipelines Are Technical Products",
            description:
              "Production quality depends on more than cameras and edits. It also depends on naming, storage, versions, review loops, and delivery logic.",
            meta: "Media / Operations",
          },
          {
            title: "The Portfolio as an Interface",
            description:
              "A personal site can work like a workspace: a navigable record of decisions, capabilities, signals, and active direction.",
            meta: "Portfolio / Interface Design",
          },
        ]}
        sideTitle="Editorial System"
        sideItems={[
          "Writing is grouped by signal type rather than by publishing date alone.",
          "Short notes can become case files when the underlying system matures.",
          "Future versions can connect this index to a CMS when the content model is ready.",
        ]}
        cta={{ label: "Discuss Writing", href: "/contact" }}
      />
    </PageFrame>
  );
}
