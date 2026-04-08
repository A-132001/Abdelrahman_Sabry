import { GraduationCap } from "lucide-react";
import { Section } from "@/app/_components/section";
import { AnimateOnScroll } from "@/app/_components/animate-on-scroll";
import type { Education } from "@/app/_lib/types";

export function EducationSection({ education }: { education: Education[] }) {
  if (education.length === 0) return null;

  return (
    <Section
      id="education"
      title="Education"
      subtitle="My academic background."
      className="bg-surface"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {education.map((edu, index) => (
          <AnimateOnScroll key={edu.id} delay={(index % 4) as 0 | 1 | 2 | 3}>
            <div className="card-elevated flex h-full flex-col p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent-glow text-accent">
                <GraduationCap size={20} />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground">
                {edu.degree}
              </h3>
              <p className="text-gradient mt-1 text-sm font-semibold">
                {edu.field}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {edu.institution}
              </p>
              {edu.description && (
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {edu.description}
                </p>
              )}
              <p className="mt-4 text-xs font-medium text-muted-foreground">
                {edu.startYear} &mdash; {edu.endYear ?? "Present"}
              </p>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </Section>
  );
}
