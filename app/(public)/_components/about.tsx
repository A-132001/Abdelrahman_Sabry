import { MapPin, Briefcase, GraduationCap } from "lucide-react";
import { Section } from "@/app/_components/section";
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
          <p className="text-lg leading-relaxed text-muted-foreground">
            {info.bio}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <InfoCard
              icon={<MapPin size={18} />}
              label="Location"
              value={info.location}
            />
            <InfoCard
              icon={<Briefcase size={18} />}
              label="Current Role"
              value={currentRole?.role ?? "Open to opportunities"}
            />
            <InfoCard
              icon={<GraduationCap size={18} />}
              label="Education"
              value={
                latestEducation
                  ? `${latestEducation.degree} in ${latestEducation.field}`
                  : "Self-taught"
              }
            />
          </div>
        </div>

        {/* Quick stats */}
        <div className="flex flex-col justify-center gap-6 lg:col-span-2">
          <StatCard number={`${new Date().getFullYear() - 2020}+`} label="Years of Experience" />
          <StatCard number="20+" label="Projects Completed" />
          <StatCard number="100K+" label="Users Impacted" />
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
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-2 flex items-center gap-2 text-accent">{icon}</div>
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-card-foreground">{value}</p>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="text-3xl font-bold text-accent">{number}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
