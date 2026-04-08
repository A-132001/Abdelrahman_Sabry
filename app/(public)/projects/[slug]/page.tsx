import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Code2 } from "lucide-react";
import { readData } from "@/app/_lib/store";

export async function generateStaticParams() {
  const data = await readData();
  return data.projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await readData();
  const project = data.projects.find((p) => p.slug === slug);
  if (!project) return { title: "Not Found" };

  return {
    title: `${project.title} — AbdEl-Rahman Sabry`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await readData();
  const project = data.projects.find((p) => p.slug === slug);

  if (!project) notFound();

  return (
    <div className="pt-16">
      <article className="mx-auto max-w-4xl px-6 py-24 sm:py-32">
        {/* Back link */}
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        {/* Header */}
        <div className="mb-12">
          {project.featured && (
            <span className="badge-accent mb-3 inline-flex">Featured</span>
          )}
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="mt-8 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Live Demo
                <ArrowUpRight size={16} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <Code2 size={16} />
                Source Code
              </a>
            )}
          </div>
        </div>

        {/* Image placeholder */}
        <div className="card-elevated mb-12 overflow-hidden !rounded-2xl">
          <div className="flex aspect-video items-center justify-center bg-muted text-muted-foreground/30">
            <svg
              className="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
              />
            </svg>
          </div>
        </div>

        {/* Long description */}
        <div>
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            About this project<span className="text-gradient">.</span>
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            {project.longDescription}
          </p>
        </div>

        {/* Navigation to other projects */}
        <div className="mt-16 border-t border-border pt-10">
          <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Other Projects
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {data.projects
              .filter((p) => p.id !== project.id)
              .slice(0, 2)
              .map((p) => (
                <Link
                  key={p.id}
                  href={`/projects/${p.slug}`}
                  className="card-elevated p-5"
                >
                  <h4 className="font-semibold text-card-foreground group-hover:text-accent">
                    {p.title}
                  </h4>
                  <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">
                    {p.description}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </article>
    </div>
  );
}
