import { MapPin, Briefcase, GraduationCap } from "lucide-react";
import { Section } from "@/app/_components/section";
import { AnimateOnScroll } from "@/app/_components/animate-on-scroll";
import type { PersonalInfo, Experience, Education } from "@/app/_lib/types";

interface AboutProps {
  info: PersonalInfo;
  experiences: Experience[];
  education: Education[];
}

export function About({ info, experiences, education }: AboutProps) {
  const currentRole = experiences[0];
  const latestEducation = education[0];

  return (
    <Section
      id="about"
      title="About Me"
      subtitle="A quick overview of who I am and what I do."
    >
      <div className="grid gap-12 lg:grid-cols-5">
        {/* Bio */}
        <div className="lg:col-span-3">
          <AnimateOnScroll>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {info.bio}
            </p>
          </AnimateOnScroll>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <AnimateOnScroll delay={1}>
              <InfoCard
                icon={<MapPin size={18} />}
                label="Location"
                value={info.location}
              />
            </AnimateOnScroll>
            <AnimateOnScroll delay={2}>
              <InfoCard
                icon={<Briefcase size={18} />}
                label="Current Role"
                value={currentRole?.role ?? "Open to opportunities"}
              />
            </AnimateOnScroll>
            <AnimateOnScroll delay={3}>
              <InfoCard
                icon={<GraduationCap size={18} />}
                label="Education"
                value={
                  latestEducation
                    ? `${latestEducation.degree} in ${latestEducation.field}`
                    : "Self-taught"
                }
              />
            </AnimateOnScroll>
          </div>
        </div>

        {/* Quick stats */}
        <div className="flex flex-col justify-center gap-5 lg:col-span-2">
          <AnimateOnScroll delay={1}>
            <StatCard number={`${new Date().getFullYear() - 2022}+`} label="Years of Experience" />
          </AnimateOnScroll>
          <AnimateOnScroll delay={2}>
            <StatCard number="6+" label="Projects Completed" />
          </AnimateOnScroll>
          <AnimateOnScroll delay={3}>
            <StatCard number="3.3" label="GPA" />
          </AnimateOnScroll>
        </div>
      </div>
    </Section>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="card-elevated p-4">
      <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-accent-glow text-accent">
        {icon}
      </div>
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-card-foreground">{value}</p>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="card-elevated p-5">
      <p className="text-gradient text-3xl font-bold">{number}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
