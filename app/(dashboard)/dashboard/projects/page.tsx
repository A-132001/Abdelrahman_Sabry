import Link from "next/link";
import { Plus, ExternalLink, Code2 } from "lucide-react";
import { readData } from "@/app/_lib/store";
import { DeleteProjectButton } from "./_components/delete-button";

export default async function ProjectsManagePage() {
  const data = await readData();
  const projects = [...data.projects].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your portfolio projects.
          </p>
        </div>
        <Link
          href="/dashboard/projects/new"
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-accent px-4 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          <Plus size={16} />
          Add Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground">
          No projects yet. Add your first project.
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate font-semibold text-card-foreground">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
                      Featured
                    </span>
                  )}
                </div>
                <p className="mt-0.5 truncate text-sm text-muted-foreground">
                  {project.description}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-1">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                  {(project.githubUrl || project.liveUrl) && (
                    <span className="mx-1 text-border">|</span>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-accent"
                    >
                      <Code2 size={12} />
                      GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-accent"
                    >
                      <ExternalLink size={12} />
                      Live
                    </a>
                  )}
                </div>
              </div>
              <div className="ml-4 flex items-center gap-2">
                <Link
                  href={`/dashboard/projects/${project.id}`}
                  className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Edit
                </Link>
                <DeleteProjectButton id={project.id} title={project.title} />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
