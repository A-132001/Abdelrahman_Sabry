import type { Metadata } from "next";
import { Section } from "@/app/_components/section";
import { readData } from "@/app/_lib/store";
import { ProjectFilters } from "./_components/project-filters";

export const metadata: Metadata = {
  title: "Projects — AbdEl-Rahman Sabry",
  description:
    "Explore the projects I've built — from full-stack web apps to open-source tools.",
};

export default async function ProjectsPage() {
  const data = await readData();
  const sorted = [...data.projects].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="pt-16">
      <Section
        title="Projects"
        subtitle="A collection of things I've built and worked on."
      >
        <ProjectFilters projects={sorted} />
      </Section>
    </div>
  );
}
