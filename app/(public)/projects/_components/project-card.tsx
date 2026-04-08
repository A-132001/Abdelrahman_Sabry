import Link from "next/link";
import { ArrowUpRight, Code2, ExternalLink } from "lucide-react";
import type { Project } from "@/app/_lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group card-elevated flex flex-col overflow-hidden">
      {/* Image placeholder — clickable to detail */}
      <Link
        href={`/projects/${project.slug}`}
        className="relative aspect-video w-full overflow-hidden bg-muted"
      >
        <div className="flex h-full items-center justify-center text-muted-foreground/30">
          <svg
            className="h-12 w-12"
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

        {/* Hover overlay */}
        <div className="bg-gradient-accent absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-90">
          <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
            View Project
            <ArrowUpRight size={16} />
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {project.featured && (
          <span className="badge-accent mb-2 w-fit">Featured</span>
        )}
        <Link
          href={`/projects/${project.slug}`}
          className="text-lg font-semibold text-card-foreground transition-colors hover:text-accent"
        >
          {project.title}
        </Link>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* Links */}
        {(project.githubUrl || project.liveUrl) && (
          <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
              >
                <Code2 size={14} />
                Source Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
              >
                <ExternalLink size={14} />
                Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
