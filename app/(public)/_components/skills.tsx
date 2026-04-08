import { Section } from "@/app/_components/section";
import { AnimateOnScroll } from "@/app/_components/animate-on-scroll";
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
        {grouped.map((group, index) => (
          <AnimateOnScroll key={group.category} delay={(index % 4) as 0 | 1 | 2 | 3}>
            <div>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span key={skill.name} className="tag">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </Section>
  );
}
