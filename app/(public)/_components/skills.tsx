import { Section } from "@/app/_components/section";
import type { Skill, SkillCategory } from "@/app/_lib/types";

const categoryOrder: SkillCategory[] = [
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "Tools",
  "Other",
];

export function Skills({ skills }: { skills: Skill[] }) {
  const grouped = categoryOrder
    .map((cat) => ({
      category: cat,
      items: skills.filter((s) => s.category === cat),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <Section
      id="skills"
      title="Skills"
      subtitle="Technologies and tools I work with."
    >
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {grouped.map((group) => (
          <div key={group.category}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <span
                  key={skill.name}
                  className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-card-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
