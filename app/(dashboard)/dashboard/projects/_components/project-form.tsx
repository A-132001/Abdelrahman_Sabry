"use client";

import { useActionState } from "react";
import type { Project } from "@/app/_lib/types";
import {
  createProjectAction,
  updateProjectAction,
} from "@/app/_lib/actions/projects";

export function ProjectForm({ project }: { project?: Project }) {
  const isEdit = !!project;
  const serverAction = isEdit ? updateProjectAction : createProjectAction;
  const [state, action, pending] = useActionState(serverAction, {});

  return (
    <form action={action} className="max-w-2xl space-y-6">
      {state.error && (
        <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">
          {state.error}
        </div>
      )}

      {isEdit && <input type="hidden" name="id" value={project.id} />}

      <div>
        <label
          htmlFor="title"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          defaultValue={project?.title}
          className="h-11 w-full rounded-lg border border-border bg-card px-4 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
          placeholder="My Awesome Project"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Short Description *
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={2}
          defaultValue={project?.description}
          className="w-full resize-none rounded-lg border border-border bg-card px-4 py-3 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
          placeholder="A brief summary of the project..."
        />
      </div>

      <div>
        <label
          htmlFor="longDescription"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Full Description
        </label>
        <textarea
          id="longDescription"
          name="longDescription"
          rows={5}
          defaultValue={project?.longDescription}
          className="w-full resize-none rounded-lg border border-border bg-card px-4 py-3 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
          placeholder="Detailed description of the project..."
        />
      </div>

      <div>
        <label
          htmlFor="tags"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Tags (comma separated)
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          defaultValue={project?.tags.join(", ")}
          className="h-11 w-full rounded-lg border border-border bg-card px-4 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
          placeholder="React, TypeScript, Node.js"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="liveUrl"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Live URL
          </label>
          <input
            type="url"
            id="liveUrl"
            name="liveUrl"
            defaultValue={project?.liveUrl}
            className="h-11 w-full rounded-lg border border-border bg-card px-4 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
            placeholder="https://example.com"
          />
        </div>
        <div>
          <label
            htmlFor="githubUrl"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            GitHub URL
          </label>
          <input
            type="url"
            id="githubUrl"
            name="githubUrl"
            defaultValue={project?.githubUrl}
            className="h-11 w-full rounded-lg border border-border bg-card px-4 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
            placeholder="https://github.com/user/repo"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="imageUrl"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Image URL
        </label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          defaultValue={project?.imageUrl}
          className="h-11 w-full rounded-lg border border-border bg-card px-4 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
          placeholder="/projects/my-project.jpg"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          defaultChecked={project?.featured}
          className="h-4 w-4 rounded border-border accent-accent"
        />
        <label htmlFor="featured" className="text-sm font-medium text-foreground">
          Featured project
        </label>
      </div>

      <input
        type="hidden"
        name="createdAt"
        value={project?.createdAt || new Date().toISOString().split("T")[0]}
      />

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={pending}
          className="h-11 rounded-lg bg-accent px-6 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {pending
            ? "Saving..."
            : isEdit
              ? "Update Project"
              : "Create Project"}
        </button>
        <a
          href="/dashboard/projects"
          className="inline-flex h-11 items-center rounded-lg border border-border px-6 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
