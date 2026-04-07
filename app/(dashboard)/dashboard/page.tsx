import { FolderKanban, Briefcase, Wrench, Eye } from "lucide-react";
import Link from "next/link";
import { readData } from "@/app/_lib/store";

export default async function DashboardPage() {
  const data = await readData();

  const stats = [
    {
      label: "Projects",
      value: data.projects.length,
      icon: FolderKanban,
      href: "/dashboard/projects",
    },
    {
      label: "Experience",
      value: data.experiences.length,
      icon: Briefcase,
      href: "/dashboard/experience",
    },
    {
      label: "Skills",
      value: data.skills.length,
      icon: Wrench,
      href: "/dashboard/skills",
    },
    {
      label: "Featured",
      value: data.projects.filter((p) => p.featured).length,
      icon: Eye,
      href: "/dashboard/projects",
    },
  ];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your portfolio content.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent/50"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <Icon size={18} className="text-accent" />
              </div>
              <p className="mt-2 text-3xl font-bold text-card-foreground">
                {stat.value}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Quick Actions
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <Link
            href="/dashboard/projects/new"
            className="rounded-xl border border-border bg-card p-4 text-center text-sm font-medium text-card-foreground transition-colors hover:border-accent hover:text-accent"
          >
            + Add Project
          </Link>
          <Link
            href="/dashboard/profile"
            className="rounded-xl border border-border bg-card p-4 text-center text-sm font-medium text-card-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Edit Profile
          </Link>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-border bg-card p-4 text-center text-sm font-medium text-card-foreground transition-colors hover:border-accent hover:text-accent"
          >
            View Live Site &rarr;
          </a>
        </div>
      </div>
    </>
  );
}
