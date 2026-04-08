import { Section } from "@/app/_components/section";
import { AnimateOnScroll } from "@/app/_components/animate-on-scroll";
import type {
  Experience as ExperienceType,
  Education,
} from "@/app/_lib/types";

interface ExperienceProps {
  experiences: ExperienceType[];
  education: Education[];
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "Present";
  const [year, month] = dateStr.split("-");
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function Experience({ experiences, education }: ExperienceProps) {
  return (
    <Section
      id="experience"
      title="Experience"
      subtitle="My professional journey and education."
      className="bg-surface"
    >
      <div className="grid gap-16 lg:grid-cols-3">
        {/* Work experience */}
        <div className="lg:col-span-2">
          <h3 className="mb-8 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Work
          </h3>
          <div className="space-y-3">
            {experiences.map((exp, index) => (
              <AnimateOnScroll key={exp.id} delay={(index % 4) as 0 | 1 | 2 | 3}>
                <div className="relative pl-8">
                  {/* Timeline line */}
                  {index < experiences.length - 1 && (
                    <div className="absolute left-[7px] top-12 h-[calc(100%)] w-px bg-gradient-to-b from-accent/40 to-border" />
                  )}
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-2 flex h-[15px] w-[15px] items-center justify-center rounded-full border-2 border-accent bg-background">
                    <div className="h-[5px] w-[5px] rounded-full bg-accent" />
                  </div>

                  <div className="card-elevated p-6">
                    <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                      <h4 className="font-semibold text-card-foreground">
                        {exp.role}
                      </h4>
                      <span className="badge-accent">
                        {formatDate(exp.startDate)} &mdash;{" "}
                        {formatDate(exp.endDate)}
                      </span>
                    </div>
                    <p className="text-gradient mt-1 text-sm font-semibold">
                      {exp.company}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {exp.description}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {exp.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-2.5 text-sm text-muted-foreground"
                        >
                          <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className="mb-8 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Education
          </h3>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <AnimateOnScroll key={edu.id} delay={(index % 4) as 0 | 1 | 2 | 3}>
                <div className="card-elevated p-6">
                  <h4 className="font-semibold text-card-foreground">
                    {edu.degree}
                  </h4>
                  <p className="text-gradient mt-1 text-sm font-semibold">
                    {edu.field}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {edu.institution}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {edu.startYear} &mdash; {edu.endYear ?? "Present"}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
